import {
  ADD_IMAGE,
  ADD_IMAGE_FAIL
} from '../actions/types';

const initialState = {
  images: []
};

export default function(state = initialState, action) {
  switch(action.type) {
    case ADD_IMAGE:
      return {
        images: [...state.images, action.payload]
      };

    case ADD_IMAGE_FAIL:
      return { ...state };

    default:
      return state;
  };
};