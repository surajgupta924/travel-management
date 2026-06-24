import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';
import { FiGlobe, FiMenu, FiX } from 'react-icons/fi';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout, isStaff } = useAuth();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const isActive = (path) => location.pathname === path ? 'active' : '';

  return (
    <nav className="navbar">
      <div className="container">
        <Link to="/" className="navbar-brand">
          <FiGlobe />
          TravelEase
        </Link>

        <button className="mobile-toggle" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <FiX /> : <FiMenu />}
        </button>

        <ul className={`navbar-nav ${menuOpen ? 'open' : ''}`}>
          <li><Link to="/" className={`nav-link ${isActive('/')}`} onClick={() => setMenuOpen(false)}>Home</Link></li>
          <li><Link to="/packages" className={`nav-link ${isActive('/packages')}`} onClick={() => setMenuOpen(false)}>Packages</Link></li>
          <li><Link to="/destinations" className={`nav-link ${isActive('/destinations')}`} onClick={() => setMenuOpen(false)}>Destinations</Link></li>
          <li><Link to="/hotels" className={`nav-link ${isActive('/hotels')}`} onClick={() => setMenuOpen(false)}>Hotels</Link></li>
          <li><Link to="/contact" className={`nav-link ${isActive('/contact')}`} onClick={() => setMenuOpen(false)}>Contact</Link></li>
        </ul>

        <div className="navbar-actions">
          {user ? (
            <>
              {isStaff && (
                <Link to="/dashboard" className="btn btn-outline btn-sm">Dashboard</Link>
              )}
              <Link to="/bookings" className="btn btn-outline btn-sm">My Bookings</Link>
              <Link to="/profile" className="btn btn-primary btn-sm">{user.name.split(' ')[0]}</Link>
              <button className="btn btn-sm" onClick={logout} style={{ color: 'var(--gray-500)' }}>Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" className="btn btn-outline btn-sm">Login</Link>
              <Link to="/register" className="btn btn-primary btn-sm">Sign Up</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
