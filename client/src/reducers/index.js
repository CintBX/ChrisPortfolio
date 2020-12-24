import { combineReducers } from 'redux';
import commissionReducer from './commissionReducer';
import projectReducer from './projectReducer';
import errorReducer from './errorReducer';

export default combineReducers({
  commission: commissionReducer,
  project: projectReducer,
  error: errorReducer
});