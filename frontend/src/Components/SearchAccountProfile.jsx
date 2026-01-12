import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Post from "./post/Post.jsx";
export default function SearchAccountProfile() {
  const [accountInfo, setAccountInfo] = useState();
  const { userId, searchUserId } = useParams();
  const [searchPosts, setSearchPosts] = useState([]);

  const handleFollow = async (followingUsername) => {
    const followData = {
      userId: userId,
      followingId: searchUserId,
      followingUsername: followingUsername,
    };
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}/${userId}/following/${searchUserId}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(followData),
        }
      );

      if (response.status === 200) {
        console.log("Request Done");
        window.location.reload();
      }
    } catch (error) {
      console.log("Error in sending following request", error);
    }
  };

  useEffect(() => {
    const fetchSearchUser = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_BASE_URL}/${userId}/homePage/${searchUserId}`,
          {
            method: "GET",
            headers: { "Content-Type": "application/json" },
          }
        );
        const data = await response.json();
        if (data.searchUserPosts) {
          setSearchPosts(data.searchUserPosts);
          setAccountInfo(data.searchUser);
        }
      } catch (error) {
        console.log("Server Error", error);
      }
    };
    fetchSearchUser();
  }, [searchUserId, userId]);
  return (
    <div className="userProfilePage">
      {accountInfo && (
        <>
          <header className="profileHeader bg-gray-200 h-[8rem] md:h-[12rem]">
            <div className="userInfo">
              <div className="userImage flex justify-end items-center">
                <img className="w-[6rem] h-[6rem] bg-gray-100 md:w-[8rem] md:h-[8rem]" />
              </div>
              <div className="userDetails">
                <div className="w-full h-full flex flex-col justify-center items-left md:gap-3">
                  <h1 className="text-md font-bold md:text-4xl md:font-medium ">
                    {accountInfo?.userName} <span>*</span>
                  </h1>
                  <h2 className="text-sm md:text-xl">
                    {accountInfo?.fullName}
                  </h2>
                  <section className="buttonArea">
                    <div>
                      <button
                        className="positiveBtn text-sm font-bold bg-black text-white w-[4rem] md:w-[6rem] lg:w-[8rem] rounded-sm cursor-pointer"
                        onClick={() => handleFollow(accountInfo?.userName)}
                      >
                        Follow
                      </button>
                      <button className="text-sm font-bold bg-black text-white w-[4rem] md:w-[6rem] lg:w-[8rem] rounded-sm cursor-pointer">
                        Message
                      </button>
                    </div>
                  </section>
                </div>
                <ul className=" flex flex-col gap-y-2 justify-center items-center lg:flex-row lg:justify-center lg:items-center">
                  <li className="text-xs flex flex-col justify-center items-center md:text-lg">
                    <span className="font-bold text-md md:text-xl">
                      {accountInfo?.followers}
                    </span>
                    Followers
                  </li>
                  <li className="text-xs flex flex-col justify-center items-center md:text-lg">
                    <span className="font-bold text-md md:text-xl">
                      {accountInfo?.following}
                    </span>
                    Following
                  </li>
                </ul>
              </div>
            </div>
          </header>
          <div className="userPosts">
            {searchPosts.length ? (
              <Post posts={searchPosts} user={accountInfo} />
            ) : (
              <h1>No posts yet</h1>
            )}
          </div>
        </>
      )}
    </div>
  );
}
