import React, { useEffect, useRef } from 'react'
import BlogList from './components/BlogList'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import LogIn from './components/LogIn'
import UserList from './components/UserList'
import Togglable from './components/Togglable'
import User from './components/User'
import Blog from './components/Blog'
import NavBar from './components/NavBar'
import { setBlogs, addBlog } from './reducers/blogReducer'
import { setUser, removeUser } from './reducers/loggedUserReducer'
import { setUsers } from './reducers/usersReducer'
import { useDispatch, useSelector } from 'react-redux'
import {
  Switch, Route, Link, useRouteMatch, useHistory, Redirect
} from 'react-router-dom'
import './App.css'

const App = () => {
  const dispatch = useDispatch()
  const loggedUser = useSelector(state => state.loggedUser)
  useEffect(() => {
    dispatch(setBlogs())
  }, [dispatch])

  useEffect(() => {
    dispatch(setUsers())
  }, [dispatch])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const newUser = JSON.parse(loggedUserJSON)
      dispatch(setUser(newUser))
    }
  }, [dispatch])

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
      <NavBar />
      <h2>blogs</h2>
      <Notification />
      { loggedUser === null ? null : blogForm() }
      <Switch>
        <Route path='/users/:id'>
          <User/>
        </Route>
        <Route path='/users'>
          <UserList />
        </Route>
        <Route path='/blogs/:id'>
          <Blog/>
        </Route>
        <Route path='/login'>
          {loggedUser ? <Redirect to='/' /> : <LogIn/>}
        </Route>
        <Route path='/'>
          <BlogList />
        </Route>
      </Switch>
    </div>
  )
}

export default App
