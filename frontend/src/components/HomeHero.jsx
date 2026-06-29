import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiSearch, FiMapPin, FiHome, FiPackage } from 'react-icons/fi';

const tabs = [
  { id: 'tours', label: 'Tour Packages', icon: FiPackage, placeholder: 'Search tour packages...', path: '/packages' },
  { id: 'hotels', label: 'Hotels', icon: FiHome, placeholder: 'Search hotels...', path: '/hotels' },
  { id: 'destinations', label: 'Destinations', icon: FiMapPin, placeholder: 'Where do you want to go?', path: '/destinations' },
];

const HomeHero = ({ stats }) => {
  const [activeTab, setActiveTab] = useState('tours');
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const current = tabs.find((t) => t.id === activeTab);

  const handleSearch = (e) => {
    e.preventDefault();
    const params = query.trim() ? `?search=${encodeURIComponent(query)}` : '';
    navigate(`${current.path}${params}`);
  };

  return (
    <section className="agency-hero">
      <div className="agency-hero-bg" />
      <div className="container agency-hero-content">
        <div className="agency-hero-text">
          <span className="agency-hero-tag">Your Journey Begins Here</span>
          <h1>Plan Your Dream Vacation with <span>TravelEase</span></h1>
          <p>Customized domestic & international tours, visa assistance, hotel bookings, and 24/7 travel support — all in one place.</p>
          <div className="agency-hero-stats">
            <div><strong>{stats?.packages || '100'}+</strong><span>Packages</span></div>
            <div><strong>{stats?.destinations || '50'}+</strong><span>Destinations</span></div>
            <div><strong>{stats?.travelers ? `${Math.floor(stats.travelers / 1000)}k+` : '15k+'}</strong><span>Travelers</span></div>
            <div><strong>{stats?.avgRating || '4.8'}★</strong><span>Rating</span></div>
          </div>
        </div>

        <div className="agency-search-card">
          <div className="agency-search-tabs">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                type="button"
                className={activeTab === tab.id ? 'active' : ''}
                onClick={() => setActiveTab(tab.id)}
              >
                <tab.icon /> {tab.label}
              </button>
            ))}
          </div>
          <form className="agency-search-form" onSubmit={handleSearch}>
            <current.icon className="agency-search-icon" />
            <input
              type="text"
              placeholder={current.placeholder}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <button type="submit" className="btn btn-primary btn-lg"><FiSearch /> Search</button>
          </form>
          <p className="agency-search-note">Need help? <a href="tel:+18005550199">Call our travel expert</a> for a free consultation.</p>
        </div>
      </div>
    </section>
  );
};

export default HomeHero;
