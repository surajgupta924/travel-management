import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import API from '../../services/api';
import Loading from '../../components/Loading';

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    API.get('/auth/users').then((res) => setUsers(res.data.data)).finally(() => setLoading(false));
  }, []);

  const updateUser = async (id, data) => {
    try {
      await API.put(`/auth/users/${id}`, data);
      toast.success('User updated');
      const res = await API.get('/auth/users');
      setUsers(res.data.data);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Update failed');
    }
  };

  const deleteUser = async (id) => {
    if (!confirm('Delete this user?')) return;
    try {
      await API.delete(`/auth/users/${id}`);
      toast.success('User deleted');
      setUsers(users.filter((u) => u._id !== id));
    } catch (err) {
      toast.error(err.response?.data?.message || 'Delete failed');
    }
  };

  if (loading) return <Loading />;

  return (
    <>
      <div className="dashboard-header">
        <h1>Users</h1>
        <p>Manage system users</p>
      </div>

      <div className="table-container card">
        <table>
          <thead>
            <tr><th>Name</th><th>Email</th><th>Phone</th><th>Role</th><th>Status</th><th>Actions</th></tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u._id}>
                <td style={{ fontWeight: 600 }}>{u.name}</td>
                <td>{u.email}</td>
                <td>{u.phone || '—'}</td>
                <td>
                  <select
                    className="form-control"
                    style={{ width: 110, padding: '4px 8px', fontSize: 13 }}
                    value={u.role}
                    onChange={(e) => updateUser(u._id, { role: e.target.value })}
                  >
                    <option value="customer">Customer</option>
                    <option value="agent">Agent</option>
                    <option value="admin">Admin</option>
                  </select>
                </td>
                <td>
                  <select
                    className="form-control"
                    style={{ width: 90, padding: '4px 8px', fontSize: 13 }}
                    value={u.isActive ? 'active' : 'inactive'}
                    onChange={(e) => updateUser(u._id, { isActive: e.target.value === 'active' })}
                  >
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </select>
                </td>
                <td>
                  <button className="btn btn-danger btn-sm" onClick={() => deleteUser(u._id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default ManageUsers;
