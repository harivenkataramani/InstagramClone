import React from "react";
import { Switch, Route } from "react-router-dom";

import Navbar from "../Navbar";
import Home from "../Home/home";
import Profile from "../Profile/profile";
import SignIn from "../Auth/signIn";
import SignUp from "../Auth/signUp";
import "../../Components/App/app.css";

const App = () => {
  return (
    <div>
      <Navbar />
      <Switch>
        <Route exact path="/login" component={SignIn} />
        <Route exact path="/register" component={SignUp} />
        <Route exact path="/profile" component={Profile} />
        <Route path="/" component={Home} />
      </Switch>
    </div>
  );
};

export default App;
