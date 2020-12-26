import React from 'react'
import { Link, useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { removeUser } from '../reducers/loggedUserReducer'
import { Navbar, Nav, Button } from 'react-bootstrap'


const NavBar = () => {
  const padding = {
    paddingRight: 5
  }

  const loggedUser = useSelector(state => state.loggedUser)
  const dispatch = useDispatch()
  const history = useHistory()

  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href="#" as="span">
            <Link to='/' style={padding}>Blogs</Link>
          </Nav.Link>
          <Nav.Link href="#" as="span">
            <Link to='/users' style={padding}>Users</Link>
          </Nav.Link>
          <Nav.Link href="#" as="span">
            {loggedUser ? <span style={padding}>{loggedUser.username} signed in</span> : null }
          </Nav.Link>
          {loggedUser === null ? (
            <Button size='sm' onClick={() => history.push('/login')}>Sign In</Button>
          ) : (
            <Button size='sm' onClick={() => dispatch(removeUser())}>Sign Out</Button>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
}

export default NavBar