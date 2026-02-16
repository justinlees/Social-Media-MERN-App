import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function PostCreation({
  setOpenPost,
  postUserName,
  setUserPosts,
}) {
  const params = useParams();
  const [docFile, setDocFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData();
    formData.append("userId", params.userId);
    formData.append("userName", postUserName);
    formData.append("postImage", docFile);
    formData.append("postCaption", e.target.postCaption.value);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}/homePage/userProfile/postCreation`,
        {
          method: "POST",
          credentials: "include",
          body: formData,
        },
      );
      if (response.status === 201) {
        const data = await response.json();
        setUserPosts((prev) => [...prev, data.createPost]);
        setOpenPost(false);
        setLoading(false);
        navigate(".");
      }
    } catch (error) {
      console.log("Error Occured", error);
    }
  };

  return (
    <div className="postCreationPage">
      <div className="postCreationCard w-sm h-[70%] rounded-md shadow-md border-1 border-gray-300 md:w-lg md:h-[70%] z-10 ">
        <header>
          <button
            onClick={() => {
              setOpenPost(false);
            }}
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </header>
        <form
          method="POST"
          onSubmit={handleSubmit}
          encType="multipart/form-data"
        >
          <div className="imageSelection">
            <label className="positiveBtn">
              Add Image
              <span className="material-symbols-outlined">upload</span>
              <input
                type="file"
                name="postImage"
                required
                onChange={(e) => {
                  const file = e.target.files[0];
                  setDocFile(file);
                }}
              />
            </label>
          </div>
          {/* <div className="postPreview">
            <img />
          </div> */}
          <div className="postCaptionInput">
            <textarea
              className="border border-1 border-gray rounded-sm"
              placeholder="Enter Caption"
              name="postCaption"
              required
            ></textarea>
          </div>
          <div className="buttonsArea">
            <button type="submit" className="positiveBtn">
              {loading ? <span className="loader"></span> : "Post"}
            </button>
            <button type="reset" className="bg-black text-white font-bold">
              Clear
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
