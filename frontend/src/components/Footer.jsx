import { Link } from 'react-router-dom';
import { FiGlobe, FiMail, FiPhone, FiMapPin, FiInstagram, FiTwitter, FiFacebook } from 'react-icons/fi';

const Footer = () => (
  <footer className="footer footer-large agency-footer">
    <div className="container">
      <div className="footer-top-cta">
        <div>
          <h3>Plan Your Dream Trip Today</h3>
          <p>Speak with our travel experts for a free customized itinerary.</p>
        </div>
        <div className="footer-cta-btns">
          <a href="tel:+18005550199" className="btn btn-primary btn-lg"><FiPhone /> Call Us</a>
          <Link to="/contact" className="btn btn-outline-white btn-lg">Get Free Quote</Link>
        </div>
      </div>
      <div className="footer-grid">
        <div>
          <h3><FiGlobe style={{ display: 'inline', marginRight: 8 }} />TravelEase</h3>
          <p>Your trusted partner for domestic & international tours, visa assistance, hotel bookings, and corporate travel since 2010.</p>
          <div className="social-links">
            <a href="https://facebook.com" target="_blank" rel="noreferrer" aria-label="Facebook"><FiFacebook /></a>
            <a href="https://twitter.com" target="_blank" rel="noreferrer" aria-label="Twitter"><FiTwitter /></a>
            <a href="https://instagram.com" target="_blank" rel="noreferrer" aria-label="Instagram"><FiInstagram /></a>
          </div>
        </div>
        <div>
          <h4>Quick Links</h4>
          <ul>
            <li><Link to="/about">About Us</Link></li>
            <li><Link to="/services">Our Services</Link></li>
            <li><Link to="/packages">Tour Packages</Link></li>
            <li><Link to="/faq">FAQ</Link></li>
            <li><Link to="/blog">Travel Blog</Link></li>
            <li><Link to="/gallery">Gallery</Link></li>
          </ul>
        </div>
        <div>
          <h4>Tour Types</h4>
          <ul>
            <li><Link to="/packages?tourType=domestic">Domestic Tours</Link></li>
            <li><Link to="/packages?tourType=international">International Tours</Link></li>
            <li><Link to="/packages?category=honeymoon">Honeymoon</Link></li>
            <li><Link to="/packages?category=luxury">Luxury Tours</Link></li>
            <li><Link to="/services#visa">Visa Assistance</Link></li>
            <li><Link to="/services#corporate">Corporate Travel</Link></li>
          </ul>
        </div>
        <div>
          <h4>Contact Us</h4>
          <ul>
            <li><FiMapPin style={{ display: 'inline', marginRight: 8 }} />123 Travel Avenue, New York, NY</li>
            <li><FiPhone style={{ display: 'inline', marginRight: 8 }} />+1 (800) 555-0199</li>
            <li><FiMail style={{ display: 'inline', marginRight: 8 }} />support@travelease.com</li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} TravelEase. All rights reserved.</p>
        <div className="footer-bottom-links">
          <Link to="/faq">FAQ</Link>
          <Link to="/contact">Contact</Link>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
