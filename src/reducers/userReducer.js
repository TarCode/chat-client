import { merge } from 'lodash'
import { GET_USERS, RECEIVE_USERS, LOGIN, LOGIN_SUCCESS, SET_PASSWORD_SUCCESS } from '../actions/userActions'

export default (state = {user: {
  email: "tarcode33@gmail.com",
  firstname: 'Test',
  surname: 'User 1'
}}, action) => {
  switch (action.type) {
    case LOGIN:
      return merge({}, { loading: true })
    case LOGIN_SUCCESS:
    case SET_PASSWORD_SUCCESS:
      return merge({}, {
        user: action.user
      })
    case GET_USERS:
      return merge({}, state, {
        loading: true,
        users: action.users
      })
    default:
      return state
  }
}
