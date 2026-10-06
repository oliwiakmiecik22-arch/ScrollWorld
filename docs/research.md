# THE SIP — Interaction Research

Research checked on 6 October 2026. These references informed principles and interaction choices only. THE SIP does not reuse their code, assets, branding, layouts, characters, or scene designs.

## Primary reference: Scroll World

URL: [oso95/scroll-world](https://github.com/oso95/scroll-world/tree/main)

- **What it does:** Defines a workflow for building one continuous, scroll-scrubbed flight through generated worlds.
- **Scroll approach:** Maps scroll progress to the time of a continuous video journey. Its production guidance emphasizes matching neighboring boundary frames and joining scenes with connector clips.
- **Visual storytelling:** Treats each scene as part of one camera path rather than a stack of unrelated pages.
- **Useful for THE SIP:** The central ideas of a persistent video, reversible time mapping, a config-driven chapter map, and visually connected transitions.
- **Not copied:** THE SIP does not use the reference’s generated assets, default art direction, templates, portable scrub engine, prompt library, or Higgsfield/Monid pipeline. The final implementation uses its own React/GSAP controller and approved Magnific footage.

## Additional reference 1: Lil Frog

URL: [lilfrogeth.com](https://lilfrogeth.com/)

- **What it does:** Presents a dense, character-led illustrated world with playful navigation and discoveries distributed through the page.
- **Scroll / interaction approach:** Repetition, layered imagery, energetic hover feedback, and unconventional navigation make exploration feel tactile.
- **Visual storytelling:** A strong fictional identity is maintained through illustration, typography, humor, and motion.
- **Useful for THE SIP:** Confidence in expressive type, rounded controls, small hover movement, and a playful interaction voice.
- **Not copied:** No characters, token branding, copy, page sections, illustrations, or layout structures were reused.

## Additional reference 2: Hadaka

URL: [hadaka.jp](https://hadaka.jp/)

- **What it does:** Introduces a creative studio through bold symbols, expressive typography, and motion-led brand presentation.
- **Scroll / interaction approach:** Content reveals and strong graphic changes create rhythm while the page remains understandable.
- **Visual storytelling:** A small set of identity elements is repeated with high visual confidence.
- **Useful for THE SIP:** The value of a compact, memorable identity layer that can sit over richer imagery without becoming corporate.
- **Not copied:** No Hadaka logos, imagery, Japanese copy, compositions, or animation choreography were reused.

## Additional reference 3: Colonia Zacamil

URL: [coloniazacamil.com](https://coloniazacamil.com/)

- **What it does:** Lets visitors explore an interactive representation of Zacamil through spatial movement, pins, and discoverable stories.
- **Scroll / interaction approach:** Scroll zoom, drag, swipe, and selectable locations turn navigation into part of the narrative.
- **Visual storytelling:** Place-based material is organized as one explorable world rather than separate conventional pages.
- **Useful for THE SIP:** The Journey menu’s direct access to moments within one continuous world and clear instructions for an unfamiliar interaction.
- **Not copied:** No maps, neighborhood content, pins, imagery, audio treatment, layouts, or code were reused.

## Additional reference 4: Snow Fall — The Avalanche at Tunnel Creek

URLs: [original project](https://www.nytimes.com/projects/2012/snow-fall/) and [OpenNews production interview](https://source.opennews.org/articles/how-we-made-snow-fall/)

- **What it does:** Combines a long-form reported story with video, photography, graphics, and animated spatial explanation.
- **Scroll / interaction approach:** Scroll controls the pace of selected visual sequences while prose and media remain part of a single narrative.
- **Visual storytelling:** Moving imagery appears where it adds information or atmosphere, with pacing shaped around the story rather than spectacle alone.
- **Useful for THE SIP:** Scroll as editorial control, careful pacing, restraint, device-aware simplification, and the principle that motion should support rather than interrupt the journey.
- **Not copied:** No reporting, imagery, maps, typography, article structure, or New York Times interface was reused.

## Research synthesis

THE SIP combines four lessons:

1. Use one continuous, reversible timeline rather than eight separate pages.
2. Make the required gesture explicit at the opening, then let interface elements recede.
3. Give navigation a distinct personality without obscuring the visual story.
4. Treat motion as editing: every reveal, hold, transition, and information panel must protect pacing and readability.

The implementation remains original: an eight-cocktail Magnific journey, a dark-charcoal and magenta capsule interface, click-open history and recipe controls, and a portal-to-black conclusion.
