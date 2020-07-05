const SET = 'SET'
const CLEAR = 'CLEAR'

/**
 *
 * @param {string} message Notification message
 */
export const setNotification = (messageObj, seconds = 5) => {
  return (dispatch) => {
    dispatch({
      type: SET,
      data: messageObj,
    })
    setTimeout(() => {
      dispatch({ type: CLEAR })
    }, 1000 * seconds)
  }
}

export const clearNotification = () => {
  return { type: CLEAR }
}

const reducer = (state = null, action) => {
  switch (action.type) {
    case SET:
      return action.data
    case CLEAR:
      return null
    default:
      return state
  }
}

export default reducer
