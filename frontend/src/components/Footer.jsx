import { Link } from 'react-router-dom';
import { FiGlobe, FiMail, FiPhone, FiMapPin, FiInstagram, FiTwitter, FiFacebook } from 'react-icons/fi';

const Footer = () => (
  <footer className="footer footer-large">
    <div className="container">
      <div className="footer-top-cta">
        <div>
          <h3>Start Your Journey Today</h3>
          <p>Join 10,000+ travelers who trust TravelEase for their adventures.</p>
        </div>
        <Link to="/register" className="btn btn-primary btn-lg">Create Free Account</Link>
      </div>
      <div className="footer-grid">
        <div>
          <h3><FiGlobe style={{ display: 'inline', marginRight: 8 }} />TravelEase</h3>
          <p>Your trusted partner for unforgettable travel experiences. Discover the world with our curated tour packages, luxury hotels, and expert guidance.</p>
          <div className="social-links">
            <a href="#" aria-label="Facebook"><FiFacebook /></a>
            <a href="#" aria-label="Twitter"><FiTwitter /></a>
            <a href="#" aria-label="Instagram"><FiInstagram /></a>
          </div>
        </div>
        <div>
          <h4>Explore</h4>
          <ul>
            <li><Link to="/packages">Tour Packages</Link></li>
            <li><Link to="/destinations">Destinations</Link></li>
            <li><Link to="/hotels">Hotels</Link></li>
            <li><Link to="/contact">Contact Us</Link></li>
          </ul>
        </div>
        <div>
          <h4>Categories</h4>
          <ul>
            <li><Link to="/packages?category=adventure">Adventure</Link></li>
            <li><Link to="/packages?category=cultural">Cultural</Link></li>
            <li><Link to="/packages?category=beach">Beach</Link></li>
            <li><Link to="/packages?category=luxury">Luxury</Link></li>
          </ul>
        </div>
        <div>
          <h4>Contact</h4>
          <ul>
            <li><FiMapPin style={{ display: 'inline', marginRight: 8 }} />123 Travel Street, NY 10001</li>
            <li><FiPhone style={{ display: 'inline', marginRight: 8 }} />+1 (555) 123-4567</li>
            <li><FiMail style={{ display: 'inline', marginRight: 8 }} />info@travelease.com</li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} TravelEase. All rights reserved.</p>
      </div>
    </div>
  </footer>
);

export default Footer;
