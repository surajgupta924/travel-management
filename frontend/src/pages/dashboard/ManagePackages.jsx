import { useState, useEffect } from 'react';
import { FiPlus, FiEdit2, FiTrash2 } from 'react-icons/fi';
import toast from 'react-hot-toast';
import API from '../../services/api';
import Loading from '../../components/Loading';

const emptyForm = {
  title: '', destination: '', description: '', duration: 7, price: 0,
  maxGroupSize: 20, difficulty: 'easy', category: 'cultural', tourType: 'international',
  inclusions: '', exclusions: '', images: '', isFeatured: false,
};

const ManagePackages = () => {
  const [packages, setPackages] = useState([]);
  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [editId, setEditId] = useState(null);

  const fetchData = () => {
    Promise.all([API.get('/packages'), API.get('/destinations')])
      .then(([pkgRes, destRes]) => {
        setPackages(pkgRes.data.data);
        setDestinations(destRes.data.data);
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => { fetchData(); }, []);

  const openCreate = () => { setForm(emptyForm); setEditId(null); setShowModal(true); };

  const openEdit = (pkg) => {
    setForm({
      ...pkg,
      destination: pkg.destination?._id || pkg.destination,
      inclusions: pkg.inclusions?.join(', ') || '',
      exclusions: pkg.exclusions?.join(', ') || '',
      images: pkg.images?.join(', ') || '',
    });
    setEditId(pkg._id);
    setShowModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      ...form,
      duration: Number(form.duration),
      price: Number(form.price),
      maxGroupSize: Number(form.maxGroupSize),
      inclusions: form.inclusions.split(',').map((s) => s.trim()).filter(Boolean),
      exclusions: form.exclusions.split(',').map((s) => s.trim()).filter(Boolean),
      images: form.images.split(',').map((s) => s.trim()).filter(Boolean),
    };
    try {
      if (editId) {
        await API.put(`/packages/${editId}`, payload);
        toast.success('Package updated');
      } else {
        await API.post('/packages', payload);
        toast.success('Package created');
      }
      setShowModal(false);
      fetchData();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Operation failed');
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this package?')) return;
    try {
      await API.delete(`/packages/${id}`);
      toast.success('Package deleted');
      fetchData();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Delete failed');
    }
  };

  if (loading) return <Loading />;

  return (
    <>
      <div className="dashboard-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div><h1>Packages</h1><p>Manage tour packages</p></div>
        <button className="btn btn-primary" onClick={openCreate}><FiPlus /> Add Package</button>
      </div>

      <div className="table-container card">
        <table>
          <thead>
            <tr><th>Title</th><th>Destination</th><th>Duration</th><th>Price</th><th>Category</th><th>Rating</th><th>Actions</th></tr>
          </thead>
          <tbody>
            {packages.map((pkg) => (
              <tr key={pkg._id}>
                <td style={{ fontWeight: 600 }}>{pkg.title}</td>
                <td>{pkg.destination?.name}</td>
                <td>{pkg.duration} days</td>
                <td>${pkg.price}</td>
                <td>{pkg.category}</td>
                <td>★ {pkg.rating}</td>
                <td className="table-actions">
                  <button className="btn btn-outline btn-sm" onClick={() => openEdit(pkg)}><FiEdit2 /></button>
                  <button className="btn btn-danger btn-sm" onClick={() => handleDelete(pkg._id)}><FiTrash2 /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h2>{editId ? 'Edit Package' : 'Add Package'}</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Title</label>
                <input className="form-control" required value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Destination</label>
                  <select className="form-control" required value={form.destination} onChange={(e) => setForm({ ...form, destination: e.target.value })}>
                    <option value="">Select</option>
                    {destinations.map((d) => <option key={d._id} value={d._id}>{d.name}</option>)}
                  </select>
                </div>
                <div className="form-group">
                  <label>Category</label>
                  <select className="form-control" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}>
                    <option value="adventure">Adventure</option>
                    <option value="cultural">Cultural</option>
                    <option value="beach">Beach</option>
                    <option value="wildlife">Wildlife</option>
                    <option value="luxury">Luxury</option>
                    <option value="budget">Budget</option>
                    <option value="honeymoon">Honeymoon</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Tour Type</label>
                  <select className="form-control" value={form.tourType || 'international'} onChange={(e) => setForm({ ...form, tourType: e.target.value })}>
                    <option value="domestic">Domestic</option>
                    <option value="international">International</option>
                  </select>
                </div>
              </div>
              <div className="form-group">
                <label>Description</label>
                <textarea className="form-control" required value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Duration (days)</label>
                  <input type="number" className="form-control" required value={form.duration} onChange={(e) => setForm({ ...form, duration: e.target.value })} />
                </div>
                <div className="form-group">
                  <label>Price ($)</label>
                  <input type="number" className="form-control" required value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Difficulty</label>
                  <select className="form-control" value={form.difficulty} onChange={(e) => setForm({ ...form, difficulty: e.target.value })}>
                    <option value="easy">Easy</option>
                    <option value="moderate">Moderate</option>
                    <option value="challenging">Challenging</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Max Group Size</label>
                  <input type="number" className="form-control" value={form.maxGroupSize} onChange={(e) => setForm({ ...form, maxGroupSize: e.target.value })} />
                </div>
              </div>
              <div className="form-group">
                <label>Inclusions (comma separated)</label>
                <input className="form-control" value={form.inclusions} onChange={(e) => setForm({ ...form, inclusions: e.target.value })} />
              </div>
              <div className="form-group">
                <label>Exclusions (comma separated)</label>
                <input className="form-control" value={form.exclusions} onChange={(e) => setForm({ ...form, exclusions: e.target.value })} />
              </div>
              <div className="form-group">
                <label>Image URLs (comma separated)</label>
                <input className="form-control" value={form.images} onChange={(e) => setForm({ ...form, images: e.target.value })} />
              </div>
              <label style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
                <input type="checkbox" checked={form.isFeatured} onChange={(e) => setForm({ ...form, isFeatured: e.target.checked })} />
                Featured Package
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

export default ManagePackages;
