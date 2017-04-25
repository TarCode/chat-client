import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import user from './userReducer'
import users from './usersReducer'
import group from './groupReducer'
import groups from './groupsReducer'
import message from './messageReducer'
import messages from './messagesReducer'

export default combineReducers({
  user,
  users,
  group,
  groups,
  message,
  messages,
  routing: routerReducer
})
