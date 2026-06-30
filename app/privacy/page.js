export const metadata = {
  title: 'Privacy Policy | chuck design',
  description: 'Privacy policy for chuckdesign.com — how we collect and use data.',
  alternates: { canonical: '/privacy' },
};

export default function PrivacyPage() {
  return (
    <main style={{ maxWidth: '720px', margin: '0 auto', padding: 'clamp(60px,10vw,120px) var(--gutter)' }}>
      <h1 style={{ fontWeight: 800, fontSize: 'clamp(2rem,5vw,3rem)', letterSpacing: '-0.03em', marginBottom: '8px' }}>
        Privacy Policy
      </h1>
      <p style={{ color: 'var(--text-muted)', fontSize: '14px', marginBottom: '48px' }}>
        Last updated: June 30, 2026
      </p>

      <section style={{ marginBottom: '40px' }}>
        <h2>Who we are</h2>
        <p>
          chuck design is a web design studio based in North Port, FL 34291, operated by Charles Spivey.
          This policy covers <strong>chuckdesign.com</strong> and describes what data is collected when
          you visit or contact us.
        </p>
      </section>

      <section style={{ marginBottom: '40px' }}>
        <h2>Analytics</h2>
        <p>
          This site uses <strong>Google Analytics 4</strong> and <strong>Vercel Analytics</strong> to
          understand how visitors interact with the site. These tools collect:
        </p>
        <ul>
          <li>Pages visited and time spent</li>
          <li>Approximate geographic location (country/region)</li>
          <li>Device type, browser, and operating system</li>
          <li>Referring website or search query</li>
        </ul>
        <p>
          This data is aggregated and anonymized — we cannot identify individual visitors. Google
          Analytics may use cookies to track sessions. You can opt out via the{' '}
          <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer">
            Google Analytics opt-out browser add-on
          </a>.
        </p>
      </section>

      <section style={{ marginBottom: '40px' }}>
        <h2>Contact form</h2>
        <p>
          Our contact form is powered by <strong>Formspree</strong>. When you submit a message, your
          name, email address, and message content are transmitted to Formspree and forwarded to our
          inbox. We use this information solely to respond to your inquiry. We do not share this data
          with third parties or use it for marketing without your consent.
        </p>
      </section>

      <section style={{ marginBottom: '40px' }}>
        <h2>Cookies</h2>
        <p>
          We do not set first-party cookies. Google Analytics may set cookies to distinguish unique
          visits. We do not use cookies for advertising or tracking across other websites.
        </p>
      </section>

      <section style={{ marginBottom: '40px' }}>
        <h2>Third-party services</h2>
        <ul>
          <li><strong>Google Analytics</strong> — <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">Privacy policy</a></li>
          <li><strong>Vercel</strong> — <a href="https://vercel.com/legal/privacy-policy" target="_blank" rel="noopener noreferrer">Privacy policy</a></li>
          <li><strong>Formspree</strong> — <a href="https://formspree.io/legal/privacy-policy" target="_blank" rel="noopener noreferrer">Privacy policy</a></li>
        </ul>
      </section>

      <section style={{ marginBottom: '40px' }}>
        <h2>Your rights</h2>
        <p>
          You may request access to, correction of, or deletion of any personal data you have submitted
          through our contact form. To make a request, email{' '}
          <a href="mailto:charles@chuckdesign.com">charles@chuckdesign.com</a>.
        </p>
      </section>

      <section>
        <h2>Changes to this policy</h2>
        <p>
          We may update this policy occasionally. Material changes will be reflected in the "Last
          updated" date above.
        </p>
      </section>
    </main>
  );
}
