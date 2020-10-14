import {
  ERROR,
  SET_LOADING_ATT,
  GET_BY_CLASS,
  GET_BY_STUDENT,
  START_NEW,
} from "./types";
import axios from "axios";

export const getByClass = (classID) => async (dispatch) => {
  try {
    dispatch({ type: SET_LOADING_ATT });
    const res = await axios.get(`/attendance/getByClass/${classID}`);
    dispatch({
      type: GET_BY_CLASS,
      payload: res.data.classAttendance,
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

export const getByStudent = (studentID) => async (dispatch) => {
  try {
    dispatch({ type: SET_LOADING_ATT });
    const res = await axios.get(`/attendance/getByStudent/${studentID}`);
    dispatch({
      type: GET_BY_STUDENT,
      payload: {
        classAttendanceStu: res.data.classAttendance,
        studentIndex: res.data.studentIndex,
      },
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

export const startNewAttendance = (body) => async (dispatch) => {
  try {
    dispatch({ type: SET_LOADING_ATT });
    const token = localStorage.getItem("token");
    const headers = {
      "Content-Type": "application/json",
      "x-auth-token": token,
    };
    const res = await axios.post(`/attendance/addAttendance`, body, {
      headers: headers,
    });
    if (res.data.success === true) {
      dispatch({
        type: START_NEW,
      });
      return res.data;
    }
  } catch (err) {
    dispatch({
      type: ERROR,
      payload: err.response.data.error,
    });
    return err.response.data;
  }
};
