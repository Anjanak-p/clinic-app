import { useState, useEffect } from 'react';
import { servicesAPI, doctorsAPI, appointmentsAPI } from '../utils/api';
import toast from 'react-hot-toast';
import { FaCheckCircle, FaCalendarAlt, FaUser, FaEnvelope, FaPhone, FaStethoscope, FaCommentAlt } from 'react-icons/fa';

const INITIAL = { patientName: '', email: '', phone: '', service: '', doctor: '', date: '', message: '' };

export default function Appointment() {
  const [form, setForm] = useState(INITIAL);
  const [errors, setErrors] = useState({});
  const [services, setServices] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    Promise.all([servicesAPI.getAll(), doctorsAPI.getAll()]).then(([s, d]) => {
      setServices(s.data.data);
      setDoctors(d.data.data);
    });
  }, []);

  const validate = () => {
    const e = {};
    if (!form.patientName.trim()) e.patientName = 'Name is required';
    if (!form.email.trim()) e.email = 'Email is required';
    else if (!/^\S+@\S+\.\S+$/.test(form.email)) e.email = 'Enter a valid email';
    if (!form.phone.trim()) e.phone = 'Phone number is required';
    else if (!/^[\d\s\-+()]{7,15}$/.test(form.phone)) e.phone = 'Enter a valid phone number';
    if (!form.service) e.service = 'Please select a service';
    if (!form.doctor) e.doctor = 'Please select a doctor';
    if (!form.date) e.date = 'Please select a date';
    else {
      const selected = new Date(form.date);
      const today = new Date(); today.setHours(0,0,0,0);
      if (selected < today) e.date = 'Date cannot be in the past';
    }
    return e;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
    if (errors[name]) setErrors(er => ({ ...er, [name]: '' }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      toast.error('Please fix the errors below');
      return;
    }
    setSubmitting(true);
    try {
      await appointmentsAPI.create(form);
      setSubmitted(true);
      toast.success('Appointment booked successfully! 🎉');
    } catch (err) {
      toast.error(err.response?.data?.error || 'Failed to book appointment. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const today = new Date().toISOString().split('T')[0];

  if (submitted) {
    return (
      <div className="appt-page page-enter">
        <div className="success-wrap">
          <div className="success-box">
            <FaCheckCircle className="success-icon" />
            <h2>Appointment Confirmed!</h2>
            <p>Thank you, <strong>{form.patientName}</strong>! We've received your appointment request.</p>
            <div className="success-details">
              <div><span>Service</span><strong>{form.service}</strong></div>
              <div><span>Doctor</span><strong>{form.doctor}</strong></div>
              <div><span>Date</span><strong>{new Date(form.date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</strong></div>
              <div><span>Contact</span><strong>{form.email}</strong></div>
            </div>
            <p className="success-note">We'll send a confirmation email shortly. See you soon!</p>
            <button className="btn btn-primary" onClick={() => { setSubmitted(false); setForm(INITIAL); }}>
              Book Another Appointment
            </button>
          </div>
        </div>
        <style>{successStyles}</style>
      </div>
    );
  }

  return (
    <div className="appt-page page-enter">
      <div className="appt-header">
        <div className="container">
          <span className="section-tag">Get Started</span>
          <h1 className="section-title">Book an Appointment</h1>
          <p className="section-sub">Fill out the form below and we'll confirm your appointment within 24 hours.</p>
        </div>
      </div>

      <div className="appt-content container">
        <div className="appt-info">
          <h3>Why Visit Us?</h3>
          {[
            ['🕐', 'Flexible Hours', 'Morning, afternoon & Saturday slots available'],
            ['💳', 'Insurance Accepted', 'We work with most major insurance providers'],
            ['🏆', 'Expert Team', '10+ board-certified dental specialists'],
            ['🌟', 'Modern Clinic', 'State-of-the-art technology & sterile environment'],
          ].map(([icon, title, desc]) => (
            <div className="info-item" key={title}>
              <span className="info-emoji">{icon}</span>
              <div>
                <strong>{title}</strong>
                <p>{desc}</p>
              </div>
            </div>
          ))}

          <div className="contact-box">
            <h4>Need Help?</h4>
            <p>📞 +91 8847119869</p>
            <p>✉️ hello@dentalcarepro.com</p>
          </div>
        </div>

        <div className="appt-form-wrap">
          <form onSubmit={handleSubmit} className="appt-form" noValidate>
            <h3>Your Details</h3>

            <div className="form-row">
              <div className="form-group">
                <label><FaUser /> Patient Name *</label>
                <input name="patientName" value={form.patientName} onChange={handleChange} placeholder="John Doe" />
                {errors.patientName && <div className="error">{errors.patientName}</div>}
              </div>
              <div className="form-group">
                <label><FaEnvelope /> Email Address *</label>
                <input name="email" type="email" value={form.email} onChange={handleChange} placeholder="john@example.com" />
                {errors.email && <div className="error">{errors.email}</div>}
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label><FaPhone /> Phone Number *</label>
                <input name="phone" value={form.phone} onChange={handleChange} placeholder="+1 (555) 000-0000" />
                {errors.phone && <div className="error">{errors.phone}</div>}
              </div>
              <div className="form-group">
                <label><FaCalendarAlt /> Preferred Date *</label>
                <input name="date" type="date" value={form.date} onChange={handleChange} min={today} />
                {errors.date && <div className="error">{errors.date}</div>}
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label><FaStethoscope /> Select Service *</label>
                <select name="service" value={form.service} onChange={handleChange}>
                  <option value="">-- Choose a service --</option>
                  {services.map(s => <option key={s._id} value={s.name}>{s.name}</option>)}
                </select>
                {errors.service && <div className="error">{errors.service}</div>}
              </div>
              <div className="form-group">
                <label><FaUser /> Select Doctor *</label>
                <select name="doctor" value={form.doctor} onChange={handleChange}>
                  <option value="">-- Choose a doctor --</option>
                  {doctors.map(d => <option key={d._id} value={d.name}>{d.name} — {d.specialization}</option>)}
                </select>
                {errors.doctor && <div className="error">{errors.doctor}</div>}
              </div>
            </div>

            <div className="form-group">
              <label><FaCommentAlt /> Message (Optional)</label>
              <textarea name="message" value={form.message} onChange={handleChange} rows={4} placeholder="Describe your symptoms or any special requirements..." />
            </div>

            <button type="submit" className="btn btn-primary submit-btn" disabled={submitting}>
              {submitting ? <><span className="spinner" /> Booking...</> : 'Confirm Appointment'}
            </button>
          </form>
        </div>
      </div>

      <style>{`
        .appt-page { padding-top: 80px; padding-bottom: 80px; }
        .appt-header {
          background: linear-gradient(135deg, var(--teal-pale), var(--cream));
          padding: 70px 0 50px;
          text-align: center;
          margin-bottom: 56px;
        }
        .appt-header .section-sub { margin: 0 auto; }
        .appt-content {
          display: grid;
          grid-template-columns: 360px 1fr;
          gap: 48px;
          align-items: start;
        }
        .appt-info { position: sticky; top: 100px; }
        .appt-info h3 { font-size: 1.2rem; margin-bottom: 24px; color: var(--charcoal); }
        .info-item { display: flex; gap: 16px; margin-bottom: 20px; }
        .info-emoji { font-size: 1.6rem; }
        .info-item strong { display: block; font-size: 0.92rem; margin-bottom: 2px; }
        .info-item p { font-size: 0.84rem; color: var(--text-mid); }
        .contact-box {
          background: var(--charcoal);
          border-radius: var(--radius);
          padding: 24px;
          margin-top: 32px;
          color: white;
        }
        .contact-box h4 { margin-bottom: 12px; color: var(--teal-light); }
        .contact-box p { font-size: 0.9rem; margin-bottom: 6px; color: rgba(255,255,255,0.8); }
        .appt-form-wrap {
          background: white;
          border-radius: var(--radius-lg);
          padding: 44px;
          box-shadow: var(--shadow-sm);
        }
        .appt-form h3 { font-size: 1.2rem; margin-bottom: 28px; color: var(--charcoal); }
        .form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
        .form-group label {
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .form-group label svg { color: var(--teal); font-size: 0.8rem; }
        .submit-btn { width: 100%; justify-content: center; padding: 16px; font-size: 1rem; margin-top: 8px; }
        .submit-btn:disabled { opacity: 0.7; cursor: not-allowed; transform: none !important; }
        .spinner {
          display: inline-block;
          width: 16px;
          height: 16px;
          border: 2px solid rgba(255,255,255,0.4);
          border-top-color: white;
          border-radius: 50%;
          animation: spin 0.7s linear infinite;
        }
        @keyframes spin { to { transform: rotate(360deg); } }
        @media (max-width: 900px) {
          .appt-content { grid-template-columns: 1fr; }
          .appt-info { position: static; }
          .form-row { grid-template-columns: 1fr; }
          .appt-form-wrap { padding: 28px 20px; }
        }
      `}</style>
      <style>{successStyles}</style>
    </div>
  );
}

const successStyles = `
  .success-wrap {
    padding-top: 80px;
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background: linear-gradient(135deg, var(--teal-pale), var(--cream));
    padding-bottom: 60px;
  }
  .success-box {
    background: white;
    border-radius: var(--radius-lg);
    padding: 56px 48px;
    text-align: center;
    max-width: 560px;
    width: 90%;
    box-shadow: var(--shadow-lg);
    animation: fadeUp 0.5s ease;
  }
  .success-icon {
    font-size: 4rem;
    color: var(--teal);
    margin-bottom: 20px;
    animation: pulse 2s infinite;
  }
  .success-box h2 {
    font-family: var(--font-display);
    font-size: 1.8rem;
    margin-bottom: 12px;
  }
  .success-box > p { color: var(--text-mid); margin-bottom: 28px; }
  .success-details {
    background: var(--cream);
    border-radius: var(--radius);
    padding: 24px;
    margin-bottom: 20px;
    text-align: left;
    display: grid;
    gap: 12px;
  }
  .success-details div {
    display: flex;
    justify-content: space-between;
    font-size: 0.9rem;
  }
  .success-details span { color: var(--text-light); }
  .success-note { font-size: 0.85rem; color: var(--text-light); margin-bottom: 28px; }
`;
