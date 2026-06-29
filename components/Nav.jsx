'use client';
import { useState, useEffect } from 'react';

const NAV_LINKS = [
  { href: '#services', label: 'Services' },
  { href: '#process',  label: 'Process'  },
  { href: '#work',     label: 'Work'     },
  { href: '#about',    label: 'About'    },
  { href: '#contact',  label: 'Contact'  },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState('');

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 60);
      const sections = document.querySelectorAll('main section[id]');
      let current = '';
      sections.forEach(sec => {
        if (window.scrollY + 120 >= sec.offsetTop) current = sec.id;
      });
      setActive(current);
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    function onKey(e) {
      if (e.key === 'Escape' && open) setOpen(false);
    }
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open]);

  function handleAnchor(e, href) {
    e.preventDefault();
    setOpen(false);
    const id = href === '#' ? 'body' : href.slice(1);
    if (href === '#') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      const target = document.getElementById(id);
      if (target) target.scrollIntoView({ behavior: 'smooth' });
    }
  }

  return (
    <>
      <nav
        className={`site-nav${scrolled ? ' scrolled' : ''}`}
        role="navigation"
        aria-label="Main"
      >
        <div className="nav-inner">
          <a href="#" className="nav-logo" onClick={e => handleAnchor(e, '#')}>
            chuck<span className="logo-accent">design</span>
          </a>
          <div className="nav-links" role="list">
            {NAV_LINKS.map(({ href, label }) => (
              <a
                key={href}
                href={href}
                className={`nav-link${active === href.slice(1) ? ' active' : ''}`}
                onClick={e => handleAnchor(e, href)}
                role="listitem"
              >
                {label}
              </a>
            ))}
          </div>
          <a
            href="#contact"
            className="btn btn--nav-cta"
            onClick={e => handleAnchor(e, '#contact')}
          >
            Get a free quote
          </a>
          <button
            className="nav-toggle"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            onClick={() => setOpen(v => !v)}
          >
            <span aria-hidden="true" />
            <span aria-hidden="true" />
            <span aria-hidden="true" />
          </button>
        </div>
      </nav>
      <div className={`nav-drawer${open ? ' open' : ''}`} aria-hidden={!open}>
        <nav className="drawer-nav" aria-label="Mobile navigation">
          {NAV_LINKS.map(({ href, label }) => (
            <a
              key={href}
              href={href}
              className="drawer-link"
              onClick={e => handleAnchor(e, href)}
              tabIndex={open ? 0 : -1}
            >
              {label}
            </a>
          ))}
          <a
            href="#contact"
            className="btn btn--primary drawer-cta"
            onClick={e => handleAnchor(e, '#contact')}
            tabIndex={open ? 0 : -1}
          >
            Get a free quote
          </a>
        </nav>
      </div>
    </>
  );
}
