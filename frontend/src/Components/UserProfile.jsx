import { useState, useEffect } from "react";
import { useOutletContext, useParams } from "react-router-dom";
import PostCreation from "./PostCreation.jsx";
import Post from "./post/Post.jsx";

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
        } else if (response.status === 500) {
          alert("Server error");
        }
      } catch (error) {
        console.log("Server Error");
      }
    };
    fetchData();
  }, [params.userId]);
  return (
    <div className="userProfilePage">
      <header className="profileHeader h-[8rem] lg:h-[12rem]">
        <div className="userInfo">
          <div className="userImage bg-cyan-500 flex justify-end items-center">
            <img className="w-[4rem] h-[4rem] bg-gray-500 lg:w-[7rem] lg:h-[7rem]" />
          </div>
          <div className="userDetails">
            <div className="userName lg:gap-4">
              <h1 className="text-md font-bold lg:text-4xl lg:font-medium ">
                {user?.userName} <span>*</span>
              </h1>
              <h2 className="text-sm md:text-xl">{user?.fullName}</h2>
            </div>
            <ul className=" flex flex-col gap-y-2 justify-center items-center lg:flex-row lg:justify-center lg:items-center">
              <li className="text-xs font-bold flex flex-col justify-center items-center lg:text-xl">
                <span>234</span>
                <span>Followers</span>
              </li>
              <li className="text-xs font-bold flex flex-col justify-center items-center lg:text-xl">
                <span>437</span>
                <span>Following</span>
              </li>
            </ul>
          </div>
        </div>
        <section className="buttonsArea w-full flex">
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
              <button className="bg-black text-white">Message</button>
            </div>
            <div className="dummy2"></div>
          </div>
        </section>
      </header>
      <div className="userPosts">
        {userPosts.length ? (
          <Post posts={userPosts} user={user} />
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
