import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { removeBlog, addLike, addComment } from '../reducers/blogReducer'
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

  const [comment, setComment] = useState('')
  const updateComments = (e) => {
    e.preventDefault()
    dispatch(addComment(blog, comment))
    setComment('')
  }

  const commentForm = () => {
    if (loggedUser) {
      return (
        <form onSubmit={updateComments}>
          <input id='comment' type="text" value={comment} onChange={(e) => setComment(e.target.value)} />
          <button id='createComment' type="submit">Add Comment</button>
        </form>
      )
    } else {
      return null
    }
  }

  if (!blog) {
    return null
  }

  return (
    <div>
      <h2>{blog.title} by {blog.author}</h2>
      <div>
        <a href={blog.url}>{blog.url}</a><br/>
        <span>likes {blog.likes}</span>
        <button id='like' onClick={() => dispatch(addLike(blog))}>like</button>
        {loggedUser ? <p>added by {blog.user.username}</p> : null}
        <button onClick={deleteBlog} style={displayDelete}>remove</button>
      </div>
      <div>
        <h3>comments</h3>
        {commentForm()}
        <ul>
          {blog.comments.map(comment =>
            <li key={`${comment}${Math.random()}`}>{comment}</li>
          )}
        </ul>
      </div>
    </div>
  )
}

export default Blog
