import { combineReducers } from "redux";

import authReducer from "./authReducer";
import viewReducer from "./viewReducer";
import attendanceReducer from "./attendanceReducer";
import addReducer from "./add";

export default combineReducers({
  auth: authReducer,
  view: viewReducer,
  attendance: attendanceReducer,
  add: addReducer,
});
