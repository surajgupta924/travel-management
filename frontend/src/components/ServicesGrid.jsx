import { Link } from 'react-router-dom';
import { FiGlobe, FiMap, FiHeart, FiBriefcase, FiCreditCard, FiFileText } from 'react-icons/fi';

const services = [
  { icon: FiMap, title: 'Domestic Tours', desc: 'Explore curated domestic destinations with expert guides and comfortable stays.', link: '/packages?tourType=domestic', color: 'orange' },
  { icon: FiGlobe, title: 'International Tours', desc: 'World-class international packages to Europe, Asia, Middle East, and beyond.', link: '/packages?tourType=international', color: 'blue' },
  { icon: FiFileText, title: 'Visa Assistance', desc: 'Complete visa documentation guidance and appointment support for hassle-free travel.', link: '/services#visa', color: 'teal' },
  { icon: FiHeart, title: 'Honeymoon Packages', desc: 'Romantic getaways tailored for couples with luxury stays and private experiences.', link: '/packages?category=honeymoon', color: 'pink' },
  { icon: FiBriefcase, title: 'Corporate Travel', desc: 'MICE tours, group bookings, and corporate travel management for businesses.', link: '/services#corporate', color: 'purple' },
  { icon: FiCreditCard, title: 'Flight & Hotel Booking', desc: 'Standalone flight tickets, hotel reservations, and airport transfers available.', link: '/hotels', color: 'green' },
];

const ServicesGrid = () => (
  <section className="section">
    <div className="container">
      <div className="section-header center">
        <span className="section-tag">Our Services</span>
        <h2>Everything You Need for a Perfect Trip</h2>
        <p>From planning to departure, we handle every detail of your travel experience</p>
      </div>
      <div className="services-grid">
        {services.map((s) => (
          <Link key={s.title} to={s.link} className={`service-card service-${s.color}`}>
            <div className="service-icon"><s.icon /></div>
            <h3>{s.title}</h3>
            <p>{s.desc}</p>
            <span className="service-link">Learn More →</span>
          </Link>
        ))}
      </div>
    </div>
  </section>
);

export default ServicesGrid;
