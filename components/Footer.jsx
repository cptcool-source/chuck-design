'use client';
import Link from 'next/link';
import { YoutubeLogo, TiktokLogo, InstagramLogo } from '@phosphor-icons/react';

const SOCIALS = [
  { href: 'https://www.youtube.com/@chuck-design',          Icon: YoutubeLogo,   label: 'YouTube'   },
  { href: 'https://www.tiktok.com/@charles_web_design',     Icon: TiktokLogo,    label: 'TikTok'    },
  { href: null },
  { href: 'https://www.instagram.com/chuckdesign.ig/',      Icon: InstagramLogo, label: 'Instagram' },
];

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <span className="footer-logo">
          chuck
          <span style={{ color: 'var(--accent)', fontStyle: 'italic', fontWeight: 300 }}>
            design
          </span>
        </span>

        <span className="footer-copy">
          © {year} chuck design · North Port, FL &nbsp;·&nbsp;{' '}
          <Link href="/privacy" style={{ color: 'inherit', textDecoration: 'underline' }}>Privacy</Link>
        </span>

        <nav className="footer-social" aria-label="Social media">
          {SOCIALS.map((s, i) =>
            s.href ? (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="footer-social-link"
                aria-label={`${s.label} (opens in new tab)`}
              >
                <s.Icon size={18} weight="duotone" aria-hidden="true" />
              </a>
            ) : (
              <span key={i} className="footer-social-x" aria-hidden="true">✕</span>
            )
          )}
        </nav>

        <a href="mailto:charles@chuckdesign.com" className="footer-email">
          charles@chuckdesign.com
        </a>
      </div>
    </footer>
  );
}
