import { merge } from 'lodash'
import { GET_USERS, RECEIVE_USERS, LOGIN, LOGIN_SUCCESS } from '../actions/userActions'

export default (state = {}, action) => {
  switch (action.type) {
    case LOGIN:
      return merge({}, { loading: true })
    case LOGIN_SUCCESS:
      return merge({}, {
        user: action.user
      })
    default:
      return state
  }
}
