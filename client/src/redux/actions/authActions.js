import { ERROR, LOGIN_USER, SET_LOADING_AUTH, LOAD_USER } from "./types";
import axios from "axios";

export const loginUser = (email, password, authType) => async (dispatch) => {
  try {
    dispatch({ type: SET_LOADING_AUTH });
    const headers = {
      "Content-Type": "application/json",
    };
    const res = await axios.post(
      `/auth/${authType}`,
      { email, password },
      { headers: headers }
    );
    const payload = {
      token: res.data.token,
      authType,
    };
    dispatch({
      type: LOGIN_USER,
      payload,
    });
    return res.data;
  } catch (err) {
    dispatch({
      type: ERROR,
      payload: err.response.data.error,
    });
    return err.response.data;
  }
};

export const loadUser = () => async (dispatch) => {
  try {
    dispatch({ type: SET_LOADING_AUTH });
    const token = localStorage.getItem("token");
    const authType = localStorage.getItem("authType");
    const headers = {
      "Content-Type": "application/json",
      "x-auth-token": token,
    };
    const res = await axios.get(`/auth/${authType}`, { headers: headers });
    const payload = {
      user: res.data[authType],
      authType: res.data.authType,
    };
    dispatch({
      type: LOAD_USER,
      payload,
    });
    return res.data;
  } catch (err) {
    dispatch({
      type: ERROR,
      payload: err.response.data.error,
    });
    return err.response.data;
  }
};
