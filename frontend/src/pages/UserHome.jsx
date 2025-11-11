import { useState, useEffect } from "react";
import { NavLink, Outlet, useParams } from "react-router-dom";

export default function UserHome() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const params = useParams();
  useEffect(() => {
    try {
      const fetchData = async () => {
        setLoading(true);
        const response = await fetch(
          `http://localhost:5000/${params.userId}/homePage`
        );
        const data = await response.json();
        if (response.status === 200) {
          setLoading(false);
          setUser(data.user);
        } else {
          window.location.href = "/";
        }
      };
      fetchData();
    } catch (error) {
      consol.error("Error Occured", error);
    }
  }, [params.userID]);

  if (loading)
    return (
      <div className="loadPage">
        <span className="mainLoader"></span>
      </div>
    );
  else
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
                  <NavLink
                    className={({ isActive }) => (isActive ? "activeLink" : "")}
                    relative="true"
                    end
                    to={`.`}
                  >
                    <span className="material-symbols-outlined">home</span>
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    className={({ isActive }) => (isActive ? "activeLink" : "")}
                    to="generateNew"
                    end
                  >
                    <span className="material-symbols-outlined">
                      wand_stars
                    </span>
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    className={({ isActive }) => (isActive ? "activeLink" : "")}
                    to="search"
                    end
                  >
                    <span className="material-symbols-outlined">search</span>
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    className={({ isActive }) => (isActive ? "activeLink" : "")}
                    to={`userProfile`}
                    end
                  >
                    <span className="material-symbols-outlined">
                      account_circle
                    </span>
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    className={({ isActive }) => (isActive ? "activeLink" : "")}
                    to={`userSettings`}
                    end
                  >
                    <span className="material-symbols-outlined">settings</span>
                  </NavLink>
                </li>
              </ul>
            </nav>
          </div>

          <div className="outletLayout">
            <Outlet context={user} />
          </div>
        </div>
      </div>
    );
}
