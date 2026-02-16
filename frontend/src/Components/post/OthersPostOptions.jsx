import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";

export default function OthersPostOptions({ postId, setOtherUser }) {
  const [confirmDelete, setConfirmDelete] = useState(false);
  const params = useParams();
  const navigate = useNavigate();
  const handleSave = async () => {
    const saveData = {
      _id: postId,
    };
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}/homePage/userProfile/savePost`,
        {
          method: "Patch",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify(saveData),
        },
      );

      if (response.status === 200) {
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
          setOtherUser(false);
        }}
      >
        <span className="material-symbols-outlined">close</span>
      </button>

      <ul>
        <li
          onClick={() => {
            handleSave();
          }}
        >
          Save
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
