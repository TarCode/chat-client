import { merge } from 'lodash'
import { GET_USERS, RECEIVE_USERS } from '../actions/userActions'

export default (state = {}, action) => {
  switch (action.type) {
    case GET_USERS:
      return merge({}, state, {
        loading: true
      })
    case RECEIVE_USERS:
      return merge({}, {
        users: action.users
      })
    default:
      return state
  }
}
