import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function SignUp() {
  const handleSubmit = async (e) => {
    const formData = {
      fullName: e.target.fullName.value,
      userName: e.target.userName.value,
      dob: e.target.dob.value,
      mobile: e.target.mobile.value,
      email: e.target.email.value,
      password: e.target.password.value,
    };
    try {
      const response = await fetch(`${process.env.BASE_URL}/account/signUp`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.status === 201) {
        const userId = await response.json();
        window.location(`${userId}/homePage`);
      } else {
        console.log("Error in Creating user");
      }
    } catch (error) {
      console.error("Server Error occured", error);
    }
  };

  return (
    <div className="signUpPage">
      <form method="POST" onSubmit={handleSubmit}>
        <fieldset>
          <label>Enter Full Name</label>
          <input type="text" name="fullName" required />
        </fieldset>
        <fieldset>
          <label>Enter UserName</label>
          <input type="text" name="userName" required />
        </fieldset>
        <fieldset>
          <label>Enter DOB</label>
          <input type="date" name="dob" required />
        </fieldset>
        <fieldset>
          <label>Enter Mobile</label>
          <input type="text" name="mobile" required />
        </fieldset>
        <fieldset>
          <label>Enter Email</label>
          <input type="email" name="email" required />
        </fieldset>
        <fieldset>
          <label>Enter Password</label>
          <input type="password" minLength="8" name="password" required />
        </fieldset>
        <button className="positiveBtn" type="submit">
          Create Account
        </button>
      </form>
      <section>
        <Link>SignIn with Google</Link>
      </section>
    </div>
  );
}
