import { useEffect, useState } from 'react';
import Icon from './Icon';
import './Amenities.css';

function AmenityRow({ item }) {
  return (
    <div className={`amenities__modal-row ${item.unavailable ? 'amenities__item--unavailable' : ''}`}>
      <Icon name={item.icon} size={25} strokeWidth={1.35} />
      <span>{item.label}</span>
    </div>
  );
}

export default function Amenities({ listing }) {
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    if (!showAll) return undefined;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [showAll]);

  return (
    <section className="amenities" id="amenities">
      <h3>What this place offers</h3>

      <div className="amenities__grid">
        {listing.amenities.map((a) => (
          <div key={a.label} className={`amenities__item ${a.unavailable ? 'amenities__item--unavailable' : ''}`}>
            <Icon name={a.icon} size={25} strokeWidth={1.3} />
            <span>{a.label}</span>
          </div>
        ))}
      </div>

      <button className="btn btn--outline amenities__show-all" onClick={() => setShowAll(true)}>
        Show all {listing.totalAmenities} amenities
      </button>

      {showAll && (
        <div className="amenities__modal-backdrop" onClick={() => setShowAll(false)}>
          <div
            className="amenities__modal"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-label="What this place offers"
          >
            <button className="amenities__modal-close" onClick={() => setShowAll(false)} aria-label="Close amenities">
              <Icon name="close" size={28} strokeWidth={1.4} />
            </button>

            <div className="amenities__modal-content">
              <h3>What this place offers</h3>

              {listing.amenitySections.map((section) => (
                <section className="amenities__modal-section" key={section.title}>
                  <h4>{section.title}</h4>
                  <div className="amenities__modal-list">
                    {section.items.map((item, index) => (
                      <AmenityRow key={`${section.title}-${item.label}-${index}`} item={item} />
                    ))}
                  </div>
                </section>
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
