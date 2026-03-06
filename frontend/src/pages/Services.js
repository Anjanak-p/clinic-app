import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { servicesAPI } from '../utils/api';
import { FaArrowRight, FaTooth } from 'react-icons/fa';

export default function Services() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    servicesAPI.getAll()
      .then(res => setServices(res.data.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="services-page page-enter">
      {/* Header */}
      <div className="page-header">
        <div className="container">
          <span className="section-tag">What We Offer</span>
          <h1 className="section-title">Our Dental Services</h1>
          <p className="section-sub">
            From preventive care to advanced restorative treatments, we offer a comprehensive range of dental services for the whole family.
          </p>
        </div>
      </div>

      {/* Services Grid */}
      <section className="services-section">
        <div className="container">
          {loading ? (
            <div className="svc-grid">
              {[0,1,2,3,4,5].map(i => <div key={i} className="skeleton" style={{ height: 280, borderRadius: 16 }} />)}
            </div>
          ) : (
            <div className="svc-grid">
              {services.map((s, i) => (
                <div key={s._id} className="svc-card card" style={{ animationDelay: `${i * 0.08}s` }}>
                  <div className="svc-icon-wrap">
                    <span className="svc-emoji"><FaTooth /></span>
                  </div>
                  <div className="svc-body">
                    <h3>{s.name}</h3>
                    <p>{s.description}</p>

                  </div>
                  <Link to="/appointment" className="svc-cta">
                    Book This Service <FaArrowRight />
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="services-cta">
        <div className="container">
          <div className="cta-inner">
            <h2>Not Sure Which Service You Need?</h2>
            <p>Book a general consultation and our doctors will help you find the right treatment plan.</p>
            <Link to="/appointment" className="btn btn-primary">Book a Consultation <FaArrowRight /></Link>
          </div>
        </div>
      </section>

      <style>{`
        .services-page { padding-top: 80px; }
        .page-header {
          background: linear-gradient(135deg, var(--teal-pale), var(--cream));
          padding: 80px 0 60px;
          text-align: center;
        }
        .page-header .section-sub { margin: 0 auto; }
        .services-section { padding: 72px 0; }
        .svc-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 28px;
        }
        .svc-card {
          display: flex;
          flex-direction: column;
          animation: fadeUp 0.5s ease both;
        }
        .svc-icon-wrap {
          background: var(--teal-pale);
          padding: 28px;
          text-align: center;
        }
        .svc-emoji { font-size: 3rem; }
        .svc-body { flex: 1; padding: 24px; }
        .svc-body h3 { font-size: 1.15rem; margin-bottom: 10px; color: var(--charcoal); }
        .svc-body p { font-size: 0.9rem; color: var(--text-mid); line-height: 1.75; margin-bottom: 16px; }
        .svc-meta { display: flex; gap: 12px; flex-wrap: wrap; }
        .svc-meta-item {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 0.8rem;
          color: var(--teal);
          font-weight: 600;
          background: var(--teal-pale);
          padding: 4px 10px;
          border-radius: 20px;
        }
        .svc-cta {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          padding: 16px;
          background: var(--charcoal);
          color: white;
          font-size: 0.88rem;
          font-weight: 600;
          transition: var(--transition);
        }
        .svc-cta:hover { background: var(--teal); }
        .services-cta { padding: 40px 0 80px; }
        .cta-inner {
          background: var(--charcoal);
          border-radius: var(--radius-lg);
          padding: 60px;
          text-align: center;
        }
        .cta-inner h2 {
          font-family: var(--font-display);
          font-size: 2rem;
          color: white;
          margin-bottom: 12px;
        }
        .cta-inner p { color: rgba(255,255,255,0.7); margin-bottom: 28px; }
        @media (max-width: 1024px) { .svc-grid { grid-template-columns: repeat(2, 1fr); } }
        @media (max-width: 600px) { .svc-grid { grid-template-columns: 1fr; } }
      `}</style>
    </div>
  );
}
