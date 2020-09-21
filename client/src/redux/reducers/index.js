import { combineReducers } from "redux";

import authReducer from "./authReducer";
import viewReducer from "./viewReducer";
import attendanceReducer from "./attendanceReducer";

export default combineReducers({
  auth: authReducer,
  view: viewReducer,
  attendance: attendanceReducer,
});
