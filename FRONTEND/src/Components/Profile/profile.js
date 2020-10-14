import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

import * as actions from "../../Redux/Actions/index";
import "./profile.css";

const Profile = (props) => {
  const [image, setImage] = useState("");

  useEffect(() => {
    props.getMyPosts();
  }, []);

  useEffect(() => {
    if (image) {
      const data = new FormData();
      data.append("file", image);
      //name of upload file name
      data.append("upload_preset", "instagram-clone");
      //name of the clouidanary image
      data.append("cloud_name", "hvrimagecloud");
      props.updateProfPic(data);
    }
  }, [image]);

  const updatePhoto = (file) => {
    setImage(file);
  };

  return (
    <React.Fragment>
      {props.fetchPosts ? (
        <div style={{ maxWidth: "550px", margin: "0px auto" }}>
          <div
            style={{
              margin: "20px 0px",
              borderBottom: "1px solid gray",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-around",
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
                  src={props.myprofileDetails.pic}
                />
              </div>
              <div>
                <h4>{props.myprofileDetails.name}</h4>
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
            <div className="file-field input-field" style={{ margin: "10px" }}>
              <div className="btn #64b5f6 blue darken-1">
                <span>Update Pic</span>
                <input
                  type="file"
                  onChange={(e) => updatePhoto(e.target.files[0])}
                />
              </div>
              <div className="file-path-wrapper">
                <input className="file-path validate" type="text" />
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
    updateProfPic: (bodyData) => dispatch(actions.updateProfPic(bodyData)),
  };
};

const mapStateToProps = (state) => {
  return {
    mypostdetails: state.profileReducer.myposts,
    fetchPosts: state.profileReducer.fetchPosts,
    myprofileDetails: state.profileReducer.myprofile,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
