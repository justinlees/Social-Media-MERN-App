import { useState, useEffect } from "react";
import { Link, Outlet, useOutletContext } from "react-router-dom";

export default function UserSettings() {
  const user = useOutletContext();
  return (
    <div className="userSettingsPage">
      <header>
        <h1>Settings</h1>
      </header>
      <div className="settings">
        <Outlet context={user} />
      </div>
    </div>
  );
}
