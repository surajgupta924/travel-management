import { useState, useEffect } from 'react';
import API from '../services/api';
import DestinationCard from '../components/DestinationCard';
import Loading from '../components/Loading';
import EmptyState from '../components/EmptyState';

const Destinations = () => {
  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    setLoading(true);
    API.get(`/destinations${search ? `?search=${search}` : ''}`)
      .then((res) => setDestinations(res.data.data))
      .finally(() => setLoading(false));
  }, [search]);

  return (
    <div className="section">
      <div className="container">
        <div className="section-header">
          <h2>Destinations</h2>
          <p>Discover amazing places around the world</p>
        </div>
        <div className="filters">
          <input
            className="form-control"
            placeholder="Search destinations..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ maxWidth: 400 }}
          />
        </div>
        {loading ? <Loading /> : destinations.length === 0 ? (
          <EmptyState message="No destinations found" />
        ) : (
          <div className="grid-3">
            {destinations.map((dest) => <DestinationCard key={dest._id} dest={dest} />)}
          </div>
        )}
      </div>
    </div>
  );
};

export default Destinations;
