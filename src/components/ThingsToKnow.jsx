import Icon from './Icon';
import './ThingsToKnow.css';

export default function ThingsToKnow({ listing }) {
  const t = listing.thingsToKnow;
  return (
    <section className="things-to-know">
      <h3>Things to know</h3>
      <div className="things-to-know__grid">
        <div>
          <Icon name="coalarm" size={22} />
          <h4>Cancellation policy</h4>
          <p>{t.cancellation}</p>
          <button className="link-btn">Learn more</button>
        </div>
        <div>
          <Icon name="search" size={22} />
          <h4>House rules</h4>
          {t.houseRules.map((r) => <p key={r}>{r}</p>)}
          <button className="link-btn">Learn more</button>
        </div>
        <div>
          <Icon name="shield" size={22} />
          <h4>Safety &amp; property</h4>
          {t.safety.map((s) => <p key={s}>{s}</p>)}
          <button className="link-btn">Learn more</button>
        </div>
      </div>
    </section>
  );
}
