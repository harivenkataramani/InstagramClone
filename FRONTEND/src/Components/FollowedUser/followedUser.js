import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import * as actions from "../../Redux/Actions/index";
import "./followedUser.css";

const Home = (props) => {
  useEffect(() => {
    props.fetchPosts();
  }, []);

  const user = JSON.parse(localStorage.getItem("user"));
  return (
    <div className="home">
      {props.allPostsData.map((item) => {
        return (
          <div className="card home__card" key={item._id}>
            <h5 style={{ padding: "6px" }}>
              <Link
                to={
                  item.postedBy._id !== user._id
                    ? "/profile/" + item.postedBy._id
                    : "/profile"
                }
              >
                {item.postedBy.name}
              </Link>
              {item.postedBy._id === user._id && (
                <i
                  className="material-icons"
                  style={{ float: "right", cursor: "pointer" }}
                  onClick={() => props.dispatchDeletePost(item._id)}
                >
                  delete
                </i>
              )}
            </h5>
            <div className="card-image">
              <img alt="DP" src={item.photo} />
            </div>
            <div className="card-content">
              {item.likes.includes(user._id) ? (
                <i
                  className="material-icons"
                  style={{ color: "red", cursor: "pointer" }}
                  onClick={() => props.dispatchunlikePost(item._id)}
                >
                  favorite
                </i>
              ) : (
                <i
                  className="material-icons"
                  style={{ cursor: "pointer" }}
                  onClick={() => props.dispatchlikePost(item._id)}
                >
                  favorite
                </i>
              )}
              <h6>{item.likes.length} likes</h6>
              <h6>{item.title}</h6>
              <p>{item.body}</p>
              {item.comments.map((comment) => {
                return (
                  <h6 key={comment._id}>
                    <span style={{ fontWeight: "600" }}>
                      {comment.postedBy.name}
                    </span>
                    &nbsp;
                    {comment.text}
                  </h6>
                );
              })}
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  props.dispatchPostComment(e.target[0].value, item._id);
                }}
              >
                <input type="text" placeholder="please add a comment" />
              </form>
            </div>
          </div>
        );
      })}
    </div>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchPosts: () => dispatch(actions.fetchAllPosts()),
    dispatchlikePost: (userid) => dispatch(actions.likePost(userid)),
    dispatchunlikePost: (userid) => dispatch(actions.unlikePost(userid)),
    dispatchPostComment: (text, userid) =>
      dispatch(actions.addComments(text, userid)),
    dispatchDeletePost: (userid) => dispatch(actions.deletePost(userid)),
  };
};

const mapStateToProps = (state) => {
  return {
    allPostsData: state.createPostReducer.allProfilePosts,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
