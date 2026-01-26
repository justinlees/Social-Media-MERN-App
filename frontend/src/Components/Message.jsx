import { useState, useEffect, useRef } from "react";
import { Link, useOutletContext, useParams } from "react-router-dom";
import { io } from "socket.io-client";

export default function Message() {
  const { accountInfo } = useOutletContext();
  const [message, setMessage] = useState([]);
  const params = useParams();
  const socket = useRef(null);
  const chatId =
    params.userId > accountInfo._id
      ? `${params.userId}-${accountInfo._id}`
      : `${accountInfo._id}-${params.userId}`;
  useEffect(() => {
    socket.current = io(import.meta.env.VITE_BASE_URL);
    return () => socket.current.disconnect();
  }, []);

  useEffect(() => {
    const handleMessage = (msg) => {
      setMessage((prev) => [...prev, msg]);
    };
    socket.current.on(`${chatId}`, handleMessage);
    return () => socket.current.off(`${chatId}`, handleMessage);
  }, [chatId]);

  useEffect(() => {
    socket.current.emit("joinId", chatId);
  }, [chatId]);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_BASE_URL}/${params.userId}/homePage/${accountInfo._id}/message`,
          {
            method: "GET",
            headers: { "Content-Type": "application/json" },
          },
        );
        if (response.status === 200) {
          const data = await response.json();
          setMessage(data.msg);
        } else if (response.status === 204) {
          setMessage([]);
        }
      } catch (error) {
        console.log("Error in requesting the GET", error);
      }
    };
    fetchMessages();
  }, [params.userId, accountInfo._id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = {
      file: e.target.fileInput.value,
      text: e.target.messageEntry.value,
    };
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}/${params.userId}/homePage/${accountInfo._id}/message`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        },
      );
      if (response.status === 201) {
        socket.current.emit("sendMessage", formData);
        e.target.reset();
      } else {
        alert("Message Not Sent");
      }
    } catch (error) {
      console.log("Error in requesting Server", error);
    }
  };

  return (
    <div className="w-full h-full md:w-md md:h-[60%] bg-yellow-200 flex flex-col absolute bottom-0">
      <section className="w-full bg-yellow-300 flex justify-between">
        <h1>{accountInfo.userName}</h1>
        <Link to="..">X</Link>
      </section>
      <div className="chat">
        {message?.map((msg) => (
          <p>{msg?.text}</p>
        ))}
      </div>
      <form
        method="POST"
        className="w-full h-auto bg-gray-200 flex"
        onSubmit={handleSubmit}
      >
        <div className="border border-gray-400">
          <label className="border border-gray-400">
            + <input type="file" name="fileInput" className="hidden" />
          </label>
          <input name="messageEntry" required />
        </div>
        <button type="submit">&rarr;</button>
      </form>
    </div>
  );
}
