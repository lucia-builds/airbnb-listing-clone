import Icon from './Icon';
import './HostSection.css';

export default function HostSection({ listing }) {
  const h = listing.host;
  return (
    <section className="host-section">
      <h3>Meet your host</h3>

      <div className="host-section__grid">
        <div className="host-section__left">
          <div className="host-card">
            <div className="host-card__identity">
              <div className="host-card__avatar">
                <span>MH</span>
                <span className="host-card__badge"><Icon name="shield" size={12} filled /></span>
              </div>
              <strong className="host-card__name">{h.name}</strong>
              <span className="host-card__role">Host</span>
            </div>

            <div className="host-card__stats">
              <div><strong>{h.reviews.toLocaleString('en-IN')}</strong><span>Reviews</span></div>
              <div><strong>{h.rating}★</strong><span>Rating</span></div>
              <div><strong>{h.yearsHosting}</strong><span>Years hosting</span></div>
            </div>
          </div>

          <div className="host-facts">
            <p><Icon name="home" size={22} /> <span>{h.bornDecade}</span></p>
            <p><Icon name="workspace" size={22} /> <span>{h.school}</span></p>
          </div>
        </div>

        <div className="host-info">
          <div className="host-info__cohosts">
            <h4>Co-Hosts</h4>
            <div className="host-info__cohost-grid">
              {listing.coHosts.map(({ name, photo }) => (
                <div className="cohost" key={name}>
                  <div className="cohost__avatar">
                    <img src={photo} alt="" />
                  </div>
                  <span>{name}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="host-info__details">
            <h4>Host details</h4>
            <p>Response rate: {h.responseRate}%</p>
            <p>Responds within {h.respondsWithin}</p>
            <button className="btn btn--outline">Message host</button>
          </div>

          <p className="host-info__protect">
            <Icon name="shield" size={18} />
            To help protect your payment, always use Airbnb to send money and communicate with hosts.
          </p>
        </div>
      </div>
    </section>
  );
}
