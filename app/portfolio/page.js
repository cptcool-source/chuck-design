'use client';
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Lightbox from '@/components/Lightbox';
import './portfolio.css';

const PROJECTS = [
  { title: 'Alderton Property Group', category: 'Real Estate',      year: '2025', image: '/images/p01.png' },
  { title: 'Form & Grain',            category: 'Architecture',     year: '2025', image: '/images/p02.png' },
  { title: 'Perimeter Zero',          category: 'Cybersecurity',    year: '2025', image: '/images/p03.png' },
  { title: 'Coquille',                category: 'Restaurant',       year: '2025', image: '/images/p04.png' },
  { title: 'Lowband Studios',         category: 'Recording Studio', year: '2025', image: '/images/p05.png' },
  { title: 'Cairn Interiors',         category: 'Interior Design',  year: '2025', image: '/images/p06.png' },
  { title: 'MambaHire — Classic',     category: 'Web App',          year: '2024', image: '/images/p07.png' },
  { title: 'Kinetic',                 category: 'Health & Fitness', year: '2024', image: '/images/p08.png' },
  { title: 'Mamba Connections — OG',  category: 'Web App',          year: '2024', image: '/images/p09.png' },
  { title: 'The Saltgrass Inn',       category: 'Hospitality',      year: '2024', image: '/images/p10.png' },
  { title: 'Goldstar Pediatrics',     category: 'Health',           year: '2025', image: '/images/p11.png' },
  { title: 'chuck design',            category: 'Web Design',       year: '2026', image: '/images/p12.png' },
  { title: 'Family Hub — Home',       category: 'Web App',          year: '2026', image: '/images/p13.png' },
  { title: 'Family Hub — Calendar',   category: 'Web App',          year: '2026', image: '/images/p14.png' },
  { title: 'Family Hub — Memories',   category: 'Web App',          year: '2026', image: '/images/p15.png' },
  { title: 'Family Hub — mAxI',       category: 'Web App',          year: '2026', image: '/images/p16.png' },
  { title: 'Family Hub — Fun Zone',   category: 'Web App',          year: '2026', image: '/images/p17.png' },
  { title: 'Family Hub — Study Zone', category: 'Web App',          year: '2026', image: '/images/p18.png' },
  { title: 'Family Hub — Chores',     category: 'Web App',          year: '2026', image: '/images/p19.png' },
  { title: 'Mamba Tech Solutions',    category: 'Tech Services',    year: '2026', image: '/images/p20.png' },
];

const SCALE   = [1, 0.78, 0.60, 0.44];
const OPACITY = [1, 0.72, 0.46, 0.22];
const N = PROJECTS.length;

function getSpacing() {
  if (typeof window === 'undefined') return 620;
  return window.innerWidth < 700 ? 310 : window.innerWidth < 900 ? 420 : 620;
}

export default function PortfolioPage() {
  const activeRef   = useRef(0);
  const lockedRef   = useRef(false);
  const cardRefs    = useRef([]);
  const stageRef    = useRef(null);
  const footerRef   = useRef(null);
  const scrollLockY = useRef(0);
  const [lightbox, setLightbox] = useState({ open: false, src: '', alt: '' });

  function circDist(i) {
    let d = i - activeRef.current;
    if (d >  N / 2) d -= N;
    if (d < -N / 2) d += N;
    return d;
  }

  function render(instant = false) {
    const sp = getSpacing();
    cardRefs.current.forEach((card, i) => {
      if (!card) return;
      const d    = circDist(i);
      const absd = Math.abs(d);
      const idx  = Math.min(absd, 3);
      const isActive = absd === 0;

      if (instant) card.style.transition = 'none';

      card.style.transform = `translate(-50%, -50%) translateX(${d * sp}px) scale(${SCALE[idx]})`;
      card.style.opacity   = OPACITY[idx];
      card.style.zIndex    = 10 - absd;
      card.style.cursor    = isActive ? 'default' : 'pointer';
      card.setAttribute('tabindex', isActive ? '0' : '-1');

      const face = card.querySelector('.pf-card-face');
      const img  = card.querySelector('.pf-card-img');
      if (face) face.style.opacity = isActive ? '1' : '0';
      if (img)  img.style.opacity  = isActive ? '1' : '0';

      if (instant) {
        void card.offsetWidth;
        card.style.transition = '';
      }
    });
  }

  function goTo(index) {
    if (lockedRef.current) return;
    const next = ((index % N) + N) % N;
    if (next === activeRef.current) return;
    activeRef.current = next;
    lockedRef.current = true;
    render();
    setTimeout(() => { lockedRef.current = false; }, 320);
  }

  function advance(dir) { goTo(activeRef.current + dir); }

  function scrollToBottom() {
    footerRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
  }

  function openLightbox(src, alt) {
    scrollLockY.current = window.scrollY;
    setLightbox({ open: true, src, alt });
    document.body.style.overflow  = 'hidden';
    document.body.style.position  = 'fixed';
    document.body.style.top       = `-${scrollLockY.current}px`;
    document.body.style.left      = '0';
    document.body.style.right     = '0';
  }

  function closeLightbox() {
    setLightbox(prev => ({ ...prev, open: false }));
    document.body.style.overflow  = '';
    document.body.style.position  = '';
    document.body.style.top       = '';
    document.body.style.left      = '';
    document.body.style.right     = '';
    window.scrollTo(0, scrollLockY.current);
  }

  useEffect(() => {
    render(true);

    const stage = stageRef.current;
    let wheelBuffer = 0;
    let wheelTimer  = null;

    function handleWheel(e) {
      e.preventDefault();
      wheelBuffer += e.deltaY + e.deltaX;
      clearTimeout(wheelTimer);
      wheelTimer = setTimeout(() => { wheelBuffer = 0; }, 80);
      if (Math.abs(wheelBuffer) >= 20) {
        advance(wheelBuffer > 0 ? 1 : -1);
        wheelBuffer = 0;
      }
    }

    let touchStartX = 0;
    function handleTouchStart(e) { touchStartX = e.touches[0].clientX; }
    function handleTouchEnd(e) {
      const dx = touchStartX - e.changedTouches[0].clientX;
      if (Math.abs(dx) > 40) advance(dx > 0 ? 1 : -1);
    }

    function handleKeyDown(e) {
      if (lightbox.open) return;
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') { e.preventDefault(); advance(1); }
      if (e.key === 'ArrowLeft'  || e.key === 'ArrowUp')   { e.preventDefault(); advance(-1); }
    }

    stage.addEventListener('wheel', handleWheel, { passive: false });
    stage.addEventListener('touchstart', handleTouchStart, { passive: true });
    stage.addEventListener('touchend', handleTouchEnd, { passive: true });
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      stage.removeEventListener('wheel', handleWheel);
      stage.removeEventListener('touchstart', handleTouchStart);
      stage.removeEventListener('touchend', handleTouchEnd);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="pf-page">
      <header className="pf-header">
        <Link href="/" className="pf-wordmark" aria-label="chuck design — back to main site">
          <span className="pf-name">chuck</span>
          <em className="pf-descriptor">design</em>
        </Link>
      </header>

      <section
        className="pf-stage"
        ref={stageRef}
        aria-label="Portfolio carousel — scroll or swipe to browse"
      >
        {PROJECTS.map((p, i) => (
          <div
            key={p.title}
            className="pf-card"
            role="button"
            tabIndex={i === 0 ? 0 : -1}
            aria-label={p.title}
            ref={el => { cardRefs.current[i] = el; }}
            onClick={() => {
              const d = circDist(i);
              if (d === 0) openLightbox(p.image, p.title);
              else advance(d > 0 ? 1 : -1);
            }}
            onKeyDown={e => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                const d = circDist(i);
                if (d === 0) openLightbox(p.image, p.title);
                else advance(d > 0 ? 1 : -1);
              }
            }}
          >
            <div className="pf-card-glow" aria-hidden="true" />
            <div className="pf-card-face" aria-hidden="true" />
            <div className="pf-card-img">
              <img src={p.image} alt={p.title} loading="lazy" />
            </div>
          </div>
        ))}

        <button
          type="button"
          className="pf-scroll-btn"
          aria-label="Scroll to bottom of page"
          onClick={scrollToBottom}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M12 4v16M6 14l6 6 6-6" />
          </svg>
        </button>
      </section>

      <section className="pf-logo-section" aria-label="chuck design">
        <div className="pf-logo">
          <div className="pf-logo-row">
            <span className="pf-logo-name">chuck</span>
            <span className="pf-logo-dot" aria-hidden="true" />
          </div>
          <span className="pf-logo-sub">design</span>
        </div>
      </section>

      <footer className="pf-footer" ref={footerRef}>
        <div className="pf-footer-inner">
          <Link href="/" className="pf-footer-logo">
            chuck<em> design</em>
          </Link>
          <span className="pf-footer-copy">
            &copy; 2026 chuck design &nbsp;&middot;&nbsp; North Port, FL 34291 &nbsp;&middot;&nbsp;{' '}
            <Link href="/privacy" style={{ color: 'inherit', textDecoration: 'underline' }}>Privacy</Link>
          </span>
          <a href="mailto:charles@chuckdesign.com" className="pf-footer-email">
            charles@chuckdesign.com
          </a>
        </div>
      </footer>

      <Lightbox {...lightbox} onClose={closeLightbox} />
    </div>
  );
}
