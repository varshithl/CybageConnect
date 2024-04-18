
import { useEffect, useState } from "react";
import { fetchNotifications, acceptRequest, declineRequest, NotificationProp } from "../Services/NotificationSevice";
import './Notification.css';

interface Props {
  username: string;
}

export function Notification({ username }: Props) {
  const [hasNotification, setHasNotification] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState<NotificationProp[]>([]);

  useEffect(() => {
    async function checkNotification() {
      const data = await fetchNotifications(username);
      if (data.length !== 0) setHasNotification(true);
      else{
        setHasNotification(false);
        setShowNotifications(false);
      } 
      setNotifications(data);
    }
    checkNotification();
  }, [username]);

  async function handleAccept(senderId: number) {
    await acceptRequest(username, senderId);
    setNotifications(prev => prev.filter(notification => notification.senderId !== senderId));
    if (notifications.length === 0) setHasNotification(false);
  }

  async function handleDecline(senderId: number) {
    const success = await declineRequest(username, senderId);
    if (success) alert("Request declined successfully");
    setNotifications(prev => prev.filter(notification => notification.senderId !== senderId));
    if (notifications.length === 0) setHasNotification(false);
  }

  return (
    <>
      <div className="notification-icon">
        <svg
          onClick={() => setShowNotifications(true)}
          id="point"
          xmlns="http://www.w3.org/2000/svg"
          width="30"
          height="30"
          fill="currentColor"
          className="bi bi-bell-fill"
          viewBox="0 0 16 16"
        >
          <path d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2m.995-14.901a1 1 0 1 0-1.99 0A5 5 0 0 0 3 6c0 1.098-.5 6-2 7h14c-1.5-1-2-5.902-2-7 0-2.42-1.72-4.44-4.005-4.901" />
        </svg>

        {hasNotification &&  <div className="notification-badge" />}
      </div>

      {showNotifications && (
        <div className="notification-container">
          <div className="notification-header">
            <h6>Notifications</h6>
            <svg
              onClick={() => {setShowNotifications(false);if(notifications.length==0)setHasNotification(false);}}
              xmlns="http://www.w3.org/2000/svg"
              width="15"
              height="15"
              fill="currentColor"
              className="bi bi-x notification-close-icon"
              viewBox="0 0 16 16"
            >
              <path
                fillRule="evenodd"
                d="M8 7.293 4.354 3.646a.5.5 0 0 1 .708-.708L8 6.586l3.646-3.648a.5.5 0 1 1 .708.708L8.707 7l3.647 3.646a.5.5 0 0 1-.708.708L8 7.707l-3.646 3.647a.5.5 0 0 1-.708-.708L7.293 8 3.646 4.354a.5.5 0 0 1 .708-.708L8 7.293z"
              />
            </svg>
          </div>
          {notifications.map((message) => (
            <div key={message.ReqId} className="notification-item">
              <p className="notification-message">{message.rqstMessage}</p>
              <button className="notification-action-button" onClick={() => handleAccept(message.senderId)}>
                Accept
              </button>
              <button onClick={() => handleDecline(message.senderId)}>Decline</button>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
