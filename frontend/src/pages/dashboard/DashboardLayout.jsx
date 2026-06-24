import { NavLink, Outlet } from 'react-router-dom';
import { FiHome, FiPackage, FiMapPin, FiHome as FiHotel, FiCalendar, FiUsers, FiMail, FiArrowLeft } from 'react-icons/fi';
import { useAuth } from '../../context/AuthContext';

const DashboardLayout = () => {
  const { isAdmin } = useAuth();

  return (
    <div className="dashboard-layout">
      <aside className="sidebar">
        <div className="sidebar-brand">Admin Panel</div>
        <ul className="sidebar-nav">
          <li><NavLink to="/dashboard" end><FiHome /> Overview</NavLink></li>
          <li><NavLink to="/dashboard/packages"><FiPackage /> Packages</NavLink></li>
          <li><NavLink to="/dashboard/destinations"><FiMapPin /> Destinations</NavLink></li>
          <li><NavLink to="/dashboard/hotels"><FiHotel /> Hotels</NavLink></li>
          <li><NavLink to="/dashboard/bookings"><FiCalendar /> Bookings</NavLink></li>
          <li><NavLink to="/dashboard/inquiries"><FiMail /> Inquiries</NavLink></li>
          {isAdmin && <li><NavLink to="/dashboard/users"><FiUsers /> Users</NavLink></li>}
          <li><NavLink to="/"><FiArrowLeft /> Back to Site</NavLink></li>
        </ul>
      </aside>
      <main className="dashboard-content">
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;
