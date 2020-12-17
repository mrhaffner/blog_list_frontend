import React from 'react'
import Blog from './Blog'

const BlogList = ({ blogs, setBlogs, user }) => {
    return (
        <div>
            {blogs.map(blog =>
                <Blog key={blog.id} blog={blog} setBlogs={setBlogs} user={user} blogs={blogs} />
            )}
        </div>
    )
}

export default BlogList