export const UPDATE_GROUP = "UPDATE_GROUP"

export function updateGroup(group) {
  return dispatch => {
    dispatch({ type: UPDATE_GROUP, group })
  }
}

export const ADD_GROUP = "ADD_GROUP"

export function addGroup() {

  return dispatch => {
    swal({
      title: 'Add Group Name',
      input: 'text',
      showCancelButton: true,
      inputValidator: value => {
        return new Promise((resolve, reject) => {
          if (value) {
            resolve()
          } else {
            reject('You need to write something!')
          }
        })
      }
    }).then(result => {
      dispatch({ type: ADD_GROUP, group: {groupName: result} })
      swal({
        type: 'success',
        html: 'You added : ' + result
      })
    })
  }
}
