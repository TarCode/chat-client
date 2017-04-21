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
