import React, { useEffect } from "react";
import { Switch, Route, useHistory } from "react-router-dom";
import { connect } from "react-redux";

import Navbar from "../Navbar";
import Home from "../Home/home";
import Profile from "../Profile/profile";
import SignIn from "../Auth/signIn";
import SignUp from "../Auth/signUp";
import CreatePosts from "../Posts/CreatePosts/createPosts";
import "../../Components/App/app.css";
import * as actions from "../../Redux/Actions/index";

const App = (props) => {
  const history = useHistory();

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      history.push("/");
      props.userData(user);
    } else {
      history.push("/login");
    }
  }, []);
  return (
    <div>
      <Navbar />
      <Switch>
        <Route exact path="/login" component={SignIn} />
        <Route exact path="/register" component={SignUp} />
        <Route exact path="/profile" component={Profile} />
        <Route exact path="/create" component={CreatePosts} />
        <Route path="/" component={Home} />
      </Switch>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    userData: (authUserDetails) =>
      dispatch(actions.userDetails(authUserDetails)),
  };
};

export default connect(null, mapDispatchToProps)(App);