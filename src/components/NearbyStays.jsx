import { useMemo, useRef, useState } from 'react';
import Icon from './Icon';
import './NearbyStays.css';

export default function NearbyStays({ listing }) {
  const scrollerRef = useRef(null);
  const [page, setPage] = useState(1);
  const pages = useMemo(() => {
    const items = listing.nearbyStays;
    return [items.slice(0, 5), items.slice(5, 10)].filter((group) => group.length);
  }, [listing.nearbyStays]);

  const go = (nextPage) => {
    const safePage = Math.min(Math.max(nextPage, 0), pages.length - 1);
    setPage(safePage);
    scrollerRef.current?.scrollTo({ left: safePage * scrollerRef.current.clientWidth, behavior: 'smooth' });
  };

  return (
    <section className="nearby-stays">
      <div className="nearby-stays__header">
        <h3>More stays nearby</h3>
        <div className="nearby-stays__nav">
          <span>{page + 1} / {pages.length}</span>
          <button aria-label="Previous" disabled={page === 0} onClick={() => go(page - 1)}>
            <Icon name="chevronLeft" size={16} />
          </button>
          <button aria-label="Next" disabled={page === pages.length - 1} onClick={() => go(page + 1)}>
            <Icon name="chevronRight" size={16} />
          </button>
        </div>
      </div>

      <div className="nearby-stays__scroller" ref={scrollerRef}>
        {listing.nearbyStays.map((s, index) => (
          <article className="nearby-card" key={`${s.title}-${index}`}>
            <img src={s.img} alt={s.title} />
            <strong>{s.title}</strong>
            <span>₹{s.price.toLocaleString('en-IN')} <em>★ {s.rating}</em></span>
          </article>
        ))}
      </div>
    </section>
  );
}
