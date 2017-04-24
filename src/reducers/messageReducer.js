import { merge } from 'lodash'
import { POST_MESSAGE, POST_MESSAGE_SUCCESS, POST_MESSAGE_ERROR, CHECK_SENTIMENT, CHECK_SENTIMENT_SUCCESS } from '../actions/messageActions'

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
    default:
      return state
  }
}
