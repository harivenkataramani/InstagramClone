import * as actionTypes from "../Actions/actionTypes";

const initialState = {
  signUpMessage: "",
  resetPassMessage: "",
  updatePassMessage: "",
  error: "",
  authToken: "",
  authUserDetails: null,
  imageURL: "",
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.AUTH_SIGNUP_SUCCESS:
      return { ...state, signUpMessage: action.message, error: "" };
    case actionTypes.AUTH_SIGNUP_FAIL:
      return { ...state, error: action.error };
    case actionTypes.AUTH_SIGNIN_SUCCESS:
      return { ...state, authToken: action.token, error: "" };
    case actionTypes.USER_AUTH_DETAILS:
      return { ...state, authUserDetails: action.user, error: "" };
    case actionTypes.AUTH_FAIL:
      return { ...state, error: "Something Went Wrong" };
    case actionTypes.UPLOAD_SUCCESS:
      return { ...state, imageURL: action.data, error: "" };
    case actionTypes.UPLOAD_FAIL:
      return { ...state, error: "Something Went Wrong" };
    case actionTypes.LOGOUT_USER:
      return {
        ...state,
        signUpMessage: "",
        resetPassMessage: "",
        updatePassMessage: "",
        error: "",
        authToken: "",
        authUserDetails: null,
        imageURL: "",
      };
    case actionTypes.RESET_AUTH_SIGNUP_MESSAGE:
      return { ...state, signUpMessage: "", error: "" };
    case actionTypes.RESET_PASSWORD_REQUEST:
      return { ...state, resetPassMessage: action.message };
    case actionTypes.UPDATE_NEW_PASSWORD:
      return { ...state, updatePassMessage: action.message };
    default:
      return state;
  }
};

export default reducer;
