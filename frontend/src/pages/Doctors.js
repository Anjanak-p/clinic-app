import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { doctorsAPI } from '../utils/api';
import { FaGraduationCap, FaClock, FaArrowRight } from 'react-icons/fa';

export default function Doctors() {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    doctorsAPI.getAll()
      .then(res => setDoctors(res.data.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="doctors-page page-enter">
      <div className="page-header">
        <div className="container">
          <span className="section-tag">Meet the Team</span>
          <h1 className="section-title">Our Specialist Doctors</h1>
          <p className="section-sub">
            Our team of highly qualified dental specialists is committed to providing you with personalized, compassionate care.
          </p>
        </div>
      </div>

      <section className="doc-section">
        <div className="container">
          {loading ? (
            <div className="doc-grid">
              {[0,1,2,3].map(i => <div key={i} className="skeleton" style={{ height: 420, borderRadius: 16 }} />)}
            </div>
          ) : (
            <div className="doc-grid">
              {doctors.map((d, i) => (
                <div key={d._id} className="doc-card card" style={{ animationDelay: `${i * 0.1}s` }}>
                  <div className="doc-photo">
                    <img src={d.photo || `https://i.pravatar.cc/400?img=${i + 5}`} alt={d.name} />
                    <div className="doc-overlay">
                      <Link to="/appointment" className="btn btn-primary" style={{ fontSize: '0.85rem', padding: '10px 20px' }}>
                        Book Appointment
                      </Link>
                    </div>
                  </div>
                  <div className="doc-body">
                    <h3>{d.name}</h3>
                    <span className="doc-spec-badge">{d.specialization}</span>
                    <p className="doc-desc">{d.description}</p>
                    <div className="doc-meta">
                      {d.experience && (
                        <div className="doc-meta-row"><FaClock /> {d.experience} experience</div>
                      )}
                      {d.education && (
                        <div className="doc-meta-row"><FaGraduationCap /> {d.education}</div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="join-team">
        <div className="container">
          <div className="join-box">
            <div>
              <h2>Ready to Meet Your Doctor?</h2>
              <p>Book your appointment and get matched with the right specialist for your needs.</p>
            </div>
            <Link to="/appointment" className="btn btn-gold">
              Book Now <FaArrowRight />
            </Link>
          </div>
        </div>
      </section>

      <style>{`
        .doctors-page { padding-top: 80px; }
        .page-header {
          background: linear-gradient(135deg, #e8f7f7, var(--cream));
          padding: 80px 0 60px;
          text-align: center;
        }
        .page-header .section-sub { margin: 0 auto; }
        .doc-section { padding: 72px 0; }
        .doc-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 32px;
        }
        .doc-card { animation: fadeUp 0.5s ease both; }
        .doc-photo {
          position: relative;
          height: 280px;
          overflow: hidden;
        }
        .doc-photo img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.5s ease;
        }
        .doc-card:hover .doc-photo img { transform: scale(1.08); }
        .doc-overlay {
          position: absolute;
          inset: 0;
          background: rgba(15, 139, 141, 0.85);
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 0;
          transition: var(--transition);
        }
        .doc-card:hover .doc-overlay { opacity: 1; }
        .doc-body { padding: 28px; }
        .doc-body h3 { font-size: 1.25rem; margin-bottom: 8px; }
        .doc-spec-badge {
          display: inline-block;
          font-size: 0.78rem;
          font-weight: 600;
          color: var(--teal);
          background: var(--teal-pale);
          padding: 4px 12px;
          border-radius: 20px;
          margin-bottom: 14px;
        }
        .doc-desc { font-size: 0.9rem; color: var(--text-mid); line-height: 1.75; margin-bottom: 16px; }
        .doc-meta { display: flex; flex-direction: column; gap: 8px; border-top: 1px solid var(--border); padding-top: 16px; }
        .doc-meta-row {
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 0.85rem;
          color: var(--text-mid);
        }
        .doc-meta-row svg { color: var(--teal); }
        .join-team { padding: 0 0 80px; }
        .join-box {
          background: linear-gradient(135deg, var(--teal), var(--navy));
          border-radius: var(--radius-lg);
          padding: 50px 60px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 32px;
        }
        .join-box h2 { font-family: var(--font-display); font-size: 1.8rem; color: white; margin-bottom: 8px; }
        .join-box p { color: rgba(255,255,255,0.7); }
        @media (max-width: 768px) {
          .doc-grid { grid-template-columns: 1fr; }
          .join-box { flex-direction: column; text-align: center; padding: 36px 24px; }
        }
      `}</style>
    </div>
  );
}
