import Icon from './Icon';
import './HeroGallery.css';

export default function HeroGallery({ photos, onOpenPhotoTour }) {
  return (
    <div className="hero-gallery">
      <button
        className="hero-gallery__cell hero-gallery__cell--main"
        onClick={() => onOpenPhotoTour(photos[0].room)}
        aria-label={`View photo tour, starting at ${photos[0].room}`}
      >
        <img src={photos[0].src} alt={photos[0].room} />
      </button>
      <div className="hero-gallery__grid">
        {photos.slice(1).map((p, i) => (
          <button
            key={p.id}
            className="hero-gallery__cell"
            onClick={() => onOpenPhotoTour(p.room)}
            aria-label={`View photo tour, starting at ${p.room}`}
          >
            <img src={p.src} alt={p.room} />
            {i === 3 && (
              <span
                className="hero-gallery__show-all"
                onClick={(e) => {
                  e.stopPropagation();
                  onOpenPhotoTour();
                }}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.stopPropagation();
                    onOpenPhotoTour();
                  }
                }}
              >
                <Icon name="grid" size={16} />
                Show all photos
              </span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
