import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";

import { getByStudent } from "../redux/actions/attendanceActions";
import { getAllStudents } from "../redux/actions/viewActions";
import Loader from "./Loader";

const AttendanceStudent = ({
  match,
  getByStudent,
  loading,
  classAttendanceStu,
  studentIndex,
  getAllStudents,
  allStudents,
}) => {
  const history = useHistory();
  const [stuAtt, setStuAtt] = useState([]);
  const [subjectList, setSubjectList] = useState([]);
  const [totalPercentage, setTotalPercentage] = useState(0);
  const [studentInfo, setStudentInfo] = useState();

  useEffect(() => {
    getByStudent(match.params.id);
    getAllStudents();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    setStuAtt(getStudentAttendanceData());
    setSubjectList(getSubjectsList());
    // eslint-disable-next-line
  }, [classAttendanceStu]);

  useEffect(() => {
    getFinalPercentage();
    // eslint-disable-next-line
  }, [stuAtt]);

  useEffect(() => {
    const currentStudent = allStudents.find((temp) => {
      return temp.studentID === match.params.id;
    });
    setStudentInfo(currentStudent);
    // eslint-disable-next-line
  }, [allStudents]);

  const getStudentAttendanceData = () => {
    const studentID = match.params.id;
    let finalObj = { total: {} };
    let finalArr = [];
    if (classAttendanceStu) {
      finalObj[studentID] = {};
      classAttendanceStu.forEach((attRecord) => {
        if (!finalObj.total[attRecord.subject])
          finalObj.total[attRecord.subject] = 0;

        if (!finalObj[studentID][attRecord.subject])
          finalObj[studentID][attRecord.subject] = 0;
        if (attRecord.attendanceArr[studentIndex])
          finalObj[studentID][attRecord.subject]++;

        finalObj.total[attRecord.subject]++;
      });
      const tempArr = Object.keys(finalObj);
      tempArr.forEach((t) => {
        finalArr.push({ name: t, ...finalObj[t] });
      });
    }
    return finalArr;
  };

  const getSubjectsList = () => {
    let subjects = [];
    if (classAttendanceStu) {
      classAttendanceStu.forEach((attRecord) => {
        if (subjects.findIndex((t) => t === attRecord.subject) === -1) {
          subjects.push(attRecord.subject);
        }
      });
    }
    return subjects;
  };

  const getFinalPercentage = () => {
    let total = 0;
    let present = 0;
    subjectList.forEach((subject) => {
      total += stuAtt[0][subject];
      present += stuAtt[1][subject];
    });
    let percentage = 0;
    if (total === 0 || present === 0) percentage = 0;
    else percentage = (present / total) * 100;
    setTotalPercentage(percentage.toFixed(2));
  };

  return (
    <div className="userContainer">
      {loading || classAttendanceStu === null ? (
        <Loader />
      ) : (
        <div className="mainDiv">
          <div className="leftDiv">
            {studentInfo && (
              <>
                <div className="icon" />
                <h1>
                  {studentInfo.fullName.firstName}{" "}
                  {studentInfo.fullName.lastName}
                </h1>
                <div className="details">
                  <p>{studentInfo.rollNo}</p>
                  <p>{studentInfo.email}</p>
                </div>
              </>
            )}
            <h1>Attendance: {totalPercentage}%</h1>
            <button
              className="themeButton reverseColor"
              onClick={() => history.goBack()}
            >
              <i className="fa fa-chevron-circle-left"></i> Back
            </button>
          </div>
          <div className="rightDiv">
            <h1>Subject Wise</h1>

            <div className="attCardRow">
              {subjectList.map((subjectName) => (
                <div className="attCard" key={subjectName}>
                  <h1>{subjectName}</h1>
                  <h2>
                    {stuAtt[1][subjectName]}/{stuAtt[0][subjectName]}
                  </h2>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  loading: state.attendance.loading,
  classAttendanceStu: state.attendance.classAttendanceStu,
  studentIndex: state.attendance.studentIndex,
  allStudents: state.view.allStudents,
});

export default connect(mapStateToProps, { getByStudent, getAllStudents })(
  AttendanceStudent
);
