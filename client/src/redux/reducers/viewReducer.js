import {
  ERROR,
  SET_LOADING_VIEW,
  VIEW_CLASS,
  GET_ALL_STUDENTS,
  GET_ALL_CLASSES,
} from "../actions/types";

const initialState = {
  error: null,
  loading: true,
  allStudents: [],
  allClasses: [],
  _class: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case VIEW_CLASS:
      return {
        ...state,
        _class: action.payload,
        loading: false,
      };
    case GET_ALL_STUDENTS:
      return {
        ...state,
        allStudents: action.payload,
        loading: false,
      };
    case GET_ALL_CLASSES:
      return {
        ...state,
        allClasses: action.payload,
        loading: false,
      };
    case SET_LOADING_VIEW:
      return {
        ...state,
        loading: true,
      };
    case ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    default:
      return state;
  }
};
