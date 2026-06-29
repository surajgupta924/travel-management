import { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { FiGrid, FiList, FiSliders } from 'react-icons/fi';
import API from '../services/api';
import PackageCard from '../components/PackageCard';
import EmptyState from '../components/EmptyState';
import FAQ from '../components/FAQ';
import Newsletter from '../components/Newsletter';
import Pagination from '../components/Pagination';
import PageWrapper from '../components/PageWrapper';
import { GridSkeleton } from '../components/Skeleton';
import { getWishlist } from '../utils/wishlist';

const packageFaq = [
  { q: 'What is included in a tour package?', a: 'Each package lists inclusions and exclusions on its detail page — typically accommodation, guides, and some meals.' },
  { q: 'Can I customize a package?', a: 'Contact our team via the Contact page for custom itineraries and private group tours.' },
  { q: 'How far in advance should I book?', a: 'We recommend booking at least 4–6 weeks ahead for popular destinations and peak seasons.' },
];

const SORT_MAP = {
  featured: '',
  'price-low': 'price-asc',
  'price-high': 'price-desc',
  rating: 'rating',
  duration: 'duration',
};

const Packages = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [packages, setPackages] = useState([]);
  const [pagination, setPagination] = useState({ page: 1, pages: 1, total: 0 });
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState('grid');
  const [sort, setSort] = useState('featured');
  const [showWishlist, setShowWishlist] = useState(searchParams.get('wishlist') === 'true');
  const [page, setPage] = useState(1);
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
    if (SORT_MAP[sort]) params.set('sort', SORT_MAP[sort]);
    params.set('page', page);
    params.set('limit', '9');
    API.get(`/packages?${params}`)
      .then((res) => {
        setPackages(res.data.data);
        setPagination(res.data.pagination || { page: 1, pages: 1, total: res.data.data.length });
      })
      .finally(() => setLoading(false));
  }, [filters, sort, page]);

  const displayPackages = showWishlist
    ? packages.filter((p) => getWishlist().includes(p._id))
    : packages;

  const handleFilter = (key, value) => {
    setPage(1);
    const updated = { ...filters, [key]: value };
    setFilters(updated);
    const params = new URLSearchParams();
    Object.entries(updated).forEach(([k, v]) => { if (v) params.set(k, v); });
    setSearchParams(params);
  };

  const categories = ['adventure', 'cultural', 'beach', 'wildlife', 'luxury', 'budget'];

  return (
    <PageWrapper>
      <div className="page-wrap">
        <div className="page-hero page-hero-large">
          <div className="container">
            <span className="section-tag">Tours</span>
            <h1>Tour Packages</h1>
            <p>Find your perfect adventure from our curated collection of world-class travel experiences</p>
          </div>
        </div>

        <div className="container section">
          <div className="packages-toolbar">
            <div className="results-info">
              <strong>{showWishlist ? displayPackages.length : pagination.total}</strong> packages found
            </div>
            <div className="toolbar-actions">
              <select className="form-control" value={sort} onChange={(e) => { setSort(e.target.value); setPage(1); }}>
                <option value="featured">Sort: Featured</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
                <option value="duration">Shortest Duration</option>
              </select>
              <button type="button" className={`btn btn-outline btn-sm ${showWishlist ? 'active' : ''}`} onClick={() => setShowWishlist(!showWishlist)}>
                ❤️ Wishlist
              </button>
              <div className="view-toggle">
                <button type="button" className={view === 'grid' ? 'active' : ''} onClick={() => setView('grid')}><FiGrid /></button>
                <button type="button" className={view === 'list' ? 'active' : ''} onClick={() => setView('list')}><FiList /></button>
              </div>
            </div>
          </div>

          <div className="filters-panel">
            <div className="filters-panel-header"><FiSliders /> Filters</div>
            <div className="filters filters-expanded">
              <input className="form-control" placeholder="Search packages..." value={filters.search} onChange={(e) => handleFilter('search', e.target.value)} />
              <select className="form-control" value={filters.category} onChange={(e) => handleFilter('category', e.target.value)}>
                <option value="">All Categories</option>
                {categories.map((c) => <option key={c} value={c}>{c.charAt(0).toUpperCase() + c.slice(1)}</option>)}
              </select>
              <select className="form-control" value={filters.difficulty} onChange={(e) => handleFilter('difficulty', e.target.value)}>
                <option value="">All Difficulties</option>
                <option value="easy">Easy</option>
                <option value="moderate">Moderate</option>
                <option value="challenging">Challenging</option>
              </select>
              <input className="form-control" type="number" placeholder="Min Price ($)" value={filters.minPrice} onChange={(e) => handleFilter('minPrice', e.target.value)} />
              <input className="form-control" type="number" placeholder="Max Price ($)" value={filters.maxPrice} onChange={(e) => handleFilter('maxPrice', e.target.value)} />
            </div>
            <div className="category-chips">
              {categories.map((c) => (
                <button
                  key={c}
                  type="button"
                  className={`chip ${filters.category === c ? 'active' : ''}`}
                  onClick={() => handleFilter('category', filters.category === c ? '' : c)}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          {loading ? <GridSkeleton count={6} /> : displayPackages.length === 0 ? (
            <EmptyState message={showWishlist ? 'Your wishlist is empty. Heart packages to save them!' : 'No packages found matching your criteria'}>
              <Link to="/packages" className="btn btn-primary" style={{ marginTop: 16 }}>Clear Filters</Link>
            </EmptyState>
          ) : view === 'grid' ? (
            <div className="grid-3">
              {displayPackages.map((pkg) => <PackageCard key={pkg._id} pkg={pkg} />)}
            </div>
          ) : (
            <div className="package-list">
              {displayPackages.map((pkg) => <PackageCard key={pkg._id} pkg={pkg} listView />)}
            </div>
          )}

          {!showWishlist && (
            <Pagination page={pagination.page} pages={pagination.pages} onPageChange={setPage} />
          )}
        </div>

        <section className="section section-alt">
          <div className="container">
            <div className="info-banner">
              <h3>Why Book With TravelEase?</h3>
              <div className="info-banner-grid">
                <div><strong>✓ Expert Guides</strong><p>Local professionals on every tour</p></div>
                <div><strong>✓ Flexible Dates</strong><p>Multiple departure options</p></div>
                <div><strong>✓ Best Value</strong><p>Competitive pricing guaranteed</p></div>
                <div><strong>✓ 24/7 Support</strong><p>Help before, during & after trip</p></div>
              </div>
            </div>
          </div>
        </section>

        <section className="section">
          <div className="container"><FAQ items={packageFaq} title="Package Booking FAQ" /></div>
        </section>

        <Newsletter />
      </div>
    </PageWrapper>
  );
};

export default Packages;
