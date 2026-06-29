import { Link } from 'react-router-dom';
import { FiAward, FiUsers, FiGlobe, FiTarget } from 'react-icons/fi';
import PageWrapper from '../components/PageWrapper';
import CallbackBanner from '../components/CallbackBanner';

const About = () => (
  <PageWrapper>
    <div className="page-wrap">
      <div className="page-hero page-hero-large about-hero">
        <div className="container">
          <span className="section-tag">About Us</span>
          <h1>Your Trusted Travel Partner Since 2010</h1>
          <p>We transform journeys into unforgettable experiences with expert planning, personalized service, and 24/7 support.</p>
        </div>
      </div>

      <section className="section">
        <div className="container about-intro-grid">
          <div>
            <h2>Who We Are</h2>
            <p>TravelEase is a full-service travel management company dedicated to making travel simple, safe, and memorable. From domestic getaways to international adventures, we craft itineraries that match your dreams and budget.</p>
            <p>Our team of experienced travel professionals works with trusted partners worldwide to deliver competitive rates, verified tours, and seamless logistics — so you can focus on enjoying the journey.</p>
            <div className="about-stats-row">
              <div><strong>15+</strong><span>Years Experience</span></div>
              <div><strong>50+</strong><span>Destinations</span></div>
              <div><strong>15k+</strong><span>Happy Travelers</span></div>
              <div><strong>100+</strong><span>Tour Packages</span></div>
            </div>
          </div>
          <div className="about-image">
            <img src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800" alt="Travel team" />
          </div>
        </div>
      </section>

      <section className="section section-alt">
        <div className="container">
          <div className="section-header center">
            <h2>Our Mission & Values</h2>
          </div>
          <div className="values-grid">
            <div className="value-card"><FiTarget /><h3>Customer First</h3><p>Every itinerary is tailored to your preferences, budget, and travel style.</p></div>
            <div className="value-card"><FiAward /><h3>Quality Assured</h3><p>We partner only with verified hotels, guides, and transport providers.</p></div>
            <div className="value-card"><FiGlobe /><h3>Global Reach</h3><p>Domestic and international destinations with end-to-end travel support.</p></div>
            <div className="value-card"><FiUsers /><h3>Expert Team</h3><p>Dedicated travel managers available around the clock for your peace of mind.</p></div>
          </div>
        </div>
      </section>

      <CallbackBanner />

      <section className="section">
        <div className="container center">
          <h2>Ready to Start Planning?</h2>
          <p style={{ marginBottom: 24 }}>Let our travel experts design your perfect trip.</p>
          <Link to="/contact" className="btn btn-primary btn-lg">Contact Us Today</Link>
        </div>
      </section>
    </div>
  </PageWrapper>
);

export default About;
