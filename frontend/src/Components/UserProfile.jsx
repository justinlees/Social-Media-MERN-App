import { useState, useEffect } from "react";
import PostCreation from "./PostCreation.jsx";

export default function UserProfile() {
  const [openPost, setOpenPost] = useState(false);
  return (
    <div className="userProfilePage">
      <header className="profileHeader">
        <div className="userInfo">
          <div className="userImage">
            <img />
          </div>
          <div className="userDetails">
            <div className="userName">
              <h1>
                UserName <span>*</span>
              </h1>
              <h2>Diana Ankudinova Alajendra</h2>
            </div>
            <ul>
              <li>
                <span>234</span>
                Followers
              </li>
              <li>
                <span>437</span>
                Following
              </li>
            </ul>
          </div>
        </div>
        <section className="buttonsArea">
          <div className="dummy"></div>
          <div>
            <div className="buttons">
              <button
                className="positiveBtn"
                onClick={() => {
                  setOpenPost(true);
                }}
              >
                Create Post
              </button>
              <button>Message</button>
            </div>
            <div className="dummy2"></div>
          </div>
        </section>
      </header>

      <div>
        <h1>No posts.Click Create Post</h1>
      </div>
      {openPost && <PostCreation setOpenPost={setOpenPost} />}
    </div>
  );
}
