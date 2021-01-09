import {
  COMMISSIONS_LOADING,
  COMMISSION_LOADING,
  GET_COMMISSIONS,
  ADD_COMMISSION,
  ADD_COMMISSION_FAIL,
  SHOW_COMMISSION,
  EDIT_COMMISSION,
  EDIT_COMMISSION_FAIL,
  DELETE_COMMISSION,
  DELETE_COMMISSION_FAIL
} from '../actions/types';

const initialState = {
  commissions: [],
  showCommission: {},
	loading: false,
};


export default function(state = initialState, action) {
  switch(action.type) {
    case COMMISSIONS_LOADING:
    case COMMISSION_LOADING:
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
				commissions: {
          pager: { ...state.commissions.pager },
          pageOfCommissions: [...state.commissions.pageOfCommissions, action.payload]
        }
      };

    case SHOW_COMMISSION:
      return {
        ...state,
        showCommission: action.payload,
        loading: false
      };

    case DELETE_COMMISSION:
      return {
        ...state,
        commissions: {
          pager: { ...state.commissions.pager },
          pageOfCommissions: state.commissions.pageOfCommissions.filter(c => c._id !== action.payload)
        }
      };
      
    case ADD_COMMISSION_FAIL:
    case EDIT_COMMISSION:
    case EDIT_COMMISSION_FAIL:
    case DELETE_COMMISSION_FAIL:
      return { ...state };

    default:
      return state;
  };
};