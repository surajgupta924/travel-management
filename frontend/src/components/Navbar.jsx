import { Link, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { FiGlobe, FiMenu, FiX, FiChevronDown } from 'react-icons/fi';
import { useAuth } from '../context/AuthContext';
import GlobalSearch from './GlobalSearch';
import ThemeToggle from './ThemeToggle';
import NotificationBell from './NotificationBell';
import UserMenu from './UserMenu';

const Navbar = () => {
  const { user } = useAuth();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const isActive = (path) => location.pathname === path ? 'active' : '';

  return (
    <nav className={`navbar navbar-pro agency-navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="container navbar-inner">
        <Link to="/" className="navbar-brand">
          <span className="brand-icon"><FiGlobe /></span>
          <span className="brand-text">Travel<span>Ease</span></span>
        </Link>

        <div className="navbar-search-desktop">
          <GlobalSearch />
        </div>

        <button className="mobile-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label="Menu">
          {menuOpen ? <FiX /> : <FiMenu />}
        </button>

        <ul className={`navbar-nav ${menuOpen ? 'open' : ''}`}>
          <li><Link to="/" className={`nav-link ${isActive('/')}`} onClick={() => setMenuOpen(false)}>Home</Link></li>
          <li className="nav-dropdown">
            <button type="button" className={`nav-link nav-dropdown-btn ${location.pathname.startsWith('/services') || location.pathname.startsWith('/packages') ? 'active' : ''}`} onClick={() => setServicesOpen(!servicesOpen)}>
              Tours <FiChevronDown />
            </button>
            {servicesOpen && (
              <div className="nav-dropdown-menu">
                <Link to="/packages" onClick={() => { setMenuOpen(false); setServicesOpen(false); }}>All Packages</Link>
                <Link to="/packages?tourType=domestic" onClick={() => { setMenuOpen(false); setServicesOpen(false); }}>Domestic Tours</Link>
                <Link to="/packages?tourType=international" onClick={() => { setMenuOpen(false); setServicesOpen(false); }}>International Tours</Link>
                <Link to="/services" onClick={() => { setMenuOpen(false); setServicesOpen(false); }}>All Services</Link>
              </div>
            )}
          </li>
          <li><Link to="/destinations" className={`nav-link ${isActive('/destinations')}`} onClick={() => setMenuOpen(false)}>Destinations</Link></li>
          <li><Link to="/hotels" className={`nav-link ${isActive('/hotels')}`} onClick={() => setMenuOpen(false)}>Hotels</Link></li>
          <li><Link to="/about" className={`nav-link ${isActive('/about')}`} onClick={() => setMenuOpen(false)}>About</Link></li>
          <li><Link to="/blog" className={`nav-link ${isActive('/blog')}`} onClick={() => setMenuOpen(false)}>Blog</Link></li>
          <li><Link to="/gallery" className={`nav-link ${isActive('/gallery')}`} onClick={() => setMenuOpen(false)}>Gallery</Link></li>
          <li><Link to="/contact" className={`nav-link ${isActive('/contact')}`} onClick={() => setMenuOpen(false)}>Contact</Link></li>
        </ul>

        <div className="navbar-actions">
          <ThemeToggle />
          {user && <NotificationBell />}
          {user ? (
            <UserMenu />
          ) : (
            <>
              <Link to="/login" className="btn btn-ghost btn-sm">Login</Link>
              <Link to="/register" className="btn btn-primary btn-sm">Sign Up</Link>
            </>
          )}
        </div>
      </div>
      <div className="navbar-search-mobile container">
        <GlobalSearch />
      </div>
    </nav>
  );
};

export default Navbar;
