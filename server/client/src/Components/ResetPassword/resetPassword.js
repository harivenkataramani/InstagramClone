import React, { useState, useEffect } from "react";
import "./resetPassword.css";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import M from "materialize-css";

import * as actions from "../../Redux/Actions/index";

const ResetPassword = (props) => {
  const history = useHistory();
  const [email, setEmail] = useState("");

  useEffect(() => {
    if (props.resetMessage) {
      M.toast({ html: props.resetMessage });
      history.push("/login");
    }
  }, [props.resetMessage]);

  const resetPass = (e) => {
    e.preventDefault();
    if (
      !/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
        email
      )
    ) {
      M.toast({ html: "Please enter a valid email" });
    } else {
      props.onResetPassword(email);
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
        <button
          className="btn waves-effect waves-light #64b5f6 blue darken-1"
          onClick={resetPass}
        >
          Reset Password
        </button>
      </div>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    onResetPassword: (email) => dispatch(actions.initResetPassword(email)),
  };
};

const mapStateToProps = (state) => {
  return {
    resetMessage: state.authReducer.resetPassMessage,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ResetPassword);
