import { useEffect, useRef, useState } from 'react';
import Icon from './Icon';
import { rooms } from '../data/listing';
import './PhotoTour.css';

// Groups a room's photos into display rows: each 'full' photo is its own
// row; consecutive 'half' photos are paired into two-up rows.
function groupPhotoRows(photos) {
  const rows = [];
  let pendingHalf = null;
  for (const p of photos) {
    if (p.layout === 'full') {
      if (pendingHalf) { rows.push([pendingHalf]); pendingHalf = null; }
      rows.push([p]);
    } else {
      if (pendingHalf) { rows.push([pendingHalf, p]); pendingHalf = null; }
      else pendingHalf = p;
    }
  }
  if (pendingHalf) rows.push([pendingHalf]);
  return rows;
}

export default function PhotoTour({ onClose, onOpenLightbox, saved, onToggleSave, scrollToRoom, hidden }) {
  const [showGrid, setShowGrid] = useState(true);
  const roomRefs = useRef({});
  const scrollerRef = useRef(null);
  const containerRef = useRef(null);
  const backButtonRef = useRef(null);

  useEffect(() => {
    // Move focus into the modal on open, for screen-reader and keyboard users.
    if (!hidden) backButtonRef.current?.focus();
  }, [hidden]);

  useEffect(() => {
    // Trap Tab focus within this modal while it's the active layer.
    if (hidden) return;
    function onKeyDown(e) {
      if (e.key === 'Escape') { onClose(); return; }
      if (e.key !== 'Tab') return;
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
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [onClose, hidden]);

  useEffect(() => {
    // Lock body scroll while modal is open.
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = prevOverflow; };
  }, []);

  useEffect(() => {
    if (scrollToRoom && roomRefs.current[scrollToRoom]) {
      setShowGrid(false);
      // Double rAF: wait for the grid-hidden re-render to actually commit
      // and paint before measuring scroll position, otherwise we scroll
      // against stale (pre-reflow) layout.
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          roomRefs.current[scrollToRoom]?.scrollIntoView({ block: 'start' });
        });
      });
    }
  }, [scrollToRoom]);

  const jumpToRoom = (roomName) => {
    setShowGrid(false);
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        roomRefs.current[roomName]?.scrollIntoView({ block: 'start' });
      });
    });
  };

  return (
    <div
      className="photo-tour"
      role="dialog"
      aria-modal="true"
      aria-label="Photo tour"
      ref={containerRef}
      style={hidden ? { visibility: 'hidden' } : undefined}
    >
      <header className="photo-tour__header">
        <button className="photo-tour__back" onClick={onClose} aria-label="Close photo tour" ref={backButtonRef}>
          <Icon name="chevronLeft" size={22} />
        </button>
        <h2>Photo tour</h2>
        <div className="photo-tour__header-actions">
          <button className="icon-only-btn" aria-label="Share this listing"><Icon name="share" size={18} /></button>
          <button
            className="icon-only-btn"
            aria-pressed={saved}
            aria-label={saved ? 'Remove from saved' : 'Save this listing'}
            onClick={onToggleSave}
          >
            <Icon name="heart" size={18} filled={saved} className={saved ? 'title-row__heart--saved' : ''} />
          </button>
        </div>
      </header>

      <div className="photo-tour__scroll" ref={scrollerRef}>
        {showGrid && (
          <div className="photo-tour__grid">
            {rooms.map((r) => (
              <button
                key={r.name}
                className="photo-tour__grid-item"
                onClick={() => jumpToRoom(r.name)}
              >
                <img src={r.photos[0].src} alt={r.name} />
                <span>{r.name}</span>
              </button>
            ))}
          </div>
        )}

        <div className="photo-tour__rooms">
          {rooms.map((r) => (
            <div
              className="photo-tour__room-row"
              key={r.name}
            >
              <div className="photo-tour__room-info" ref={(el) => { roomRefs.current[r.name] = el; }}>
                <h3>{r.name}</h3>
                {r.amenities && <p>{r.amenities}</p>}
              </div>
              <div className="photo-tour__room-photos">
                {groupPhotoRows(r.photos).map((row, ri) => (
                  <div className="photo-tour__photo-row" key={ri}>
                    {row.map((p, i) => (
                      <button
                        key={p.id}
                        className={`photo-tour__photo photo-tour__photo--${p.layout}`}
                        onClick={() => onOpenLightbox(p.id)}
                      >
                        <img src={p.src} alt={`${r.name} photo ${i + 1}`} />
                      </button>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
