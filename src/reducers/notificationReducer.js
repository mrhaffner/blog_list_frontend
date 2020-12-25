const notificationReducer = (state = { message: null, type: null }, action) => {
  switch(action.type) {
  case 'NEW_NOTIFICATION':
    return action.notification
  case 'REMOVE_NOTIFICATION':
    return { message: null, type: null }
  default:
    return state
  }
}

export const createNotification = notification => {
  function timeout() {
    return new Promise(resolve => setTimeout(resolve, 5000))
  }
  return async dispatch => {
    dispatch ({
      type: 'NEW_NOTIFICATION',
      notification
    })
    await timeout()
    dispatch({ type: 'REMOVE_NOTIFICATION' })
  }
}

export default notificationReducer