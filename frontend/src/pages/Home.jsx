import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="mainPage w-screen h-screen">
      <section className="heroSection w-full h-[60%] ">
        <h1 className="w-full h-full text-7xl">Welcome to ViewShare</h1>
        <div className="buttonArea w-full md:w-[50%]">
          <button className="differentBtn w-[8rem]">
            <Link to={"account/signUp"}>SignUp</Link>
          </button>
          <button className="positiveBtn w-[8rem]">
            <Link to={"account/signIn"}>SignIn</Link>
          </button>
        </div>
      </section>
    </div>
  );
}
