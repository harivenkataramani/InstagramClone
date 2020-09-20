import React from "react";
import "./auth.css";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <div className="login">
      <div className="card login__card input-field">
        <h2>Instagram</h2>
        <input type="text" placeholder="email" />
        <input type="text" placeholder="password" />
        <button className="btn waves-effect waves-light #64b5f6 blue lighten-2">
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

export default Login;
