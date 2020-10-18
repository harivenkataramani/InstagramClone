import React, { useState, useEffect } from "react";
import "./updatePassword.css";
import { connect } from "react-redux";
import { Link, useHistory, useParams } from "react-router-dom";
import M from "materialize-css";

import * as actions from "../../Redux/Actions/index";

const UpdatePassword = (props) => {
  const history = useHistory();
  const [password, setPassword] = useState("");
  const { token } = useParams();

  useEffect(() => {
    if (props.updatePassSuccessMsg) {
      M.toast({ html: props.updatePassSuccessMsg });
      history.push("/login");
    }
  }, [props.updatePassSuccessMsg]);

  const OnupdatePassword = (e) => {
    e.preventDefault();
    props.onUpdatePass(password, token);
  };

  return (
    <div className="login">
      <div className="card login__card input-field">
        <h2>Instagram</h2>
        <input
          type="password"
          placeholder="New password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <button
          className="btn waves-effect waves-light #64b5f6 blue darken-1"
          onClick={OnupdatePassword}
        >
          Update Password
        </button>
      </div>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    onUpdatePass: (password, token) =>
      dispatch(actions.initUpdatePassword(password, token)),
  };
};

const mapStateToProps = (state) => {
  return {
    updatePassSuccessMsg: state.authReducer.updatePassMessage,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UpdatePassword);
