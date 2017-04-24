export const GET_MEMBERS = "GET_MEMBERS"
export const RECEIVE_MEMBERS = "RECEIVE_MEMBERS"

export function getMembers(groupId) {
  return dispatch => {
    dispatch({ type: GET_MEMBERS })
    fetch('http://localhost:3000/members/' + groupId)
    .then(response => response.json())
    .then(json => {
      console.log('members from member request', json);
      dispatch({
        type: RECEIVE_MEMBERS,
        members: json
      })
    })
  }
}
