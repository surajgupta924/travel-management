import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiHeart, FiTrash2 } from 'react-icons/fi';
import API from '../services/api';
import { getWishlist, toggleWishlist } from '../utils/wishlist';
import PackageCard from '../components/PackageCard';
import PageWrapper from '../components/PageWrapper';
import { GridSkeleton } from '../components/Skeleton';
import EmptyState from '../components/EmptyState';

const Wishlist = () => {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [ids, setIds] = useState(getWishlist());

  const load = () => {
    const wishlistIds = getWishlist();
    setIds(wishlistIds);
    if (wishlistIds.length === 0) {
      setPackages([]);
      setLoading(false);
      return;
    }
    API.get('/packages?limit=50')
      .then((res) => {
        const all = res.data.data || [];
        setPackages(all.filter((p) => wishlistIds.includes(p._id)));
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => { load(); }, []);

  const remove = (id) => {
    toggleWishlist(id);
    load();
  };

  const clearAll = () => {
    localStorage.setItem('travel_wishlist', '[]');
    setPackages([]);
    setIds([]);
  };

  return (
    <PageWrapper>
      <div className="page-wrap">
        <div className="page-hero page-hero-large">
          <div className="container">
            <span className="section-tag"><FiHeart /> Saved</span>
            <h1>My Wishlist</h1>
            <p>Your favorite packages saved for later — {ids.length} item(s)</p>
          </div>
        </div>
        <div className="container section">
          {ids.length > 0 && (
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 24 }}>
              <button type="button" className="btn btn-outline btn-sm" onClick={clearAll}><FiTrash2 /> Clear All</button>
            </div>
          )}
          {loading ? <GridSkeleton count={3} /> : packages.length === 0 ? (
            <EmptyState message="Your wishlist is empty. Heart packages to save them!">
              <Link to="/packages" className="btn btn-primary" style={{ marginTop: 16 }}>Browse Packages</Link>
            </EmptyState>
          ) : (
            <div className="grid-3">
              {packages.map((pkg) => (
                <div key={pkg._id} className="wishlist-item-wrap">
                  <PackageCard pkg={pkg} />
                  <button type="button" className="btn btn-danger btn-sm wishlist-remove" onClick={() => remove(pkg._id)}>Remove</button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </PageWrapper>
  );
};

export default Wishlist;
