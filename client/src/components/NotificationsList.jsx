import React, { useState, useEffect, useContext } from "react";
import {
  getNotifications,
  markNotificationAsRead,
  markAllNotificationsAsRead,
} from "../services/api";
import NotificationItem from "./NotificationItem";
import { AuthContext } from "../contexts/AuthContext";
import "../css/componentCSS/NotificationsList.css";

const NotificationsList = () => {
  const [notifications, setNotifications] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const { user } = useContext(AuthContext);

  const fetchNotifications = async () => {
    if (!user) return;
    setIsLoading(true);
    setError(null);
    try {
      const fetchedNotifications = await getNotifications();
      setNotifications(fetchedNotifications);
    } catch (err) {
      console.error("Error fetching notifications:", err);
      setError(err.message || "Failed to fetch notifications.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchNotifications();
    // Optional: Set up polling or WebSocket for real-time updates
    // const intervalId = setInterval(fetchNotifications, 30000); // Poll every 30 seconds
    // return () => clearInterval(intervalId);
  }, [user]); // Refetch when user changes

  const handleMarkAsRead = async (notificationId) => {
    try {
      await markNotificationAsRead(notificationId);
      setNotifications((prevNotifications) =>
        prevNotifications.map((n) =>
          n._id === notificationId ? { ...n, isRead: true } : n
        )
      );
      // Optionally, update a global unread count if you have one
    } catch (err) {
      console.error("Error marking notification as read:", err);
    }
  };

  const handleMarkAllAsRead = async () => {
    try {
      await markAllNotificationsAsRead();
      setNotifications((prevNotifications) =>
        prevNotifications.map((n) => ({ ...n, isRead: true }))
      );
      // Optionally, update a global unread count
    } catch (err) {
      console.error("Error marking all notifications as read:", err);
    }
  };

  // This function will be passed to NotificationItem to handle click
  const onNotificationClick = async (notification) => {
    if (!notification.isRead) {
      await handleMarkAsRead(notification._id);
    }
    // Navigation logic will be handled by Link within NotificationItem
  };

  if (!user) {
    return (
      <div className="notifications-list-container">
        <p>Please log in to see your notifications.</p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="notifications-list-container">
        <p>Loading notifications...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="notifications-list-container">
        <p>Error: {error}</p>
      </div>
    );
  }

  return (
    <div className="notifications-list-container">
      <div className="notifications-list-header">
        <h2>Notifications</h2>
        {notifications.length > 0 && (
          <button onClick={handleMarkAllAsRead} className="mark-all-read-btn">
            Mark All as Read
          </button>
        )}
      </div>
      {notifications.length === 0 ? (
        <p className="no-notifications-message">
          You have no new notifications.
        </p>
      ) : (
        <div className="notifications-scrollable-list">
          {notifications.map((notification) => (
            <NotificationItem
              key={notification._id}
              notification={notification}
              onClick={() => onNotificationClick(notification)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default NotificationsList;
