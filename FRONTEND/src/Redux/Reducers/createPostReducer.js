import * as actionTypes from "../actions/actionTypes";

const initialState = {
  imageURL: "",
  uploadError: "",
  myposts: [],
  createdPost: null,
};

const createPostreducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.UPLOAD_SUCCESS:
      return { ...state, imageURL: action.data, uploadError: "" };
    case actionTypes.UPLOAD_FAIL:
      return { ...state, uploadError: "Something Went Wrong" };
    case actionTypes.CREATE_POST_SUCCESS:
      return {
        ...state,
        createdPost: action.postDetails,
      };
    case actionTypes.FETCH_ALLPOSTS_SUCCESS:
      return { ...state, myposts: action.posts };
    case actionTypes.CREATE_POST_FAIL:
      return { ...state, uploadError: action.errorMsg };
    case actionTypes.ON_LIKE_POST:
      return {
        ...state,
        uploadError: "",
        myposts: [
          ...state.myposts.map((post) => {
            return post._id === action.result._id
              ? { ...post, likes: action.result.likes }
              : post;
          }),
        ],
      };
    case actionTypes.ON_UNLIKE_POST:
      return {
        ...state,
        uploadError: "",
        myposts: [
          ...state.myposts.map((post) => {
            return post._id === action.result._id
              ? { ...post, likes: action.result.likes }
              : post;
          }),
        ],
      };
    default:
      return state;
  }
};

export default createPostreducer;
