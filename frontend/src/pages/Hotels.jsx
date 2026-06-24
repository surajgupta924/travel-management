import { useState, useEffect } from 'react';
import API from '../services/api';
import HotelCard from '../components/HotelCard';
import Loading from '../components/Loading';
import EmptyState from '../components/EmptyState';

const Hotels = () => {
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [starRating, setStarRating] = useState('');

  useEffect(() => {
    setLoading(true);
    API.get(`/hotels${starRating ? `?starRating=${starRating}` : ''}`)
      .then((res) => setHotels(res.data.data))
      .finally(() => setLoading(false));
  }, [starRating]);

  return (
    <div className="section">
      <div className="container">
        <div className="section-header">
          <h2>Hotels</h2>
          <p>Find the perfect place to stay</p>
        </div>
        <div className="filters">
          <select className="form-control" value={starRating} onChange={(e) => setStarRating(e.target.value)}>
            <option value="">All Ratings</option>
            <option value="5">5 Stars</option>
            <option value="4">4+ Stars</option>
            <option value="3">3+ Stars</option>
          </select>
        </div>
        {loading ? <Loading /> : hotels.length === 0 ? (
          <EmptyState message="No hotels found" />
        ) : (
          <div className="grid-3">
            {hotels.map((hotel) => <HotelCard key={hotel._id} hotel={hotel} />)}
          </div>
        )}
      </div>
    </div>
  );
};

export default Hotels;
