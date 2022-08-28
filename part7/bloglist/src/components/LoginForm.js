import { useState } from 'react'
import PropTypes from 'prop-types'

import loginService from '../services/login'

import { Form, Button } from 'react-bootstrap'

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
    <Form onSubmit={handleLogin}>
      <h2>log in to application</h2>
      <Form.Label>username</Form.Label>
      <Form.Control
        id="login-username"
        type="text"
        value={username}
        name="Username"
        onChange={({ target }) => setUsername(target.value)}
      />
      <Form.Label>password</Form.Label>
      <Form.Control
        id="login-password"
        type="password"
        value={password}
        name="Password"
        onChange={({ target }) => setPassword(target.value)}
      />
      <Button id="login-submit" type="submit">login</Button>
    </Form>
  )
}

LoginForm.propTypes = {
  loginHandler: PropTypes.func.isRequired,
  loginErrorHandler: PropTypes.func.isRequired
}

export default LoginForm