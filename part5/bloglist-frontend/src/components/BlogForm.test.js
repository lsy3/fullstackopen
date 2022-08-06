import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import BlogForm from './BlogForm'
import userEvent from '@testing-library/user-event'

test('<BlogForm /> updates parent state and calls onSubmit', async () => {
  const addBlog = jest.fn()

  let container = render(<BlogForm addBlogHandler={addBlog} />).container

  const titleInput = container.querySelector('#blogform-title')
  await userEvent.type(titleInput, 'test title')
  const authorInput = container.querySelector('#blogform-author')
  await userEvent.type(authorInput, 'test author')
  const urlInput = container.querySelector('#blogform-url')
  await userEvent.type(urlInput, 'test url')

  const sendButton = container.querySelector('#blogform-submit')
  await userEvent.click(sendButton)

  expect(addBlog.mock.calls).toHaveLength(1)

  expect(addBlog.mock.calls[0][0].title).toBe('test title')
  expect(addBlog.mock.calls[0][0].author).toBe('test author')
  expect(addBlog.mock.calls[0][0].url).toBe('test url')
})