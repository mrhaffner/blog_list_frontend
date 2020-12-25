import React, { useState } from 'react'
import blogService from '../services/blogs'
import { useDispatch } from 'react-redux'
import { removeBlog, addLike } from '../reducers/blogReducer'

const Blog = ({ blog, user }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const dispatch = useDispatch()
  const [visible, setVisible] = useState(false)
  const displayStyle = { display: visible ? '' : 'none' }
  const displayDelete = { display: user === null ? 'none' : user.name === blog.user.name ? '' : 'none' }

  const deleteBlog = () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      blogService.remove(blog.id)
      dispatch(removeBlog(blog.id))
    }
  }

  //all instances of blog.likes may need to change to be pull directly from state
  const updateLikes = () => {
    const newObject = { likes: blog.likes + 1 }
    blogService.addLike(blog.id, newObject)
    dispatch(addLike(blog))
  }

  return (
    <div style={blogStyle} >
      <span>{blog.title} {blog.author}</span>
      <button onClick={() => setVisible(!visible)}>
        {visible ? 'hide' : 'view'}
      </button>
      <div style={displayStyle} className='toggleDiv'>
        <p>{blog.url}</p>
        <span>likes {blog.likes}</span>
        <button id='like' onClick={() => updateLikes()}>like</button>
        {user ? <p>{blog.user.name}</p> : null}
        <button onClick={deleteBlog} style={displayDelete}>remove</button>
      </div>
    </div>
  )
}

// const Blog = ({ blog, user }) => {
//   const blogStyle = {
//     paddingTop: 10,
//     paddingLeft: 2,
//     border: 'solid',
//     borderWidth: 1,
//     marginBottom: 5
//   }

//   const dispatch = useDispatch()
//   const [visible, setVisible] = useState(false)
//   const [likes, setLikes] = useState(blog.likes)
//   const displayStyle = { display: visible ? '' : 'none' }
//   const displayDelete = { display: user === null ? 'none' : user.name === blog.user.name ? '' : 'none' }

//   const deleteBlog = () => {
//     if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
//       blogService.remove(blog.id)
//       dispatch(removeBlog(blog.id))
//     }
//   }

//   const updateLikes = (id, likes, setLikes) => {
//     const newObject = { likes: likes + 1 }
//     blogService.addLike(id, newObject)
//     setLikes(likes + 1)
//   }

//   return (
//     <div style={blogStyle} >
//       <span>{blog.title} {blog.author}</span>
//       <button onClick={() => setVisible(!visible)}>
//         {visible ? 'hide' : 'view'}
//       </button>
//       <div style={displayStyle} className='toggleDiv'>
//         <p>{blog.url}</p>
//         <span>likes {likes}</span>
//         <button id='like' onClick={() => updateLikes(blog.id, likes, setLikes)}>like</button>
//         {user ? <p>{blog.user.name}</p> : null}
//         <button onClick={deleteBlog} style={displayDelete}>remove</button>
//       </div>
//     </div>
//   )
// }

// const Blog = ({ blog, blogs, setBlogs, user, updateLikes }) => {
//   const blogStyle = {
//     paddingTop: 10,
//     paddingLeft: 2,
//     border: 'solid',
//     borderWidth: 1,
//     marginBottom: 5
//   }

//   const [visible, setVisible] = useState(false)
//   const [likes, setLikes] = useState(blog.likes)
//   const displayStyle = { display: visible ? '' : 'none' }
//   const displayDelete = { display: user === null ? 'none' : user.name === blog.user.name ? '' : 'none' }

//   const deleteBlog = () => {
//     if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
//       blogService.remove(blog.id)
//       setBlogs(blogs.filter(x => x.id !== blog.id))
//     }
//   }

//   return (
//     <div style={blogStyle} >
//       <span>{blog.title} {blog.author}</span>
//       <button onClick={() => setVisible(!visible)}>
//         {visible ? 'hide' : 'view'}
//       </button>
//       <div style={displayStyle} className='toggleDiv'>
//         <p>{blog.url}</p>
//         <span>likes {likes}</span>
//         <button id='like' onClick={() => updateLikes(blog.id, likes, setLikes)}>like</button>
//         {user ? <p>{blog.user.name}</p> : null}
//         <button onClick={deleteBlog} style={displayDelete}>remove</button>
//       </div>
//     </div>
//   )
// }

export default Blog
