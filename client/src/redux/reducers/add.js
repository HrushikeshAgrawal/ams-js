import {
  ERROR,
  SET_LOADING_ADD,
  ADD_CLASS,
  ADD_STAFF,
  ADD_STUDENT,
} from "../actions/types";

const initialState = {
  error: null,
  loading: false,
  newClass: {},
  newStaff: {},
  newStudent: {},
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_CLASS:
      return {
        ...state,
        loading: false,
        newClass: action.payload,
      };
    case ADD_STUDENT:
      return {
        ...state,
        loading: false,
        newStudent: action.payload,
      };
    case ADD_STAFF:
      return {
        ...state,
        loading: false,
        newStaff: action.payload,
      };
    case SET_LOADING_ADD:
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
