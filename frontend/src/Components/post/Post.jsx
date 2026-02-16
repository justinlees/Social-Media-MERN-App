import { useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import SelfPostOptions from "./SelfPostOptions";
import OthersPostOptions from "./OthersPostOptions";
import PostComments from "./PostComments";

export default function Post({ posts, user, setUserPosts }) {
  const [selfUser, setSelfUser] = useState(false);
  const [getPostId, setGetPostId] = useState();
  const [otherUser, setOtherUser] = useState(false);
  const [openComments, setOpenComments] = useState(false);

  const navigate = useNavigate();
  const params = useParams();

  const handleSubmit = async (postId) => {
    const formData = {
      _id: postId,
      userId: user._id,
    };
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}/homePage/userProfile/likePost`,
        {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify(formData),
        },
      );

      if (response.status === 200) {
        navigate(".");
      }
    } catch (error) {
      console.error("Server Error", error);
    }
  };
  return (
    <>
      {posts?.map((post) => (
        <section
          className="card w-[75%] h-max md:w-[30rem] md:h-[35rem] "
          key={post?._id}
        >
          <div className="cardHeader">
            <div className="cardUser">
              <img />
              <p>
                <Link
                  to={
                    post?.userId !== user._id
                      ? `/homePage/${post?.userId}`
                      : `/homePage/userProfile`
                  }
                >
                  {post?.userName}
                </Link>
              </p>
            </div>
            <span
              onClick={() => {
                if (post?.userId === user._id) {
                  setGetPostId(post?._id);
                  setSelfUser(true);
                } else {
                  setGetPostId(post?._id);
                  setOtherUser(true);
                }
              }}
            >
              ::
            </span>
            {selfUser && post?._id === getPostId && (
              <SelfPostOptions
                postId={post?._id}
                setUserPosts={setUserPosts}
                setSelfUser={setSelfUser}
              />
            )}
            {otherUser && post?._id === getPostId && (
              <OthersPostOptions
                postId={post?._id}
                setOtherUser={setOtherUser}
              />
            )}
          </div>
          <div className="cardPost">
            <img
              src={
                post?.postImage ||
                `https://static.skillshare.com/uploads/discussion/tmp/cbe48544.jpg`
              }
            />
          </div>
          <div className="postCaption">
            <div className="cardReview">
              <p>
                <span
                  className={
                    post?.likedBy.find((id) => user._id === id)
                      ? "material-symbols-outlined like"
                      : "material-symbols-outlined"
                  }
                  onClick={() => {
                    if (post?.userId !== user._id) {
                      handleSubmit(post?._id);
                    }
                  }}
                >
                  sentiment_satisfied
                </span>
                {post?.likes}
              </p>
              <p>
                <span
                  className="material-symbols-outlined"
                  onClick={() => {
                    setGetPostId(post?._id);
                    setOpenComments(true);
                  }}
                >
                  mode_comment
                </span>
                {post?.comments}
              </p>
              <p>
                <span className="material-symbols-outlined">send</span>
              </p>
            </div>
            <p className="caption">
              <span>
                <Link
                  to={
                    post?.userId !== user._d
                      ? `/homePage/${post?.userId}`
                      : `/homePage/userProfile`
                  }
                >
                  {post?.userName}
                </Link>
              </span>
              {post?.postCaption}
            </p>
          </div>
          {openComments && post?._id === getPostId && (
            <PostComments
              postId={post?._id}
              user={user}
              setOpenComments={setOpenComments}
            />
          )}
        </section>
      ))}
    </>
  );
}
