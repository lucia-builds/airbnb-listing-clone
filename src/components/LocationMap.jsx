import { useState } from 'react';
import Icon from './Icon';
import './LocationMap.css';

export default function LocationMap({ listing }) {
  const [expanded, setExpanded] = useState(false);
  return (
    <section className="location-map" id="location">
      <h3>Where you'll be</h3>
      <div className="location-map__canvas" role="img" aria-label="Approximate location map of Candolim, India">
        <svg viewBox="0 0 800 300" preserveAspectRatio="xMidYMid slice" className="location-map__svg">
          <rect width="800" height="300" fill="#e9f0e3" />
          <polygon points="0,0 320,0 0,300" fill="#a8d0e6" />
          <circle cx="230" cy="150" r="55" fill="#cfe3c4" />
          <circle cx="520" cy="190" r="70" fill="#cfe3c4" />
          <g stroke="#d8ded3" strokeWidth="1">
            {Array.from({ length: 9 }).map((_, i) => (
              <line key={`v${i}`} x1={i * 100} y1="0" x2={i * 100} y2="300" />
            ))}
            {Array.from({ length: 4 }).map((_, i) => (
              <line key={`h${i}`} x1="0" y1={i * 100} x2="800" y2={i * 100} />
            ))}
          </g>
        </svg>
        <button className="location-map__search" aria-label="Search map">
          <Icon name="search" size={18} />
        </button>
        <div className="location-map__pin">
          <Icon name="home" size={18} filled />
        </div>
        <div className="location-map__zoom">
          <button aria-label="Zoom in"><Icon name="plus" size={14} /></button>
          <button aria-label="Zoom out"><Icon name="minus" size={14} /></button>
        </div>
      </div>
      <p className="location-map__note">Exact location will be provided after booking.</p>
      <div className="location-map__neighbourhood">
        <h4>Neighbourhood highlights</h4>
        <p className={expanded ? '' : 'location-map__clamped'}>{listing.neighbourhood}</p>
        {!expanded && (
          <button className="show-more-btn" onClick={() => setExpanded(true)}>
            Show more <Icon name="chevronRight" size={14} />
          </button>
        )}
      </div>
    </section>
  );
}
