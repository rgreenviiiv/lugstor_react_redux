import { PICKUP_COORDS, DROPOFF_COORDS, DO_COORDS_NAME, COORDS_NAME, CONFIRM_PICKUP, PHOTOS } from './types';
import MapboxGl from 'mapbox-gl';
import MapboxClient from 'mapbox';

MapboxGl.accessToken = 'pk.eyJ1IjoicmdyZWVuZGV2IiwiYSI6ImNqZjdtMmZseDBlYWk0ZWtmaTJ5ODVybWgifQ.q40TMVwk6Vvzd6rihxranQ';
const MBGL = MapboxGl.accessToken;
export const pickupcoords = (address, coords) => dispatch => {
  let client = new MapboxClient(MBGL);
  client.geocodeForward(address)
  .then((res) => dispatch({
    type: PICKUP_COORDS,
    payload: res.entity.features[0].center,
  }))
  .catch((err) => {
    console.log(err);
  })

  client.geocodeReverse(coords)
  .then(res => dispatch({
    type: COORDS_NAME,
    payload: res.entity.features[0].place_name
  },console.log('payload success')))
  .catch(err => console.log(err))
}
export const dropoffcoords = (address, coords) => dispatch => {
  let client = new MapboxClient(MBGL);
  client.geocodeForward(address)
  .then((res) => dispatch({
    type: DROPOFF_COORDS,
    payload: res.entity.features[0].center,
  }))
  .catch((err) => {
    console.log(err);
  })

  client.geocodeReverse(coords)
  .then(res => dispatch({
    type: DO_COORDS_NAME,
    payload: res.entity.features[0].place_name
  },console.log('payload success')))
  .catch(err => console.log(err))
}

export const photoTaker = (photo) => dispatch => {
  return dispatch({
    type: PHOTOS,
    payload: photo
  })
}
