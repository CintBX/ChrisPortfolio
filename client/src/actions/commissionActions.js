import {
  GET_COMMISSIONS,
  COMMISSIONS_LOADING,
  ADD_COMMISSION,
  ADD_COMMISSION_FAIL,
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
  
  const body = JSON.stringify(commission);

  axios
    .post('/commissions', body, config)
    .then(() => dispatch({
      type: ADD_COMMISSION,
      payload: commission
    }))
    .catch(err => {
      dispatch(returnErrors(err.response.data, err.response.status));
      dispatch({ type: ADD_COMMISSION_FAIL });
    });
  getCommissions();
};