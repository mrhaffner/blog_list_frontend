import userService from '../services/users'

const userReducer = (state = [], action) => {
  switch(action.type) {
  case 'SET_USERS':
    return action.users
  default:
    return state
  }
}

export const setUsers = () => {
  return async dispatch => {
    const users = await userService.getAll()
    console.log(users)
    dispatch ({
      type: 'SET_USERS',
      users
    })
  }
}

export default userReducer