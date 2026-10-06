> Historical pre-production artifact retained to show development history. See `docs/magnific-workflow.md` for the final media workflow.

# Your Cocktail Guide — Modular Asset Plan

## Production strategy

The one-week version has ten complete cocktail chapters, but it must not become ten independent productions. Every chapter uses the same scene shell, five-beat timing, history grammar, recipe patterns, media lifecycle, and transition toolkit.

Spend custom effort on:

- Ten distinct glass heroes.
- Ten short Magnific hero videos.
- Four signature Magnific transition videos.
- One small layer pack and poster per cocktail.

Everything else reuses shared systems.

**Hard rule:** every generated video asset will be made with **Magnific**. No other video-generation service or model enters the pipeline. No videos are generated during planning.

## V1 asset budget

| Asset class | Count | Notes |
|---|---:|---|
| Cocktail hero videos | 10 | Required; one per cocktail, 4–6 seconds |
| Major transition videos | 4 | T01, T02, T03, T04 only |
| Cocktail poster frames | 10 landscape + 10 portrait crops | Loading, fallback, reduced motion |
| Intro/outro posters | 2 landscape + 2 portrait | No intro/outro video |
| Environment backplates | 10 | One primary wide plate each |
| Foreground/depth planes | Maximum 30 | Maximum three extra planes per cocktail |
| History ephemera | Maximum 30 | Maximum three objects per cocktail |
| Ingredient symbol sets | 10 | Three to six symbols per cocktail |
| Golden Twist treatments | 10 | One path, ten material skins |
| Shared texture/particle kits | 1 | Reused across all chapters |
| Shared WebGL effects | Maximum 3 | Refraction, particle migration, subtle distortion |

The counts are caps, not targets to exceed.

## Future directory structure

Do not create these folders or files during planning. The later production organization should be:

```text
assets/
  images/
    global/
    intro/
    negroni/
    daiquiri/
    aviation/
    espresso-martini/
    margarita/
    old-fashioned/
    dirty-martini/
    cosmopolitan/
    french-75/
    mai-tai/
    outro/
    posters/
  video/
    magnific-source/
    hero-masters/
    transition-masters/
    web/
  textures/
  audio/
  fonts/
  manifests/
```

## Naming convention

`{type}-{order}-{cocktail-or-route}-{action}-{viewport}-{version}.{ext}`

Examples:

- `hero-01-negroni-condensation-landscape-v01.mp4`
- `hero-07-dirty-martini-olive-landscape-v02.mp4`
- `transition-03-dirty-cosmo-eclipse-landscape-v01.mp4`
- `poster-09-french-75-portrait-v01.webp`
- `history-06-old-fashioned-newspaper-v01.webp`

Use lowercase kebab-case. Preserve source versions and approval states; never use `final-final` filenames.

## Shared asset kit

| ID | Asset | Variants | Use |
|---|---|---:|---|
| G01 | Golden Twist master path | 10 material skins | Guide, mask, transition cause |
| G02 | Print texture kit | 6 scale-aware tiles | Paper, halftone, dry brush, registration |
| G03 | Condensation kit | 12 droplets + 4 trails | Static and browser-animated glass detail |
| G04 | Particle atlas | 6 families | Dust, sugar/salt, stars, crema, bubbles, ice |
| G05 | Glass highlight kit | 10 adaptable streaks | Shared illustrated refraction language |
| G06 | Shaker / mixing-glass outlines | 2 forms | Reusable recipe assembly |
| G07 | History ephemera frames | 8 forms | Receipt, map, stamp, ticket, diagram, matchbook |
| G08 | Curtain / stage plates | 3 depth planes | Intro/outro and chapter wipes |
| G09 | Glass silhouette masks | 10 | Code-driven reveals and transitions |
| G10 | Poster grading preset | 10 palette tokens | Consistent video/poster color match |

## Per-cocktail static packs

Each pack contains only: backplate, rear plane, foreground plane, Golden Twist skin, up to three history objects, ingredient symbols, glass mask, landscape poster, portrait crop.

| Cocktail | Backplate / atmosphere | Key static objects | Ingredient pattern |
|---|---|---|---|
| Negroni | Oxblood salon and mirror arches | Receipt, Florence façade, 1919? stamp | Three-part orbit |
| Daiquiri | White Cuban coastal mirage | Cuba map, Daiquirí marker, ledger | Three-part shaker assembly |
| Aviation | Violet paper-cloud theatre | 1916 book abstraction, NY stamp, flight lines | Four constellations |
| Espresso Martini | Wet midnight city | London map, bar ticket, name overprint | Four-part shaker pulse |
| Margarita | Surreal salt desert | Claimant matchbooks, border map, Daisy diagram | Four-part shaker assembly |
| Old Fashioned | Wood chamber and clock shadows | 1806 strip, four-symbol definition, crossed flourish | Four-step build |
| Dirty Martini | Black velvet booth and chrome slit | Martini diagram, brine drop, later DIRTY stamp | Three-column mix |
| Cosmopolitan | Mirrored downtown photo call | Abstract Odeon façade, 1980s ticket, formulation stamp | Four overlapping gels |
| French 75 | Ink-blue Deco salon | “75” numerals, field-gun rhythm, recipe line | Three-plus-topper build |
| Mai Tai | Maximal mint night garden | 1944 Oakland check, claim map, name exclamation | Six-part strata |

## Ten required Magnific hero videos

All hero videos are **4–6 seconds**, **16:9**, desktop-first, center-safe, slow, reversible enough for scroll scrubbing, and free of text or branding.

| ID | Cocktail | Hero-video concept | Main motion | Stable boundary-frame requirement |
|---|---|---|---|---|
| H01 | Negroni | Ruby glass on black velvet; room continues inside ice | Condensation merges, ice turns slightly, peel curls once | Same frontal rocks-glass pose and peel position zone |
| H02 | Daiquiri | Pale coupe against a white coastal mirage | Frost blooms, lime mist drifts, horizon tilts and returns | Level horizon, centered coupe, clear rim |
| H03 | Aviation | Lavender observatory above clouds | Two-depth clouds drift, cherry descends, contrail orbits | Cherry settled, glass centered, halo calm |
| H04 | Espresso Martini | Black mirror holding a wet cobalt city | Crema breathes, steam coils, reflection slides | Calm crema, three visible beans, locked silhouette |
| H05 | Margarita | Salt-rimmed gateway on turquoise flats | Salt sparkles, lime turns, reflection ripples once | Symmetric glass, lime inside safe zone |
| H06 | Old Fashioned | Amber monument with cut-crystal ice | Ice turns subtly, caustics crawl, peel relaxes | Heavy centered glass and unchanged ice topology |
| H07 | Dirty Martini | Clouded silver secret in a black-velvet booth | Brine folds, olive rotates, condensation falls, chrome bends | Same centered V, stable oversized olive, deep matte black |
| H08 | Cosmopolitan | Pink prism above mirrored stairs | Two soft flashes, refraction shifts, lemon twist settles | Even light, centered glass, no active flash at boundaries |
| H09 | French 75 | Champagne tower beneath a gold ceiling | Fine bubbles rise, lemon thread turns, silk light passes | Stable flute, continuous but low-density bubbles |
| H10 | Mai Tai | Crushed-ice landscape beneath a mint canopy | Slow pullback, mint breathes, lime turns, amber light moves | Full readable rocks glass and garnish inside safe zone |

### Hero-video prompt contract

Every Magnific brief repeats these constraints:

- Hand-inked retro editorial illustration with imperfect screenprint layers.
- Sensual material behavior, not photoreal live action or glossy sterile 3D.
- The cocktail glass is the single dominant object.
- Protected central corridor equals roughly 35% of frame width.
- One slow camera gesture and one primary material behavior.
- No rapid zoom, handheld shake, 360-degree spin, explosive pour, or busy morph.
- No text, pseudo-text, logos, branded bottles, people, hands, faces, or surprise garnish.
- Exact glass silhouette and garnish count must remain stable.
- Opening and closing compositions should be easy to match to one poster state.

Before generation, confirm the connected Magnific tool’s current model, image-conditioning, duration, resolution, and aspect-ratio parameters. Do not assume an interface or feature set.

## Four Magnific transition videos

These are separate from the hero clips.

| ID | Route | Duration | First-frame lock | Last-frame lock | Transformation |
|---|---|---:|---|---|---|
| T01 | Negroni → Daiquiri | 4–5 s | Large clear ice in ruby rocks glass | Pale coupe stem in white light | Travel through ice; ruby drains; crystal becomes stem |
| T02 | Aviation → Espresso Martini | 5–6 s | Violet glass, contrail, cherry | Black crema with three beans | Sky spins into eclipse; stars land as beans |
| T03 | Dirty Martini → Cosmopolitan | 4–5 s | Oversized olive in clouded silver scene | Pink cocktail with lemon twist | Olive pit becomes aperture; brine flashes cranberry |
| T04 | French 75 → Mai Tai | 5–6 s | Flute and fine gold bubbles | Crushed ice, mint, amber rocks glass | Bubble storm becomes ice mountains and mint jungle |

Priority order: **T02, T03, T01, T04**. If time slips, T04 is the first generated transition replaced by its code-driven fallback; the ten hero videos remain mandatory.

### Transition qualification

A transition is accepted only if:

- Its first and last frames align with approved neighboring poster/hold compositions.
- The central crop contains the complete causal transformation.
- Glass topology remains stable until hidden by a justified full-frame material.
- Reverse playback is visually plausible enough for upward scrolling.
- There is no pseudo-lettering, face, hand, extra garnish, or branded object.
- Compression preserves ruby, black, violet, and gold gradients without obvious banding.

## Code-driven transition inventory

| Route | HTML/CSS/GSAP assets | Optional WebGL | Video fallback if effect is cut |
|---|---|---|---|
| Intro → Negroni | Velvet masks, Golden Twist SVG, condensation wipe | None | Not needed |
| Daiquiri → Aviation | Lime/horizon SVG morph, palette layers, cloud planes | Refractive portal | Scale through lime disc |
| Espresso → Margarita | Crema and salt sprites, city/desert masks, agave path | Particle migration | Crossfade matched texture plates |
| Margarita → Old Fashioned | Salt/sugar sprites, glass masks, amber takeover | Particle gathering | Masked sprite sequence |
| Old Fashioned → Dirty Martini | Peel/pick paths, chrome wipe, glass masks | Gentle refraction | Matched silhouette dissolve |
| Cosmopolitan → French 75 | Flash discs, bubble atlas, flute mask | Particle migration | CSS bubble sprites |
| Mai Tai → Outro | Mint shadows, velvet curtain masks, ten-color ribbon | Ambient dust only | Direct curtain wipe |

The implementation should have four reusable transition families rather than seven bespoke effects: curl/wipe, silhouette morph, particle migration, and color/material takeover.

## WebGL asset requirements

If the selective Three.js layer survives schedule review, it uses only:

- One low-resolution displacement/noise texture set.
- One particle atlas shared by salt, sugar, stars, crema, bubbles, and ice.
- One environment/refraction map per palette family, not per cocktail.
- One performance tier switch: full, reduced particles, or disabled.

No 3D glass models, physics simulation, or chapter-specific shader compilation are required for v1.

## Poster and fallback plan

Create one approved still from each hero-video boundary frame plus intro and outro, then compose portrait crops manually.

Posters serve as:

- Immediate loading frame.
- Exact hold before and after scrubbing.
- Reduced-motion experience.
- Low-bandwidth and decode-error fallback.
- Mobile substitute if a 16:9 center crop fails.
- Social preview source where appropriate.

The poster must match video color and geometry closely enough that switching media does not produce a jump.

## Media assembly and delivery tests

Keep hero videos as independent chapter assets for lazy loading. Test major transitions separately rather than stitching all fourteen clips into one giant timeline; a monolithic file conflicts with the need to virtualize ten heroes.

Initial test targets, not final promises:

- Source/master: 1920×1080, 24 or 30 fps.
- Web baseline: H.264 MP4; add WebM only when measured savings justify another encode.
- Center-safe action: central 35% of width.
- Hero web budget: aim for 1.5–3 MB each.
- Major transition budget: aim for 2–4 MB each.
- Posters: AVIF and WebP, with fallback determined by the later browser matrix.
- Keyframe spacing: tuned through real scroll-seek tests, not chosen only for compression ratio.

Only the current hero and the next likely media asset should be warm. Previous videos should release decoder and memory resources when safely offscreen.

## Source-of-truth manifest

During production, record for every asset:

- Asset ID, cocktail slug, beat, and filename.
- Creator or generation tool.
- Prompt, seed/job ID, and Magnific model/settings where available.
- Conditioning-frame IDs and exact approved boundary frames.
- Creation, review, and approval dates.
- License and provenance for fonts, textures, stock, and audio.
- Dimensions, duration, frame rate, codec, and file size.
- Center focal point and safe-crop notes.
- Alt text, fallback asset, status, and reviewer notes.

## One-week production schedule

### Day 1 — Lock the system

- Finalize ten recipes and history copy; obtain bartender review.
- Approve the modular chapter frame, glass silhouettes, palette tokens, Golden Twist states, and center-safe guides.
- Approve one global style frame plus the Dirty Martini contrast frame.

### Day 2 — Hero boundary frames

- Produce all ten hero start/end frames from the same style pipeline.
- Correct glassware and garnish before any video generation.
- Produce environment backplates in three batches: Lure, Self-possession, Spectacle.

### Day 3 — Magnific hero batch

- Generate H01–H10 in Magnific using approved conditioning frames.
- Limit routine heroes to two qualified attempts; reserve extra review for H03, H07, and H10.
- Extract candidate posters immediately.

### Day 4 — Content layers and major transitions

- Generate T01–T04 in Magnific.
- Produce shared history frames, ingredient symbols, Golden Twist skins, and glass masks.
- Begin compression and seek tests with early approved heroes instead of waiting for all footage.

### Day 5 — Select, repair, normalize

- Select hero and transition takes.
- Correct seams, glass errors where repairable, color, grain, and black levels.
- Export landscape web tests and manually compose portrait posters.

### Day 6 — Integration support

- Test 16:9 cover crops, first/last poster swaps, scroll reversal, decoder lifecycle, and reduced motion on real devices.
- Regenerate only failed priority assets; downgrade failed optional transitions to code fallbacks.

### Day 7 — Polish and archive

- Final compression, provenance manifest, alt-text review, and source archive.
- Remove unused heavy variants from the shipping set while retaining production sources.

## Review gates

### Gate 1 — before Magnific spend

- All ten glass shapes, garnishes, palettes, and safe zones approved.
- Boundary frames approved at desktop and center-cropped mobile widths.

### Gate 2 — after first hero batch

- At least eight of ten heroes pass topology and motion tests.
- Dirty Martini feels provocative, nocturnal, cloudy, tactile, and sophisticated.
- No hero resembles a sterile luxury ad.

### Gate 3 — before final export

- Ten mandatory heroes approved.
- At least three and no more than four transition videos approved.
- Every rejected transition has a complete code-driven fallback.
- Poster swaps show no obvious composition jump.

## Biggest technical risk

The largest technical risk is **smooth, reversible scroll-scrubbing across ten separately loaded videos on mobile**. Rapid seeking can stall, reveal long-GOP compression, desynchronize overlays, exhaust decoder slots, or cause visible jumps between posters and video.

Mitigations:

- Keep each hero short and independently lazy-loadable.
- Allow at most the current and next hero to remain decoded.
- Tune keyframe spacing for seeking on real mid-range devices.
- Never place history or recipe comprehension inside exact video frames.
- Use exact boundary-frame posters before and after playback.
- Disable WebGL before reducing content when device capability is low.
- Provide complete poster-based reduced-motion and failure states.

## Biggest production risk

The largest production risk is **visual inconsistency and correction time across fourteen generated clips**. Ten glasses create many chances for wrong rims, changing stems, extra garnish, drifting olives/beans, inconsistent print texture, and mismatched start/end frames. A few bad clips could consume the entire week in regeneration.

Mitigations:

- Approve all boundary frames before video generation.
- Use one prompt contract and shared negative constraints.
- Batch review by defect type, not cocktail.
- Cap ordinary iterations and prioritize H03, H07, H10, then T02/T03.
- Reject structural glass errors early rather than hiding them under effects.
- Keep static layers capable of carrying a chapter if a clip needs late replacement.

## Simplification order if time slips

Simplify in this order:

1. **Replace T04 French 75 → Mai Tai with its code-driven bubble-to-ice fallback**, leaving three major transition videos.
2. **Remove optional WebGL entirely** and use GSAP masks, transparent sprites, and CSS blend modes.
3. **Reduce environments to backplate + one foreground plane** while preserving hero, poster, history, and recipe content.
4. **Use the shared history ephemera frames with palette changes** instead of custom object drawings for every chapter.
5. **Reduce ambient particles and secondary hero overlays.**
6. **Drop optional audio and any separate mobile motion variants.**

Do not simplify by removing a cocktail, replacing Dirty Martini, omitting a required five-beat chapter, cutting one of the ten hero videos, baking text into footage, or sacrificing the reduced-motion fallback.
