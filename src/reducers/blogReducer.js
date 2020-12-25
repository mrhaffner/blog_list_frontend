const blogReducer = (state = [], action) => {
  switch(action.type) {
  case 'SET_BLOGS':
    return action.blogs
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

export const setBlogs = blogs => {
  return dispatch => {
    dispatch ({
      type: 'SET_BLOGS',
      blogs
    })
  }
}

export const addBlog = blog => {
  return dispatch => {
    dispatch ({
      type: 'NEW_BLOG',
      blog
    })
  }
}

export const removeBlog = id => {
  return dispatch => {
    dispatch({
      type: 'REMOVE_BLOG',
      id
    })
  }
}

export const addLike = blog => {
  const updatedBlog = { ...blog, likes: blog.likes + 1 }
  return dispatch => {
    dispatch({
      type: 'ADD_LIKE',
      updatedBlog
    })
  }
}

export default blogReducer