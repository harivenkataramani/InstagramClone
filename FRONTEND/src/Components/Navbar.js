import React from "react";
import { Link, useHistory } from "react-router-dom";
import { connect } from "react-redux";

import * as actions from "../Redux/Actions/index";

const renderLinks = (props) => {
  const history = useHistory();
  if (props.userDetails) {
    return [
      <li>
        <Link to="/profile">Profile</Link>
      </li>,
      <li>
        <Link to="/create">Create</Link>
      </li>,
      <li>
        <Link to="/explore">Explore</Link>
      </li>,
      <button
        className="btn waves-effect waves-light #64b5f6 blue darken-1"
        onClick={() => {
          props.logoutUser();
          history.push("/login");
        }}
      >
        Logout
      </button>,
    ];
  } else {
    return [
      <li>
        <Link to="/login">Login</Link>
      </li>,
      <li>
        <Link to="/register">Register</Link>
      </li>,
    ];
  }
};

const Navbar = (props) => {
  return (
    <div>
      <nav>
        <div className="nav-wrapper white">
          <Link
            to={props.userDetails ? "/" : "/login"}
            className="brand-logo left"
          >
            Instagram
          </Link>
          <ul id="nav-mobile" className="right">
            {renderLinks(props)}
          </ul>
        </div>
      </nav>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    logoutUser: () => dispatch(actions.onLogout()),
  };
};

const mapStateToProps = (state) => {
  return {
    userDetails: state.authReducer.authUserDetails,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
