import { useState, useEffect } from 'react';
import { FiTrash2 } from 'react-icons/fi';
import toast from 'react-hot-toast';
import API from '../../services/api';
import Loading from '../../components/Loading';

const ManageNewsletter = () => {
  const [subscribers, setSubscribers] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = () => {
    API.get('/newsletter').then((res) => setSubscribers(res.data.data)).finally(() => setLoading(false));
  };

  useEffect(() => { fetchData(); }, []);

  const handleDelete = async (id) => {
    if (!confirm('Remove subscriber?')) return;
    try { await API.delete(`/newsletter/${id}`); toast.success('Removed'); fetchData(); }
    catch { toast.error('Failed'); }
  };

  if (loading) return <Loading />;

  return (
    <>
      <div className="dashboard-header">
        <h1>Newsletter Subscribers</h1>
        <p>{subscribers.length} total subscribers</p>
      </div>
      <div className="table-container card">
        <table>
          <thead><tr><th>Email</th><th>Status</th><th>Subscribed</th><th>Actions</th></tr></thead>
          <tbody>
            {subscribers.map((s) => (
              <tr key={s._id}>
                <td>{s.email}</td>
                <td><span className={`badge badge-${s.isActive ? 'confirmed' : 'cancelled'}`}>{s.isActive ? 'Active' : 'Inactive'}</span></td>
                <td>{new Date(s.createdAt).toLocaleDateString()}</td>
                <td><button className="btn btn-danger btn-sm" onClick={() => handleDelete(s._id)}><FiTrash2 /></button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default ManageNewsletter;
