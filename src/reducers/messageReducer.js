import { merge } from 'lodash'
import {
  POST_MESSAGE,
  POST_MESSAGE_SUCCESS,
  POST_MESSAGE_ERROR,
  CHECK_SENTIMENT,
  CHECK_SENTIMENT_SUCCESS,
  CHECK_SENTIMENT_ERROR
} from '../actions/messageActions'

import io from 'socket.io-client'
const socketEndpoint = 'http://localhost:3000'

export default (state = {}, action) => {
  switch (action.type) {
    case CHECK_SENTIMENT:
      return merge({}, {
        loadingSentiment: true
      })
    case CHECK_SENTIMENT_SUCCESS:
      return merge({}, {
        sentiment: action.sentiment
      })
    case CHECK_SENTIMENT_ERROR:
      swal({
        type: 'error',
        html: 'Error connecting to sentiment API.  Error: ' + action.err
      })
      return merge({}, {
        err: action.err
      })
    case POST_MESSAGE:
      return merge({}, state, {
        postingMessage: true
      })
    case POST_MESSAGE_SUCCESS:
      const socket = io.connect(`${socketEndpoint}/messages`)
      socket.emit('send')
      return merge({}, state, {
        postingMessage: false
      })
    default:
      return state
  }
}
