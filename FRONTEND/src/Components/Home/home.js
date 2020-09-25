import React, { useEffect } from "react";
import { connect } from "react-redux";

import * as actions from "../../Redux/Actions/index";
import "./home.css";

const Home = (props) => {
  useEffect(() => {
    console.log();
    props.fetchPosts();
  }, []);
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
              <i className="material-icons" style={{ color: "red" }}>
                favorite
              </i>
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
  };
};

const mapStateToProps = (state) => {
  return {
    allPostsData: state.createPostReducer.myposts,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
