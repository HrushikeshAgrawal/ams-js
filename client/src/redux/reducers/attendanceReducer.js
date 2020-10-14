import {
  ERROR,
  SET_LOADING_ATT,
  GET_BY_CLASS,
  GET_BY_STUDENT,
  START_NEW,
} from "../actions/types";

const initialState = {
  error: null,
  loading: false,
  classAttendance: null,
  classAttendanceStu: null,
  studentIndex: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_BY_CLASS:
      return {
        ...state,
        classAttendance: action.payload,
        loading: false,
      };
    case GET_BY_STUDENT:
      return {
        ...state,
        classAttendanceStu: action.payload.classAttendanceStu,
        studentIndex: action.payload.studentIndex,
        loading: false,
      };
    case START_NEW:
      return {
        ...state,
        loading: false,
      };
    case SET_LOADING_ATT:
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
