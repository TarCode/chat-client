import { merge } from 'lodash'
import { GET_GROUP, RECEIVE_GROUP, UPLOAD_IMG, UPLOAD_IMG_SUCCESS, CHANGE_GROUP_NAME, ADD_GROUP_MEMBER } from '../actions/groupActions'

export default (state = {
  group: {}
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
    case CHANGE_GROUP_NAME:
      return merge({}, state, {
        group: {
          groupName: action.groupName
        }
      })
    case ADD_GROUP_MEMBER:
      state.group.members.push(action.member)
      return state
    default:
      return state
  }
}
