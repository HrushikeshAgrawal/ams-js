import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import DataTable from "react-data-table-component";
import { useHistory } from "react-router-dom";

import { viewClass } from "../redux/actions/viewActions";
import { getByClass } from "../redux/actions/attendanceActions";
import { getAllStudents } from "../redux/actions/viewActions";
import Loader from "./Loader";

const AttendanceClass = ({
  match,
  viewClass,
  _class,
  loading,
  getByClass,
  classAttendance,
  allStudents,
  getAllStudents,
}) => {
  const history = useHistory();
  const [filteredClassAttendance, setFilteredClassAttendance] = useState([]);
  const [formattedClassAttendance, setFormattedClassAttendance] = useState([]);

  useEffect(() => {
    viewClass(match.params.id);
    getByClass(match.params.id);
    getAllStudents();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    setFilteredClassAttendance(classAttendance);
  }, [classAttendance]);

  useEffect(() => {
    setFormattedClassAttendance(getClassAttendanceData());
    // eslint-disable-next-line
  }, [filteredClassAttendance, _class, allStudents]);

  const getClassAttendanceData = () => {
    let finalObj = { total: {} };
    let finalArr = [];
    let studentsInfo = {};
    if (filteredClassAttendance && _class && allStudents) {
      console.log("AALLL: ", allStudents);
      allStudents.forEach((student) => {
        studentsInfo[student.studentID] = {
          fullName: student.fullName,
          rollNo: student.rollNo,
        };
      });
      _class.studentsArr.forEach((student) => {
        finalObj[student] = {};
      });
      filteredClassAttendance.forEach((attRecord) => {
        if (!finalObj.total[attRecord.subject])
          finalObj.total[attRecord.subject] = 0;
        _class.studentsArr.forEach((student, index) => {
          if (!finalObj[student][attRecord.subject])
            finalObj[student][attRecord.subject] = 0;
          if (attRecord.attendanceArr[index])
            finalObj[student][attRecord.subject]++;
        });
        finalObj.total[attRecord.subject]++;
      });
      const tempArr = Object.keys(finalObj);
      tempArr.forEach((t) => {
        if (t === "total") {
          finalArr.push({
            stuID: "-",
            name: "Total Lectures",
            rollNo: "-",
            ...finalObj[t],
          });
        } else {
          finalArr.push({
            stuID: t,
            name:
              studentsInfo[t].fullName.firstName +
              " " +
              studentsInfo[t].fullName.lastName,
            rollNo: studentsInfo[t].rollNo,
            ...finalObj[t],
          });
        }
      });
    }
    // return [...finalArr, ...finalArr, ...finalArr, ...finalArr];
    return finalArr;
  };

  const getClassAttendanceColumns = () => {
    let columns = [
      {
        name: "Name",
        selector: "name",
        sortable: true,
        center: true,
      },
      {
        name: "RollNo",
        selector: "rollNo",
        sortable: true,
        center: true,
      },
    ];
    if (filteredClassAttendance && _class) {
      filteredClassAttendance.forEach((attRecord, index) => {
        if (columns.findIndex((t) => t.name === attRecord.subject) === -1) {
          columns.push({
            name: attRecord.subject,
            selector: attRecord.subject,
            sortable: true,
            center: true,
          });
        }
      });
    }
    // return [...columns, ...columns, ...columns, ...columns, ...columns];
    return columns;
  };

  const convertArrayOfObjectsToCSV = (array) => {
    let result;
    const columnDelimiter = ",";
    const lineDelimiter = "\n";
    const keys = Object.keys(formattedClassAttendance[0]);
    result = "";
    result += keys.join(columnDelimiter);
    result += lineDelimiter;
    array.forEach((item) => {
      let ctr = 0;
      keys.forEach((key) => {
        if (ctr > 0) result += columnDelimiter;

        result += item[key];

        ctr++;
      });
      result += lineDelimiter;
    });
    return result;
  };
  const downloadCSV = (array) => {
    const link = document.createElement("a");
    let csv = convertArrayOfObjectsToCSV(array);
    if (csv == null) return;
    const filename = "export.csv";
    if (!csv.match(/^data:text\/csv/i)) {
      csv = `data:text/csv;charset=utf-8,${csv}`;
    }
    link.setAttribute("href", encodeURI(csv));
    link.setAttribute("download", filename);
    link.click();
  };

  return (
    <div className="userContainer">
      {loading || _class === null ? (
        <Loader />
      ) : (
        <div className="mainDiv">
          <div className="leftDiv">
            <div className="classDetails">
              <button
                className="themeButton reverseColor"
                onClick={() => downloadCSV(formattedClassAttendance)}
              >
                <i className="fa fa-file-download"></i> Download
              </button>
              <button
                style={{ marginTop: "20px" }}
                className="themeButton reverseColor"
                onClick={() => history.goBack()}
              >
                <i className="fa fa-chevron-circle-left"></i> Back
              </button>
            </div>
          </div>
          <div className="rightDiv">
            <h1>Attendance of class: {_class.className}</h1>
            <div className="attTable">
              <DataTable
                columns={getClassAttendanceColumns()}
                data={formattedClassAttendance}
                pagination={true}
                paginationPerPage={10}
                paginationRowsPerPageOptions={[5, 10, 20]}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  _class: state.view._class,
  loading: state.view.loading,
  classAttendance: state.attendance.classAttendance,
  allStudents: state.view.allStudents,
});

export default connect(mapStateToProps, {
  viewClass,
  getByClass,
  getAllStudents,
})(AttendanceClass);
