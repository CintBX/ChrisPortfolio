import {
  GET_COMMISSIONS,
  COMMISSIONS_LOADING,
  ADD_COMMISSION,
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