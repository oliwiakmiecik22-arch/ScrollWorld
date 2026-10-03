import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import masterVideo from "../assets/cocktail-world-master.mp4";

gsap.registerPlugin(ScrollTrigger);

const MASTER_VIDEO = {
  src: masterVideo,
  poster: "",
  measuredDuration: 44.041667,
};

// All source-time decisions live here. Values are seconds in the Magnific master.
const chapters = [
  {
    id: "negroni", number: "01", title: "NEGRONI", emotion: "TEMPTATION",
    chapterStart: 0, cocktailAppear: 0, heroReveal: 0.35, heroPeak: 3.2, descentStart: 4.1,
    historyStart: 5, historyEnd: 6.3, recipeStart: 6.35, recipeEnd: 8.15,
    transitionStart: 8.15, chapterEnd: 9.05,
    heroLine: "You want what bites back.", year: "1919?", place: "FLORENCE",
    historyTitle: "A stronger Americano after dark.",
    history: "The Negroni is commonly associated with Florence around 1919. In the familiar story, Count Camillo Negroni asked for a stronger Americano made with gin instead of soda, though the details remain disputed.",
    recipeTitle: "Equal parts. No apologies.",
    ingredients: [["30 ml", "Gin"], ["30 ml", "Campari"], ["30 ml", "Sweet vermouth"]],
    preparation: "Stir with ice until chilled. Strain over fresh ice in a rocks glass.",
    garnish: "Orange peel or orange slice.", transition: "BITTER LIGHT BECOMES SILVER",
  },
  {
    id: "dirty-martini", number: "02", title: "DIRTY MARTINI", emotion: "PROVOCATION / SEDUCTION",
    chapterStart: 8.65, cocktailAppear: 9, heroReveal: 9.45, heroPeak: 11.25, descentStart: 12.75,
    historyStart: 13, historyEnd: 13.8, recipeStart: 13.7, recipeEnd: 14.45,
    transitionStart: 14.2, chapterEnd: 14.65,
    heroLine: "Polite until the brine breaks through.", year: "20TH C.", place: "THE MARTINI / DISTURBED",
    historyTitle: "A clean tradition turns cloudy.",
    history: "The Dirty Martini grew from the classic Martini tradition as bartenders began adding olive brine for salinity and depth. Its exact invention is uncertain; the variation developed over time.",
    recipeTitle: "Cold enough to keep a secret.",
    ingredients: [["60 ml", "Gin or vodka"], ["15 ml", "Dry vermouth"], ["10–15 ml", "Olive brine"]],
    preparation: "Stir with ice until very cold. Strain into a chilled martini glass.",
    garnish: "Green olives.", transition: "BRINE CRYSTALLIZES INTO SALT",
  },
  {
    id: "margarita", number: "03", title: "MARGARITA", emotion: "DESIRE",
    chapterStart: 14.4, cocktailAppear: 14.5, heroReveal: 15, heroPeak: 17.2, descentStart: 18.7,
    historyStart: 19.2, historyEnd: 20.2, recipeStart: 20.2, recipeEnd: 22.2,
    transitionStart: 22.2, chapterEnd: 23.1,
    heroLine: "The horizon refuses to stay still.", year: "1930s–40s", place: "MEXICO / UNITED STATES",
    historyTitle: "Many stories chase the first light.",
    history: "The Margarita’s exact origin is disputed. Several competing stories are associated with Mexico and the United States during the 1930s and 1940s; no single account is definitive.",
    recipeTitle: "Cut through the heat.",
    ingredients: [["50 ml", "Tequila blanco"], ["25 ml", "Fresh lime juice"], ["20 ml", "Orange liqueur"]],
    preparation: "Shake with ice. Strain into a chilled glass. A salt rim is optional.",
    garnish: "Lime.", transition: "CITRUS FALLS INTO NEON HEAT",
  },
  {
    id: "mai-tai", number: "04", title: "MAI TAI", emotion: "EXCESS / HEAT / FORBIDDEN PARADISE",
    chapterStart: 22.7, cocktailAppear: 22.8, heroReveal: 23.3, heroPeak: 24.4, descentStart: 25.1,
    historyStart: 25.3, historyEnd: 25.9, recipeStart: 25.8, recipeEnd: 26.6,
    transitionStart: 26.35, chapterEnd: 27.1,
    heroLine: "Paradise has an aftertaste.", year: "MID-CENTURY", place: "TIKI / CALIFORNIA",
    historyTitle: "Two legends under one tropical moon.",
    history: "The Mai Tai became an icon of mid-century tiki culture. Its origin is contested, with influential claims associated with both Trader Vic and Don the Beachcomber.",
    recipeTitle: "Turn the island voltage up.",
    ingredients: [["45 ml", "Aged rum"], ["15 ml", "Orange curaçao"], ["15 ml", "Orgeat"], ["10 ml", "Simple syrup"], ["25 ml", "Fresh lime juice"]],
    preparation: "Shake with ice. Serve over crushed or fresh ice.", garnish: "Mint and lime.",
    transition: "PARADISE BENDS TOWARD POWER",
  },
  {
    id: "manhattan", number: "05", title: "MANHATTAN", emotion: "POWER",
    chapterStart: 26.7, cocktailAppear: 26.8, heroReveal: 27.2, heroPeak: 30.5, descentStart: 32.35,
    historyStart: 32.6, historyEnd: 33.5, recipeStart: 33.45, recipeEnd: 34.55,
    transitionStart: 34.35, chapterEnd: 35.1,
    heroLine: "The city answers in a lower voice.", year: "LATE 1800s", place: "NEW YORK",
    historyTitle: "A city legend without one author.",
    history: "The Manhattan emerged in the late 19th century and became inseparable from New York cocktail culture. Popular origin legends endure, but no single story is established fact.",
    recipeTitle: "Built with quiet authority.",
    ingredients: [["60 ml", "Rye or bourbon"], ["30 ml", "Sweet vermouth"], ["2 dashes", "Aromatic bitters"]],
    preparation: "Stir with ice. Strain into a chilled coupe.", garnish: "Cocktail cherry.",
    transition: "THE GRID MELTS INTO OBSESSION",
  },
  {
    id: "espresso-martini", number: "06", title: "ESPRESSO MARTINI", emotion: "OBSESSION",
    chapterStart: 34.65, cocktailAppear: 34.7, heroReveal: 35.25, heroPeak: 37.15, descentStart: 37.75,
    historyStart: 37.9, historyEnd: 38.6, recipeStart: 38.55, recipeEnd: 39.45,
    transitionStart: 39.25, chapterEnd: 39.8,
    heroLine: "Sleep is no longer invited.", year: "1980s", place: "LONDON",
    historyTitle: "Nightlife, sharpened with coffee.",
    history: "The Espresso Martini is a modern London creation, widely associated with bartender Dick Bradsell in the 1980s and the city’s late-night bar culture.",
    recipeTitle: "Shake until the night foams.",
    ingredients: [["50 ml", "Vodka"], ["30 ml", "Fresh espresso"], ["20 ml", "Coffee liqueur"], ["10 ml", "Simple syrup, if needed"]],
    preparation: "Shake hard with ice to create foam. Double strain into a chilled coupe or martini glass.",
    garnish: "Three coffee beans.", transition: "CAFFEINE TEARS OPEN THE COSMOS",
  },
  {
    id: "old-fashioned", number: "07", title: "OLD FASHIONED", emotion: "AFTER DARK / AUTHORITY",
    chapterStart: 39.45, cocktailAppear: 40.35, heroReveal: 41, heroPeak: 43.65, descentStart: 39.45,
    historyStart: 40.15, historyEnd: 41.2, recipeStart: 41.2, recipeEnd: 42.65,
    transitionStart: 43.5, chapterEnd: 44.041667,
    heroLine: "An artifact waits beyond the last atmosphere.", year: "19TH C.", place: "THE OLDER STYLE",
    historyTitle: "The original formula remembers.",
    history: "The Old Fashioned developed from the early cocktail formula of spirit, sugar, water and bitters. During the 19th century, its name became linked to ordering a cocktail made in the older style.",
    recipeTitle: "Four elements. Absolute gravity.",
    ingredients: [["60 ml", "Bourbon or rye"], ["1 cube / 7.5 ml", "Sugar / simple syrup"], ["2–3 dashes", "Angostura bitters"]],
    preparation: "Combine and stir with ice until chilled and diluted.", serve: "Rocks glass with a large ice cube.",
    garnish: "Orange peel.", transition: "AUTHORITY HOLDS THE FINAL FRAME",
  },
];

function IntroMoment() {
  return <header className="intro-moment" aria-labelledby="intro-title"><div className="intro-eye" aria-hidden="true"><i /></div><h1 id="intro-title"><span>DISCOVER</span><span>YOUR</span><span>DESIRE</span></h1><p>Scroll to fall <b aria-hidden="true">↓</b></p></header>;
}

function ChapterMoment({ chapter }) {
  return (
    <section className={`chapter-overlay theme-${chapter.id}`} data-chapter={chapter.id} aria-labelledby={`${chapter.id}-title`}>
      <div className="chapter-atmosphere" aria-hidden="true"><i className="atmosphere-orbit" /><i className="atmosphere-sigil" /><i className="atmosphere-beam" /></div>
      <header className="moment hero-moment"><span>{chapter.number} / KEEP FALLING</span><h2 id={`${chapter.id}-title`}>{chapter.title}</h2><strong>{chapter.emotion}</strong><p>{chapter.heroLine}</p></header>
      <article className="moment history-moment" aria-labelledby={`${chapter.id}-history`}><div className="history-place" aria-hidden="true">{chapter.place}</div><div className="history-year" aria-hidden="true">{chapter.year}</div><div className="history-readable"><span>History / perhaps</span><h3 id={`${chapter.id}-history`}>{chapter.historyTitle}</h3><p>{chapter.history}</p></div></article>
      <article className="moment recipe-moment" aria-labelledby={`${chapter.id}-recipe`}><div className="recipe-readable"><span>Make the feeling</span><h3 id={`${chapter.id}-recipe`}>{chapter.recipeTitle}</h3><ol>{chapter.ingredients.map(([amount, ingredient]) => <li key={ingredient}><strong>{amount}</strong><em>{ingredient}</em></li>)}</ol><div className="method"><p><b>Preparation</b>{chapter.preparation}</p>{chapter.serve ? <p><b>Serve</b>{chapter.serve}</p> : null}<p><b>Garnish</b>{chapter.garnish}</p></div></div></article>
      <div className="moment transition-moment" aria-hidden="true"><p>{chapter.transition}</p><b>↓</b></div>
    </section>
  );
}

function DepthLayers() {
  return <><div className="depth depth-background" aria-hidden="true"><i /><i /><i /></div><div className="depth depth-midground" aria-hidden="true"><i /><i /><i /><i /></div><div className="depth depth-foreground" aria-hidden="true"><i /><i /></div><div className="golden-thread" aria-hidden="true" /><div className="world-grain" aria-hidden="true" /></>;
}

function OldFashionedDepth() {
  return <div className="old-fashioned-depth" aria-hidden="true"><div className="old-distant"><i /><i /><i /><i /></div><div className="old-mid"><i /><i /><i /></div><div className="old-near"><i /><i /><i /><i /></div><div className="old-haze" /></div>;
}

const windowDuration = (start, end, minimum = 0.28) => Math.max(minimum, end - start);

export function App() {
  const worldRef = useRef(null);
  const stageRef = useRef(null);
  const videoRef = useRef(null);
  const timingAudit = new URLSearchParams(window.location.search).has("timing-audit");

  useLayoutEffect(() => {
    const world = worldRef.current;
    const stage = stageRef.current;
    const video = videoRef.current;
    if (!world || !stage || !video) return undefined;
    let removeMetadataListener = () => {};
    const context = gsap.context(() => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const duration = MASTER_VIDEO.measuredDuration;
        const syncVideo = (progress) => {
          const value = Math.min(1, Math.max(0, progress));
          const nextTime = duration * value;
          video.dataset.masterProgress = value.toFixed(4);
          video.dataset.masterTime = nextTime.toFixed(3);
          if (!Number.isFinite(video.duration) || video.duration <= 0) return;
          video.pause();
          if (Math.abs(video.currentTime - nextTime) > 0.01) video.currentTime = Math.min(video.duration, nextTime);
        };
        const timeline = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: { trigger: world, start: "top top", end: "+=8800%", pin: stage, scrub: 0.45, anticipatePin: 1, invalidateOnRefresh: true, onUpdate: (self) => syncVideo(self.progress) },
        });
        timeline
          .to({}, { duration }, 0)
          .fromTo(".master-media", { opacity: 0.42 }, { opacity: 1, duration: 1.2 }, 0)
          .to(".intro-moment", { y: "-52vh", opacity: 0, duration: 0.72 }, 0.72)
          .fromTo(".depth-background", { y: "24vh", rotation: -3 }, { y: "-70vh", rotation: 7, duration }, 0)
          .fromTo(".depth-midground", { y: "70vh", rotation: 4 }, { y: "-205vh", rotation: -16, duration }, 0)
          .fromTo(".depth-foreground", { y: "120vh", x: "-4vw", rotation: -8 }, { y: "-470vh", x: "8vw", rotation: 25, duration }, 0)
          .fromTo(".golden-thread", { y: "80vh" }, { y: "-300vh", rotation: -8, duration }, 0);

        chapters.forEach((chapter, index) => {
          const selector = `[data-chapter="${chapter.id}"]`;
          const heroIn = Math.max(chapter.chapterStart, chapter.heroReveal - 0.35);
          const heroOut = chapter.id === "old-fashioned" ? chapter.historyStart : chapter.descentStart;
          timeline
            .fromTo(`${selector} .chapter-atmosphere`, { opacity: 0 }, { opacity: 0.7, duration: 0.45 }, chapter.chapterStart)
            .to(`${selector} .chapter-atmosphere`, { opacity: 0, duration: 0.38 }, Math.max(chapter.chapterStart, chapter.chapterEnd - 0.38))
            .fromTo(`${selector} .hero-moment`, { opacity: 0, y: "20vh" }, { opacity: 1, y: 0, duration: 0.45 }, heroIn)
            .to(`${selector} .hero-moment`, { opacity: 0, y: "-42vh", duration: 0.5 }, Math.max(heroIn + 0.45, heroOut - 0.38))
            .fromTo(`${selector} .history-place`, { opacity: 0, x: index % 2 ? "20vw" : "-20vw" }, { opacity: 0.43, x: 0, duration: 0.36 }, chapter.historyStart)
            .fromTo(`${selector} .history-year`, { opacity: 0, y: "18vh" }, { opacity: 0.74, y: 0, duration: 0.32 }, chapter.historyStart + 0.08)
            .fromTo(`${selector} .history-readable`, { opacity: 0, y: "16vh" }, { opacity: 1, y: 0, duration: 0.34 }, chapter.historyStart + 0.12)
            .to(`${selector} .history-moment`, { opacity: 0, y: "-28vh", duration: 0.34 }, Math.max(chapter.historyStart + 0.34, chapter.historyEnd - 0.3))
            .fromTo(`${selector} .recipe-readable`, { opacity: 0, y: "22vh" }, { opacity: 1, y: 0, duration: 0.34 }, chapter.recipeStart)
            .fromTo(`${selector} .recipe-readable li`, { opacity: 0, y: "12vh", rotation: -3 }, { opacity: 1, y: 0, rotation: 0, duration: 0.22, stagger: 0.06 }, chapter.recipeStart + 0.12)
            .fromTo(`${selector} .method`, { opacity: 0, y: "10vh" }, { opacity: 1, y: 0, duration: 0.28 }, chapter.recipeStart + 0.28)
            .to(`${selector} .recipe-moment`, { opacity: 0, y: "-30vh", duration: 0.34 }, Math.max(chapter.recipeStart + 0.4, chapter.recipeEnd - 0.3))
            .fromTo(`${selector} .transition-moment`, { opacity: 0, y: "22vh" }, { opacity: 1, y: 0, duration: windowDuration(chapter.transitionStart, chapter.chapterEnd) * 0.45 }, chapter.transitionStart)
            .to(`${selector} .transition-moment`, { opacity: 0, y: "-20vh", duration: 0.24 }, Math.max(chapter.transitionStart + 0.25, chapter.chapterEnd - 0.2));
        });

        const old = chapters.at(-1);
        timeline
          .to(".depth, .golden-thread", { opacity: 0.14, duration: 0.65 }, old.chapterStart)
          .fromTo(".old-fashioned-depth", { opacity: 0 }, { opacity: 1, duration: 0.35 }, old.chapterStart)
          .fromTo(".old-distant", { y: "14vh" }, { y: "-12vh", duration: old.chapterEnd - old.chapterStart }, old.chapterStart)
          .fromTo(".old-mid", { y: "75vh", rotation: -2 }, { y: "-95vh", rotation: 8, duration: old.chapterEnd - old.chapterStart }, old.chapterStart)
          .fromTo(".old-near", { y: "125vh", x: "-5vw", rotation: -9 }, { y: "-245vh", x: "9vw", rotation: 18, duration: old.chapterEnd - old.chapterStart }, old.chapterStart)
          .fromTo(".old-haze", { y: "35vh", opacity: 0 }, { y: "-45vh", opacity: 0.72, duration: old.chapterEnd - old.chapterStart }, old.chapterStart)
          .fromTo('[data-chapter="old-fashioned"] .hero-moment', { opacity: 0, y: "16vh" }, { opacity: 1, y: 0, duration: 0.36 }, 42.78);

        const syncWhenReady = () => syncVideo(timeline.scrollTrigger?.progress ?? 0);
        if (video.readyState >= 1) syncWhenReady();
        else {
          video.addEventListener("loadedmetadata", syncWhenReady, { once: true });
          removeMetadataListener = () => video.removeEventListener("loadedmetadata", syncWhenReady);
        }
      });
      return () => mm.revert();
    }, world);
    ScrollTrigger.refresh();
    return () => { removeMetadataListener(); context.revert(); };
  }, []);

  return (
    <main className="experience">
      <section className={`scroll-world${timingAudit ? " timing-audit" : ""}`} ref={worldRef} aria-label="A continuous descent through seven cocktail worlds">
        <div className="world-stage" ref={stageRef}>
          <div className="master-media" aria-hidden="true"><video ref={videoRef} src={MASTER_VIDEO.src} preload="auto" muted playsInline tabIndex={-1} /></div>
          <div className="world-shade" aria-hidden="true" /><DepthLayers /><OldFashionedDepth /><IntroMoment />
          {chapters.map((chapter) => <ChapterMoment chapter={chapter} key={chapter.id} />)}
        </div>
      </section>
    </main>
  );
}
