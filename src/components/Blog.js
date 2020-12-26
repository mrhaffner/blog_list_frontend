import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { removeBlog, addLike, addComment } from '../reducers/blogReducer'
import { useParams, useHistory } from 'react-router-dom'
import { Button, Form, ListGroup } from 'react-bootstrap'

const Blog = () => {
  const margin = {
    marginTop: 10,
    marginBottom: 10
  }

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
        <Form onSubmit={updateComments}>
          <Form.Control id='comment' type="text" value={comment} onChange={(e) => setComment(e.target.value)} />
          <Button style={margin} size="sm" id='createComment' type="submit">Add Comment</Button>
        </Form>
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
        <span>Likes: {blog.likes}</span>
        <Button size="sm" id='like' onClick={() => dispatch(addLike(blog))}>Like</Button>
        {loggedUser ? <p>added by {blog.user.username}</p> : null}
        <Button variant='outline-secondary' size='sm' onClick={deleteBlog} style={displayDelete}>Remove Blog</Button>
      </div>
      <div>
        <h5 style={margin}>Comments</h5>

        <ListGroup style={margin}>
          {blog.comments.map(comment =>
            <ListGroup.Item key={`${comment}${Math.random()}`}>{comment}</ListGroup.Item>
          )}
        </ListGroup>
        {commentForm()}
      </div>
    </div>
  )
}

export default Blog
