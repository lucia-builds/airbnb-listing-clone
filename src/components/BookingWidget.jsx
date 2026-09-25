import Icon from './Icon';
import './BookingWidget.css';

export default function BookingWidget({ listing, reserveRef, onReserveClick }) {
  const checkIn = new Date(listing.checkIn).toLocaleDateString('en-GB');
  const checkOut = new Date(listing.checkOut).toLocaleDateString('en-GB');

  return (
    <aside className="booking-widget">
      <div className="booking-widget__sticky" ref={reserveRef}>
        <div className="booking-widget__promo">
          <span className="booking-widget__promo-badge" aria-hidden="true">
            <Icon name="tag" size={18} />
          </span>
          <div>
            <p>Get 10% off your next stay.</p>
            <button className="link-btn">Terms apply</button>
          </div>
          <button className="btn btn--outline-sm">Claim</button>
        </div>

        <div className="booking-widget__card">
          <p className="booking-widget__price">
            <span className="booking-widget__price-amount">&#8377;{listing.price.toLocaleString('en-IN')}</span> for {listing.nights} nights
          </p>

          <div className="booking-widget__dates">
            <div className="booking-widget__date">
              <label>CHECK-IN</label>
              <span>{checkIn}</span>
            </div>
            <div className="booking-widget__date">
              <label>CHECKOUT</label>
              <span>{checkOut}</span>
            </div>
          </div>
          <div className="booking-widget__guests">
            <div>
              <label>GUESTS</label>
              <span>{listing.guests} guests</span>
            </div>
            <Icon name="chevronRight" size={14} className="booking-widget__chevron" />
          </div>

          <p className="booking-widget__cancellation">
            Free cancellation before <strong>{listing.cancellationDate}</strong>
          </p>

          <button className="btn btn--primary btn--block" onClick={onReserveClick}>Reserve</button>
          <p className="booking-widget__note">You won't be charged yet</p>
        </div>

        <button className="booking-widget__report">
          <Icon name="flag" size={14} /> Report this listing
        </button>
      </div>
    </aside>
  );
}
