import { Link } from 'react-router-dom';
import { FiGlobe } from 'react-icons/fi';

const AuthLayout = ({ title, subtitle, children, footer }) => (
  <div className="auth-page">
    <div className="auth-visual">
      <div className="auth-visual-content">
        <div className="auth-visual-badge"><FiGlobe /> TravelEase</div>
        <h1>Your Journey<br />Starts Here</h1>
        <p>Discover world-class destinations, curated packages, and seamless booking — all in one place.</p>
        <div className="auth-visual-stats">
          <div><strong>50+</strong><span>Destinations</span></div>
          <div><strong>100+</strong><span>Packages</span></div>
          <div><strong>10k+</strong><span>Happy Travelers</span></div>
        </div>
      </div>
    </div>
    <div className="auth-form-side">
      <div className="auth-card">
        <div className="auth-card-header">
          <Link to="/" className="auth-home-link">← Back to Home</Link>
          <h2>{title}</h2>
          <p className="subtitle">{subtitle}</p>
        </div>
        {children}
        {footer}
      </div>
    </div>
  </div>
);

export default AuthLayout;
