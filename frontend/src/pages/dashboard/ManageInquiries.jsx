import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import API from '../../services/api';
import Loading from '../../components/Loading';

const ManageInquiries = () => {
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(null);
  const [response, setResponse] = useState('');

  const fetchInquiries = () => {
    API.get('/inquiries').then((res) => setInquiries(res.data.data)).finally(() => setLoading(false));
  };

  useEffect(() => { fetchInquiries(); }, []);

  const handleRespond = async (id) => {
    try {
      await API.put(`/inquiries/${id}`, { status: 'resolved', response });
      toast.success('Response sent');
      setSelected(null);
      setResponse('');
      fetchInquiries();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed');
    }
  };

  const updateStatus = async (id, status) => {
    try {
      await API.put(`/inquiries/${id}`, { status });
      toast.success('Status updated');
      fetchInquiries();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed');
    }
  };

  if (loading) return <Loading />;

  return (
    <>
      <div className="dashboard-header">
        <h1>Inquiries</h1>
        <p>Manage customer inquiries and messages</p>
      </div>

      <div className="table-container card">
        <table>
          <thead>
            <tr><th>Name</th><th>Email</th><th>Subject</th><th>Date</th><th>Status</th><th>Actions</th></tr>
          </thead>
          <tbody>
            {inquiries.map((inq) => (
              <tr key={inq._id}>
                <td style={{ fontWeight: 600 }}>{inq.name}</td>
                <td>{inq.email}</td>
                <td>{inq.subject}</td>
                <td>{new Date(inq.createdAt).toLocaleDateString()}</td>
                <td><span className={`badge badge-${inq.status === 'new' ? 'new' : 'confirmed'}`}>{inq.status}</span></td>
                <td className="table-actions">
                  <button className="btn btn-outline btn-sm" onClick={() => { setSelected(inq); setResponse(inq.response || ''); }}>View</button>
                  {inq.status === 'new' && (
                    <button className="btn btn-primary btn-sm" onClick={() => updateStatus(inq._id, 'in_progress')}>Start</button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selected && (
        <div className="modal-overlay" onClick={() => setSelected(null)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h2>{selected.subject}</h2>
            <p style={{ color: 'var(--gray-500)', marginBottom: 16 }}>From: {selected.name} ({selected.email})</p>
            <div className="card card-body" style={{ marginBottom: 16, background: 'var(--gray-100)' }}>
              <p>{selected.message}</p>
            </div>
            <div className="form-group">
              <label>Your Response</label>
              <textarea className="form-control" rows={4} value={response} onChange={(e) => setResponse(e.target.value)} />
            </div>
            <div className="modal-actions">
              <button className="btn btn-outline" onClick={() => setSelected(null)}>Close</button>
              <button className="btn btn-primary" onClick={() => handleRespond(selected._id)}>Send Response</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ManageInquiries;
