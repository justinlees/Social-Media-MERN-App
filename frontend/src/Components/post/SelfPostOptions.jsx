import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";

export default function SelfPostOptions({ postId, setSelfUser, setUserPosts }) {
  const [confirmDelete, setConfirmDelete] = useState(false);
  const params = useParams();
  const navigate = useNavigate();
  const handleDelete = async () => {
    const deleteData = {
      _id: postId,
    };
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}/homePage/userProfile/postDeletion`,
        {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify(deleteData),
        },
      );

      if (response.status === 200) {
        setUserPosts((prev) => prev.filter((post) => post._id !== postId));
        navigate(".");
      } else if (response.status === 404) {
        alert("Unable to Delete the Post");
      }
    } catch (error) {
      console.error("API Error");
      alert("Error in API");
    }
  };
  return (
    <div className="postOptionsPopUp">
      <button
        className="closeBtn"
        onClick={() => {
          setSelfUser(false);
        }}
      >
        <span className="material-symbols-outlined">close</span>
      </button>

      <ul>
        <li>Edit</li>
        <li
          onClick={() => {
            setConfirmDelete(true);
          }}
        >
          Delete
        </li>
      </ul>
      {confirmDelete && (
        <div className="confirmPopUp">
          <p>
            By clicking delete, you will permanently delete this post from your
            data.
          </p>
          <div className="buttonArea">
            <button
              className="deleteBtn"
              onClick={() => {
                handleDelete();
              }}
            >
              Delete
            </button>
            <button
              onClick={() => {
                setConfirmDelete(false);
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
