import {
  GET_COMMISSIONS,
  COMMISSIONS_LOADING,
  ADD_COMMISSION,
  ADD_COMMISSION_FAIL,
  DELETE_COMMISSION
} from '../actions/types';

const initialState = {
  commissions: [],
	loading: false,
};

export default function(state = initialState, action) {
  switch(action.type) {
    case COMMISSIONS_LOADING:
      return {
        ...state,
        loading: true
      };

    case GET_COMMISSIONS:
      return {
        ...state,
        commissions: action.payload,
        loading: false
      };

    case ADD_COMMISSION:
			return {
				...state,
				commissions: [...state.commissions, action.payload]
      };
      
    case ADD_COMMISSION_FAIL:
      return { ...state };

    default:
      return state;
  };
};