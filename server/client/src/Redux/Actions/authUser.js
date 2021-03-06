import * as actionTypes from "./actionTypes";
import axios from "axios";

const baseUrl = process.env.API_URL;

export const signUpUser = (message, user) => {
  return {
    type: actionTypes.AUTH_SIGNUP_SUCCESS,
    message,
    user,
  };
};

export const userDetails = (user) => {
  return {
    type: actionTypes.USER_AUTH_DETAILS,
    user,
  };
};

export const signingUpError = (error) => {
  return {
    type: actionTypes.AUTH_SIGNUP_FAIL,
    error,
  };
};
export const signInpUser = (token) => {
  return {
    type: actionTypes.AUTH_SIGNIN_SUCCESS,
    token,
  };
};

export const authFailed = () => {
  return {
    type: actionTypes.AUTH_FAIL,
  };
};

export const onLogout = () => {
  localStorage.clear();
  return {
    type: actionTypes.LOGOUT_USER,
  };
};

export const imgUploadSucess = (data) => {
  return {
    type: actionTypes.PIC_UPLOAD_SUCCESS,
    data,
  };
};

export const imgUploadFail = () => {
  return {
    type: actionTypes.PIC_UPLOAD_FAIL,
  };
};

export const resetMessage = () => {
  return {
    type: actionTypes.RESET_AUTH_SIGNUP_MESSAGE,
  };
};

export const resetPassword = (message) => {
  return {
    type: actionTypes.RESET_PASSWORD_REQUEST,
    message,
  };
};

export const updateNewPassword = (message) => {
  return {
    type: actionTypes.UPDATE_NEW_PASSWORD,
    message,
  };
};

export const initsignUpUser = (bodyData) => {
  return (dispatch) => {
    axios
      .post(`${baseUrl}/signup`, bodyData)
      .then((response) => {
        if (response.error) {
          dispatch(signingUpError(response.data.error));
        }
        dispatch(signUpUser(response.data.message));
      })
      .catch((error) => {
        dispatch(authFailed());
      });
  };
};

export const initsignInUser = (email, password) => {
  return (dispatch) => {
    const bodyData = {
      email: email,
      password: password,
    };
    axios
      .post(`${baseUrl}/signin`, bodyData)
      .then((response) => {
        if (response.error) {
          dispatch(signingUpError(response.data.error));
        } else {
          localStorage.setItem("token", response.data.token);
          localStorage.setItem("user", JSON.stringify(response.data.user));
          dispatch(signInpUser(response.data.token));
          dispatch(userDetails(response.data.user));
        }
      })
      .catch((error) => {
        dispatch(authFailed());
      });
  };
};

export const uploadPic = (imgBodydata, name, email, password) => {
  return (dispatch) => {
    axios
      .post(
        "https://api.cloudinary.com/v1_1/hvrimagecloud/image/upload",
        imgBodydata
      )
      .then((response) => {
        dispatch(imgUploadSucess(response.data.secure_url));
        const bodyData = {
          name: name,
          email: email,
          password: password,
          pic: response.data.secure_url,
        };
        dispatch(initsignUpUser(bodyData));
      })
      .catch((error) => {
        dispatch(imgUploadFail());
      });
  };
};

export const initResetPassword = (email) => {
  return (dispatch) => {
    const bodyData = {
      email: email,
    };
    axios
      .post(`${baseUrl}/reset-password`, bodyData)
      .then((response) => {
        if (response.error) {
          dispatch(signingUpError(response.data.error));
        } else {
          dispatch(resetPassword(response.data.message));
        }
      })
      .catch((error) => {
        dispatch(authFailed());
      });
  };
};

export const initUpdatePassword = (password, resetPassToken) => {
  return (dispatch) => {
    const bodyData = {
      password,
      resetPassToken,
    };
    axios
      .post(`${baseUrl}/newpassword`, bodyData)
      .then((response) => {
        if (response.error) {
          dispatch(signingUpError(response.data.error));
        } else {
          dispatch(updateNewPassword(response.data.message));
        }
      })
      .catch((error) => {
        dispatch(authFailed());
      });
  };
};
