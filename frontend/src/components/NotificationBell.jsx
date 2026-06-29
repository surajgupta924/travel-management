import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { FiBell } from 'react-icons/fi';
import { useAuth } from '../context/AuthContext';
import API from '../services/api';

const NotificationBell = () => {
  const { user } = useAuth();
  const [notifications, setNotifications] = useState([]);
  const [unread, setUnread] = useState(0);
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  const fetchNotifications = () => {
    API.get('/notifications?limit=8')
      .then((res) => {
        setNotifications(res.data.data);
        setUnread(res.data.unreadCount || 0);
      })
      .catch(() => {});
  };

  useEffect(() => {
    if (user) fetchNotifications();
  }, [user]);

  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  if (!user) return null;

  const markRead = async (id) => {
    await API.put(`/notifications/${id}/read`);
    fetchNotifications();
  };

  const markAllRead = async () => {
    await API.put('/notifications/read-all');
    fetchNotifications();
  };

  return (
    <div className="notification-bell" ref={ref}>
      <button type="button" className="icon-btn" onClick={() => { setOpen(!open); if (!open) fetchNotifications(); }}>
        <FiBell />
        {unread > 0 && <span className="notification-badge">{unread > 9 ? '9+' : unread}</span>}
      </button>
      {open && (
        <div className="notification-dropdown">
          <div className="notification-header">
            <strong>Notifications</strong>
            {unread > 0 && <button type="button" onClick={markAllRead}>Mark all read</button>}
          </div>
          <div className="notification-list">
            {notifications.length === 0 ? (
              <p className="notification-empty">No notifications</p>
            ) : notifications.map((n) => (
              <div key={n._id} className={`notification-item ${!n.isRead ? 'unread' : ''}`} onClick={() => !n.isRead && markRead(n._id)}>
                <strong>{n.title}</strong>
                <p>{n.message}</p>
                {n.link && <Link to={n.link} onClick={() => setOpen(false)}>View →</Link>}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationBell;
