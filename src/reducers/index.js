import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import user from './userReducer'
import users from './usersReducer'
import group from './groupReducer'
import groups from './groupsReducer'
import members from './membersReducer'
import message from './messageReducer'
import { reducer as formReducer } from 'redux-form'

export default combineReducers({
  user,
  users,
  group,
  groups,
  members,
  message,
  form: formReducer,
  routing: routerReducer
})
