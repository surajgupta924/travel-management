import { useState, useEffect } from 'react';
import { FiPlus, FiEdit2, FiTrash2 } from 'react-icons/fi';
import toast from 'react-hot-toast';
import API from '../../services/api';
import Loading from '../../components/Loading';

const emptyForm = { title: '', excerpt: '', content: '', image: '', category: 'travel-tips', author: 'TravelEase Team', tags: '', isPublished: true };

const ManageBlogs = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [editId, setEditId] = useState(null);

  const fetchData = () => {
    API.get('/blogs/admin/all').then((res) => setItems(res.data.data)).finally(() => setLoading(false));
  };

  useEffect(() => { fetchData(); }, []);

  const openCreate = () => { setForm(emptyForm); setEditId(null); setShowModal(true); };
  const openEdit = (item) => {
    setForm({ ...item, tags: item.tags?.join(', ') || '' });
    setEditId(item._id);
    setShowModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = { ...form, tags: form.tags.split(',').map((s) => s.trim()).filter(Boolean) };
    try {
      if (editId) { await API.put(`/blogs/${editId}`, payload); toast.success('Blog updated'); }
      else { await API.post('/blogs', payload); toast.success('Blog created'); }
      setShowModal(false);
      fetchData();
    } catch (err) { toast.error(err.response?.data?.message || 'Failed'); }
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this blog?')) return;
    try { await API.delete(`/blogs/${id}`); toast.success('Deleted'); fetchData(); }
    catch (err) { toast.error('Delete failed'); }
  };

  if (loading) return <Loading />;

  return (
    <>
      <div className="dashboard-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div><h1>Blog Posts</h1><p>Manage travel articles and guides</p></div>
        <button className="btn btn-primary" onClick={openCreate}><FiPlus /> Add Post</button>
      </div>
      <div className="table-container card">
        <table>
          <thead><tr><th>Title</th><th>Category</th><th>Status</th><th>Date</th><th>Actions</th></tr></thead>
          <tbody>
            {items.map((b) => (
              <tr key={b._id}>
                <td style={{ fontWeight: 600 }}>{b.title}</td>
                <td>{b.category}</td>
                <td><span className={`badge badge-${b.isPublished ? 'confirmed' : 'pending'}`}>{b.isPublished ? 'Published' : 'Draft'}</span></td>
                <td>{new Date(b.createdAt).toLocaleDateString()}</td>
                <td className="table-actions">
                  <button className="btn btn-outline btn-sm" onClick={() => openEdit(b)}><FiEdit2 /></button>
                  <button className="btn btn-danger btn-sm" onClick={() => handleDelete(b._id)}><FiTrash2 /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal modal-lg" onClick={(e) => e.stopPropagation()}>
            <h2>{editId ? 'Edit Blog' : 'Add Blog'}</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group"><label>Title</label><input className="form-control" required value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} /></div>
              <div className="form-row">
                <div className="form-group"><label>Category</label>
                  <select className="form-control" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}>
                    <option value="travel-tips">Travel Tips</option><option value="destination-guide">Destination Guide</option><option value="news">News</option><option value="visa-guide">Visa Guide</option>
                  </select>
                </div>
                <div className="form-group"><label>Author</label><input className="form-control" value={form.author} onChange={(e) => setForm({ ...form, author: e.target.value })} /></div>
              </div>
              <div className="form-group"><label>Excerpt</label><textarea className="form-control" rows={2} required value={form.excerpt} onChange={(e) => setForm({ ...form, excerpt: e.target.value })} /></div>
              <div className="form-group"><label>Content</label><textarea className="form-control" rows={8} required value={form.content} onChange={(e) => setForm({ ...form, content: e.target.value })} /></div>
              <div className="form-group"><label>Image URL</label><input className="form-control" value={form.image} onChange={(e) => setForm({ ...form, image: e.target.value })} /></div>
              <div className="form-group"><label>Tags (comma separated)</label><input className="form-control" value={form.tags} onChange={(e) => setForm({ ...form, tags: e.target.value })} /></div>
              <label className="checkbox-label"><input type="checkbox" checked={form.isPublished} onChange={(e) => setForm({ ...form, isPublished: e.target.checked })} /> Published</label>
              <div className="modal-actions"><button type="button" className="btn btn-outline" onClick={() => setShowModal(false)}>Cancel</button><button type="submit" className="btn btn-primary">Save</button></div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default ManageBlogs;
