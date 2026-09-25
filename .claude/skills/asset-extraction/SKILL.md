---
name: asset-extraction
description: Use when the only available source for a UI's real content (photos, icons, text) is a screen recording or a set of screenshots rather than direct access to the live reference site. Covers extracting frames and cropping precise, correctly-bounded image assets from video.
---

# Asset extraction from screen recordings

When a reference site can't be fetched directly (blocked by robots.txt,
no network access, or the person can only share a video), this skill
extracts usable, correctly-cropped image assets from that video instead
of guessing pixel coordinates by eye.

## Why this matters

Eyeballing crop coordinates from a manually-drawn grid overlay is
unreliable: font baselines, display scaling, and misread gridlines
routinely produce off-by-100px errors that silently crop the wrong
content (title text instead of a photo, the wrong half of a two-up
image). This was discovered mid-project here — several early crops were
wrong in exactly this way — and fixing it required switching to a
programmatic method.

## Process

1. **Extract frames at a low rate first** (`ffmpeg -vf fps=1` or `fps=3`)
   to find the timestamps that show the state you need (a specific
   scroll position, a specific modal). Build a contact-sheet montage
   (PIL, grid of thumbnails with index labels) to scan many frames at
   once instead of viewing them one by one.
2. **Extract a higher-fps burst** (`fps=15`-`30`) around any timestamp
   where a transition or animation needs to be characterized (e.g.
   confirming whether an image swap is instant or crossfades).
3. **Never eyeball crop coordinates from a grid overlay for anything
   that needs to be reused as a real asset.** Instead, detect content
   boxes programmatically:
   - Convert the frame to a numpy array.
   - Build a mask of "non-background" pixels (e.g. `~np.all(arr > 248,
     axis=2)` for a white-background UI).
   - Run connected-component labeling (`scipy.ndimage.label`) on the
     mask, restricted to the region of interest (exclude known chrome
     like browser toolbars or a text sidebar by x/y bounds).
   - Filter components by minimum area to drop noise (text glyphs,
     antialiasing artifacts).
   - The resulting bounding boxes are exact pixel crops — use them
     directly instead of estimated coordinates.
4. **Verify every crop** by re-assembling all extracted images into a
   labeled contact sheet and viewing it as a whole before wiring them
   into the app. Catching a misaligned crop here is much cheaper than
   catching it after it's already referenced by a dozen components.
5. Save crops at the source video's native resolution (don't upscale);
   document the resulting quality ceiling to whoever will review the
   final asset fidelity, since a compressed screen recording will never
   match assets pulled directly from the live site.

## When to fall back to asking for real assets

If the final deliverable explicitly requires pixel-perfect asset
fidelity (not just layout/behavior fidelity) and the video-derived crops
are visibly soft or low-resolution, say so and offer to swap in
higher-quality files if the person can export them directly from the
source (e.g. browser "Save Image As" or DevTools network tab), rather
than silently shipping the lower-quality version as if it were final.
