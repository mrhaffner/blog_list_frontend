import blogService from '../services/blogs'

const blogReducer = (state = [], action) => {
  switch(action.type) {
  case 'SET_BLOGS':
    return action.blogs.sort((a, b) => b.likes - a.likes)
  case 'NEW_BLOG':
    return [...state, action.blog]
  case 'REMOVE_BLOG':
    return state.filter(x => x.id !== action.id)
  case 'ADD_LIKE':
    return state.map(x => x.id !== action.updatedBlog.id ? x : action.updatedBlog)
  default:
    return state
  }
}

export const setBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch ({
      type: 'SET_BLOGS',
      blogs
    })
  }
}

export const addBlog = blog => {
  return async dispatch => {
    const returnedBlog = await blogService.create(blog)
    dispatch ({
      type: 'NEW_BLOG',
      blog: returnedBlog
    })
  }
}

export const removeBlog = blog => {
  return dispatch => {
    blogService.remove(blog.id)
    dispatch({
      type: 'REMOVE_BLOG',
      id: blog.id
    })
  }
}

export const addLike = blog => {
  const updatedBlog = { ...blog, likes: blog.likes + 1 }
  return dispatch => {
    const newObject = { likes: blog.likes + 1 }
    blogService.addLike(blog.id, newObject)
    dispatch({
      type: 'ADD_LIKE',
      updatedBlog
    })
  }
}

export default blogReducer