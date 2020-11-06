import React, { useEffect, useMemo } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import DataTable from "react-data-table-component";

import Loader from "../Loader";
import { getAllClasses } from "../../redux/actions/viewActions";

const AllClasses = ({ allClasses, getAllClasses, loading }) => {
  const history = useHistory();
  useEffect(() => {
    getAllClasses();
    // eslint-disable-next-line
  }, []);

  const columns = useMemo(
    () => [
      {
        name: "Class ID",
        selector: "classID",
        sortable: true,
        center: true,
      },
      {
        name: "Class Name",
        selector: "className",
        sortable: true,
        center: true,
      },
      {
        name: "Students Count",
        selector: "studentsArr.length",
        sortable: true,
        center: true,
      },
      {
        name: "View Attendance",
        cell: (row) => (
          <button
            onClick={() => history.push(`/attendance/class/${row.classID}`)}
          >
            View
          </button>
        ),
        button: true,
      },
    ],
    // eslint-disable-next-line
    []
  );

  return (
    <div className="userContainer">
      {loading ? (
        <Loader />
      ) : (
        <div className="mainDiv">
          <div className="displayAllList">
            <h1>Classes List</h1>
            <DataTable
              columns={columns}
              data={allClasses}
              pagination={true}
              paginationPerPage={10}
              paginationRowsPerPageOptions={[5, 10, 20]}
            />
            <div className="options">
              <button
                style={{ marginTop: "20px" }}
                className="themeButton reverseColor"
                onClick={() => history.goBack()}
              >
                <i className="fa fa-chevron-circle-left"></i> Back
              </button>
              <button
                style={{ marginTop: "20px" }}
                className="themeButton reverseColor"
                onClick={() => history.push("/admin/addClass")}
              >
                <i className="fa fa-user-plus"></i> Add New Class
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  allClasses: state.view.allClasses,
  loading: state.view.loading,
});

export default connect(mapStateToProps, { getAllClasses })(AllClasses);
