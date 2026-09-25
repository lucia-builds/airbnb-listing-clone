import { useEffect, useRef, useState } from 'react';
import TopBar from './Header';
import TitleRow from './TitleRow';
import HeroGallery from './HeroGallery';
import StickyNav from './StickyNav';
import Overview from './Overview';
import Amenities from './Amenities';
import Calendar from './Calendar';
import Reviews from './Reviews';
import HostSection from './HostSection';
import ThingsToKnow from './ThingsToKnow';
import NearbyStays from './NearbyStays';
import LocationMap from './LocationMap';
import BookingWidget from './BookingWidget';
import './ListingPage.css';

export default function ListingPage({ listing, heroPhotos, onOpenPhotoTour }) {
  const [saved, setSaved] = useState(false);
  const [activeTab, setActiveTab] = useState('photos');
  const [reserveToast, setReserveToast] = useState(null);
  const reserveRef = useRef(null);
  const amenitiesRef = useRef(null);
  const reviewsRef = useRef(null);
  const locationRef = useRef(null);
  const galleryRef = useRef(null);
  const overviewBasicsRef = useRef(null);
  const [showStickyNav, setShowStickyNav] = useState(false);

  const scrollToRef = (ref) => {
    ref.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    if (tab === 'photos') scrollToRef(galleryRef);
    if (tab === 'amenities') scrollToRef(amenitiesRef);
    if (tab === 'reviews') scrollToRef(reviewsRef);
    if (tab === 'location') scrollToRef(locationRef);
  };

  const scrollToReserve = () => {
    reserveRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  const handleReserveClick = () => {
    setReserveToast("You won't be charged yet");
    scrollToReserve();
  };

  useEffect(() => {
    if (!reserveToast) return undefined;

    const timer = window.setTimeout(() => setReserveToast(null), 1800);
    return () => window.clearTimeout(timer);
  }, [reserveToast]);

  useEffect(() => {
    const sections = [
      ['photos', galleryRef.current],
      ['amenities', amenitiesRef.current],
      ['reviews', reviewsRef.current],
      ['location', locationRef.current],
    ].filter(([, node]) => node);

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) {
          const match = sections.find(([, node]) => node === visible[0].target);
          if (match) setActiveTab(match[0]);
        }
      },
      { rootMargin: '-110px 0px -65% 0px', threshold: 0 }
    );

    sections.forEach(([, node]) => observer.observe(node));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const updateStickyNav = () => {
      const basics = overviewBasicsRef.current;
      setShowStickyNav(Boolean(basics && basics.getBoundingClientRect().top <= 0));
    };

    updateStickyNav();
    window.addEventListener('scroll', updateStickyNav, { passive: true });
    return () => window.removeEventListener('scroll', updateStickyNav);
  }, []);


  return (
    <div className="listing-page">
      <TopBar />
      <TitleRow title={listing.title} saved={saved} onToggleSave={() => setSaved((s) => !s)} />

      <div ref={galleryRef}>
        <HeroGallery photos={heroPhotos} onOpenPhotoTour={onOpenPhotoTour} />
      </div>

    <StickyNav
      listing={listing}
      activeTab={activeTab}
      onTabClick={handleTabClick}
      onReserveClick={handleReserveClick}
      isVisible={showStickyNav}
    />
<div className="listing-page__body">
  <main className="listing-page__main">
        <Overview listing={listing} basicsRef={overviewBasicsRef} />

    <div ref={amenitiesRef}>
      <Amenities listing={listing} />
    </div>

    <Calendar listing={listing} />
  </main>

  <BookingWidget
    listing={listing}
    reserveRef={reserveRef}
    onReserveClick={handleReserveClick}
  />
</div>

{reserveToast && (
  <div className="listing-page__toast" role="status" aria-live="polite">
    {reserveToast}
  </div>
)}

<div ref={reviewsRef}>
  <Reviews listing={listing} />
</div>

<div ref={locationRef}>
  <LocationMap listing={listing} />
</div>

<HostSection listing={listing} />
<ThingsToKnow listing={listing} />
<NearbyStays listing={listing} />
    </div>
  );
}
