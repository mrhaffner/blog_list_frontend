import React, { useEffect } from 'react'
import BlogList from './components/BlogList'
import Notification from './components/Notification'
import LogIn from './components/LogIn'
import UserList from './components/UserList'
import User from './components/User'
import Blog from './components/Blog'
import NavBar from './components/NavBar'
import { setBlogs } from './reducers/blogReducer'
import { setUser } from './reducers/loggedUserReducer'
import { setUsers } from './reducers/usersReducer'
import { useDispatch, useSelector } from 'react-redux'
import { Switch, Route, Redirect } from 'react-router-dom'

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

  return (
    <div className='container'>
      <NavBar />
      <Notification />
      <Switch>
        <Route path='/users/:id'>
          <User />
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
