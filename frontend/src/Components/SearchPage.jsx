import { useState, useEffect } from "react";
import { Link, Outlet, useParams } from "react-router-dom";
import SearchAccountProfile from "./SearchAccountProfile";

export default function Search() {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchAccounts, setAccounts] = useState([]);
  const params = useParams();
  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_BASE_URL}/homePage/search?account=${searchTerm}`,
          {
            method: "GET",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
          },
        );
        const data = await response.json();
        if (data.accounts) {
          setAccounts(data.accounts);
        }
      } catch (error) {
        return console.error("Error in connecting server", error);
      }
    };
    fetchAccounts();
  }, [searchTerm]);
  return (
    <div className="searchPage w-full h-full flex">
      <div>
        <input
          type="search"
          placeholder="search"
          value={searchTerm}
          className="border border-gray-300"
          onChange={(e) => {
            setSearchTerm(e.target.value);
          }}
        />
        <div>
          <ul>
            {searchAccounts?.map((account) => (
              <li key={account._id}>
                <Link
                  to={
                    account._id !== params.userId
                      ? `/homePage/${account._id}`
                      : `/homePage/userProfile`
                  }
                >
                  {account?.userName}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
