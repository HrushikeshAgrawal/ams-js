import React, { useState, useEffect } from "react";
import { useHistory, Link } from "react-router-dom";
import { connect } from "react-redux";

import Loader from "./Loader";
import { loginUser } from "../redux/actions/authActions";

const Login = ({ loginUser, loading }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("123123");
  const [authType, setAuthType] = useState("student");
  const history = useHistory();

  const onSubmit = async (e) => {
    e.preventDefault();
    console.log(email, password);
    const { success } = await loginUser(email, password, authType);
    if (success) {
      history.push(`/${authType}`);
    }
  };

  useEffect(() => {
    if (authType === "student") setEmail("ishanj@g.c");
    else if (authType === "staff") setEmail("sp@gmail.com");
    else if (authType === "admin") setEmail("admin4@gmail.com");
  }, [authType]);

  const getClassNames = (temp) => {
    if (temp === authType) return "authType selectedAuth";
    else return "authType";
  };

  return (
    <div className="login">
      {loading ? (
        <Loader />
      ) : (
        <div className="loginDiv">
          <div className="left">
            <h1>Welcome to AMS!</h1>
            <hr />
            <p>
              Dont have credentials? Visit as a <Link to="/guest">Guest</Link>
            </p>
          </div>
          <div className="signin">
            <div className="authSelector">
              <div
                className={getClassNames("student")}
                onClick={() => setAuthType("student")}
              >
                Student
              </div>
              <div
                className={getClassNames("staff")}
                onClick={() => setAuthType("staff")}
              >
                Staff
              </div>
              <div
                className={getClassNames("admin")}
                onClick={() => setAuthType("admin")}
              >
                Admin
              </div>
            </div>
            <h1>Sign In</h1>
            <form onSubmit={onSubmit}>
              <div className="formRow">
                <input
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email"
                />
              </div>
              <div className="formRow">
                <input
                  type="text"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                />
              </div>
              <div className="formRow">
                <button className="themeButton">Sign In</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  token: state.auth.token,
  loading: state.auth.loading,
});

export default connect(mapStateToProps, { loginUser })(Login);
