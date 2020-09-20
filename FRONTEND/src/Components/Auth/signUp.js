import React from "react";
import "./auth.css";
import { Link } from "react-router-dom";

const SignUp = () => {
  return (
    <div className="login">
      <div className="card login__card input-field">
        <h2>Instagram</h2>
        <input type="text" placeholder="name" />
        <input type="text" placeholder="email" />
        <input type="text" placeholder="password" />
        <button className="btn waves-effect waves-light #64b5f6 blue lighten-2">
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

export default SignUp;
