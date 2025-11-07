import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function SettingsOptions() {
  return (
    <>
      <ul>
        <li>
          <Link to={"accountInfo"}>Account info</Link>
        </li>
        <li>
          <Link to={""}>Blocked Accounts</Link>
        </li>
        <li>
          <Link to={""}>Account privacy</Link>
        </li>
        <li>
          <Link to={"accountDeletion"}>Account Deletion</Link>
        </li>
      </ul>
    </>
  );
}
