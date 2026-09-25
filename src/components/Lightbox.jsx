import { useEffect, useRef, useCallback } from 'react';
import Icon from './Icon';
import { allPhotos } from '../data/listing';
import './Lightbox.css';

export default function Lightbox({ photoId, onClose, onBackToGrid, onNavigate }) {
  const index = allPhotos.findIndex((p) => p.id === photoId);
  const photo = allPhotos[index];
  const containerRef = useRef(null);
  const gridButtonRef = useRef(null);

  const goPrev = useCallback(() => {
    if (index > 0) onNavigate(allPhotos[index - 1].id);
  }, [index, onNavigate]);

  const goNext = useCallback(() => {
    if (index < allPhotos.length - 1) onNavigate(allPhotos[index + 1].id);
  }, [index, onNavigate]);

  useEffect(() => {
    gridButtonRef.current?.focus();
  }, []);

  useEffect(() => {
    function onKeyDown(e) {
      if (e.key === 'Escape') { onBackToGrid(); return; }
      if (e.key === 'ArrowLeft') goPrev();
      if (e.key === 'ArrowRight') goNext();
      if (e.key === 'Tab') {
        const focusables = containerRef.current?.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (!focusables || focusables.length === 0) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    }
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [onBackToGrid, goPrev, goNext]);

  if (!photo) return null;

  return (
    <div
      className="lightbox"
      role="dialog"
      aria-modal="true"
      aria-label={`${photo.room}, photo ${index + 1} of ${allPhotos.length}`}
      ref={containerRef}
    >
      <header className="lightbox__header">
        <button className="icon-only-btn" onClick={onBackToGrid} aria-label="Back to photo tour" ref={gridButtonRef}>
          <Icon name="grid" size={20} />
        </button>
        <h2>{photo.room}</h2>
        <div className="lightbox__header-right">
          <span className="lightbox__counter">{index + 1} of {allPhotos.length}</span>
          <button className="icon-only-btn" onClick={onClose} aria-label="Close">
            <Icon name="close" size={20} />
          </button>
        </div>
      </header>

      <div className="lightbox__body">
        <button
          className="lightbox__nav lightbox__nav--prev"
          onClick={goPrev}
          disabled={index === 0}
          aria-label="Previous photo"
        >
          <Icon name="chevronLeft" size={18} />
        </button>

        <img key={photo.id} className="lightbox__image" src={photo.src} alt={`${photo.room}, photo ${index + 1}`} />

        <button
          className="lightbox__nav lightbox__nav--next"
          onClick={goNext}
          disabled={index === allPhotos.length - 1}
          aria-label="Next photo"
        >
          <Icon name="chevronRight" size={18} />
        </button>
      </div>
    </div>
  );
}
