import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import toast from 'react-hot-toast';
import { FaTooth, FaLock, FaUser } from 'react-icons/fa';

export default function Login() {
  const [form, setForm] = useState({ username: '', password: '' });
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.username || !form.password) {
      toast.error('Please enter username and password');
      return;
    }
    setLoading(true);
    try {
      await login(form.username, form.password);
      toast.success('Welcome back, Admin!');
      navigate('/admin');
    } catch {
      toast.error('Invalid credentials. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-left">
        <FaTooth className="login-logo-icon" />
        <h1>DentalCare Pro</h1>
        <p>Comprehensive clinic management for modern dental practices</p>
        <div className="login-features">
          {['View all appointments', 'Manage patient records', 'Update appointment status', 'Analytics at a glance'].map(f => (
            <div key={f} className="login-feat">✓ {f}</div>
          ))}
        </div>
      </div>

      <div className="login-right">
        <div className="login-box">
          <h2>Admin Login</h2>
          <p className="login-sub">Sign in to access the admin dashboard</p>

          <form onSubmit={handleSubmit} noValidate>
            <div className="form-group">
              <label><FaUser /> Username</label>
              <input
                type="text"
                placeholder="admin"
                value={form.username}
                onChange={e => setForm(f => ({ ...f, username: e.target.value }))}
              />
            </div>
            <div className="form-group">
              <label><FaLock /> Password</label>
              <input
                type="password"
                placeholder="••••••••"
                value={form.password}
                onChange={e => setForm(f => ({ ...f, password: e.target.value }))}
              />
            </div>
            <div className="login-hint">Default: admin / admin123</div>
            <button type="submit" className="btn btn-primary login-btn" disabled={loading}>
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>
        </div>
      </div>

      <style>{`
        .login-page {
          min-height: 100vh;
          display: grid;
          grid-template-columns: 1fr 1fr;
        }
        .login-left {
          background: linear-gradient(135deg, var(--teal), var(--navy));
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding: 60px;
          color: white;
        }
        .login-logo-icon { font-size: 3rem; margin-bottom: 20px; color: var(--teal-light); animation: float 3s ease-in-out infinite; }
        .login-left h1 { font-family: var(--font-display); font-size: 2.4rem; margin-bottom: 12px; }
        .login-left p { color: rgba(255,255,255,0.7); font-size: 1rem; margin-bottom: 40px; }
        .login-features { display: flex; flex-direction: column; gap: 12px; }
        .login-feat { color: rgba(255,255,255,0.85); font-size: 0.95rem; }
        .login-right {
          background: var(--cream);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 40px;
        }
        .login-box {
          background: white;
          border-radius: var(--radius-lg);
          padding: 48px;
          width: 100%;
          max-width: 420px;
          box-shadow: var(--shadow-md);
        }
        .login-box h2 { font-size: 1.6rem; margin-bottom: 6px; }
        .login-sub { color: var(--text-light); font-size: 0.9rem; margin-bottom: 32px; }
        .login-hint { font-size: 0.78rem; color: var(--text-light); background: var(--teal-pale); padding: 8px 12px; border-radius: 8px; margin-bottom: 20px; }
        .login-btn { width: 100%; justify-content: center; padding: 16px; }
        .form-group label { display: flex; align-items: center; gap: 8px; }
        .form-group label svg { color: var(--teal); font-size: 0.8rem; }
        @media (max-width: 768px) {
          .login-page { grid-template-columns: 1fr; }
          .login-left { display: none; }
        }
      `}</style>
    </div>
  );
}
