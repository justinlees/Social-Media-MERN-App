import { useState, useEffect } from "react";
import { Link, Outlet, useParams, useOutletContext } from "react-router-dom";
import Post from "./post/Post.jsx";
import socket from "../lib/SocketInstance.jsx";

export default function SearchAccountProfile() {
  const [accountInfo, setAccountInfo] = useState();
  const { userId, searchUserId } = useParams();
  const [searchPosts, setSearchPosts] = useState([]);
  const [followers, setFollowers] = useState([]);
  const [followings, setFollowings] = useState([]);
  const [openFollowers, setOpenFollowers] = useState(false);
  const [openFollowing, setOpenFollowing] = useState(false);
  const [followRequest, setFollowRequest] = useState([]);
  const user = useOutletContext();
  const followRequestId = searchUserId;
  useEffect(() => {
    socket.on(`${userId}`, (requestData) => {
      setFollowRequest((prev) => [...prev, requestData]);
    });
  }, [userId]);

  useEffect(() => {
    socket.emit("followRequestId", followRequestId);
  }, [followRequestId]);

  useEffect(() => {
    const fetchSearchUser = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_BASE_URL}/${userId}/homePage/${searchUserId}`,
          {
            method: "GET",
            headers: { "Content-Type": "application/json" },
          },
        );
        const data = await response.json();
        if (data.searchUserPosts) {
          setSearchPosts(data.searchUserPosts);
          setAccountInfo(data.searchUser);
          setFollowers(data.searchUserFollowers);
          setFollowings(data.searchUserFollowings);
        }
      } catch (error) {
        console.log("Server Error", error);
      }
    };
    fetchSearchUser();
  }, [searchUserId, userId]);

  const handleFollow = async (followingUsername) => {
    const followData = {
      userId: userId,
      userName: user.userName,
      followingId: searchUserId,
      followingUsername: followingUsername,
    };

    try {
      if (accountInfo?.accountType === "public") {
        const response = await fetch(
          `${import.meta.env.VITE_BASE_URL}/${userId}/following/${searchUserId}`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(followData),
          },
        );
        if (response.status === 200) {
          console.log("Request Done");
          window.location.reload();
        }
      } else {
        const response = await fetch(
          `${import.meta.env.VITE_BASE_URL}/${userId}/followRequest/${searchUserId}`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(followData),
          },
        );
        if (response.status === 201) {
          socket.emit("requestFollow", {
            followData,
            msg: "Requested to Follow",
          });
        }
      }
    } catch (error) {
      console.log("Error in sending following request", error);
    }
  };

  const handleUnFollow = async (followingUsername) => {
    const followData = {
      userId: userId,
      userName: user.userName,
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
        },
      );
      if (response.status === 200) {
        console.log("Request Done");
        window.location.reload();
      }
    } catch (error) {
      console.log("Error in sending following request", error);
    }
  };

  return (
    <div className="userProfilePage">
      {accountInfo && (
        <>
          <header className="searchProfileHeader bg-gray-200 h-[8rem] md:h-[12rem]">
            <div className="userInfo">
              <div className="userImage">
                <img className="w-[6rem] h-[6rem] bg-gray-100 md:w-[8rem] md:h-[8rem]" />
              </div>
              <div className="userDetails">
                <div className="w-sm">
                  <h1 className="text-md font-bold md:text-4xl md:font-medium ">
                    {accountInfo?.userName} <span>*</span>
                  </h1>
                  <h2 className="text-sm md:text-xl">
                    {accountInfo?.fullName}
                  </h2>
                </div>
                <div className="w-full h-full flex flex-col justify-center items-left md:gap-3 border-l">
                  <p className="h-[50%] w-[50%] overflow-y-scroll">
                    {accountInfo?.bioData}
                  </p>
                  <section className="buttonArea">
                    <div>
                      {followers.find(
                        (follower) =>
                          follower.userId === searchUserId &&
                          follower.followerId === userId,
                      ) ? (
                        <button
                          className="text-sm font-bold bg-red-400 text-white w-[4rem] md:w-[6rem] lg:w-[8rem] rounded-sm cursor-pointer"
                          onClick={() => handleUnFollow(accountInfo?.userName)}
                        >
                          UnFollow
                        </button>
                      ) : (
                        <button
                          className="positiveBtn text-sm font-bold bg-black text-white w-[4rem] md:w-[6rem] lg:w-[8rem] rounded-sm cursor-pointer"
                          onClick={() => handleFollow(accountInfo?.userName)}
                        >
                          Follow
                        </button>
                      )}

                      {followings.find(
                        (following) =>
                          (following.userId === userId &&
                            following.followingId === searchUserId) ||
                          (following.userId === searchUserId &&
                            following.followingId === userId),
                      ) ||
                      followers.find(
                        (follower) =>
                          (follower.userId === searchUserId &&
                            follower.followerId === userId) ||
                          (follower.userId === userId &&
                            follower.followerId === searchUserId),
                      ) ? (
                        <button className="text-sm font-bold bg-black text-white w-[4rem] md:w-[6rem] lg:w-[8rem] rounded-sm cursor-pointer">
                          <Link to="message">Message</Link>
                        </button>
                      ) : (
                        <button
                          className="text-sm font-bold bg-black text-white w-[4rem] md:w-[6rem] lg:w-[8rem] rounded-sm cursor-not-allowed messageBtn"
                          title="follow for messaging"
                        >
                          <Link className="cursor-not-allowed">Message</Link>
                        </button>
                      )}
                    </div>
                  </section>
                </div>
                <ul className=" flex flex-col gap-y-2 justify-center items-center lg:flex-row lg:justify-center lg:items-center">
                  <li
                    className="text-xs flex flex-col justify-center items-center md:text-lg"
                    onClick={() => {
                      setOpenFollowers(true);
                      setOpenFollowing(false);
                      console.log(followers);
                      console.log("Clicked Followers");
                    }}
                  >
                    <span className="font-bold text-md md:text-xl">
                      {accountInfo?.followers}
                    </span>
                    Followers
                  </li>
                  <li
                    className="text-xs flex flex-col justify-center items-center md:text-lg"
                    onClick={() => {
                      setOpenFollowers(false);
                      setOpenFollowing(true);
                      console.log(followings);
                      console.log("Clicked Followings");
                    }}
                  >
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
            {openFollowers && (
              <div>
                {followers?.map((follower) => (
                  <p key={follower?._id}>{follower?.followerUsername}</p>
                ))}
              </div>
            )}
            {openFollowing && (
              <div>
                {followings?.map((following) => (
                  <p key={following?._id}>{following?.followingUsername}</p>
                ))}
              </div>
            )}
          </div>
          <Outlet context={{ accountInfo, followers, followings }} />
        </>
      )}
    </div>
  );
}
