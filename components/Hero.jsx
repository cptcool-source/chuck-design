'use client';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChatCircleText, ArrowRight } from '@phosphor-icons/react';

export default function Hero() {
  const sectionRef = useRef(null);
  const orbRef     = useRef(null);
  const ch1Ref     = useRef(null);
  const ch2Ref     = useRef(null);
  const ch3Ref     = useRef(null);
  const revealRef  = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const mm = gsap.matchMedia();

    mm.add(
      '(min-width: 768px) and (prefers-reduced-motion: no-preference)',
      () => {
        // Set chapter transform start states (CSS handles opacity: 0 via media query)
        gsap.set(ch1Ref.current,    { x: -80, skewX: -3 });
        gsap.set(ch2Ref.current,    { y: 50 });
        gsap.set(ch3Ref.current,    { y: 60 });
        gsap.set(revealRef.current, { y: 28 });
        // Orb stays at CSS opacity: 0.28 — no gsap.set here, avoids scrub conflict

        // Scroll-pinned scrubbed timeline
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger:      sectionRef.current,
            start:        'top top',
            end:          '+=250%',
            pin:          true,
            scrub:        1.2,
            anticipatePin: 1,
          },
        });

        // Orb swells over the full scroll range
        tl.to(orbRef.current,
          { opacity: 0.44, scale: 1.12, ease: 'none', duration: 10 },
          0
        );

        // Chapter 2: DESIGNS slams in from left
        tl.fromTo(ch1Ref.current,
          { opacity: 0, x: -80, skewX: -3 },
          { opacity: 1, x: 0, skewX: 0, ease: 'power3.out', duration: 1.5 },
          1.5
        );

        // Chapter 3: made to rises
        tl.fromTo(ch2Ref.current,
          { opacity: 0, y: 50 },
          { opacity: 1, y: 0, ease: 'power2.out', duration: 1.2 },
          4.0
        );

        // Chapter 4: lead. drops in
        tl.fromTo(ch3Ref.current,
          { opacity: 0, y: 60 },
          { opacity: 1, y: 0, ease: 'power2.out', duration: 1.2 },
          6.0
        );

        // Unpin reveal: subtext + CTAs
        tl.fromTo(revealRef.current,
          { opacity: 0, y: 28 },
          { opacity: 1, y: 0, ease: 'power2.out', duration: 1.0 },
          8.2
        );

        return () => {};
      }
    );

    // Static fallback: mobile + reduced motion
    mm.add(
      '(max-width: 767px), (prefers-reduced-motion: reduce)',
      () => {
        gsap.set(orbRef.current, { opacity: 0.28, scale: 1 });
        gsap.set(
          [ch1Ref.current, ch2Ref.current, ch3Ref.current, revealRef.current],
          { opacity: 1, x: 0, y: 0, skewX: 0 }
        );
        return () => {};
      }
    );

    return () => mm.revert();
  }, []);

  return (
    <section ref={sectionRef} id="hero" className="hero">
      <div className="hero-bg" aria-hidden="true">
        <div ref={orbRef} className="hero-orb" />
      </div>

      <div className="hero-content">
        <div className="hero-chapters">
          <span ref={ch1Ref} className="hero-ch hero-ch1">DESIGNS</span>
          <span ref={ch2Ref} className="hero-ch hero-ch2">made to</span>
          <span ref={ch3Ref} className="hero-ch hero-ch3"><em>lead.</em></span>
        </div>

        <div ref={revealRef} className="hero-reveal">
          <p className="hero-sub">
            Sites that show up in search, load fast, and turn visitors into customers.
          </p>
          <div className="hero-cta-group">
            <a href="#contact" className="btn btn--primary">
              <ChatCircleText weight="duotone" aria-hidden="true" />
              Get a free quote
            </a>
            <a href="#work" className="btn btn--ghost">
              See our work
              <ArrowRight aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
