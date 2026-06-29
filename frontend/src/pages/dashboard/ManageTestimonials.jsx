import { useState, useEffect } from 'react';
import { FiPlus, FiEdit2, FiTrash2 } from 'react-icons/fi';
import toast from 'react-hot-toast';
import API from '../../services/api';
import Loading from '../../components/Loading';

const emptyForm = { name: '', role: 'Traveler', location: '', text: '', rating: 5, avatar: '', isFeatured: true, isActive: true };

const ManageTestimonials = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [editId, setEditId] = useState(null);

  const fetchData = () => {
    API.get('/testimonials/admin/all').then((res) => setItems(res.data.data)).finally(() => setLoading(false));
  };

  useEffect(() => { fetchData(); }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = { ...form, rating: Number(form.rating) };
      if (editId) { await API.put(`/testimonials/${editId}`, payload); toast.success('Updated'); }
      else { await API.post('/testimonials', payload); toast.success('Created'); }
      setShowModal(false);
      fetchData();
    } catch (err) { toast.error('Failed'); }
  };

  if (loading) return <Loading />;

  return (
    <>
      <div className="dashboard-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div><h1>Testimonials</h1><p>Manage customer reviews displayed on homepage</p></div>
        <button className="btn btn-primary" onClick={() => { setForm(emptyForm); setEditId(null); setShowModal(true); }}><FiPlus /> Add</button>
      </div>
      <div className="table-container card">
        <table>
          <thead><tr><th>Name</th><th>Role</th><th>Rating</th><th>Featured</th><th>Actions</th></tr></thead>
          <tbody>
            {items.map((t) => (
              <tr key={t._id}>
                <td>{t.name}</td><td>{t.role}</td><td>{'★'.repeat(t.rating)}</td>
                <td>{t.isFeatured ? 'Yes' : 'No'}</td>
                <td className="table-actions">
                  <button className="btn btn-outline btn-sm" onClick={() => { setForm(t); setEditId(t._id); setShowModal(true); }}><FiEdit2 /></button>
                  <button className="btn btn-danger btn-sm" onClick={async () => { if (confirm('Delete?')) { await API.delete(`/testimonials/${t._id}`); fetchData(); } }}><FiTrash2 /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h2>{editId ? 'Edit' : 'Add'} Testimonial</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-row">
                <div className="form-group"><label>Name</label><input className="form-control" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} /></div>
                <div className="form-group"><label>Role</label><input className="form-control" value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })} /></div>
              </div>
              <div className="form-group"><label>Location</label><input className="form-control" value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} /></div>
              <div className="form-group"><label>Review Text</label><textarea className="form-control" rows={4} required value={form.text} onChange={(e) => setForm({ ...form, text: e.target.value })} /></div>
              <div className="form-group"><label>Rating</label><input type="number" min={1} max={5} className="form-control" value={form.rating} onChange={(e) => setForm({ ...form, rating: e.target.value })} /></div>
              <label className="checkbox-label"><input type="checkbox" checked={form.isFeatured} onChange={(e) => setForm({ ...form, isFeatured: e.target.checked })} /> Show on Homepage</label>
              <div className="modal-actions"><button type="button" className="btn btn-outline" onClick={() => setShowModal(false)}>Cancel</button><button type="submit" className="btn btn-primary">Save</button></div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default ManageTestimonials;
