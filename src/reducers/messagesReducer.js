import { merge } from 'lodash'
import {
  GET_MESSAGES,
  RECEIVE_MESSAGES
} from '../actions/messageActions'

export default (state = {}, action) => {
  switch (action.type) {
    case GET_MESSAGES:
      return merge({}, {
        loadingMessages: true
      })
    case RECEIVE_MESSAGES:
      return merge({}, {
        loadingMessages: false,
        messages: action.messages
      })
    default:
      return state
  }
}
