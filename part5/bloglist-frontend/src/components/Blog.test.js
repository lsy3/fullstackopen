import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

describe('<Blog>', () => {

  const sampleBlog = {
    _id: '5a422a851b54a676234d17f7',
    title: 'Component testing is done with react-testing-library',
    author: 'Liam Sy',
    url: 'https://reactpatterns.com/',
    user: '62ebca6aedf1ea8f44dc0f2b',
    likes: 7,
    __v: 0
  }

  test('renders content', () => {
    let container = render(<Blog inputBlog={sampleBlog} />).container

    let element = screen.getByText('Component testing is done with react-testing-library', { exact: false })
    expect(element).toBeDefined()
    expect(element).toBeVisible()
    element = screen.getByText('Liam Sy', { exact: false })
    expect(element).toBeDefined()
    expect(element).toBeVisible()
    element = screen.getByText('https://reactpatterns.com/', { exact: false })
    expect(element).toBeDefined()
    expect(element).not.toBeVisible()
    element = screen.getByText('likes', { exact: false })
    expect(element).toBeDefined()
    expect(element).not.toBeVisible()

    const div = container.querySelector('.togglableContent')
    expect(div).toHaveStyle('display: none')
  })

  test('click the view button then hide button', async () => {
    let container = render(<Blog inputBlog={sampleBlog} />).container
    // const mockHandler = jest.fn()

    let button = screen.getByText('view')
    const div = container.querySelector('.togglableContent')

    await userEvent.click(button)
    expect(div).not.toHaveStyle('display: none')

    let element = screen.getByText('Component testing is done with react-testing-library', { exact: false })
    expect(element).toBeDefined()
    expect(element).toBeVisible()
    element = screen.getByText('Liam Sy', { exact: false })
    expect(element).toBeDefined()
    expect(element).toBeVisible()
    element = screen.getByText('https://reactpatterns.com/', { exact: false })
    expect(element).toBeDefined()
    expect(element).toBeVisible()
    element = screen.getByText('likes', { exact: false })
    expect(element).toBeDefined()
    expect(element).toBeVisible()

    button = screen.getByText('hide')
    await userEvent.click(button)

    element = screen.getByText('Component testing is done with react-testing-library', { exact: false })
    expect(element).toBeDefined()
    expect(element).toBeVisible()
    element = screen.getByText('Liam Sy', { exact: false })
    expect(element).toBeDefined()
    expect(element).toBeVisible()
    element = screen.getByText('https://reactpatterns.com/', { exact: false })
    expect(element).toBeDefined()
    expect(element).not.toBeVisible()
    element = screen.getByText('likes', { exact: false })
    expect(element).toBeDefined()
    expect(element).not.toBeVisible()
    // expect(mockHandler.mock.calls).toHaveLength(1)
  })

  test('click the view button then like button twice', async () => {
    const mockLikeHandler = jest.fn()
    const mockDeleteHandler = jest.fn()

    let container = render(<Blog inputBlog={sampleBlog}
      likeHandler={mockLikeHandler} deleteHandler={mockDeleteHandler} />).container

    // const user = userEvent.setup()

    let viewButton = container.querySelector('#toggle-view')
    await userEvent.click(viewButton)

    let likeButton = container.querySelector('#blog-like')
    await userEvent.click(likeButton)
    await userEvent.click(likeButton)

    expect(mockLikeHandler.mock.calls).toHaveLength(2)
  })
})
