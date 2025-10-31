import { useState, useEffect } from "react";
import { Link, Outlet, useParams } from "react-router-dom";

export default function UserHome() {
  const [userData, setUserData] = useState();
  const params = useParams();
  useEffect(() => {
    try {
      const fetchData = async () => {
        const response = await fetch(
          `http://localhost:5000/${params.userId}/homePage`
        );
        if (response.status === 200) {
          const data = await response.json();
          console.log(data.user);
          console.log(params.userId);
          setUserData(data.user);
        } else {
          console.log("No User Details");
        }
      };
      fetchData();
    } catch (error) {
      consol.error("Error Occured", error);
    }
  }, [params.userID]);
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
                  <span className="material-symbols-outlined">wand_stars</span>
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
          <Outlet context={userData} />
        </div>
      </div>
    </div>
  );
}
