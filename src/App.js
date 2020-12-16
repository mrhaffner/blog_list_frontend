import React, { useState, useEffect } from 'react'
import BlogList from './components/BlogList'
// import LogIn from './components/LogIn'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])


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

    const loginForm = () => (
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

  return (
    <div>
      {
        user === null
          ? loginForm()
          : <BlogList blogs={blogs} user={user} />
      }
    </div>
  )
}

export default App