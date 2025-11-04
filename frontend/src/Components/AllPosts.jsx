import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Post from "./Post";

export default function AllPosts({ posts }) {
  const params = useParams();
  const [allPosts, setAllPosts] = useState([]);

  useEffect(() => {
    try {
      const fetchData = async () => {
        const response = await fetch(
          `http://localhost:5000/${params.userId}/homePage/allPosts`
        );

        if (response.status === 200) {
          const data = await response.json();
          setAllPosts(data.posts);
        }
      };
      fetchData();
    } catch (error) {
      console.log("Server Error", error);
    }
  }, [params.userId]);

  return (
    <div className="allPosts">
      <Post posts={allPosts} />
    </div>
  );
}
