import { useState, useEffect } from "react";
import { Link, useOutletContext, useParams } from "react-router-dom";
import { io } from "socket.io-client";

export default function Message() {
  const { accountInfo } = useOutletContext();
  const socket = io(`${import.meta.env.VITE_BASE_URL}`);
  const [message, setMessage] = useState();
  const params = useParams();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = {
      file: e.target.fileInput.value,
      msg: e.target.messageEntry.value,
    };
    // formData.append("fileInput", e.target.fileInput.value);
    // formData.append("msg", e.target.messageEntry.value);
    // const response = await fetch(
    //   `${import.meta.env.VITE_BASE_URL}/${params.userId}/homePage/${accountInfo._id}/message`,
    //   {
    //     method: "POST",
    //     headers: { "Content-Type": "application/json" },
    //     body: JSON.stringify(formData),
    //   },
    // );
    console.log(formData);
    socket.emit("sendMessage", formData);
    socket.on("chatMsg", (msg) => {
      setMessage(msg);
    });
  };

  return (
    <div className="w-sm h-[50%] bg-yellow-200 absolute bottom-0">
      <section className="w-full bg-yellow-300 flex justify-between">
        <h1>{accountInfo.userName}</h1>
        <Link to="..">X</Link>
      </section>
      <div>
        {message && <p>{message.msg}</p>}
        <form
          method="POST"
          className="w-full h-auto bg-gray-200 p-4 absolute bottom-0 flex"
          encType="multipart/form-data"
          onSubmit={handleSubmit}
        >
          <div className="border border-gray-400">
            <label className="border border-gray-400">
              + <input type="file" name="fileInput" className="hidden" />
            </label>
            <input name="messageEntry" />
          </div>
          <button>&rarr;</button>
        </form>
      </div>
    </div>
  );
}
