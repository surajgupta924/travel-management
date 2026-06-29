import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { FiClock, FiMapPin, FiStar, FiCheck, FiX, FiUsers, FiShield, FiShare2 } from 'react-icons/fi';
import toast from 'react-hot-toast';
import API from '../services/api';
import { getErrorMessage } from '../utils/getErrorMessage';
import { useAuth } from '../context/AuthContext';
import PackageCard from '../components/PackageCard';
import FAQ from '../components/FAQ';
import Loading from '../components/Loading';
import EmptyState from '../components/EmptyState';
import BookingWizard from '../components/BookingWizard';
import CompareButton from '../components/CompareButton';
import PageWrapper from '../components/PageWrapper';

const packageFaq = [
  { q: 'What is the cancellation policy?', a: 'You can cancel from My Bookings. Cancellations 30+ days before travel receive full refund; 15–30 days receive 50%.' },
  { q: 'Is travel insurance included?', a: 'Travel insurance is not included by default. We recommend purchasing separate coverage.' },
  { q: 'What should I pack?', a: 'Packing depends on destination climate. Check the destination page for seasonal recommendations.' },
];

const PackageDetail = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [related, setRelated] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showWizard, setShowWizard] = useState(false);
  const [reviewForm, setReviewForm] = useState({ rating: 5, title: '', comment: '' });
  const [reviewSubmitting, setReviewSubmitting] = useState(false);
  const [mainImage, setMainImage] = useState(0);

  const fetchPackage = () => {
    API.get(`/packages/${id}`)
      .then((res) => {
        setData(res.data.data);
        const destId = res.data.data.package.destination?._id;
        if (destId) {
          API.get(`/packages?destination=${destId}`).then((r) => {
            setRelated(r.data.data.filter((p) => p._id !== id).slice(0, 3));
          });
        }
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => { fetchPackage(); }, [id]);

  const handleBookClick = () => {
    if (!user) {
      toast.error('Please login to book');
      navigate('/login');
      return;
    }
    setShowWizard(true);
  };

  const handleReview = async (e) => {
    e.preventDefault();
    if (!user) {
      toast.error('Login to leave a review');
      navigate('/login');
      return;
    }
    setReviewSubmitting(true);
    try {
      await API.post('/reviews', { tourPackage: id, ...reviewForm });
      toast.success('Review submitted!');
      setReviewForm({ rating: 5, title: '', comment: '' });
      fetchPackage();
    } catch (err) {
      toast.error(getErrorMessage(err, 'Review failed'));
    } finally {
      setReviewSubmitting(false);
    }
  };

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    toast.success('Link copied to clipboard!');
  };

  if (loading) return <Loading message="Loading package details..." />;
  if (!data) return <EmptyState message="Package not found" />;

  const { package: pkg, reviews } = data;
  const images = pkg.images?.length ? pkg.images : [pkg.destination?.image];

  return (
    <PageWrapper>
    <>
      <div className="detail-hero detail-hero-large">
        <img src={images[mainImage]} alt={pkg.title} />
        <div className="overlay">
          <div className="container">
            <div className="detail-hero-badges">
              <span className="badge tag-category">{pkg.category}</span>
              <span className="badge tag-difficulty">{pkg.difficulty}</span>
              {pkg.isFeatured && <span className="badge tag-featured">Featured</span>}
            </div>
            <h1>{pkg.title}</h1>
            <p>{pkg.destination?.city}, {pkg.destination?.country}</p>
          </div>
        </div>
      </div>

      <div className="container">
        {images.length > 1 && (
          <div className="image-gallery">
            {images.map((img, i) => (
              <button key={i} type="button" className={mainImage === i ? 'active' : ''} onClick={() => setMainImage(i)}>
                <img src={img} alt={`${pkg.title} ${i + 1}`} />
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="container detail-content">
        <div className="detail-main">
          <div className="detail-meta-bar">
            <span><FiClock /> {pkg.duration} days</span>
            <span><FiMapPin /> {pkg.destination?.name}</span>
            <span><FiUsers /> Max {pkg.maxGroupSize} travelers</span>
            <span className="rating"><FiStar fill="currentColor" /> {pkg.rating} ({pkg.reviewCount} reviews)</span>
            <button type="button" className="btn btn-outline btn-sm" onClick={handleShare}><FiShare2 /> Share</button>
          </div>

          <div className="card card-body content-block">
            <h3>About This Tour</h3>
            <p className="lead-text">{pkg.description}</p>
          </div>

          {pkg.itinerary?.length > 0 && (
            <div className="card card-body content-block">
              <h3>Day-by-Day Itinerary</h3>
              {pkg.itinerary.map((day) => (
                <div key={day.day} className="itinerary-item">
                  <div className="itinerary-day">Day {day.day}</div>
                  <div>
                    <h4>{day.title}</h4>
                    <p>{day.description}</p>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="grid-2 content-block">
            <div className="card card-body">
              <h3><FiCheck style={{ color: 'var(--success)' }} /> What&apos;s Included</h3>
              <ul className="check-list">
                {pkg.inclusions?.map((item, i) => <li key={i}>{item}</li>)}
              </ul>
            </div>
            <div className="card card-body">
              <h3><FiX style={{ color: 'var(--danger)' }} /> Not Included</h3>
              <ul className="x-list">
                {pkg.exclusions?.map((item, i) => <li key={i}>{item}</li>)}
              </ul>
            </div>
          </div>

          {pkg.hotel && (
            <div className="card card-body content-block hotel-info-card">
              <h3>🏨 Included Accommodation</h3>
              <div className="hotel-info-inner">
                {pkg.hotel.image && <img src={pkg.hotel.image} alt={pkg.hotel.name} />}
                <div>
                  <h4>{pkg.hotel.name}</h4>
                  <p>{'★'.repeat(pkg.hotel.starRating || 3)} · ${pkg.hotel.pricePerNight}/night</p>
                  <p className="muted">{pkg.hotel.description || 'Premium hotel included in this package.'}</p>
                </div>
              </div>
            </div>
          )}

          <div className="trust-strip">
            <span><FiShield /> Secure Booking</span>
            <span>✓ Instant Confirmation</span>
            <span>✓ Free Cancellation*</span>
            <span>✓ 24/7 Support</span>
          </div>

          <div className="card card-body content-block">
            <h3>Traveler Reviews ({reviews?.length || 0})</h3>
            {reviews?.length > 0 ? reviews.map((review) => (
              <div key={review._id} className="review-item">
                <div className="review-header">
                  <div className="review-author-wrap">
                    <div className="avatar-circle sm">{review.user?.name?.[0]}</div>
                    <span className="review-author">{review.user?.name}</span>
                  </div>
                  <span className="review-stars">{'★'.repeat(review.rating)}</span>
                </div>
                <h4>{review.title}</h4>
                <p className="muted">{review.comment}</p>
              </div>
            )) : <p className="muted">No reviews yet. Be the first to review!</p>}

            <form className="review-form" onSubmit={handleReview}>
              <h4>Write a Review</h4>
              <div className="form-row">
                <div className="form-group">
                  <label>Rating</label>
                  <select className="form-control" value={reviewForm.rating} onChange={(e) => setReviewForm({ ...reviewForm, rating: Number(e.target.value) })}>
                    {[5, 4, 3, 2, 1].map((n) => <option key={n} value={n}>{n} Stars</option>)}
                  </select>
                </div>
                <div className="form-group">
                  <label>Title</label>
                  <input className="form-control" required value={reviewForm.title} onChange={(e) => setReviewForm({ ...reviewForm, title: e.target.value })} placeholder="Great experience!" />
                </div>
              </div>
              <div className="form-group">
                <label>Your Review</label>
                <textarea className="form-control" rows={4} required value={reviewForm.comment} onChange={(e) => setReviewForm({ ...reviewForm, comment: e.target.value })} placeholder="Share your experience..." />
              </div>
              <button type="submit" className="btn btn-primary" disabled={reviewSubmitting}>
                {reviewSubmitting ? 'Submitting...' : 'Submit Review'}
              </button>
            </form>
          </div>

          <FAQ items={packageFaq} title="Package FAQ" />
        </div>

        <div className="booking-sidebar">
          <div className="card booking-card">
            <div className="price">${pkg.price}</div>
            <div className="per-person">per person · {pkg.duration} days</div>
            <div className="booking-total" style={{ marginBottom: 16 }}>
              <span>Starting from</span>
              <strong>${pkg.price}</strong>
            </div>
            <button type="button" className="btn btn-primary btn-lg auth-submit" onClick={handleBookClick}>
              Book Now
            </button>
            <div className="sidebar-actions" style={{ marginTop: 12, display: 'flex', gap: 8 }}>
              <CompareButton pkg={pkg} size="md" />
              <button type="button" className="btn btn-outline" style={{ flex: 1 }} onClick={handleShare}><FiShare2 /> Share</button>
            </div>
            <p className="booking-note">* Free cancellation up to 30 days before travel</p>
          </div>

          <div className="card card-body sidebar-info">
            <h4>Need Help?</h4>
            <p className="muted">Our travel experts are available 24/7</p>
            <Link to="/contact" className="btn btn-outline" style={{ width: '100%' }}>Contact Us</Link>
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <section className="section section-alt">
          <div className="container">
            <div className="section-header">
              <span className="section-tag">Similar</span>
              <h2>Related Packages</h2>
            </div>
            <div className="grid-3">
              {related.map((p) => <PackageCard key={p._id} pkg={p} />)}
            </div>
          </div>
        </section>
      )}
      {showWizard && (
        <BookingWizard
          pkg={pkg}
          onClose={() => setShowWizard(false)}
          onSuccess={() => navigate('/bookings')}
        />
      )}
    </>
    </PageWrapper>
  );
};

export default PackageDetail;
