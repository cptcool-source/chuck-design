'use client';
import { useEffect, useRef, useState } from 'react';

export default function Lightbox({ open, src, alt, onClose }) {
  const imgRef = useRef(null);
  const [scale, setScale] = useState(1);
  const [zoomed, setZoomed] = useState(false);

  useEffect(() => {
    if (!open) {
      setScale(1);
      setZoomed(false);
      return;
    }
    function onKey(e) {
      if (e.key === 'Escape') onClose();
    }
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  useEffect(() => {
    const img = imgRef.current;
    if (!img) return;
    function handleWheel(e) {
      e.preventDefault();
      setScale(s => Math.min(Math.max(s - e.deltaY * 0.001, 1), 3));
    }
    img.addEventListener('wheel', handleWheel, { passive: false });
    return () => img.removeEventListener('wheel', handleWheel);
  }, []);

  function handleImgClick() {
    if (zoomed) {
      setScale(1);
      setZoomed(false);
    } else {
      setScale(2);
      setZoomed(true);
    }
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
        <i className="ph ph-x" aria-hidden="true" />
      </button>
      <div className="lightbox__stage">
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
