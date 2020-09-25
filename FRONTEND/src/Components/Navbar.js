import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

const renderLinks = (props) => {
  console.log(props, "userSds");
  if (props.userDetails) {
    return [
      <li>
        <Link to="/profile">Profile</Link>
      </li>,
      <li>
        <Link to="/create">Create</Link>
      </li>,
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

const mapStateToProps = (state) => {
  return {
    userDetails: state.authReducer.authUserDetails,
  };
};

export default connect(mapStateToProps)(Navbar);
