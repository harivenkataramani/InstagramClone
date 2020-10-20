import * as actionTypes from "./actionTypes";
import axios from "axios";

const baseUrl = process.env.API_URL;

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

export const getUserProfileSuccess = (userPostedData) => {
  return {
    type: actionTypes.FETCH_USER_PROFILE_SUCCESS,
    userPostedData,
  };
};

export const getFollowUserSuccess = (result) => {
  return {
    type: actionTypes.FOLLOW_USER,
    result,
  };
};

export const getUnfollowUserSuccess = (result) => {
  return {
    type: actionTypes.UNFOLLOW_USER,
    result,
  };
};

export const imgUploadSucess = (imgurl) => {
  const user = JSON.parse(localStorage.getItem("user"));
  localStorage.setItem("user", JSON.stringify({ ...user, pic: imgurl }));
  return {
    type: actionTypes.PIC_UPDATE_SUCCESS,
    imgurl,
  };
};

export const updateImageSuccess = (result) => {
  return {
    type: actionTypes.UPDATE_IMAGE_SUCCESS,
    result,
  };
};

export const fetchSearchedUsers = (users) => {
  return {
    type: actionTypes.FETCH_SEARCH_USERS,
    users,
  };
};

export const fetchMyPosts = () => {
  return (dispatch) => {
    axios
      .get(`${baseUrl}/myposts`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((response) => {
        dispatch(fetchMyPostSuccess(response.data.myposts));
      })
      .catch((error) => {
        dispatch(fetchMyPostFail());
      });
  };
};

export const getUserProfile = (userId) => {
  return (dispatch) => {
    axios
      .get(`${baseUrl}/user/${userId}`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((response) => {
        dispatch(getUserProfileSuccess(response.data));
      })
      .catch((error) => {
        dispatch(fetchMyPostFail());
      });
  };
};

export const followUser = (userId) => {
  return (dispatch) => {
    const bodyData = {
      followId: userId,
    };
    axios
      .put(`${baseUrl}/follow`, bodyData, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((response) => {
        localStorage.setItem("user", JSON.stringify(response.data.result));
        dispatch(getFollowUserSuccess(response.data.result));
      })
      .catch((error) => {
        dispatch(fetchMyPostFail());
      });
  };
};

export const unFollowUser = (userId) => {
  return (dispatch) => {
    const bodyData = {
      unfollowId: userId,
    };
    axios
      .put(`${baseUrl}/unfollow`, bodyData, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((response) => {
        localStorage.setItem("user", JSON.stringify(response.data.result));
        dispatch(getUnfollowUserSuccess(response.data.result));
      })
      .catch((error) => {
        dispatch(fetchMyPostFail());
      });
  };
};

export const updateImage = (imgUrl) => {
  return (dispatch) => {
    const bodyData = {
      pic: imgUrl,
    };
    axios
      .put(`${baseUrl}/updatePic`, bodyData, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((response) => {
        dispatch(updateImageSuccess(response.data));
      })
      .catch((error) => {
        dispatch(fetchMyPostFail());
      });
  };
};

export const updateProfPic = (imgBodydata) => {
  return (dispatch) => {
    axios
      .post(
        "https://api.cloudinary.com/v1_1/hvrimagecloud/image/upload",
        imgBodydata
      )
      .then((response) => {
        dispatch(imgUploadSucess(response.data.secure_url));
        dispatch(updateImage(response.data.secure_url));
      })
      .catch((error) => {
        dispatch(fetchMyPostFail());
      });
  };
};

export const onInitFetchSearchedUsers = (query) => {
  return (dispatch) => {
    const bodyData = {
      query,
    };
    axios
      .post(`${baseUrl}/search-users`, bodyData)
      .then((response) => {
        dispatch(fetchSearchedUsers(response.data));
      })
      .catch((error) => {
        dispatch(fetchMyPostFail());
      });
  };
};
