import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import API from '../services/api';
import Loading from '../components/Loading';
import EmptyState from '../components/EmptyState';

const Bookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchBookings = () => {
    API.get('/bookings')
      .then((res) => setBookings(res.data.data))
      .finally(() => setLoading(false));
  };

  useEffect(() => { fetchBookings(); }, []);

  const handleCancel = async (id) => {
    if (!confirm('Are you sure you want to cancel this booking?')) return;
    try {
      await API.put(`/bookings/${id}/cancel`);
      toast.success('Booking cancelled');
      fetchBookings();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Cancel failed');
    }
  };

  if (loading) return <Loading />;

  return (
    <div className="section">
      <div className="container">
        <div className="section-header">
          <h2>My Bookings</h2>
          <p>View and manage your travel bookings</p>
        </div>

        {bookings.length === 0 ? (
          <EmptyState message="No bookings yet">
            <Link to="/packages" className="btn btn-primary" style={{ marginTop: 16 }}>Browse Packages</Link>
          </EmptyState>
        ) : (
          <div className="table-container card">
            <table>
              <thead>
                <tr>
                  <th>Reference</th>
                  <th>Package</th>
                  <th>Travel Date</th>
                  <th>Travelers</th>
                  <th>Amount</th>
                  <th>Status</th>
                  <th>Payment</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {bookings.map((b) => (
                  <tr key={b._id}>
                    <td style={{ fontWeight: 600 }}>{b.bookingReference}</td>
                    <td>{b.tourPackage?.title}</td>
                    <td>{new Date(b.travelDate).toLocaleDateString()}</td>
                    <td>{b.numberOfTravelers}</td>
                    <td>${b.totalAmount}</td>
                    <td><span className={`badge badge-${b.status}`}>{b.status}</span></td>
                    <td><span className={`badge badge-${b.paymentStatus}`}>{b.paymentStatus}</span></td>
                    <td>
                      {['pending', 'confirmed'].includes(b.status) && (
                        <button className="btn btn-danger btn-sm" onClick={() => handleCancel(b._id)}>Cancel</button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Bookings;
