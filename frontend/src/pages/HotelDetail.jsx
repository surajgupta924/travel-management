import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FiMapPin, FiCheck } from 'react-icons/fi';
import API from '../services/api';
import Loading from '../components/Loading';
import PageWrapper from '../components/PageWrapper';

const HotelDetail = () => {
  const { id } = useParams();
  const [hotel, setHotel] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    API.get(`/hotels/${id}`)
      .then((res) => setHotel(res.data.data))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <Loading />;
  if (!hotel) return <div className="container section"><p>Hotel not found.</p></div>;

  return (
    <PageWrapper>
      <div className="hotel-detail-hero">
        <img src={hotel.image || 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200'} alt={hotel.name} />
        <div className="hotel-detail-overlay">
          <div className="container">
            <span className="hotel-stars-large">{'★'.repeat(hotel.starRating)}</span>
            <h1>{hotel.name}</h1>
            <p><FiMapPin /> {hotel.address || `${hotel.destination?.city}, ${hotel.destination?.country}`}</p>
          </div>
        </div>
      </div>
      <div className="container section">
        <div className="detail-content hotel-detail-grid">
          <div>
            <h2>About This Hotel</h2>
            <p>{hotel.description}</p>
            <h3 style={{ marginTop: 24 }}>Amenities</h3>
            <div className="amenities-list">
              {hotel.amenities?.map((a) => (
                <span key={a} className="amenity-tag"><FiCheck /> {a}</span>
              ))}
            </div>
          </div>
          <div className="booking-sidebar">
            <div className="card booking-card">
              <div className="price">${hotel.pricePerNight}</div>
              <div className="per-person">per night</div>
              <p className="muted" style={{ margin: '12px 0' }}>{hotel.availableRooms} rooms available</p>
              <Link to="/contact" className="btn btn-primary btn-lg" style={{ width: '100%' }}>Book This Hotel</Link>
              <Link to="/packages" className="btn btn-outline" style={{ width: '100%', marginTop: 10 }}>View Tour Packages</Link>
            </div>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
};

export default HotelDetail;
