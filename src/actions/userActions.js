import 'isomorphic-fetch'
export const GET_USERS = "GET_USERS"
export const RECEIVE_USERS = "RECEIVE_USERS"

export function getUsers() {
  return dispatch => {
    dispatch({ type: GET_USERS })
    fetch('http://localhost:3000/users')
    .then(response => response.json())
    .then(parsed => {
      console.log('parsed from users', parsed.text);
        dispatch({
          type: RECEIVE_USERS,
          // data: {
          //   coords: position.coords,
          //   address: parsed.results[0].formatted_address
          // }
        })
    })
  }
}

export const SET_PASSWORD = "SET_PASSWORD"
export const SET_PASSWORD_SUCCESS = "SET_PASSWORD_SUCCESS"
export const SET_PASSWORD_ERROR = "SET_PASSWORD_ERROR"

export function setPassword(password) {
  return dispatch => {
    dispatch({ type: SET_PASSWORD})
    fetch('http://localhost:3000/set-password', {
      method: 'POST',
      body: JSON.stringify(password),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
    })
    .then(response => {
      console.log('response from password', response);
    })
  }
}
