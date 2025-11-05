import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function SettingsOptions() {
  return (
    <div>
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
        <Link to={`accountDeletion`}>
          <li>Account Deletion</li>
        </Link>
      </ul>
    </div>
  );
}
