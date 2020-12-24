import React, { useState } from 'react'
import blogService from '../services/blogs'

const Blog = ({ blog, blogs, setBlogs, user, updateLikes }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const [visible, setVisible] = useState(false)
  const [likes, setLikes] = useState(blog.likes)
  const displayStyle = { display: visible ? '' : 'none' }
  const displayDelete = { display: user === null ? 'none' : user.name === blog.user.name ? '' : 'none' }

  const deleteBlog = () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      blogService.remove(blog.id)
      setBlogs(blogs.filter(x => x.id !== blog.id))
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
        <span>likes {likes}</span>
        <button id='like' onClick={() => updateLikes(blog.id, likes, setLikes)}>like</button>
        {user ? <p>{blog.user.name}</p> : null}
        <button onClick={deleteBlog} style={displayDelete}>remove</button>
      </div>
    </div>
  )
}

export default Blog
