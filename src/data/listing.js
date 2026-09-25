// Static listing data — mirrors the reference clone's content structure.
// Photo assets are recreated from provided screen-recording frames.

import heroMain from '../assets/photos/hero-main.jpg';
import heroTopMid from '../assets/photos/hero-top-mid.jpg';
import heroTopRight from '../assets/photos/hero-top-right.jpg';
import heroBottomMid from '../assets/photos/hero-bottom-mid.jpg';
import heroBottomRight from '../assets/photos/hero-bottom-right.jpg';

import lr1Main from '../assets/photos/living-room-1-main.jpg';
import lr1B from '../assets/photos/living-room-1-b.jpg';
import lr1C from '../assets/photos/living-room-1-c.jpg';

import lr2Main from '../assets/photos/living-room-2-main.jpg';
import lr2B from '../assets/photos/living-room-2-b.jpg';
import lr2C from '../assets/photos/living-room-2-c.jpg';
import lr2D from '../assets/photos/living-room-2-d.jpg';
import lr2E from '../assets/photos/living-room-2-e.jpg';
import lr2F from '../assets/photos/living-room-2-f.jpg';

import kitchenA from '../assets/photos/full-kitchen-a.jpg';
import kitchenB from '../assets/photos/full-kitchen-b.jpg';

import bedroomMain from '../assets/photos/bedroom-main.jpg';
import bedroomB from '../assets/photos/bedroom-b.jpg';
import bedroomC from '../assets/photos/bedroom-c.jpg';
import bedroomD from '../assets/photos/bedroom-d.jpg';
import bedroomE from '../assets/photos/bedroom-e.jpg';

import bathroomMain from '../assets/photos/full-bathroom-main.jpg';

import gymA from '../assets/photos/gym-a.jpg';
import gymB from '../assets/photos/gym-b.jpg';

import exteriorMain from '../assets/photos/exterior-main.jpg';
import poolThumb from '../assets/photos/pool-thumb.jpg';

import addlA from '../assets/photos/additional-photos-a.jpg';
import addlB from '../assets/photos/additional-photos-b.jpg';
import addlMain from '../assets/photos/additional-photos-main.jpg';

// Room categories, in the exact order shown in the Photo Tour grid.
// Each photo gets a stable numeric id (matches the ?modalItem= pattern
// observed: 1000-range ids incrementing through the tour).
let idCounter = 1000;
const nextId = () => idCounter++;

function room(name, amenities, images) {
  // images: array of [src, layout] tuples, layout is 'full' or 'half',
  // matching the exact masonry pattern observed per room in the reference.
  return {
    name,
    amenities,
    photos: images.map(([src, layout]) => ({ id: nextId(), src, room: name, layout })),
  };
}

export const rooms = [
  room('Living room 1', 'Sofa · Air conditioning · Ceiling fan · TV', [
    [lr1Main, 'full'], [lr1B, 'half'], [lr1C, 'half'],
  ]),
  room('Living room 2', 'Ceiling fan · Hot tub', [
    [lr2Main, 'full'], [lr2B, 'half'], [lr2C, 'half'],
    [lr2D, 'half'], [lr2E, 'half'], [lr2F, 'full'],
  ]),
  room(
    'Full kitchen',
    'Freezer · Fridge · Blender · Cooker · Cooking basics · Kettle · Microwave · Toaster · Wine glasses · Coffee · Crockery and cutlery',
    [[kitchenA, 'half'], [kitchenB, 'half']]
  ),
  room(
    'Bedroom',
    'Double bed · Air conditioning · Bed linen · Ceiling fan · Clothes storage · Cot · Hangers · Iron · Room-darkening blinds · Cleaning available during stay · Cleaning products · Long-term stays allowed · Private entrance · Wifi',
    [[bedroomMain, 'full'], [bedroomB, 'half'], [bedroomC, 'half'], [bedroomD, 'half'], [bedroomE, 'half']]
  ),
  room('Full bathroom', 'Hairdryer · Hot water · Shampoo · Shower gel', [
    [bathroomMain, 'full'],
  ]),
  room('Gym', 'Air conditioning · Gym · Exercise equipment · Ceiling fan', [
    [gymA, 'half'], [gymB, 'half'],
  ]),
  room('Exterior', '', [[exteriorMain, 'full'], [poolThumb, 'half']]),
  room('Pool', '', [[poolThumb, 'full']]),
  room('Additional photos', '', [[addlA, 'half'], [addlB, 'half'], [addlMain, 'full']]),
];

// Flat ordered list of every photo, used by the lightbox for prev/next + counter.
export const allPhotos = rooms.flatMap((r) => r.photos);

export const heroPhotos = [
  { id: 'hero-main', src: heroMain, room: 'Living room 1' },
  { id: 'hero-top-mid', src: heroTopMid, room: 'Living room 2' },
  { id: 'hero-top-right', src: heroTopRight, room: 'Full bathroom' },
  { id: 'hero-bottom-mid', src: heroBottomMid, room: 'Bedroom' },
  { id: 'hero-bottom-right', src: heroBottomRight, room: 'Exterior' },
];

export const listing = {
  title: 'Romantic Jacuzzi 1BHK Candolim | Mirashya UG10',
  subtitle: 'Entire serviced apartment in Candolim, India',
  guestsSummary: '3 guests · 1 bedroom · 1 bed · 1 bathroom',
  rating: 4.95,
  reviewCount: 19,
  guestFavourite: true,
  host: {
    name: 'Mirashya Homes',
    yearsHosting: 2,
    reviews: 1463,
    rating: 4.68,
    responseRate: 100,
    respondsWithin: 'an hour',
    bornDecade: 'Born in the 80s',
    school: 'Where I went to school: NICMAR GOA',
  },
  coHosts: [
    {
      name: 'Sharath',
      photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
    },
    {
      name: 'Aman Dev Pahwa',
      photo: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=200&q=80',
    },
    {
      name: 'Maria Karen Priyanka',
      photo: 'https://images.unsplash.com/photo-1504593811423-6dd665756598?auto=format&fit=crop&w=200&q=80',
    },
    {
      name: 'Simran',
      photo: 'https://images.unsplash.com/photo-1504257432389-52343af06ae3?auto=format&fit=crop&w=200&q=80',
    },
    {
      name: 'Pallavi',
      photo: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=200&q=80',
    },
    {
      name: 'Sanyukta',
      photo: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=200&q=80',
    },
    {
      name: 'Shruti',
      photo: 'https://images.unsplash.com/photo-1503023345926-bd8ec6a72d20?auto=format&fit=crop&w=200&q=80',
    },
    {
      name: 'Amisha',
      photo: 'https://images.unsplash.com/photo-1507003211169-0f6d9d8424f2?auto=format&fit=crop&w=200&q=80',
    },
  ],
  highlights: [
    {
      icon: 'entertainment',
      title: 'Outdoor entertainment',
      body: 'The pool and alfresco dining are great for summer trips.',
    },
    {
      icon: 'cool',
      title: 'Designed for staying cool',
      body: 'Beat the heat with the A/C and ceiling fan.',
    },
    {
      icon: 'selfcheckin',
      title: 'Self check-in',
      body: 'You can check in with the building staff.',
    },
  ],
  description: `Plan Your Relaxing Holiday at Amor De Goa by Mirashya Homes! 🌴 Stay in this cozy 1BHK in the heart of Candolim, featuring a private jacuzzi 🛁 for the perfect unwind. Enjoy high-speed WiFi 📶, Smart TV 📺, pet-friendly comfort 🐾, and stylish interiors. Just minutes from Candolim Beach 🏖️, popular cafés, restaurants, and nightlife 🌃, it's the ideal spot for couples or small families seeking comfort and convenience in Goa.`,
  sleepCards: [
    { room: 'Bedroom', detail: '1 double bed', img: bedroomMain },
    { room: 'Living room', detail: '1 sofa', img: lr2Main },
  ],
  amenities: [
    { icon: 'kitchen', label: 'Kitchen' },
    { icon: 'wifi', label: 'Wifi' },
    { icon: 'workspace', label: 'Dedicated workspace' },
    { icon: 'parking', label: 'Free parking on premises' },
    { icon: 'pool', label: 'Pool' },
    { icon: 'hottub', label: 'Hot tub' },
    { icon: 'pets', label: 'Pets allowed' },
    { icon: 'camera', label: 'Exterior security cameras on property' },
    { icon: 'coalarm', label: 'Carbon monoxide alarm', unavailable: true },
    { icon: 'smokealarm', label: 'Smoke alarm', unavailable: true },
  ],
  amenitySections: [
    {
      title: 'Bathroom',
      items: [
        { icon: 'hairdryer', label: 'Hairdryer' },
        { icon: 'cleaningProducts', label: 'Cleaning products' },
        { icon: 'shampoo', label: 'Shampoo' },
        { icon: 'hotwater', label: 'Hot water' },
        { icon: 'showergel', label: 'Shower gel' },
      ],
    },
    {
      title: 'Bedroom and laundry',
      items: [
        { icon: 'washingMachine', label: 'Washing machine' },
        { icon: 'hangers', label: 'Hangers' },
        { icon: 'bedLinen', label: 'Bed linen' },
        { icon: 'blinds', label: 'Room-darkening blinds' },
        { icon: 'iron', label: 'Iron' },
        { icon: 'clothesStorage', label: 'Clothes storage' },
        { icon: 'cot', label: 'Cot' },
      ],
    },
    {
      title: 'Entertainment',
      items: [{ icon: 'tv', label: 'TV' }],
    },
    {
      title: 'Family',
      items: [{ icon: 'cot', label: 'Cot' }],
    },
    {
      title: 'Heating and cooling',
      items: [
        { icon: 'ac', label: 'Air conditioning' },
        { icon: 'fan', label: 'Ceiling fan' },
      ],
    },
    {
      title: 'Home safety',
      items: [
        { icon: 'camera', label: 'Exterior security cameras on property' },
        { icon: 'coalarm', label: 'Carbon monoxide alarm', unavailable: true },
        { icon: 'smokealarm', label: 'Smoke alarm', unavailable: true },
      ],
    },
    {
      title: 'Internet and office',
      items: [
        { icon: 'wifi', label: 'Wifi' },
        { icon: 'workspace', label: 'Dedicated workspace' },
      ],
    },
    {
      title: 'Kitchen and dining',
      items: [
        { icon: 'kitchen', label: 'Kitchen' },
        { icon: 'fridge', label: 'Fridge' },
        { icon: 'fridge', label: 'Freezer' },
        { icon: 'microwave', label: 'Microwave' },
        { icon: 'kitchen', label: 'Cooking basics' },
        { icon: 'cutlery', label: 'Crockery and cutlery' },
        { icon: 'kettle', label: 'Kettle' },
        { icon: 'coffee', label: 'Coffee' },
        { icon: 'wine', label: 'Wine glasses' },
        { icon: 'toaster', label: 'Toaster' },
        { icon: 'blender', label: 'Blender' },
        { icon: 'cooker', label: 'Cooker' },
      ],
    },
    {
      title: 'Location features',
      items: [{ icon: 'privateEntrance', label: 'Private entrance' }],
    },
    {
      title: 'Outdoor',
      items: [
        { icon: 'patio', label: 'Patio or balcony' },
        { icon: 'outdoorDining', label: 'Outdoor dining area' },
      ],
    },
    {
      title: 'Parking and facilities',
      items: [
        { icon: 'parking', label: 'Free parking on premises' },
        { icon: 'pool', label: 'Pool' },
        { icon: 'hottub', label: 'Hot tub' },
        { icon: 'gym', label: 'Gym' },
      ],
    },
    {
      title: 'Services',
      items: [
        { icon: 'pets', label: 'Pets allowed' },
        { icon: 'cleaning', label: 'Cleaning available during stay' },
        { icon: 'longTerm', label: 'Long-term stays allowed' },
        { icon: 'selfcheckin', label: 'Self check-in' },
      ],
    },
  ],
  totalAmenities: 50,
  price: 28499,
  nights: 5,
  checkIn: '2026-10-18',
  checkOut: '2026-10-23',
  guests: 2,
  cancellationDate: '17 October',
  reviewBreakdown: {
    overall: [
      { stars: 5, pct: 95 },
      { stars: 4, pct: 5 },
      { stars: 3, pct: 0 },
      { stars: 2, pct: 0 },
      { stars: 1, pct: 0 },
    ],
    cleanliness: 5.0,
    accuracy: 5.0,
    checkin: 5.0,
    communication: 5.0,
    location: 4.8,
    value: 4.8,
  },
  reviewTags: [
    { icon: '🛋️', label: 'Comfort', count: 6 },
    { icon: '✅', label: 'Accuracy', count: 5 },
    { icon: '🛁', label: 'Hot tub', count: 5 },
    { icon: '⭐', label: 'Condition', count: 4 },
    { icon: '🎩', label: 'Hospitality', count: 8 },
    { icon: '🧼', label: 'Cleanliness', count: 4 },
    { icon: '🖼️', label: 'Amenities', count: 2 },
  ],
  reviews: [
    {
      name: 'Amit',
      meta: '2 months on Airbnb',
      time: '1 week ago',
      stars: 5,
      body: 'Very helpful and responsive team. Safe and peaceful stay. loved everything about the property.',
    },
    {
      name: 'Aheesh',
      meta: '3 years on Airbnb',
      time: '2 weeks ago',
      stars: 5,
      body: 'We had a wonderful stay. The apartment was clean, comfortable, and exactly as shown in the photos. The host was very responsive and helpful throughout our stay. We would definitely recommend this place and would love to stay here again.',
    },
    {
      name: 'Samiksha',
      meta: '8 months on Airbnb',
      time: 'May 2026',
      stars: 5,
      body: 'the host nitish was really great help',
    },
    {
      name: 'Vedant',
      meta: '4 years on Airbnb',
      time: 'May 2026',
      stars: 5,
      body: 'We had an amazing stay at this property in Goa! The entire home was spotless and exceptionally well-maintained, making us feel comfortable from the moment we arrived. The cleanliness standards were truly impressive, with every corner of the house looking fresh and pristine.',
    },
    {
      name: 'Vaibhav S',
      meta: '3 years on Airbnb',
      time: 'May 2026',
      stars: 5,
      body: "Great great experience living out there, can't expect more, will always look for it in the future and will recommend my friends too.",
    },
    {
      name: 'Mohd',
      meta: '5 years on Airbnb',
      time: 'May 2026',
      stars: 5,
      body: 'Great place. Exactly as described in the listing.',
    },
  ],
  thingsToKnow: {
    cancellation: 'Free cancellation before 17 October. Cancel before check-in on 18 October for a partial refund.',
    houseRules: ['Check-in after 2:00 pm', 'Checkout before 11:00 am', '3 guests maximum'],
    safety: [
      'Carbon monoxide alarm not reported',
      'Smoke alarm not reported',
      'Exterior security cameras on property',
    ],
  },
  neighbourhood:
    'Located in the heart of Candolim, Amor de Goa offers a peaceful stay with easy access to beaches, cafés, and popular attractions.',
  nearbyStays: [
    { title: 'Beautiful Studio with a view to die for', price: 23600, rating: 4.91, img: lr1Main },
    { title: 'NAQAB - 1bhk with private pool', price: 42218, rating: 4.95, img: lr2Main },
    { title: 'Greentique Luxury Flat with plunge pool, Calangute', price: 44506, rating: 4.94, img: addlMain },
    { title: 'The Tropical Studio | 5 mins to Beach', price: 22824, rating: 4.96, img: bedroomMain },
    { title: 'Luxury Casa Bella 1BHK with plunge pool, Calangute', price: 39942, rating: 4.95, img: lr1C },
    { title: 'Kanso by Earthen Window | Jacuzzi | Terrace | Pool', price: 45648, rating: 5.0, img: bathroomMain },
    { title: 'Luxury Apt | Private Pool | 6 Mins from Beach', price: 48786, rating: 4.93, img: addlMain },
    { title: 'Serendipity Cottage - Calm Stay in Calangute-Baga.', price: 22824, rating: 4.92, img: lr2B },
    { title: 'The Tropical Studio | 5 mins to Beach', price: 22824, rating: 4.96, img: lr2D },
    { title: 'Luxury Casa Bella 1BHK with plunge pool, Calangute', price: 39942, rating: 4.95, img: bedroomC },
  ],
};
