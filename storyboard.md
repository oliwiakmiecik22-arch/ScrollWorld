# Your Cocktail Guide — Modular Scroll Storyboard

## Continuous route

**INTRO → NEGRONI → DAIQUIRI → AVIATION → ESPRESSO MARTINI → MARGARITA → OLD FASHIONED → DIRTY MARTINI → COSMOPOLITAN → FRENCH 75 → MAI TAI → OUTRO**

The scroll behaves like one camera path through connected theatrical sets. Every cocktail repeats five beats—reveal, hero, history, recipe, transition—without announcing those labels to the visitor.

For a one-week v1, target approximately **4–5 viewport heights per cocktail**, plus shorter intro and outro sections. That creates a 48–58 viewport-height journey: substantial, but less exhausting than giving all ten cocktails the longer pacing of the original four-chapter plan.

## Reusable chapter timing

| Beat | Share of chapter scroll | Function | Default production lane |
|---|---:|---|---|
| Reveal | 15% | Emotional omen and title approach | HTML/CSS + GSAP |
| Hero | 25% | Scrub one 4–6 second Magnific video | Magnific video + GSAP playback |
| History | 18% | Stable illustration and short origin copy | HTML/CSS + GSAP |
| Recipe | 27% | Ingredients and method assemble | HTML/CSS + GSAP, optional shared WebGL |
| Transition | 15% | Golden Twist carries one material forward | Code by default; Magnific only four times |

Text appears only during visual plateaus. Hero video never contains typography. Scroll reversal should remain plausible: labels retreat, particles return, and transition paths rewind without exposing a narrative contradiction.

## Global production language

- **Magnific hero video:** the glass, liquid, garnish, condensation, reflections, and controlled atmospheric motion.
- **HTML/CSS/GSAP:** titles, history, recipe, layered parallax, masks, Golden Twist paths, ordinary transitions, and all reduced-motion states.
- **WebGL / Three.js:** one optional shared canvas for refraction, particle migration, and liquid/color displacement. No cocktail gets a bespoke 3D world.
- **Magnific transition video:** only four signature transformations, separate from the ten hero clips.

## 00 — Intro: The Invitation

Closed velvet hangs in near-black plum. A point of amber light stretches into The Golden Twist and traces the headline in two tempos:

> Discover
> Your Desire

The ribbon slips between the curtains. Condensation reveals an invisible pane; a circular wipe through one droplet opens into the red glow of the Negroni salon.

**Build:** HTML/CSS masks, SVG path animation, GSAP parallax. No generated video and no WebGL required.

---

## 01 — Negroni: Temptation

**Emotional theme:** Poised temptation; the attraction of something that bites back.

**Dominant colors:** Campari ruby, oxblood, orange flare, ink black.

**Atmosphere:** A Florentine after-hours salon imagined in an underground comic: velvet arches, checkerboard shadow, tiny mirrors, controlled heat.

**Glass type:** Heavy old fashioned / rocks glass with one large clear ice block.

**Garnish:** Orange half-slice or expressive peel.

### Reveal

The intro droplet stains red. An orange disc rises behind it like a forbidden sun; the outline of a rocks glass resolves from displaced background lines.

### Hero visual idea

The glass sits on black velvet while its shadow leans toward the viewer. Ruby liquid appears deeper than the physical glass, as though the salon continues inside it.

### Magnific hero video — H01

**4–6 seconds, 16:9:** Slow push toward the centered rocks glass. Condensation beads merge, the large ice block turns a few degrees, ruby reflections breathe, and an orange peel makes one controlled curl around the rim. Start and end on almost identical frontal compositions; no pouring and no camera orbit.

### History storytelling idea

A café receipt, a tiny Florence façade, and “1919?” appear as pasted ephemera. Copy presents the Camillo Negroni / Caffè Casoni account as the best-known legend and explicitly leaves room for dispute.

### Recipe presentation idea

Three equal red circles lock around the ice: gin, bitter aperitif, sweet red vermouth. A bar spoon becomes a clock hand and turns once. Orange lands last.

### Transition into Daiquiri — T01, major Magnific transition

The orange peel pulls the oxblood room sideways. The clear ice block expands to fill frame; ruby drains from its fractures. We travel through the ice and emerge in mineral-white sunlight as the crystalline edge becomes a coupe stem.

### Production split

- **Magnific video:** H01 hero and T01 Negroni → Daiquiri transition.
- **HTML/CSS/GSAP:** red reveal, title refraction duplicate, history ephemera, equal-parts recipe orbit.
- **WebGL / Three.js:** optional subtle refraction behind the ice; not necessary for T01 because the video carries the transformation.

---

## 02 — Daiquiri: Escape

**Emotional theme:** Escape; clarity, release, and the first clean breath outside.

**Dominant colors:** Mineral white, pale silver-green, lime skin, solar yellow.

**Atmosphere:** A Cuban coastal mirage—chalk architecture, chrome palms, white heat, sharp horizon. Avoid generic tiki imagery.

**Glass type:** Chilled coupe or small cocktail glass.

**Garnish:** No garnish in the baseline recipe; a lime peel exists in the world rather than on the glass.

### Reveal

T01 resolves on the coupe stem. A translucent illustrated wave freezes above the bowl and falls into it without splash.

### Hero visual idea

The nearly colorless drink stays perfectly still while the entire horizon tilts behind it. Frost catches a cool green edge; light appears to pass through the coupe into another climate.

### Magnific hero video — H02

**4–6 seconds, 16:9:** Locked center composition. Frost gently blooms on the coupe, lime mist crosses behind, the background horizon rolls by only a few degrees, and a bright highlight travels once along the rim. First and last frames return to a level horizon and stable glass.

### History storytelling idea

The horizon flattens into a hand-drawn map of southeastern Cuba. A marker lands at Daiquirí near Santiago; an engineering ledger passes behind. Copy credits the familiar Jennings Cox account while acknowledging older Caribbean combinations of rum, citrus, and sugar.

### Recipe presentation idea

Rum is a clear tide, lime a sharp green crescent, sugar a field of sparkling grains. They enter one reusable shaker outline; the world snaps twice, then the drink strains as a single white line.

### Transition into Aviation — code-driven

The green horizon curls upward into The Golden Twist, hooks a lime moon, and drags it through the sky. The trail becomes a pale contrail while the background grades from solar white to violet dusk.

### Production split

- **Magnific video:** H02 hero only.
- **HTML/CSS/GSAP:** wave reveal, map, shaker beat, palette crossfade, lime-to-contrail SVG morph.
- **WebGL / Three.js:** optional shared refractive portal inside the lime moon; fall back to a masked scale transition.

---

## 03 — Aviation: Reverie

**Emotional theme:** Reverie; romance, imagination, and beautiful suspension.

**Dominant colors:** Violette, dusk blue, cloud silver, cherry pink.

**Atmosphere:** An impossible twilight above paper clouds, like a 1910s travel poster contaminated by psychedelic ink.

**Glass type:** Fine-stemmed cocktail glass or coupe.

**Garnish:** Optional maraschino cherry.

### Reveal

Cloud layers peel apart like stage scenery. A pale lavender glass floats forward as a cherry rises from below and pauses just above the liquid.

### Hero visual idea

The cocktail behaves like an observatory: a violet halo projects through the bowl onto the cloud floor, while The Golden Twist draws one impossible orbit behind it.

### Magnific hero video — H03

**4–6 seconds, 16:9:** Slow lateral drift around a centered glass without changing its silhouette. Clouds move at two depths, the halo brightens, the cherry descends into the drink, and a silver contrail draws half an orbit. End on a stable hero pose with the cherry settled.

### History storytelling idea

The contrail sketches an abstract book cover. “HUGO ENSSLIN / NEW YORK / 1916” stamps into the cloud, and recipe lines become tiny flight paths. The copy identifies the first published recipe and its crème de violette.

### Recipe presentation idea

Four constellations illuminate: gin, maraschino, lemon, violette. Their lines collapse into a shaker-shaped star map and scatter like cracked ice.

### Transition into Espresso Martini — T02, major Magnific transition and primary wow moment

The contrail tightens around the glass and rotates the violet sky like a record. Clouds funnel into the bowl. The cherry becomes a dark eclipse; its halo browns into crema. Three stars fall and land as coffee beans with physical dimples.

### Production split

- **Magnific video:** H03 hero and T02 Aviation → Espresso Martini transition.
- **HTML/CSS/GSAP:** cloud-stage reveal, stamped history, constellation recipe.
- **WebGL / Three.js:** shared particle field can extend stars beyond the video boundary, but the signature eclipse occurs in T02.

---

## 04 — Espresso Martini: Obsession

**Emotional theme:** Obsession; momentum, glamour, and the refusal to let the night end.

**Dominant colors:** Coffee black, crema bronze, cobalt, wet chrome.

**Atmosphere:** A midnight city through rain-streaked glass—lacquer, smeared marquees, pulse-lit windows.

**Glass type:** V-shaped martini or cocktail glass.

**Garnish:** Three coffee beans.

### Reveal

The camera pulls back from the crema surface left by T02. Three beans form an ellipsis; a pulse travels through the stem and wakes the city.

### Hero visual idea

The drink is a black mirror holding a second city. Steam takes the shape of The Golden Twist while hard cobalt reflections cross the glass.

### Magnific hero video — H04

**4–6 seconds, 16:9:** Locked low-angle hero. Crema slowly blooms and tightens, steam rises in one helix, the beans barely shift with surface tension, and wet city light slides across the bowl. The glass never rotates; first and last frames are calm, centered black mirrors.

### History storytelling idea

A wet window becomes an abstract 1980s London map. A bar ticket stamped “VODKA ESPRESSO” receives an “ESPRESSO MARTINI” overprint. Copy credits Dick Bradsell without presenting the customer legend as fact.

### Recipe presentation idea

Vodka flashes silver, coffee liqueur pools bronze, syrup draws a glossy line, and espresso releases a cloud. The shaker pulses three times; foam blooms after the strain.

### Transition into Margarita — code-driven

The three beans roll outward and become dark stones on a white salt plain. Crema foam bleaches to salt crystals; a cobalt city streak widens into a turquoise desert sky. The Golden Twist escapes the steam and becomes an agave blade.

### Production split

- **Magnific video:** H04 hero only.
- **HTML/CSS/GSAP:** ticket history, ingredient pour symbols, crema-to-salt masked takeover, city-to-desert parallax.
- **WebGL / Three.js:** reusable particle migration converts crema specks to salt; CSS fallback uses sprite layers.

---

## 05 — Margarita: Freedom

**Emotional theme:** Freedom; open air, bright edges, and refusal to be contained.

**Dominant colors:** Agave green, turquoise, salt white, acid yellow.

**Atmosphere:** A surreal high desert after rain: agave silhouettes, mirrored salt flats, an enormous lime sun, moving heat lines.

**Glass type:** Coupette / Margarita glass, kept elegant rather than novelty-sized.

**Garnish:** Optional half salt rim; lime wheel or wedge as the visual cue.

### Reveal

Salt crystals trace half a rim in close-up. The camera pulls back through illustrated heat haze to reveal the glass standing alone on a reflective plain.

### Hero visual idea

The glass becomes a gateway: the turquoise horizon continues through the liquid but breaks at the salted edge. A lime sun sits precisely behind the bowl.

### Magnific hero video — H05

**4–6 seconds, 16:9:** Slow push through heat haze. Salt crystals sparkle irregularly, a lime wheel turns a fraction, condensation creeps down the stem, and the desert reflection ripples once. Stable symmetric glass at both boundaries; no fast flare or handheld motion.

### History storytelling idea

Several illustrated matchbooks slide in from different border towns, each claiming “the first.” They overlap until the names become a maze. Copy makes disputed authorship the point and connects the drink to the older Daisy family.

### Recipe presentation idea

Tequila arrives as an agave spear, triple sec as an orange ring, lime as a green cut, and salt as a half-moon. The ingredients cross once inside a reusable shaker outline.

### Transition into Old Fashioned — code-driven

The salt flat darkens to polished wood. White crystals gather, amber, and compress into a sugar cube. The lime sun warms to an ember-orange disc; the Margarita stem retracts into the shadow of a rocks glass.

### Production split

- **Magnific video:** H05 hero only.
- **HTML/CSS/GSAP:** salt-rim reveal, claimant matchbooks, recipe symbols, stem/rocks-glass silhouette swap.
- **WebGL / Three.js:** shared particle system gathers salt into the sugar cube; fallback is a masked sprite sequence.

---

## 06 — Old Fashioned: Authority

**Emotional theme:** Authority; restraint, patience, and weight without performance.

**Dominant colors:** Whiskey amber, tobacco brown, ember orange, cut-crystal white.

**Atmosphere:** A private wood-panelled chamber enlarged to mythic scale—clockwork shadows, leather grain, one hard pool of light.

**Glass type:** Heavy old fashioned / rocks glass with a large ice cube.

**Garnish:** Orange zest or slice; optional cocktail cherry.

### Reveal

The sugar cube from the transition receives three dark bitters marks. Each spreads like ink. A low amber wall rises around it and resolves into the glass.

### Hero visual idea

The ice is a monumental cut-crystal throne inside amber liquid. The Golden Twist becomes an orange peel clock spring, implying that this drink controls time.

### Magnific hero video — H06

**4–6 seconds, 16:9:** Very slow dolly toward the heavy glass. The ice turns slightly, amber caustics crawl across the wood, bitters form faint internal rings, and the orange peel relaxes by a few millimeters. Stable, weighty framing; almost no particles.

### History storytelling idea

An 1806 newspaper-like strip defines “cocktail” through four symbols—spirit, sugar, water, bitters. Later decorative flourishes are crossed out, revealing the demand for an “old-fashioned” build. Avoid the Pendennis Club myth as settled fact.

### Recipe presentation idea

A sugar cube occupies center stage. Bitters dot it, water dissolves it, whiskey forms an amber wall, and ice locks the composition. Each action uses the same four-slot recipe choreography as other chapters.

### Transition into Dirty Martini — code-driven

The orange clock spring straightens into a polished cocktail pick. Amber drains to darkness. The clear ice cube stretches into a chrome vertical panel; behind it, an olive-green moon appears. The rocks-glass rim thins into a martini V.

### Production split

- **Magnific video:** H06 hero only.
- **HTML/CSS/GSAP:** bitters reveal, history strip, four-step recipe, peel-to-pick path morph, palette drain.
- **WebGL / Three.js:** optional refractive glass-silhouette morph; default version uses two matched transparent layers and a chrome wipe.

---

## 07 — Dirty Martini: Provocation

**Emotional theme:** Provocation with indulgence; sophisticated, salty, intimate, slightly forbidden.

**Dominant colors:** Olive green, cloudy silver, cold chrome, black velvet.

**Atmosphere:** A dim nocturnal bar reduced to a private booth. Black velvet absorbs the room; chrome catches narrow light; the cloudy drink seems to distort whatever watches it.

**Glass type:** Chilled V-shaped martini glass.

**Garnish:** One oversized green olive on a polished pick.

### Reveal

The chrome pick cuts a hairline through black velvet. The opening becomes the martini rim. A giant olive shadow crosses the wall before the actual garnish slides into the narrow light.

### Hero visual idea

The cloudy liquid behaves like frosted glass over a secret room. The oversized olive feels planetary but tactile—pitted skin, wet gloss, slight indentation from the pick. Condensation gathers heavily at the bowl’s base.

### Magnific hero video — H07

**4–6 seconds, 16:9:** Intimate macro-to-medium drift. Cloudy liquid makes one slow internal fold; the olive rotates a few degrees; condensation beads thicken and fall; a chrome reflection bends subtly as if the room exhaled. Black velvet remains deep, not glossy. Begin and end with the same centered silhouette and a stable olive.

### History storytelling idea

A clean Martini diagram receives one illicit green drop. It spreads beyond the linework and reveals fragments from early twentieth-century brine practice; “DIRTY” appears much later as a stamped nickname. Copy emphasizes evolution and uncertainty rather than a single inventor.

### Recipe presentation idea

Gin or vodka is a silver column, dry vermouth a narrow white blade, and olive brine a cloudy green drop. A cold thermometer-like line falls; the three meet in a mixing glass and strain through a chrome V.

### Transition into Cosmopolitan — T03, major Magnific transition

The giant olive eclipses the light, then its green surface develops a wet red reflection. The pit opens like a camera aperture. A flash passes through it; briny silver turns cranberry pink and the olive pick unfurls into a lemon twist above a Cosmopolitan glass.

### Production split

- **Magnific video:** H07 hero and T03 Dirty Martini → Cosmopolitan transition.
- **HTML/CSS/GSAP:** velvet cut reveal, evolving Martini diagram, recipe columns, chrome labels.
- **WebGL / Three.js:** optional restrained distortion behind the cloudy liquid; never use noisy full-screen fluid effects.

---

## 08 — Cosmopolitan: Glamour

**Emotional theme:** Glamour; the pleasure of being seen while controlling the performance.

**Dominant colors:** Cranberry pink, lacquer red, flash white, midnight blue.

**Atmosphere:** A surreal late-1980s downtown photo call: mirrored steps, lipstick-red geometry, flash bulbs blooming like flowers. Playful rather than celebrity-literal.

**Glass type:** Large cocktail / martini glass.

**Garnish:** Lemon twist.

### Reveal

T03 ends on a white flash. As it fades, the pink cocktail remains, apparently floating above mirrored stairs. Its shadow poses differently from the glass.

### Hero visual idea

The drink is a pink prism. Camera flashes refract through it into abstract petals; the lemon twist hovers like a drawn signature.

### Magnific hero video — H08

**4–6 seconds, 16:9:** Slow controlled pedestal move. Two soft flash blooms cross the background, pink refraction shifts within the glass, the lemon twist settles, and one condensation trail catches white light. Avoid rapid paparazzi strobing; first and last frames are evenly lit and centered.

### History storytelling idea

A neon Odeon-like doorway appears as an abstract wordless façade. A late-1980s bar ticket assembles citron vodka, orange liqueur, lime, and cranberry. Copy credits Toby Cecchini with the globally recognized formulation while noting the drink’s wider contested lineage.

### Recipe presentation idea

Four translucent color gels overlap to create the exact pink: clear spirit, orange, green lime, cranberry. They fold into a shaker silhouette, then snap into a clean glass profile.

### Transition into French 75 — code-driven

Flash bulbs linger as white circles, shrink, and begin to rise like bubbles. Cranberry pink drains to pale gold. The broad cocktail bowl narrows into a flute while the lemon twist straightens into The Golden Twist’s champagne thread.

### Production split

- **Magnific video:** H08 hero only.
- **HTML/CSS/GSAP:** flash reveal, history façade, overlapping recipe gels, glass-silhouette mask morph.
- **WebGL / Three.js:** shared particle migration changes flash discs into rising bubbles; CSS particle sprites are the fallback.

---

## 09 — French 75: Elegance

**Emotional theme:** Elegance; precision with an unexpectedly forceful finish.

**Dominant colors:** Champagne gold, ivory, pearl, deep ink blue.

**Atmosphere:** An Art Deco salon reduced to long lines, silk curtains, pearl lights, and one impossible vertical horizon.

**Glass type:** Champagne flute.

**Garnish:** A fine lemon twist for the visual system, even if omitted in the strict IBA baseline.

### Reveal

The bubbles from Cosmopolitan enter an empty flute from below. Gold liquid follows upward as if summoned by the bubble path. Pearl lights click on in sequence.

### Hero visual idea

The narrow flute is a tower. Bubbles rise into a gold ceiling and return as tiny comets; the surrounding room remains still and exact.

### Magnific hero video — H09

**4–6 seconds, 16:9:** Near-static centered flute. Fine bubble columns rise at varied speeds, a lemon thread turns slowly, silk reflections pass vertically, and the liquid emits one restrained gold pulse. Stable start/end lighting prevents a visible seek jump.

### History storytelling idea

An abstract “75” appears first as Deco numerals, then briefly as the outline rhythm of the French 75 mm field gun before dissolving into a cocktail recipe line. Copy describes the naming association and evolution rather than glorifying warfare or claiming one certain inventor.

### Recipe presentation idea

Gin, lemon, and syrup assemble in a small shaker diagram below the flute; Champagne enters from above as the fourth, vertical ingredient. This breaks the standard four-slot grid just enough to mirror the actual two-stage preparation.

### Transition into Mai Tai — T04, major Magnific transition

The flute’s bubbles multiply until they become a gold storm. The camera rises through them; pearl lights turn into tropical stars, the lemon thread becomes a lime peel, and the narrow flute opens into a crushed-ice landscape. Mint erupts from the horizon as champagne gold deepens to rum amber.

### Production split

- **Magnific video:** H09 hero and T04 French 75 → Mai Tai transition.
- **HTML/CSS/GSAP:** bubble reveal, historical “75,” two-stage recipe diagram.
- **WebGL / Three.js:** shared bubbles can bridge into T04, but the full salon-to-jungle transformation is video.

---

## 10 — Mai Tai: Excess / Adventure

**Emotional theme:** Excess as visual abundance; adventure, complexity, and an expansive final release.

**Dominant colors:** Rum amber, jungle green, orchid magenta, sunset coral.

**Atmosphere:** A maximal illustrated night garden growing from a bar top—mint becomes jungle canopy, crushed ice becomes mountains, lime shells become moons. Avoid carved-idol clichés and generic faux-Polynesian characters.

**Glass type:** Double old fashioned glass packed with crushed ice.

**Garnish:** Mint bouquet, lime peel or shell, and restrained pineapple spear.

### Reveal

T04 lands inside the crushed-ice mountains. The camera pulls back to show they live inside a rocks glass; mint unfurls overhead and throws enormous green shadows.

### Hero visual idea

The glass contains a whole unruly expedition. Rum gradients resemble sunset strata, orgeat forms pale currents, and a lime moon hangs behind the mint canopy.

### Magnific hero video — H10

**4–6 seconds, 16:9:** Slow pullback from crushed ice to the centered full glass. Mint breathes, condensation runs through amber reflections, the lime shell turns slightly, and orchid-colored night light moves behind. Preserve a readable rocks-glass silhouette and stable full-hero boundary frames.

### History storytelling idea

A 1944 Oakland bar check grows into an illustrated map whose routes point toward competing origin claims. The name appears as an exuberant handwritten exclamation, then settles into factual copy centered on Victor Bergeron’s formulation and the drink’s later distortions.

### Recipe presentation idea

The six ingredients become stacked strata rather than a crowded grid: two rums, orange curaçao, orgeat, lime, and syrup. The stack collapses into a shaker, then reappears among crushed ice with mint finishing the vertical composition.

### Transition into outro — code-driven

Mint shadows spread beyond the glass and flatten into velvet curtains. The Golden Twist escapes as lime peel, threads through all ten chapter colors, and draws a loose question mark. Ten glass silhouettes illuminate behind it like a cabinet of curiosities.

### Production split

- **Magnific video:** H10 hero only.
- **HTML/CSS/GSAP:** map/check history, stacked recipe strata, mint-shadow curtain wipe, ten-color recap.
- **WebGL / Three.js:** optional reusable depth particles among crushed ice; omit first if performance or schedule is tight.

---

## 11 — Outro: Choose Your Desire

Ten glasses appear only as expressive silhouettes at different depths, connected by one continuous Golden Twist. This is not a card grid. Each silhouette receives its emotional label as the ribbon touches it:

**Temptation / Escape / Reverie / Obsession / Freedom / Authority / Provocation / Glamour / Elegance / Adventure**

Primary copy: **“What does your night desire?”**

Two quiet actions remain:

- **Begin again** — returns to the intro.
- **Keep the recipes** — reveals a compact printable/plain-text summary later.

A legal-age and responsible-drinking note sits below the final stage.

**Build:** HTML/CSS + GSAP; optional low-cost WebGL dust only. No outro video.

## Transition allocation

### Four transitions that deserve Magnific

1. **T01 Negroni → Daiquiri:** ice-block traversal and ruby-to-mineral material change.
2. **T02 Aviation → Espresso Martini:** violet eclipse becomes crema; stars become beans. This remains the primary wow moment.
3. **T03 Dirty Martini → Cosmopolitan:** olive eclipse and briny silver becoming cranberry glamour.
4. **T04 French 75 → Mai Tai:** champagne bubble storm grows into crushed ice and mint jungle.

### Code-driven transitions

| Transition | Primary technique | Optional WebGL contribution |
|---|---|---|
| Intro → Negroni | SVG Golden Twist + circular mask + parallax | None |
| Daiquiri → Aviation | SVG lime-to-contrail morph + palette crossfade | Refractive lime portal |
| Espresso Martini → Margarita | Layer masks + crema/salt sprite migration | Shared particle field |
| Margarita → Old Fashioned | Salt-to-sugar gathering + glass silhouette swap | Shared particle field |
| Old Fashioned → Dirty Martini | Peel-to-pick path morph + chrome wipe | Refractive silhouette distortion |
| Cosmopolitan → French 75 | Flash-to-bubble particles + flute mask | Shared particle field |
| Mai Tai → Outro | Mint-shadow curtain wipe + ten-color ribbon | Optional ambient depth dust |

This makes seven non-video transitions in total: five between cocktail chapters, plus intro → Negroni and Mai Tai → outro.

## Narrow-screen behavior

- Preserve the central glass and Golden Twist; crop scenery first.
- Use the same 16:9 hero video with center-safe framing and intentional cover crop.
- Put history and recipe text above or below the glass, never over busy liquid.
- Reduce parallax to foreground, hero, and background planes.
- Replace optional WebGL with pre-rendered transparent layers when the device budget is low.
- Do not turn mobile into a recipe-card feed.

## Reduced-motion behavior

- Replace ten scrubbed heroes and four video transitions with approved poster frames.
- Use short opacity changes only; disable camera dives, shakes, rotation, and particle travel.
- Preserve every history, recipe, chapter anchor, and emotional label.
- Show one signature still from each of the four major transformations so the connections remain legible.

## Storyboard acceptance checks

- All ten chapters contain all five required beats.
- Each chapter explicitly identifies Magnific, HTML/CSS/GSAP, and WebGL responsibilities.
- No more than four chapter transitions depend on generated video.
- Every hero clip has a stable, centered first and last frame.
- No copy overlaps a high-motion interval.
- The ten desires remain distinguishable with video, audio, and WebGL disabled.
- Adding an eleventh cocktail requires content and assets, not a new interaction pattern.
