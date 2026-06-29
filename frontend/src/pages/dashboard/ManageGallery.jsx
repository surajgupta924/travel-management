import { useState, useEffect } from 'react';
import { FiPlus, FiEdit2, FiTrash2 } from 'react-icons/fi';
import toast from 'react-hot-toast';
import API from '../../services/api';
import Loading from '../../components/Loading';

const emptyForm = { title: '', image: '', category: 'destinations', caption: '', isFeatured: false, isActive: true };

const ManageGallery = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [editId, setEditId] = useState(null);

  const fetchData = () => {
    API.get('/gallery/admin/all').then((res) => setItems(res.data.data)).finally(() => setLoading(false));
  };

  useEffect(() => { fetchData(); }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editId) { await API.put(`/gallery/${editId}`, form); toast.success('Updated'); }
      else { await API.post('/gallery', form); toast.success('Created'); }
      setShowModal(false);
      fetchData();
    } catch (err) { toast.error('Failed'); }
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete?')) return;
    await API.delete(`/gallery/${id}`);
    toast.success('Deleted');
    fetchData();
  };

  if (loading) return <Loading />;

  return (
    <>
      <div className="dashboard-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div><h1>Gallery</h1><p>Manage travel photos</p></div>
        <button className="btn btn-primary" onClick={() => { setForm(emptyForm); setEditId(null); setShowModal(true); }}><FiPlus /> Add Image</button>
      </div>
      <div className="gallery-admin-grid">
        {items.map((g) => (
          <div key={g._id} className="gallery-admin-item">
            <img src={g.image} alt={g.title} />
            <div className="gallery-admin-info">
              <strong>{g.title}</strong>
              <span>{g.category}</span>
              <div className="table-actions">
                <button className="btn btn-outline btn-sm" onClick={() => { setForm(g); setEditId(g._id); setShowModal(true); }}><FiEdit2 /></button>
                <button className="btn btn-danger btn-sm" onClick={() => handleDelete(g._id)}><FiTrash2 /></button>
              </div>
            </div>
          </div>
        ))}
      </div>
      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h2>{editId ? 'Edit' : 'Add'} Gallery Item</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group"><label>Title</label><input className="form-control" required value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} /></div>
              <div className="form-group"><label>Image URL</label><input className="form-control" required value={form.image} onChange={(e) => setForm({ ...form, image: e.target.value })} /></div>
              <div className="form-group"><label>Category</label>
                <select className="form-control" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}>
                  {['destinations', 'culture', 'wildlife', 'hotels', 'adventure'].map((c) => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div className="form-group"><label>Caption</label><input className="form-control" value={form.caption} onChange={(e) => setForm({ ...form, caption: e.target.value })} /></div>
              <label className="checkbox-label"><input type="checkbox" checked={form.isFeatured} onChange={(e) => setForm({ ...form, isFeatured: e.target.checked })} /> Featured</label>
              <div className="modal-actions"><button type="button" className="btn btn-outline" onClick={() => setShowModal(false)}>Cancel</button><button type="submit" className="btn btn-primary">Save</button></div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default ManageGallery;
