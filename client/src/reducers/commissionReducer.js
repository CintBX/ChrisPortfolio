import { v4 as uuidv4 } from 'uuid';
import {
  GET_COMMISSIONS,
  COMMISSIONS_LOADING,
  ADD_COMMISSION,
  DELETE_COMMISSION
} from '../actions/types';

const initialState = {
  // commissions: [
  //   { id: uuidv4(), title: "Artwork1", price: "$75"},
  //   { id: uuidv4(), title: "Artwork2", price: "$125"},
  //   { id: uuidv4(), title: "Artwork3", price: "$100"},
  //   { id: uuidv4(), title: "Artwork4", price: "$50"},
  //   { id: uuidv4(), title: "Artwork5", price: "$45"},
  //   { id: uuidv4(), title: "Artwork6", price: "$155"},
  //   { id: uuidv4(), title: "Artwork7", price: "$85"},
  //   { id: uuidv4(), title: "Artwork8", price: "$250"},
  //   { id: uuidv4(), title: "Artwork9", price: "$99"},
  //   { id: uuidv4(), title: "Artwork10", price: "$105"},
  //   { id: uuidv4(), title: "Artwork11", price: "$25"},
  //   { id: uuidv4(), title: "Artwork12", price: "$180"}
  // ]
  commissions: [],
	loading: false,
}

export default function(state = initialState, action) {
  switch(action.type) {
    case GET_COMMISSIONS:
      return {
        ...state,
        commissions: action.payload,
        loading: false
      };

    case COMMISSIONS_LOADING:
      return {
        ...state,
        loading: true
      }

    default:
      return state;
  }
}