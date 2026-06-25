import { Link } from 'react-router-dom';

const DestinationCard = ({ dest }) => (
  <Link to={`/destinations/${dest._id}`} className="card dest-card">
    <div className="card-image">
      <img
        src={dest.image || 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800'}
        alt={dest.name}
        loading="lazy"
      />
      <div className="dest-overlay">
        <h3>{dest.name}</h3>
        <p>{dest.city}, {dest.country}</p>
      </div>
    </div>
  </Link>
);

export default DestinationCard;
