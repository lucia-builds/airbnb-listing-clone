import { useState } from 'react';
import Icon from './Icon';
import './Calendar.css';

const WEEKDAYS = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

// The reference uses a small set of unavailable dates in the second month.
const UNAVAILABLE_DATES = new Set([
  '2026-11-18', '2026-11-19', '2026-11-20', '2026-11-21',
  '2026-11-22', '2026-11-23', '2026-11-24',
]);

function dateKey(year, month, day) {
  return `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
}

function parseCalendarDate(value) {
  const [year, month, day] = value.split('-').map(Number);
  return new Date(year, month - 1, day);
}

function buildMonth(year, month) {
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const cells = [];
  for (let i = 0; i < firstDay; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);
  return cells;
}

function MonthGrid({ year, month, checkIn, checkOut }) {
  const cells = buildMonth(year, month);
  const checkInKey = checkIn ? dateKey(checkIn.getFullYear(), checkIn.getMonth(), checkIn.getDate()) : null;
  const checkOutKey = checkOut ? dateKey(checkOut.getFullYear(), checkOut.getMonth(), checkOut.getDate()) : null;

  const isInRange = (d) => {
    if (!d || !checkIn || !checkOut) return false;
    const key = dateKey(year, month, d);
    return key > checkInKey && key < checkOutKey;
  };

  const isEdge = (d) => {
    if (!d || !checkIn || !checkOut) return false;
    const key = dateKey(year, month, d);
    return key === checkInKey || key === checkOutKey;
  };

  const isUnavailable = (d) => d ? UNAVAILABLE_DATES.has(dateKey(year, month, d)) : false;

  return (
    <div className="calendar__month">
      <h4>{MONTH_NAMES[month]} {year}</h4>
      <div className="calendar__weekdays">
        {WEEKDAYS.map((w, i) => <span key={i}>{w}</span>)}
      </div>
      <div className="calendar__days">
        {cells.map((d, i) => (
          <span
            key={i}
            className={`calendar__day ${d ? '' : 'calendar__day--empty'} ${isEdge(d) ? 'calendar__day--edge' : ''} ${isInRange(d) ? 'calendar__day--range' : ''} ${isUnavailable(d) ? 'calendar__day--unavailable' : ''}`}
          >
            {d || ''}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function Calendar({ listing }) {
  const [cursor, setCursor] = useState(new Date(2026, 9, 1)); // October 2026
  const initialCheckIn = parseCalendarDate(listing.checkIn);
  const initialCheckOut = parseCalendarDate(listing.checkOut);
  const [selectedRange, setSelectedRange] = useState({
    checkIn: initialCheckIn,
    checkOut: initialCheckOut,
  });

  const nextMonthDate = new Date(cursor.getFullYear(), cursor.getMonth() + 1, 1);
  const rangeCheckIn = selectedRange.checkIn;
  const rangeCheckOut = selectedRange.checkOut;

  const clearDates = () => setSelectedRange({ checkIn: null, checkOut: null });

  return (
    <section className="calendar-section" id="calendar">
      <h3>{listing.nights} nights in Candolim</h3>
      <p className="calendar-section__range">
        {initialCheckIn.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })} - {initialCheckOut.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
      </p>

      <div className="calendar">
        <button
          className="calendar__nav calendar__nav--prev"
          onClick={() => setCursor(new Date(cursor.getFullYear(), cursor.getMonth() - 1, 1))}
          aria-label="Previous month"
        >
          <Icon name="chevronLeft" size={21} strokeWidth={1.7} />
        </button>

        <MonthGrid year={cursor.getFullYear()} month={cursor.getMonth()} checkIn={rangeCheckIn} checkOut={rangeCheckOut} />
        <MonthGrid year={nextMonthDate.getFullYear()} month={nextMonthDate.getMonth()} checkIn={rangeCheckIn} checkOut={rangeCheckOut} />

        <button
          className="calendar__nav calendar__nav--next"
          onClick={() => setCursor(new Date(cursor.getFullYear(), cursor.getMonth() + 1, 1))}
          aria-label="Next month"
        >
          <Icon name="chevronRight" size={21} strokeWidth={1.7} />
        </button>
      </div>

      <div className="calendar__footer">
        <button className="calendar__small-control" aria-label="Date options">
          <span className="calendar__small-control-line" aria-hidden="true" />
        </button>
        <button className="calendar__clear" onClick={clearDates}>Clear dates</button>
      </div>
    </section>
  );
}
