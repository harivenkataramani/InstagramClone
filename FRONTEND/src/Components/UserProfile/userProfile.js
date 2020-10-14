import React, { useEffect } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";

import * as actions from "../../Redux/Actions/index";
import "./userProfile.css";

const Profile = (props) => {
  const { userid } = useParams();

  useEffect(() => {
    props.dispatchgetUserProfile(userid);
  }, []);

  return (
    <React.Fragment>
      {props.userProfile ? (
        <div style={{ maxWidth: "550px", margin: "0px auto" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-around",
              margin: "20px 0px",
              borderBottom: "1px solid gray",
            }}
          >
            <div>
              <img
                alt="DP"
                style={{
                  width: "160px",
                  height: "160px",
                  borderRadius: "80px",
                }}
                src={props.userProfile.user.pic}
              />
            </div>
            <div>
              <h4>{props.userProfile.user.name}</h4>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  width: "108%",
                }}
              >
                <h6>{props.userProfile.post.length} posts</h6>
                <h6>{props.userProfile.user.followers.length} followers</h6>
                <h6>{props.userProfile.user.following.length} following</h6>
              </div>
              {!props.userProfile.user.followers.includes(
                props.userDetails._id
              ) ? (
                <button
                  className="btn waves-effect waves-light #64b5f6 blue darken-2"
                  style={{ margin: "10px" }}
                  onClick={() => props.dispatchFollowUser(userid)}
                >
                  Follow
                </button>
              ) : (
                <button
                  className="btn waves-effect waves-light #64b5f6 blue darken-2"
                  style={{ margin: "10px" }}
                  onClick={() => props.dispatchunFollowUser(userid)}
                >
                  UnFollow
                </button>
              )}
            </div>
          </div>
          <div className="my__posts">
            {props.userProfile.post.map((post) => {
              return (
                <img
                  key={post._id}
                  className="each__posts"
                  alt="posts"
                  src={post.photo}
                />
              );
            })}
          </div>
        </div>
      ) : (
        <h2>Loading ...</h2>
      )}
    </React.Fragment>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    dispatchgetUserProfile: (userId) =>
      dispatch(actions.getUserProfile(userId)),
    dispatchFollowUser: (userId) => dispatch(actions.followUser(userId)),
    dispatchunFollowUser: (userId) => dispatch(actions.unFollowUser(userId)),
  };
};

const mapStateToProps = (state) => {
  return {
    userDetails: state.authReducer.authUserDetails,
    userProfile: state.profileReducer.userProfile,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
