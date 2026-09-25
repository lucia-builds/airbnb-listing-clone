# AI-Assisted Development — Prompt Sequence

This documents the actual sequence of prompts used to build this clone with
Claude, in order. Paraphrased where a message was long (e.g. pasted file
contents), verbatim in intent otherwise.

1. **Initial task share**: uploaded the Playpower Labs take-home assignment
   PDF and said "clone https://www.airbnb.co.in/?locale=en this platform".

2. **Scope clarification** (assistant-initiated): flagged that the
   assignment's actual reference was a single listing page
   (`airbnb-clone-umber-two.vercel.app`), not the full Airbnb platform, and
   asked which to build. → User selected the assignment's actual reference.

3. **Reference access attempt**: assistant attempted to fetch the reference
   URL directly; blocked by robots.txt, and the sandboxed environment's
   network is restricted to package registries, not general websites.
   Asked the user for screenshots instead.

4. User uploaded the assignment PDF's own screenshots again (not new
   material) — assistant identified these were the same low-res inset
   images already seen and asked for actual full-resolution screenshots or
   a screen recording instead.

5. User: "how about i give u a video?" — assistant confirmed a screen
   recording would work and gave capture guidance (slow scroll, cover Show
   all photos → Photo Tour → Lightbox → prev/next, hover states).

6. User uploaded the first video (listing page scroll + hover states,
   58s) with: "do exactly like this even the user experience should also
   be same to same." Assistant extracted frames via ffmpeg, built contact
   sheets, and reviewed the full listing page structure frame by frame
   (header states, hero gallery, sticky nav, booking widget, reviews,
   host section, calendar, things-to-know, nearby stays, location map).

7. User uploaded two more videos covering the Photo Tour view (26s) and
   the Lightbox view (32s), with: "see these are here so do exactly like
   this and also the animations should be exactly like this." Assistant
   extracted and reviewed frames for both, confirming: Photo Tour's
   category grid → scrolling two-column room list; Lightbox's header
   layout, counter, and confirmed (via 30fps frame extraction around a
   navigation click) that photo transitions are an instant swap with no
   crossfade/slide.

8. User re-uploaded the same two videos under their original filenames
   with: "do it exactly like this and also animations must also be same
   to same." Assistant verified via checksum that these were identical to
   the already-processed videos and proceeded directly to building rather
   than re-analyzing.

9. **User: "Continue"** — assistant scaffolded the Vite + React project,
   then discovered several early image crops were misaligned (grid-overlay
   coordinates read by eye were wrong), diagnosed the cause, and switched
   to a connected-component detection method (numpy + scipy) to get exact
   pixel-accurate crops for every room's photos.

10. Built out all components in sequence: data model → icons → global
    styles → Header/TitleRow → HeroGallery → StickyNav → Overview →
    Amenities → Calendar → Reviews → HostSection → ThingsToKnow →
    NearbyStays → LocationMap → BookingWidget → ListingPage composition
    → PhotoTour → Lightbox → App-level routing (URL query params mimicking
    the reference's `?modal=PHOTO_TOUR_SCROLLABLE&modalItem=` pattern).

11. Installed Playwright in the sandbox to self-review: took screenshots
    of the listing page section by section against the reference frames,
    tested the Photo Tour scroll behavior, tested Lightbox prev/next and
    keyboard arrow navigation, and tested scroll-position preservation
    when closing the Lightbox back into the Photo Tour.

12. Found and fixed two real bugs during self-review:
    - Hero-image clicks weren't scrolling the Photo Tour to the right
      room, because the ref was attached to a `display: contents` wrapper
      (no layout box, so `scrollIntoView` was a no-op) — fixed by moving
      the ref to the actual content element, plus a double-`requestAnimationFrame`
      wait for the grid-hidden re-render to commit before measuring.
    - A false-alarm "scroll position not preserved" result, root-caused
      to the test script's forced click auto-scrolling the target element
      into view — not an app bug; re-verified correct behavior with an
      in-viewport click.

13. Added focus management and a Tab focus-trap to both the Photo Tour and
    Lightbox modals, layered Escape-key handling (Lightbox's Escape steps
    back to the grid rather than closing everything), and removed a
    Google Fonts `@import` that was silently failing under the sandbox's
    restricted network egress, in favor of a system-font stack.

14. **User: "continue with the work and dont describe the project, dont
    build from scratch just build from where u leave ok."** — resumed
    after an environment reset (dev server had dropped), restarted it,
    re-verified the fixes still held, then produced the remaining
    deliverables: the architecture diagram, this prompt log, and the
    sub-agent/skill config files.
