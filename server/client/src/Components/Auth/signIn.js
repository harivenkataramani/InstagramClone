import React, { useState, useEffect } from "react";
import "./auth.css";
import { connect } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import M from "materialize-css";

import * as actions from "../../Redux/Actions/index";

const Login = (props) => {
  const history = useHistory();
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    if (props.userToken) {
      history.push("/");
    }
  }, [props.userToken]);

  const signInUser = (e) => {
    e.preventDefault();
    if (
      !/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
        email
      )
    ) {
      M.toast({ html: "Please enter a valid email" });
    } else {
      props.onUserSignIn(email, password);
    }
  };

  return (
    <div className="login">
      <div className="card login__card input-field">
        <h2>Instagram</h2>
        <input
          type="text"
          placeholder="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <input
          type="password"
          placeholder="password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <button
          className="btn waves-effect waves-light #64b5f6 blue darken-1"
          onClick={signInUser}
        >
          Login
        </button>
        <h5>
          <Link to="/register">
            Don't have an account? <b>Sign Up</b>
          </Link>
        </h5>
      </div>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    onUserSignIn: (email, password) =>
      dispatch(actions.initsignInUser(email, password)),
  };
};

const mapStateToProps = (state) => {
  return {
    userToken: state.authReducer.authToken,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
