import React, { useEffect, useRef, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { connect } from "react-redux";
import M from "materialize-css";

import * as actions from "../Redux/Actions/index";

const renderLinks = (props) => {
  const history = useHistory();

  if (props.userDetails) {
    return [
      <li key="1">
        <i
          data-target="modal1"
          className="large material-icons modal-trigger"
          style={{ color: "black", cursor: "pointer" }}
        >
          search
        </i>
      </li>,
      <li key="2">
        <Link to="/profile">Profile</Link>
      </li>,
      <li key="3">
        <Link to="/create">Create</Link>
      </li>,
      <li key="4">
        <Link to="/explore">Explore</Link>
      </li>,
      <li key="5">
        <button
          className="btn waves-effect waves-light #64b5f6 blue darken-1"
          onClick={() => {
            props.logoutUser();
            history.push("/login");
          }}
        >
          Logout
        </button>
      </li>,
    ];
  } else {
    return [
      <li key="6">
        <Link to="/login">Login</Link>
      </li>,
      <li key="7">
        <Link to="/register">Register</Link>
      </li>,
    ];
  }
};

const Navbar = (props) => {
  const searchModal = useRef(null);

  const [search, setSearch] = useState("");

  useEffect(() => {
    M.Modal.init(searchModal.current);
  }, []);

  const fetchSearchUsers = (query) => {
    setSearch(query);
    props.onFetchingSearchedUser(query);
  };

  const signedUser = JSON.parse(localStorage.getItem("user"));

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
        <div
          id="modal1"
          className="modal"
          ref={searchModal}
          style={{ color: "black" }}
        >
          <div className="modal-content">
            <input
              type="text"
              placeholder="Search Users"
              value={search}
              onChange={(e) => {
                fetchSearchUsers(e.target.value);
              }}
            />
            <ul className="collection">
              {props.searchResults.map((user) => {
                return (
                  <Link
                    key={user._id}
                    to={
                      user._id !== signedUser._id
                        ? "/profile/" + user._id
                        : "/profile"
                    }
                    onClick={() => {
                      M.Modal.getInstance(searchModal.current).close();
                      setSearch("");
                    }}
                  >
                    <li className="collection-item">{user.email}</li>
                  </Link>
                );
              })}
            </ul>
          </div>
          <div className="modal-footer">
            <button
              className="modal-close waves-effect waves-green btn-flat"
              onClick={() => {
                setSearch("");
              }}
            >
              Close
            </button>
          </div>
        </div>
      </nav>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    logoutUser: () => dispatch(actions.onLogout()),
    onFetchingSearchedUser: (query) =>
      dispatch(actions.onInitFetchSearchedUsers(query)),
  };
};

const mapStateToProps = (state) => {
  return {
    userDetails: state.authReducer.authUserDetails,
    searchResults: state.profileReducer.searchedUsers,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
