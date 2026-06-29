import { useState, useEffect } from 'react';
import API from '../services/api';
import PageWrapper from '../components/PageWrapper';
import Loading from '../components/Loading';
import EmptyState from '../components/EmptyState';

const Gallery = () => {
  const [items, setItems] = useState([]);
  const [category, setCategory] = useState('');
  const [loading, setLoading] = useState(true);
  const [lightbox, setLightbox] = useState(null);

  useEffect(() => {
    setLoading(true);
    const params = category ? `?category=${category}` : '';
    API.get(`/gallery${params}`)
      .then((res) => setItems(res.data.data))
      .finally(() => setLoading(false));
  }, [category]);

  const categories = ['destinations', 'culture', 'wildlife', 'hotels', 'adventure'];

  if (loading) return <Loading />;

  return (
    <PageWrapper>
      <div className="page-wrap">
        <div className="page-hero page-hero-large">
          <div className="container">
            <span className="section-tag">Gallery</span>
            <h1>Travel Gallery</h1>
            <p>Stunning moments captured from destinations around the world</p>
          </div>
        </div>
        <div className="container section">
          <div className="category-chips" style={{ marginBottom: 32 }}>
            <button type="button" className={`chip ${!category ? 'active' : ''}`} onClick={() => setCategory('')}>All</button>
            {categories.map((c) => (
              <button key={c} type="button" className={`chip ${category === c ? 'active' : ''}`} onClick={() => setCategory(c)}>{c}</button>
            ))}
          </div>
          {items.length === 0 ? (
            <EmptyState message="No gallery items yet" />
          ) : (
            <div className="gallery-grid">
              {items.map((g) => (
                <button key={g._id} type="button" className="gallery-item" onClick={() => setLightbox(g)}>
                  <img src={g.image} alt={g.title} loading="lazy" />
                  <div className="gallery-item-overlay">
                    <strong>{g.title}</strong>
                    {g.caption && <span>{g.caption}</span>}
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
        {lightbox && (
          <div className="modal-overlay" onClick={() => setLightbox(null)}>
            <div className="lightbox" onClick={(e) => e.stopPropagation()}>
              <img src={lightbox.image} alt={lightbox.title} />
              <div className="lightbox-caption">
                <h3>{lightbox.title}</h3>
                <p>{lightbox.caption}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </PageWrapper>
  );
};

export default Gallery;
