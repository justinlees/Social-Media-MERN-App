import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";

export default function OthersPostOptions({ postId, setOtherUser }) {
  const [confirmDelete, setConfirmDelete] = useState(false);
  const params = useParams();
  const handleSave = async () => {
    const saveData = {
      _id: postId,
    };
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}/${
          params.userId
        }/homePage/userProfile/savePost`,
        {
          method: "Patch",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(saveData),
        }
      );

      if (response.status === 200) {
        window.location.reload();
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
