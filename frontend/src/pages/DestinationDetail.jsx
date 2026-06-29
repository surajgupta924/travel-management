import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FiMapPin, FiSun, FiCalendar } from 'react-icons/fi';
import API from '../services/api';
import PackageCard from '../components/PackageCard';
import HotelCard from '../components/HotelCard';
import Loading from '../components/Loading';

const DestinationDetail = () => {
  const { id } = useParams();
  const [destination, setDestination] = useState(null);
  const [packages, setPackages] = useState([]);
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      API.get(`/destinations/${id}`),
      API.get(`/packages?destination=${id}`),
      API.get(`/hotels?destination=${id}`),
    ]).then(([destRes, pkgRes, hotelRes]) => {
      setDestination(destRes.data.data);
      setPackages(pkgRes.data.data);
      setHotels(hotelRes.data.data);
    }).finally(() => setLoading(false));
  }, [id]);

  if (loading) return <Loading message="Loading destination..." />;
  if (!destination) return <div className="empty-state">Destination not found</div>;

  return (
    <>
      <div className="detail-hero detail-hero-large">
        <img src={destination.image} alt={destination.name} />
        <div className="overlay">
          <div className="container">
            <h1>{destination.name}</h1>
            <p><FiMapPin style={{ display: 'inline' }} /> {destination.city}, {destination.country}</p>
          </div>
        </div>
      </div>

      <div className="container section">
        <div className="detail-intro">
          <p className="lead-text">{destination.description}</p>
        </div>

        <div className="grid-3 content-block">
          <div className="info-card-lg">
            <FiCalendar className="info-card-icon" />
            <h4>Best Time to Visit</h4>
            <p>{destination.bestTimeToVisit || 'Year round — great destination any season'}</p>
          </div>
          <div className="info-card-lg">
            <FiSun className="info-card-icon" />
            <h4>Climate</h4>
            <p>{destination.climate || 'Varies by season — check local forecasts before travel'}</p>
          </div>
          <div className="info-card-lg">
            <span className="info-card-icon">⭐</span>
            <h4>Top Highlights</h4>
            <div className="highlight-tags">
              {destination.highlights?.map((h) => <span key={h} className="chip active">{h}</span>) || <p>Explore local culture and scenery</p>}
            </div>
          </div>
        </div>

        <div className="content-block travel-guide">
          <h2>Travel Guide: {destination.name}</h2>
          <div className="grid-2">
            <div className="card card-body">
              <h4>Getting There</h4>
              <p className="muted">Fly into the nearest international airport in {destination.city}. Local transfers and tour pickups are available with most packages.</p>
            </div>
            <div className="card card-body">
              <h4>Local Culture</h4>
              <p className="muted">Immerse yourself in the unique traditions, cuisine, and hospitality of {destination.country}. Respect local customs and dress codes at religious sites.</p>
            </div>
            <div className="card card-body">
              <h4>Must-Try Experiences</h4>
              <p className="muted">Explore iconic landmarks, sample regional cuisine, and join guided tours for the best insider experiences in {destination.city}.</p>
            </div>
            <div className="card card-body">
              <h4>Travel Tips</h4>
              <p className="muted">Carry local currency, stay hydrated, book popular attractions in advance, and keep copies of important documents.</p>
            </div>
          </div>
        </div>

        {packages.length > 0 && (
          <div className="content-block">
            <div className="section-header" style={{ textAlign: 'left' }}>
              <span className="section-tag">Tours</span>
              <h2>Available Packages in {destination.name}</h2>
              <p>{packages.length} tour packages available</p>
            </div>
            <div className="grid-3">
              {packages.map((pkg) => <PackageCard key={pkg._id} pkg={pkg} />)}
            </div>
          </div>
        )}

        {hotels.length > 0 && (
          <div className="content-block">
            <div className="section-header" style={{ textAlign: 'left' }}>
              <span className="section-tag">Stays</span>
              <h2>Hotels in {destination.city}</h2>
            </div>
            <div className="grid-3">
              {hotels.map((h) => <HotelCard key={h._id} hotel={h} />)}
            </div>
          </div>
        )}

        <div className="section-cta">
          <Link to="/destinations" className="btn btn-outline btn-lg">← Back to All Destinations</Link>
          <Link to="/packages" className="btn btn-primary btn-lg">Browse All Packages</Link>
        </div>
      </div>
    </>
  );
};

export default DestinationDetail;
