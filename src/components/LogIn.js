import React, { useState } from 'react'
import loginService from '../services/login'
import { createNotification } from '../reducers/notificationReducer'
import { setUser } from '../reducers/loggedUserReducer'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'


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
      dispatch(createNotification({ message: 'Wrong credentials', type: 'errorMessage' }))
    }
  }

  return (
    <form onSubmit={handleLogin}>
      <div>
        <label>username</label>
        <input id='username' type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
      </div>
      <div>
        <label>password</label>
        <input id='password' type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </div>
      <button id='login' type="submit">login</button>
    </form>
  )
}

export default LogIn