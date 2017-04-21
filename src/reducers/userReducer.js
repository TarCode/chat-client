import { merge } from 'lodash'
import { GET_USERS, RECEIVE_USERS } from '../actions/userActions'

const initialState = {}

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_USERS:
      return merge({}, state, { loading: true })
    case RECEIVE_USERS:

    default:
      return state
  }
}
