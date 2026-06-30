'use client';
import { useEffect } from 'react';
import { Monitor, MagnifyingGlassPlus, MapPin, ShareNetwork, ShieldCheck } from '@phosphor-icons/react';

const SERVICES = [
  {
    id: 'web-design',
    Icon: Monitor,
    title: 'Web Design & Development',
    desc: 'Custom sites built from scratch — designed to load fast, look great on every device, and turn visitors into customers.',
    featured: true,
    list: [
      'Designed from scratch — no templates, no page builders',
      'Mobile-first, responsive on every screen',
      'Technical SEO and Google Analytics built in from day one',
      'Fast load times — 90+ PageSpeed score at launch',
    ],
    color: '#E05C3A',
  },
  {
    id: 'seo',
    Icon: MagnifyingGlassPlus,
    title: 'Built for Search',
    desc: 'Every site ships with the technical foundation Google needs — proper structure, schema markup, fast load times, and Search Console connected at launch.',
    color: '#4A90D9',
  },
  {
    id: 'gbp',
    Icon: MapPin,
    title: 'Google Business Profile',
    desc: 'A fully optimized GBP listing — set up, verified, and handed off to you. Shows up right in Google Maps and search results when local customers are looking.',
    color: '#2D9E6B',
  },
  {
    id: 'social',
    Icon: ShareNetwork,
    title: 'Social Profile Launch',
    desc: 'The right accounts created, your branding applied, and everything handed off ready to use. No content management — just a professional presence, set up correctly from the start.',
    color: '#8B5CF6',
  },
  {
    id: 'care',
    Icon: ShieldCheck,
    title: 'Site Care Plan',
    desc: 'Monthly backups, updates, and uptime monitoring so your site stays healthy. Routine requests handled within 48 hours. Urgent issues — site down, broken form — within 24 hours. One person, no tickets.',
    wide: true,
    color: '#F59E0B',
  },
];

export default function Services() {
  useEffect(() => {
    const cards = document.querySelectorAll('.svc-card');

    function handleMove(e, card) {
      const r = card.getBoundingClientRect();
      const x = e.clientX - r.left;
      const y = e.clientY - r.top;
      const cx = r.width / 2;
      const cy = r.height / 2;
      const rotX = ((y - cy) / cy) * -5;
      const rotY = ((x - cx) / cx) * 5;
      card.style.transform = `translateY(-4px) rotateX(${rotX}deg) rotateY(${rotY}deg)`;
      card.style.transformStyle = 'preserve-3d';
    }

    function handleLeave(card) {
      card.style.transform = '';
    }

    const cleanups = [];
    cards.forEach(card => {
      const move = e => handleMove(e, card);
      const leave = () => handleLeave(card);
      card.addEventListener('mousemove', move);
      card.addEventListener('mouseleave', leave);
      cleanups.push(() => {
        card.removeEventListener('mousemove', move);
        card.removeEventListener('mouseleave', leave);
      });
    });

    return () => cleanups.forEach(fn => fn());
  }, []);

  return (
    <section id="services" className="services">
      <div className="section-inner">
        <header className="section-header reveal-up">
          <p className="section-eyebrow">Services</p>
          <div className="title-reveal">
            <h2 className="section-title">
              Everything a local&nbsp;<br className="br-desktop" />
              business needs online.
            </h2>
          </div>
          <p className="section-sub">
            No subscriptions, no hidden fees. One person who builds it, owns it, and keeps it running.
          </p>
        </header>

        <div className="services-grid services-grid--asymmetric">
          {SERVICES.map((svc, i) => (
            <div
              key={svc.id}
              className={[
                'svc-card reveal-up',
                svc.featured ? 'svc-card--featured' : '',
                svc.wide ? 'svc-card--wide' : '',
              ].filter(Boolean).join(' ')}
              style={{ '--card-color': svc.color, '--delay': `${i * 60}ms` }}
            >
              <div className="svc-card__icon-wrap">
                <svc.Icon weight="duotone" aria-hidden="true" />
              </div>
              {svc.featured ? (
                <div className="svc-card__feature-body">
                  <h3 className="svc-card__title">{svc.title}</h3>
                  <p className="svc-card__desc">{svc.desc}</p>
                  <ul className="svc-card__list">
                    {svc.list.map(item => <li key={item}>{item}</li>)}
                  </ul>
                </div>
              ) : (
                <>
                  <h3 className="svc-card__title">{svc.title}</h3>
                  <p className="svc-card__desc">{svc.desc}</p>
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
