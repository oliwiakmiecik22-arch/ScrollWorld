> Historical pre-production artifact. The final eight-cocktail concept is documented in `docs/project-plan.md`.

# Your Cocktail Guide — Concept

## Core proposition

**Intro headline:** “Discover Your Desire”

**One-line concept:** A continuous descent through ten illustrated cocktail worlds, where each classic drink embodies a desire and teaches the viewer how to make it before The Golden Twist leads them into the next emotional state.

This is not a recipe catalogue dressed as an animation. It is a nocturnal personality journey with useful cocktail knowledge embedded inside it. The visitor should feel that the page is reading the mood they want: temptation, escape, reverie, obsession, freedom, authority, provocation, glamour, elegance, and excess.

## Audience and promise

The experience serves two overlapping audiences:

- Curious drinkers who want to discover a cocktail that matches how they want to feel.
- Bartenders and home bartenders who value a concise, credible recipe and a memorable origin story.

The emotional promise is **“find the drink your night is asking for.”** The practical promise is that every chapter leaves the viewer with a clear build: ingredients, proportions, technique, glass, and garnish.

## The ten desires

| Order | Cocktail | Emotional identity | Visual identity |
|---:|---|---|---|
| 1 | Negroni | **Temptation** — poised, bitter, dangerous | Ruby liquid, orange flare, oxblood velvet, heavy ice |
| 2 | Daiquiri | **Escape** — bright, clean, spontaneous | Mineral white, lime green, solar glare, weightless coupe |
| 3 | Aviation | **Reverie** — romantic, strange, suspended | Violet dusk, silver cloud, cherry-pink spark |
| 4 | Espresso Martini | **Obsession** — driven, nocturnal, restless | Coffee black, crema bronze, wet chrome, cobalt pulse |
| 5 | Margarita | **Freedom** — untamed, open, sun-struck | Agave green, salt white, turquoise, acid yellow |
| 6 | Old Fashioned | **Authority** — measured, grounded, commanding | Whiskey amber, tobacco brown, cut crystal, ember orange |
| 7 | Dirty Martini | **Provocation** — intimate, salty, slightly forbidden | Olive green, cloudy silver, chrome, black velvet |
| 8 | Cosmopolitan | **Glamour** — performative, playful, self-aware | Cranberry pink, lacquer red, flash white, midnight blue |
| 9 | French 75 | **Elegance** — effortless, precise, celebratory | Champagne gold, ivory, pearl, ink blue |
| 10 | Mai Tai | **Excess / Adventure** — lush, unruly, expansive | Rum amber, jungle green, orchid magenta, sunset coral |

The order is fixed for v1. It creates three movements:

1. **Lure:** Negroni → Daiquiri → Aviation → Espresso Martini.
2. **Self-possession:** Margarita → Old Fashioned → Dirty Martini.
3. **Spectacle:** Cosmopolitan → French 75 → Mai Tai.

The arc moves from private desire to public expression, then releases into sensory abundance.

## The recurring guide: The Golden Twist

The Golden Twist is a living ribbon that can become citrus peel, horizon, contrail, steam, salt line, clock hand, olive pick, camera-flash trail, champagne stream, or curling mint stem. It never speaks and is not a mascot. It behaves like a sly maître d’: entering before guidance is needed, touching the next focal object once, and opening a passage.

Its ten states are:

1. **Negroni:** orange peel serpent.
2. **Daiquiri:** lime-green horizon and wave.
3. **Aviation:** pale contrail drawing impossible constellations.
4. **Espresso Martini:** steam and crema spiral.
5. **Margarita:** salt line becoming an agave blade.
6. **Old Fashioned:** orange peel becoming a clock spring.
7. **Dirty Martini:** polished olive pick cutting through velvet.
8. **Cosmopolitan:** lemon twist caught in a flash trail.
9. **French 75:** champagne stream rising into a gold thread.
10. **Mai Tai:** lime peel and mint stem curling into the final question mark.

The recurring curve makes the sequence coherent when palettes, eras, glassware, and emotional temperature change. One flexible motif is also economical enough for a one-week production.

## Modular chapter architecture

Every cocktail uses the same five-beat contract:

1. **Reveal** — a short coded omen introduces the emotion and prepares the hero-video poster.
2. **Hero** — one 4–6 second Magnific video presents the drink as a dramatic object.
3. **History** — a compact origin moment appears over a stable illustrated hold.
4. **Recipe** — ingredients and method assemble through reusable labels and ingredient symbols.
5. **Transition** — the Golden Twist transforms one material into the next world.

The module is content-driven rather than layout-driven. A future cocktail is added by supplying one content record, one palette, one glass silhouette, one hero video, one poster, a small illustrated layer pack, and one transition mapping. It does not require a new page template.

### Chapter content contract

Each cocktail record must eventually contain:

- `slug`, order, cocktail name, emotional label, chapter line.
- Dominant and accent colors.
- Atmosphere and material vocabulary.
- Glass type and garnish.
- Hero-video source, poster, duration, and focal-point coordinates.
- Short history copy plus source notes.
- Ingredients, metric quantities, method, and preparation verbs.
- Layered scene assets and alt text.
- Incoming and outgoing Golden Twist states.
- Transition type: code, shared WebGL effect, or one of the four Magnific events.

This is a planning schema, not an instruction to create application data yet.

## Experience principles

### One journey, not ten landing pages

Intro, ten cocktails, and outro must feel like one connected camera path. Chapter boundaries are made from objects already present: ice, peel, foam, salt, smoke, glass reflections, olives, bubbles, mint, and shadow. There are no hard-cut card stacks, carousels, or mandatory “next” buttons.

### Desire first, recipe second

Emotion earns attention; useful information rewards it. The reveal and hero may be surreal. History and preparation must be concise, readable, and credible.

### A repeated grammar with changing worlds

The five-beat module repeats so visitors learn the interaction rhythm. Contrast comes from glass silhouette, palette, material, tempo, type composition, and emotional voice—not from inventing ten interaction systems.

### Sensual, not explicit

Seduction comes from tactility and anticipation: cold glass, beads of water, a slow peel, cloudy brine, bubbles, viscosity, velvet shadow, reflective metal, mint oils, and pauses before impact. Anonymous nightlife silhouettes may appear at the edges; no sexualized central figure is needed.

### Illustrated, not sterile 3D

The world retains visible ink, print texture, imperfect registration, brush grain, and expressive perspective. Glass and liquid can feel dimensional without becoming photoreal product renders or luxury alcohol commercials.

## Content voice

Every cocktail uses four compact text units:

- **Desire:** one declarative line, such as “You want what bites back.”
- **Identity:** the cocktail name plus a six-to-ten-word flavor description.
- **History:** 30–45 words, with legends labeled as legends when origins are disputed.
- **Make it:** ingredients plus a maximum three-step method, including glass and garnish.

Tone is intimate, knowing, and concise. It may flirt, but it should not become purple prose. Preparation switches to direct bartender language: “Add,” “shake,” “stir,” “strain,” “top,” and “garnish.”

## Recipe baseline for v1

Use International Bartenders Association specifications as the editorial baseline where one exists. Dirty Martini uses a project house specification because ratios vary widely; a working bartender should review every recipe before launch.

1. **Negroni:** 30 ml gin, 30 ml bitter Campari, 30 ml sweet red vermouth. Build over ice, stir gently, garnish with orange.
2. **Daiquiri:** 60 ml white Cuban rum, 20 ml fresh lime juice, 2 bar spoons superfine sugar. Dissolve, shake with ice, strain into a chilled cocktail glass.
3. **Aviation:** 45 ml gin, 15 ml maraschino liqueur, 15 ml fresh lemon juice, 1 bar spoon crème de violette. Shake with cracked ice, strain, optional maraschino cherry.
4. **Espresso Martini:** 50 ml vodka, 30 ml coffee liqueur, 10 ml sugar syrup, 1 strong espresso. Shake hard with ice, strain, garnish with three coffee beans.
5. **Margarita:** 50 ml 100% agave tequila, 20 ml triple sec, 15 ml fresh lime juice. Shake with ice, strain into a chilled cocktail glass, optional half salt rim.
6. **Old Fashioned:** 45 ml bourbon or rye whiskey, 1 sugar cube, a few dashes Angostura bitters, a few dashes water. Dissolve, add ice and whiskey, stir gently, garnish with orange and optional cherry.
7. **Dirty Martini — house spec:** 60 ml London dry gin or vodka, 10 ml dry vermouth, 10 ml quality olive brine. Stir very cold, strain into a chilled cocktail glass, garnish with one large green olive. Offer spirit choice in copy, not as a branching interaction.
8. **Cosmopolitan:** 40 ml citron vodka, 15 ml orange liqueur, 15 ml fresh lime juice, 30 ml cranberry juice. Shake with ice, strain into a large cocktail glass, garnish with lemon twist.
9. **French 75:** 30 ml gin, 15 ml fresh lemon juice, 15 ml sugar syrup, 60 ml Champagne. Shake everything except Champagne, strain into a flute, top and stir gently.
10. **Mai Tai:** 30 ml amber Jamaican rum, 30 ml Martinique molasses-style rum, 15 ml orange curaçao, 15 ml orgeat, 30 ml fresh lime juice, 7.5 ml simple syrup. Shake with ice, pour into a double rocks glass, garnish with mint, lime, and pineapple.

Display metric quantities first. A unit toggle and recipe variations are outside the one-week scope.

## Historical editorial stance

- **Negroni:** present Florence/1919 and Camillo Negroni as the best-known story, not uncontested fact.
- **Daiquiri:** connect it to Cuba and Daiquirí; note that rum, citrus, and sugar combinations predate the Jennings Cox account.
- **Aviation:** anchor it to Hugo Ensslin’s 1916 *Recipes for Mixed Drinks*.
- **Espresso Martini:** credit Dick Bradsell and 1980s London; omit the unnamed-model anecdote as fact.
- **Margarita:** make its disputed authorship the story—many claimants, no single proven inventor.
- **Old Fashioned:** connect its stripped-back build to the early definition of a cocktail; avoid repeating the Pendennis Club claim as settled history.
- **Dirty Martini:** frame it as an early twentieth-century Martini variation whose briny practice predates the later name; label specific inventor stories as uncertain.
- **Cosmopolitan:** credit Toby Cecchini with the globally recognized late-1980s Odeon formulation while acknowledging a broader contested lineage.
- **French 75:** connect its name to the French 75 mm field gun and the recipe’s evolution through early twentieth-century bar books; avoid a false single-inventor certainty.
- **Mai Tai:** center Victor Bergeron’s 1944 Oakland formulation while noting competing claims and later confusion with fruit-heavy tropical drinks.

## Video and interaction strategy

### Required Magnific footage

- **Ten hero videos:** one per cocktail, 4–6 seconds, 16:9, desktop-first, center-safe, scroll-scrubbable, with slow controlled motion and stable boundary frames.
- **Four major transition videos:** Negroni → Daiquiri, Aviation → Espresso Martini, Dirty Martini → Cosmopolitan, and French 75 → Mai Tai.

No other generated-video system may be used. Hero videos present a drink; transition videos transform worlds. They are separate assets and should not be conflated.

### Code-driven motion

Intro, outro, the other six cocktail-to-cocktail transitions, hero reveals, history moments, recipe assemblies, parallax, and the Golden Twist’s routine gestures are built with HTML/CSS and GSAP. A small shared Three.js layer may provide refraction, particle fields, or fluid distortion where it offers a visible benefit. WebGL is enhancement, not a requirement for comprehension.

## Reference interpretation

The references remain directional principles, never asset or layout sources:

- [Lil Frog](https://lilfrogeth.com/) supports dense characterful illustration and discoveries that reward scrolling.
- [Hadaka](https://hadaka.jp/) supports bold symbols, expressive type, and motion-led identity.
- [scroll-world](https://github.com/oso95/scroll-world) supports continuous scroll-scrubbing and frame-matched scene connections.

Do not reuse their characters, scenery, compositions, copy, branding, assets, or distinctive choreography. The Golden Twist, ten-desire structure, material transitions, and illustrated cocktail theatre form this project’s identity.

## One-week v1 boundary

### In scope

- One linear responsive journey: intro, ten modular cocktails, outro.
- Ten complete five-beat chapters.
- Ten Magnific hero videos and no more than four Magnific transition videos.
- One reusable scene shell, history pattern, recipe pattern, Golden Twist system, and transition toolkit.
- Layered illustrated environments with restrained browser motion.
- Static poster and reduced-motion treatment for every chapter.
- Recipe and history copy as readable page content, never baked into video.

### Out of scope

- Search, filters, accounts, favorites, shopping, or a recipe database.
- Branching personality quiz logic.
- Free-roaming 3D, ten custom shaders, or photoreal fluid simulation.
- Unique navigation or interaction rules for individual cocktails.
- Separate generated portrait video chain.
- Voiceover, required audio, or more than one recipe variation per drink.

## Scalability rules

- A new cocktail must fit the same five beats and content contract.
- All layout differences come from configuration tokens and asset slots, not new templates.
- Transition families are reusable: **wipe/curl, portal/refraction, particle migration, liquid/color takeover**.
- Hero videos are virtualized so only the current and next chapter need active media.
- Chapter navigation, accessibility labels, and recipe rendering derive from the same ordered content source later.
- Special effects are optional flags. A chapter without WebGL must still feel complete.

## Success criteria

The first version succeeds if:

- Visitors can distinguish all ten emotional identities after one journey.
- Every chapter clearly contains reveal, hero, history, recipe, and transition.
- The cocktail remains the largest, clearest object in each hero moment.
- The same interaction grammar feels coherent rather than repetitive.
- Recipes remain understandable without pausing video at an exact frame.
- The experience works with sound off, reduced motion, and missing WebGL.
- A mid-range mobile device never decodes more than two hero videos at once.

## Responsible framing

The outro includes a discreet legal-age and responsible-drinking note appropriate to the launch market. Alcohol is presented as craft and culture, not as emotional medicine, social pressure, or a consumption challenge. “Desire” describes mood and taste—not excess as a behavior. Mai Tai’s “Excess” means visual abundance and flavor complexity, not overconsumption.
