import { useState } from 'react';
import Icon from './Icon';
import './Overview.css';

export default function Overview({ listing, basicsRef }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <section className="overview">
      <div className="overview__basics" ref={basicsRef}>
        <h2 className="overview__subtitle">{listing.subtitle}</h2>
        <p className="overview__guests">{listing.guestsSummary}</p>
      </div>

      <div className="overview__badge-row">
        {listing.guestFavourite && (
          <div className="favourite-badge">
            <div className="favourite-badge__identity">
              <Icon name="laurel" size={39} strokeWidth={1.65} className="favourite-badge__laurel favourite-badge__laurel--left" />
              <strong>Guest<br />favourite</strong>
              <Icon name="laurel" size={39} strokeWidth={1.65} className="favourite-badge__laurel favourite-badge__laurel--right" />
            </div>

            <div className="favourite-badge__message">
              One of the most loved homes on Airbnb,<br className="favourite-badge__break" /> according to guests
            </div>

            <div className="favourite-badge__rating">
              <strong>{listing.rating.toFixed(2)}</strong>
              <div className="rating-summary__stars" aria-hidden="true">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Icon key={i} name="star" size={12} filled />
                ))}
              </div>
            </div>

            <div className="favourite-badge__divider" />

            <div className="favourite-badge__reviews">
              <strong>{listing.reviewCount}</strong>
              <span>Reviews</span>
            </div>
          </div>
        )}
      </div>

      <div className="host-row">
        <div className="host-row__avatar" aria-hidden="true">
          {listing.host.name.charAt(0)}
        </div>
        <div>
          <p className="host-row__hosted-by">Hosted by {listing.host.name}</p>
          <p className="host-row__years">{listing.host.yearsHosting} years hosting</p>
        </div>
      </div>

      <ul className="highlight-list">
        {listing.highlights.map((h) => (
          <li key={h.title} className="highlight-list__item">
            <Icon name={h.icon} size={26} strokeWidth={1.2} />
            <div>
              <strong>{h.title}</strong>
              <p>{h.body}</p>
            </div>
          </li>
        ))}
      </ul>

      <div className="translation-note">
        Some info has been automatically translated. <button className="link-btn">Show original</button>
      </div>

      <div className="description">
        <p className={expanded ? 'description__text--expanded' : 'description__text--clamped'}>
          {listing.description}
        </p>
        <button
          className="show-more-btn"
          type="button"
          onClick={() => setExpanded((value) => !value)}
          aria-expanded={expanded}
        >
          {expanded ? 'Show less' : 'Show more'} <Icon name="chevronRight" size={18} />
        </button>
      </div>

      <div className="sleep-section">
        <h3>Where you'll sleep</h3>
        <div className="sleep-cards">
          {listing.sleepCards.map((c) => (
            <div className="sleep-card" key={c.room}>
              <img src={c.img} alt={c.room} />
              <strong>{c.room}</strong>
              <span>{c.detail}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
