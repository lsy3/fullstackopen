import { useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'

import BlogForm from './BlogForm'
import Togglable from './Toggable'

import { createBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'

import { Table } from 'react-bootstrap'

const BlogList = () => {
  const dispatch = useDispatch()
  const blogs = useSelector(state => state.blogs)
  const blogFormRef = useRef()

  return (
    <div>
      <Togglable buttonLabel='create new blog' ref={blogFormRef}>
        <BlogForm addBlogHandler={async (newBlog) => {
          dispatch(setNotification(`${newBlog.title} by ${newBlog.author} added`, false, 5000))
          dispatch(createBlog(newBlog))
          blogFormRef.current.toggleVisibility()
        }}
        addBlogErrorHandler={(error) => {
          dispatch(setNotification(error.message, true, 5000))
        }} />
      </Togglable>
      <Table striped>
        <tbody>
          {blogs.map(a => a).sort((a, b) => b.likes - a.likes).map(blog =>
            <tr key={blog.id} >
              <td><Link to={'blogs/' + blog.id}>{blog.title}</Link></td>
              <td>{blog.author}</td>
            </tr>
          // <Blog key={blog.id} inputBlog={blog}
          //   likeHandler={(newBlog) => {
          //     dispatch(likeBlog(newBlog.id))
          //   }}
          //   deleteHandler={() => {
          //     dispatch(deleteBlog(blog.id))
          //   }} />
          )}
        </tbody>
      </Table>
    </div>
  )
}

export default BlogList