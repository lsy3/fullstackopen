import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import LoginForm from './components/LoginForm'
import Notification from './components/Notification'

import { setNotification } from './reducers/notificationReducer'
import { initializeBlogs } from './reducers/blogReducer'
import { signinUser } from './reducers/userReducer'
import BlogList from './components/BlogList'
import Blog from './components/Blog'
import UserList from './components/UserList'
import User from './components/User'

import {
  Routes, Route, Link, useMatch
} from 'react-router-dom'

import { initializeUsers } from './reducers/usersReducer'
import { likeBlog, deleteBlog } from './reducers/blogReducer'

import { Navbar, Nav, Button } from 'react-bootstrap'

const App = () => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)
  const users = useSelector(state => state.users)
  const blogs = useSelector(state => state.blogs)

  const padding = {
    padding: 2
  }

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatch(signinUser(user))
      dispatch(initializeBlogs())
      dispatch(initializeUsers())
    }
  }, [])

  const userMatch = useMatch('/users/:id')
  const userDetail = userMatch ? users.find(u => u.id === userMatch.params.id) : null
  const blogMatch = useMatch('/blogs/:id')
  const blogDetail = blogMatch ? blogs.find(b => b.id === blogMatch.params.id) : null

  return (
    <div>
      <Notification />
      {(user === null) ?
        <LoginForm loginHandler={(user) => {
          dispatch(signinUser(user))
          window.localStorage.setItem(
            'loggedBlogappUser', JSON.stringify(user)
          )
          dispatch(initializeBlogs())
          dispatch(initializeUsers())
        }}
        loginErrorHandler={(error) => {
          dispatch(setNotification(error.message, true, 5000))
        }} /> :
        <div className="container">
          <h2>blogs</h2>
          <Navbar collapseOnSelect expand="lg">
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="me-auto">
                <Nav.Link href="#" as="span">
                  <Link style={padding} to="/">blogs</Link>
                </Nav.Link>
                <Nav.Link href="#" as="span">
                  <Link style={padding} to="/users">users</Link>
                </Nav.Link>
                <Nav.Link href="#" as="span">
                  {user.name} logged in
                  <Button onClick={() => {
                    window.localStorage.removeItem('loggedBlogappUser')
                    window.location.reload(false)
                  }}>logout</Button>
                </Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Navbar>
          <Routes>
            <Route path="/users/:id" element={<User user={userDetail} />} />
            <Route path="/users" element={<UserList />} />
            <Route path="/blogs/:id" element={<Blog inputBlog={blogDetail}
              likeHandler={(newBlog) => {
                dispatch(likeBlog(newBlog.id))
              }}
              deleteHandler={() => {
                dispatch(deleteBlog(blogDetail.id))
              }} />} />
            <Route path="/" element={<BlogList />} />
          </Routes>
          <div>
            <em>Blog list app 2022</em>
          </div>
        </div>
      }
    </div>
  )
}

export default App
