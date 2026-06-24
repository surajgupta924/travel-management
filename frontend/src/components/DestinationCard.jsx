import { Link } from 'react-router-dom';

const DestinationCard = ({ dest }) => (
  <Link to={`/destinations/${dest._id}`} className="card dest-card">
    <div className="card-image">
      <img src={dest.image || 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800'} alt={dest.name} />
    </div>
    <div className="card-body">
      <h3>{dest.name}</h3>
      <p style={{ color: 'var(--gray-500)', fontSize: 14 }}>{dest.city}, {dest.country}</p>
      <p style={{ fontSize: 14, marginTop: 8, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
        {dest.description}
      </p>
    </div>
  </Link>
);

export default DestinationCard;
