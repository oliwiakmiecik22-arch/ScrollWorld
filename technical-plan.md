> Historical pre-production artifact. The final implementation plan is documented in `docs/project-plan.md`.

# Your Cocktail Guide — Seven-World Master Timeline

## Architecture

The experience is one continuous scroll world:

- one pinned full-viewport stage;
- one `video` element using the complete Magnific master;
- one global GSAP/ScrollTrigger timeline;
- one reversible scroll playhead mapped to `video.currentTime`;
- seven reusable DOM chapter overlays synchronized with observed source timestamps;
- shared background, midground, foreground, typography and atmosphere planes.

Chapters are timing/configuration records, not webpage sections. The video never restarts, swaps sources, autoplays, or fades to black at a cocktail boundary. No video-scale tween is used.

## Master media audit

- **File:** `assets/cocktail-world-master.mp4`
- **Exact browser-reported duration:** `44.041667 s`
- **Dimensions:** `1280 × 720`
- **Handling:** imported untouched; no transcode or overwrite was performed.

The timing map below was produced by inspecting the master at roughly 0.5-second intervals and refining the visible handoffs. Boundaries are intentionally unequal and overlap where one visual world mutates into the next.

## Central timing map (seconds)

All values are editable in the central `chapters` array in `src/App.jsx`.

| Cocktail | World start | Appears | Hero reveal | Hero peak | Descent / left behind | History | Recipe | Transition | Chapter end |
|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|
| Negroni | 0.000 | 0.000 | 0.350 | 3.200 | 4.100 | 5.000–6.300 | 6.350–8.150 | 8.150 | 9.050 |
| Dirty Martini | 8.650 | 9.000 | 9.450 | 11.250 | 12.750 | 13.000–13.800 | 13.700–14.450 | 14.200 | 14.650 |
| Margarita | 14.400 | 14.500 | 15.000 | 17.200 | 18.700 | 19.200–20.200 | 20.200–22.200 | 22.200 | 23.100 |
| Mai Tai | 22.700 | 22.800 | 23.300 | 24.400 | 25.100 | 25.300–25.900 | 25.800–26.600 | 26.350 | 27.100 |
| Manhattan | 26.700 | 26.800 | 27.200 | 30.500 | 32.350 | 32.600–33.500 | 33.450–34.550 | 34.350 | 35.100 |
| Espresso Martini | 34.650 | 34.700 | 35.250 | 37.150 | 37.750 | 37.900–38.600 | 38.550–39.450 | 39.250 | 39.800 |
| Old Fashioned | 39.450 | 40.350 | 41.000 | 43.650 | 39.450 alien plunge | 40.150–41.200 | 41.200–42.650 | 43.500 | 44.041667 |

### Old Fashioned footage constraint

The final world is structured differently in the supplied master: it begins with a cosmic/alien plunge and ends on the completed Old Fashioned hero. There is no post-hero video tail. History and recipe therefore occupy the alien approach and emergence window, while the cocktail resolves as the final artifact. The final frame is preserved rather than fabricating a new descent beyond the footage.

## Scroll/video synchronization

The stage is pinned for `+=8800%`, giving approximately 88 viewport heights of reading and exploration distance without tying physical page length to MP4 duration.

On every ScrollTrigger update:

```text
masterTime = clamp(scrollProgress, 0, 1) × 44.041667
video.currentTime = masterTime
```

The video is always paused, muted, inline and control-free. Upward scrolling sends the same playhead backward, so all media, content and parallax motion reverse naturally. `data-master-progress` and `data-master-time` are written on the video for browser QA.

## Reusable chapter choreography

Every chapter record contains identity, copy, recipe data and these source-time keys:

```text
chapterStart, cocktailAppear, heroReveal, heroPeak, descentStart,
historyStart, historyEnd, recipeStart, recipeEnd,
transitionStart, chapterEnd
```

One `ChapterMoment` component renders all seven chapters. A single loop schedules hero, history, recipe and transition motion from each record. Adding or retiming a cocktail does not require a new player or bespoke ScrollTrigger.

## Spatial system

- The master video is the distant visual backbone and is never scaled by GSAP.
- Background particles and rings descend slowly.
- Midground organic silhouettes descend at medium speed.
- Foreground forms and the luminous thread pass fastest.
- Large dates/locations sit behind readable copy and scenery.
- Readable text uses localized radial atmosphere and shadow, never an opaque card.
- Ingredient quantities are large open typographic objects separated by luminous rules rather than recipe panels.

Old Fashioned adds a dedicated lightweight DOM field: distant stars/symbols, midground mineral shards, near-camera rock silhouettes and haze. Their increasingly large vertical displacement creates the final falling-into-screen sensation without enlarging the video.

## Responsive and reduced motion

Desktop remains the cinematic target. Mobile retains `object-fit: cover`, center-safe video framing, fluid type and simplified ingredient geometry. Reduced-motion mode removes continuous scrubbing/parallax and presents all seven readable chapter moments in document order over a static first-frame video fallback.

## Performance notes

- One 19.3 MB MP4 means one decoder and no per-chapter preload logic.
- The original master remains untouched.
- Seeking performance is acceptable locally, but a short-GOP web copy is still recommended for production. It must be added as a separate file.
- The source currently has no standalone poster image. The browser uses the first decoded master frame as the visual fallback; a frame extracted from the approved master should be added later as a dedicated poster.

## Verification checklist

1. Production build succeeds.
2. Exactly one video element and one stable source exist.
3. Scroll 0 and 1 map to `0.000` and `44.041667` seconds.
4. Reverse scrolling reduces `currentTime` and reverses DOM choreography.
5. All seven fixed cocktails occur in the specified order.
6. History and recipe windows use the central timing data.
7. No hero/video zoom tween exists.
8. No opaque cards, hard page cuts, blank transition panels or separate players exist.
9. Browser console has no critical errors.
