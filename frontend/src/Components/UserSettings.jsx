import { useState, useEffect } from "react";
import { Link, Outlet } from "react-router-dom";

export default function UserSettings() {
  const [settingsOption, setSettingsOption] = useState(false);
  return (
    <div className="userSettingsPage">
      <header>
        <h1>Settings</h1>
      </header>
      <div className="settings">
        <Outlet />
      </div>
    </div>
  );
}
