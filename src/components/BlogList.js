import React from 'react'
import Blog from './Blog'

const BlogList = ({ blogs, setBlogs, user, updateLikes }) => {
  return (
    <div>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} setBlogs={setBlogs} user={user} blogs={blogs} updateLikes={updateLikes} />
      )}
    </div>
  )
}

export default BlogList