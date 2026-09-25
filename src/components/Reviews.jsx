import { useState } from 'react';
import Icon from './Icon';
import './Reviews.css';

const CATEGORY_LABELS = {
  cleanliness: { label: 'Cleanliness', icon: 'cleanliness' },
  accuracy: { label: 'Accuracy', icon: 'accuracy' },
  checkin: { label: 'Check-in', icon: 'key' },
  communication: { label: 'Communication', icon: 'message' },
  location: { label: 'Location', icon: 'map' },
  value: { label: 'Value', icon: 'tag' },
};

export default function Reviews({ listing }) {
  const b = listing.reviewBreakdown;
  const [expanded, setExpanded] = useState(false);

  return (
    <section className="reviews" id="reviews">
      <div className="reviews__hero">
        <div className="reviews__score-mark">
          <span className="reviews__laurel reviews__laurel--left" aria-hidden="true" />
          <strong>4.95</strong>
          <span className="reviews__laurel reviews__laurel--right" aria-hidden="true" />
        </div>
        <h3>Guest favourite</h3>
        <p>This home is a guest favourite based on ratings, reviews and<br className="reviews__hero-break" /> reliability</p>
        <button className="link-btn">How reviews work</button>
      </div>

      <div className="reviews__breakdown">
        <div className="reviews__overall">
          <strong>Overall rating</strong>
          {b.overall.map((row) => (
            <div className="reviews__bar-row" key={row.stars}>
              <span>{row.stars}</span>
              <div className="reviews__bar-track">
                <div className="reviews__bar-fill" style={{ width: `${row.pct}%` }} />
              </div>
            </div>
          ))}
        </div>

        {Object.entries(CATEGORY_LABELS).map(([key, item]) => (
          <div className="reviews__category" key={key}>
            <strong>{item.label}</strong>
            <span>{b[key].toFixed(1)}</span>
            <Icon name={item.icon} size={32} />
          </div>
        ))}
      </div>

      <div className="reviews__tags">
        {listing.reviewTags.map((t) => (
          <button className="reviews__tag" key={t.label}>
            <span aria-hidden="true">{t.icon}</span>
            <span>{t.label}</span>
            <span className="reviews__tag-count">{t.count}</span>
          </button>
        ))}
      </div>

      <div className="reviews__list">
        {listing.reviews.slice(0, expanded ? listing.reviews.length : 6).map((r, index) => {
          const long = r.body.length > 115;
          return (
            <article className="review-card" key={`${r.name}-${index}`}>
              <div className="review-card__header">
                <div className={`review-card__avatar review-card__avatar--${index % 6}`}>
                  {r.avatar ? <img src={r.avatar} alt="" /> : r.name.charAt(0)}
                </div>
                <div>
                  <strong>{r.name}</strong>
                  <p>{r.meta}</p>
                </div>
              </div>
              <div className="review-card__meta">
                <div className="review-card__stars" aria-hidden="true">
                  {Array.from({ length: r.stars }).map((_, i) => <Icon key={i} name="star" size={11} filled />)}
                </div>
                <span>· {r.time}</span>
              </div>
              <p className={`review-card__body ${long ? 'review-card__body--clamped' : ''}`}>
                {r.body}
              </p>
              {long && !expanded && <button className="review-card__show-more">Show more</button>}
            </article>
          );
        })}
      </div>

      <button className="reviews__all-button" onClick={() => setExpanded((v) => !v)}>
        {expanded ? 'Show fewer reviews' : `Show all ${listing.reviewCount} reviews`}
      </button>
    </section>
  );
}
