import { Link } from 'react-router-dom';
import { FaTooth, FaPhone, FaEnvelope, FaMapMarkerAlt, FaClock } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <div className="footer-logo">
              <FaTooth /> Dental<strong>Care</strong>
            </div>
            <p>Your trusted partner for comprehensive dental care. We combine expertise with compassion to give you a smile you love.</p>
          </div>

          <div className="footer-col">
            <h4>Quick Links</h4>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/services">Services</Link></li>
              <li><Link to="/doctors">Our Doctors</Link></li>
              <li><Link to="/appointment">Book Appointment</Link></li>
              <li><Link to="/admin">Admin Panel</Link></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>Contact Us</h4>
            <ul className="contact-list">
              <li><FaMapMarkerAlt /> 123 Dental Plaza, Suite 100<br />New York, NY 10001</li>
              <li><FaPhone /> +91 8847119869</li>
              <li><FaEnvelope /> hello@dentalcarepro.com</li>
              <li><FaClock /> Mon–Fri: 8am–6pm<br />Sat: 9am–3pm</li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} DentalCare Pro. All rights reserved.</p>
        </div>
      </div>

      <style>{`
        .footer {
          background: var(--charcoal);
          color: rgba(255,255,255,0.75);
          padding: 72px 0 0;
          margin-top: 80px;
        }
        .footer-grid {
          display: grid;
          grid-template-columns: 2fr 1fr 1.5fr;
          gap: 48px;
          padding-bottom: 48px;
        }
        .footer-logo {
          display: flex;
          align-items: center;
          gap: 10px;
          font-family: var(--font-display);
          font-size: 1.5rem;
          color: white;
          margin-bottom: 16px;
        }
        .footer-logo svg { color: var(--teal-light); }
        .footer-brand p { line-height: 1.8; font-size: 0.92rem; }
        .footer-col h4 {
          color: white;
          font-size: 0.95rem;
          font-weight: 700;
          letter-spacing: 0.05em;
          text-transform: uppercase;
          margin-bottom: 20px;
          padding-bottom: 10px;
          border-bottom: 2px solid var(--teal);
          display: inline-block;
        }
        .footer-col ul { list-style: none; }
        .footer-col ul li { margin-bottom: 10px; }
        .footer-col ul a {
          color: rgba(255,255,255,0.7);
          font-size: 0.92rem;
          transition: color 0.2s;
        }
        .footer-col ul a:hover { color: var(--teal-light); }
        .contact-list li {
          display: flex;
          gap: 12px;
          font-size: 0.9rem;
          line-height: 1.6;
          color: rgba(255,255,255,0.7);
        }
        .contact-list svg { color: var(--teal-light); margin-top: 4px; flex-shrink: 0; }
        .footer-bottom {
          border-top: 1px solid rgba(255,255,255,0.1);
          padding: 20px 0;
          text-align: center;
          font-size: 0.85rem;
          color: rgba(255,255,255,0.4);
        }
        @media (max-width: 768px) {
          .footer-grid { grid-template-columns: 1fr; gap: 32px; }
        }
      `}</style>
    </footer>
  );
}
