import { PHOTOS } from '../actions/types';

const initialState = {
  photos: []
}

export default function(state = initialState, action){
  switch (action.type) {
    case PHOTOS:
      return {
        ...state,
        photos: [...state.photos, action.payload]
      }
    default:
    return state;

  }
};
