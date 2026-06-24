import { useState, useEffect } from 'react';
import { FiUsers, FiPackage, FiCalendar, FiDollarSign } from 'react-icons/fi';
import API from '../../services/api';
import Loading from '../../components/Loading';

const DashboardHome = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    API.get('/dashboard/stats')
      .then((res) => setData(res.data.data))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <Loading />;
  const { stats, recentBookings, topPackages } = data;

  return (
    <>
      <div className="dashboard-header">
        <h1>Dashboard</h1>
        <p>Welcome to TravelEase management panel</p>
      </div>

      <div className="stats-grid">
        <div className="card stat-card">
          <div className="stat-icon blue"><FiUsers /></div>
          <div className="stat-info"><h3>{stats.totalUsers}</h3><p>Customers</p></div>
        </div>
        <div className="card stat-card">
          <div className="stat-icon green"><FiPackage /></div>
          <div className="stat-info"><h3>{stats.totalPackages}</h3><p>Packages</p></div>
        </div>
        <div className="card stat-card">
          <div className="stat-icon orange"><FiCalendar /></div>
          <div className="stat-info"><h3>{stats.totalBookings}</h3><p>Bookings</p></div>
        </div>
        <div className="card stat-card">
          <div className="stat-icon purple"><FiDollarSign /></div>
          <div className="stat-info"><h3>${stats.totalRevenue.toLocaleString()}</h3><p>Revenue</p></div>
        </div>
      </div>

      <div className="grid-2">
        <div className="card">
          <div className="card-body">
            <h3 style={{ marginBottom: 16 }}>Recent Bookings</h3>
            <div className="table-container">
              <table>
                <thead>
                  <tr><th>Ref</th><th>Customer</th><th>Package</th><th>Status</th></tr>
                </thead>
                <tbody>
                  {recentBookings.map((b) => (
                    <tr key={b._id}>
                      <td>{b.bookingReference}</td>
                      <td>{b.user?.name}</td>
                      <td>{b.tourPackage?.title}</td>
                      <td><span className={`badge badge-${b.status}`}>{b.status}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="card-body">
            <h3 style={{ marginBottom: 16 }}>Top Packages</h3>
            {topPackages.map((pkg) => (
              <div key={pkg._id} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid var(--gray-100)' }}>
                <div>
                  <div style={{ fontWeight: 600, fontSize: 14 }}>{pkg.title}</div>
                  <div style={{ fontSize: 13, color: 'var(--gray-500)' }}>{pkg.destination?.name}</div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ color: 'var(--warning)', fontWeight: 600 }}>★ {pkg.rating}</div>
                  <div style={{ fontSize: 13, color: 'var(--primary)' }}>${pkg.price}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default DashboardHome;
