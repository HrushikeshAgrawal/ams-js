import {
  ERROR,
  SET_LOADING_ADD,
  ADD_CLASS,
  ADD_STAFF,
  ADD_STUDENT,
} from "./types";
import axios from "axios";

export const addClass = (className) => async (dispatch) => {
  try {
    dispatch({ type: SET_LOADING_ADD });
    const token = localStorage.getItem("token");
    const headers = {
      "Content-Type": "application/json",
      "x-auth-token": token,
    };
    const res = await axios.post(
      `/add/class`,
      { className },
      { headers: headers }
    );
    if (res.data.success) {
      dispatch({
        type: ADD_CLASS,
        payload: res.data._class,
      });
    }
    return res.data;
  } catch (err) {
    dispatch({
      type: ERROR,
      payload: err.response.data.error,
    });
    return err.response.data;
  }
};

export const addStudent = (
  classID,
  rollNo,
  firstName,
  lastName,
  email,
  password
) => async (dispatch) => {
  try {
    dispatch({ type: SET_LOADING_ADD });
    const token = localStorage.getItem("token");
    const headers = {
      "Content-Type": "application/json",
      "x-auth-token": token,
    };
    const res = await axios.post(
      `/add/student`,
      {
        classID,
        rollNo,
        firstName,
        lastName,
        email,
        password,
      },
      { headers: headers }
    );
    if (res.data.success) {
      dispatch({
        type: ADD_STUDENT,
        payload: res.data.student,
      });
    }
    return res.data;
  } catch (err) {
    dispatch({
      type: ERROR,
      payload: err.response.data.error,
    });
    return err.response.data;
  }
};

export const addStaff = (staffName, initials, email, password) => async (
  dispatch
) => {
  try {
    dispatch({ type: SET_LOADING_ADD });
    const token = localStorage.getItem("token");
    const headers = {
      "Content-Type": "application/json",
      "x-auth-token": token,
    };
    const res = await axios.post(
      `/add/staff`,
      {
        staffName,
        initials,
        email,
        password,
      },
      { headers: headers }
    );
    if (res.data.success) {
      dispatch({
        type: ADD_STAFF,
        payload: res.data.staff,
      });
    }
    return res.data;
  } catch (err) {
    dispatch({
      type: ERROR,
      payload: err.response.data.error,
    });
    return err.response.data;
  }
};
