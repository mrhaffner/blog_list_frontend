import React, { useState } from 'react'

const Blog = ({ blog }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const [visible, setVisible] = useState(false)
  const displayStyle = { display: visible ? '' : 'none'}
  return (
    <div style={blogStyle}>
      <span>{blog.title} {blog.author}</span>
      <button onClick={() => setVisible(!visible)}>
        {visible ? 'hide' : 'view'}
      </button>
      <div style={displayStyle}>
        <p>{blog.url}</p>
        <span>likes {blog.likes}</span>
        <button>like</button>
        <p>{blog.user.name}</p>
      </div>
    </div>
  )
}

export default Blog
