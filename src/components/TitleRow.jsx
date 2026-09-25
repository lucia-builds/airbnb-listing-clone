import { useEffect, useState } from 'react';
import Icon from './Icon';
import './TitleRow.css';

export default function TitleRow({ title, saved, onToggleSave }) {
  const [toast, setToast] = useState(null);

  useEffect(() => {
    if (!toast) return undefined;

    const timer = window.setTimeout(() => setToast(null), 1800);
    return () => window.clearTimeout(timer);
  }, [toast]);

  const handleShareClick = () => {
    setToast('Share options');
  };

  const handleSaveClick = () => {
    onToggleSave();
    setToast(saved ? 'Removed from Wishlist' : 'Saved to Wishlist');
  };

  return (
    <div className="title-row">
      <h1 className="title-row__title">{title}</h1>
      <div className="title-row__actions">
        <div className="title-row__action-wrap">
          <button
            className="title-row__action"
            onClick={handleShareClick}
            aria-label="Share this listing"
          >
            <Icon name="share" size={16} />
            <span className="title-row__action-label">Share</span>
          </button>
        </div>

        <button
          className="title-row__action"
          onClick={handleSaveClick}
          aria-pressed={saved}
          aria-label={saved ? 'Remove from saved' : 'Save this listing'}
        >
          <Icon name="heart" size={16} filled={saved} className={saved ? 'title-row__heart--saved' : ''} />
          <span className="title-row__action-label">{saved ? 'Saved' : 'Save'}</span>
        </button>
      </div>

      {toast && (
        <div className="title-row__toast" role="status" aria-live="polite">
          {toast}
        </div>
      )}
    </div>
  );
}
