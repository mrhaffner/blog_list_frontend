import React, { useState } from 'react'
import { createNotification } from '../reducers/notificationReducer'
import { useDispatch } from 'react-redux'

const BlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const dispatch = useDispatch()

  const addBlog = (e) => {
    e.preventDefault()
    createBlog({ title, author, url })
    dispatch(createNotification({ message: `a new blog ${title} by ${author} added`, type: 'createBlog' }))
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <form onSubmit={addBlog}>
      <h2>create new</h2>
      <div>
        <label>title:</label>
        <input id='title' type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
      </div>
      <div>
        <label>author:</label>
        <input id='author' type="text" value={author} onChange={(e) => setAuthor(e.target.value)} />
      </div>
      <div>
        <label>url:</label>
        <input id='url' type="text" value={url} onChange={(e) => setUrl(e.target.value)} />
      </div>
      <button id='create' type="submit">create</button>
    </form>
  )
}

// const BlogForm = ({ setMessage, setMessageType, createBlog }) => {
//   const [title, setTitle] = useState('')
//   const [author, setAuthor] = useState('')
//   const [url, setUrl] = useState('')

//   const addBlog = (e) => {
//     e.preventDefault()
//     createBlog({ title, author, url })
//     setMessage(`a new blog ${title} by ${author} added`)
//     setMessageType('createMessage')
//     setTimeout(() => {
//       setMessage(null)
//       setMessageType(null)
//     }, 5000)
//     setTitle('')
//     setAuthor('')
//     setUrl('')
//   }

//   return (
//     <form onSubmit={addBlog}>
//       <h2>create new</h2>
//       <div>
//         <label>title:</label>
//         <input id='title' type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
//       </div>
//       <div>
//         <label>author:</label>
//         <input id='author' type="text" value={author} onChange={(e) => setAuthor(e.target.value)} />
//       </div>
//       <div>
//         <label>url:</label>
//         <input id='url' type="text" value={url} onChange={(e) => setUrl(e.target.value)} />
//       </div>
//       <button id='create' type="submit">create</button>
//     </form>
//   )
// }

export default BlogForm