import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";

import Loader from "../Loader";
import { addStaff } from "../../redux/actions/add";

const AddStaff = ({ loading, addStaff }) => {
  const history = useHistory();
  const [staffName, setStaffName] = useState("");
  const [staffInitials, setStaffInitials] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  useEffect(() => {
    // eslint-disable-next-line
  }, []);

  const handleClick = async (e) => {
    e.preventDefault();
    const { success } = await addStaff(
      staffName,
      staffInitials,
      email,
      password
    );
    if (success) {
      history.push("/admin");
    }
  };

  return (
    <div className="userContainer">
      {loading ? (
        <Loader />
      ) : (
        <div className="mainDiv">
          <div className="addNewEntity">
            <h1>Add New Staff</h1>
            <form>
              <div className="row">
                <label>Staff Name</label>
                <input
                  type="text"
                  value={staffName}
                  onChange={(e) => setStaffName(e.target.value)}
                />
              </div>
              <div className="row">
                <label>Staff Initials</label>
                <input
                  type="text"
                  value={staffInitials}
                  onChange={(e) => setStaffInitials(e.target.value)}
                />
              </div>
              <div className="row">
                <label>Email ID</label>
                <input
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="row">
                <label>Password</label>
                <input
                  type="text"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="row">
                <button
                  className="themeButton reverseColor"
                  onClick={(e) => {
                    e.preventDefault();
                    history.goBack();
                  }}
                >
                  <i className="fa fa-chevron-circle-left"></i> Back
                </button>
                <button
                  className="themeButton reverseColor"
                  onClick={(e) => handleClick(e)}
                >
                  <i className="fa fa-user-plus"></i> Add Staff
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  loading: state.add.loading,
});

export default connect(mapStateToProps, { addStaff })(AddStaff);
