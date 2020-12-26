import React, { useState } from 'react'
import { createNotification } from '../reducers/notificationReducer'
import { useDispatch } from 'react-redux'
import { Button, Form } from 'react-bootstrap'

const BlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const dispatch = useDispatch()

  const addBlog = (e) => {
    e.preventDefault()
    createBlog({ title, author, url })
    dispatch(createNotification({ message: `a new blog ${title} by ${author} added`, type: 'success' }))
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <Form onSubmit={addBlog}>
      <h4>Add Blog</h4>
      <Form.Group>
        <Form.Label>title:</Form.Label>
        <Form.Control id='title' type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
      </Form.Group>
      <Form.Group>
        <Form.Label>author:</Form.Label>
        <Form.Control id='author' type="text" value={author} onChange={(e) => setAuthor(e.target.value)} />
      </Form.Group>
      <Form.Group>
        <Form.Label>url:</Form.Label>
        <Form.Control id='url' type="text" value={url} onChange={(e) => setUrl(e.target.value)} />
      </Form.Group>
      <Button id='create' type="submit">Submit</Button>
    </Form>
  )
}

export default BlogForm