import { FiStar } from 'react-icons/fi';

const HotelCard = ({ hotel }) => (
  <div className="card">
    <div className="card-image" style={{ height: 180 }}>
      <img src={hotel.image || 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800'} alt={hotel.name} />
    </div>
    <div className="card-body">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
        <h3 style={{ fontSize: 16 }}>{hotel.name}</h3>
        <span style={{ color: 'var(--warning)', display: 'flex', alignItems: 'center', gap: 2, fontSize: 14 }}>
          {Array.from({ length: hotel.starRating }).map((_, i) => <FiStar key={i} fill="currentColor" />)}
        </span>
      </div>
      <p style={{ color: 'var(--gray-500)', fontSize: 13, margin: '4px 0' }}>
        {hotel.destination?.city}, {hotel.destination?.country}
      </p>
      <p style={{ fontSize: 13, margin: '8px 0', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
        {hotel.description}
      </p>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 12 }}>
        <span style={{ fontWeight: 700, color: 'var(--primary)', fontSize: 18 }}>${hotel.pricePerNight}<span style={{ fontSize: 13, fontWeight: 400, color: 'var(--gray-500)' }}>/night</span></span>
        <span style={{ fontSize: 13, color: 'var(--gray-500)' }}>{hotel.availableRooms} rooms left</span>
      </div>
    </div>
  </div>
);

export default HotelCard;
