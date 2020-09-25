import * as actionTypes from "./actionTypes";
import axios from "axios";

export const imgUploadSucess = (data) => {
  return {
    type: actionTypes.UPLOAD_SUCCESS,
    data,
  };
};

export const imgUploadFail = () => {
  return {
    type: actionTypes.UPLOAD_FAIL,
  };
};

export const createNewPostSuccess = (postDetails) => {
  return {
    type: actionTypes.CREATE_POST_SUCCESS,
    postDetails,
  };
};

export const createNewPostFail = (errorMsg) => {
  return {
    type: actionTypes.CREATE_POST_FAIL,
    errorMsg,
  };
};

export const fetchPostsSuccess = (posts) => {
  return {
    type: actionTypes.FETCH_ALLPOSTS_SUCCESS,
    posts,
  };
};

export const createPost = (body, title, url, history) => {
  return (dispatch) => {
    const bodyData = {
      body,
      title,
      url,
    };
    axios
      .post("http://localhost:5000/createpost", bodyData, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((response) => {
        if (response.error) {
          dispatch(createNewPostFail(response.data.error));
        }
        history.push("/");
        dispatch(createNewPostSuccess(response.data.post));
      })
      .catch((error) => {
        console.log("error message", error.message);
        dispatch(imgUploadFail());
      });
  };
};

export const uploadImage = (bodyData, title, body, history) => {
  return (dispatch) => {
    axios
      .post(
        "https://api.cloudinary.com/v1_1/hvrimagecloud/image/upload",
        bodyData
      )
      .then((response) => {
        dispatch(imgUploadSucess(response.data.secure_url));
        dispatch(createPost(body, title, response.data.secure_url, history));
      })
      .catch((error) => {
        console.log("error--------", error);
        dispatch(imgUploadFail());
      });
  };
};

export const fetchAllPosts = () => {
  return (dispatch) => {
    axios
      .get("http://localhost:5000/allposts", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((response) => {
        console.log(response.data.posts);
        dispatch(fetchPostsSuccess(response.data.posts));
      })
      .catch((error) => {
        console.log("error message", error.message);
        dispatch(imgUploadFail());
      });
  };
};
