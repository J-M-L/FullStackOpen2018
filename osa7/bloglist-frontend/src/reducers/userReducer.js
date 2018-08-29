import userService from '../services/users'

export const changeUsername = (username) => {
  return async (dispatcher) => {
    dispatcher({
      type:'CHANGE_USERNAME',
      username
    })
  }
}
export const changePassword = (password) => {
  return async (dispatcher) => {
    dispatcher({
      type:'CHANGE_PASSWORD',
      password
    })
  }
}
export const changeUser = (user) => {
  return async (dispatcher) => {
    dispatcher({
      type:'CHANGE_USER',
      user
    })
  }
}

export const userInitialization = () =>  {
  return async (dispatch) => {
    const users = await userService.getAll()
    dispatch({
      type:'INIT_USERS',
      data: users
    })
  }
}

const initialUserState = {
  username: '',
  password: '',
  user: null,
  users: []
}

const userReducer = (state = initialUserState, action) => {
  let newUserInfo = { ...state }

  switch(action.type){
  case 'CHANGE_USERNAME':
    newUserInfo.username = action.username
    return newUserInfo

  case 'CHANGE_PASSWORD':
    newUserInfo.password = action.password
    return newUserInfo

  case 'CHANGE_USER':
    newUserInfo.user = action.user
    return newUserInfo

  case 'INIT_USERS':
    newUserInfo.users = action.data
    return newUserInfo
  default:
    return state
  }
}

export default userReducer