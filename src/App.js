import React, { useState, useEffect, useRef } from 'react'
import BlogList from './components/BlogList'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import LogIn from './components/LogIn'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'
import { setBlogs } from './reducers/blogReducer'
import { addBlog } from './reducers/blogReducer'
import { createNotification } from './reducers/notificationReducer'
import { useDispatch } from 'react-redux'
import './App.css'

const App = () => {
  const dispatch = useDispatch()
  //
  const [user, setUser] = useState(null)
  //
  useEffect(() => {
    blogService.getAll().then(blogs => {
      blogs.sort((a, b) => b.likes - a.likes)
      dispatch(setBlogs(blogs))
    })
  }, [dispatch])

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
        username,
        password,
      })

      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      dispatch(createNotification({ message: 'Wrong credentials', type: 'errorMessage' }))
    }
  }

  const logout = () => {
    setUser(null)
    window.localStorage.removeItem('loggedBlogappUser')
  }

  const loginForm = () => (
    <Togglable buttonLabel="login">
      <LogIn
        username={username}
        setUsername={setUsername}
        password={password}
        setPassword={setPassword}
        handleLogin={handleLogin}
      />
    </Togglable>
  )

  const createBlog = async (blogObject) => {
    blogFormRef.current.toggleVisibility()
    const returnedBlog = await blogService.create(blogObject)
    returnedBlog.user = user
    dispatch(addBlog(returnedBlog))
  }

  const blogFormRef = useRef()

  const blogForm = () => (
    <Togglable buttonLabel="new blog" ref={blogFormRef}>
      <BlogForm createBlog={createBlog} />
    </Togglable>
  )

  return (
    <div>
      <h2>blogs</h2>
      <Notification />
      {user === null ? (
        loginForm()
      ) : (
        <div>
          <span>{user.username} logged in</span>
          <button onClick={logout}>logout</button>
          {blogForm()}
        </div>
      )}

      <BlogList user={user} />
    </div>
  )
}

// const App = () => {
//   const [blogs, setBlogs] = useState([])
//   const [user, setUser] = useState(null)
//   const [message, setMessage] = useState(null)
//   const [messageType, setMessageType] = useState(null)

//   useEffect(() => {
//     blogService.getAll().then((blogs) => {
//       blogs.sort((a, b) => b.likes - a.likes)
//       setBlogs(blogs)
//     })
//   }, [])

//   useEffect(() => {
//     const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
//     if (loggedUserJSON) {
//       const user = JSON.parse(loggedUserJSON)
//       setUser(user)
//       blogService.setToken(user.token)
//     }
//   }, [])

//   const [username, setUsername] = useState('')
//   const [password, setPassword] = useState('')
//   const handleLogin = async (event) => {
//     event.preventDefault()
//     try {
//       const user = await loginService.login({
//         username,
//         password,
//       })

//       window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
//       blogService.setToken(user.token)
//       setUser(user)
//       setUsername('')
//       setPassword('')
//     } catch (exception) {
//       setMessage('Wrong credentials')
//       setMessageType('errorMessage')
//       setTimeout(() => {
//         setMessage(null)
//         setMessageType(null)
//       }, 5000)
//     }
//   }

//   const createBlog = async (blogObject) => {
//     blogFormRef.current.toggleVisibility()
//     const returnedBlog = await blogService.create(blogObject)
//     returnedBlog.user = user
//     setBlogs(blogs.concat(returnedBlog))
//   }

//   const logout = () => {
//     setUser(null)
//     window.localStorage.removeItem('loggedBlogappUser')
//   }

//   const updateLikes = (id, likes, setLikes) => {
//     const newObject = { likes: likes + 1 }
//     blogService.addLike(id, newObject)
//     setLikes(likes + 1)
//   }

//   const loginForm = () => (
//     <Togglable buttonLabel="login">
//       <LogIn
//         username={username}
//         setUsername={setUsername}
//         password={password}
//         setPassword={setPassword}
//         handleLogin={handleLogin}
//       />
//     </Togglable>
//   )

//   const blogFormRef = useRef()

//   const blogForm = () => (
//     <Togglable buttonLabel="new blog" ref={blogFormRef}>
//       <BlogForm
//         setMessage={setMessage}
//         setMessageType={setMessageType}
//         createBlog={createBlog}
//       />
//     </Togglable>
//   )

//   return (
//     <div>
//       <h2>blogs</h2>
//       <Notification message={message} messageType={messageType} />
//       {user === null ? (
//         loginForm()
//       ) : (
//         <div>
//           <span>{user.username} logged in</span>
//           <button onClick={logout}>logout</button>
//           {blogForm()}
//         </div>
//       )}

//       <BlogList blogs={blogs} setBlogs={setBlogs} user={user} updateLikes={updateLikes} />
//     </div>
//   )
// }

export default App
