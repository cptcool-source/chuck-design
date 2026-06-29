import Link from 'next/link';

export const metadata = {
  title: '404 — Page not found · chuck design',
};

export default function NotFound() {
  return (
    <div style={{
      background: '#111111',
      color: '#FAFAF8',
      minHeight: '100dvh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: 'var(--font-outfit), system-ui, sans-serif',
      padding: '2rem',
      textAlign: 'center',
    }}>
      <p style={{
        fontFamily: 'var(--font-geist-mono), monospace',
        fontSize: '11px',
        letterSpacing: '0.2em',
        textTransform: 'uppercase',
        color: '#E05C3A',
        marginBottom: '24px',
      }}>
        404
      </p>
      <h1 style={{
        fontSize: 'clamp(32px, 6vw, 72px)',
        fontWeight: 800,
        letterSpacing: '-0.04em',
        lineHeight: 1,
        marginBottom: '20px',
      }}>
        Page not found.
      </h1>
      <p style={{
        fontSize: '17px',
        color: 'rgba(245,243,238,0.5)',
        lineHeight: 1.65,
        maxWidth: '420px',
        marginBottom: '40px',
      }}>
        That page doesn't exist. Head back to the main site or get in touch directly.
      </p>
      <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', justifyContent: 'center' }}>
        <Link href="/" style={{
          display: 'inline-flex', alignItems: 'center', gap: '8px',
          background: '#E05C3A', color: '#fff', fontWeight: 600,
          fontSize: '15px', padding: '13px 24px', borderRadius: '8px',
          textDecoration: 'none',
        }}>
          Back to home
        </Link>
        <a href="mailto:charles@chuckdesign.com" style={{
          display: 'inline-flex', alignItems: 'center',
          color: 'rgba(245,243,238,0.6)', fontWeight: 600,
          fontSize: '15px', padding: '13px 24px', borderRadius: '8px',
          border: '1px solid rgba(245,243,238,0.18)', textDecoration: 'none',
        }}>
          Email Charles
        </a>
      </div>
    </div>
  );
}
