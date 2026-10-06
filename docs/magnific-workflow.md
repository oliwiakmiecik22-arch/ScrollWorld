# THE SIP — Magnific Production Workflow

## Adaptation of the Scroll World method

The assignment reference describes a connected-frame generation workflow: render a scene, use its boundary frame to condition the next connector or scene, and assemble the results into one scroll-scrubbable journey.

THE SIP adapted that principle to an existing Magnific production rather than copying the reference pipeline. Magnific and Seedance 2.5 were used for visual generation and extension. The project repository does not contain Magnific job logs or a verifiable Magnific MCP configuration, so this document does not claim that generation was automated through MCP. Creative selection and approvals happened outside the codebase; the approved rendered files were then inspected and integrated locally.

## Connected-scene model

The production model was:

```text
Scene A
→ inspect its final usable frame
→ create or select a visually matching connector/extension
→ inspect the first usable frame of Scene B
→ assemble at the strongest shared visual boundary
```

Where first/end-frame conditioning was available during generation or extension, boundary frames acted as continuity anchors. At assembly time, adjacent ending and beginning frames were inspected again rather than assuming that matching prompts guaranteed a clean seam.

## Visual continuity checks

Each approved segment was evaluated for:

- 16:9 framing and 1920×1080 delivery;
- stable cocktail scale and center-safe composition;
- direction of camera travel;
- portal, light, color, and material continuity;
- duplicate hero appearances;
- unwanted black or damaged frames;
- a usable first frame and last frame for the neighboring cut;
- correct cocktail order.

The Magnific imagery remained the visual source of truth. Code adds interface overlays only; it does not regenerate, recolor, filter, or fabricate scenery around the footage.

## Actual example: Mai Tai / woman sequence → Manhattan

The original master contained a Mai Tai action segment that no longer matched the approved narrative. `SHOOTINGwoman.mov` was approved as its replacement.

The replacement was not appended. The old Mai Tai action was removed from the master, the replacement sequence was inserted between Margarita/Mai Tai and Manhattan, and the boundaries were checked so that:

1. Mai Tai appears once.
2. The woman appears behind the Mai Tai.
3. The laser removes the drink.
4. The drink does not return.
5. The woman exits.
6. Manhattan follows directly.

This is the same connected-frame principle applied editorially: the outgoing Mai Tai context, the replacement clip’s opening and closing frames, and Manhattan’s first frames were treated as a three-part continuity problem.

## Portal intro → Negroni

`portal_opening.mov` became the beginning of the approved v2 master. Its exit frames were compared with the original master’s Negroni approach, then the portal clip was prepended without changing its creative appearance. The website now begins at the video’s real opening frame; it does not recreate the portal in CSS.

## Local inspection and assembly

The local media workflow used ffprobe/ffmpeg when they were available during assembly:

1. Inspect duration, resolution, frame rate, codec, and audio streams.
2. Inspect candidate cut frames around the outgoing scene, replacement, and incoming scene.
3. Normalize incompatible technical properties without stretching the image.
4. Assemble a new master while preserving every original file.
5. Verify duration, scene order, absence of duplicates, and final playback.
6. Create a separate scroll-optimized encode rather than overwriting the approved master.

Approved originals retained in the repository include:

- `assets/video/cocktail-world-master-v2.mp4`
- `assets/video/cocktail-world-master-v2-scroll.mp4`
- `assets/video/cocktail-world-master.mp4`
- `assets/video/portal_opening.mov`
- `assets/video/SHOOTINGwoman.mov`

## Measured final media

The final audit read the MP4 container directly because ffprobe is not currently installed in the final shell environment.

| Property | v2 master | v2 scroll encode |
|---|---:|---:|
| Duration | 81.000 s | 81.000 s |
| Resolution | 1920 × 1080 | 1920 × 1080 |
| Frame rate | 24 fps | 24 fps |
| Codec | H.264 (`avc1`) | H.264 (`avc1`) |
| Frames | 1,944 | 1,944 |
| Keyframes | 12 | 162 |

The scroll encode uses a 12-frame GOP: one keyframe every 0.5 seconds. It also uses browser-compatible H.264 delivery, fast-start placement, and the approved 16:9 image. Audio was unnecessary for the muted ScrollWorld experience.

## Quality-control boundary

Generation and code had separate responsibilities:

- Magnific/Seedance created and extended the cinematic worlds.
- Local media tools made technical properties compatible and assembled approved edits.
- React, GSAP, and CSS mapped scroll and interaction onto the finished film.

No code-side effect attempts to hide an unsuccessful visual seam. If a visual transition were unacceptable, the correct fix would be a newly approved clip or cut—not fake scenery or a video filter.
