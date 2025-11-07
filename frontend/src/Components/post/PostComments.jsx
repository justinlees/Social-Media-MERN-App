import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

export default function PostComments({ postId, UserName, setOpenComments }) {
  const [postComments, setPostComments] = useState([]);
  const [loading, setLoading] = useState(false);
  const params = useParams();
  useEffect(() => {
    try {
      const fetchData = async () => {
        const response = await fetch(
          `http://localhost:5000/${params.userId}/homePage/${postId}/getComments`,
          { method: "GET", headers: { "Content-Type": "application/json" } }
        );

        if (response.status === 200) {
          const data = await response.json();

          setPostComments(data.comments);
        }
      };
      fetchData();
    } catch (error) {
      console.error("Error occured while fetching");
    }
  }, [params.userId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = {
      userName: UserName,
      postId: postId,
      text: e.target.text.value,
    };
    try {
      const response = await fetch(
        `http://localhost:5000/${params.userId}/homepage/${postId}/commentPost`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );

      if (response.status === 201) {
        window.location.reload();
      }
    } catch (error) {
      console.error("Error in sending the data");
    }
  };

  return (
    <div>
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
