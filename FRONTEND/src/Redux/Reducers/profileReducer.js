import * as actionTypes from "../actions/actionTypes";

const initialState = {
  myposts: [],
  mypostserror: "",
};

const reducer = (state = initialState, action) => {
  console.log(action, "-------------------");
  switch (action.type) {
    case actionTypes.FETCH_MYPOSTS_SUCCESS:
      return { ...state, myposts: action.myposts, error: "" };
    case actionTypes.FETCH_MYPOSTS_FAIL:
      return { ...state, mypostserror: "Something Went wrong" };
    default:
      return state;
  }
};

export default reducer;
