import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiSearch } from 'react-icons/fi';
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
    ]).then(([pkgRes, destRes]) => {
      setFeatured(pkgRes.data.data);
      setDestinations(destRes.data.data);
    }).finally(() => setLoading(false));
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/packages?search=${search}`);
  };

  if (loading) return <Loading />;

  return (
    <>
      <section className="hero">
        <div className="container">
          <h1>Explore the World with TravelEase</h1>
          <p>Discover breathtaking destinations, curated tour packages, and luxury hotels for your perfect getaway.</p>
          <form className="hero-search" onSubmit={handleSearch}>
            <input
              type="text"
              placeholder="Search destinations, packages..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <button type="submit" className="btn btn-primary"><FiSearch /> Search</button>
          </form>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-header">
            <h2>Featured Packages</h2>
            <p>Hand-picked tours for unforgettable experiences</p>
          </div>
          <div className="grid-3">
            {featured.map((pkg) => <PackageCard key={pkg._id} pkg={pkg} />)}
          </div>
          <div style={{ textAlign: 'center', marginTop: 32 }}>
            <Link to="/packages" className="btn btn-outline btn-lg">View All Packages</Link>
          </div>
        </div>
      </section>

      <section className="section" style={{ background: 'var(--white)' }}>
        <div className="container">
          <div className="section-header">
            <h2>Popular Destinations</h2>
            <p>Explore the most sought-after travel spots</p>
          </div>
          <div className="grid-4">
            {destinations.map((dest) => <DestinationCard key={dest._id} dest={dest} />)}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="grid-3" style={{ textAlign: 'center' }}>
            <div className="card card-body">
              <div style={{ fontSize: 40, marginBottom: 12 }}>🌍</div>
              <h3>50+ Destinations</h3>
              <p style={{ color: 'var(--gray-500)', fontSize: 14 }}>Explore diverse locations across the globe</p>
            </div>
            <div className="card card-body">
              <div style={{ fontSize: 40, marginBottom: 12 }}>✈️</div>
              <h3>Expert Guides</h3>
              <p style={{ color: 'var(--gray-500)', fontSize: 14 }}>Professional guides for every adventure</p>
            </div>
            <div className="card card-body">
              <div style={{ fontSize: 40, marginBottom: 12 }}>🏨</div>
              <h3>Luxury Hotels</h3>
              <p style={{ color: 'var(--gray-500)', fontSize: 14 }}>Premium accommodations at best prices</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
