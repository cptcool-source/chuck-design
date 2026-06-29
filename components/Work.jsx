'use client';
import { useRef, useEffect } from 'react';

const WORK_CARDS = [
  {
    icon: 'ph-duotone ph-fork-knife',
    eyebrow: 'Restaurants & Food',
    title: 'Sites that fill tables',
    desc: 'Menus that load on a phone, reservation links that actually work, and local SEO that puts you in front of hungry customers.',
    color: '#E05C3A',
  },
  {
    icon: 'ph-duotone ph-wrench',
    eyebrow: 'Home Services & Trades',
    title: 'More calls, less driving around',
    desc: 'Service-area pages, click-to-call buttons, and Google Business Profiles that rank for "near me" searches.',
    color: '#4A90D9',
  },
  {
    icon: 'ph-duotone ph-stethoscope',
    eyebrow: 'Health, Wellness & Professional',
    title: 'Build trust before they arrive',
    desc: 'Clean, credible sites for practitioners, coaches, and professionals who need clients to feel confident before the first appointment.',
    color: '#2D9E6B',
  },
];

const PORTFOLIO = [
  {
    img: '/images/mamba-tech.png',
    tag: 'Tech Consulting',
    title: 'Mamba Tech Solutions',
    desc: 'Clean, conversion-focused site for a local IT consulting firm.',
  },
  {
    img: '/images/family-hub-home.png',
    tag: 'Family App',
    title: 'Family Hub — Home',
    desc: 'Primary dashboard for a family organization web app.',
  },
  {
    img: '/images/family-hub-funzone.png',
    tag: 'Family App',
    title: 'Family Hub — Fun Zone',
    desc: 'Kids-focused activity hub within the Family Hub platform.',
  },
];

export default function Work({ onOpenLightbox }) {
  const railRef = useRef(null);

  useEffect(() => {
    const rail = railRef.current;
    if (!rail) return;

    let isDown = false;
    let startX = 0;
    let scrollLeft = 0;

    function onDown(e) {
      isDown = true;
      rail.classList.add('dragging');
      startX = e.pageX - rail.offsetLeft;
      scrollLeft = rail.scrollLeft;
    }
    function onUp() {
      isDown = false;
      rail.classList.remove('dragging');
    }
    function onMove(e) {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - rail.offsetLeft;
      const walk = (x - startX) * 1.4;
      rail.scrollLeft = scrollLeft - walk;
    }

    rail.addEventListener('mousedown', onDown);
    rail.addEventListener('mouseleave', onUp);
    rail.addEventListener('mouseup', onUp);
    rail.addEventListener('mousemove', onMove);

    return () => {
      rail.removeEventListener('mousedown', onDown);
      rail.removeEventListener('mouseleave', onUp);
      rail.removeEventListener('mouseup', onUp);
      rail.removeEventListener('mousemove', onMove);
    };
  }, []);

  return (
    <section id="work" className="work">
      <div className="section-inner">
        <header className="section-header reveal-up">
          <p className="section-eyebrow">Industries we serve</p>
          <div className="title-reveal">
            <h2 className="section-title">
              Built for businesses that&nbsp;<br className="br-desktop" />
              can't afford to look average.
            </h2>
          </div>
          <p className="section-sub">
            We focus on Southwest Florida's most competitive local markets — the ones where first
            impressions decide whether they call you or scroll past.
          </p>
        </header>

        <div className="work-grid">
          {WORK_CARDS.map((card, i) => {
            const isWide = i === WORK_CARDS.length - 1;
            const cardContent = (
              <>
                <p className="work-card__eyebrow">{card.eyebrow}</p>
                <h3 className="work-card__title">{card.title}</h3>
                <p className="work-card__desc">{card.desc}</p>
                <a href="#contact" className="work-card__link">
                  Get a free quote <i className="ph ph-arrow-right" aria-hidden="true" />
                </a>
              </>
            );
            return (
              <div
                key={card.eyebrow}
                className={`work-card reveal-up${isWide ? ' work-card--wide' : ''}`}
                style={{ '--card-color': card.color, '--delay': `${i * 100}ms` }}
              >
                <i className={`work-card__icon ${card.icon}`} aria-hidden="true" />
                {isWide ? (
                  <div className="work-card__body">{cardContent}</div>
                ) : cardContent}
              </div>
            );
          })}
        </div>

        <div className="portfolio-divider reveal-up">
          <div className="portfolio-divider__rule" aria-hidden="true" />
          <span className="portfolio-divider__label">Selected work</span>
          <div className="portfolio-divider__rule" aria-hidden="true" />
        </div>

        <div className="portfolio-rail-wrap">
          <div
            className="portfolio-rail"
            ref={railRef}
            role="list"
            aria-label="Portfolio"
          >
            {PORTFOLIO.map((item, i) => (
              <button
                key={item.title}
                className="portfolio-card reveal-up"
                role="listitem"
                style={{ '--delay': `${i * 100}ms` }}
                onClick={() => onOpenLightbox(item.img, item.title)}
                aria-label={`View ${item.title}`}
              >
                <div className="portfolio-card__img-wrap">
                  <img
                    src={item.img}
                    alt={item.title}
                    className="portfolio-card__img"
                    loading="lazy"
                  />
                  <div className="portfolio-card__overlay" aria-hidden="true">
                    <span className="portfolio-card__cta">
                      <i className="ph ph-arrows-out" />
                    </span>
                  </div>
                </div>
                <div className="portfolio-card__meta">
                  <span className="portfolio-card__tag">{item.tag}</span>
                  <h3 className="portfolio-card__title">{item.title}</h3>
                  <p className="portfolio-card__desc">{item.desc}</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
