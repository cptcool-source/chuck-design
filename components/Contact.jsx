'use client';
import { useState } from 'react';

const INDUSTRIES = [
  'Restaurants & Food',
  'Home Services & Trades',
  'Health & Wellness',
  'Real Estate & Professional',
  'Retail',
  'Other',
];

export default function Contact() {
  const [values, setValues] = useState({
    name: '', email: '', phone: '', industry: '', message: '',
  });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState({ type: '', msg: '' });
  const [submitting, setSubmitting] = useState(false);

  function set(field, val) {
    setValues(v => ({ ...v, [field]: val }));
    if (errors[field]) setErrors(e => ({ ...e, [field]: '' }));
  }

  function validate() {
    const e = {};
    if (!values.name.trim()) e.name = 'This field is required.';
    if (!values.email.trim()) e.email = 'This field is required.';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) e.email = 'Enter a valid email address.';
    if (!values.message.trim()) e.message = 'This field is required.';
    return e;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }

    setSubmitting(true);
    setStatus({ type: '', msg: '' });

    try {
      const res = await fetch('https://formspree.io/f/mdaraoaw', {
        method: 'POST',
        body: JSON.stringify(values),
        headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
      });
      const json = await res.json();
      if (res.ok) {
        setStatus({ type: 'success', msg: 'Message sent — Charles will be in touch within 24 hours.' });
        setValues({ name: '', email: '', phone: '', industry: '', message: '' });
        setErrors({});
      } else {
        throw new Error(json.errors?.map(err => err.message).join(', ') || 'Submission failed.');
      }
    } catch (err) {
      setStatus({ type: 'error', msg: err.message || 'Something went wrong. Email directly: charles@chuckdesign.com' });
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section id="contact" className="contact">
      <div className="section-inner">
        <header className="contact__header reveal-up">
          <p className="section-eyebrow">Get in touch</p>
          <div className="contact-rule reveal-up" style={{ '--delay': '100ms' }} aria-hidden="true" />
          <div className="title-reveal">
            <h2 className="section-title">Ready to get started?</h2>
          </div>
          <p className="section-sub">
            Tell us about your project. If it's a fit, we'll schedule a free 30-minute call.
          </p>
        </header>

        <div className="contact__layout">
          <form
            className="contact__form reveal-up"
            onSubmit={handleSubmit}
            noValidate
            aria-label="Contact form"
          >
            <div className="form-row form-row--2">
              <div className={`form-group${errors.name ? ' has-error' : ''}`}>
                <label htmlFor="name">Name</label>
                <input
                  id="name" type="text" name="name" autoComplete="name"
                  placeholder="Jane Smith"
                  value={values.name}
                  onChange={e => set('name', e.target.value)}
                />
                <span className="field-error" role="alert">{errors.name}</span>
              </div>
              <div className={`form-group${errors.email ? ' has-error' : ''}`}>
                <label htmlFor="email">Email</label>
                <input
                  id="email" type="email" name="email" autoComplete="email"
                  placeholder="jane@mybusiness.com"
                  value={values.email}
                  onChange={e => set('email', e.target.value)}
                />
                <span className="field-error" role="alert">{errors.email}</span>
              </div>
            </div>

            <div className="form-row form-row--2">
              <div className="form-group">
                <label htmlFor="phone">
                  Phone <span className="form-optional">(optional)</span>
                </label>
                <input
                  id="phone" type="tel" name="phone" autoComplete="tel"
                  placeholder="(941) 555-0100"
                  value={values.phone}
                  onChange={e => set('phone', e.target.value)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="industry">
                  Industry <span className="form-optional">(optional)</span>
                </label>
                <select
                  id="industry" name="industry"
                  value={values.industry}
                  onChange={e => set('industry', e.target.value)}
                >
                  <option value="">Select one…</option>
                  {INDUSTRIES.map(opt => (
                    <option key={opt} value={opt}>{opt}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className={`form-group${errors.message ? ' has-error' : ''}`}>
              <label htmlFor="message">How can I help?</label>
              <textarea
                id="message" name="message" rows={5}
                placeholder="Tell me about your business and what you need your website to do."
                value={values.message}
                onChange={e => set('message', e.target.value)}
              />
              <span className="field-error" role="alert">{errors.message}</span>
            </div>

            <div className={`form-status${status.type ? ` ${status.type}` : ''}`} role="status" aria-live="polite">
              {status.msg}
            </div>

            <button type="submit" className="btn btn--primary btn--full" disabled={submitting}>
              {submitting ? (
                'Sending…'
              ) : (
                <>
                  <i className="ph-duotone ph-paper-plane-tilt" aria-hidden="true" />
                  Send message
                </>
              )}
            </button>
          </form>

          <aside className="contact__aside reveal-up" style={{ '--delay': '120ms' }}>
            <div className="aside-block">
              <p className="aside-label">Email</p>
              <a href="mailto:charles@chuckdesign.com" className="aside-value aside-value--link">
                charles@chuckdesign.com
              </a>
            </div>
            <div className="aside-block">
              <p className="aside-label">Location</p>
              <p className="aside-value">
                North Port, FL 34291<br />
                Serving all of Southwest Florida
              </p>
            </div>
            <div className="aside-block">
              <p className="aside-label">Response time</p>
              <p className="aside-value">Within 24 hours, usually same day</p>
            </div>
            <div className="aside-promise">
              <i className="ph-duotone ph-seal-check" aria-hidden="true" />
              <p>No commitment required. The consult call is free and there's no pressure to hire.</p>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
