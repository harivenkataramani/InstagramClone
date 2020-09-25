import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";

import * as actions from "../../../Redux/Actions/index";

const CreatePosts = (props) => {
  const history = useHistory();
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [image, setImage] = useState("");

  // useEffect(() => {
  //   if (props.posts) {
  //     history.push("/");
  //   }
  // }, [props.posts]);

  const postDetails = () => {
    const data = new FormData();
    data.append("file", image);
    //name of upload file name
    data.append("upload_preset", "instagram-clone");
    //name of the clouidanary image
    data.append("cloud_name", "hvrimagecloud");
    props.uploadImage(data, title, body, history);
  };

  return (
    <div
      className="card input-filed"
      style={{
        maxWidth: "500px",
        margin: "30px auto",
        padding: "20px",
        textAlign: "center",
      }}
    >
      <input
        type="text"
        placeholder="title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        type="text"
        placeholder="body"
        value={body}
        onChange={(e) => setBody(e.target.value)}
      />
      <div className="file-field input-field">
        <div className="btn #64b5f6 blue darken-1">
          <span>Upload Image</span>
          <input type="file" onChange={(e) => setImage(e.target.files[0])} />
        </div>
        <div className="file-path-wrapper">
          <input className="file-path validate" type="text" />
        </div>
      </div>
      <button
        className="btn waves-effect waves-light #64b5f6 blue darken-1"
        onClick={postDetails}
      >
        Submit Post
      </button>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    uploadImage: (bodyData, title, body, history) =>
      dispatch(actions.uploadImage(bodyData, title, body, history)),
  };
};

// const mapStateToProps = (state) => {
//   return {
//     imageURL: state.createPostReducer.imageURL,
//     posts: state.createPostReducer.createdPost,
//   };
// };

export default connect(null, mapDispatchToProps)(CreatePosts);
