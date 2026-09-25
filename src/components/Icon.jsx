// Minimal outline icon set, hand-drawn to match the reference's thin-stroke style.
// Using a single component keeps stroke-width/viewBox conventions consistent.

const paths = {
  kitchen: 'M4 4v16M4 4h6M4 12h6M20 4v16M14 4a4 4 0 000 8 4 4 0 000-8z',
  wifi: 'M2 8.5a15 15 0 0120 0M5.5 12a10 10 0 0113 0M9 15.5a5 5 0 016 0M12 19v.01',
  workspace: 'M3 20h18M6 20V9h12v11M9 9V5h6v4M11 12h2',
  parking: 'M5 20V4h6a4 4 0 010 8H5',
  pool: 'M3 18c1.5-1 3-1 4.5 0s3 1 4.5 0 3-1 4.5 0 3 1 4.5 0M4 13l7-9 7 9',
  hottub: 'M4 20v-6a4 4 0 014-4h8a4 4 0 014 4v6M2 20h20M8 6c0-1 1-1 1-2s-1-1-1-2M13 6c0-1 1-1 1-2s-1-1-1-2',
  pets: 'M4.5 10a2 2 0 100-4 2 2 0 000 4zM9 7a2 2 0 100-4 2 2 0 000 4zM15 7a2 2 0 100-4 2 2 0 000 4zM19.5 10a2 2 0 100-4 2 2 0 000 4zM12 21c-3 0-6-1.5-6-4.5C6 13 9 12 9 9.5c0-.5.5-1 1-1h4c.5 0 1 .5 1 1 0 2.5 3 3.5 3 7 0 3-3 4.5-6 4.5z',
  camera: 'M4 8h3l2-2h6l2 2h3v11H4z M12 17a3.5 3.5 0 100-7 3.5 3.5 0 000 7z',
  coalarm: 'M12 3a7 7 0 00-7 7c0 3 2 5 2 7h10c0-2 2-4 2-7a7 7 0 00-7-7z M9 21h6',
  smokealarm: 'M12 4l7 4v6l-7 4-7-4V8z M12 10v4 M12 16h.01',
  entertainment: 'M3 12a9 9 0 1118 0 9 9 0 01-18 0z M3 12h18 M12 3a15 15 0 010 18 15 15 0 010-18z',
  cool: 'M12 2v20M4.5 6l15 12M19.5 6l-15 12M2 12h20',
  selfcheckin: 'M9 4h9v16H9 M9 4L4 6v12l5 2 M14 12h.01',
  chevronLeft: 'M15 18l-6-6 6-6',
  chevronRight: 'M9 18l6-6-6-6',
  close: 'M18 6L6 18M6 6l12 12',
  heart: 'M12 21s-7.5-4.6-10-9.3C.4 8.3 2 4.5 5.7 4A5.4 5.4 0 0112 7.5 5.4 5.4 0 0118.3 4C22 4.5 23.6 8.3 22 11.7 19.5 16.4 12 21 12 21z',
  heartFilled: 'M12 21s-7.5-4.6-10-9.3C.4 8.3 2 4.5 5.7 4A5.4 5.4 0 0112 7.5 5.4 5.4 0 0118.3 4C22 4.5 23.6 8.3 22 11.7 19.5 16.4 12 21 12 21z',
  share: 'M12 3v12M8 7l4-4 4 4M5 13v6a2 2 0 002 2h10a2 2 0 002-2v-6',
  star: 'M12 2l2.9 6.6 7.1.6-5.4 4.7 1.7 7-6.3-3.9L5.7 21l1.7-7L2 9.2l7.1-.6z',
  laurel: 'M12 2c1 4 1 16 0 20 M8 4c2 3 2 13 0 17 M4 8c2 2 2 8 0 12',
  grid: 'M4 4h6v6H4zM14 4h6v6h-6zM4 14h6v6H4zM14 14h6v6h-6z',
  home: 'M3 10.5L12 3l9 7.5M5.5 9.5V20h13V9.5M9 20v-6h6v6',
  minus: 'M5 12h14',
  plus: 'M12 5v14M5 12h14',
  search: 'M11 4a7 7 0 100 14 7 7 0 000-14zM21 21l-4.3-4.3',
  globe: 'M12 21a9 9 0 100-18 9 9 0 000 18zM3 12h18M12 3a14 14 0 010 18 14 14 0 010-18z',
  menu: 'M3 6h18M3 12h18M3 18h18',
  flag: 'M5 3v18M5 4h13l-3 4 3 4H5',
  shield: 'M12 2l8 3v6c0 5-3.5 8.5-8 11-4.5-2.5-8-6-8-11V5z',
  key: 'M14 7a4 4 0 10-4 4v2H8v2H6v2H3v3h5l6-6a4 4 0 004-7z',
  message: 'M21 11.5a8.4 8.4 0 01-8.9 8.4A9 9 0 013 20l1.1-3.3A8.4 8.4 0 1121 11.5z',
  cleanliness: 'M6 3h8v5H6z M8 8v12M12 8v12M5 20h12M17 9l2 2-4 4',
  accuracy: 'M12 3a9 9 0 100 18 9 9 0 000-18zM8 12l2.5 2.5L16 9',
  map: 'M3 6l6-3 6 3 6-3v15l-6 3-6-3-6 3zM9 3v15M15 6v15',
  tag: 'M4 5v7l8 8 8-8-8-8H4zM8 8h.01',
  hairdryer: 'M4 10h8a4 4 0 000-8H4v8z M8 10v6 M8 16l-2 5 M8 16l2 5 M15 8h5',
  cleaningProducts: 'M9 5h6M10 5V2h4v3M7 8h10l-1 13H8L7 8z M10 12h4M10 16h4',
  shampoo: 'M9 4h6v17H9z M10 2h4v2M8 8h8',
  hotwater: 'M5 12h14v7H5z M8 9c0-2 2-2 2-4M13 9c0-2 2-2 2-4M18 9c0-2 2-2 2-4',
  showergel: 'M8 5h8v16H8z M10 3h4v2M16 9h3',
  washingMachine: 'M5 3h14v18H5z M8 7h8 M12 17a4 4 0 100-8 4 4 0 000 8z M16.5 5h.01',
  hangers: 'M12 7a2 2 0 10-2-2 M12 7l8 9H4l8-9z',
  bedLinen: 'M4 7h16v13H4z M4 11h16 M7 4h10v3H7z',
  blinds: 'M5 4h14M7 4v14M17 4v14M5 18h14M9 21h6',
  iron: 'M4 16h17l-3-9H7l-3 9z M7 7l3-4h4l2 4 M8 16h.01',
  clothesStorage: 'M5 4h14v16H5z M8 8h8M8 12h8M8 16h8',
  cot: 'M4 8h16v10H4z M6 8V5h12v3M6 18v3M18 18v3',
  tv: 'M4 5h16v12H4z M9 21h6M12 17v4',
  ac: 'M4 8h16v8H4z M7 12h.01M12 12h.01M17 12h.01 M7 16v3M17 16v3',
  fan: 'M12 12c0-5 3-7 6-7 1 3-1 6-6 7z M12 12c5 0 7 3 7 6-3 1-6-1-7-6z M12 12c0 5-3 7-6 7-1-3 1-6 6-7z M12 12c-5 0-7-3-7-6 3-1 6 1 7 6z M12 12h.01',
  fridge: 'M6 3h12v18H6z M6 10h12M9 6v2M9 13v2',
  microwave: 'M4 6h16v13H4z M7 9h8v7H7z M18 10h.01M18 13h.01',
  cutlery: 'M6 3v8M4 3v5a2 2 0 004 0V3M6 11v10M15 3v18M15 3c4 2 4 6 0 8',
  kettle: 'M6 8h10v12H6z M8 8V5h6v3M16 11h3a3 3 0 010 6h-3',
  coffee: 'M5 7h12v10H5z M17 10h2a3 3 0 010 6h-2M8 4h6',
  wine: 'M6 3h12l-2 7a4 4 0 01-8 0L6 3z M12 14v7M8 21h8',
  toaster: 'M5 7h14v11H5z M8 10h8M9 4v3M15 4v3',
  blender: 'M7 3h10l-2 9H9L7 3z M9 12v5h6v-5M7 20h10',
  cooker: 'M5 4h14v17H5z M9 8a2 2 0 100-4 2 2 0 000 4z M15 8a2 2 0 100-4 2 2 0 000 4z M9 13a2 2 0 100-4 2 2 0 000 4z M15 13a2 2 0 100-4 2 2 0 000 4z',
  privateEntrance: 'M5 21V5l7-3 7 3v16M9 21v-7h6v7M12 8h.01',
  patio: 'M12 4v17M5 10h14M7 10l-2 4M17 10l2 4M8 21h8M9 6c2-2 4-2 6 0',
  outdoorDining: 'M4 10h16M6 10v10M18 10v10M9 15h6M12 10v10',
  gym: 'M3 10h4v4H3zM17 10h4v4h-4zM7 11h10v2H7zM9 8v8M15 8v8',
  cleaning: 'M7 7h8v14H7z M9 4h4v3M15 10l4 2-4 2M10 12h.01M10 16h.01',
  longTerm: 'M4 5h16v16H4z M8 3v4M16 3v4M4 10h16',
};

export default function Icon({ name, size = 20, strokeWidth = 1.5, filled = false, className }) {
  const d = paths[name];
  if (!d) return null;
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={filled ? 'currentColor' : 'none'}
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d={d} />
    </svg>
  );
}
