import blogService from '../services/blogs'

export const NEW_BLOG = 'NEW_BLOG'
export const INIT_BLOGS = 'INIT_BLOGS'
export const LIKE_BLOG = 'LIKE_BLOG'
export const REMOVE_BLOG = 'REMOVE_BLOG'

const blogReducer = (state = [], action) => {
  switch (action.type) {
    case NEW_BLOG:
      return [...state, action.data]
    case INIT_BLOGS:
      return action.data
    case LIKE_BLOG:
      return state
        .map((b) =>
          b.id !== action.data.id ? b : { ...b, likes: b.likes + 1 }
        )
        .sort((a, b) => b.likes - a.likes)
    case REMOVE_BLOG:
      return state.filter((b) => b.id !== action.data.id)
    default:
      return state
  }
}

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll()
    dispatch({
      type: INIT_BLOGS,
      data: blogs,
    })
  }
}

export const createBlog = (blogObject) => {
  return async (dispatch) => {
    const newBlog = await blogService.create(blogObject)
    dispatch({
      type: NEW_BLOG,
      data: newBlog,
    })
  }
}

export const likeBlog = (id, updatedObj) => {
  return async (dispatch) => {
    await blogService.update(id, updatedObj)
    dispatch({
      type: LIKE_BLOG,
      data: { id },
    })
  }
}

export const removeBlog = (id) => {
  return async (dispatch) => {
    await blogService.remove(id)
    dispatch({ type: REMOVE_BLOG, data: { id } })
  }
}

export default blogReducer
