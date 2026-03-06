import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaBars, FaTimes, FaTooth } from 'react-icons/fa';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => setMenuOpen(false), [location]);

  const links = [
    { to: '/', label: 'Home' },
    { to: '/services', label: 'Services' },
    { to: '/doctors', label: 'Doctors' },
    { to: '/appointment', label: 'Book Now' },
  ];

  return (
    <nav className={navbar ${scrolled ? 'scrolled' : ''}}>
      <div className="container nav-inner">
        <Link to="/" className="nav-logo">
          <FaTooth className="logo-icon" />
          <span>Dental<strong>Care</strong></span>
        </Link>

        <ul className={nav-links ${menuOpen ? 'open' : ''}}>
          {links.map(({ to, label }) => (
            <li key={to}>
              <Link
                to={to}
                className={nav-link ${location.pathname === to ? 'active' : ''} ${label === 'Book Now' ? 'nav-cta' : ''}}
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>

        <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      <style>{`
        .navbar {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 1000;
          padding: 18px 0;
          transition: all 0.3s ease;
        }
        .navbar.scrolled {
          background: rgba(255,255,255,0.96);
          backdrop-filter: blur(12px);
          box-shadow: 0 2px 20px rgba(0,0,0,0.08);
          padding: 12px 0;
        }
        .nav-inner {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .nav-logo {
          display: flex;
          align-items: center;
          gap: 10px;
          font-family: var(--font-display);
          font-size: 1.5rem;
          color: var(--charcoal);
        }
        .logo-icon {
          color: var(--teal);
          font-size: 1.6rem;
          animation: float 3s ease-in-out infinite;
        }
        .nav-links {
          display: flex;
          align-items: center;
          gap: 8px;
          list-style: none;
        }
        .nav-link {
          padding: 8px 18px;
          border-radius: 50px;
          font-weight: 500;
          font-size: 0.95rem;
          color: var(--text-mid);
          transition: var(--transition);
        }
        .nav-link:hover, .nav-link.active {
          color: var(--teal);
          background: var(--teal-pale);
        }
        .nav-cta {
          background: var(--teal);
          color: white !important;
          font-weight: 600;
        }
        .nav-cta:hover {
          background: var(--teal-light) !important;
          color: white !important;
          transform: translateY(-1px);
          box-shadow: 0 6px 20px rgba(15,139,141,0.3);
        }
        .menu-toggle {
          display: none;
          background: none;
          border: none;
          font-size: 1.4rem;
          color: var(--charcoal);
          cursor: pointer;
        }
        @media (max-width: 768px) {
          .menu-toggle { display: block; }
          .nav-links {
            position: fixed;
            top: 0; right: 0; bottom: 0;
            width: 280px;
            flex-direction: column;
            justify-content: center;
            background: white;
            box-shadow: -4px 0 30px rgba(0,0,0,0.15);
            transform: translateX(100%);
            transition: transform 0.35s cubic-bezier(0.4,0,0.2,1);
          }
          .nav-links.open { transform: translateX(0); }
          .nav-link { font-size: 1.1rem; padding: 12px 28px; }
        }
      `}</style>
    </nav>
  );
}