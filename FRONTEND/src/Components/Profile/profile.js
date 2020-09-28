import React, { useEffect } from "react";
import { connect } from "react-redux";

import * as actions from "../../Redux/Actions/index";
import "./profile.css";

const Profile = (props) => {
  useEffect(() => {
    props.getMyPosts();
  }, []);

  return (
    <React.Fragment>
      {props.mypostdetails.length > 0 ? (
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
              <h4>{props.userDetails.name}</h4>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  width: "108%",
                }}
              >
                <h6>{props.mypostdetails.length} posts</h6>
                <h6>{props.myprofileDetails.followers.length} followers</h6>
                <h6>{props.myprofileDetails.following.length} following</h6>
              </div>
            </div>
          </div>
          <div className="my__posts">
            {props.mypostdetails.map((post) => {
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
        ""
      )}
    </React.Fragment>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    getMyPosts: () => dispatch(actions.fetchMyPosts()),
  };
};

const mapStateToProps = (state) => {
  return {
    userDetails: state.authReducer.authUserDetails,
    mypostdetails: state.profileReducer.myposts,
    myprofileDetails: state.profileReducer.myprofile,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
