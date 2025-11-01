import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function SignIn() {
  const [loading, setLoading] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = {
      userName: e.target.userName.value,
      password: e.target.password.value,
    };
    try {
      const response = await fetch(`http://localhost:5000/account/signIn`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      setLoading(false);
      if (response.status === 200) {
        const data = await response.json();
        window.location = `/${data.user._id}/homePage`;
      } else if (response.status === 404) {
        alert("UserName or Password is wrong");
      } else {
        alert("Server Error, please try later.");
      }
    } catch (error) {
      console.error("Unable to login", error);
    }
  };
  return (
    <div className="account">
      <form method="POST" onSubmit={handleSubmit}>
        <h2>SignIn</h2>
        <fieldset>
          <input
            type="text"
            name="userName"
            placeholder="Enter UserName or Mobile"
            required
          />
        </fieldset>
        <fieldset>
          <input
            type="password"
            name="password"
            placeholder="Enter Password"
            required
          />
        </fieldset>
        <fieldset>
          <button className="positiveBtn" type="submit">
            {loading ? <span className="loader"></span> : "Login"}
          </button>
        </fieldset>
        <fieldset>
          <Link to={``}>forgotPassword?</Link>
        </fieldset>
        <fieldset>
          <Link>SignIn with Google</Link>
        </fieldset>
      </form>
    </div>
  );
}
