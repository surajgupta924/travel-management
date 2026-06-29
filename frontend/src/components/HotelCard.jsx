import { FiStar, FiMapPin } from 'react-icons/fi';

const HotelCard = ({ hotel }) => (
  <div className="card hotel-card">
    <div className="card-image hotel-card-image">
      <img src={hotel.image || 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800'} alt={hotel.name} loading="lazy" />
      <span className="hotel-stars-badge">{'★'.repeat(hotel.starRating)}</span>
    </div>
    <div className="card-body">
      <h3>{hotel.name}</h3>
      <p className="hotel-location"><FiMapPin /> {hotel.destination?.city}, {hotel.destination?.country}</p>
      <p className="hotel-desc">{hotel.description}</p>
      {hotel.amenities?.length > 0 && (
        <div className="amenity-preview">
          {hotel.amenities.slice(0, 4).map((a) => <span key={a} className="chip sm">{a}</span>)}
        </div>
      )}
      <div className="hotel-card-footer">
        <div>
          <span className="hotel-price">${hotel.pricePerNight}</span>
          <span className="hotel-price-unit">/night</span>
        </div>
        <span className="rooms-left">{hotel.availableRooms} rooms available</span>
      </div>
    </div>
  </div>
);

export default HotelCard;
