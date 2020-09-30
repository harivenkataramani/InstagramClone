import * as actionTypes from "../actions/actionTypes";

const initialState = {
  imageURL: "",
  uploadError: "",
  allProfilePosts: [],
  createdPost: null,
  myFollowingPosts: [],
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
      return { ...state, allProfilePosts: action.posts };
    case actionTypes.CREATE_POST_FAIL:
      return { ...state, uploadError: action.errorMsg };
    case actionTypes.ON_LIKE_POST:
      return {
        ...state,
        uploadError: "",
        allProfilePosts: [
          ...state.allProfilePosts.map((post) => {
            return post._id === action.result._id
              ? { ...post, likes: action.result.likes }
              : post;
          }),
        ],
        myFollowingPosts: [
          ...state.myFollowingPosts.map((post) => {
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
        allProfilePosts: [
          ...state.allProfilePosts.map((post) => {
            return post._id === action.result._id
              ? { ...post, likes: action.result.likes }
              : post;
          }),
        ],
        myFollowingPosts: [
          ...state.myFollowingPosts.map((post) => {
            return post._id === action.result._id
              ? { ...post, likes: action.result.likes }
              : post;
          }),
        ],
      };
    case actionTypes.COMMENT_ON_POST:
      return {
        ...state,
        uploadError: "",
        allProfilePosts: [
          ...state.allProfilePosts.map((post) => {
            return post._id === action.result._id
              ? { ...post, comments: action.result.comments }
              : post;
          }),
        ],
        myFollowingPosts: [
          ...state.myFollowingPosts.map((post) => {
            return post._id === action.result._id
              ? { ...post, comments: action.result.comments }
              : post;
          }),
        ],
      };
    case actionTypes.DELETE_POST:
      console.log(action.result);
      return {
        ...state,
        uploadError: "",
        allProfilePosts: [
          ...state.allProfilePosts.filter((post) => {
            return post._id !== action.result._id;
          }),
        ],
      };
    case actionTypes.FETCH_MY_FOLLOWING_POSTS:
      return { ...state, myFollowingPosts: action.posts };
    default:
      return state;
  }
};

export default createPostreducer;
