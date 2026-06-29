import { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { FiCalendar, FiMapPin, FiUsers, FiFilter } from 'react-icons/fi';
import toast from 'react-hot-toast';
import API from '../services/api';
import { getErrorMessage } from '../utils/getErrorMessage';
import Loading from '../components/Loading';
import EmptyState from '../components/EmptyState';

const Bookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('');
  const [selected, setSelected] = useState(null);

  const fetchBookings = () => {
    API.get('/bookings')
      .then((res) => setBookings(res.data.data))
      .finally(() => setLoading(false));
  };

  useEffect(() => { fetchBookings(); }, []);

  const filtered = useMemo(() => {
    if (!statusFilter) return bookings;
    return bookings.filter((b) => b.status === statusFilter);
  }, [bookings, statusFilter]);

  const stats = useMemo(() => ({
    total: bookings.length,
    confirmed: bookings.filter((b) => b.status === 'confirmed').length,
    pending: bookings.filter((b) => b.status === 'pending').length,
    totalSpent: bookings.filter((b) => b.paymentStatus === 'paid').reduce((s, b) => s + b.totalAmount, 0),
  }), [bookings]);

  const handleCancel = async (id) => {
    if (!confirm('Are you sure you want to cancel this booking?')) return;
    try {
      await API.put(`/bookings/${id}/cancel`);
      toast.success('Booking cancelled');
      fetchBookings();
      setSelected(null);
    } catch (err) {
      toast.error(getErrorMessage(err, 'Cancel failed'));
    }
  };

  if (loading) return <Loading message="Loading your bookings..." />;

  return (
    <div className="page-wrap">
      <div className="page-hero">
        <div className="container">
          <h1>My Bookings</h1>
          <p>View, track, and manage all your travel reservations</p>
        </div>
      </div>

      <div className="container section">
        <div className="booking-stats-grid">
          <div className="booking-stat-card"><strong>{stats.total}</strong><span>Total Bookings</span></div>
          <div className="booking-stat-card"><strong>{stats.confirmed}</strong><span>Confirmed</span></div>
          <div className="booking-stat-card"><strong>{stats.pending}</strong><span>Pending</span></div>
          <div className="booking-stat-card"><strong>${stats.totalSpent}</strong><span>Total Paid</span></div>
        </div>

        <div className="bookings-toolbar">
          <div className="filters">
            <FiFilter />
            <select className="form-control" value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
              <option value="">All Status</option>
              <option value="pending">Pending</option>
              <option value="confirmed">Confirmed</option>
              <option value="cancelled">Cancelled</option>
              <option value="completed">Completed</option>
            </select>
          </div>
        </div>

        {filtered.length === 0 ? (
          <EmptyState message="No bookings found">
            <Link to="/packages" className="btn btn-primary" style={{ marginTop: 16 }}>Browse Packages</Link>
          </EmptyState>
        ) : (
          <div className="booking-cards-grid">
            {filtered.map((b) => (
              <div key={b._id} className="card booking-card-item">
                <div className="booking-card-header">
                  <span className="booking-ref">{b.bookingReference}</span>
                  <span className={`badge badge-${b.status}`}>{b.status}</span>
                </div>
                <h3>{b.tourPackage?.title}</h3>
                <div className="booking-card-meta">
                  <span><FiCalendar /> {new Date(b.travelDate).toLocaleDateString('en-US', { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' })}</span>
                  <span><FiUsers /> {b.numberOfTravelers} traveler(s)</span>
                  <span><FiMapPin /> {b.tourPackage?.destination?.city}</span>
                </div>
                <div className="booking-card-footer">
                  <div>
                    <span className="muted">Total</span>
                    <strong className="booking-amount">${b.totalAmount}</strong>
                    <span className={`badge badge-${b.paymentStatus}`}>{b.paymentStatus}</span>
                  </div>
                  <div className="table-actions">
                    <button className="btn btn-outline btn-sm" onClick={() => setSelected(b)}>Details</button>
                    {['pending', 'confirmed'].includes(b.status) && (
                      <button className="btn btn-danger btn-sm" onClick={() => handleCancel(b._id)}>Cancel</button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {selected && (
        <div className="modal-overlay" onClick={() => setSelected(null)}>
          <div className="modal booking-detail-modal" onClick={(e) => e.stopPropagation()}>
            <h2>Booking Details</h2>
            <div className="detail-rows">
              <div><span>Reference</span><strong>{selected.bookingReference}</strong></div>
              <div><span>Package</span><strong>{selected.tourPackage?.title}</strong></div>
              <div><span>Travel Date</span><strong>{new Date(selected.travelDate).toLocaleDateString()}</strong></div>
              <div><span>Travelers</span><strong>{selected.numberOfTravelers}</strong></div>
              <div><span>Amount</span><strong>${selected.totalAmount}</strong></div>
              <div><span>Status</span><span className={`badge badge-${selected.status}`}>{selected.status}</span></div>
              <div><span>Payment</span><span className={`badge badge-${selected.paymentStatus}`}>{selected.paymentStatus}</span></div>
              {selected.specialRequests && <div><span>Requests</span><strong>{selected.specialRequests}</strong></div>}
            </div>
            <div className="modal-actions">
              <button className="btn btn-outline" onClick={() => setSelected(null)}>Close</button>
              {['pending', 'confirmed'].includes(selected.status) && (
                <button className="btn btn-danger" onClick={() => handleCancel(selected._id)}>Cancel Booking</button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Bookings;
