import { merge } from 'lodash'
import { GET_GROUP, RECEIVE_GROUP, UPLOAD_IMG, UPLOAD_IMG_SUCCESS } from '../actions/groupActions'

export default (state = {
  groups: []
}, action) => {
  switch (action.type) {
    case GET_GROUP:
      return merge({}, {
        loading: true
      })
    case RECEIVE_GROUP:
      return merge({}, {
        group: action.group
      })
    case UPLOAD_IMG:
      return merge({}, state, {
        loading_img: true
      })
    case UPLOAD_IMG_SUCCESS:
      return merge({}, state, {
        loading_img: false
      })
    default:
      return state
  }
}
