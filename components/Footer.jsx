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
        <span className="footer-copy">© {year} chuck design · North Port, FL</span>
        <a href="mailto:charles@chuckdesign.com" className="footer-email">
          charles@chuckdesign.com
        </a>
      </div>
    </footer>
  );
}
