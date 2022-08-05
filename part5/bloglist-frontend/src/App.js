import { useState, useEffect } from 'react'
import Blog from './components/Blog'

import blogService from './services/blogs'
import loginService from './services/login'


const App = () => {
  const [blogs, setBlogs] = useState([])

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newURL, setNewURL] = useState('')

  const [user, setUser] = useState(null)
  const [notif, setNotif] = useState({ message: null })

  const handleLogin = async (event) => {
    event.preventDefault()
    console.log('logging in with', username, password)
    try {
      const user = await loginService.login({
        username, password,
      })
      setUser(user)
      blogService.setToken(user.token)
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      setUsername('')
      setPassword('')

      blogService.getAll().then(blogs =>
        setBlogs(blogs)
      )
    } catch (exception) {
      setNotif({ message: 'Wrong credentials', isError: true })
      setTimeout(() => {
        setNotif({ message: null })
      }, 5000)
    }
  }

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

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <h2>log in to application</h2>
      <div>
        username
        <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
        <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>
  )

  const addBlog = async (event) => {
    event.preventDefault()

    const newBlog = {
      title: newTitle,
      author: newAuthor,
      url: newURL
    }

    try {
      const savedBlog = await blogService.create(newBlog)
      setNotif({ message: `${savedBlog.title} by ${savedBlog.author} added`, isError: false })
      setBlogs(blogs.concat(savedBlog))
    } catch (error) {
      setNotif({ message: error.message, isError: true })
      setTimeout(() => {
        setNotif({ message: null })
      }, 5000)
    }

  }

  const blogForm = () => (
    <form onSubmit={addBlog}>
      title: <input
        value={newTitle}
        onChange={ (event) => setNewTitle(event.target.value)}
      /> <br/>
      author: <input
        value={newAuthor}
        onChange={(event) => setNewAuthor(event.target.value)}
      /> <br />
      url: <input
        value={newURL}
        onChange={(event) => setNewURL(event.target.value)}
      /> <br />
      <button type="submit">save</button>
    </form>
  )

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)

      blogService.getAll().then(blogs =>
        setBlogs(blogs)
      )
    }
  }, [])

  return (
    <div>
      <Notification message={notif.message} isError={notif.isError} />
      {(user === null) ?
        loginForm() :
        <div>
          <h2>blogs</h2>
          <p>{user.name} logged in <button onClick={() => {
            window.localStorage.removeItem('loggedBlogappUser')
            window.location.reload(false);
          }}>logout</button></p>
          {blogForm()}
          {blogs.map(blog => <Blog key={blog.id} blog={blog} />)}
        </div>
      }
    </div>
  )
}

export default App
