'use client';
import { useRef, useEffect } from 'react';

const STEPS = [
  {
    num: '01',
    title: 'Consult',
    desc: 'A 30-minute call to learn your business, your customers, and what you need your site to do. Free, no pressure.',
  },
  {
    num: '02',
    title: 'Design',
    desc: 'One round of design direction delivered as a working prototype. You see it before a line of code is finalized.',
  },
  {
    num: '03',
    title: 'Build',
    desc: 'Custom-coded, mobile-first, and optimized for speed. No page builders. No bloat. Just a site that performs.',
  },
  {
    num: '04',
    title: 'Launch',
    desc: 'Hosting, domain setup, Google Analytics, and Search Console all connected. You get the keys, the credentials, and a walkthrough so you know exactly what you have.',
  },
];

export default function Process() {
  const wrapRef = useRef(null);
  const fillRef = useRef(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const fill = fillRef.current;
    if (!wrap || !fill) return;

    const steps = wrap.querySelectorAll('.process__step');

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        fill.style.width = '100%';
        steps.forEach((step, i) => {
          setTimeout(() => step.classList.add('proc-active'), i * 220);
        });
        obs.disconnect();
      },
      { threshold: 0.35 }
    );
    obs.observe(wrap);
    return () => obs.disconnect();
  }, []);

  return (
    <section id="process" className="process">
      <div className="section-inner">
        <header className="section-header reveal-up">
          <p className="section-eyebrow">How it works</p>
          <div className="title-reveal">
            <h2 className="section-title">From idea to live site in&nbsp;4&nbsp;steps.</h2>
          </div>
          <p className="section-sub">
            A simple, predictable process. No surprises, no scope creep, no disappearing-act agencies.
          </p>
        </header>

        <div className="process__wrap" ref={wrapRef}>
          <div className="process__rail">
            <div className="process__fill" ref={fillRef} />
          </div>
          <div className="process__steps">
            {STEPS.map(step => (
              <div key={step.num} className="process__step">
                <div className="step__node" aria-hidden="true" />
                <div className="step__body">
                  <span className="step__num">{step.num}</span>
                  <h3 className="step__title">{step.title}</h3>
                  <p className="step__desc">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
