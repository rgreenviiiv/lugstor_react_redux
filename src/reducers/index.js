import { combineReducers } from 'redux';
import pickupCoordsReducer from './pickupCoordsReducer';
import coordsNameReducer from './coordsNameReducer';
import photosReducers from './photosReducers';

export default combineReducers({
  coords: pickupCoordsReducer,
  cdsName: coordsNameReducer,
  photos: photosReducers
});
