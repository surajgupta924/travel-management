import { Link } from 'react-router-dom';
import { FiClock, FiMapPin, FiStar } from 'react-icons/fi';

const PackageCard = ({ pkg }) => {
  const image = pkg.images?.[0] || pkg.destination?.image || 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800';

  return (
    <Link to={`/packages/${pkg._id}`} className="card package-card">
      <div className="card-image">
        <img src={image} alt={pkg.title} />
        {pkg.isFeatured && <span className="featured-badge">Featured</span>}
        <span className="price-tag">${pkg.price}</span>
      </div>
      <div className="card-body">
        <h3>{pkg.title}</h3>
        <div className="meta">
          <span><FiMapPin /> {pkg.destination?.city}, {pkg.destination?.country}</span>
          <span><FiClock /> {pkg.duration} days</span>
        </div>
        <div className="rating">
          <FiStar /> {pkg.rating || 'New'} {pkg.reviewCount > 0 && `(${pkg.reviewCount} reviews)`}
        </div>
      </div>
    </Link>
  );
};

export default PackageCard;
