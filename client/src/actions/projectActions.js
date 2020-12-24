import {
  PROJECTS_LOADING,
  PROJECT_LOADING,
  GET_PROJECTS,
  ADD_PROJECT,
  ADD_PROJECT_FAIL,
  SHOW_PROJECT,
  EDIT_PROJECT,
  EDIT_PROJECT_FAIL,
  DELETE_PROJECT,
  DELETE_PROJECT_FAIL
} from '../actions/types';
import axios from 'axios';
import { returnErrors } from './errorActions';


export const getProjects = () => dispatch => {
  dispatch({ type: PROJECTS_LOADING });
  axios
    .get('/projects')
    .then(res => dispatch({
      type: GET_PROJECTS,
      payload: res.data
    }))
    .catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
};


export const addProject = project => dispatch => {
  const config = {
		headers: {
			"Content-Type": "application/json"
		}
  };
  axios
    .post('/projects', project, config)
    .then(() => dispatch({
      type: ADD_PROJECT,
      payload: project
    }))
    .catch(err => {
      dispatch(returnErrors(err.response.data, err.response.status));
      dispatch({ type: ADD_PROJECT_FAIL });
    });  
  axios
    .get('/projects')
    .then(res => dispatch({
      type: GET_PROJECTS,
      payload: res.data
    }));
};


export const showProject = id => dispatch => {
  dispatch({ type: PROJECT_LOADING });
  axios
    .get(`/projects/${id}`)
    .then(res => dispatch({
      type: SHOW_PROJECT,
      payload: res.data
    }))
    .catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
};


export const editProject = ({ _id, title, description }) => dispatch => {
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };
  const body = JSON.stringify({ title, description });
  axios
    .post(`/projects/${_id}`, body, config)
    .then(res => dispatch({
      type: EDIT_PROJECT,
      payload: res.data
    }))
    .catch(err => {
      dispatch(returnErrors(err.response.data, err.response.status));
      dispatch({
        type: EDIT_PROJECT_FAIL
      });
    });
  axios
    .get('/projects')
    .then(res => dispatch({
      type: GET_PROJECTS,
      payload: res.data
    }));
};


export const deleteProject = id => dispatch => {
  const config = {
    headers : {
      "Content-Type": "application/json"
    }
  };
  axios
    .delete(`/projects/${id}`, config)
    .then(() => dispatch({
      type: DELETE_PROJECT,
      payload: id
    }))
    .catch(err => {
      dispatch(returnErrors(err.response.data, err.response.status));
      dispatch({
        type: DELETE_PROJECT_FAIL
      });
    });
};