import { NavLink, Outlet } from 'react-router-dom';
import { FiHome, FiPackage, FiMapPin, FiHome as FiHotel, FiCalendar, FiUsers, FiMail, FiArrowLeft, FiFileText, FiImage, FiMessageCircle, FiInbox, FiStar } from 'react-icons/fi';
import { useAuth } from '../../context/AuthContext';

const DashboardLayout = () => {
  const { isAdmin } = useAuth();

  return (
    <div className="dashboard-layout">
      <aside className="sidebar">
        <div className="sidebar-brand">
          <span>TravelEase</span>
          <small>Admin Panel</small>
        </div>
        <ul className="sidebar-nav">
          <li><NavLink to="/dashboard" end><FiHome /> Overview</NavLink></li>
          <li className="sidebar-divider">Content</li>
          <li><NavLink to="/dashboard/packages"><FiPackage /> Packages</NavLink></li>
          <li><NavLink to="/dashboard/destinations"><FiMapPin /> Destinations</NavLink></li>
          <li><NavLink to="/dashboard/hotels"><FiHotel /> Hotels</NavLink></li>
          <li><NavLink to="/dashboard/blogs"><FiFileText /> Blog Posts</NavLink></li>
          <li><NavLink to="/dashboard/gallery"><FiImage /> Gallery</NavLink></li>
          <li><NavLink to="/dashboard/testimonials"><FiMessageCircle /> Testimonials</NavLink></li>
          <li className="sidebar-divider">Operations</li>
          <li><NavLink to="/dashboard/bookings"><FiCalendar /> Bookings</NavLink></li>
          <li><NavLink to="/dashboard/inquiries"><FiMail /> Inquiries</NavLink></li>
          <li><NavLink to="/dashboard/reviews"><FiStar /> Reviews</NavLink></li>
          <li><NavLink to="/dashboard/newsletter"><FiInbox /> Newsletter</NavLink></li>
          {isAdmin && (
            <>
              <li className="sidebar-divider">Admin</li>
              <li><NavLink to="/dashboard/users"><FiUsers /> Users</NavLink></li>
            </>
          )}
          <li className="sidebar-divider" />
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
