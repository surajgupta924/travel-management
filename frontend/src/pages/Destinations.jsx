import { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import API from '../services/api';
import DestinationCard from '../components/DestinationCard';
import Loading from '../components/Loading';
import EmptyState from '../components/EmptyState';
import FAQ from '../components/FAQ';
import Newsletter from '../components/Newsletter';

const destFaq = [
  { q: 'How do I choose the right destination?', a: 'Consider climate, budget, and travel style. Use our filters and read destination guides for each location.' },
  { q: 'When is the best time to travel?', a: 'Each destination page shows the best time to visit based on weather and peak seasons.' },
];

const Destinations = () => {
  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [country, setCountry] = useState('');

  useEffect(() => {
    setLoading(true);
    const params = new URLSearchParams();
    if (search) params.set('search', search);
    if (country) params.set('country', country);
    API.get(`/destinations?${params}`)
      .then((res) => setDestinations(res.data.data))
      .finally(() => setLoading(false));
  }, [search, country]);

  const countries = useMemo(() => [...new Set(destinations.map((d) => d.country))].sort(), [destinations]);

  return (
    <div className="page-wrap">
      <div className="page-hero page-hero-large">
        <div className="container">
          <span className="section-tag">World</span>
          <h1>Explore Destinations</h1>
          <p>Discover amazing places around the world — from tropical beaches to alpine peaks</p>
        </div>
      </div>

      <div className="container section">
        <div className="filters-panel">
          <div className="filters filters-expanded">
            <input className="form-control" placeholder="Search by name, city, or country..." value={search} onChange={(e) => setSearch(e.target.value)} />
            <select className="form-control" value={country} onChange={(e) => setCountry(e.target.value)}>
              <option value="">All Countries</option>
              {countries.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          <p className="results-info"><strong>{destinations.length}</strong> destinations available</p>
        </div>

        {loading ? <Loading /> : destinations.length === 0 ? (
          <EmptyState message="No destinations found" />
        ) : (
          <div className="grid-3">
            {destinations.map((dest) => <DestinationCard key={dest._id} dest={dest} />)}
          </div>
        )}
      </div>

      <section className="section section-alt">
        <div className="container">
          <div className="travel-tips">
            <h2>Travel Planning Tips</h2>
            <div className="grid-3">
              <div className="tip-card"><span>📅</span><h4>Book Early</h4><p>Secure better prices and availability by booking 2–3 months ahead for peak season.</p></div>
              <div className="tip-card"><span>🛂</span><h4>Check Visa Rules</h4><p>Verify passport validity and visa requirements before booking international trips.</p></div>
              <div className="tip-card"><span>💉</span><h4>Health & Safety</h4><p>Review vaccination recommendations and travel advisories for your destination.</p></div>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container"><FAQ items={destFaq} /></div>
      </section>

      <Newsletter />
    </div>
  );
};

export default Destinations;
