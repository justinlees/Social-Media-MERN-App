import { Link, useParams } from "react-router-dom";

export default function AccountDeletion() {
  const params = useParams();
  const handleDelete = async () => {
    const userData = {
      _id: params.userId,
    };
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}/homePage/userSettings/accountDeletion`,
        {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify(userData),
        },
      );

      if (response.status === 200) {
        window.location.href = "/";
      } else if (response.status === 404) {
        alert("Unable to delete Account");
      }
    } catch (error) {
      console.error("Unable to connect to server");
      alert("Unable to connect to server");
    }
  };
  return (
    <div className="accountDeletionPage">
      <p>DeleteAccount?</p>
      <p>
        Deleting account will Permanently delete all your information of the
        account that includes your posts and followers.No one will be able to
        connect with your account and it will disappear immediately.We do not
        store any of your data. Are you sure you want to Delete your account?
      </p>
      <div className="buttonArea">
        <button
          onClick={() => {
            handleDelete();
          }}
        >
          Delete
        </button>
        <button>
          <Link to="..">Cancel</Link>
        </button>
      </div>
    </div>
  );
}
