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
          `${import.meta.env.VITE_BASE_URL}/${params.userId}/homePage`
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
      <div className="userHomePage w-screen h-screen">
        <header className="titleHeader w-full">
          <h1 className="text-2xl md:text-3xl">ViewShare</h1>
        </header>
        <div className="content flex flex-col-reverse items-center md:flex-row">
          {/*Left-side Nav content */}
          <div className="leftSide w-full h-[3rem] flex justify-center items-start md:w-[6rem] md:items-center md:h-full">
            {/* Side-Bar */}
            <nav className="sideNav bg-white w-[90%] h-[80%] md:w-[60%] md:bg-gray-200 ">
              <ul className="flex justify-evenly items-center md:flex-col">
                <li className="w-[2rem] h-[2rem] md:w-[2.5rem] md:h-[2.5rem] lg:w-[3rem] lg:h-[3rem] ">
                  <NavLink
                    relative="true"
                    className={({ isActive }) =>
                      isActive
                        ? "text-blue-500 md:bg-[#01277a] md:bg-blue-500 md:text-white"
                        : ""
                    }
                    title="Home"
                    end
                    to={`.`}
                  >
                    <span className="material-symbols-outlined">home</span>
                  </NavLink>
                </li>
                <li className="w-[2rem] h-[2rem] md:w-[2.5rem] md:h-[2.5rem] lg:w-[3rem] lg:h-[3rem] ">
                  <NavLink
                    className={({ isActive }) =>
                      isActive
                        ? "text-blue-500 md:bg-[#01277a] md:bg-blue-500 md:text-white"
                        : ""
                    }
                    to="generateNew"
                    end
                  >
                    <span className="material-symbols-outlined">
                      wand_stars
                    </span>
                  </NavLink>
                </li>
                <li className="w-[2rem] h-[2rem] md:w-[2.5rem] md:h-[2.5rem] lg:w-[3rem] lg:h-[3rem] ">
                  <NavLink
                    className={({ isActive }) =>
                      isActive
                        ? "text-blue-500 md:bg-[#01277a] md:bg-blue-500 md:text-white"
                        : ""
                    }
                    to="search"
                    title="Search"
                    end
                  >
                    <span className="material-symbols-outlined">search</span>
                  </NavLink>
                </li>
                <li className="w-[2rem] h-[2rem] md:w-[2.5rem] md:h-[2.5rem] lg:w-[3rem] lg:h-[3rem] ">
                  <NavLink
                    className={({ isActive }) =>
                      isActive
                        ? "text-blue-500 md:bg-[#01277a] md:bg-blue-500 md:text-white"
                        : ""
                    }
                    to={`userProfile`}
                    title="Profile"
                    end
                  >
                    <span className="material-symbols-outlined">
                      account_circle
                    </span>
                  </NavLink>
                </li>
                <li className="w-[2rem] h-[2rem] md:w-[2.5rem] md:h-[2.5rem] lg:w-[3rem] lg:h-[3rem] ">
                  <NavLink
                    className={({ isActive }) =>
                      isActive
                        ? "text-blue-500 md:bg-[#01277a] md:bg-blue-500 md:text-white"
                        : ""
                    }
                    to={`userSettings`}
                    title="Settings"
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
