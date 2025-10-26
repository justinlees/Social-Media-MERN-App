export default function UserProfile() {
  return (
    <div className="userProfilePage">
      <header className="profileHeader">
        <div className="userImage">
          <img />
        </div>
        <div className="userDetails">
          <h1>UserName</h1>
          <h2>Full Name</h2>
          <ul>
            <li>Followers</li>
            <li>Following</li>
          </ul>
          <button>Create Post</button>
          <button>Message</button>
        </div>
      </header>
      <div>
        <h1>No posts.Click Create Post</h1>
      </div>
    </div>
  );
}
