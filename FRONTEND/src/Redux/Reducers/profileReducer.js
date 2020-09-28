import * as actionTypes from "../actions/actionTypes";

const initialState = {
  myposts: [],
  mypostserror: "",
  userProfile: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_MYPOSTS_SUCCESS:
      return { ...state, myposts: action.myposts, mypostserror: "" };
    case actionTypes.FETCH_MYPOSTS_FAIL:
      return { ...state, mypostserror: "Something Went wrong" };
    case actionTypes.FETCH_USER_PROFILE_SUCCESS:
      return { ...state, userProfile: action.userPostedData, mypostserror: "" };
    default:
      return state;
  }
};

export default reducer;
