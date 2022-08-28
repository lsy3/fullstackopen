import { useState } from 'react'

import { Form, Button } from 'react-bootstrap'

const BlogForm = ({ addBlogHandler, addBlogErrorHandler }) => {
  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newURL, setNewURL] = useState('')

  const addBlog = (event) => {
    event.preventDefault()

    const newBlog = {
      title: newTitle,
      author: newAuthor,
      url: newURL
    }

    try {
      addBlogHandler(newBlog)
    } catch (error) {
      addBlogErrorHandler(error)
    }

  }

  return (
    <Form onSubmit={addBlog}>
      <Form.Label>title</Form.Label>
      <Form.Control id="blogform-title"
        value={newTitle}
        onChange={(event) => setNewTitle(event.target.value)}
      />
      <Form.Label>author</Form.Label>
      <Form.Control id="blogform-author"
        value={newAuthor}
        onChange={(event) => setNewAuthor(event.target.value)}
      />
      <Form.Label>url</Form.Label>
      <Form.Control id="blogform-url"
        value={newURL}
        onChange={(event) => setNewURL(event.target.value)}
      /> <br />
      <Button id="blogform-submit" type="submit">save</Button>
    </Form>
  )
}

export default BlogForm