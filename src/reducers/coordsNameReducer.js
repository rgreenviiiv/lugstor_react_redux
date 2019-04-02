import { COORDS_NAME, DO_COORDS_NAME } from '../actions/types';

const initialState = {
  names: {},
  donames: {}
}

export default function(state = initialState, action){
  switch (action.type) {
    case COORDS_NAME:
    return {
      ...state,
      names: {...state.names, names: action.payload}
    }
    case DO_COORDS_NAME:
    return {
      ...state,
      donames: {...state.donames, donames: action.payload}
    }

    default:
      return state;
  }
};
