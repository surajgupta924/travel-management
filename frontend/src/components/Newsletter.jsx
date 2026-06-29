import { useState } from 'react';
import { FiMail } from 'react-icons/fi';
import toast from 'react-hot-toast';

const Newsletter = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) return;
    const subs = JSON.parse(localStorage.getItem('newsletter') || '[]');
    if (!subs.includes(email)) {
      localStorage.setItem('newsletter', JSON.stringify([...subs, email]));
    }
    toast.success('Subscribed! You will receive travel deals and tips.');
    setEmail('');
  };

  return (
    <section className="newsletter-section">
      <div className="container">
        <div className="newsletter-box">
          <div className="newsletter-content">
            <FiMail className="newsletter-icon" />
            <div>
              <h2>Get Exclusive Travel Deals</h2>
              <p>Subscribe to our newsletter for weekly offers, destination guides, and travel inspiration.</p>
            </div>
          </div>
          <form className="newsletter-form" onSubmit={handleSubmit}>
            <input
              type="email"
              className="form-control"
              placeholder="Enter your email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button type="submit" className="btn btn-primary btn-lg">Subscribe</button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
