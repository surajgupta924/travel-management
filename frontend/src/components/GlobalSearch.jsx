import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiSearch, FiMapPin, FiPackage } from 'react-icons/fi';
import { useDebounce } from '../hooks/useDebounce';
import API from '../services/api';

const GlobalSearch = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState(null);
  const [open, setOpen] = useState(false);
  const debounced = useDebounce(query, 350);
  const ref = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (debounced.length < 2) {
      setResults(null);
      return;
    }
    API.get(`/public/search?q=${encodeURIComponent(debounced)}`)
      .then((res) => setResults(res.data.data))
      .catch(() => setResults(null));
  }, [debounced]);

  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/packages?search=${encodeURIComponent(query)}`);
      setOpen(false);
      setQuery('');
    }
  };

  const hasResults = results && (results.packages?.length > 0 || results.destinations?.length > 0);

  return (
    <div className="global-search" ref={ref}>
      <form onSubmit={handleSubmit}>
        <FiSearch className="global-search-icon" />
        <input
          type="text"
          placeholder="Search destinations, packages..."
          value={query}
          onChange={(e) => { setQuery(e.target.value); setOpen(true); }}
          onFocus={() => setOpen(true)}
        />
      </form>
      {open && query.length >= 2 && (
        <div className="global-search-dropdown">
          {!results ? (
            <div className="search-loading">Searching...</div>
          ) : !hasResults ? (
            <div className="search-empty">No results for &ldquo;{query}&rdquo;</div>
          ) : (
            <>
              {results.packages?.length > 0 && (
                <div className="search-group">
                  <div className="search-group-label"><FiPackage /> Packages</div>
                  {results.packages.map((p) => (
                    <Link key={p._id} to={`/packages/${p._id}`} className="search-item" onClick={() => setOpen(false)}>
                      <span>{p.title}</span>
                      <span className="search-price">${p.price}</span>
                    </Link>
                  ))}
                </div>
              )}
              {results.destinations?.length > 0 && (
                <div className="search-group">
                  <div className="search-group-label"><FiMapPin /> Destinations</div>
                  {results.destinations.map((d) => (
                    <Link key={d._id} to={`/destinations/${d._id}`} className="search-item" onClick={() => setOpen(false)}>
                      <span>{d.name}</span>
                      <span className="search-meta">{d.city}, {d.country}</span>
                    </Link>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default GlobalSearch;
