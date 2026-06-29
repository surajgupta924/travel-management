import PageWrapper from '../components/PageWrapper';
import FAQ from '../components/FAQ';
import CallbackBanner from '../components/CallbackBanner';

const faqItems = [
  { q: 'How do I book a tour package?', a: 'Browse our packages, select your preferred dates and number of travelers, create a free account, and complete the booking wizard. Our team confirms within 24 hours.' },
  { q: 'Do you provide customized tour packages?', a: 'Yes! We specialize in fully customized packages based on your budget, duration, destinations, and travel style. Contact us for a free quote.' },
  { q: 'Do you offer visa assistance?', a: 'We provide complete visa documentation guidance, appointment scheduling, and support for various international destinations.' },
  { q: 'Can I cancel my booking?', a: 'Yes. Go to My Bookings to cancel. Refund policy depends on timing — free cancellation up to 30 days before travel for most packages.' },
  { q: 'Are flights included in packages?', a: 'Most packages exclude international flights unless listed in inclusions. We can arrange flights separately on request.' },
  { q: 'Do you offer group discounts?', a: 'Yes! Contact us for group bookings of 10 or more travelers. We offer special rates for corporate and student groups.' },
  { q: 'Can I get a last-minute travel package?', a: 'We can arrange last-minute packages based on availability. Call our 24/7 support line for urgent bookings.' },
  { q: 'Do you book hotels and flights separately?', a: 'Yes. Standalone hotel reservations, flight bookings, and airport transfers are available without a full tour package.' },
];

const FAQPage = () => (
  <PageWrapper>
    <div className="page-wrap">
      <div className="page-hero page-hero-large">
        <div className="container">
          <span className="section-tag">FAQ</span>
          <h1>Frequently Asked Questions</h1>
          <p>Find answers to common questions about booking, visas, and travel with TravelEase</p>
        </div>
      </div>
      <section className="section">
        <div className="container" style={{ maxWidth: 800 }}>
          <FAQ items={faqItems} />
        </div>
      </section>
      <CallbackBanner />
    </div>
  </PageWrapper>
);

export default FAQPage;
