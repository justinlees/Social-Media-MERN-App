import { Link } from "react-router-dom";

export default function SignUp() {
  return (
    <div>
      <form>
        <fieldset>
          <label>Enter Full Name</label>
          <input type="text" required />
        </fieldset>
        <fieldset>
          <label>Enter UserName</label>
          <input type="text" required />
        </fieldset>
        <fieldset>
          <label>Enter DOB</label>
          <input type="date" required />
        </fieldset>
        <fieldset>
          <label>Enter Mobile</label>
          <input type="text" required />
        </fieldset>
        <fieldset>
          <label>Enter Email</label>
          <input type="email" required />
        </fieldset>
        <fieldset>
          <label>Enter Password</label>
          <input type="password" minLength="8" required />
        </fieldset>
        <button className="positiveBtn">Create Account</button>
      </form>
      <section>
        <Link>SignIn with Google</Link>
      </section>
    </div>
  );
}
