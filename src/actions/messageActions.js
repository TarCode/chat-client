export const POST_MESSAGE = "POST_MESSAGE"
export const POST_MESSAGE_SUCCESS = "POST_MESSAGE_SUCCESS"
export const POST_MESSAGE_ERROR = "POST_MESSAGE_ERROR"

export function postMessage(messageObject) {
  return dispatch => {
    dispatch({ type: POST_MESSAGE })
    fetch('http://localhost:3000/message', {
      method: 'POST',
      body: JSON.stringify(messageObject),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
    })
    .then(response => {
      dispatch({ type: POST_MESSAGE_SUCCESS })
    })
  }
}

export const CHECK_SENTIMENT = "CHECK_SENTIMENT"
export const CHECK_SENTIMENT_SUCCESS = "CHECK_SENTIMENT_SUCCESS"
export const CHECK_SENTIMENT_ERROR = "CHECK_SENTIMENT_ERROR"

export function checkSentiment(msg) {
  return dispatch => {
    dispatch({ type: CHECK_SENTIMENT})
    fetch('http://localhost:3000/check-sentiment', {
      method: 'POST',
      body: JSON.stringify({txt:msg}),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
    })
    .then(response => response.json())
    .then(json => {
      console.log('response json', json);
      if(json.errno) {
        dispatch({ type: CHECK_SENTIMENT_ERROR, err: json.errno})
      } else {
        dispatch({ type: CHECK_SENTIMENT_SUCCESS, sentiment: JSON.parse(json.text).result})
      }
    })
  }
}

export const GET_MESSAGES = "GET_MESSAGES"
export const RECEIVE_MESSAGES = "RECEIVE_MESSAGES"

export function getMessages(groupId) {
  return dispatch => {
    dispatch({ type: GET_MESSAGES })
    fetch('http://localhost:3000/messages/' + groupId)
    .then(response => response.json())
    .then(json => {
      dispatch({
        type: RECEIVE_MESSAGES,
        messages: json
      })
    })
  }
}
