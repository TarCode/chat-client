import { browserHistory } from 'react-router'

export const UPDATE_GROUP = "UPDATE_GROUP"

export function updateGroup(group) {
  return dispatch => {
    dispatch({ type: UPDATE_GROUP, group })
  }
}

export const CHANGE_GROUP_NAME = "CHANGE_GROUP_NAME"

export function changeGroupName(groupName) {
  return dispatch => {
    dispatch({ type: CHANGE_GROUP_NAME, groupName })
  }
}

export const ADD_GROUP = "ADD_GROUP"
export const ADD_GROUP_SUCCESS = "ADD_GROUP_SUCCESS"

export function addGroup(group, user) {
  return dispatch => {
    dispatch({ type: ADD_GROUP })
    fetch('http://localhost:3000/groups', {
      method: 'POST',
      body: JSON.stringify({groupName: group, email: user.email, firstname: user.firstname, surname: user.surname }),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
    })
    .then(response => response.json())
    .then(json => {
      dispatch({ type: ADD_GROUP_SUCCESS, group: {_id: json.groupId, groupName: group, email: user } })
      swal({
        type: 'success',
        html: 'You added : ' + group
      })
    })
  }
}

export const GET_GROUPS = "GET_GROUPS"
export const RECEIVE_GROUPS = "RECEIVE_GROUPS"

export function getGroups() {
  return dispatch => {
    dispatch({ type: GET_GROUPS })
    fetch('http://localhost:3000/groups')
    .then(response => response.json())
    .then(json => {
      dispatch({
        type: RECEIVE_GROUPS,
        groups: json
      })
    })
  }
}

export const GET_GROUP = "GET_GROUP"
export const RECEIVE_GROUP = "RECEIVE_GROUP"

export function getGroup(groupId) {
  return dispatch => {
    dispatch({ type: GET_GROUP })
    fetch('http://localhost:3000/group/' + groupId)
    .then(response => response.json())
    .then(json => {
      console.log('group from group request', json);
      dispatch({
        type: RECEIVE_GROUP,
        group: json[0]
      })
    })
  }
}

export const UPLOAD_IMG = "UPLOAD_IMG"
export const UPLOAD_IMG_SUCCESS = "UPLOAD_IMG_SUCCESS"
export const UPLOAD_IMG_ERR = "UPLOAD_IMG_ERR"

export function uploadImg(file, name) {
  var data = new FormData()
  data.append('file', file)
  data.append('name', name)
  return dispatch => {
    dispatch({ type: UPLOAD_IMG })
    fetch('http://localhost:3000/upload', {
      method: 'POST',
      body: data
    })
    .then(response => {
      console.log('response', response);
      dispatch({ type: UPLOAD_IMG_SUCCESS })
    })
  }
}
