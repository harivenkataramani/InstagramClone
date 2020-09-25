import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import M from "materialize-css";

import "./auth.css";
import * as actions from "../../Redux/Actions/index";

const SignUp = (props) => {
  const history = useHistory();
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    if (props.successMessage) {
      M.toast({ html: props.successMessage });
      history.push("/login");
    }
  }, [props.successMessage]);

  const signUpUser = (e) => {
    e.preventDefault();
    if (
      !/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
        email
      )
    ) {
      M.toast({ html: "Please enter a valid email" });
    } else {
      props.onUserSignUp(name, email, password);
    }
  };

  return (
    <div className="login">
      <div className="card login__card input-field">
        <h2>Instagram</h2>
        <input
          type="text"
          placeholder="name"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
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
          className="btn waves-effect waves-light #64b5f6 blue lighten-2"
          onClick={signUpUser}
        >
          SignUp
        </button>
        <h5>
          <Link to="/login">
            Already have an account? <b>Sign In</b>
          </Link>
        </h5>
      </div>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    onUserSignUp: (name, email, password) =>
      dispatch(actions.initsignUpUser(name, email, password)),
  };
};

const mapStateToProps = (state) => {
  return {
    successMessage: state.authReducer.signUpMessage,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
