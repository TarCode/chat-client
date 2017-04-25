import { merge } from 'lodash'
import { GET_GROUP, RECEIVE_GROUP, UPLOAD_IMG, UPLOAD_IMG_SUCCESS, CHANGE_GROUP_NAME, ADD_GROUP_MEMBER, REMOVE_GROUP_MEMBER, SET_GROUP_ADMIN } from '../actions/groupActions'

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
      return merge({}, state)
    case REMOVE_GROUP_MEMBER:
      state.group.members.splice(action.index, 1)
      return merge({}, state)
    case SET_GROUP_ADMIN:
      state.group.members[action.index].isAdmin = !state.group.members[action.index].isAdmin
      return merge({}, state)
    default:
      return state
  }
}
