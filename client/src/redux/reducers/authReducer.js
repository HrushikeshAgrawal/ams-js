import {
  ERROR,
  LOGIN_USER,
  SET_LOADING_AUTH,
  LOAD_USER,
} from "../actions/types";

const initialState = {
  error: null,
  user: null,
  loading: false,
  token: null,
  authType: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_USER:
      localStorage.setItem("token", action.payload.token);
      localStorage.setItem("authType", action.payload.authType);
      return {
        ...state,
        token: action.payload.token,
        authType: action.payload.authType,
        loading: false,
      };
    case LOAD_USER:
      return {
        ...state,
        user: action.payload.user,
        authType: action.payload.authType,
        loading: false,
      };
    case SET_LOADING_AUTH:
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
