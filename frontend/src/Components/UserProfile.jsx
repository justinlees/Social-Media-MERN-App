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
      <header className="profileHeader bg-gray-200 h-[8rem] md:h-[12rem]">
        <div className="userInfo">
          <div className="userImage flex justify-end items-center">
            <img className="w-[6rem] h-[6rem] bg-gray-100 md:w-[8rem] md:h-[8rem]" />
          </div>
          <div className="userDetails">
            <div className="w-full h-full flex flex-col justify-center items-left md:gap-3">
              <h1 className="text-md font-bold md:text-4xl md:font-medium ">
                {user?.userName} <span>*</span>
              </h1>
              <h2 className="text-sm md:text-xl">{user?.fullName}</h2>
              <section className="buttonArea">
                <div>
                  <button
                    className="positiveBtn text-sm w-[4rem] md:w-[6rem] lg:w-[8rem] rounded-sm cursor-pointer"
                    onClick={() => {
                      setOpenPost(true);
                    }}
                  >
                    Create Post
                  </button>
                  <button className="text-sm font-bold bg-black text-white w-[4rem] md:w-[6rem] lg:w-[8rem] rounded-sm cursor-pointer">
                    Message
                  </button>
                </div>
              </section>
            </div>
            <ul className=" flex flex-col gap-y-2 justify-center items-center lg:flex-row lg:justify-center lg:items-center">
              <li className="text-xs flex flex-col justify-center items-center md:text-lg">
                <span className="font-bold text-md md:text-xl">234</span>
                Followers
              </li>
              <li className="text-xs flex flex-col justify-center items-center md:text-lg">
                <span className="font-bold text-md md:text-xl">437</span>
                Following
              </li>
            </ul>
          </div>
        </div>
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
