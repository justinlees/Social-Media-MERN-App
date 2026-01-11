import { useState, useEffect } from "react";
import { Link, Outlet, useParams } from "react-router-dom";
import SearchAccountProfile from "./SearchAccountProfile";

export default function Search() {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchAccounts, setAccounts] = useState([]);
  const [accountInfo, setAccountInfo] = useState(null);
  const params = useParams();
  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        console.log("enter fetch");
        const response = await fetch(
          `${import.meta.env.VITE_BASE_URL}/${
            params.userId
          }/homePage/search?account=${searchTerm}`,
          {
            method: "GET",
            headers: { "Content-Type": "application/json" },
          }
        );
        console.log("Finish fetch");
        const data = await response.json();
        console.log("get data");
        if (data.accounts) {
          setAccounts(data.accounts);
        }
      } catch (error) {
        return console.error("Error in connecting server", error);
      }
    };
    fetchAccounts();
  }, [searchTerm, params.userId]);
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
              <li
                key={account._id}
                onClick={() => {
                  setAccountInfo(account);
                }}
              >
                <Link to={`${account?._id}`}>{account.userName}</Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="searchAccountProfile w-full h-full">
        <Outlet context={accountInfo} />
      </div>
    </div>
  );
}
