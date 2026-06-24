import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Loading from './Loading';

const ProtectedRoute = ({ children, staffOnly = false }) => {
  const { user, loading, isStaff } = useAuth();

  if (loading) return <Loading />;

  if (!user) return <Navigate to="/login" replace />;

  if (staffOnly && !isStaff) return <Navigate to="/" replace />;

  return children;
};

export default ProtectedRoute;
