import { Link, Outlet } from "react-router-dom";

export default function UserHome() {
  return (
    <div className="userHomePage">
      <header className="titleHeader">
        <h1>ViewShare</h1>
      </header>
      <div className="content">
        <div className="leftSide">
          <nav className="sideNav">
            <ul>
              <li>
                <Link relative="true" to={`.`}>
                  <span className="material-symbols-outlined">home</span>
                </Link>
              </li>
              <li>
                <Link>
                  <span class="material-symbols-outlined">wand_stars</span>
                </Link>
              </li>
              <li>
                <Link>
                  <span className="material-symbols-outlined">search</span>
                </Link>
              </li>
              <li>
                <Link to={`userProfile`}>
                  <span className="material-symbols-outlined">
                    account_circle
                  </span>
                </Link>
              </li>
              <li>
                <Link to={`userSettings`}>
                  <span className="material-symbols-outlined">settings</span>
                </Link>
              </li>
            </ul>
          </nav>
        </div>

        <div className="outletLayout">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
