import React, { useState, useEffect, useMemo } from "react";
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
  const [image, setImage] = useState("");

  useEffect(() => {
    if (props.successMessage) {
      M.toast({ html: props.successMessage });
      history.push("/login");
    }
    return () => {
      props.resetSuccessMessage();
    };
  }, [props.successMessage]);

  const uploadPicture = () => {
    const data = new FormData();
    data.append("file", image);
    //name of upload file name
    data.append("upload_preset", "instagram-clone");
    //name of the clouidanary image
    data.append("cloud_name", "hvrimagecloud");
    props.uploadProfilePic(data, name, email, password);
  };

  const signUpUser = (e) => {
    e.preventDefault();
    if (
      !/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
        email
      )
    ) {
      M.toast({ html: "Please enter a valid email" });
    } else {
      const bodyData = {
        name: name,
        email: email,
        password: password,
      };
      if (image) {
        uploadPicture();
      } else {
        props.onUserSignUp(bodyData);
      }
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
        <div className="file-field input-field">
          <div className="btn #64b5f6 blue darken-1">
            <span>Upload Your Pic</span>
            <input type="file" onChange={(e) => setImage(e.target.files[0])} />
          </div>
          <div className="file-path-wrapper">
            <input className="file-path validate" type="text" />
          </div>
        </div>
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
    uploadProfilePic: (bodyData, name, email, password) =>
      dispatch(actions.uploadPic(bodyData, name, email, password)),
    resetSuccessMessage: () => dispatch(actions.resetMessage()),
  };
};

const mapStateToProps = (state) => {
  return {
    successMessage: state.authReducer.signUpMessage,
    imgURL: state.authReducer.imageURL,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
