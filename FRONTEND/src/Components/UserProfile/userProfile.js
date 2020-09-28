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
                src="https://images.unsplash.com/photo-1600259791315-bb8f06f3af48?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"
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
                <h6>40 followers</h6>
                <h6>40 following</h6>
              </div>
              <button
                className="btn waves-effect waves-light #64b5f6 blue lighten-2"
                onClick={props.dispatchFollowUser(userid)}
              >
                Follow
              </button>
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
