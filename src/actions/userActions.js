import 'isomorphic-fetch'
import { browserHistory } from 'react-router'
import xml2js from 'xml2js'
const parseString = xml2js.parseString

export const GET_USERS = "GET_USERS"
export const RECEIVE_USERS = "RECEIVE_USERS"

export function getUsers() {
  return dispatch => {
    dispatch({ type: GET_USERS })
    fetch('http://localhost:3000/users')
    .then(response => response.json())
    .then(json => {
      parseString(json.text, (err, parsed) => {
        const userJson = parsed && parsed.Users && parsed.Users.User.map(i => ({
          firstname: i.Name[0],
          surname: i.Surname[0],
          email: i.Email[0]
        }))
        dispatch({
          type: RECEIVE_USERS,
          users: userJson
        })
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
    .then(response => response.json())
    .then(json => {
      console.log('response', json);
      if(json.email) {
        dispatch({ type: SET_PASSWORD_SUCCESS, user: json })
        browserHistory.push('/')
      }
    })
    .catch(err => {
      dispatch({ type: SET_PASSWORD_ERROR, err })
    })
  }
}

export const LOGIN = "LOGIN"
export const LOGIN_SUCCESS = "LOGIN_SUCCESS"
export const LOGIN_ERROR = "LOGIN_ERROR"

export function login(user) {
  return dispatch => {
    dispatch({ type: LOGIN})
    fetch('http://localhost:3000/login', {
      method: 'POST',
      body: JSON.stringify(user),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
    })
    .then(response => response.json())
    .then(json => {
      dispatch({ type: LOGIN_SUCCESS, user: json })
      browserHistory.push('/')
    })
    .catch(err => {
      dispatch({ type: LOGIN_ERROR, err })
    })
  }
}
