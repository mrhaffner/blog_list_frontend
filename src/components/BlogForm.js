import React, { useState } from 'react'
import blogService from '../services/blogs'

const BlogForm = ({ blogs, setBlogs, setMessage, setMessageType }) => {
    const [title, setTitle] = useState('') 
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')
    
    const addBlog = async (e) => {
        e.preventDefault()
        const blogObject = { title, author, url }
        const returnedBlog = await blogService.create(blogObject)
        setBlogs(blogs.concat(returnedBlog))
        setMessage(`a new blog ${title} by ${author} added`)
        setMessageType("createMessage")
        setTimeout(() => {
          setMessage(null)
          setMessageType(null)
        }, 5000)
        setTitle('')
        setAuthor('')
        setUrl('')
    }

    return (
        <form onSubmit={addBlog}>
            <h2>create new</h2>
            <div>
                <label>title:</label>
                <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
            </div>
            <div>
                <label>author:</label>
                <input type="text" value={author} onChange={(e) => setAuthor(e.target.value)} />
            </div>
            <div>
                <label>url:</label>
                <input type="text" value={url} onChange={(e) => setUrl(e.target.value)} />
            </div>
            <button type="submit">create</button>
        </form>
    )
}

export default BlogForm