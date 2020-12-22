import { combineReducers } from 'redux';
import commissionReducer from './commissionReducer';
import errorReducer from './errorReducer';

export default combineReducers({
  commission: commissionReducer,
  error: errorReducer
});