import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiMail, FiLock, FiEye, FiEyeOff } from 'react-icons/fi';
import toast from 'react-hot-toast';
import { useAuth } from '../context/AuthContext';
import { getErrorMessage } from '../utils/getErrorMessage';
import AuthLayout from '../components/AuthLayout';

const Login = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const user = await login(form.email.trim(), form.password);
      toast.success(`Welcome back, ${user.name}!`);
      navigate(user.role === 'admin' || user.role === 'agent' ? '/dashboard' : '/');
    } catch (err) {
      toast.error(getErrorMessage(err, 'Login failed'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout
      title="Welcome Back"
      subtitle="Sign in to continue your adventure"
      footer={
        <p className="auth-footer">
          Don&apos;t have an account? <Link to="/register">Create one free</Link>
        </p>
      }
    >
      <form onSubmit={handleSubmit} className="auth-form">
        <div className="form-group">
          <label>Email Address</label>
          <div className="input-icon-wrap">
            <FiMail className="input-icon" />
            <input
              type="email"
              className="form-control"
              placeholder="you@example.com"
              required
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
          </div>
        </div>
        <div className="form-group">
          <label>Password</label>
          <div className="input-icon-wrap">
            <FiLock className="input-icon" />
            <input
              type={showPass ? 'text' : 'password'}
              className="form-control"
              placeholder="Enter your password"
              required
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
            />
            <button type="button" className="input-toggle" onClick={() => setShowPass(!showPass)}>
              {showPass ? <FiEyeOff /> : <FiEye />}
            </button>
          </div>
        </div>
        <button type="submit" className="btn btn-primary btn-lg auth-submit" disabled={loading}>
          {loading ? <span className="btn-spinner" /> : null}
          {loading ? 'Signing in...' : 'Sign In'}
        </button>
      </form>
      <div className="demo-box">
        <span className="demo-label">Demo Account</span>
        <code>admin@travel.com</code> / <code>password123</code>
      </div>
    </AuthLayout>
  );
};

export default Login;
