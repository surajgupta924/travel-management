import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiSearch, FiArrowRight, FiGrid, FiList } from 'react-icons/fi';
import API from '../services/api';
import PackageCard from '../components/PackageCard';
import DestinationCard from '../components/DestinationCard';
import HotelCard from '../components/HotelCard';
import HowItWorks from '../components/HowItWorks';
import Testimonials from '../components/Testimonials';
import Newsletter from '../components/Newsletter';
import FAQ from '../components/FAQ';
import Loading from '../components/Loading';
import PageWrapper from '../components/PageWrapper';

const categories = [
  { label: 'Adventure', value: 'adventure', icon: '🏔️' },
  { label: 'Cultural', value: 'cultural', icon: '🏛️' },
  { label: 'Beach', value: 'beach', icon: '🏖️' },
  { label: 'Luxury', value: 'luxury', icon: '✨' },
  { label: 'Wildlife', value: 'wildlife', icon: '🦁' },
  { label: 'Budget', value: 'budget', icon: '💰' },
];

const homeFaq = [
  { q: 'How do I book a tour package?', a: 'Browse packages, select your travel date and number of travelers, then click Book Now. You need a free account to complete booking.' },
  { q: 'Can I cancel my booking?', a: 'Yes. Go to My Bookings and cancel pending or confirmed bookings. Refund policy depends on payment status and timing.' },
  { q: 'Are flights included?', a: 'Most packages exclude international flights unless listed in inclusions. Check each package detail page.' },
  { q: 'Do you offer group discounts?', a: 'Yes! Contact us through the Contact page for group bookings of 10 or more travelers.' },
];

const Home = () => {
  const [featured, setFeatured] = useState([]);
  const [destinations, setDestinations] = useState([]);
  const [hotels, setHotels] = useState([]);
  const [allPackages, setAllPackages] = useState([]);
  const [publicStats, setPublicStats] = useState(null);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    Promise.all([
      API.get('/packages?featured=true'),
      API.get('/destinations?popular=true'),
      API.get('/hotels'),
      API.get('/packages?limit=6'),
      API.get('/public/stats'),
    ])
      .then(([pkgRes, destRes, hotelRes, allRes, statsRes]) => {
        setFeatured(pkgRes.data.data);
        setDestinations(destRes.data.data);
        setHotels(hotelRes.data.data.slice(0, 3));
        setAllPackages(allRes.data.data.slice(0, 6));
        setPublicStats(statsRes.data.data);
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
    <PageWrapper>
    <>
      <section className="hero hero-large">
        <div className="container">
          <div className="hero-badge">✈️ #1 Travel Management Platform</div>
          <h1>Explore the World with <span>TravelEase</span></h1>
          <p>Discover breathtaking destinations, curated tour packages, and luxury hotels for your perfect getaway. Plan, book, and travel with confidence.</p>
          <form className="hero-search hero-search-large" onSubmit={handleSearch}>
            <input type="text" placeholder="Where do you want to go?" value={search} onChange={(e) => setSearch(e.target.value)} />
            <button type="submit" className="btn btn-primary btn-lg"><FiSearch /> Search Trips</button>
          </form>
          <div className="hero-stats">
            <div><strong>{publicStats?.destinations || '50'}+</strong><span>Destinations</span></div>
            <div><strong>{publicStats?.packages || '100'}+</strong><span>Tour Packages</span></div>
            <div><strong>{publicStats?.travelers ? `${(publicStats.travelers / 1000).toFixed(0)}k+` : '10k+'}</strong><span>Happy Travelers</span></div>
            <div><strong>{publicStats?.avgRating || '4.8'}★</strong><span>Average Rating</span></div>
          </div>
        </div>
      </section>

      <section className="section-sm">
        <div className="container">
          <div className="category-pills">
            {categories.map((cat) => (
              <Link key={cat.value} to={`/packages?category=${cat.value}`} className="category-pill">
                <span>{cat.icon}</span> {cat.label}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <HowItWorks />

      <section className="section section-alt">
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
            <p className="text-center muted">No packages yet. Run npm run seed to add demo data.</p>
          )}
          <div className="section-cta">
            <Link to="/packages" className="btn btn-outline btn-lg">View All Packages <FiArrowRight /></Link>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">Explore</span>
            <h2>Popular Destinations</h2>
            <p>The most sought-after travel spots around the globe</p>
          </div>
          <div className="grid-4">
            {destinations.map((dest) => <DestinationCard key={dest._id} dest={dest} />)}
          </div>
          <div className="section-cta">
            <Link to="/destinations" className="btn btn-outline btn-lg">Explore All Destinations</Link>
          </div>
        </div>
      </section>

      <section className="section section-alt">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">Stays</span>
            <h2>Luxury Hotels & Resorts</h2>
            <p>Handpicked accommodations for every budget and style</p>
          </div>
          <div className="grid-3">
            {hotels.map((hotel) => <HotelCard key={hotel._id} hotel={hotel} />)}
          </div>
          <div className="section-cta">
            <Link to="/hotels" className="btn btn-outline btn-lg">Browse All Hotels</Link>
          </div>
        </div>
      </section>

      {allPackages.length > 0 && (
        <section className="section">
          <div className="container">
            <div className="section-header">
              <span className="section-tag">New Arrivals</span>
              <h2>Latest Tour Packages</h2>
              <p>Fresh adventures added to our collection</p>
            </div>
            <div className="grid-3">
              {allPackages.map((pkg) => <PackageCard key={pkg._id} pkg={pkg} />)}
            </div>
          </div>
        </section>
      )}

      <section className="section section-alt">
        <div className="container">
          <div className="trust-grid">
            <div className="trust-item"><span>🔒</span><div><strong>Secure Booking</strong><p>SSL encrypted payments</p></div></div>
            <div className="trust-item"><span>💬</span><div><strong>24/7 Support</strong><p>Always here to help</p></div></div>
            <div className="trust-item"><span>🏆</span><div><strong>Best Price</strong><p>Price match guarantee</p></div></div>
            <div className="trust-item"><span>✅</span><div><strong>Verified Tours</strong><p>Expert-curated packages</p></div></div>
          </div>
        </div>
      </section>

      <Testimonials />

      <section className="section">
        <div className="container">
          <FAQ items={homeFaq} />
        </div>
      </section>

      <Newsletter />

      <div className="container">
        <div className="cta-section cta-large">
          <h2>Ready for Your Next Adventure?</h2>
          <p>Join thousands of travelers and book your dream vacation today. Create a free account in seconds.</p>
          <div className="cta-buttons">
            <Link to="/register" className="btn btn-lg">Get Started Free</Link>
            <Link to="/packages" className="btn btn-outline btn-lg" style={{ background: 'rgba(255,255,255,0.15)', borderColor: 'white', color: 'white' }}>Browse Packages</Link>
          </div>
        </div>
      </div>
    </>
    </PageWrapper>
  );
};

export default Home;
