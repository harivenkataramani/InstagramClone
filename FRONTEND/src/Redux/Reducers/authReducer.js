import * as actionTypes from "../actions/actionTypes";

const initialState = {
  signUpMessage: "",
  error: "",
  authToken: "",
  authUserDetails: null,
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
    default:
      return state;
  }
};

export default reducer;
