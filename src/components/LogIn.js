import React, { useState } from 'react'
import loginService from '../services/login'
import { createNotification } from '../reducers/notificationReducer'
import { setUser } from '../reducers/loggedUserReducer'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'


const LogIn = () => {
  const dispatch = useDispatch()
  const history = useHistory()

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const newUser = await loginService.login({
        username,
        password,
      })
      setUsername('')
      setPassword('')
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(newUser))
      dispatch(setUser(newUser))
      history.push('/')
    } catch (exception) {
      dispatch(createNotification({ message: 'Wrong credentials', type: 'danger' }))
    }
  }

  return (
    <div>
      <h2>Sign In</h2>
      <Form onSubmit={handleLogin}>
        <Form.Group>
          <Form.Label>username</Form.Label>
          <Form.Control id='username' type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
        </Form.Group>
        <Form.Group>
          <Form.Label>password</Form.Label>
          <Form.Control id='password' type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </Form.Group>
        <Button variant='primary' id='login' type="submit">Sign In</Button>
      </Form>
    </div>

  )
}

export default LogIn