import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function SignUp() {
  const [loading, setLoading] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = {
      fullName: e.target.fullName.value,
      userName: e.target.userName.value,
      dob: e.target.dob.value,
      mobile: e.target.mobile.value,
      email: e.target.email.value,
      password: e.target.password.value,
    };
    try {
      const response = await fetch(`http://localhost:5000/account/signUp`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      setLoading(false);
      if (response.status === 201) {
        const data = await response.json();
        window.location = `/${data.user._id}/homePage`;
      } else {
        console.log("Error in Creating user");
      }
    } catch (error) {
      console.error("Server Error occured", error);
    }
  };

  return (
    <div className="account">
      <form method="POST" onSubmit={handleSubmit}>
        <h2>SignUp</h2>
        <fieldset>
          <input
            type="text"
            name="fullName"
            placeholder="Enter Fullname"
            required
          />
        </fieldset>
        <fieldset>
          <input
            type="text"
            name="userName"
            placeholder="Enter UserName"
            required
          />
        </fieldset>
        <fieldset>
          <input type="date" name="dob" required />
        </fieldset>
        <fieldset>
          <input
            type="text"
            name="mobile"
            placeholder="Enter Mobile"
            required
          />
        </fieldset>
        <fieldset>
          <input type="email" name="email" placeholder="Enter Email" required />
        </fieldset>
        <fieldset>
          <input
            type="password"
            minLength="8"
            name="password"
            placeholder="Enter Password"
            required
          />
        </fieldset>
        <fieldset>
          <button className="positiveBtn" type="submit">
            {loading ? <span className="loader"></span> : "Create Account"}
          </button>
        </fieldset>
        <fieldset>
          <Link>SignIn with Google</Link>
        </fieldset>
      </form>
    </div>
  );
}
