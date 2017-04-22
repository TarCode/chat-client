import { merge } from 'lodash'
import { ADD_GROUP, GET_GROUPS, RECEIVE_GROUPS } from '../actions/groupActions'

export default (state = {
  groups: []
}, action) => {
  switch (action.type) {
    case ADD_GROUP:
      const groupsCopy =  merge({}, state)
      groupsCopy.groups.push(action.group)
      return groupsCopy
    case GET_GROUPS:
      return merge({}, {
        loading: true
      })
    case RECEIVE_GROUPS:
      return merge({}, {
        groups: action.groups
      })
    default:
      return state
  }
}
