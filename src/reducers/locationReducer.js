import { merge } from 'lodash'
import { GET_LOCATION, RECEIVE_LOCATION } from '../actions/locationActions'

const initialState = {}

export default function location(state = initialState, action) {
  switch (action.type) {
    case GET_LOCATION:
      return merge({}, state, { loading: true })
    case RECEIVE_LOCATION:
      return merge({}, state, {
        loading: false,
        latitude: action.data.coords.latitude,
        longitude: action.data.coords.longitude ,
        address: action.data.address
      })
    default:
      return state
  }
}
