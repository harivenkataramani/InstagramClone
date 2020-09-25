import { combineReducers } from "redux";
import authReducer from "./authReducer";
import createPostReducer from "./createPostReducer";

export default combineReducers({
  // my reducers
  authReducer,
  createPostReducer,
});
