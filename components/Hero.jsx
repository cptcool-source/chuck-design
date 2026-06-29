export default function Hero() {
  return (
    <section id="hero" className="hero">
      <div className="hero-bg" aria-hidden="true">
        <div className="hero-photo" />
        <div className="orb orb--1" />
        <div className="orb orb--2" />
        <div className="orb orb--3" />
      </div>
      <div className="section-inner">
        <div className="hero-content">
          <p className="eyebrow">
            <span className="eyebrow-dot" aria-hidden="true" />
            Web Design&nbsp;·&nbsp;North Port, FL 34291
          </p>
          <h1 className="hero-title">
            <span className="title-heavy">Designs</span>
            <br className="br-desktop" />
            <span className="title-mid">made to</span>
            <br className="br-desktop" />
            <em className="hero-accent">lead.</em>
          </h1>
          <p className="hero-sub">
            Sites that show up in search, load in seconds, and turn visitors into customers.
            Built for North Port and Southwest Florida businesses.
          </p>
          <div className="hero-cta-group">
            <a href="#contact" className="btn btn--primary">
              <i className="ph-duotone ph-chat-circle-text" aria-hidden="true" />
              Get a free quote
            </a>
            <a href="#work" className="btn btn--ghost">
              See our work
              <i className="ph ph-arrow-right" aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
