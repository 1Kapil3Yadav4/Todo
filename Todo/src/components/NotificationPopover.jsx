// src/components/NotificationPopover.jsx
import React, { useEffect, useState } from 'react';
import './NotificationPopover.css';

const NotificationPopover = () => {
  const [notifications, setNotifications] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        // Initialize Suprsend
        const suprsend = new window.Suprsend({
            workspaceKey: import.meta.env.VITE_SUPRSEND_WORKSPACE_KEY,
            apiKey: import.meta.env.VITE_SUPRSEND_API_KEY,
        });

        const response = await suprsend.getNotifications();
        setNotifications(response.data.notifications);
      } catch (error) {
        console.error('Error fetching notifications:', error);
      }
    };

    fetchNotifications();
  }, []);

  const togglePopover = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <button onClick={togglePopover}>Notification</button>
      {isOpen && (
        <div className="popover">
          {notifications.length > 0 ? (
            <ul>
              {notifications.map((notification) => (
                <li key={notification.id}>{notification.message}</li>
              ))}
            </ul>
          ) : (
            <p>No notifications</p>
          )}
        </div>
      )}
    </div>
  );
};

export default NotificationPopover;
