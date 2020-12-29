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
import axios from 'axios';
import { tokenConfig } from './userActions';
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


export const addCommission = commission => (dispatch, getState) => {
  axios
    .post('/commissions', commission, tokenConfig(getState))
    .then(res => dispatch({
      type: ADD_COMMISSION,
      payload: res.data
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


export const editCommission = ({ _id, title, description, price }) => (dispatch, getState) => {
  const body = JSON.stringify({ title, description, price });
  axios
    .post(`/commissions/${_id}`, body, tokenConfig(getState))
    .then(res => dispatch({
      type: EDIT_COMMISSION,
      payload: res.data
    }))
    .catch(err => {
      dispatch(returnErrors(err.response.data, err.response.status));
      dispatch({
        type: EDIT_COMMISSION_FAIL
      });
    });
  axios
    .get('/commissions')
    .then(res => dispatch({
      type: GET_COMMISSIONS,
      payload: res.data
    }));
};


export const deleteCommission = id => (dispatch, getState) => {
  axios
    .delete(`/commissions/${id}`, tokenConfig(getState))
    .then(() => dispatch({
      type: DELETE_COMMISSION,
      payload: id
    }))
    .catch(err => {
      dispatch(returnErrors(err.response.data, err.response.status));
      dispatch({
        type: DELETE_COMMISSION_FAIL
      });
    });
};