import React, { useEffect, useRef } from 'react'
import BlogList from './components/BlogList'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import LogIn from './components/LogIn'
import Togglable from './components/Togglable'
import { setBlogs, addBlog } from './reducers/blogReducer'
import { setUser, removeUser } from './reducers/userReducer'
import { useDispatch, useSelector } from 'react-redux'
import './App.css'

const App = () => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)

  useEffect(() => {
    dispatch(setBlogs())
  }, [dispatch])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const newUser = JSON.parse(loggedUserJSON)
      dispatch(setUser(newUser))
    }
  }, [dispatch])

  const loginForm = () => (
    <Togglable buttonLabel="login">
      <LogIn />
    </Togglable>
  )

  const createBlog = async (blogObject) => {
    blogFormRef.current.toggleVisibility()
    dispatch(addBlog(blogObject))
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
          <button onClick={() => dispatch(removeUser())}>logout</button>
          {blogForm()}
        </div>
      )}

      <BlogList user={user} />
    </div>
  )
}

export default App
