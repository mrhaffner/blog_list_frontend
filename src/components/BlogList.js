import React, { useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import Togglable from '../components/Togglable'
import BlogForm from '../components/BlogForm'
import { addBlog } from '../reducers/blogReducer'
import { ListGroup } from 'react-bootstrap'

const BlogList = () => {

  const blogs = useSelector(state => state.blogs)
  const loggedUser = useSelector(state => state.loggedUser)

  const dispatch = useDispatch()

  const createBlog = blogObject => {
    blogFormRef.current.toggleVisibility()
    dispatch(addBlog(blogObject))
  }

  const blogFormRef = useRef()

  const blogForm = () => (
    <Togglable buttonLabel="New Blog" ref={blogFormRef}>
      <BlogForm createBlog={createBlog} />
    </Togglable>
  )
  return (
    <div>
      <h2>Blogs</h2>
      { loggedUser === null ? null : blogForm() }
      <ListGroup>
        {blogs.map(blog =>
          <ListGroup.Item key={blog.id}>
            <Link to={`/blogs/${blog.id}`}>{blog.title} {blog.author}</Link>
          </ListGroup.Item>
        )}
      </ListGroup>
    </div>
  )
}

export default BlogList