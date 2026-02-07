import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
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
          setNotifications(data);
        }
      } catch (error) {
        console.log("Error in requesting API", error);
      }
    };
    fetchNotifications();
  }, [userId]);
  return (
    <div>
      <p>Notification</p>
    </div>
  );
}
