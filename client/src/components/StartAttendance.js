import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { loadUser } from "../redux/actions/authActions";
import { getAllClasses, getAllStudents } from "../redux/actions/viewActions";
import Loader from "./Loader";

const Staff = ({
  user,
  loading,
  getAllClasses,
  allClasses,
  loadUser,
  getAllStudents,
  allStudents,
}) => {
  const [viewClassID, setViewClassID] = useState("");
  const [selectedClass, setSelectedClass] = useState({});
  const [classStudents, setClassStudents] = useState([]);
  const [lectureDate, setLectureDate] = useState(new Date());
  const [startTime, setStartTime] = useState(new Date());
  const [endTime, setEndTime] = useState(new Date());
  const [buttonDisable, setButtonDisable] = useState(true);
  const history = useHistory();
  useEffect(() => {
    loadUser();
    getAllClasses();
    getAllStudents();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (viewClassID === "") setButtonDisable(true);
    else setButtonDisable(false);
  }, [viewClassID]);

  useEffect(() => {
    if (viewClassID === "") return;
    else {
      const temp = allClasses.find((_class) => _class.classID === viewClassID);
      const stuArr = [];
      temp.studentsArr.forEach((studentID) => {
        stuArr.push(allStudents.find((stu) => stu.studentID === studentID));
      });
      setClassStudents(stuArr);
      setSelectedClass(temp);
    }
    // eslint-disable-next-line
  }, [viewClassID]);

  return (
    <div className="userContainer">
      {loading || user === null ? (
        <Loader />
      ) : (
        <div className="mainDiv">
          <div className="leftDiv">
            <h1>Start New Attendance</h1>
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
            </div>
            <div className="dateTimeSelect">
              <div className="dateTimeDiv">
                <p>Select Date</p>
                <DatePicker
                  dateFormat="dd/MM/yyyy"
                  selected={lectureDate}
                  onChange={(date) => setLectureDate(date)}
                />
              </div>
              <div className="dateTimeDiv">
                <p>Start Time</p>
                <DatePicker
                  selected={startTime}
                  onChange={(date) => setStartTime(date)}
                  showTimeSelect
                  showTimeSelectOnly
                  timeIntervals={30}
                  timeCaption="Start Time"
                  dateFormat="h:mm aa"
                />
              </div>
              <div className="dateTimeDiv">
                <p>Select Date</p>
                <DatePicker
                  selected={endTime}
                  onChange={(date) => setEndTime(date)}
                  showTimeSelect
                  showTimeSelectOnly
                  timeIntervals={30}
                  timeCaption="End Time"
                  dateFormat="h:mm aa"
                />
              </div>
            </div>
            <div className="subjectDiv">
              <input type="text" placeholder="Subject Name" />
              <p>Conducted By: {user.initials}</p>
            </div>
          </div>
          <div className="rightDiv">
            {viewClassID === "" ? (
              <p className="selectedClassName">No Class Chosen</p>
            ) : (
              <>
                <p className="selectedClassName">{selectedClass.className}</p>
                {selectedClass.studentsArr &&
                  classStudents.map((student) => (
                    <div key={student.studentID} className="stuList">
                      <p>{student.rollNo}</p>
                    </div>
                  ))}
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  user: state.auth.user,
  loading: state.auth.loading,
  allClasses: state.view.allClasses,
  allStudents: state.view.allStudents,
});

export default connect(mapStateToProps, {
  loadUser,
  getAllClasses,
  getAllStudents,
})(Staff);
