import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import UserHome from "./pages/UserHome";
import UserProfile from "./Components/UserProfile";
import AllPosts from "./Components/AllPosts";
import UserSettings from "./Components/UserSettings";
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/account/signUp" element={<SignUp />} />
          <Route path="/account/signIn" element={<SignIn />} />
          <Route path="/:userId/homePage" element={<UserHome />}>
            <Route index="true" element={<AllPosts />} />
            <Route path="userProfile" element={<UserProfile />} />
            <Route path="userSettings" element={<UserSettings />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
