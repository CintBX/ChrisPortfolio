import { combineReducers } from 'redux';
import commissionReducer from './commissionReducer';
import projectReducer from './projectReducer';
import errorReducer from './errorReducer';
import userReducer from './userReducer';
import imageReducer from './imageReducer';

export default combineReducers({
  commission: commissionReducer,
  project: projectReducer,
  error: errorReducer,
  user: userReducer,
  image: imageReducer
});