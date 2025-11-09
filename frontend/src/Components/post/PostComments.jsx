import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

export default function PostComments({ postId, UserName, setOpenComments }) {
  const [postComments, setPostComments] = useState([]);
  const [loading, setLoading] = useState(false);
  const params = useParams();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/${params.userId}/homePage/${postId}/getComments`,
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
      userName: UserName,
      postId: postId,
      text: e.target.text.value,
    };
    try {
      const response = await fetch(
        `http://localhost:5000/${params.userId}/homePage/${postId}/commentPost`,
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
