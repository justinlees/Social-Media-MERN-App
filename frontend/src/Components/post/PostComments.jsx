import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

export default function PostComments({ postId, user, setOpenComments }) {
  const [postComments, setPostComments] = useState([]);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [commentId, setCommentId] = useState();
  const [loading, setLoading] = useState(false);
  const params = useParams();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_BASE_URL}/${
            params.userId
          }/homePage/${postId}/getComments`,
          { method: "GET", headers: { "Content-Type": "application/json" } }
        );

        if (response.status === 200) {
          const data = await response.json();
          setPostComments(data.comments);
        }
      } catch (error) {
        console.error("Error occured while fetching");
      }
    };
    fetchData();
  }, [params.userId, postId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = {
      userName: user?.userName,
      postId: postId,
      text: e.target.text.value,
    };
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}/${
          params.userId
        }/homePage/${postId}/commentPost`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );
      setLoading(false);
      if (response.status === 201) {
        window.location.reload();
      } else if (response.status === 404) {
        alert("Error in posting comment");
      }
    } catch (error) {
      console.error("Error in sending the data");
    }
  };

  const handleDelete = async (commentId) => {
    const commentData = {
      _id: commentId,
      postId: postId,
    };
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}/${
          params.userId
        }/homePage/deleteComment`,
        {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(commentData),
        }
      );
      if (response.status === 200) {
        window.location.reload();
      } else if (response.status === 404) {
        alert("Unable to delete comment");
      }
    } catch (error) {
      console.error("Error in sending request");
    }
  };

  return (
    <div className="commentSection">
      <span
        className="material-symbols-outlined"
        onClick={() => {
          setOpenComments(false);
        }}
      >
        close
      </span>
      {postComments.length ? (
        <div>
          {postComments?.map((comment) => (
            <article key={comment?._id}>
              <h3>{comment?.userName}</h3>
              <p>{comment?.text}</p>
              {comment?.userName === user?.userName && (
                <span
                  className="material-symbols-outlined"
                  onClick={() => {
                    setCommentId(comment?._id);
                    setConfirmDelete(true);
                  }}
                >
                  delete
                </span>
              )}
              {confirmDelete && commentId === comment?._id && (
                <div>
                  By clicking Delete Permanently, your comment will be deleted
                  forever
                  <button
                    onClick={() => {
                      handleDelete(comment._id);
                    }}
                  >
                    Delete Permanently
                  </button>
                  <button
                    onClick={() => {
                      setConfirmDelete(false);
                    }}
                  >
                    Cancel
                  </button>
                </div>
              )}
            </article>
          ))}
        </div>
      ) : (
        <div>No Posts</div>
      )}
      <form method="POST" onSubmit={handleSubmit}>
        <textarea name="text" placeholder="Enter comment ..."></textarea>
        <button type="submit">send</button>
      </form>
    </div>
  );
}
