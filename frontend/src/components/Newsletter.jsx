import { useState } from 'react';
import { Link } from 'react-router-dom';
import API from '../services/api';
import toast from 'react-hot-toast';
import { getErrorMessage } from '../utils/getErrorMessage';

const Newsletter = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email.trim()) return;
    setLoading(true);
    try {
      await API.post('/newsletter/subscribe', { email });
      toast.success('Subscribed! Check your inbox for travel deals.');
      setEmail('');
    } catch (err) {
      toast.error(getErrorMessage(err, 'Subscription failed'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="section newsletter-section">
      <div className="container">
        <div className="newsletter-box agency-newsletter">
          <div className="newsletter-text">
            <span className="section-tag">Newsletter</span>
            <h2>Get Exclusive Travel Deals</h2>
            <p>Subscribe for early access to new packages, seasonal offers, and travel tips from our experts.</p>
          </div>
          <form className="newsletter-form" onSubmit={handleSubmit}>
            <input type="email" placeholder="Enter your email" required value={email} onChange={(e) => setEmail(e.target.value)} />
            <button type="submit" className="btn btn-primary btn-lg" disabled={loading}>
              {loading ? 'Subscribing...' : 'Subscribe'}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
