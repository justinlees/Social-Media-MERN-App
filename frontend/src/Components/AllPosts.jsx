import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

export default function AllPosts({ posts }) {
  const params = useParams();
  const [isValidLike, setIsValidLike] = useState(false);
  const [allPosts, setAllPosts] = useState([]);
  const handleSubmit = async (postId) => {
    const formData = {
      _id: postId,
      likedBy: params.userId,
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

  useEffect(() => {
    try {
      const fetchData = async () => {
        const response = await fetch(
          `http://localhost:5000/${params.userId}/homePage/allPosts`
        );

        if (response.status === 200) {
          const data = await response.json();
          setAllPosts(data.posts);
        }
      };
      fetchData();
    } catch (error) {
      console.log("Server Error", error);
    }
  }, [params.userId]);

  return (
    <div className="allPosts">
      {allPosts?.map((post) => (
        <section className="card" key={post?._id}>
          <div className="cardHeader">
            <div className="cardUser">
              <img />
              <p>{post?.userName}</p>
            </div>
            <span>::</span>
          </div>
          <div className="cardPost">
            <img src="https://static.skillshare.com/uploads/discussion/tmp/cbe48544.jpg" />
          </div>
          <div className="postCaption">
            <div className="cardReview">
              <p>
                <span
                  className="material-symbols-outlined"
                  onClick={() => {
                    if (post?.userId !== params.userId) {
                      setIsValidLike(!isValidLike);
                      if (isValidLike) handleSubmit(post?._id);
                    }
                  }}
                >
                  sentiment_satisfied
                </span>
                {post?.likes}
              </p>
              <p>
                <span className="material-symbols-outlined">mode_comment</span>
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
        </section>
      ))}
    </div>
  );
}
