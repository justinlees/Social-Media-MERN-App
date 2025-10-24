import { Link } from "react-router-dom";

export default function SignIn() {
  return (
    <div>
      <form>
        <fieldset>
          <label>Enter UserName or Mobile</label>
          <input type="text" required />
        </fieldset>
        <fieldset>
          <label>Enter Password</label>
          <input type="password" required />
        </fieldset>
        <button className="positiveBtn">Login</button>
      </form>
      <section>
        <Link>SignIn with Google</Link>
      </section>
    </div>
  );
}
