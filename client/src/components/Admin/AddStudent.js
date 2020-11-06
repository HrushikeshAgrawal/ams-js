import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";

import Loader from "../Loader";
import { getAllClasses } from "../../redux/actions/viewActions";
import { addStudent } from "../../redux/actions/add";

const AddStudent = ({
  loading,
  getAllClasses,
  loading2,
  allClasses,
  addStudent,
}) => {
  const history = useHistory();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [rollNo, setRollNo] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [classID, setClassID] = useState(0);
  useEffect(() => {
    getAllClasses();
    // eslint-disable-next-line
  }, []);

  const handleClick = async (e) => {
    e.preventDefault();
    const { success } = await addStudent(
      classID,
      rollNo,
      firstName,
      lastName,
      email,
      password
    );
    if (success) {
      history.push("/admin");
    }
  };

  return (
    <div className="userContainer">
      {loading || loading2 ? (
        <Loader />
      ) : (
        <div className="mainDiv">
          <div className="addNewEntity">
            <h1>Add New Student</h1>
            <form>
              <div className="row">
                <label>First Name</label>
                <input
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </div>
              <div className="row">
                <label>Last Name</label>
                <input
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </div>
              <div className="row">
                <label>Select Class</label>
                <select
                  value={classID}
                  onChange={(e) => setClassID(e.target.value)}
                >
                  <option value={0} disabled>
                    Choose a Class Name
                  </option>
                  {allClasses.map((_class) => (
                    <option key={_class.classID} value={_class.classID}>
                      {_class.className}
                    </option>
                  ))}
                </select>
              </div>
              <div className="row">
                <label>Roll No</label>
                <input
                  type="text"
                  value={rollNo}
                  onChange={(e) => setRollNo(e.target.value)}
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
                  <i className="fa fa-user-plus"></i> Add Student
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
  allClasses: state.view.allClasses,
  loading: state.add.loading,
  loading2: state.view.loading,
});

export default connect(mapStateToProps, { getAllClasses, addStudent })(
  AddStudent
);
