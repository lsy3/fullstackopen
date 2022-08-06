import { useState } from 'react'
import PropTypes from 'prop-types'

import loginService from '../services/login'

const LoginForm = ({ loginHandler, loginErrorHandler }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = async (event) => {
    event.preventDefault()

    console.log('logging in with', username, password)
    try {
      const user = await loginService.login({
        username, password,
      })
      setUsername('')
      setPassword('')

      loginHandler(user)
    } catch (error) {
      loginErrorHandler(error)
    }
  }

  return (
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
}

LoginForm.propTypes = {
  loginHandler: PropTypes.func.isRequired,
  loginErrorHandler: PropTypes.func.isRequired
}

export default LoginForm