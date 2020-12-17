import React from 'react'
import Blog from './Blog'

const BlogList = ({ blogs, setBlogs }) => {
    return (
        <div>
            {blogs.map(blog =>
                <Blog key={blog.id} blog={blog} setBlogs={setBlogs} />
            )}
        </div>
    )
}

export default BlogList