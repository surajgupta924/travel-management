import { Link } from 'react-router-dom';
import { FiPhone } from 'react-icons/fi';

const CallbackBanner = () => (
  <section className="callback-banner">
    <div className="container callback-banner-inner">
      <div>
        <h2>Plan Your Travel with a Personal Tour Manager</h2>
        <p>Unable to decide where to go? Contact our travel experts for customized destinations, hotels, transportation, and unforgettable experiences.</p>
      </div>
      <div className="callback-actions">
        <a href="tel:+18005550199" className="btn btn-white btn-lg"><FiPhone /> Call Now</a>
        <Link to="/contact" className="btn btn-outline-white btn-lg">Get Free Quote</Link>
      </div>
    </div>
  </section>
);

export default CallbackBanner;
