import { useState } from 'react';
import { FiMail, FiPhone, FiMapPin, FiClock, FiMessageCircle } from 'react-icons/fi';
import toast from 'react-hot-toast';
import API from '../services/api';
import { getErrorMessage } from '../utils/getErrorMessage';
import FAQ from '../components/FAQ';

const contactFaq = [
  { q: 'What are your support hours?', a: 'Our team is available Monday–Saturday, 9 AM – 8 PM EST. Emergency support is 24/7 for active bookings.' },
  { q: 'How quickly will I get a response?', a: 'We respond to inquiries within 24 hours on business days. Urgent booking matters are prioritized.' },
  { q: 'Can I request a custom itinerary?', a: 'Absolutely! Use the contact form and select "Custom Tour" as your subject for personalized planning.' },
  { q: 'Do you handle corporate travel?', a: 'Yes, we offer corporate and group travel solutions. Contact us for tailored packages.' },
];

const Contact = () => {
  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: '', message: '' });
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await API.post('/inquiries', form);
      toast.success('Your inquiry has been submitted! We will respond within 24 hours.');
      setForm({ name: '', email: '', phone: '', subject: '', message: '' });
    } catch (err) {
      toast.error(getErrorMessage(err, 'Submission failed'));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="page-wrap">
      <div className="page-hero page-hero-large">
        <div className="container">
          <span className="section-tag">Support</span>
          <h1>Contact Us</h1>
          <p>Have questions? Our travel experts are here to help you plan the perfect trip</p>
        </div>
      </div>

      <div className="container section">
        <div className="contact-grid">
          <div className="contact-info-cards">
            <div className="contact-info-card">
              <FiMapPin className="contact-icon" />
              <h4>Visit Us</h4>
              <p>123 Travel Street<br />New York, NY 10001<br />United States</p>
            </div>
            <div className="contact-info-card">
              <FiPhone className="contact-icon" />
              <h4>Call Us</h4>
              <p>+1 (555) 123-4567<br />Toll-free: 1-800-TRAVEL</p>
            </div>
            <div className="contact-info-card">
              <FiMail className="contact-icon" />
              <h4>Email Us</h4>
              <p>info@travelease.com<br />support@travelease.com</p>
            </div>
            <div className="contact-info-card">
              <FiClock className="contact-icon" />
              <h4>Office Hours</h4>
              <p>Mon – Sat: 9 AM – 8 PM<br />Sun: 10 AM – 4 PM EST</p>
            </div>
          </div>

          <div className="card card-body contact-form-card">
            <h2><FiMessageCircle /> Send a Message</h2>
            <p className="muted" style={{ marginBottom: 24 }}>Fill out the form and we&apos;ll get back to you within 24 hours.</p>
            <form onSubmit={handleSubmit}>
              <div className="form-row">
                <div className="form-group">
                  <label>Full Name</label>
                  <input className="form-control" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
                </div>
                <div className="form-group">
                  <label>Email</label>
                  <input type="email" className="form-control" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Phone</label>
                  <input className="form-control" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
                </div>
                <div className="form-group">
                  <label>Subject</label>
                  <select className="form-control" required value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })}>
                    <option value="">Select a topic</option>
                    <option value="General Inquiry">General Inquiry</option>
                    <option value="Booking Help">Booking Help</option>
                    <option value="Custom Tour">Custom Tour</option>
                    <option value="Group Travel">Group Travel</option>
                    <option value="Cancellation">Cancellation</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>
              <div className="form-group">
                <label>Message</label>
                <textarea className="form-control" rows={6} required value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} placeholder="Tell us about your travel plans..." />
              </div>
              <button type="submit" className="btn btn-primary btn-lg" disabled={submitting}>
                {submitting ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          </div>
        </div>
      </div>

      <section className="section section-alt">
        <div className="container">
          <div className="map-placeholder">
            <div className="map-overlay">
              <h3>📍 Find Us on the Map</h3>
              <p>123 Travel Street, New York, NY 10001</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container"><FAQ items={contactFaq} /></div>
      </section>
    </div>
  );
};

export default Contact;
