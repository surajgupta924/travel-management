import { FiAward, FiShield, FiHeadphones, FiUsers } from 'react-icons/fi';

const features = [
  { icon: FiAward, title: '15+ Years Experience', desc: 'Trusted by thousands of travelers with proven expertise in tour planning.' },
  { icon: FiShield, title: 'Secure & Reliable', desc: 'Government-recognized travel services with transparent pricing and safe bookings.' },
  { icon: FiHeadphones, title: '24/7 Travel Support', desc: 'Round-the-clock assistance before, during, and after your journey.' },
  { icon: FiUsers, title: 'Personal Tour Manager', desc: 'Dedicated travel expert to customize your itinerary based on your preferences.' },
];

const WhyChooseUs = () => (
  <section className="section why-choose-section">
    <div className="container">
      <div className="why-choose-grid">
        <div className="why-choose-content">
          <span className="section-tag">Why TravelEase</span>
          <h2>Your Trusted Partner for Unforgettable Journeys</h2>
          <p>We specialize in creating customized travel experiences for families, honeymooners, groups, students, and corporate travelers. Every itinerary is crafted with care.</p>
          <div className="why-features">
            {features.map((f) => (
              <div key={f.title} className="why-feature">
                <div className="why-feature-icon"><f.icon /></div>
                <div>
                  <strong>{f.title}</strong>
                  <p>{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="why-choose-visual">
          <img src="https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800" alt="Travel experience" />
          <div className="why-choose-badge">
            <strong>15+</strong>
            <span>Years of Excellence</span>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default WhyChooseUs;
