import * as actionTypes from "../actions/actionTypes";

const initialState = {
  myposts: [],
  mypostserror: "",
  userProfile: null,
  myprofile: null,
  fetchPosts: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_MYPOSTS_SUCCESS:
      return {
        ...state,
        myposts: action.myposts,
        mypostserror: "",
        fetchPosts: true,
        myprofile: JSON.parse(localStorage.getItem("user")),
      };
    case actionTypes.FETCH_MYPOSTS_FAIL:
      return { ...state, mypostserror: "Something Went wrong" };
    case actionTypes.FETCH_USER_PROFILE_SUCCESS:
      return { ...state, userProfile: action.userPostedData, mypostserror: "" };
    case actionTypes.FOLLOW_USER:
      return {
        ...state,
        userProfile: {
          ...state.userProfile,
          user: {
            ...state.userProfile.user,
            followers: [...state.userProfile.user.followers, action.result._id],
          },
        },
        myprofile: action.result,
        mypostserror: "",
      };
    case actionTypes.UNFOLLOW_USER:
      const updatedFollowers = state.userProfile.user.followers.filter(
        (id) => id !== action.result._id
      );
      return {
        ...state,
        userProfile: {
          ...state.userProfile,
          user: {
            ...state.userProfile.user,
            followers: updatedFollowers,
          },
        },
        myprofile: action.result,
        mypostserror: "",
      };
    case actionTypes.LOGOUT_USER:
      return {
        ...state,
        myposts: [],
        mypostserror: "",
        userProfile: null,
        myprofile: null,
        fetchPosts: false,
      };
    case actionTypes.PIC_UPDATE_SUCCESS:
      return {
        ...state,
        myprofile: { ...state.myprofile, pic: action.imgurl },
      };
    case actionTypes.UPDATE_IMAGE_SUCCESS:
      return {
        ...state,
        myprofile: action.result,
      };
    default:
      return state;
  }
};

export default reducer;
