import { useState } from "react";
import { useParams } from "react-router-dom";
import SelfPostOptions from "./SelfPostOptions";
import OthersPostOptions from "./OthersPostOptions";
import PostComments from "./PostComments";

export default function Post({ posts, user }) {
  const [selfUser, setSelfUser] = useState(false);
  const [getPostId, setGetPostId] = useState();
  const [otherUser, setOtherUser] = useState(false);
  const [openComments, setOpenComments] = useState(false);
  const [isValidLike, setIsValidLike] = useState(false);
  const params = useParams();

  const handleSubmit = async (postId) => {
    const formData = {
      _id: postId,
      userId: params.userId,
    };
    try {
      const response = await fetch(
        `http://localhost:5000/${params.userId}/homePage/userProfile/likePost`,
        {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (response.status === 200) {
        window.location.reload();
      }
    } catch (error) {
      console.error("Server Error", error);
    }
  };

  return (
    <>
      {posts?.map((post) => (
        <section className="card" key={post?._id}>
          <div className="cardHeader">
            <div className="cardUser">
              <img />
              <p>{post?.userName}</p>
            </div>
            <span
              onClick={() => {
                if (post?.userId === params.userId) {
                  setGetPostId(post?._id);
                  setSelfUser(true);
                } else setOtherUser(true);
              }}
            >
              ::
            </span>
            {selfUser && post?._id === getPostId && (
              <SelfPostOptions postId={post?._id} setSelfUser={setSelfUser} />
            )}
            {otherUser && (
              <OthersPostOptions
                postId={post?._id}
                setOtherUser={setOtherUser}
              />
            )}
          </div>
          <div className="cardPost">
            <img src="https://static.skillshare.com/uploads/discussion/tmp/cbe48544.jpg" />
          </div>
          <div className="postCaption">
            <div className="cardReview">
              <p>
                <span
                  className={
                    post?.likedBy.find((id) => params.userId === id)
                      ? "material-symbols-outlined like"
                      : "material-symbols-outlined"
                  }
                  onClick={() => {
                    if (post?.userId !== params.userId) {
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
              <span>{post?.userName}</span>
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
