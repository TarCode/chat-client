export const ADD_GROUP = "ADD_GROUP"

export function addGroup(group) {
  console.log('group from actions', group);
  return dispatch => {
    dispatch({ type: ADD_GROUP, group })
  }
}
