import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="mainPage">
      <section className="heroSection">
        <h1>Welcome to ViewShare</h1>
        <button className="differentBtn">
          <Link to={"account/signUp"}>SignUp</Link>
        </button>
        <button className="positiveBtn">
          <Link to={"account/signIn"}>SignIn</Link>
        </button>
      </section>
    </div>
  );
}
