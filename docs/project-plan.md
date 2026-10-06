# THE SIP — Final Project Plan

## Subject + Purpose

**Project:** THE SIP

**Concept:** An immersive scroll-driven journey through classic cocktails where every drink opens another surreal world.

**Audience:** People interested in cocktails, immersive storytelling, experimental websites, and visual culture.

**Core message:** Every drink opens another world.

THE SIP turns eight classic cocktails into one connected cinematic descent:

Portal → Negroni → Dirty Martini → Margarita → Mai Tai → Manhattan → Espresso Martini → Old Fashioned → French 75 → final portal → black ending.

Scrolling is appropriate because it gives the visitor direct control over cinematic time. A downward gesture advances the camera through the worlds; reversing the gesture retraces the same visual path. The interaction is exploratory without breaking the experience into pages or requiring playback controls.

## Visual Direction

The final direction is surreal, psychedelic, cinematic, retro-futuristic, expressive, and maximalist. Abstract realism keeps the cocktails recognizable while their environments behave like heightened dream worlds.

- **Palette:** Black and dark charcoal UI surfaces, vivid magenta typography and focus accents, saturated world-specific footage.
- **Lighting:** High-contrast cinematic light, neon highlights, luminous portals, reflective glass, and dramatic darkness.
- **Materials:** Liquid, glass, chrome, crystal, fruit, ice, mist, glowing energy, and portal light.
- **Typography:** Condensed high-impact display lettering for identity and headings; compact, readable sans-serif copy for information.
- **Camera:** Persistent forward travel and descent with layered depth, hero pauses, environmental transitions, and a final portal hold.
- **Mood:** Mysterious, seductive, playful, surreal, and premium without becoming corporate.
- **Interface:** Organic rounded capsules derived from the supplied THE SIP references. Controls stay compact so the Magnific footage remains dominant.

## Journey Structure

| Order | Cocktail | Concept | Hero peak (s) |
|---:|---|---|---:|
| 01 | Negroni | Temptation | 14.50 |
| 02 | Dirty Martini | Provocation | 25.25 |
| 03 | Margarita | Desire | 31.50 |
| 04 | Mai Tai | Excess | 37.25 |
| 05 | Manhattan | Power | 49.50 |
| 06 | Espresso Martini | Obsession | 56.50 |
| 07 | Old Fashioned | Authority | 62.50 |
| 08 | French 75 | Spark | 69.00 |

The portal introduction occupies 0.00–11.50 seconds. The cocktail journey resolves into the final portal after 72.50 seconds. The video’s final frame is held while the page-level black ending fades in.

## Technical Plan

### Stack

- React 18
- Vite 5
- GSAP 3
- ScrollTrigger
- Semantic HTML and responsive CSS overlays
- One continuous master MP4
- Magnific with Seedance 2.5 for approved visual generation and extension
- ffmpeg and ffprobe for local assembly, inspection, and web encoding

### Measured media

The values below were read from the MP4 container during the final audit.

| Property | Approved master | Scroll encode |
|---|---:|---:|
| Path | `assets/video/cocktail-world-master-v2.mp4` | `assets/video/cocktail-world-master-v2-scroll.mp4` |
| Duration | 81.000 s | 81.000 s |
| Resolution | 1920 × 1080 | 1920 × 1080 |
| Aspect ratio | 16:9 | 16:9 |
| Frame rate | 24 fps | 24 fps |
| Codec | H.264 (`avc1`) | H.264 (`avc1`) |
| Frames | 1,944 | 1,944 |
| File size | 96,888,631 bytes | 103,909,784 bytes |
| Keyframes | 12, irregular | 162, every 12 frames |

The deployed browser source is the scroll encode. Its 12-frame GOP creates a keyframe every 0.5 seconds at 24 fps, prioritizing responsive seeking over minimum file size.

### Scroll synchronization

The hot path avoids React state updates on every animation frame:

```text
scroll position
→ ScrollTrigger progress
→ target video time
→ requestAnimationFrame interpolation
→ video.currentTime
```

ScrollTrigger pins one viewport stage across 38 viewport heights. The first 94% of that runway maps to the 81-second video. The remaining 6% holds the final portal frame and drives the black ending layer.

The target time is stored in a ref. A single `requestAnimationFrame` loop interpolates toward it with a factor of `0.22`, seeks at most every 40 ms, and ignores differences below `1/48` second. The same calculation works in both directions. React state changes only when the active chapter changes or a visitor opens interface controls.

### Loading and seeking

- One persistent `<video>` is mounted for the entire experience.
- `preload="auto"`, `muted`, `playsInline`, and no controls are used.
- The video is paused; scroll controls `currentTime` directly.
- The H.264 scroll copy uses frequent keyframes for forward and reverse seeking.
- The video source never changes between chapters and is never looped.
- CSS declares `filter: none` and `transform: none` on the video.

### Responsive behavior

Desktop is the primary cinematic canvas. On smaller screens, the navbar remains compact, Journey becomes a vertically scrollable list, and information panels expand within the viewport width. The video remains center-cropped with `object-fit: cover`; no interaction scale or filter is applied.

### Reduced motion

The `prefers-reduced-motion: reduce` media query removes looping decorative motion and compresses UI animation durations to effectively static changes. JavaScript changes smooth timeline jumps to immediate scrolling for reduced-motion users. Navigation, Journey, History, Recipe, ending, keyboard focus, and Escape behavior remain functional.

## Completion Criteria

- One connected scroll journey with eight cocktail worlds.
- Smooth forward and reverse timeline control.
- Clear opening instruction and persistent THE SIP identity.
- Click-only History and Recipe panels with accessible state.
- Intentional final portal, fade to black, and ENTER AGAIN return.
- Production build and browser QA pass without console errors.
- Documentation, Git history, GitHub push, and live deployment are verified rather than assumed.
