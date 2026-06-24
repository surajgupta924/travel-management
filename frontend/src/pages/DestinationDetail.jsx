import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import API from '../services/api';
import PackageCard from '../components/PackageCard';
import Loading from '../components/Loading';

const DestinationDetail = () => {
  const { id } = useParams();
  const [destination, setDestination] = useState(null);
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      API.get(`/destinations/${id}`),
      API.get(`/packages?destination=${id}`),
    ]).then(([destRes, pkgRes]) => {
      setDestination(destRes.data.data);
      setPackages(pkgRes.data.data);
    }).finally(() => setLoading(false));
  }, [id]);

  if (loading) return <Loading />;
  if (!destination) return <div className="empty-state">Destination not found</div>;

  return (
    <>
      <div className="detail-hero">
        <img src={destination.image} alt={destination.name} />
        <div className="overlay">
          <div className="container">
            <h1>{destination.name}</h1>
            <p>{destination.city}, {destination.country}</p>
          </div>
        </div>
      </div>
      <div className="container section">
        <p style={{ fontSize: 16, lineHeight: 1.8, marginBottom: 24 }}>{destination.description}</p>
        <div className="grid-3" style={{ marginBottom: 32 }}>
          <div className="card card-body">
            <h4>Best Time to Visit</h4>
            <p style={{ color: 'var(--gray-500)' }}>{destination.bestTimeToVisit || 'Year round'}</p>
          </div>
          <div className="card card-body">
            <h4>Climate</h4>
            <p style={{ color: 'var(--gray-500)' }}>{destination.climate || 'Varies'}</p>
          </div>
          <div className="card card-body">
            <h4>Highlights</h4>
            <p style={{ color: 'var(--gray-500)' }}>{destination.highlights?.join(', ') || 'N/A'}</p>
          </div>
        </div>

        {packages.length > 0 && (
          <>
            <h2 style={{ marginBottom: 24 }}>Available Packages</h2>
            <div className="grid-3">
              {packages.map((pkg) => <PackageCard key={pkg._id} pkg={pkg} />)}
            </div>
          </>
        )}
        <div style={{ marginTop: 32 }}>
          <Link to="/destinations" className="btn btn-outline">← Back to Destinations</Link>
        </div>
      </div>
    </>
  );
};

export default DestinationDetail;
