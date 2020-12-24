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

const initialState = {
  projects: [],
  showProject: {},
  loading: false
};

export default function(state = initialState, action) {
  switch(action.type) {
    case PROJECTS_LOADING:
    case PROJECT_LOADING:
      return {
        ...state,
        loading: true
      };

    case GET_PROJECTS:
      return {
        ...state,
        projects: action.payload,
        loading: false
      };

    case ADD_PROJECT:
			return {
				...state,
        projects: [...state.projects, action.payload]
      };

    case SHOW_PROJECT:
      return {
        ...state,
        showProject: action.payload,
        loading: false
      };

    case DELETE_PROJECT:
      return {
        ...state,
        projects: state.projects.filter(project => project._id !== action.payload)
      };
      
    case ADD_PROJECT_FAIL:
    case EDIT_PROJECT:
    case EDIT_PROJECT_FAIL:
    case DELETE_PROJECT_FAIL:
      return { ...state };

    default:
      return state;
  };
};