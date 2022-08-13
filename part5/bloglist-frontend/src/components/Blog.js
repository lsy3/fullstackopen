import { useState } from 'react'
import PropTypes from 'prop-types'

import Togglable from '../components/Toggable'

const Blog = ({ inputBlog, deleteHandler, likeHandler }) => {
  const [blog, setBlog] = useState(inputBlog)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const likeButtonHandler = async () => {
    let newBlog = {
      ...blog,
      likes: blog.likes + 1
    }

    await likeHandler(newBlog)
    setBlog(newBlog)
  }

  const deleteButtonHandler = async () => {
    if (window.confirm(`Remove ${blog.title} by ${blog.author}`)) {
      await deleteHandler()
    }
  }

  return (
    <div style={blogStyle} className='blog'>
      <div>
        {blog.title} {blog.author}
      </div>
      <Togglable buttonLabel='view' buttonCancelLabel='hide'>
        {blog.url}<br/>
        <p>likes {blog.likes}</p>
        <button id="blog-like" onClick={likeButtonHandler}>like</button> <br />
        {inputBlog.user.name}
      </Togglable>
      <button id="blog-delete" onClick={deleteButtonHandler}>delete</button>
    </div>
  )
}

Blog.propTypes = {
  inputBlog: PropTypes.object.isRequired
}

export default Blog