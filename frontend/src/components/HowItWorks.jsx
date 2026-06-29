import { FiSearch, FiCalendar, FiMap } from 'react-icons/fi';

const steps = [
  { icon: <FiSearch />, title: 'Browse & Discover', desc: 'Explore hundreds of curated tour packages, destinations, and hotels tailored to your travel style.' },
  { icon: <FiCalendar />, title: 'Book Instantly', desc: 'Select your dates, choose travelers, and secure your spot with our easy online booking system.' },
  { icon: <FiMap />, title: 'Travel & Enjoy', desc: 'Get expert guides, 24/7 support, and unforgettable experiences at every step of your journey.' },
];

const HowItWorks = () => (
  <section className="section">
    <div className="container">
      <div className="section-header">
        <span className="section-tag">Simple Process</span>
        <h2>How TravelEase Works</h2>
        <p>Plan your dream vacation in three easy steps</p>
      </div>
      <div className="steps-grid">
        {steps.map((step, i) => (
          <div key={step.title} className="step-card">
            <div className="step-number">{i + 1}</div>
            <div className="step-icon">{step.icon}</div>
            <h3>{step.title}</h3>
            <p>{step.desc}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default HowItWorks;
