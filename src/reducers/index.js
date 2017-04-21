import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import location from './locationReducer'

export default combineReducers({
  location,
  routing: routerReducer
})
