import React from 'react'
import { Link, useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { removeUser } from '../reducers/loggedUserReducer'


const NavBar = () => {
  const padding = {
    paddingRight: 5
  }

  const loggedUser = useSelector(state => state.loggedUser)
  const dispatch = useDispatch()
  const history = useHistory()

  return (
    <div>
      <Link to='/' style={padding}>Blogs</Link>
      <Link to='/users' style={padding}>Users</Link>
      {loggedUser ? <span style={padding}>{loggedUser.username} logged in</span> : null }
      {loggedUser === null ? (
        <button onClick={() => history.push('/login')}>login</button>
      ) : (
        <button onClick={() => dispatch(removeUser())}>logout</button>
      )}
    </div>
  )
}

export default NavBar