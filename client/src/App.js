import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import { Provider } from "react-redux";

import store from "./redux/store";
import Login from "./components/Login";
import Student from "./components/Student";
import Staff from "./components/Staff";
import Admin from "./components/Admin";
import AttendanceClass from "./components/AttendanceClass";
import AttendanceStudent from "./components/AttendanceStudent";
import StartAttendance from "./components/StartAttendance";

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <div className="mainContainer">
          <Switch>
            <Route exact path="/" component={Login} />
            <Route exact path="/student" component={Student} />
            <Route exact path="/staff" component={Staff} />
            <Route exact path="/admin" component={Admin} />
            <Route
              exact
              path="/attendance/student/:id"
              component={AttendanceStudent}
            />
            <Route
              exact
              path="/attendance/class/:id"
              component={AttendanceClass}
            />
            <Route exact path="/attendance/start" component={StartAttendance} />
          </Switch>
        </div>
      </Router>
    </Provider>
  );
};

export default App;