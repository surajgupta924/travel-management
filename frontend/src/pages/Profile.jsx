import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiUser, FiMail, FiPhone, FiShield, FiCalendar } from 'react-icons/fi';
import toast from 'react-hot-toast';
import API from '../services/api';
import { getErrorMessage } from '../utils/getErrorMessage';
import { useAuth } from '../context/AuthContext';
import { getWishlist } from '../utils/wishlist';

const Profile = () => {
  const { user, updateUser } = useAuth();
  const [form, setForm] = useState({ name: user?.name || '', phone: user?.phone || '' });
  const [passwordForm, setPasswordForm] = useState({ currentPassword: '', newPassword: '', confirmPassword: '' });
  const [saving, setSaving] = useState(false);
  const [bookingStats, setBookingStats] = useState({ total: 0, confirmed: 0, pending: 0 });
  const [wishlistCount, setWishlistCount] = useState(0);

  useEffect(() => {
    API.get('/bookings').then((res) => {
      const bookings = res.data.data;
      setBookingStats({
        total: bookings.length,
        confirmed: bookings.filter((b) => b.status === 'confirmed').length,
        pending: bookings.filter((b) => b.status === 'pending').length,
      });
    }).catch(() => {});
    setWishlistCount(getWishlist().length);
  }, []);

  const handleUpdate = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await API.put('/auth/profile', form);
      updateUser(res.data.data);
      toast.success('Profile updated successfully');
    } catch (err) {
      toast.error(getErrorMessage(err, 'Update failed'));
    } finally {
      setSaving(false);
    }
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }
    setSaving(true);
    try {
      await API.put('/auth/change-password', {
        currentPassword: passwordForm.currentPassword,
        newPassword: passwordForm.newPassword,
      });
      toast.success('Password changed successfully');
      setPasswordForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
    } catch (err) {
      toast.error(getErrorMessage(err, 'Password change failed'));
    } finally {
      setSaving(false);
    }
  };

  const initials = user?.name?.split(' ').map((n) => n[0]).join('').toUpperCase().slice(0, 2);

  return (
    <div className="page-wrap">
      <div className="page-hero">
        <div className="container">
          <h1>My Profile</h1>
          <p>Manage your account, security, and travel preferences</p>
        </div>
      </div>

      <div className="container section">
        <div className="profile-layout">
          <div className="profile-sidebar">
            <div className="card card-body profile-card">
              <div className="profile-avatar">{initials}</div>
              <h2>{user?.name}</h2>
              <p className="muted">{user?.email}</p>
              <span className="badge tag-category">{user?.role}</span>
              <div className="profile-stats">
                <div><strong>{bookingStats.total}</strong><span>Bookings</span></div>
                <div><strong>{bookingStats.confirmed}</strong><span>Confirmed</span></div>
                <div><strong>{wishlistCount}</strong><span>Wishlist</span></div>
              </div>
              <Link to="/bookings" className="btn btn-outline" style={{ width: '100%', marginTop: 16 }}>View My Bookings</Link>
            </div>

            <div className="card card-body">
              <h4>Quick Links</h4>
              <ul className="profile-links">
                <li><Link to="/packages">Browse Packages</Link></li>
                <li><Link to="/packages?wishlist=true">My Wishlist</Link></li>
                <li><Link to="/contact">Get Support</Link></li>
              </ul>
            </div>
          </div>

          <div className="profile-main">
            <div className="card card-body content-block">
              <h3><FiUser /> Personal Information</h3>
              <form onSubmit={handleUpdate}>
                <div className="form-row">
                  <div className="form-group">
                    <label>Full Name</label>
                    <input className="form-control" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
                  </div>
                  <div className="form-group">
                    <label>Phone</label>
                    <input className="form-control" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
                  </div>
                </div>
                <div className="form-group">
                  <label><FiMail /> Email (cannot change)</label>
                  <input className="form-control" value={user?.email} disabled />
                </div>
                <button type="submit" className="btn btn-primary" disabled={saving}>Save Changes</button>
              </form>
            </div>

            <div className="card card-body content-block">
              <h3><FiShield /> Change Password</h3>
              <form onSubmit={handlePasswordChange}>
                <div className="form-group">
                  <label>Current Password</label>
                  <input type="password" className="form-control" required value={passwordForm.currentPassword} onChange={(e) => setPasswordForm({ ...passwordForm, currentPassword: e.target.value })} />
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>New Password</label>
                    <input type="password" className="form-control" required minLength={6} value={passwordForm.newPassword} onChange={(e) => setPasswordForm({ ...passwordForm, newPassword: e.target.value })} />
                  </div>
                  <div className="form-group">
                    <label>Confirm Password</label>
                    <input type="password" className="form-control" required value={passwordForm.confirmPassword} onChange={(e) => setPasswordForm({ ...passwordForm, confirmPassword: e.target.value })} />
                  </div>
                </div>
                <button type="submit" className="btn btn-secondary" disabled={saving}>Update Password</button>
              </form>
            </div>

            <div className="card card-body content-block">
              <h3><FiCalendar /> Account Activity</h3>
              <div className="activity-list">
                <div className="activity-item"><span className="activity-dot green" /> Account created and verified</div>
                <div className="activity-item"><span className="activity-dot blue" /> {bookingStats.total} total bookings made</div>
                <div className="activity-item"><span className="activity-dot orange" /> {bookingStats.pending} pending booking(s)</div>
                <div className="activity-item"><span className="activity-dot purple" /> {wishlistCount} package(s) in wishlist</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
