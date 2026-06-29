import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiGlobe, FiMap, FiFileText, FiHeart, FiBriefcase, FiCreditCard } from 'react-icons/fi';
import toast from 'react-hot-toast';
import API from '../services/api';
import { getErrorMessage } from '../utils/getErrorMessage';
import PageWrapper from '../components/PageWrapper';
import CallbackBanner from '../components/CallbackBanner';

const serviceSections = [
  { id: 'domestic', icon: FiMap, title: 'Domestic Tours', desc: 'Discover incredible destinations within your country with guided tours, comfortable stays, and curated experiences.', link: '/packages?tourType=domestic' },
  { id: 'international', icon: FiGlobe, title: 'International Tours', desc: 'Explore the world with our international packages covering Europe, Asia, the Americas, and more.', link: '/packages?tourType=international' },
  { id: 'visa', icon: FiFileText, title: 'Visa Assistance', desc: 'Complete visa documentation, appointment scheduling, and step-by-step guidance for international travel.', link: null },
  { id: 'honeymoon', icon: FiHeart, title: 'Honeymoon Packages', desc: 'Romantic escapes with luxury accommodations, private tours, and special couple experiences.', link: '/packages?category=honeymoon' },
  { id: 'corporate', icon: FiBriefcase, title: 'Corporate & MICE Travel', desc: 'Group tours, conferences, incentive trips, and corporate travel management for businesses of all sizes.', link: null },
  { id: 'flights', icon: FiCreditCard, title: 'Flights & Hotels', desc: 'Standalone flight bookings, hotel reservations, and airport transfers — with or without a tour package.', link: '/hotels' },
];

const Services = () => {
  const [visaForm, setVisaForm] = useState({ name: '', email: '', phone: '', message: '' });
  const [submitting, setSubmitting] = useState(false);

  const handleVisaSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await API.post('/inquiries', {
        ...visaForm,
        subject: 'Visa Assistance Request',
        inquiryType: 'visa',
        message: visaForm.message || 'I need visa assistance for international travel.',
      });
      toast.success('Request submitted! Our visa team will contact you shortly.');
      setVisaForm({ name: '', email: '', phone: '', message: '' });
    } catch (err) {
      toast.error(getErrorMessage(err, 'Submission failed'));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <PageWrapper>
      <div className="page-wrap">
        <div className="page-hero page-hero-large">
          <div className="container">
            <span className="section-tag">Services</span>
            <h1>Complete Travel Solutions</h1>
            <p>From tour packages to visa support — everything you need for a seamless journey</p>
          </div>
        </div>

        <section className="section">
          <div className="container">
            {serviceSections.map((s) => (
              <div key={s.id} id={s.id} className="service-detail-block">
                <div className="service-detail-icon"><s.icon /></div>
                <div className="service-detail-content">
                  <h2>{s.title}</h2>
                  <p>{s.desc}</p>
                  {s.link && <Link to={s.link} className="btn btn-primary btn-sm">Browse Options</Link>}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="section section-alt" id="visa-form">
          <div className="container">
            <div className="visa-form-grid">
              <div>
                <span className="section-tag">Visa Help</span>
                <h2>Request Visa Assistance</h2>
                <p>Fill out the form and our visa experts will guide you through documentation, appointments, and requirements for your destination.</p>
              </div>
              <form className="card card-body" onSubmit={handleVisaSubmit}>
                <div className="form-row">
                  <div className="form-group">
                    <label>Full Name</label>
                    <input className="form-control" required value={visaForm.name} onChange={(e) => setVisaForm({ ...visaForm, name: e.target.value })} />
                  </div>
                  <div className="form-group">
                    <label>Email</label>
                    <input type="email" className="form-control" required value={visaForm.email} onChange={(e) => setVisaForm({ ...visaForm, email: e.target.value })} />
                  </div>
                </div>
                <div className="form-group">
                  <label>Phone</label>
                  <input className="form-control" value={visaForm.phone} onChange={(e) => setVisaForm({ ...visaForm, phone: e.target.value })} />
                </div>
                <div className="form-group">
                  <label>Destination / Details</label>
                  <textarea className="form-control" rows={4} value={visaForm.message} onChange={(e) => setVisaForm({ ...visaForm, message: e.target.value })} placeholder="Which country? Travel dates? Number of travelers?" />
                </div>
                <button type="submit" className="btn btn-primary" disabled={submitting}>{submitting ? 'Submitting...' : 'Submit Request'}</button>
              </form>
            </div>
          </div>
        </section>

        <CallbackBanner />
      </div>
    </PageWrapper>
  );
};

export default Services;
