import * as actionTypes from "./actionTypes";
import axios from "axios";

export const fetchMyPostSuccess = (myposts) => {
  return {
    type: actionTypes.FETCH_MYPOSTS_SUCCESS,
    myposts,
  };
};

export const fetchMyPostFail = () => {
  return {
    type: actionTypes.FETCH_MYPOSTS_FAIL,
  };
};

export const fetchMyPosts = () => {
  return (dispatch) => {
    axios
      .get("http://localhost:5000/myposts", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((response) => {
        console.log(response.data.myposts);
        dispatch(fetchMyPostSuccess(response.data.myposts));
      })
      .catch((error) => {
        console.log("error message", error.message);
        dispatch(fetchMyPostFail());
      });
  };
};
