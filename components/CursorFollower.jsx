'use client';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function CursorFollower() {
  const cursorRef = useRef(null);

  useEffect(() => {
    const el = cursorRef.current;
    if (!el) return;
    if (window.matchMedia('(hover: none)').matches) return;

    gsap.set(el, { xPercent: -50, yPercent: -50, x: -200, y: -200 });

    const xTo = gsap.quickTo(el, 'x', { duration: 0.5, ease: 'power3' });
    const yTo = gsap.quickTo(el, 'y', { duration: 0.5, ease: 'power3' });

    let visible = false;

    function onMove(e) {
      if (!visible) {
        gsap.to(el, { opacity: 1, duration: 0.4 });
        visible = true;
      }
      xTo(e.clientX);
      yTo(e.clientY);
    }

    function onLeave() {
      gsap.to(el, { opacity: 0, duration: 0.3 });
      visible = false;
    }

    function onEnter() {
      if (visible) gsap.to(el, { opacity: 1, duration: 0.3 });
    }

    window.addEventListener('mousemove', onMove);
    document.documentElement.addEventListener('mouseleave', onLeave);
    document.documentElement.addEventListener('mouseenter', onEnter);

    return () => {
      window.removeEventListener('mousemove', onMove);
      document.documentElement.removeEventListener('mouseleave', onLeave);
      document.documentElement.removeEventListener('mouseenter', onEnter);
    };
  }, []);

  return (
    <div ref={cursorRef} className="cursor-follower" aria-hidden="true">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="22" height="22">
        <rect width="100" height="100" rx="22" fill="#111111"/>
        <rect x="26" y="26" width="48" height="48" fill="#E05C3A"/>
      </svg>
    </div>
  );
}
