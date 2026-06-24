import { useState, useEffect } from 'react';
import { FiPlus, FiEdit2, FiTrash2 } from 'react-icons/fi';
import toast from 'react-hot-toast';
import API from '../../services/api';
import Loading from '../../components/Loading';

const emptyForm = {
  name: '', country: '', city: '', description: '', image: '',
  highlights: '', bestTimeToVisit: '', climate: '', isPopular: false,
};

const ManageDestinations = () => {
  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [editId, setEditId] = useState(null);

  const fetchData = () => {
    API.get('/destinations').then((res) => setDestinations(res.data.data)).finally(() => setLoading(false));
  };

  useEffect(() => { fetchData(); }, []);

  const openCreate = () => { setForm(emptyForm); setEditId(null); setShowModal(true); };

  const openEdit = (dest) => {
    setForm({ ...dest, highlights: dest.highlights?.join(', ') || '' });
    setEditId(dest._id);
    setShowModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      ...form,
      highlights: form.highlights.split(',').map((s) => s.trim()).filter(Boolean),
    };
    try {
      if (editId) {
        await API.put(`/destinations/${editId}`, payload);
        toast.success('Destination updated');
      } else {
        await API.post('/destinations', payload);
        toast.success('Destination created');
      }
      setShowModal(false);
      fetchData();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Operation failed');
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this destination?')) return;
    try {
      await API.delete(`/destinations/${id}`);
      toast.success('Destination deleted');
      fetchData();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Delete failed');
    }
  };

  if (loading) return <Loading />;

  return (
    <>
      <div className="dashboard-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div><h1>Destinations</h1><p>Manage travel destinations</p></div>
        <button className="btn btn-primary" onClick={openCreate}><FiPlus /> Add Destination</button>
      </div>

      <div className="table-container card">
        <table>
          <thead>
            <tr><th>Name</th><th>City</th><th>Country</th><th>Popular</th><th>Actions</th></tr>
          </thead>
          <tbody>
            {destinations.map((d) => (
              <tr key={d._id}>
                <td style={{ fontWeight: 600 }}>{d.name}</td>
                <td>{d.city}</td>
                <td>{d.country}</td>
                <td>{d.isPopular ? '✓' : '—'}</td>
                <td className="table-actions">
                  <button className="btn btn-outline btn-sm" onClick={() => openEdit(d)}><FiEdit2 /></button>
                  <button className="btn btn-danger btn-sm" onClick={() => handleDelete(d._id)}><FiTrash2 /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h2>{editId ? 'Edit Destination' : 'Add Destination'}</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Name</label>
                <input className="form-control" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>City</label>
                  <input className="form-control" required value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })} />
                </div>
                <div className="form-group">
                  <label>Country</label>
                  <input className="form-control" required value={form.country} onChange={(e) => setForm({ ...form, country: e.target.value })} />
                </div>
              </div>
              <div className="form-group">
                <label>Description</label>
                <textarea className="form-control" required value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
              </div>
              <div className="form-group">
                <label>Image URL</label>
                <input className="form-control" value={form.image} onChange={(e) => setForm({ ...form, image: e.target.value })} />
              </div>
              <div className="form-group">
                <label>Highlights (comma separated)</label>
                <input className="form-control" value={form.highlights} onChange={(e) => setForm({ ...form, highlights: e.target.value })} />
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Best Time to Visit</label>
                  <input className="form-control" value={form.bestTimeToVisit} onChange={(e) => setForm({ ...form, bestTimeToVisit: e.target.value })} />
                </div>
                <div className="form-group">
                  <label>Climate</label>
                  <input className="form-control" value={form.climate} onChange={(e) => setForm({ ...form, climate: e.target.value })} />
                </div>
              </div>
              <label style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
                <input type="checkbox" checked={form.isPopular} onChange={(e) => setForm({ ...form, isPopular: e.target.checked })} />
                Popular Destination
              </label>
              <div className="modal-actions">
                <button type="button" className="btn btn-outline" onClick={() => setShowModal(false)}>Cancel</button>
                <button type="submit" className="btn btn-primary">{editId ? 'Update' : 'Create'}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default ManageDestinations;
