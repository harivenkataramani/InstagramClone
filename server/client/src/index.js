import React from "react";
import ReactDOM from "react-dom";
import App from "./Components/App/App";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose } from "redux";

import logger from "./Redux/Middlewares/logger";
import rootReducer from "./Redux/Reducers/index";
import middleware from "./Redux/Middlewares/index";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(rootReducer, composeEnhancers(middleware));

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>,
  document.getElementById("app")
);
