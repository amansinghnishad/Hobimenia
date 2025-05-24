// filepath: e:\coding\website\Hobimenia\client\src\components\NotificationItem.jsx
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

const NotificationItem = ({ notification, onClick }) => {
  const navigate = useNavigate();

  const handleItemClick = () => {
    if (onClick) {
      onClick(notification); // This will call handleMarkAsRead in NotificationsList
    }
    // Navigate after marking as read (or attempting to)
    if (notification.type === "follow" && notification.sender?._id) {
      navigate(`/profile/${notification.sender._id}`);
    } else if (notification.post?._id) {
      if (notification.type === "new_comment" && notification.comment) {
        // Ensure comment ID is just the ID string, not an object
        const commentId =
          typeof notification.comment === "object"
            ? notification.comment._id
            : notification.comment;
        navigate(`/post/${notification.post._id}#comment-${commentId}`);
      } else {
        navigate(`/post/${notification.post._id}`);
      }
    }
    // Add other navigation logic here if needed for other types (e.g., profile for 'follow')
  };

  const renderNotificationMessage = () => {
    const senderUsername = notification.sender?.username || "Someone";
    let postLinkPath = notification.post?._id
      ? `/post/${notification.post._id}`
      : "#";

    if (
      notification.type === "new_comment" &&
      notification.comment &&
      notification.post?._id
    ) {
      const commentId =
        typeof notification.comment === "object"
          ? notification.comment._id
          : notification.comment;
      postLinkPath = `/post/${notification.post._id}#comment-${commentId}`;
    }

    switch (notification.type) {
      case "new_comment":
        return (
          <>
            <strong>{senderUsername}</strong> commented on your post:
            {notification.post ? (
              <Link to={postLinkPath}>
                {" "}
                "{notification.post.caption?.substring(0, 30)}..."
              </Link>
            ) : (
              "a post."
            )}
          </>
        );
      case "like":
        return (
          <>
            <strong>{senderUsername}</strong> liked your post:
            {notification.post ? (
              <Link to={postLinkPath}>
                {" "}
                "{notification.post.caption?.substring(0, 30)}..."
              </Link>
            ) : (
              "a post."
            )}
          </>
        );
      case "follow":
        return (
          <>
            {notification.sender?._id ? (
              <Link to={`/profile/${notification.sender._id}`}>
                <strong>{senderUsername}</strong>
              </Link>
            ) : (
              <strong>{senderUsername}</strong>
            )}{" "}
            started following you.
          </>
        );
      // Add cases for 'mention', 'new_message' later
      default:
        return notification.message || "You have a new notification.";
    }
  };

  return (
    <div
      className={`notification-item ${notification.isRead ? "read" : "unread"}`}
      onClick={handleItemClick} // Use the combined click handler
      role="button" // Add role for accessibility
      tabIndex={0} // Add tabIndex for accessibility
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") handleItemClick();
      }} // Keyboard accessibility
    >
      <p>{renderNotificationMessage()}</p>
      <span className="notification-timestamp">
        {new Date(notification.createdAt).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        })}{" "}
        - {new Date(notification.createdAt).toLocaleDateString()}
      </span>
    </div>
  );
};

NotificationItem.propTypes = {
  notification: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    sender: PropTypes.shape({
      username: PropTypes.string,
    }),
    type: PropTypes.string.isRequired,
    post: PropTypes.shape({
      _id: PropTypes.string,
      caption: PropTypes.string,
    }),
    comment: PropTypes.oneOfType([
      // comment can be string or object with _id
      PropTypes.string,
      PropTypes.shape({ _id: PropTypes.string }),
    ]),
    isRead: PropTypes.bool,
    message: PropTypes.string,
    createdAt: PropTypes.string.isRequired,
  }).isRequired,
  onClick: PropTypes.func.isRequired,
};

export default NotificationItem;
