import { FiPhone, FiMail, FiClock } from 'react-icons/fi';

const TopBar = () => (
  <div className="top-bar">
    <div className="container top-bar-inner">
      <div className="top-bar-left">
        <span><FiPhone /> +1 (800) 555-0199</span>
        <span><FiMail /> support@travelease.com</span>
        <span className="top-bar-hide-mobile"><FiClock /> Mon–Sat: 9AM – 8PM</span>
      </div>
      <div className="top-bar-right">
        <span>Trusted Travel Experts Since 2010</span>
        <span className="top-bar-badge">24/7 Support</span>
      </div>
    </div>
  </div>
);

export default TopBar;
