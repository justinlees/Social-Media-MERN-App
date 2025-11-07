import { useState, useEffect } from "react";
import { useParams, useOutletContext } from "react-router-dom";
import Post from "./post/Post";

export default function AllPosts({ posts }) {
  const params = useParams();
  const [loading, setLoading] = useState(false);
  const [allPosts, setAllPosts] = useState([]);
  const user = useOutletContext();

  useEffect(() => {
    try {
      const fetchData = async () => {
        setLoading(true);
        const response = await fetch(
          `http://localhost:5000/${params.userId}/homePage/allPosts`
        );

        if (response.status === 200) {
          setLoading(false);
          const data = await response.json();
          setAllPosts(data.posts);
        }
      };
      fetchData();
    } catch (error) {
      console.log("Server Error", error);
    }
  }, [params.userId]);

  if (loading)
    return (
      <div className="loadPage">
        <span className="mainLoader"></span>
      </div>
    );
  else if (!allPosts.length)
    return (
      <div className="userHomePage">
        <h1>No Posts</h1>
      </div>
    );
  else
    return (
      <div className="allPosts">
        <Post posts={allPosts} UserName={user?.userName} />
      </div>
    );
}
