import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import API from '../../services/api';
import Loading from '../../components/Loading';

const ManageBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('');

  const fetchBookings = () => {
    API.get(`/bookings${filter ? `?status=${filter}` : ''}`)
      .then((res) => setBookings(res.data.data))
      .finally(() => setLoading(false));
  };

  useEffect(() => { fetchBookings(); }, [filter]);

  const updateBooking = async (id, data) => {
    try {
      await API.put(`/bookings/${id}`, data);
      toast.success('Booking updated');
      fetchBookings();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Update failed');
    }
  };

  if (loading) return <Loading />;

  return (
    <>
      <div className="dashboard-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div><h1>Bookings</h1><p>Manage all customer bookings</p></div>
        <select className="form-control" style={{ width: 180 }} value={filter} onChange={(e) => setFilter(e.target.value)}>
          <option value="">All Status</option>
          <option value="pending">Pending</option>
          <option value="confirmed">Confirmed</option>
          <option value="cancelled">Cancelled</option>
          <option value="completed">Completed</option>
        </select>
      </div>

      <div className="table-container card">
        <table>
          <thead>
            <tr>
              <th>Reference</th><th>Customer</th><th>Package</th><th>Date</th>
              <th>Travelers</th><th>Amount</th><th>Status</th><th>Payment</th><th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((b) => (
              <tr key={b._id}>
                <td style={{ fontWeight: 600 }}>{b.bookingReference}</td>
                <td>{b.user?.name}<br /><small style={{ color: 'var(--gray-500)' }}>{b.user?.email}</small></td>
                <td>{b.tourPackage?.title}</td>
                <td>{new Date(b.travelDate).toLocaleDateString()}</td>
                <td>{b.numberOfTravelers}</td>
                <td>${b.totalAmount}</td>
                <td>
                  <select
                    className="form-control"
                    style={{ width: 120, padding: '4px 8px', fontSize: 13 }}
                    value={b.status}
                    onChange={(e) => updateBooking(b._id, { status: e.target.value })}
                  >
                    <option value="pending">Pending</option>
                    <option value="confirmed">Confirmed</option>
                    <option value="cancelled">Cancelled</option>
                    <option value="completed">Completed</option>
                  </select>
                </td>
                <td>
                  <select
                    className="form-control"
                    style={{ width: 100, padding: '4px 8px', fontSize: 13 }}
                    value={b.paymentStatus}
                    onChange={(e) => updateBooking(b._id, { paymentStatus: e.target.value })}
                  >
                    <option value="unpaid">Unpaid</option>
                    <option value="partial">Partial</option>
                    <option value="paid">Paid</option>
                    <option value="refunded">Refunded</option>
                  </select>
                </td>
                <td>—</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default ManageBookings;
