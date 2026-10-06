# THE SIP — ScrollWorld

## Live Website

Live URL: PENDING DEPLOYMENT

## Concept

THE SIP is an immersive scroll-driven journey through classic cocktails where every drink opens another surreal world.

The visitor moves through one continuous Magnific master film while the page maps scroll position to cinematic time. The result is neither a recipe catalogue nor eight separate pages: it is one reversible visual descent with optional history and recipe details.

## Purpose

The project explores how scrolling can become an editorial and cinematic control. It introduces classic cocktails, their stories, and their preparation while keeping generated visual storytelling at the center of the experience.

**Core message:** Every drink opens another world.

## Experience

Portal  
→ Negroni — Temptation  
→ Dirty Martini — Provocation  
→ Margarita — Desire  
→ Mai Tai — Excess  
→ Manhattan — Power  
→ Espresso Martini — Obsession  
→ Old Fashioned — Authority  
→ French 75 — Spark  
→ final portal  
→ black ending / return

The opening explicitly asks the visitor to scroll. A persistent THE SIP navigation bar can return to the portal, open an eight-entry Journey index, or show the concise About panel.

At each cocktail hero moment, a contextual HUD displays the cocktail label plus closed History and Recipe controls. Information opens only when requested, one panel at a time. At the end, the final portal fades to black before the closing message and ENTER AGAIN control appear.

## Visual Direction

The visual language is surreal, psychedelic, retro-futuristic, cinematic, expressive, and maximalist. Highly saturated cocktail worlds contrast with a compact charcoal and vivid-magenta interface. Glass, liquid, chrome, crystal, fruit, mist, and portal light create continuity across otherwise distinct worlds.

The approved Magnific footage is the visual source of truth. The website does not recolor, filter, regenerate, or create fake scenery around the video.

## Interaction

ScrollTrigger converts page progress into a target time in one persistent 81-second video. A requestAnimationFrame controller interpolates toward that target and updates `video.currentTime`. Scrolling down moves forward; scrolling up moves through the same footage and HUD sequence in reverse.

The page uses 38 viewport heights. The video reaches its final frame at 94% of the scroll runway; the final 6% holds that frame while a page-level black layer fades in.

Journey entries move to the configured hero peaks without reloading the page, swapping the source, or restarting the player.

## Technology

- React 18
- Vite 5
- GSAP 3 and ScrollTrigger
- Semantic HTML and responsive CSS
- Magnific
- Seedance 2.5
- ffmpeg and ffprobe media workflow
- H.264 MP4 delivery

## Video Pipeline

The approved visual master is `assets/video/cocktail-world-master-v2.mp4`. The browser uses `assets/video/cocktail-world-master-v2-scroll.mp4`.

Both files are 81.000 seconds, 1920×1080, 24 fps, H.264. The scroll encode contains a keyframe every 12 frames (0.5 seconds), making repeated forward and reverse browser seeking substantially more responsive than the irregular-GOP master.

The portal intro and approved Mai Tai woman/laser replacement were assembled into a new master without overwriting source clips. More detail is available in [the Magnific workflow](docs/magnific-workflow.md).

## Accessibility

- All controls are semantic buttons.
- Keyboard focus is visibly styled.
- `aria-expanded` and `aria-controls` communicate disclosure state.
- Escape closes Journey, About, History, and Recipe.
- History and Recipe never depend on hover.
- Mobile layouts avoid horizontal overflow.
- `prefers-reduced-motion: reduce` removes looping decorative movement and simplifies transitions while preserving navigation and content access.

## Research and Planning

- [Interaction research](docs/research.md)
- [Final project plan](docs/project-plan.md)
- [Magnific production workflow](docs/magnific-workflow.md)
- [AI-assisted production workflow](docs/ai-workflow.md)
- [Submission audit](docs/submission-audit.md)

The root-level concept, storyboard, art-direction, asset-plan, and original technical-plan files are retained as historical pre-production artifacts. The documents above describe the final eight-cocktail implementation.

## Run Locally

Requirements: Node.js and npm.

```bash
npm install
npm run dev
```

Vite prints the local development URL in the terminal.

## Production Build

```bash
npm run build
npm run preview
```

The preview command serves the built `dist/` output. `dist/` and `node_modules/` are intentionally excluded from Git.

## Credits / Tools

- Visual generation and extension: Magnific with Seedance 2.5
- Frontend: React, Vite, GSAP, and ScrollTrigger
- Media inspection and encoding: ffmpeg and ffprobe
- AI-assisted coding, integration, testing, and documentation: Codex
- Creative direction, clip selection, approvals, interaction decisions, and final quality control: the student
- Method reference: [oso95/scroll-world](https://github.com/oso95/scroll-world/tree/main)

Third-party tools and reference projects remain the property of their respective creators. No reference-site assets, branding, or code are included in this project.
