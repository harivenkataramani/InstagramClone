import * as actionTypes from "./actionTypes";
import axios from "axios";

const baseUrl = process.env.API_URL;

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

export const fetchFollowingPostSuccess = (posts) => {
  return {
    type: actionTypes.FETCH_MY_FOLLOWING_POSTS,
    posts,
  };
};

export const triggerlikeposts = (result) => {
  return {
    type: actionTypes.ON_LIKE_POST,
    result,
  };
};

export const triggerunlikeposts = (result) => {
  return {
    type: actionTypes.ON_UNLIKE_POST,
    result,
  };
};

export const postComment = (result) => {
  return {
    type: actionTypes.COMMENT_ON_POST,
    result,
  };
};

export const deletePostSuccess = (result) => {
  return {
    type: actionTypes.DELETE_POST,
    result,
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
      .post(`${baseUrl}/createpost`, bodyData, {
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
      .get(`${baseUrl}/allposts`, {
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

export const likePost = (userid) => {
  return (dispatch) => {
    const bodyData = {
      postId: userid,
    };
    axios
      .put(`${baseUrl}/like`, bodyData, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((response) => {
        dispatch(triggerlikeposts(response.data.result));
      })
      .catch((error) => {
        console.log("error message", error.message);
        dispatch(imgUploadFail());
      });
  };
};

export const unlikePost = (userid) => {
  return (dispatch) => {
    const bodyData = {
      postId: userid,
    };
    axios
      .put(`${baseUrl}/unlike`, bodyData, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((response) => {
        dispatch(triggerunlikeposts(response.data.result));
      })
      .catch((error) => {
        console.log("error message", error.message);
        dispatch(imgUploadFail());
      });
  };
};

export const addComments = (text, postId) => {
  return (dispatch) => {
    const bodyData = {
      postId,
      text,
    };
    axios
      .put(`${baseUrl}/comment`, bodyData, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((response) => {
        dispatch(postComment(response.data.result));
      })
      .catch((error) => {
        console.log("error message", error.message);
        dispatch(imgUploadFail());
      });
  };
};

export const deletePost = (userid) => {
  return (dispatch) => {
    axios
      .delete(`${baseUrl}/deletePost/${userid}`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((response) => {
        dispatch(deletePostSuccess(response.data.result));
      })
      .catch((error) => {
        console.log("error message", error.message);
        dispatch(imgUploadFail());
      });
  };
};

export const followingUserPosts = () => {
  return (dispatch) => {
    axios
      .get(`${baseUrl}/followingPosts`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((response) => {
        console.log(response.data.posts);
        dispatch(fetchFollowingPostSuccess(response.data.posts));
      })
      .catch((error) => {
        console.log("error message", error.message);
        dispatch(imgUploadFail());
      });
  };
};
