import React from "react";
import "./profile.css";

const Profile = () => {
  return (
    <React.Fragment>
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
              style={{ width: "160px", height: "160px", borderRadius: "80px" }}
              src="https://images.unsplash.com/photo-1600259791315-bb8f06f3af48?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"
            />
          </div>
          <div>
            <h4>Josh Mathhew</h4>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                width: "108%",
              }}
            >
              <h6>40 posts</h6>
              <h6>40 followers</h6>
              <h6>40 following</h6>
            </div>
          </div>
        </div>
        <div className="my__posts">
          <img
            className="each__posts"
            alt="DP"
            src="https://images.unsplash.com/photo-1600259791315-bb8f06f3af48?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"
          />
          <img
            className="each__posts"
            alt="DP"
            src="https://images.unsplash.com/photo-1600259791315-bb8f06f3af48?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"
          />
          <img
            className="each__posts"
            alt="DP"
            src="https://images.unsplash.com/photo-1600259791315-bb8f06f3af48?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"
          />
          <img
            className="each__posts"
            alt="DP"
            src="https://images.unsplash.com/photo-1600259791315-bb8f06f3af48?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"
          />
          <img
            className="each__posts"
            alt="DP"
            src="https://images.unsplash.com/photo-1600259791315-bb8f06f3af48?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"
          />
          <img
            className="each__posts"
            alt="DP"
            src="https://images.unsplash.com/photo-1600259791315-bb8f06f3af48?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"
          />
        </div>
      </div>
    </React.Fragment>
  );
};

export default Profile;
