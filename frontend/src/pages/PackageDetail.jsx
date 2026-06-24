import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FiClock, FiMapPin, FiStar, FiCheck, FiX } from 'react-icons/fi';
import toast from 'react-hot-toast';
import API from '../services/api';
import { useAuth } from '../context/AuthContext';
import Loading from '../components/Loading';
import EmptyState from '../components/EmptyState';

const PackageDetail = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [booking, setBooking] = useState({ travelDate: '', numberOfTravelers: 1, specialRequests: '' });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    API.get(`/packages/${id}`)
      .then((res) => setData(res.data.data))
      .finally(() => setLoading(false));
  }, [id]);

  const handleBooking = async (e) => {
    e.preventDefault();
    if (!user) {
      toast.error('Please login to book');
      navigate('/login');
      return;
    }
    setSubmitting(true);
    try {
      const res = await API.post('/bookings', { tourPackage: id, ...booking });
      toast.success(`Booking created! Reference: ${res.data.data.bookingReference}`);
      navigate('/bookings');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Booking failed');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <Loading />;
  if (!data) return <EmptyState message="Package not found" />;

  const { package: pkg, reviews } = data;
  const image = pkg.images?.[0] || pkg.destination?.image;

  return (
    <>
      <div className="detail-hero">
        <img src={image} alt={pkg.title} />
        <div className="overlay">
          <div className="container">
            <h1>{pkg.title}</h1>
            <p style={{ opacity: 0.9 }}>{pkg.destination?.city}, {pkg.destination?.country}</p>
          </div>
        </div>
      </div>

      <div className="container detail-content">
        <div>
          <div style={{ display: 'flex', gap: 24, marginBottom: 24, flexWrap: 'wrap' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}><FiClock /> {pkg.duration} days</span>
            <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}><FiMapPin /> {pkg.destination?.name}</span>
            <span style={{ display: 'flex', alignItems: 'center', gap: 6, color: 'var(--warning)' }}><FiStar /> {pkg.rating} ({pkg.reviewCount} reviews)</span>
            <span className="badge" style={{ background: 'var(--primary-light)', color: 'var(--primary)' }}>{pkg.category}</span>
            <span className="badge" style={{ background: '#ffedd5', color: 'var(--secondary)' }}>{pkg.difficulty}</span>
          </div>

          <p style={{ marginBottom: 32, lineHeight: 1.8 }}>{pkg.description}</p>

          {pkg.itinerary?.length > 0 && (
            <div className="card card-body" style={{ marginBottom: 24 }}>
              <h3 style={{ marginBottom: 16 }}>Itinerary</h3>
              {pkg.itinerary.map((day) => (
                <div key={day.day} className="itinerary-item">
                  <div className="itinerary-day">D{day.day}</div>
                  <div>
                    <h4>{day.title}</h4>
                    <p style={{ color: 'var(--gray-500)', fontSize: 14 }}>{day.description}</p>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="grid-2" style={{ marginBottom: 24 }}>
            <div className="card card-body">
              <h3 style={{ marginBottom: 12 }}><FiCheck style={{ color: 'var(--success)' }} /> Inclusions</h3>
              <ul style={{ listStyle: 'none' }}>
                {pkg.inclusions?.map((item, i) => (
                  <li key={i} style={{ padding: '4px 0', fontSize: 14 }}>✓ {item}</li>
                ))}
              </ul>
            </div>
            <div className="card card-body">
              <h3 style={{ marginBottom: 12 }}><FiX style={{ color: 'var(--danger)' }} /> Exclusions</h3>
              <ul style={{ listStyle: 'none' }}>
                {pkg.exclusions?.map((item, i) => (
                  <li key={i} style={{ padding: '4px 0', fontSize: 14 }}>✗ {item}</li>
                ))}
              </ul>
            </div>
          </div>

          {reviews?.length > 0 && (
            <div className="card card-body">
              <h3 style={{ marginBottom: 16 }}>Reviews</h3>
              {reviews.map((review) => (
                <div key={review._id} className="review-item">
                  <div className="review-header">
                    <span className="review-author">{review.user?.name}</span>
                    <span className="review-stars">{'★'.repeat(review.rating)}</span>
                  </div>
                  <h4 style={{ fontSize: 14 }}>{review.title}</h4>
                  <p style={{ fontSize: 14, color: 'var(--gray-500)' }}>{review.comment}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="booking-sidebar">
          <div className="card">
            <div className="price">${pkg.price}</div>
            <div className="per-person">per person</div>
            <form onSubmit={handleBooking}>
              <div className="form-group">
                <label>Travel Date</label>
                <input
                  type="date"
                  className="form-control"
                  required
                  min={new Date().toISOString().split('T')[0]}
                  value={booking.travelDate}
                  onChange={(e) => setBooking({ ...booking, travelDate: e.target.value })}
                />
              </div>
              <div className="form-group">
                <label>Travelers</label>
                <input
                  type="number"
                  className="form-control"
                  min={1}
                  max={pkg.maxGroupSize}
                  required
                  value={booking.numberOfTravelers}
                  onChange={(e) => setBooking({ ...booking, numberOfTravelers: Number(e.target.value) })}
                />
              </div>
              <div className="form-group">
                <label>Special Requests</label>
                <textarea
                  className="form-control"
                  rows={3}
                  value={booking.specialRequests}
                  onChange={(e) => setBooking({ ...booking, specialRequests: e.target.value })}
                />
              </div>
              <div style={{ marginBottom: 16, fontWeight: 600 }}>
                Total: ${pkg.price * booking.numberOfTravelers}
              </div>
              <button type="submit" className="btn btn-primary" style={{ width: '100%' }} disabled={submitting}>
                {submitting ? 'Booking...' : 'Book Now'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default PackageDetail;
