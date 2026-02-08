import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import socket from "../lib/SocketInstance";

export default function Notifications() {
  const [notifications, setNotifications] = useState([]);
  const { userId } = useParams();
  useEffect(() => {
    socket.on(`${userId}`, (notifyData) => {
      setNotifications((prev) => [...prev, notifyData]);
    });
  }, [userId]);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_BASE_URL}/${userId}/homePage/userProfile/notifications`,
          { method: "GET", headers: { "Content-Type": "application/json" } },
        );
        if (response.status === 200) {
          const data = await response.json();
          console.log(data.getRequests);
          setNotifications(data.getRequests);
        }
      } catch (error) {
        console.log("Error in requesting API", error);
      }
    };
    fetchNotifications();
  }, [userId]);

  const acceptRequest = async (followData) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}/${userId}/following/${followData.userId}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(followData),
        },
      );
      if (response.status === 200) {
        console.log("Request Done");
        window.location.reload();
      }
    } catch (error) {
      console.log("Error in sending following request", error);
    }
  };

  return (
    <div className="userProfilePage">
      <h1>Notifications</h1>
      {notifications?.map((notification) => (
        <div key={notification?._id}>
          <p>
            <span className="font-bold">
              <Link to={`../${notification?.userId}`}>
                {notification?.userName}
              </Link>
            </span>{" "}
            requested to follow you
          </p>
          <button
            className="border border-black"
            onClick={() => {
              acceptRequest(notification);
            }}
          >
            Accept
          </button>
          <p>or</p>
          <button>Reject</button>
        </div>
      ))}
    </div>
  );
}
