import React, { useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import Togglable from '../components/Togglable'
import BlogForm from '../components/BlogForm'
import { addBlog } from '../reducers/blogReducer'

const BlogList = () => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const blogs = useSelector(state => state.blogs)
  const loggedUser = useSelector(state => state.loggedUser)

  const dispatch = useDispatch()

  const createBlog = blogObject => {
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
      { loggedUser === null ? null : blogForm() }
      {blogs.map(blog =>
        <div key={blog.id} style={blogStyle}>
          <Link to={`/blogs/${blog.id}`}>{blog.title} {blog.author}</Link>
        </div>
      )}
    </div>
  )
}

export default BlogList