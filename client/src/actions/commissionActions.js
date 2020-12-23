import {
  COMMISSIONS_LOADING,
  COMMISSION_LOADING,
  GET_COMMISSIONS,
  ADD_COMMISSION,
  ADD_COMMISSION_FAIL,
  SHOW_COMMISSION,
  DELETE_COMMISSION
} from '../actions/types';
import axios from 'axios';
import { returnErrors } from './errorActions';


export const getCommissions = () => dispatch => {
  dispatch({ type: COMMISSIONS_LOADING });
  axios
    .get('/commissions')
    .then(res => dispatch({
      type: GET_COMMISSIONS,
      payload: res.data
    }))
    .catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
};


export const addCommission = commission => dispatch => {
  const config = {
		headers: {
			"Content-Type": "application/json"
		}
  };

  axios
    .post('/commissions', commission, config)
    .then(() => dispatch({
      type: ADD_COMMISSION,
      payload: commission
    }))
    .catch(err => {
      dispatch(returnErrors(err.response.data, err.response.status));
      dispatch({ type: ADD_COMMISSION_FAIL });
    });
  
  axios
    .get('/commissions')
    .then(res => dispatch({
      type: GET_COMMISSIONS,
      payload: res.data
    }));
};

export const showCommission = id => dispatch => {
  dispatch({ type: COMMISSION_LOADING });
  axios
    .get(`/commissions/${id}`)
    .then(res => dispatch({
      type: SHOW_COMMISSION,
      payload: res.data
    }))
    .catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
};