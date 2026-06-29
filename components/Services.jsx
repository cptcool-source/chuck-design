'use client';
import { useEffect } from 'react';
import { Monitor, MagnifyingGlassPlus, MapPin, ShareNetwork, ShieldCheck, Headset } from '@phosphor-icons/react';

const SERVICES = [
  {
    id: 'web-design',
    Icon: Monitor,
    title: 'Web Design & Development',
    desc: 'Custom sites designed to look great, load fast, and turn visitors into customers.',
    featured: true,
    list: [
      'Designed from scratch — no templates',
      'Mobile-first, responsive on every screen',
      'Search-optimized structure from day one',
      'Fast load times — under 2 seconds',
    ],
    color: '#E05C3A',
  },
  {
    id: 'seo',
    Icon: MagnifyingGlassPlus,
    title: 'Local SEO',
    desc: 'Show up first when customers in your area search for what you offer.',
    color: '#4A90D9',
  },
  {
    id: 'gbp',
    Icon: MapPin,
    title: 'Google Business Profile',
    desc: 'Set up, optimize, and manage your GBP listing to dominate the local map pack.',
    color: '#2D9E6B',
  },
  {
    id: 'social',
    Icon: ShareNetwork,
    title: 'Social Media Setup',
    desc: 'Brand-consistent profiles on the channels your customers actually use.',
    color: '#8B5CF6',
  },
  {
    id: 'maintenance',
    Icon: ShieldCheck,
    title: 'Website Maintenance',
    desc: 'Monthly updates, security patches, backups, and uptime monitoring — so you never think about it.',
    color: '#F59E0B',
  },
  {
    id: 'care',
    Icon: Headset,
    title: 'Priority Support & Site Care',
    desc: 'When something needs to change — a menu update, a new page, a broken link — it gets done same day. No tickets, no waiting, no extra charge.',
    wide: true,
    color: '#E05C3A',
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
