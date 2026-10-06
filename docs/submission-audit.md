# THE SIP — Submission Audit

Audit date: 6 October 2026.

## Local production QA

| Area | Verification evidence | Status |
|---|---|---|
| Opening copy | Production DOM and screenshot show headline, supporting line, and SCROLL TO ENTER | PASS |
| Opening fade | First page-scroll sample: indicator opacity `0`, copy opacity `0.5595`, video time `2.218 s` | PASS |
| Opening return | Reverse scroll restored both opacities to `1` and video time to `0` | PASS |
| Persistent video | Exactly one video element throughout all eight Journey jumps | PASS |
| Scroll source | Browser current source resolves to the hashed `cocktail-world-master-v2-scroll` build asset | PASS |
| Media behavior | Duration `81`, readyState `4`, muted, controls off, loop off, transform none, filter none | PASS |
| Forward/reverse | Video time moved `69.000 → 57.912 → 69.000` with Espresso Martini shown in reverse | PASS |
| Cocktail order | All eight Journey entries landed within one second of the configured hero peak and showed the matching HUD | PASS |
| Navigation | THE SIP returned to scroll `0`; Journey and About expanded in place | PASS |
| History / Recipe | Closed by default; click-open; second click closes; exclusive swap verified | PASS |
| Chapter reset | Open History panel closed automatically when reverse scroll changed chapter | PASS |
| Escape | Closed About, Journey, History, and Recipe | PASS |
| Keyboard focus | Keyboard-focused Journey button showed a 2 px visible outline with 4 px offset | PASS |
| Ending | Final video time `80.958333`; partial black opacity `0.570938`; full black/content opacity `1` | PASS |
| Enter Again | Returned to scroll `0`, restored opening instruction, and returned video to its opening frame | PASS |
| Mobile | 390×844 viewport; eight-entry Journey; History panel usable; `scrollWidth === clientWidth` | PASS |
| Assets | Logo natural width `1014`; no broken images; video ready; no media error | PASS |
| Console | Zero production warnings and zero production errors | PASS |
| Reduced motion | Active CSS media rule removes looping/long UI motion; JS uses `matchMedia` to disable smooth jumps; no essential controls are hidden | PASS (code-path audit) |
| Production build | Vite build completed successfully, 38 modules transformed | PASS |

The connected browser does not expose a reduced-motion emulation capability, so that row is verified from the production CSSOM and implementation path rather than an emulated operating-system preference.

## Assignment requirement matrix

| Assignment requirement | Evidence | Status |
|---|---|---|
| Reference repo studied | `docs/research.md` documents `oso95/scroll-world` and its connected-frame method | PASS |
| Four additional references | Lil Frog, Hadaka, Colonia Zacamil, and Snow Fall documented with real URLs | PASS |
| Subject + purpose | `docs/project-plan.md` | PASS |
| Audience | `docs/project-plan.md` | PASS |
| Core message | “Every drink opens another world” in plan, README, and opening | PASS |
| Matching visual direction | Actual palette, lighting, materials, typography, camera, and mood documented | PASS |
| Technical plan | Actual React/Vite/GSAP/media controller documented | PASS |
| Media loading | Persistent preload-auto video strategy documented and browser-verified | PASS |
| Transition approach | Connected scenes and chapter timing documented | PASS |
| Reduced motion | CSS and JS fallback present without removing controls | PASS |
| Target resolution | Container audit confirms 1920×1080 | PASS |
| Magnific adaptation | `docs/magnific-workflow.md` distinguishes the project workflow from the reference | PASS |
| Connected-frame approach | Scene A → connector → Scene B documented with actual examples | PASS |
| Seedance workflow | Seedance 2.5 role documented without unsupported MCP claims | PASS |
| ffmpeg / ffprobe workflow | Assembly, checks, and scroll encoding documented | PASS |
| Scroll controls timeline | ScrollTrigger → target time → rAF → currentTime | PASS |
| Forward and backward playback | Browser times and reverse HUD update verified | PASS |
| At least four scenes | Portal, eight cocktails, and ending | PASS |
| At least three transitions | Nine narrative handoffs in the fixed route | PASS |
| Coherent connected journey | One persistent 81-second master and fixed order | PASS |
| No obvious blank frames/flashes/pops | Accepted master plus sampled production journey and ready video state | PASS |
| Readable text outside video | React/CSS opening, navigation, HUD, panels, and ending | PASS |
| Scrolling communicated | SCROLL TO ENTER visible and animated at start | PASS |
| Clear identity | THE SIP navbar, logo, title, palette, and About copy | PASS |
| Clear ending / CTA | Portal hold → black → message → ENTER AGAIN | PASS |
| Not a reference reskin | Original cocktail concept, footage, UI assets, data, and implementation | PASS |
| Meaningful local Git history | Existing history retained; final logical commits required next | PENDING |
| Latest code pushed | No Git remote is configured and GitHub token is invalid | BLOCKED |
| README complete | Complete except live URL, intentionally marked pending | PARTIAL |
| Live public website | No existing deployment link/configuration found | BLOCKED |
| Live URL in README | Awaiting successful deployment | BLOCKED |
| AI workflow | `docs/ai-workflow.md` defines Magnific, Codex, and human roles | PASS |
| Human decisions clear | Creative direction, selection, approvals, and QC explicitly attributed | PASS |

## Media integrity

| File | SHA-256 |
|---|---|
| `cocktail-world-master-v2.mp4` | `39bdb315b0cfa25babb49703083eb53ac4693c14791a496a888c9c1f139df50a` |
| `cocktail-world-master-v2-scroll.mp4` | `cc58091af7299131887b1769d44d22daaeb0983aa5260d4244af1052ac8176dd` |

## External blockers

1. `git remote -v` returns no configured remote.
2. `gh auth status` reports an invalid token for `oliwiakmiecik22-arch`.
3. No `.vercel/project.json` or prior deployment configuration exists locally.
4. The Vercel CLI is not installed or authenticated.

No push or deployment can be reported as successful until those external connections are restored and the public URL is tested.
