import React, { useState } from 'react'
import blogService from '../services/blogs'


const Blog = ({ blog, setBlogs }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const [visible, setVisible] = useState(false)
  const [likes, setLikes] = useState(blog.likes)
  const displayStyle = { display: visible ? '' : 'none'}

  const updateLikes = () => {
    const newObject = { likes: likes + 1}
    blogService.addLike(blog.id, newObject)
    setLikes(likes + 1)
  }

  return (
    <div style={blogStyle}>
      <span>{blog.title} {blog.author}</span>
      <button onClick={() => setVisible(!visible)}>
        {visible ? 'hide' : 'view'}
      </button>
      <div style={displayStyle}>
        <p>{blog.url}</p>
        <span>likes {likes}</span>
        <button onClick={updateLikes}>like</button>
        <p>{blog.user.name}</p>
      </div>
    </div>
  )
}

export default Blog
