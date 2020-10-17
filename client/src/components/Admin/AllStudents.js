import React, { useEffect, useMemo } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import DataTable from "react-data-table-component";

import Loader from "../Loader";
import { getAllStudents } from "../../redux/actions/viewActions";

const AllStudents = ({ allStudents, getAllStudents, loading }) => {
  const history = useHistory();
  useEffect(() => {
    getAllStudents();
    // eslint-disable-next-line
  }, []);

  const columns = useMemo(() => [
    {
      name: "Roll No",
      selector: "rollNo",
      sortable: true,
      center: true,
    },
    {
      name: "Name",
      selector: (row) => {
        return row.fullName.firstName + " " + row.fullName.lastName;
      },
      sortable: true,
      center: true,
    },
    {
      name: "Email ID",
      selector: "email",
      sortable: true,
      center: true,
    },
    {
      name: "View Attendance",
      cell: (row) => (
        <button
          onClick={() => history.push(`/attendance/student/${row.studentID}`)}
        >
          View
        </button>
      ),
      button: true,
    },
    {
      name: "View Class",
      cell: (row) => (
        <button
          onClick={() => history.push(`/attendance/class/${row.classID}`)}
        >
          View
        </button>
      ),
      button: true,
    },
  ]);

  return (
    <div className="userContainer">
      {loading ? (
        <Loader />
      ) : (
        <div className="mainDiv">
          <div className="displayAllList">
            <h1>Students List</h1>
            <DataTable
              columns={columns}
              data={allStudents}
              pagination={true}
              paginationPerPage={10}
              paginationRowsPerPageOptions={[5, 10, 20]}
            />
            <button
              style={{ marginTop: "20px" }}
              className="themeButton reverseColor"
              onClick={() => history.goBack()}
            >
              <i className="fa fa-chevron-circle-left"></i> Back
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  allStudents: state.view.allStudents,
  loading: state.view.loading,
});

export default connect(mapStateToProps, { getAllStudents })(AllStudents);
