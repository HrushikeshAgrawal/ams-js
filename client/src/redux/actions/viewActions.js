import {
  ERROR,
  SET_LOADING_VIEW,
  VIEW_CLASS,
  GET_ALL_STUDENTS,
  GET_ALL_CLASSES,
} from "./types";
import axios from "axios";

export const viewClass = (classID) => async (dispatch) => {
  try {
    dispatch({ type: SET_LOADING_VIEW });
    const res = await axios.get(`/view/class/${classID}`);
    dispatch({
      type: VIEW_CLASS,
      payload: res.data._class,
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

export const getAllStudents = () => async (dispatch) => {
  try {
    dispatch({ type: SET_LOADING_VIEW });
    const res = await axios.get(`/view/getAllStudents`);
    dispatch({
      type: GET_ALL_STUDENTS,
      payload: res.data.students,
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

export const getAllClasses = () => async (dispatch) => {
  try {
    dispatch({ type: SET_LOADING_VIEW });
    const res = await axios.get(`/view/getAllClasses`);
    dispatch({
      type: GET_ALL_CLASSES,
      payload: res.data.classes,
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
