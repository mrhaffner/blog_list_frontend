import React, { useState } from 'react'
import loginService from '../services/login'
import blogService from '../services/blogs'

const LogIn = ({ setUser }) => {
    const [username, setUsername] = useState('') 
    const [password, setPassword] = useState('')
    const handleLogin = async (event) => {
        event.preventDefault()
        try {
          const user = await loginService.login({
            username, password,
          })
    
          window.localStorage.setItem(
            'loggedBlogappUser', JSON.stringify(user)
          ) 
          blogService.setToken(user.token)
          setUser(user)
          setUsername('')
          setPassword('')
        } catch (exception) {
          console.log('Wrong credentials')
          
        }
      }

    return (
        <form onSubmit={handleLogin}>
            <div>
                <label>username</label>
                <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
            </div>
            <div>
                <label>password</label>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
            <button type="submit">login</button>
        </form>
    )
}

export default LogIn