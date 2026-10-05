import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import masterVideo from "../assets/cocktail-world-master-scroll.mp4";

gsap.registerPlugin(ScrollTrigger);

const MASTER_VIDEO = {
  src: masterVideo,
  poster: "",
  measuredDuration: 44.041667,
};

const SCROLL_LENGTH_VH = 40;
const VIDEO_LERP = 0.18;
const SEEK_THRESHOLD_SECONDS = 0.025;

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
  return <header className="intro-moment" aria-labelledby="intro-title"><h1 id="intro-title"><span>DISCOVER</span><span>YOUR</span><span>DESIRE</span></h1><p>Scroll to fall <b aria-hidden="true">↓</b></p></header>;
}

function ChapterMoment({ chapter }) {
  return (
    <section className={`chapter-overlay theme-${chapter.id}`} data-chapter={chapter.id} aria-labelledby={`${chapter.id}-title`}>
      <header className="moment hero-moment"><span>{chapter.number}</span><h2 id={`${chapter.id}-title`}>{chapter.title}</h2><strong>{chapter.emotion}</strong></header>
      <article className="moment history-moment" aria-labelledby={`${chapter.id}-history`}><div className="history-place" aria-hidden="true">{chapter.place}</div><div className="history-year" aria-hidden="true">{chapter.year}</div><div className="history-readable"><span>History</span><h3 id={`${chapter.id}-history`}>{chapter.historyTitle}</h3><p>{chapter.history}</p></div></article>
      <article className="moment recipe-moment" aria-labelledby={`${chapter.id}-recipe`}><div className="recipe-readable"><span>Recipe</span><h3 id={`${chapter.id}-recipe`}>{chapter.recipeTitle}</h3><ol>{chapter.ingredients.map(([amount, ingredient]) => <li key={ingredient}><strong>{amount}</strong><em>{ingredient}</em></li>)}</ol><div className="method"><p><b>Preparation</b>{chapter.preparation}</p>{chapter.serve ? <p><b>Serve</b>{chapter.serve}</p> : null}<p><b>Garnish</b>{chapter.garnish}</p></div></div></article>
    </section>
  );
}

export function App() {
  const worldRef = useRef(null);
  const stageRef = useRef(null);
  const videoRef = useRef(null);
  const targetTimeRef = useRef(0);
  const smoothTimeRef = useRef(0);
  const lastRequestedTimeRef = useRef(-1);
  const rafRef = useRef(null);
  const mediaReadyRef = useRef(false);
  const debugRef = useRef(null);
  const timingAudit = new URLSearchParams(window.location.search).has("timing-audit");
  const debugScroll = import.meta.env.DEV && new URLSearchParams(window.location.search).get("debugScroll") === "1";

  useLayoutEffect(() => {
    const world = worldRef.current;
    const stage = stageRef.current;
    const video = videoRef.current;
    if (!world || !stage || !video) return undefined;
    let removeMetadataListener = () => {};
    let lastFrameTimestamp = 0;
    let debugRafId = null;
    let debugFrameCount = 0;
    let debugFps = 0;
    let debugFpsStartedAt = performance.now();
    let debugScrollVelocity = 0;
    let activeSeekStartedAt = 0;
    const debugSeekEvents = [];
    const debugSeekLatencies = [];

    const recordSeek = (nextTime) => {
      if (!debugScroll) return;
      debugSeekEvents.push({ at: performance.now(), distance: Math.abs(nextTime - video.currentTime) });
      if (debugSeekEvents.length > 240) debugSeekEvents.splice(0, debugSeekEvents.length - 240);
    };

    const handleSeeking = () => { activeSeekStartedAt = performance.now(); };
    const handleSeeked = () => {
      if (!activeSeekStartedAt) return;
      debugSeekLatencies.push(performance.now() - activeSeekStartedAt);
      if (debugSeekLatencies.length > 120) debugSeekLatencies.shift();
      activeSeekStartedAt = 0;
    };

    const updateDebugOverlay = (timestamp) => {
      debugFrameCount += 1;
      const fpsWindow = timestamp - debugFpsStartedAt;
      if (fpsWindow >= 500) {
        debugFps = (debugFrameCount * 1000) / fpsWindow;
        debugFrameCount = 0;
        debugFpsStartedAt = timestamp;
      }

      const recentSeeks = debugSeekEvents.filter((event) => timestamp - event.at <= 1000);
      const seekDistance = recentSeeks.length
        ? recentSeeks.reduce((sum, event) => sum + event.distance, 0) / recentSeeks.length
        : 0;
      const seekLatency = debugSeekLatencies.length
        ? debugSeekLatencies.reduce((sum, value) => sum + value, 0) / debugSeekLatencies.length
        : 0;
      const targetTime = targetTimeRef.current;
      const chapter = [...chapters].reverse().find((item) => targetTime >= item.chapterStart) ?? chapters[0];

      if (debugRef.current) {
        debugRef.current.textContent = [
          `SCROLL PROGRESS  ${video.dataset.masterProgress ?? "0.0000"}`,
          `TARGET TIME      ${targetTime.toFixed(3)} s`,
          `ACTUAL TIME      ${video.currentTime.toFixed(3)} s`,
          `SEEK DIFFERENCE  ${(targetTime - video.currentTime).toFixed(3)} s`,
          `CURRENT CHAPTER  ${chapter.title}`,
          `FPS              ${debugFps.toFixed(1)}`,
          `SCROLL VELOCITY  ${debugScrollVelocity.toFixed(0)} px/s`,
          `SEEK RATE        ${recentSeeks.length} /s`,
          `AVG SEEK STEP    ${seekDistance.toFixed(3)} s`,
          `AVG SEEK LATENCY ${seekLatency.toFixed(1)} ms`,
          `RAF LOOPS        ${rafRef.current === null ? 1 : 2}`,
          `SCROLLTRIGGERS   ${ScrollTrigger.getAll().length}`,
        ].join("\n");
      }
      debugRafId = requestAnimationFrame(updateDebugOverlay);
    };

    const stopVideoController = () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    };

    const updateVideoFrame = (timestamp) => {
      const targetTime = targetTimeRef.current;
      const delta = targetTime - smoothTimeRef.current;
      smoothTimeRef.current = Math.abs(delta) < 0.004
        ? targetTime
        : smoothTimeRef.current + delta * VIDEO_LERP;

      const desiredTime = Math.min(video.duration || MASTER_VIDEO.measuredDuration, Math.max(0, smoothTimeRef.current));
      const requestedDelta = Math.abs(desiredTime - lastRequestedTimeRef.current);
      const mediaDelta = Math.abs(desiredTime - video.currentTime);
      const frameIntervalElapsed = timestamp - lastFrameTimestamp >= 32;

      if (
        mediaReadyRef.current
        && !video.seeking
        && frameIntervalElapsed
        && requestedDelta >= SEEK_THRESHOLD_SECONDS
        && mediaDelta >= SEEK_THRESHOLD_SECONDS
      ) {
        recordSeek(desiredTime);
        video.currentTime = desiredTime;
        lastRequestedTimeRef.current = desiredTime;
        lastFrameTimestamp = timestamp;
      }

      if (Math.abs(targetTime - smoothTimeRef.current) >= 0.004 || video.seeking) {
        rafRef.current = requestAnimationFrame(updateVideoFrame);
      } else {
        if (mediaReadyRef.current && !video.seeking && Math.abs(video.currentTime - targetTime) >= 0.004) {
          recordSeek(targetTime);
          video.currentTime = targetTime;
          lastRequestedTimeRef.current = targetTime;
        }
        rafRef.current = null;
      }
    };

    const startVideoController = () => {
      if (rafRef.current === null) rafRef.current = requestAnimationFrame(updateVideoFrame);
    };

    const context = gsap.context(() => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const duration = MASTER_VIDEO.measuredDuration;
        const setVideoTarget = (progress) => {
          const value = Math.min(1, Math.max(0, progress));
          const nextTime = duration * value;
          targetTimeRef.current = nextTime;
          video.dataset.masterProgress = value.toFixed(4);
          video.dataset.masterTime = nextTime.toFixed(3);
          startVideoController();
        };
        const timeline = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: {
            trigger: world,
            start: "top top",
            end: `+=${SCROLL_LENGTH_VH * 100}%`,
            pin: stage,
            scrub: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              debugScrollVelocity = self.getVelocity();
              setVideoTarget(self.progress);
            },
          },
        });
        timeline
          .to({}, { duration }, 0)
          .to(".intro-moment", { y: "-28vh", opacity: 0, duration: 0.72 }, 0.72);

        chapters.forEach((chapter, index) => {
          const selector = `[data-chapter="${chapter.id}"]`;
          const heroIn = Math.max(chapter.chapterStart, chapter.heroReveal - 0.35);
          const heroOut = chapter.id === "old-fashioned" ? chapter.historyStart : chapter.descentStart;
          const historyIn = Math.max(chapter.descentStart, Math.min(chapter.historyStart, chapter.recipeStart - 0.9));
          const historyOut = Math.min(chapter.transitionStart, Math.max(chapter.historyEnd, chapter.recipeStart + 0.12));
          const recipeIn = Math.max(chapter.historyStart + 0.25, Math.min(chapter.recipeStart, chapter.chapterEnd - 1.15));
          const recipeOut = chapter.chapterEnd - 0.08;
          timeline
            .fromTo(`${selector} .hero-moment`, { opacity: 0, y: "20vh" }, { opacity: 1, y: 0, duration: 0.45 }, heroIn)
            .to(`${selector} .hero-moment`, { opacity: 0, y: "-42vh", duration: 0.5 }, Math.max(heroIn + 0.45, heroOut - 0.38))
            .fromTo(`${selector} .history-place`, { opacity: 0, x: index % 2 ? "20vw" : "-20vw" }, { opacity: 0.43, x: 0, duration: 0.24 }, historyIn)
            .fromTo(`${selector} .history-year`, { opacity: 0, y: "18vh" }, { opacity: 0.74, y: 0, duration: 0.24 }, historyIn + 0.06)
            .fromTo(`${selector} .history-readable`, { opacity: 0, y: "16vh" }, { opacity: 1, y: 0, duration: 0.26 }, historyIn + 0.1)
            .to(`${selector} .history-moment`, { opacity: 0, y: "-28vh", duration: 0.22 }, Math.max(historyIn + 0.36, historyOut - 0.22))
            .fromTo(`${selector} .recipe-readable`, { opacity: 0, y: "22vh" }, { opacity: 1, y: 0, duration: 0.28 }, recipeIn)
            .fromTo(`${selector} .recipe-readable li`, { opacity: 0, y: "12vh", rotation: -3 }, { opacity: 1, y: 0, rotation: 0, duration: 0.2, stagger: 0.05 }, recipeIn + 0.1)
            .fromTo(`${selector} .method`, { opacity: 0, y: "10vh" }, { opacity: 1, y: 0, duration: 0.24 }, recipeIn + 0.22)
            .to(`${selector} .recipe-moment`, { opacity: 0, y: "-30vh", duration: 0.24 }, Math.max(recipeIn + 0.4, recipeOut - 0.24));
        });

        const old = chapters.at(-1);
        timeline
          .fromTo('[data-chapter="old-fashioned"] .hero-moment', { opacity: 0, y: "16vh" }, { opacity: 1, y: 0, duration: 0.36 }, 42.78);

        const initializeVideo = () => {
          const progress = timeline.scrollTrigger?.progress ?? 0;
          const initialTime = duration * progress;
          mediaReadyRef.current = true;
          targetTimeRef.current = initialTime;
          smoothTimeRef.current = initialTime;
          lastRequestedTimeRef.current = initialTime;
          video.pause();
          recordSeek(initialTime);
          video.currentTime = Math.min(video.duration, initialTime);
          video.dataset.masterProgress = progress.toFixed(4);
          video.dataset.masterTime = initialTime.toFixed(3);
        };
        if (video.readyState >= 2) initializeVideo();
        else {
          video.addEventListener("loadeddata", initializeVideo, { once: true });
          removeMetadataListener = () => video.removeEventListener("loadeddata", initializeVideo);
        }
      });
      return () => mm.revert();
    }, world);
    if (debugScroll) {
      video.addEventListener("seeking", handleSeeking);
      video.addEventListener("seeked", handleSeeked);
      debugRafId = requestAnimationFrame(updateDebugOverlay);
    }
    ScrollTrigger.refresh();
    return () => {
      removeMetadataListener();
      stopVideoController();
      if (debugRafId !== null) cancelAnimationFrame(debugRafId);
      video.removeEventListener("seeking", handleSeeking);
      video.removeEventListener("seeked", handleSeeked);
      mediaReadyRef.current = false;
      context.revert();
    };
  }, []);

  return (
    <main className="experience">
      <section className={`scroll-world${timingAudit ? " timing-audit" : ""}`} ref={worldRef} aria-label="A continuous descent through seven cocktail worlds">
        <div className="world-stage" ref={stageRef}>
          <div className="master-media" aria-hidden="true"><video ref={videoRef} src={MASTER_VIDEO.src} preload="auto" muted playsInline controls={false} tabIndex={-1} /></div>
          <IntroMoment />
          {chapters.map((chapter) => <ChapterMoment chapter={chapter} key={chapter.id} />)}
          {debugScroll ? <output className="scroll-debug" ref={debugRef} aria-live="off" /> : null}
        </div>
      </section>
    </main>
  );
}
