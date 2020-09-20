import React from "react";
import "./home.css";

const Home = () => {
  return (
    <div className="home">
      <div className="card home__card">
        <h5>Josh</h5>
        <div className="card-image">
          <img
            alt="DP"
            src="https://images.unsplash.com/photo-1600329380444-a9a94845073d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"
          />
        </div>
        <div className="card-content">
          <i className="material-icons" style={{ color: "red" }}>
            favorite
          </i>
          <h6>title</h6>
          <p>Amazing clone</p>
          <input type="text" placeholder="please add a comment" />
        </div>
      </div>
      <div className="card home__card">
        <h5>Josh</h5>
        <div className="card-image">
          <img
            alt="DP"
            src="https://images.unsplash.com/photo-1600329380444-a9a94845073d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"
          />
        </div>
        <div className="card-content">
          <i className="material-icons" style={{ color: "red" }}>
            favorite
          </i>
          <h6>title</h6>
          <p>Amazing clone</p>
          <input type="text" placeholder="please add a comment" />
        </div>
      </div>
      <div className="card home__card">
        <h5>Josh</h5>
        <div className="card-image">
          <img
            alt="DP"
            src="https://images.unsplash.com/photo-1600329380444-a9a94845073d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"
          />
        </div>
        <div className="card-content">
          <i className="material-icons" style={{ color: "red" }}>
            favorite
          </i>
          <h6>title</h6>
          <p>Amazing clone</p>
          <input type="text" placeholder="please add a comment" />
        </div>
      </div>
    </div>
  );
};

export default Home;
