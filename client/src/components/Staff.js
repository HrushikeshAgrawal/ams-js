import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";

import { loadUser } from "../redux/actions/authActions";
import { getAllClasses } from "../redux/actions/viewActions";
import Loader from "./Loader";

const Staff = ({
  user,
  loadUser,
  loading,
  authType,
  getAllClasses,
  allClasses,
}) => {
  const [viewClassID, setViewClassID] = useState("");
  const [buttonDisable, setButtonDisable] = useState(true);
  const history = useHistory();
  useEffect(() => {
    loadUser();
    getAllClasses();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (viewClassID === "") setButtonDisable(true);
    else setButtonDisable(false);
  }, [viewClassID]);

  const showClassAttendance = async (e) => {
    e.preventDefault();
    history.push(`/attendance/class/${viewClassID}`);
  };

  const startNewAttendance = async (e) => {
    e.preventDefault();
    history.push(`attendance/start`);
  };

  return (
    <div className="userContainer">
      {loading || user === null ? (
        <Loader />
      ) : (
        <div className="mainDiv">
          <div className="leftDiv">
            <div className="icon" />
            <h1>{user.staffName}</h1>
            <div className="details">
              <p>{user.initials}</p>
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
            {/* <h1>View Attendance</h1> */}
            <button className="themeButton" onClick={startNewAttendance}>
              <i className="fa fa-play-circle"></i> Start Attendance
            </button>
            <Popup
              trigger={
                <button className="themeButton">
                  <i className="fa fa-users"></i> View a Class Attendance
                </button>
              }
              modal
            >
              {(close) => (
                <div className="modal">
                  <button className="close" onClick={close}>
                    &times;
                  </button>
                  <div className="header"> Choose a class </div>
                  <div className="classInput">
                    <select
                      value={viewClassID}
                      onChange={(e) => setViewClassID(e.target.value)}
                    >
                      <option value="">Select a class</option>
                      {allClasses.map((_class) => (
                        <option key={_class.classID} value={_class.classID}>
                          {_class.className} ({_class.classID})
                        </option>
                      ))}
                    </select>
                    <button
                      className="themeButton"
                      onClick={showClassAttendance}
                      disabled={buttonDisable}
                    >
                      <i className="fa fa-users"></i> View
                    </button>
                  </div>
                </div>
              )}
            </Popup>
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
  allClasses: state.view.allClasses,
});

export default connect(mapStateToProps, { loadUser, getAllClasses })(Staff);
