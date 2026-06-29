const AREAS = ['North Port', 'Venice', 'Englewood', 'Port Charlotte', 'Osprey', 'Southwest FL'];

export default function About() {
  return (
    <section id="about" className="about">
      <div className="section-inner">
        <div className="about__inner">
          <div className="about__content">
            <header className="section-header reveal-up">
              <p className="section-eyebrow">About</p>
              <div className="title-reveal">
                <h2 className="section-title">
                  A real person,<br className="br-desktop" /> not an agency.
                </h2>
              </div>
            </header>

            <blockquote className="about__quote reveal-up">
              "Design without strategy is decoration.
              Strategy without design is invisible."
            </blockquote>

            <p className="about__body reveal-up">
              I'm Charles Spivey — a web designer based in North Port, FL. I work directly with
              local business owners to build sites that attract customers and hold up over time.
              No account managers, no offshore teams. You talk to the person who builds your site.
            </p>

            <p className="about__body reveal-up" style={{ '--delay': '60ms' }}>
              My background is in both design and development, which means the site you get looks
              intentional and functions correctly — not one at the expense of the other. I've built
              sites for restaurants, service businesses, and professional practices across Southwest Florida.
            </p>

            <a
              href="mailto:charles@chuckdesign.com"
              className="about__email reveal-up"
              style={{ '--delay': '120ms' }}
            >
              <i className="ph-duotone ph-envelope-simple" aria-hidden="true" />
              charles@chuckdesign.com
            </a>
          </div>

          <div className="about__areas">
            <div className="about__portrait reveal-up">
              <img
                src="/images/family.png"
                alt="Charles Spivey with family in North Port, FL"
                className="about__portrait-img"
                loading="lazy"
              />
            </div>

            <p className="about__areas-label">Serving</p>
            <ul className="areas-list" aria-label="Service areas">
              {AREAS.map(city => (
                <li key={city}><span className="area-tag">{city}</span></li>
              ))}
            </ul>
            <p className="about__local-note">34291 · North Port, FL · Sarasota County</p>
          </div>
        </div>
      </div>
    </section>
  );
}
