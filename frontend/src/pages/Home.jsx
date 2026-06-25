import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiSearch, FiArrowRight } from 'react-icons/fi';
import API from '../services/api';
import PackageCard from '../components/PackageCard';
import DestinationCard from '../components/DestinationCard';
import Loading from '../components/Loading';

const Home = () => {
  const [featured, setFeatured] = useState([]);
  const [destinations, setDestinations] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    Promise.all([
      API.get('/packages?featured=true'),
      API.get('/destinations?popular=true'),
    ])
      .then(([pkgRes, destRes]) => {
        setFeatured(pkgRes.data.data);
        setDestinations(destRes.data.data);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/packages?search=${search}`);
  };

  if (loading) return <Loading message="Discovering amazing destinations..." />;

  return (
    <>
      <section className="hero">
        <div className="container">
          <div className="hero-badge">✈️ #1 Travel Management Platform</div>
          <h1>Explore the World with <span>TravelEase</span></h1>
          <p>Discover breathtaking destinations, curated tour packages, and luxury hotels for your perfect getaway.</p>
          <form className="hero-search" onSubmit={handleSearch}>
            <input
              type="text"
              placeholder="Where do you want to go?"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <button type="submit" className="btn btn-primary btn-lg">
              <FiSearch /> Search
            </button>
          </form>
          <div className="hero-stats">
            <div><strong>50+</strong><span>Destinations</span></div>
            <div><strong>100+</strong><span>Tour Packages</span></div>
            <div><strong>10k+</strong><span>Happy Travelers</span></div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">Featured</span>
            <h2>Top Tour Packages</h2>
            <p>Hand-picked adventures for unforgettable experiences</p>
          </div>
          {featured.length > 0 ? (
            <div className="grid-3">
              {featured.map((pkg) => <PackageCard key={pkg._id} pkg={pkg} />)}
            </div>
          ) : (
            <p style={{ textAlign: 'center', color: 'var(--gray-500)' }}>No packages yet. Run <code>npm run seed</code> to add demo data.</p>
          )}
          <div style={{ textAlign: 'center', marginTop: 40 }}>
            <Link to="/packages" className="btn btn-outline btn-lg">
              View All Packages <FiArrowRight />
            </Link>
          </div>
        </div>
      </section>

      <section className="section" style={{ background: 'var(--white)' }}>
        <div className="container">
          <div className="section-header">
            <span className="section-tag">Explore</span>
            <h2>Popular Destinations</h2>
            <p>The most sought-after travel spots around the globe</p>
          </div>
          <div className="grid-4">
            {destinations.map((dest) => <DestinationCard key={dest._id} dest={dest} />)}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="grid-3">
            <div className="feature-card">
              <div className="feature-icon">🌍</div>
              <h3>50+ Destinations</h3>
              <p>Explore diverse locations across every continent</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">✈️</div>
              <h3>Expert Guides</h3>
              <p>Professional local guides for every adventure</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🏨</div>
              <h3>Luxury Hotels</h3>
              <p>Premium accommodations at the best prices</p>
            </div>
          </div>
        </div>
      </section>

      <div className="container">
        <div className="cta-section">
          <h2>Ready for Your Next Adventure?</h2>
          <p>Join thousands of travelers and book your dream vacation today.</p>
          <Link to="/register" className="btn btn-lg">Get Started Free</Link>
        </div>
      </div>
    </>
  );
};

export default Home;
