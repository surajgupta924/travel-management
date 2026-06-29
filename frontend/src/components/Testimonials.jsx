import { useState, useEffect } from 'react';
import API from '../services/api';

const Testimonials = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    API.get('/testimonials?featured=true')
      .then((res) => setItems(res.data.data))
      .catch(() => {});
  }, []);

  if (items.length === 0) return null;

  return (
    <section className="section section-alt">
      <div className="container">
        <div className="section-header center">
          <span className="section-tag">Testimonials</span>
          <h2>What Our Travelers Say</h2>
          <p>Real stories from happy customers who traveled with TravelEase</p>
        </div>
        <div className="grid-2 testimonial-grid">
          {items.slice(0, 4).map((t) => (
            <div key={t._id} className="testimonial-card agency-testimonial">
              <div className="testimonial-stars">{'★'.repeat(t.rating)}</div>
              <p className="testimonial-text">&ldquo;{t.text}&rdquo;</p>
              <div className="testimonial-author">
                <div className="avatar-circle">{t.avatar || t.name?.split(' ').map((n) => n[0]).join('').slice(0, 2)}</div>
                <div>
                  <strong>{t.name}</strong>
                  <span>{t.role}{t.location ? ` · ${t.location}` : ''}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
