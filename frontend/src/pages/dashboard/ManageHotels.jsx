import { useState, useEffect } from 'react';
import { FiPlus, FiEdit2, FiTrash2 } from 'react-icons/fi';
import toast from 'react-hot-toast';
import API from '../../services/api';
import Loading from '../../components/Loading';

const emptyForm = {
  name: '', destination: '', description: '', address: '', starRating: 3,
  pricePerNight: 0, amenities: '', image: '', totalRooms: 10, availableRooms: 10,
};

const ManageHotels = () => {
  const [hotels, setHotels] = useState([]);
  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [editId, setEditId] = useState(null);

  const fetchData = () => {
    Promise.all([API.get('/hotels'), API.get('/destinations')])
      .then(([hRes, dRes]) => {
        setHotels(hRes.data.data);
        setDestinations(dRes.data.data);
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => { fetchData(); }, []);

  const openCreate = () => { setForm(emptyForm); setEditId(null); setShowModal(true); };

  const openEdit = (hotel) => {
    setForm({
      ...hotel,
      destination: hotel.destination?._id || hotel.destination,
      amenities: hotel.amenities?.join(', ') || '',
    });
    setEditId(hotel._id);
    setShowModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      ...form,
      starRating: Number(form.starRating),
      pricePerNight: Number(form.pricePerNight),
      totalRooms: Number(form.totalRooms),
      availableRooms: Number(form.availableRooms),
      amenities: form.amenities.split(',').map((s) => s.trim()).filter(Boolean),
    };
    try {
      if (editId) {
        await API.put(`/hotels/${editId}`, payload);
        toast.success('Hotel updated');
      } else {
        await API.post('/hotels', payload);
        toast.success('Hotel created');
      }
      setShowModal(false);
      fetchData();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Operation failed');
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this hotel?')) return;
    try {
      await API.delete(`/hotels/${id}`);
      toast.success('Hotel deleted');
      fetchData();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Delete failed');
    }
  };

  if (loading) return <Loading />;

  return (
    <>
      <div className="dashboard-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div><h1>Hotels</h1><p>Manage hotel listings</p></div>
        <button className="btn btn-primary" onClick={openCreate}><FiPlus /> Add Hotel</button>
      </div>

      <div className="table-container card">
        <table>
          <thead>
            <tr><th>Name</th><th>Destination</th><th>Stars</th><th>Price/Night</th><th>Rooms</th><th>Actions</th></tr>
          </thead>
          <tbody>
            {hotels.map((h) => (
              <tr key={h._id}>
                <td style={{ fontWeight: 600 }}>{h.name}</td>
                <td>{h.destination?.name}</td>
                <td>{'★'.repeat(h.starRating)}</td>
                <td>${h.pricePerNight}</td>
                <td>{h.availableRooms}/{h.totalRooms}</td>
                <td className="table-actions">
                  <button className="btn btn-outline btn-sm" onClick={() => openEdit(h)}><FiEdit2 /></button>
                  <button className="btn btn-danger btn-sm" onClick={() => handleDelete(h._id)}><FiTrash2 /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h2>{editId ? 'Edit Hotel' : 'Add Hotel'}</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Name</label>
                <input className="form-control" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
              </div>
              <div className="form-group">
                <label>Destination</label>
                <select className="form-control" required value={form.destination} onChange={(e) => setForm({ ...form, destination: e.target.value })}>
                  <option value="">Select</option>
                  {destinations.map((d) => <option key={d._id} value={d._id}>{d.name}</option>)}
                </select>
              </div>
              <div className="form-group">
                <label>Description</label>
                <textarea className="form-control" required value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
              </div>
              <div className="form-group">
                <label>Address</label>
                <input className="form-control" required value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} />
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Star Rating</label>
                  <select className="form-control" value={form.starRating} onChange={(e) => setForm({ ...form, starRating: e.target.value })}>
                    {[1, 2, 3, 4, 5].map((n) => <option key={n} value={n}>{n} Star{n > 1 ? 's' : ''}</option>)}
                  </select>
                </div>
                <div className="form-group">
                  <label>Price/Night ($)</label>
                  <input type="number" className="form-control" required value={form.pricePerNight} onChange={(e) => setForm({ ...form, pricePerNight: e.target.value })} />
                </div>
              </div>
              <div className="form-group">
                <label>Amenities (comma separated)</label>
                <input className="form-control" value={form.amenities} onChange={(e) => setForm({ ...form, amenities: e.target.value })} />
              </div>
              <div className="form-group">
                <label>Image URL</label>
                <input className="form-control" value={form.image} onChange={(e) => setForm({ ...form, image: e.target.value })} />
              </div>
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

export default ManageHotels;
