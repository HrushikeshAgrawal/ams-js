import React, { useEffect } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";

import { loadUser } from "../redux/actions/authActions";
import Loader from "./Loader";

const Student = ({ user, loadUser, loading, authType }) => {
  const history = useHistory();
  useEffect(() => {
    loadUser();
    // eslint-disable-next-line
  }, []);

  const showMyAttendance = () => {
    history.push(`/attendance/student/${user.studentID}`);
  };

  const showClassAttendance = () => {
    history.push(`/attendance/class/${user.classID}`);
  };

  return (
    <div className="userContainer">
      {loading || user === null ? (
        <Loader />
      ) : (
        <div className="mainDiv">
          <div className="leftDiv">
            <div className="icon" />
            <h1>
              {user.fullName.firstName} {user.fullName.lastName}
            </h1>
            <div className="details">
              <p>{user.rollNo}</p>
              <p>{user.email}</p>
            </div>
            <div className="details">
              <p>
                Access level:{" "}
                {authType.charAt(0).toUpperCase() + authType.slice(1)}
              </p>
            </div>
          </div>
          <div className="rightDiv">
            <h1>View Attendance</h1>
            <button className="themeButton" onClick={showMyAttendance}>
              <i className="fa fa-user"></i> My Attendance
            </button>
            <button className="themeButton" onClick={showClassAttendance}>
              <i className="fa fa-users"></i> Class Attendance
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  user: state.auth.user,
  loading: state.auth.loading,
  authType: state.auth.authType,
});

export default connect(mapStateToProps, { loadUser })(Student);
