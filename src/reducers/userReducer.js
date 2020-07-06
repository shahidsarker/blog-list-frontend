import loginService from '../services/login'
import blogService from '../services/blogs'
import { setNotification } from './notificationReducer'

export const LOGIN_USER = 'LOGIN_USER'
export const LOGOUT_USER = 'LOGOUT_USER'

const userReducer = (state = null, action) => {
  switch (action.type) {
    case LOGIN_USER:
      return action.data
    case LOGOUT_USER:
      return null
    default:
      return state
  }
}

export const loginUser = (userObj) => {
  return async (dispatch) => {
    const user = await loginService.login(userObj)
    window.localStorage.setItem('loggedBlogUser', JSON.stringify(user))
    blogService.setToken(user.token)
    dispatch({ type: LOGIN_USER, data: user })
    dispatch(setNotification({ type: 'success', text: `Welcome ${user.name}` }))
  }
}

export const logoutUser = () => {
  return (dispatch) => {
    window.localStorage.removeItem('loggedBlogUser')
    blogService.setToken(null)
    dispatch({ type: LOGOUT_USER })
    dispatch(setNotification({ type: 'success', text: 'logged out' }))
  }
}

export const initializeUser = () => {
  return (dispatch) => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatch({ type: LOGIN_USER, data: user })
      blogService.setToken(user.token)
    }
  }
}

export default userReducer
