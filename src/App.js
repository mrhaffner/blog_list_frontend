import React, { useState, useEffect, useRef } from 'react'
import BlogList from './components/BlogList'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import LogIn from './components/LogIn'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'
import './App.css'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState(null)
  const [messageType, setMessageType] = useState(null)

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
        setMessage('Wrong credentials')
        setMessageType("errorMessage")
        setTimeout(() => {
          setMessage(null)
          setMessageType(null)
        }, 5000)
      }
  }

  const createBlog = async (blogObject) => {
    blogFormRef.current.toggleVisibility()
    const returnedBlog = await blogService.create(blogObject)
    setBlogs(blogs.concat(returnedBlog))
  }

  const logout = () => {
    setUser(null)
    window.localStorage.removeItem('loggedBlogappUser')
  }

  const loginForm = () => (
    <Togglable buttonLabel='login'>
      <LogIn username={username} setUsername={setUsername} password={password} setPassword={setPassword} handleLogin={handleLogin} />
    </Togglable>
  )

  const blogFormRef = useRef()

  const blogForm = () => (
    <Togglable buttonLabel='new blog' ref={blogFormRef}>  
      <BlogForm blogs={blogs} setBlogs={setBlogs} setMessage={setMessage} setMessageType={setMessageType} createBlog={createBlog} />
    </Togglable>
  )

  return (
    <div>
      <h2>blogs</h2>
      <Notification message={message} messageType={messageType}/>
      {user === null ?
        loginForm() :
        <div>
          <span>{user.name} logged in</span>
          <button onClick={logout}>logout</button>
          {blogForm()}
        </div>
      }

      <BlogList blogs={blogs} />
    </div>
  )
}

export default App