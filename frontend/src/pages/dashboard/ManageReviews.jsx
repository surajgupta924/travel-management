import { useState, useEffect } from 'react';
import { FiCheck, FiTrash2 } from 'react-icons/fi';
import toast from 'react-hot-toast';
import API from '../../services/api';
import Loading from '../../components/Loading';

const ManageReviews = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = () => {
    API.get('/reviews?all=true').then((res) => setReviews(res.data.data)).finally(() => setLoading(false));
  };

  useEffect(() => { fetchData(); }, []);

  const approve = async (id) => {
    try { await API.put(`/reviews/${id}/approve`); toast.success('Approved'); fetchData(); }
    catch { toast.error('Failed'); }
  };

  const remove = async (id) => {
    if (!confirm('Delete review?')) return;
    try { await API.delete(`/reviews/${id}`); toast.success('Deleted'); fetchData(); }
    catch { toast.error('Failed'); }
  };

  if (loading) return <Loading />;

  return (
    <>
      <div className="dashboard-header">
        <h1>Package Reviews</h1>
        <p>Moderate customer reviews on tour packages</p>
      </div>
      <div className="table-container card">
        <table>
          <thead><tr><th>User</th><th>Package</th><th>Rating</th><th>Title</th><th>Status</th><th>Actions</th></tr></thead>
          <tbody>
            {reviews.map((r) => (
              <tr key={r._id}>
                <td>{r.user?.name}</td>
                <td>{r.tourPackage?.title}</td>
                <td>{'★'.repeat(r.rating)}</td>
                <td>{r.title}</td>
                <td><span className={`badge badge-${r.isApproved ? 'confirmed' : 'pending'}`}>{r.isApproved ? 'Approved' : 'Pending'}</span></td>
                <td className="table-actions">
                  {!r.isApproved && <button className="btn btn-primary btn-sm" onClick={() => approve(r._id)}><FiCheck /></button>}
                  <button className="btn btn-danger btn-sm" onClick={() => remove(r._id)}><FiTrash2 /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default ManageReviews;
