import React, { useEffect, useMemo } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import DataTable from "react-data-table-component";

import Loader from "../Loader";
import { getAllStaff } from "../../redux/actions/viewActions";

const AllStaff = ({ allStaff, getAllStaff, loading }) => {
  const history = useHistory();
  useEffect(() => {
    getAllStaff();
    // eslint-disable-next-line
  }, []);

  const columns = useMemo(() => [
    {
      name: "Staff ID",
      selector: "staffID",
      sortable: true,
      center: true,
    },
    {
      name: "Name",
      selector: "staffName",
      sortable: true,
      center: true,
    },
    {
      name: "Initials",
      selector: "initials",
      sortable: true,
      center: true,
    },
    {
      name: "Email ID",
      selector: "email",
      sortable: true,
      center: true,
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
              data={allStaff}
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
  allStaff: state.view.allStaff,
  loading: state.view.loading,
});

export default connect(mapStateToProps, { getAllStaff })(AllStaff);
