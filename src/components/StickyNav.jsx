import Icon from './Icon';
import './StickyNav.css';

const TABS = [
  { id: 'photos', label: 'Photos' },
  { id: 'amenities', label: 'Amenities' },
  { id: 'reviews', label: 'Reviews' },
  { id: 'location', label: 'Location' },
];

export default function StickyNav({ listing, activeTab, onTabClick, onReserveClick, isVisible }) {
  return (
    <div className={`sticky-nav ${isVisible ? 'is-visible' : ''}`} aria-hidden={!isVisible}>
      <div className="sticky-nav__inner">
        <nav className="sticky-nav__tabs" aria-label="Listing sections">
          {TABS.map((t) => (
            <button
              key={t.id}
              className={`sticky-nav__tab ${activeTab === t.id ? 'is-active' : ''}`}
              onClick={() => onTabClick(t.id)}
            >
              {t.label}
            </button>
          ))}
        </nav>
        <div className="sticky-nav__summary">
          <div className="sticky-nav__price">
            <strong>&#8377;{listing.price.toLocaleString('en-IN')}</strong> for {listing.nights} nights
            <div className="sticky-nav__rating">
              <Icon name="star" size={11} filled />
              <span>{listing.rating.toFixed(2)} · {listing.reviewCount} reviews</span>
            </div>
          </div>
          <button className="btn btn--primary" onClick={onReserveClick}>Reserve</button>
        </div>
      </div>
    </div>
  );
}
