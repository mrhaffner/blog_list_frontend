import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { removeBlog, addLike } from '../reducers/blogReducer'

const Blog = ({ blog }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const loggedUser = useSelector(state => state.loggedUser)

  const dispatch = useDispatch()
  const [visible, setVisible] = useState(false)
  const displayStyle = { display: visible ? '' : 'none' }
  const displayDelete = { display: loggedUser === null ? 'none' : loggedUser.username === blog.user.username ? '' : 'none' }

  const deleteBlog = () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      dispatch(removeBlog(blog))
    }
  }

  return (
    <div style={blogStyle} >
      <span>{blog.title} {blog.author}</span>
      <button onClick={() => setVisible(!visible)}>
        {visible ? 'hide' : 'view'}
      </button>
      <div style={displayStyle} className='toggleDiv'>
        <p>{blog.url}</p>
        <span>likes {blog.likes}</span>
        <button id='like' onClick={() => dispatch(addLike(blog))}>like</button>
        {loggedUser ? <p>{blog.user.username}</p> : null}
        <button onClick={deleteBlog} style={displayDelete}>remove</button>
      </div>
    </div>
  )
}

export default Blog
