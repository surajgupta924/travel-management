import { useState, useEffect, useMemo } from 'react';
import API from '../services/api';
import HotelCard from '../components/HotelCard';
import Loading from '../components/Loading';
import EmptyState from '../components/EmptyState';
import FAQ from '../components/FAQ';
import Newsletter from '../components/Newsletter';

const hotelFaq = [
  { q: 'Are hotels included in tour packages?', a: 'Many packages include hotel stays. Check the package detail page for included accommodation.' },
  { q: 'Can I book a hotel separately?', a: 'Yes, browse our hotel listings and contact us for standalone hotel bookings.' },
];

const Hotels = () => {
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [starRating, setStarRating] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [search, setSearch] = useState('');

  useEffect(() => {
    setLoading(true);
    const params = new URLSearchParams();
    if (starRating) params.set('starRating', starRating);
    if (maxPrice) params.set('maxPrice', maxPrice);
    API.get(`/hotels?${params}`)
      .then((res) => setHotels(res.data.data))
      .finally(() => setLoading(false));
  }, [starRating, maxPrice]);

  const filtered = useMemo(() => {
    if (!search) return hotels;
    const q = search.toLowerCase();
    return hotels.filter((h) =>
      h.name.toLowerCase().includes(q) ||
      h.destination?.city?.toLowerCase().includes(q) ||
      h.destination?.country?.toLowerCase().includes(q)
    );
  }, [hotels, search]);

  return (
    <div className="page-wrap">
      <div className="page-hero page-hero-large">
        <div className="container">
          <span className="section-tag">Stays</span>
          <h1>Hotels & Resorts</h1>
          <p>Find the perfect place to stay — from boutique hotels to luxury resorts worldwide</p>
        </div>
      </div>

      <div className="container section">
        <div className="filters-panel">
          <div className="filters filters-expanded">
            <input className="form-control" placeholder="Search hotels..." value={search} onChange={(e) => setSearch(e.target.value)} />
            <select className="form-control" value={starRating} onChange={(e) => setStarRating(e.target.value)}>
              <option value="">All Ratings</option>
              <option value="5">5 Stars</option>
              <option value="4">4+ Stars</option>
              <option value="3">3+ Stars</option>
            </select>
            <input className="form-control" type="number" placeholder="Max Price/Night ($)" value={maxPrice} onChange={(e) => setMaxPrice(e.target.value)} />
          </div>
          <p className="results-info"><strong>{filtered.length}</strong> hotels available</p>
        </div>

        {loading ? <Loading /> : filtered.length === 0 ? (
          <EmptyState message="No hotels found" />
        ) : (
          <div className="grid-3">
            {filtered.map((hotel) => <HotelCard key={hotel._id} hotel={hotel} />)}
          </div>
        )}
      </div>

      <section className="section section-alt">
        <div className="container">
          <div className="amenities-showcase">
            <h2>Popular Amenities</h2>
            <div className="amenity-chips">
              {['WiFi', 'Pool', 'Spa', 'Restaurant', 'Gym', 'Parking', 'Beach Access', 'Room Service', 'Airport Shuttle', 'Pet Friendly'].map((a) => (
                <span key={a} className="chip">{a}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container"><FAQ items={hotelFaq} title="Hotel FAQ" /></div>
      </section>

      <Newsletter />
    </div>
  );
};

export default Hotels;
