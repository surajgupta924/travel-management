import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import API from '../services/api';
import PackageCard from '../components/PackageCard';
import Loading from '../components/Loading';
import EmptyState from '../components/EmptyState';

const Packages = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    search: searchParams.get('search') || '',
    category: searchParams.get('category') || '',
    difficulty: '',
    minPrice: '',
    maxPrice: '',
  });

  useEffect(() => {
    setLoading(true);
    const params = new URLSearchParams();
    Object.entries(filters).forEach(([key, val]) => { if (val) params.set(key, val); });

    API.get(`/packages?${params}`)
      .then((res) => setPackages(res.data.data))
      .finally(() => setLoading(false));
  }, [filters]);

  const handleFilter = (key, value) => {
    const updated = { ...filters, [key]: value };
    setFilters(updated);
    const params = new URLSearchParams();
    Object.entries(updated).forEach(([k, v]) => { if (v) params.set(k, v); });
    setSearchParams(params);
  };

  return (
    <div className="section" style={{ paddingTop: 0 }}>
      <div className="page-hero">
        <div className="container">
          <span className="section-tag">Tours</span>
          <h1>Tour Packages</h1>
          <p>Find your perfect adventure from our curated collection</p>
        </div>
      </div>
      <div className="container section">

        <div className="filters">
          <input
            className="form-control"
            placeholder="Search packages..."
            value={filters.search}
            onChange={(e) => handleFilter('search', e.target.value)}
          />
          <select className="form-control" value={filters.category} onChange={(e) => handleFilter('category', e.target.value)}>
            <option value="">All Categories</option>
            <option value="adventure">Adventure</option>
            <option value="cultural">Cultural</option>
            <option value="beach">Beach</option>
            <option value="wildlife">Wildlife</option>
            <option value="luxury">Luxury</option>
            <option value="budget">Budget</option>
          </select>
          <select className="form-control" value={filters.difficulty} onChange={(e) => handleFilter('difficulty', e.target.value)}>
            <option value="">All Difficulties</option>
            <option value="easy">Easy</option>
            <option value="moderate">Moderate</option>
            <option value="challenging">Challenging</option>
          </select>
          <input className="form-control" type="number" placeholder="Min Price" value={filters.minPrice} onChange={(e) => handleFilter('minPrice', e.target.value)} />
          <input className="form-control" type="number" placeholder="Max Price" value={filters.maxPrice} onChange={(e) => handleFilter('maxPrice', e.target.value)} />
        </div>

        {loading ? <Loading /> : packages.length === 0 ? (
          <EmptyState message="No packages found matching your criteria" />
        ) : (
          <div className="grid-3">
            {packages.map((pkg) => <PackageCard key={pkg._id} pkg={pkg} />)}
          </div>
        )}
      </div>
    </div>
  );
};

export default Packages;
