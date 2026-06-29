'use client';
import { useEffect, useRef, useState } from 'react';
import { X } from '@phosphor-icons/react';

export default function Lightbox({ open, src, alt, onClose }) {
  const imgRef      = useRef(null);
  const stageRef    = useRef(null);
  const scaleRef    = useRef(1);
  const pinchDist   = useRef(null);
  const pinchScale  = useRef(1);
  const [scale, setScale]   = useState(1);
  const [zoomed, setZoomed] = useState(false);

  // Keep scaleRef in sync for use inside passive event handlers
  useEffect(() => { scaleRef.current = scale; }, [scale]);

  useEffect(() => {
    if (!open) {
      setScale(1);
      setZoomed(false);
      scaleRef.current = 1;
      return;
    }
    function onKey(e) {
      if (e.key === 'Escape') onClose();
    }
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  // Scroll-wheel zoom (desktop)
  useEffect(() => {
    const img = imgRef.current;
    if (!img) return;
    function handleWheel(e) {
      e.preventDefault();
      setScale(s => {
        const next = Math.min(Math.max(s - e.deltaY * 0.001, 1), 3);
        scaleRef.current = next;
        return next;
      });
    }
    img.addEventListener('wheel', handleWheel, { passive: false });
    return () => img.removeEventListener('wheel', handleWheel);
  }, []);

  // Pinch-to-zoom (iOS / touch)
  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;

    function dist(e) {
      return Math.hypot(
        e.touches[0].clientX - e.touches[1].clientX,
        e.touches[0].clientY - e.touches[1].clientY
      );
    }
    function onTouchStart(e) {
      if (e.touches.length === 2) {
        pinchDist.current  = dist(e);
        pinchScale.current = scaleRef.current;
      }
    }
    function onTouchMove(e) {
      if (e.touches.length === 2 && pinchDist.current) {
        e.preventDefault();
        const ratio = dist(e) / pinchDist.current;
        const next  = Math.min(3, Math.max(1, pinchScale.current * ratio));
        scaleRef.current = next;
        setScale(next);
      }
    }
    function onTouchEnd(e) {
      if (e.touches.length < 2) pinchDist.current = null;
    }

    stage.addEventListener('touchstart', onTouchStart, { passive: true });
    stage.addEventListener('touchmove', onTouchMove, { passive: false });
    stage.addEventListener('touchend', onTouchEnd, { passive: true });
    return () => {
      stage.removeEventListener('touchstart', onTouchStart);
      stage.removeEventListener('touchmove', onTouchMove);
      stage.removeEventListener('touchend', onTouchEnd);
    };
  }, []);

  function handleImgClick() {
    const next = zoomed ? 1 : 2;
    setScale(next);
    setZoomed(!zoomed);
    scaleRef.current = next;
  }

  if (!src) return null;

  return (
    <div
      className={`lightbox${open ? ' open' : ''}`}
      role="dialog"
      aria-modal="true"
      aria-label={alt ? `Image: ${alt}` : 'Image preview'}
    >
      <div className="lightbox__backdrop" onClick={onClose} />
      <button
        className="lightbox__close"
        onClick={onClose}
        aria-label="Close image preview"
      >
        <X aria-hidden="true" />
      </button>
      <div className="lightbox__stage" ref={stageRef}>
        <img
          ref={imgRef}
          src={src}
          alt={alt || ''}
          className="lightbox__img"
          style={{
            transform: `scale(${scale})`,
            cursor: zoomed ? 'zoom-out' : 'zoom-in',
          }}
          onClick={handleImgClick}
          draggable="false"
        />
      </div>
      <p className="lightbox__hint">Scroll to zoom · Click to toggle · Esc to close</p>
    </div>
  );
}
