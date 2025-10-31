import { useState, useEffect } from "react";
import { useOutletContext, useParams } from "react-router-dom";
import PostCreation from "./PostCreation.jsx";
import Post from "./Post.jsx";

export default function UserProfile() {
  const [openPost, setOpenPost] = useState(false);
  const [userPosts, setUserPosts] = useState([]);
  const user = useOutletContext();
  const params = useParams();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/${params.userId}/homePage/userProfile`
        );

        if (response.status === 200) {
          const data = await response.json();
          setUserPosts(data.posts);
        } else if (response.status === 404) {
          setUserPosts(null);
        }
      } catch (error) {
        console.log("Server Error");
      }
    };
    fetchData();
  }, [params.userId]);
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
                {user?.userName} <span>*</span>
              </h1>
              <h2>{user?.fullName}</h2>
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
      <div className="allPosts">
        {userPosts.length ? (
          <Post posts={userPosts} />
        ) : (
          <h1>No posts.Click Create Post</h1>
        )}
      </div>

      {openPost && (
        <PostCreation setOpenPost={setOpenPost} postUserName={user?.userName} />
      )}
    </div>
  );
}
