import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function UserSettings() {
  return (
    <div className="userSettingsPage">
      <header>
        <h1>Settings</h1>
      </header>
      <div className="settings">
        <ul>
          <Link>
            <li>Account info</li>
          </Link>
          <Link>
            <li>Blocked Accounts</li>
          </Link>
          <Link>
            <li>Account Privacy</li>
          </Link>
          <Link>
            <li>Logout</li>
          </Link>
          <Link>
            <li>Account Deletion</li>
          </Link>
        </ul>
      </div>
    </div>
  );
}
