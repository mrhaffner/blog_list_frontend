import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { removeBlog, addLike } from '../reducers/blogReducer'
import { useParams, useHistory } from 'react-router-dom'

const Blog = () => {
  const dispatch = useDispatch()
  const history = useHistory()

  const deleteBlog = () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      dispatch(removeBlog(blog))
      history.push('/')
    }
  }

  const blogs = useSelector(state => state.blogs)
  const { id } = useParams()
  const blog = blogs.length > 0
    ? blogs.find(blog => id === blog.id)
    : null

  const loggedUser = useSelector(state => state.loggedUser)
  const displayDelete = {
    display: loggedUser === null || blog === null
      ? 'none'
      : loggedUser.username === blog.user.username
        ? ''
        : 'none'
  }

  if (!blog) {
    return null
  }

  return (
    <div>
      <h2>{blog.title} by {blog.author}</h2>
      <a href={blog.url}>{blog.url}</a><br/>
      <span>likes {blog.likes}</span>
      <button id='like' onClick={() => dispatch(addLike(blog))}>like</button>
      {loggedUser ? <p>added by {blog.user.username}</p> : null}
      <button onClick={deleteBlog} style={displayDelete}>remove</button>
    </div>
  )
}

export default Blog
