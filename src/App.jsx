import { useCallback, useEffect, useState } from 'react';
import ListingPage from './components/ListingPage';
import PhotoTour from './components/PhotoTour';
import Lightbox from './components/Lightbox';
import { listing, heroPhotos } from './data/listing';
import './styles/buttons.css';

function readStateFromURL() {
  const params = new URLSearchParams(window.location.search);
  const modal = params.get('modal');
  const modalItem = params.get('modalItem');
  return {
    modal: modal === 'PHOTO_TOUR_SCROLLABLE' ? 'photoTour' : null,
    modalItem: modalItem ? Number(modalItem) : null,
  };
}

function writeStateToURL(modal, modalItem, { replace = false } = {}) {
  const params = new URLSearchParams();
  if (modal === 'photoTour') params.set('modal', 'PHOTO_TOUR_SCROLLABLE');
  if (modalItem) params.set('modalItem', String(modalItem));
  const query = params.toString();
  const url = query ? `?${query}` : window.location.pathname;
  if (replace) window.history.replaceState({}, '', url);
  else window.history.pushState({}, '', url);
}

export default function App() {
  const [{ modal, modalItem }, setState] = useState(readStateFromURL());
  const [saved, setSaved] = useState(false);
  const [scrollToRoom, setScrollToRoom] = useState(null);

  useEffect(() => {
    function onPopState() {
      setState(readStateFromURL());
    }
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, []);

  const openPhotoTour = useCallback((roomName) => {
    setScrollToRoom(roomName || null);
    setState({ modal: 'photoTour', modalItem: null });
    writeStateToURL('photoTour', null);
  }, []);

  const closePhotoTour = useCallback(() => {
    setState({ modal: null, modalItem: null });
    setScrollToRoom(null);
    writeStateToURL(null, null);
  }, []);

  const openLightbox = useCallback((photoId) => {
    setState({ modal: 'photoTour', modalItem: photoId });
    writeStateToURL('photoTour', photoId);
  }, []);

  const closeLightboxToGrid = useCallback(() => {
    setState((s) => ({ modal: 'photoTour', modalItem: null }));
    writeStateToURL('photoTour', null);
  }, []);

  const navigateLightbox = useCallback((photoId) => {
    setState({ modal: 'photoTour', modalItem: photoId });
    writeStateToURL('photoTour', photoId, { replace: true });
  }, []);

  const toggleSave = useCallback(() => setSaved((s) => !s), []);

  return (
    <>
      <ListingPage listing={listing} heroPhotos={heroPhotos} onOpenPhotoTour={openPhotoTour} />
      {modal === 'photoTour' && (
        // Stays mounted (just visually covered) while the lightbox is open,
        // so its scroll position is preserved when the lightbox closes.
        <PhotoTour
          onClose={closePhotoTour}
          onOpenLightbox={openLightbox}
          saved={saved}
          onToggleSave={toggleSave}
          scrollToRoom={scrollToRoom}
          hidden={!!modalItem}
        />
      )}
      {modal === 'photoTour' && modalItem && (
        <Lightbox
          photoId={modalItem}
          onClose={closePhotoTour}
          onBackToGrid={closeLightboxToGrid}
          onNavigate={navigateLightbox}
        />
      )}
    </>
  );
}
