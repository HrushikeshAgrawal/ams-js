import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";

import Loader from "../Loader";
import { addClass } from "../../redux/actions/add";

const AddClass = ({ loading, addClass }) => {
  const history = useHistory();
  const [newClassName, setNewClassName] = useState("");
  useEffect(() => {
    // eslint-disable-next-line
  }, []);

  const handleClick = async (e) => {
    e.preventDefault();
    const { success } = await addClass(newClassName);
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
            <h1>Add New Class</h1>
            <form>
              <div className="row">
                <label htmlFor="newClassName">Class Name</label>
                <input
                  type="text"
                  name="newClassName"
                  value={newClassName}
                  onChange={(e) => setNewClassName(e.target.value)}
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
                  <i className="fa fa-user-plus"></i> Add Class
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

export default connect(mapStateToProps, { addClass })(AddClass);
