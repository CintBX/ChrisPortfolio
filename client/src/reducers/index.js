import { combineReducers } from 'redux';
import commissionReducer from './commissionReducer';

export default combineReducers({
  commission: commissionReducer
});