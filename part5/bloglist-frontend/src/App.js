import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import Togglable from './components/Toggable'
import LoginForm from './components/LoginForm'

import blogService from './services/blogs'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [notif, setNotif] = useState({ message: null })

  const blogFormRef = useRef()

  const Notification = ({ message, isError }) => {
    if (message === null) {
      return null
    }
    return (
      <div className={(isError) ? 'error' : 'success'}>
        {message}
      </div>
    )
  }

  const getAllBlogs = () => {
    blogService.getAll().then(blogs => {
      setBlogs(blogs)
    })
  }

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)

      getAllBlogs()
    }
  }, [])

  return (
    <div>
      <Notification message={notif.message} isError={notif.isError} />
      {(user === null) ?
        <LoginForm loginHandler={(user) => {
          setUser(user)
          blogService.setToken(user.token)
          window.localStorage.setItem(
            'loggedBlogappUser', JSON.stringify(user)
          )
          getAllBlogs()
        }}
        loginErrorHandler={(error) => {
          setNotif({ message: error.message, isError: true })
          setTimeout(() => {
            setNotif({ message: null })
          }, 5000)
        }} /> :
        <div>
          <h2>blogs</h2>
          <p>{user.name} logged in <button onClick={() => {
            window.localStorage.removeItem('loggedBlogappUser')
            window.location.reload(false)
          }}>logout</button></p>
          <Togglable buttonLabel='create new blog' ref={blogFormRef}>
            <BlogForm addBlogHandler={async (newBlog) => {
              const savedBlog = await blogService.create(newBlog)
              setNotif({ message: `${savedBlog.title} by ${savedBlog.author} added`, isError: false })
              setBlogs(blogs.concat(savedBlog))
              blogFormRef.current.toggleVisibility()
            }} addBlogErrorHandler={(error) => {
              setNotif({ message: error.message, isError: true })
              setTimeout(() => {
                setNotif({ message: null })
              }, 5000)
            }} />
          </Togglable>
          {blogs.sort((a, b) => b.likes - a.likes).map(blog =>
            <Blog key={blog.id} inputBlog={blog}
              likeHandler={(newBlog) => {
                return blogService.update(newBlog.id, newBlog)
              }}
              deleteHandler={() => {
                blogService.remove(blog.id)
                setBlogs(blogs.filter(b => b.id !== blog.id))
              }} />
          )}
        </div>
      }
    </div>
  )
}

export default App
