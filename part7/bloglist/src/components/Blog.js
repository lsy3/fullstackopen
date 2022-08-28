import { useState } from 'react'
import PropTypes from 'prop-types'

import CommentForm from './CommentForm'

import { Button } from 'react-bootstrap'

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
      <h2>
        {blog.title} {blog.author}
      </h2>
      {blog.url}<br/>
      <p>likes {blog.likes}</p>
      <Button id="blog-like" onClick={likeButtonHandler}>like</Button> <br />
      {inputBlog.user.name}
      <Button id="blog-delete" onClick={deleteButtonHandler}>delete</Button>

      <h4>comments</h4>
      <CommentForm blogID={blog.id} addCommentHandler={(comment) => {
        const newBlog = {
          ...blog,
          comments: blog.comments.concat(comment)
        }
        setBlog(newBlog)
      }} />
      <ul>
        {blog.comments.map(comment =>
          <li key={comment.id}> {comment.comment} </li>)}
      </ul>
    </div>
  )
}

Blog.propTypes = {
  inputBlog: PropTypes.object.isRequired
}

export default Blog