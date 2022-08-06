import { useState } from 'react'

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
    <form onSubmit={addBlog}>
      title: <input id="blogform-title"
        value={newTitle}
        onChange={(event) => setNewTitle(event.target.value)}
      /> <br />
      author: <input id="blogform-author"
        value={newAuthor}
        onChange={(event) => setNewAuthor(event.target.value)}
      /> <br />
      url: <input id="blogform-url"
        value={newURL}
        onChange={(event) => setNewURL(event.target.value)}
      /> <br />
      <button id="blogform-submit" type="submit">save</button>
    </form>
  )
}

export default BlogForm