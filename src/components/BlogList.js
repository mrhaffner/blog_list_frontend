import React from 'react'
import Blog from './Blog'

const BlogList = ({ blogs }) => {
    return (
        <div>
            {blogs.map(blog =>
                <div>
                    <Blog key={blog.id} blog={blog} /> 
                </div>
            )}
        </div>
    )
}

export default BlogList