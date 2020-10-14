import { combineReducers } from "redux";
import authReducer from "./authReducer";
import createPostReducer from "./createPostReducer";
import profileReducer from "./profileReducer";

export default combineReducers({
  // my reducers
  authReducer,
  createPostReducer,
  profileReducer,
});
