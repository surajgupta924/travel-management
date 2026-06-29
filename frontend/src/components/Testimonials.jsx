const testimonials = [
  { name: 'Sarah Mitchell', role: 'Adventure Traveler', text: 'TravelEase made our Bali trip seamless. The itinerary was perfect and the guides were incredible!', rating: 5, avatar: 'SM' },
  { name: 'James Chen', role: 'Family Vacation', text: 'Booked a family package to Switzerland. Kids loved it, and the hotel recommendations were spot on.', rating: 5, avatar: 'JC' },
  { name: 'Emily Rodriguez', role: 'Solo Explorer', text: 'As a solo traveler, I felt safe and supported throughout. Will definitely book again!', rating: 5, avatar: 'ER' },
  { name: 'David Kumar', role: 'Honeymoon Trip', text: 'Our Santorini honeymoon was magical. TravelEase handled every detail from flights to hotels.', rating: 5, avatar: 'DK' },
];

const Testimonials = () => (
  <section className="section section-alt">
    <div className="container">
      <div className="section-header">
        <span className="section-tag">Reviews</span>
        <h2>What Our Travelers Say</h2>
        <p>Real stories from thousands of happy customers worldwide</p>
      </div>
      <div className="grid-2 testimonial-grid">
        {testimonials.map((t) => (
          <div key={t.name} className="testimonial-card">
            <div className="testimonial-stars">{'★'.repeat(t.rating)}</div>
            <p className="testimonial-text">&ldquo;{t.text}&rdquo;</p>
            <div className="testimonial-author">
              <div className="avatar-circle">{t.avatar}</div>
              <div>
                <strong>{t.name}</strong>
                <span>{t.role}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default Testimonials;
