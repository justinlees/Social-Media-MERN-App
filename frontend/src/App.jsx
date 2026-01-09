import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import UserHome from "./pages/UserHome";
import UserProfile from "./Components/UserProfile";
import AllPosts from "./Components/AllPosts";
import UserSettings from "./Components/UserSettings";
import SettingsOptions from "./Components/settings/SettingsOptions";
import AccountDeletion from "./Components/settings/AccountDeletion";
import EditProfile from "./Components/settings/EditProfile";
import Search from "./Components/SearchPage";
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
            <Route path="search" element={<Search />} />
            <Route path="userProfile" element={<UserProfile />} />
            <Route path="userSettings" element={<UserSettings />}>
              <Route index="true" element={<SettingsOptions />} />
              <Route path="accountDeletion" element={<AccountDeletion />} />
              <Route path="accountInfo" element={<EditProfile />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
