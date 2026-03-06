import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { servicesAPI, doctorsAPI } from '../utils/api';
import { FaArrowRight, FaStar, FaUsers, FaAward, FaSmile,FaTooth } from 'react-icons/fa';

const STATS = [
  { icon: <FaUsers />, value: '5,000+', label: 'Happy Patients' },
  { icon: <FaAward />, value: '15+', label: 'Years Experience' },
  { icon: <FaStar />, value: '4.9', label: 'Average Rating' },
  { icon: <FaSmile />, value: '98%', label: 'Satisfaction Rate' },
];

export default function Home() {
  const [services, setServices] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([servicesAPI.getAll(), doctorsAPI.getAll()])
      .then(([sRes, dRes]) => {
        setServices(sRes.data.data.slice(0, 3));
        setDoctors(dRes.data.data.slice(0, 3));
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="page-enter">
      {/* Hero */}
      <section className="hero">
        <div className="hero-bg" />
        <div className="container hero-content">
          <div className="hero-text">
            <span className="section-tag">Welcome to DentalCare Pro</span>
            <h1 className="hero-title">
              Your Smile Deserves<br />
              <em>Expert Care</em>
            </h1>
            <p className="hero-desc">
              Experience world-class dental care with our team of specialists. From routine checkups to advanced treatments, we're here for your brightest smile.
            </p>
            <div className="hero-actions">
              <Link to="/appointment" className="btn btn-primary">
                Book Appointment <FaArrowRight />
              </Link>
              <Link to="/services" className="btn btn-outline">
                Our Services
              </Link>
            </div>
          </div>
          <div className="hero-visual">
            <div className="hero-card hero-card-1">
              <FaSmile className="hc-icon" />
              <div>
                <strong>Next Available</strong>
                <p>Today, 2:30 PM</p>
              </div>
            </div>
            <div className="hero-img-wrap">
              <img
                src="https://images.unsplash.com/photo-1606811971618-4486d14f3f99?w=500&q=80"
                alt="Dental care"
              />
            </div>
            <div className="hero-card hero-card-2">
              <FaStar className="hc-icon gold" />
              <div>
                <strong>4.9/5 Rating</strong>
                <p>5,000+ reviews</p>
              </div>
            </div>
          </div>
        </div>

        {/* Stats bar */}
        <div className="stats-bar">
          <div className="container stats-inner">
            {STATS.map((s, i) => (
              <div key={i} className="stat-item">
                <span className="stat-icon">{s.icon}</span>
                <div>
                  <div className="stat-value">{s.value}</div>
                  <div className="stat-label">{s.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <div>
              <span className="section-tag">What We Offer</span>
              <h2 className="section-title">Our Dental Services</h2>
              <p className="section-sub">Comprehensive care for every smile at every stage of life.</p>
            </div>
            <Link to="/services" className="btn btn-outline">View All <FaArrowRight /></Link>
          </div>
          <div className="cards-grid">
            {loading
              ? [0,1,2].map(i => <div key={i} className="skeleton-card" />)
              : services.map((s, i) => (
                <div key={s._id} className="service-card card" style={{ animationDelay: `${i * 0.1}s` }}>
                  <div className="service-icon"><FaTooth /></div>
                  <h3>{s.name}</h3>
                  <p>{s.description}</p>
                </div>
              ))}
          </div>
        </div>
      </section>

      {/* Why Us */}
      <section className="why-section">
        <div className="container why-inner">
          <div className="why-img">
            <img src="https://images.unsplash.com/photo-1609840114035-3c981b782dfe?w=500&q=80" alt="Clinic" />
          </div>
          <div className="why-text">
            <span className="section-tag">Why Choose Us</span>
            <h2 className="section-title">Dental Care You Can Trust</h2>
            {[
              ['Advanced Technology', 'Digital X-rays, 3D imaging, and laser treatments for precise, comfortable care.'],
              ['Experienced Specialists', 'Our team of 10+ specialists brings decades of combined expertise.'],
              ['Patient-First Approach', 'Every treatment plan is personalized to your unique needs and goals.'],
              ['Comfortable Environment', 'Anxiety-free dental visits in our modern, welcoming clinic.'],
            ].map(([title, desc], i) => (
              <div key={i} className="why-item">
                <div className="why-dot" />
                <div>
                  <strong>{title}</strong>
                  <p>{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Doctors */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <div>
              <span className="section-tag">Meet Our Team</span>
              <h2 className="section-title">Expert Doctors</h2>
              <p className="section-sub">Skilled, compassionate specialists dedicated to your dental health.</p>
            </div>
            <Link to="/doctors" className="btn btn-outline">All Doctors <FaArrowRight /></Link>
          </div>
          <div className="doctors-grid">
            {loading
              ? [0,1,2].map(i => <div key={i} className="skeleton-card tall" />)
              : doctors.map((d, i) => (
                <div key={d._id} className="doctor-card card" style={{ animationDelay: `${i * 0.1}s` }}>
                  <div className="doctor-photo-wrap">
                    <img src={d.photo || `https://i.pravatar.cc/300?img=${i+10}`} alt={d.name} />
                  </div>
                  <div className="doctor-info">
                    <h3>{d.name}</h3>
                    <span className="doc-spec">{d.specialization}</span>
                    <p>{d.description.slice(0, 100)}...</p>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-box">
            <div className="cta-text">
              <h2>Ready for Your Best Smile?</h2>
              <p>Book your appointment today and take the first step toward optimal dental health.</p>
            </div>
            <Link to="/appointment" className="btn btn-gold">
              Book Appointment <FaArrowRight />
            </Link>
          </div>
        </div>
      </section>

      <style>{`
        /* Hero */
        .hero {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          position: relative;
          padding-top: 80px;
        }
        .hero-bg {
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, var(--teal-pale) 0%, var(--cream) 60%, #f0e8d8 100%);
          z-index: 0;
        }
        .hero-content {
          flex: 1;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 60px;
          align-items: center;
          padding-top: 60px;
          padding-bottom: 60px;
          position: relative;
          z-index: 1;
        }
        .hero-text { animation: slideRight 0.8s ease both; }
        .hero-title {
          font-family: var(--font-display);
          font-size: clamp(2.5rem, 5vw, 4rem);
          line-height: 1.15;
          color: var(--charcoal);
          margin-bottom: 20px;
        }
        .hero-title em {
          font-style: italic;
          color: var(--teal);
        }
        .hero-desc {
          font-size: 1.05rem;
          color: var(--text-mid);
          line-height: 1.8;
          margin-bottom: 36px;
          max-width: 480px;
        }
        .hero-actions { display: flex; gap: 16px; flex-wrap: wrap; }
        .hero-visual {
          position: relative;
          animation: fadeUp 0.8s 0.2s ease both;
        }
        .hero-img-wrap {
          border-radius: 30px;
          overflow: hidden;
          box-shadow: var(--shadow-lg);
          aspect-ratio: 4/5;
        }
        .hero-img-wrap img { width: 100%; height: 100%; object-fit: cover; }
        .hero-card {
          position: absolute;
          background: white;
          border-radius: 16px;
          padding: 16px 20px;
          display: flex;
          align-items: center;
          gap: 14px;
          box-shadow: var(--shadow-md);
          animation: float 4s ease-in-out infinite;
        }
        .hero-card-1 { top: 40px; left: -30px; }
        .hero-card-2 { bottom: 60px; right: -20px; animation-delay: 2s; }
        .hero-card strong { display: block; font-size: 0.9rem; color: var(--charcoal); }
        .hero-card p { font-size: 0.8rem; color: var(--text-light); }
        .hc-icon { font-size: 1.8rem; color: var(--teal); }
        .hc-icon.gold { color: var(--gold); }

        /* Stats */
        .stats-bar {
          background: var(--charcoal);
          position: relative;
          z-index: 1;
        }
        .stats-inner {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          padding: 32px 0;
        }
        .stat-item {
          display: flex;
          align-items: center;
          gap: 16px;
          padding: 0 24px;
          border-right: 1px solid rgba(255,255,255,0.1);
        }
        .stat-item:last-child { border-right: none; }
        .stat-icon { font-size: 1.8rem; color: var(--teal-light); }
        .stat-value { font-size: 1.6rem; font-weight: 700; color: white; }
        .stat-label { font-size: 0.82rem; color: rgba(255,255,255,0.5); }

        /* Sections */
        .section { padding: 80px 0; }
        .section-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          margin-bottom: 48px;
        }
        .cards-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 28px;
        }
        .service-card { padding: 36px 28px; animation: fadeUp 0.5s ease both; }
        .service-icon { font-size: 2.8rem; margin-bottom: 16px; }
        .service-card h3 { font-size: 1.15rem; margin-bottom: 10px; color: var(--charcoal); }
        .service-card p { font-size: 0.9rem; color: var(--text-mid); line-height: 1.7; }
        .service-price {
          margin-top: 16px;
          font-size: 0.85rem;
          font-weight: 600;
          color: var(--teal);
          background: var(--teal-pale);
          display: inline-block;
          padding: 4px 12px;
          border-radius: 20px;
        }

        /* Why */
        .why-section { background: white; padding: 80px 0; }
        .why-inner {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 80px;
          align-items: center;
        }
        .why-img { border-radius: 24px; overflow: hidden; box-shadow: var(--shadow-lg); }
        .why-img img { width: 100%; height: 450px; object-fit: cover; }
        .why-item {
          display: flex;
          gap: 16px;
          margin-bottom: 24px;
        }
        .why-dot {
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background: var(--teal);
          margin-top: 6px;
          flex-shrink: 0;
        }
        .why-item strong { display: block; font-size: 1rem; margin-bottom: 4px; }
        .why-item p { font-size: 0.9rem; color: var(--text-mid); }

        /* Doctors */
        .doctors-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 28px;
        }
        .doctor-card { animation: fadeUp 0.5s ease both; }
        .doctor-photo-wrap { height: 220px; overflow: hidden; }
        .doctor-photo-wrap img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.4s ease; }
        .doctor-card:hover .doctor-photo-wrap img { transform: scale(1.06); }
        .doctor-info { padding: 24px; }
        .doctor-info h3 { font-size: 1.1rem; margin-bottom: 4px; }
        .doc-spec {
          display: inline-block;
          font-size: 0.78rem;
          color: var(--teal);
          font-weight: 600;
          background: var(--teal-pale);
          padding: 3px 10px;
          border-radius: 20px;
          margin-bottom: 10px;
        }
        .doctor-info p { font-size: 0.87rem; color: var(--text-mid); }

        /* CTA */
        .cta-section { padding: 40px 0 80px; }
        .cta-box {
          background: linear-gradient(135deg, var(--teal), var(--navy));
          border-radius: var(--radius-lg);
          padding: 60px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 32px;
        }
        .cta-text h2 { font-family: var(--font-display); font-size: 2rem; color: white; margin-bottom: 8px; }
        .cta-text p { color: rgba(255,255,255,0.75); }

        /* Skeletons */
        .skeleton-card { height: 240px; border-radius: var(--radius); }
        .skeleton-card.tall { height: 360px; }

        @media (max-width: 1024px) {
          .cards-grid, .doctors-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 768px) {
          .hero-content { grid-template-columns: 1fr; padding-top: 40px; }
          .hero-visual { display: none; }
          .stats-inner { grid-template-columns: repeat(2, 1fr); gap: 16px; }
          .stat-item { border-right: none; }
          .section-header { flex-direction: column; align-items: flex-start; gap: 16px; }
          .cards-grid, .doctors-grid { grid-template-columns: 1fr; }
          .why-inner { grid-template-columns: 1fr; }
          .cta-box { flex-direction: column; text-align: center; padding: 40px 24px; }
        }
      `}</style>
    </div>
  );
}
