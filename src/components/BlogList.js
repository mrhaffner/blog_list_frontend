import React from 'react'
import Blog from './Blog'
import { useSelector } from 'react-redux'

const BlogList = ({ user }) => {
  const blogs = useSelector(state => state.blogs)
  return (
    <div>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} user={user} />
      )}
    </div>
  )
}

// const BlogList = ({ blogs, setBlogs, user, updateLikes }) => {
//   return (
//     <div>
//       {blogs.map(blog =>
//         <Blog key={blog.id} blog={blog} setBlogs={setBlogs} user={user} blogs={blogs} updateLikes={updateLikes} />
//       )}
//     </div>
//   )
// }

export default BlogList