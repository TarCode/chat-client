import { merge } from 'lodash'
import { ADD_GROUP } from '../actions/groupActions'

export default (state = {
  groups: []
}, action) => {
  switch (action.type) {
    case ADD_GROUP:
      const groupsCopy =  merge({}, state)
      groupsCopy.groups.push(action.group)
      return groupsCopy
    default:
      return state
  }
}
