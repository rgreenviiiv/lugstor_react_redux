import { PICKUP_COORDS, DROPOFF_COORDS } from '../actions/types';

const initialState = {
  pick_up_coords: [],
  drop_off_coords: [],
  line_coords: []
}

export default function(state = initialState, action){
  switch (action.type) {
    case PICKUP_COORDS:
    console.log(action.payload)
      return {
        ...state,
        pick_up_coords: [...state.pick_up_coords, action.payload],
        line_coords: [...state.line_coords, action.payload]
      }
    case DROPOFF_COORDS:
    console.log(action.payload)
      return {
        ...state,
        drop_off_coords: [...state.pick_up_coords, action.payload],
        line_coords: [...state.line_coords, action.payload]
      }
    default:
      return state;
  }
};
