import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { loadUser } from "../redux/actions/authActions";
import { getAllClasses, getAllStudents } from "../redux/actions/viewActions";
import { startNewAttendance } from "../redux/actions/attendanceActions";
import Loader from "./Loader";

const Staff = ({
  user,
  loading,
  loading2,
  getAllClasses,
  allClasses,
  loadUser,
  getAllStudents,
  allStudents,
  startNewAttendance,
}) => {
  const [viewClassID, setViewClassID] = useState("");
  const [selectedClass, setSelectedClass] = useState({});
  const [classStudents, setClassStudents] = useState([]);
  const [subject, setSubject] = useState("");
  const [lectureDate, setLectureDate] = useState(new Date());
  const [startTime, setStartTime] = useState(new Date());
  const [endTime, setEndTime] = useState(new Date());
  const [newAttArr, setNewAttArr] = useState([]);
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
      const tempAttArr = new Array(stuArr.length).fill(0);
      setNewAttArr(tempAttArr);
      setClassStudents(stuArr);
      setSelectedClass(temp);
    }
    // eslint-disable-next-line
  }, [viewClassID]);

  const changeAttendance = (index, value) => {
    setNewAttArr(
      newAttArr.map((item, i) => {
        return i === index ? value : item;
      })
    );
  };

  const fillAttendance = (value) => {
    setNewAttArr(newAttArr.map((item) => value));
  };

  const addAttendance = async () => {
    let body = {};
    body.classID = viewClassID;
    let month = lectureDate.getMonth() + 1;
    body.date =
      lectureDate.getDate() + "/" + month + "/" + lectureDate.getFullYear();
    body.startTime = startTime.toLocaleString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
    body.endTime = endTime.toLocaleString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
    body.subject = subject;
    body.staffInchargeID = user.staffID;
    body.staffTakingID = user.staffID;
    body.attendanceArr = newAttArr;
    const res = await startNewAttendance(body);
    if (res.success === true) {
      history.push("/staff");
    }
  };

  return (
    <div className="userContainer">
      {loading || loading2 || user === null ? (
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
              <input
                type="text"
                placeholder="Subject Name"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
              />
              <p>Conducted By: {user.initials}</p>
            </div>
            <button
              style={{ marginTop: "20px" }}
              className="themeButton reverseColor"
              onClick={() => history.goBack()}
            >
              <i className="fa fa-chevron-circle-left"></i> Back
            </button>
          </div>
          <div className="rightDiv">
            {viewClassID === "" ? (
              <p className="selectedClassName">No Class Chosen</p>
            ) : (
              <>
                <p className="selectedClassName">{selectedClass.className}</p>
                <div className="btnRow">
                  <button
                    className="themeButton"
                    onClick={() => fillAttendance(1)}
                  >
                    All Present
                  </button>
                  <button
                    className="themeButton redBtn"
                    onClick={() => fillAttendance(0)}
                  >
                    All Absent
                  </button>
                </div>
                <table className="markAttTable" cellSpacing="0" cellPadding="5">
                  <thead>
                    <tr>
                      <td>Student Name</td>
                      <td>Student RollNo</td>
                      <td>Mark Present</td>
                      <td>Mark Absent</td>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedClass.studentsArr &&
                      classStudents.map((student, index) => (
                        <tr key={student.studentID} className="studentRow">
                          <td
                            className={
                              newAttArr[index] === 1
                                ? "stuPresent"
                                : "stuAbsent"
                            }
                          >
                            {student.fullName.firstName}{" "}
                            {student.fullName.lastName}
                          </td>
                          <td
                            className={
                              newAttArr[index] === 1
                                ? "stuPresent"
                                : "stuAbsent"
                            }
                          >
                            {student.rollNo}
                          </td>
                          <td>
                            <button
                              className="present"
                              onClick={() => changeAttendance(index, 1)}
                            >
                              P
                            </button>
                          </td>
                          <td>
                            <button
                              className="absent"
                              onClick={() => changeAttendance(index, 0)}
                            >
                              A
                            </button>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
                <button
                  style={{ marginTop: "10px" }}
                  className="themeButton"
                  onClick={addAttendance}
                >
                  Add Attendance
                </button>
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
  loading2: state.attendance.loading,
  allClasses: state.view.allClasses,
  allStudents: state.view.allStudents,
});

export default connect(mapStateToProps, {
  loadUser,
  getAllClasses,
  getAllStudents,
  startNewAttendance,
})(Staff);
