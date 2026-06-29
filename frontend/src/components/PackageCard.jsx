import { Link } from 'react-router-dom';
import { FiClock, FiMapPin, FiStar, FiUsers } from 'react-icons/fi';
import WishlistButton from './WishlistButton';

const PackageCard = ({ pkg, listView = false }) => {
  const image = pkg.images?.[0] || pkg.destination?.image || 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800';

  if (listView) {
    return (
      <Link to={`/packages/${pkg._id}`} className="card package-list-card">
        <div className="package-list-image">
          <img src={image} alt={pkg.title} loading="lazy" />
          <WishlistButton packageId={pkg._id} />
        </div>
        <div className="package-list-body">
          <div className="package-list-top">
            <h3>{pkg.title}</h3>
            <span className="price-tag-inline">${pkg.price}</span>
          </div>
          <p className="package-list-desc">{pkg.description}</p>
          <div className="meta">
            <span><FiMapPin /> {pkg.destination?.city}, {pkg.destination?.country}</span>
            <span><FiClock /> {pkg.duration} days</span>
            <span><FiUsers /> Max {pkg.maxGroupSize}</span>
            <span className="rating"><FiStar fill="currentColor" /> {pkg.rating || 'New'}</span>
          </div>
          <div className="package-list-tags">
            <span className="badge tag-category">{pkg.category}</span>
            <span className="badge tag-difficulty">{pkg.difficulty}</span>
            {pkg.isFeatured && <span className="badge tag-featured">Featured</span>}
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link to={`/packages/${pkg._id}`} className="card package-card">
      <div className="card-image">
        <img src={image} alt={pkg.title} loading="lazy" />
        <WishlistButton packageId={pkg._id} />
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
          <FiStar fill="currentColor" /> {pkg.rating || 'New'}
          {pkg.reviewCount > 0 && <span style={{ color: 'var(--gray-500)', fontWeight: 500 }}>({pkg.reviewCount})</span>}
        </div>
      </div>
    </Link>
  );
};

export default PackageCard;
