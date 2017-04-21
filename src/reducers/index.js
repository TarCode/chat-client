import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import users from './userReducer'

export default combineReducers({
  users,
  routing: routerReducer
})
