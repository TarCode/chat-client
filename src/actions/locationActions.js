import 'isomorphic-fetch'
export const API_KEY = 'AIzaSyAh0k02qpa1OX8HVeVj5HPXK_u5nIdnmys'
export const GET_LOCATION = "GET_LOCATION"
export const RECEIVE_LOCATION = "RECEIVE_LOCATION"

export function getLocation() {
  return dispatch => {
    dispatch({ type: GET_LOCATION })
    navigator.geolocation.getCurrentPosition((position) => {
      fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${position.coords.latitude},${position.coords.longitude}&key=${API_KEY}`)
      .then(response => response.json())
      .then(parsed => {
        console.log('parsed from location', parsed);
          dispatch({
            type: RECEIVE_LOCATION,
            data: {
              coords: position.coords,
              address: parsed.results[0].formatted_address
            }
          })
      })
    })
  }
}
