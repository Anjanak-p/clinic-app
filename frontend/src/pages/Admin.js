import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { appointmentsAPI } from '../utils/api';
import toast from 'react-hot-toast';
import { FaTooth, FaSignOutAlt, FaCalendarAlt, FaSearch, FaChevronLeft, FaChevronRight, FaSync } from 'react-icons/fa';

const STATUS_OPTIONS = ['pending', 'confirmed', 'cancelled'];

export default function Admin() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [appointments, setAppointments] = useState([]);
  const [pagination, setPagination] = useState({ page: 1, pages: 1, total: 0 });
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [updatingId, setUpdatingId] = useState(null);

  const fetchAppointments = useCallback(async (page = 1) => {
    setLoading(true);
    try {
      const res = await appointmentsAPI.getAll(page, 10);
      setAppointments(res.data.data);
      setPagination(res.data.pagination);
    } catch {
      toast.error('Failed to load appointments');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchAppointments(1); }, [fetchAppointments]);

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
    toast.success('Logged out successfully');
  };

  const handleStatusChange = async (id, status) => {
    setUpdatingId(id);
    try {
      await appointmentsAPI.updateStatus(id, status);
      setAppointments(prev => prev.map(a => a._id === id ? { ...a, status } : a));
      toast.success(`Status updated to ${status}`);
    } catch {
      toast.error('Failed to update status');
    } finally {
      setUpdatingId(null);
    }
  };

  const filtered = appointments.filter(a => {
    const matchSearch = !search || [a.patientName, a.email, a.service, a.doctor]
      .some(v => v?.toLowerCase().includes(search.toLowerCase()));
    const matchStatus = !statusFilter || a.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const stats = {
    total: pagination.total,
    pending: appointments.filter(a => a.status === 'pending').length,
    confirmed: appointments.filter(a => a.status === 'confirmed').length,
    cancelled: appointments.filter(a => a.status === 'cancelled').length,
  };

  return (
    <div className="admin-page">
      {/* Sidebar */}
      <aside className="admin-sidebar">
        <div className="sidebar-logo">
          <FaTooth className="logo-icon" />
          <span>Dental<strong>Care</strong></span>
        </div>
        <nav className="sidebar-nav">
          <div className="sidebar-item active"><FaCalendarAlt /> Appointments</div>
        </nav>
        <div className="sidebar-footer">
          <div className="admin-user">
            <div className="avatar">{user?.username?.[0]?.toUpperCase()}</div>
            <div>
              <div className="admin-name">{user?.username}</div>
              <div className="admin-role">Administrator</div>
            </div>
          </div>
          <button className="logout-btn" onClick={handleLogout}><FaSignOutAlt /></button>
        </div>
      </aside>

      {/* Main */}
      <main className="admin-main">
        <div className="admin-topbar">
          <div>
            <h1>Appointments</h1>
            <p>Manage and track all patient appointments</p>
          </div>
          <button className="btn btn-outline refresh-btn" onClick={() => fetchAppointments(pagination.page)}>
            <FaSync /> Refresh
          </button>
        </div>

        {/* Stats */}
        <div className="admin-stats">
          {[
            { label: 'Total', value: stats.total, color: '#0f8b8d' },
            { label: 'Pending', value: stats.pending, color: '#d97706' },
            { label: 'Confirmed', value: stats.confirmed, color: '#059669' },
            { label: 'Cancelled', value: stats.cancelled, color: '#dc2626' },
          ].map(s => (
            <div key={s.label} className="stat-card">
              <div className="stat-num" style={{ color: s.color }}>{s.value}</div>
              <div className="stat-lbl">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Filters */}
        <div className="admin-filters">
          <div className="search-wrap">
            <FaSearch className="search-icon" />
            <input
              placeholder="Search by name, email, service..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="search-input"
            />
          </div>
          <select
            value={statusFilter}
            onChange={e => setStatusFilter(e.target.value)}
            className="status-filter"
          >
            <option value="">All Status</option>
            {STATUS_OPTIONS.map(s => <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>)}
          </select>
        </div>

        {/* Table */}
        <div className="table-wrap">
          {loading ? (
            <div className="loading-rows">
              {[0,1,2,3,4].map(i => <div key={i} className="skeleton" style={{ height: 56, borderRadius: 8, marginBottom: 8 }} />)}
            </div>
          ) : filtered.length === 0 ? (
            <div className="empty-state">
              <FaCalendarAlt />
              <p>No appointments found</p>
            </div>
          ) : (
            <table className="appt-table">
              <thead>
                <tr>
                  <th>Patient</th>
                  <th>Contact</th>
                  <th>Service</th>
                  <th>Doctor</th>
                  <th>Date</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map(a => (
                  <tr key={a._id}>
                    <td>
                      <div className="patient-cell">
                        <div className="patient-avatar">{a.patientName?.[0]}</div>
                        <div>
                          <div className="patient-name">{a.patientName}</div>
                          <div className="patient-id">#{a._id.slice(-6)}</div>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div className="contact-cell">
                        <div>{a.email}</div>
                        <div className="phone">{a.phone}</div>
                      </div>
                    </td>
                    <td>{a.service}</td>
                    <td>{a.doctor}</td>
                    <td>{new Date(a.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</td>
                    <td><span className={`badge badge-${a.status}`}>{a.status}</span></td>
                    <td>
                      {updatingId === a._id ? (
                        <span className="updating">Updating...</span>
                      ) : (
                        <select
                          value={a.status}
                          onChange={e => handleStatusChange(a._id, e.target.value)}
                          className="status-select"
                        >
                          {STATUS_OPTIONS.map(s => <option key={s} value={s}>{s}</option>)}
                        </select>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {/* Pagination */}
        {pagination.pages > 1 && (
          <div className="pagination">
            <button
              className="page-btn"
              disabled={pagination.page <= 1}
              onClick={() => fetchAppointments(pagination.page - 1)}
            >
              <FaChevronLeft />
            </button>
            <span className="page-info">Page {pagination.page} of {pagination.pages}</span>
            <button
              className="page-btn"
              disabled={pagination.page >= pagination.pages}
              onClick={() => fetchAppointments(pagination.page + 1)}
            >
              <FaChevronRight />
            </button>
          </div>
        )}
      </main>

      <style>{`
        .admin-page {
          display: grid;
          grid-template-columns: 260px 1fr;
          min-height: 100vh;
          background: #f8fafc;
          font-family: var(--font-body);
        }
        .admin-sidebar {
          background: var(--charcoal);
          display: flex;
          flex-direction: column;
          padding: 0;
          position: sticky;
          top: 0;
          height: 100vh;
        }
        .sidebar-logo {
          display: flex;
          align-items: center;
          gap: 10px;
          font-family: var(--font-display);
          font-size: 1.3rem;
          color: white;
          padding: 28px 24px;
          border-bottom: 1px solid rgba(255,255,255,0.08);
        }
        .sidebar-logo .logo-icon { color: var(--teal-light); font-size: 1.5rem; }
        .sidebar-nav { flex: 1; padding: 24px 12px; }
        .sidebar-item {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 12px 16px;
          border-radius: 10px;
          color: rgba(255,255,255,0.6);
          cursor: pointer;
          font-size: 0.92rem;
          font-weight: 500;
          transition: var(--transition);
        }
        .sidebar-item.active, .sidebar-item:hover {
          background: rgba(15,139,141,0.2);
          color: var(--teal-light);
        }
        .sidebar-footer {
          padding: 20px;
          border-top: 1px solid rgba(255,255,255,0.08);
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .admin-user { flex: 1; display: flex; align-items: center; gap: 10px; }
        .avatar {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background: var(--teal);
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 700;
          font-size: 0.9rem;
        }
        .admin-name { color: white; font-size: 0.88rem; font-weight: 600; }
        .admin-role { color: rgba(255,255,255,0.4); font-size: 0.75rem; }
        .logout-btn {
          background: rgba(255,255,255,0.08);
          border: none;
          color: rgba(255,255,255,0.6);
          width: 36px;
          height: 36px;
          border-radius: 8px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: var(--transition);
        }
        .logout-btn:hover { background: rgba(239,68,68,0.2); color: #ef4444; }
        .admin-main { padding: 36px; overflow-x: auto; }
        .admin-topbar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 32px;
        }
        .admin-topbar h1 { font-size: 1.6rem; font-weight: 700; margin-bottom: 4px; }
        .admin-topbar p { color: var(--text-light); font-size: 0.88rem; }
        .refresh-btn { font-size: 0.85rem; padding: 10px 18px; }
        .admin-stats {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 20px;
          margin-bottom: 28px;
        }
        .stat-card {
          background: white;
          border-radius: var(--radius);
          padding: 24px;
          box-shadow: var(--shadow-sm);
          text-align: center;
        }
        .stat-num { font-size: 2rem; font-weight: 700; margin-bottom: 4px; }
        .stat-lbl { font-size: 0.82rem; color: var(--text-light); text-transform: uppercase; letter-spacing: 0.05em; }
        .admin-filters {
          display: flex;
          gap: 16px;
          margin-bottom: 20px;
        }
        .search-wrap {
          flex: 1;
          position: relative;
        }
        .search-icon { position: absolute; left: 14px; top: 50%; transform: translateY(-50%); color: var(--text-light); }
        .search-input {
          width: 100%;
          padding: 12px 16px 12px 40px;
          border: 2px solid var(--border);
          border-radius: var(--radius-sm);
          font-family: var(--font-body);
          font-size: 0.92rem;
          outline: none;
          transition: var(--transition);
        }
        .search-input:focus { border-color: var(--teal); }
        .status-filter {
          padding: 12px 16px;
          border: 2px solid var(--border);
          border-radius: var(--radius-sm);
          font-family: var(--font-body);
          font-size: 0.92rem;
          outline: none;
          cursor: pointer;
          min-width: 160px;
        }
        .table-wrap {
          background: white;
          border-radius: var(--radius);
          box-shadow: var(--shadow-sm);
          overflow: hidden;
        }
        .appt-table { width: 100%; border-collapse: collapse; }
        .appt-table th {
          text-align: left;
          padding: 14px 16px;
          font-size: 0.78rem;
          font-weight: 700;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          color: var(--text-light);
          background: #f8fafc;
          border-bottom: 1px solid var(--border);
        }
        .appt-table td {
          padding: 14px 16px;
          font-size: 0.88rem;
          border-bottom: 1px solid #f1f5f9;
          vertical-align: middle;
        }
        .appt-table tr:last-child td { border-bottom: none; }
        .appt-table tr:hover td { background: #f8fafc; }
        .patient-cell { display: flex; align-items: center; gap: 10px; }
        .patient-avatar {
          width: 34px; height: 34px;
          background: var(--teal-pale);
          color: var(--teal);
          border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          font-weight: 700; font-size: 0.9rem; flex-shrink: 0;
        }
        .patient-name { font-weight: 600; font-size: 0.9rem; }
        .patient-id { font-size: 0.75rem; color: var(--text-light); }
        .contact-cell div:first-child { font-size: 0.87rem; }
        .phone { font-size: 0.78rem; color: var(--text-light); }
        .status-select {
          padding: 6px 10px;
          border: 1.5px solid var(--border);
          border-radius: 6px;
          font-family: var(--font-body);
          font-size: 0.82rem;
          cursor: pointer;
          outline: none;
        }
        .updating { font-size: 0.82rem; color: var(--text-light); }
        .empty-state {
          text-align: center;
          padding: 60px;
          color: var(--text-light);
        }
        .empty-state svg { font-size: 2.5rem; margin-bottom: 12px; opacity: 0.3; }
        .pagination {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 16px;
          margin-top: 24px;
        }
        .page-btn {
          width: 36px; height: 36px;
          border: 2px solid var(--border);
          border-radius: 8px;
          background: white;
          cursor: pointer;
          display: flex; align-items: center; justify-content: center;
          transition: var(--transition);
        }
        .page-btn:hover:not(:disabled) { border-color: var(--teal); color: var(--teal); }
        .page-btn:disabled { opacity: 0.4; cursor: not-allowed; }
        .page-info { font-size: 0.88rem; color: var(--text-mid); }
        @media (max-width: 1024px) {
          .admin-page { grid-template-columns: 1fr; }
          .admin-sidebar { display: none; }
          .admin-stats { grid-template-columns: repeat(2, 1fr); }
          .admin-main { padding: 20px; }
        }
      `}</style>
    </div>
  );
}
