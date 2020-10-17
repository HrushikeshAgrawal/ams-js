import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import "reactjs-popup/dist/index.css";

import { loadUser } from "../redux/actions/authActions";
import {
  getAllClasses,
  getAllStudents,
  getAllStaff,
} from "../redux/actions/viewActions";
import Loader from "./Loader";

const Admin = ({
  user,
  loadUser,
  loading,
  loading2,
  getAllClasses,
  allClasses,
  allStaff,
  allStudents,
  getAllStaff,
  getAllStudents,
}) => {
  useEffect(() => {
    loadUser();
    getAllClasses();
    getAllStaff();
    getAllStudents();
    // eslint-disable-next-line
  }, []);

  return (
    <div className="userContainer">
      {loading || loading2 || user === null ? (
        <Loader />
      ) : (
        <div className="adminRow">
          <Link to="/admin/students">
            <div className="adminBox">
              <i className="fas fa-user-graduate"></i>
              <p>{allStudents.length}</p>
              <p>Students</p>
            </div>
          </Link>
          <Link to="/admin/classes">
            <div className="adminBox">
              <i className="fas fa-users"></i>
              <p>{allClasses.length}</p>
              <p>Classes</p>
            </div>
          </Link>
          <Link to="/admin/staff">
            <div className="adminBox">
              <i className="fas fa-user-tie"></i>
              <p>{allStaff.length}</p>
              <p>Staff Members</p>
            </div>
          </Link>
        </div>
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  user: state.auth.user,
  loading: state.auth.loading,
  loading2: state.view.loading,
  authType: state.auth.authType,
  allClasses: state.view.allClasses,
  allStudents: state.view.allStudents,
  allStaff: state.view.allStaff,
});

export default connect(mapStateToProps, {
  loadUser,
  getAllClasses,
  getAllStaff,
  getAllStudents,
})(Admin);
