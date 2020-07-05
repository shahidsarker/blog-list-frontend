import blogService from '../services/blogs'

export const NEW_BLOG = 'NEW_BLOG'
export const INIT_BLOGS = 'INIT_BLOGS'
export const LIKE_BLOG = 'LIKE_BLOG'

const blogReducer = (state = [], action) => {
  switch (action.type) {
    case NEW_BLOG:
      return [...state]
    case INIT_BLOGS:
      return action.data
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

export default blogReducer
