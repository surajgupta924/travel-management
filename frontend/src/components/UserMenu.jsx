import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiUser, FiBook, FiHeart, FiLogOut, FiSettings } from 'react-icons/fi';
import { useAuth } from '../context/AuthContext';

const UserMenu = () => {
  const { user, logout, isStaff } = useAuth();
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  if (!user) return null;

  const initials = user.name?.split(' ').map((n) => n[0]).join('').toUpperCase().slice(0, 2);

  return (
    <div className="user-menu" ref={ref}>
      <button type="button" className="user-menu-trigger" onClick={() => setOpen(!open)}>
        <span className="user-avatar-sm">{initials}</span>
        <span className="user-name-sm">{user.name.split(' ')[0]}</span>
      </button>
      {open && (
        <div className="user-dropdown">
          <div className="user-dropdown-header">
            <span className="user-avatar-sm lg">{initials}</span>
            <div>
              <strong>{user.name}</strong>
              <span>{user.email}</span>
            </div>
          </div>
          <Link to="/profile" className="dropdown-item" onClick={() => setOpen(false)}><FiSettings /> Profile</Link>
          <Link to="/bookings" className="dropdown-item" onClick={() => setOpen(false)}><FiBook /> My Bookings</Link>
          <Link to="/wishlist" className="dropdown-item" onClick={() => setOpen(false)}><FiHeart /> Wishlist</Link>
          {isStaff && <Link to="/dashboard" className="dropdown-item" onClick={() => setOpen(false)}><FiUser /> Dashboard</Link>}
          <button type="button" className="dropdown-item danger" onClick={() => { logout(); navigate('/'); setOpen(false); }}>
            <FiLogOut /> Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default UserMenu;
