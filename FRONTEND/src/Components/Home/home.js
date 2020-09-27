import React, { useEffect } from "react";
import { connect } from "react-redux";

import * as actions from "../../Redux/Actions/index";
import "./home.css";

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
            <h5>{item.postedBy.name}</h5>
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

              {/* <i className="material-icons">thumb_up</i>
              <i className="material-icons">thumb_down</i> */}
              <h6>{item.likes.length} likes</h6>
              <h6>{item.title}</h6>
              <p>{item.body}</p>
              <input type="text" placeholder="please add a comment" />
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
  };
};

const mapStateToProps = (state) => {
  return {
    allPostsData: state.createPostReducer.myposts,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
