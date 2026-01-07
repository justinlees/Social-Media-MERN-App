import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function PostCreation({ setOpenPost, postUserName }) {
  const params = useParams();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = {
      userId: params.userId,
      userName: postUserName,
      postImage: e.target.postImage.value,
      postCaption: e.target.postCaption.value,
    };
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}/${
          params.userId
        }/homePage/userProfile/postCreation`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (response.status === 201) {
        window.location.reload();
      }
    } catch (error) {
      console.log("Error Occured", error);
    }
  };

  return (
    <div className="postCreationPage">
      <div className="postCreationCard w-sm h-[70%] rounded-md shadow-md border-1 border-gray-300 md:w-lg md:h-[70%] ">
        <header>
          <button
            onClick={() => {
              setOpenPost(false);
            }}
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </header>
        <form method="POST" onSubmit={handleSubmit}>
          <div className="imageSelection">
            <label className="positiveBtn">
              Add Image
              <span className="material-symbols-outlined">upload</span>
              <input type="file" name="postImage" required />
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
              Post
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
