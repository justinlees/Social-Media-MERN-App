import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function SelfPostOptions() {
  const [confirmDelete, setConfirmDelete] = useState(false);
  return (
    <div className="postOptionsPopUp">
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
        <div>
          <button>Delete</button>
          <button
            onClick={() => {
              setConfirmDelete(false);
            }}
          >
            Cancel
          </button>
        </div>
      )}
    </div>
  );
}
