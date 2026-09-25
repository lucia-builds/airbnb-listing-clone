# Airbnb Listing Clone — Playpower Labs Take-Home

A clone of the reference listing page at `airbnb-clone-umber-two.vercel.app`,
built from screen recordings (the live reference blocks automated fetching
and wasn't reachable from the build sandbox). See `PROMPTS.md` for the full
development sequence and `architecture-diagram.png` for the production
scaling design.

## Stack

- React 19 + Vite
- Plain CSS (one stylesheet per component) — no CSS framework, for
  pixel-level control over spacing and typography
- No backend: listing content is static data in `src/data/listing.js`;
  no persistence is needed for a read-only listing page

## Running it

```bash
npm install
npm run dev       # http://localhost:5173
npm run build     # production build to dist/
```

## What's implemented

- **Listing page**: header (top search bar + sticky sub-nav that becomes
  sticky via plain CSS `position: sticky`, not JS scroll listeners), hero
  gallery, title/share/save (with hover tooltip and saved state), guest
  favourite + rating badges, host summary, highlights, expandable
  description, sleep cards, amenities grid + "show all" modal, two-month
  calendar, reviews (rating breakdown, tags, review cards), host section
  with co-hosts grid, things-to-know, nearby stays carousel, location map
  (SVG), and a sticky booking widget.
- **Photo Tour** (`?modal=PHOTO_TOUR_SCROLLABLE`): category grid that
  scrolls away into a two-column room-by-room photo feed, matching the
  reference's exact full/half-width photo pattern per room (this isn't a
  uniform grid — it was reverse-engineered per room from the reference
  frames). Opens from "Show all photos" or from any hero photo (scrolled
  to that photo's room).
- **Lightbox** (`&modalItem=<id>`): single-photo viewer with prev/next
  arrows, left/right keyboard navigation, a photo counter, and a grid
  button that returns to the Photo Tour at the exact scroll position it
  was opened from. Image transitions are an instant swap with no
  crossfade/slide, matching the reference (confirmed via 30fps frame
  extraction around a navigation click).
- **Accessibility**: focus moves into each modal on open; Tab is trapped
  within the active modal; Escape closes one layer at a time (Lightbox to
  Photo Tour to listing page); every icon-only control has an aria-label;
  role="dialog" + aria-modal on both overlays.
- **URL state**: opening/closing the Photo Tour and Lightbox pushes/pops
  browser history with the same query-param shape observed on the
  reference (?modal=PHOTO_TOUR_SCROLLABLE&modalItem=1003), so back/forward
  navigation works.

## Known limitations

- **Image quality**: all property photos are cropped from the provided
  screen recordings (verified pixel-accurate via connected-component
  detection — see `.claude/skills/asset-extraction/SKILL.md` — but capped
  by video compression), not pulled from the live site's original files.
  Swapping in the original images (saved directly from the site) would be
  a drop-in replacement in `src/assets/photos/`.
- **Photo count**: the reference lightbox shows 43 total photos; this
  build has 25, since only some rooms' full photo sets appeared in the
  provided recordings. Padding the difference with duplicate images
  seemed worse than an honest lower count.
- **Desktop only**, per the assignment's explicit scope note.
- A few amenity/highlight icons are close approximations rather than
  exact matches to the reference's icon set, since those weren't always
  legible at video resolution.

## Project structure

```
src/
  data/listing.js       # all static listing content
  components/           # one component + one CSS file per section
  assets/photos/        # cropped property photos
.claude/
  agents/               # sub-agent configs (pixel review, a11y audit, component builder)
  skills/asset-extraction/  # the frame-extraction + crop-verification technique used
PROMPTS.md               # full prompt sequence used during development
architecture-diagram.png # production-scale system architecture
```
