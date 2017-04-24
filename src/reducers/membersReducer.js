import { merge } from 'lodash'
import { GET_MEMBERS, RECEIVE_MEMBERS } from '../actions/memberActions'

export default (state = {
  members: []
}, action) => {
  switch (action.type) {
    case GET_MEMBERS:
      return merge({}, {
        loading: true
      })
    case RECEIVE_MEMBERS:
      return merge({}, {
        members: action.members
      })
    default:
      return state
  }
}
