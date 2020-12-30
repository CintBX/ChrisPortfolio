import {
  ADD_IMAGE,
  ADD_IMAGE_FAIL
} from '../actions/types';
import axios from 'axios';
import { tokenConfig } from './userActions';
import { returnErrors } from './errorActions';

export const addImage = image => (dispatch, getState) => {
  axios
    .post('/images/uploadmulter', image, tokenConfig(getState))
    .then(res => dispatch({
      type: ADD_IMAGE,
      payload: res.data
    }))
    .catch(err => {
      dispatch(returnErrors(err.response.data, err.response.status));
      dispatch({ type: ADD_IMAGE_FAIL });
    });
};