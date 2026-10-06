import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import masterVideo from "../assets/video/cocktail-world-master-v2-scroll.mp4";
import sipLogo from "../assets/images/ChatGPT Image Oct 5, 2026, 10_32_26 PM.png";

gsap.registerPlugin(ScrollTrigger);

const MASTER_VIDEO = {
  src: masterVideo,
  poster: "",
  measuredDuration: 81,
  frameRate: 24,
  lastFrameTime: 80.958333,
};

const SCROLL_LENGTH_VH = 38;
const VIDEO_LERP = 0.22;
const SEEK_THRESHOLD_SECONDS = 1 / 48;
const SEEK_INTERVAL_MS = 40;
const VIDEO_PHASE_RATIO = 0.94;

// Global source-time markers in the approved 81-second Magnific master.
const experienceTiming = {
  portalIntroStart: 0,
  portalIntroEnd: 11.5,
  endingStart: 72.5,
  blackFrameStart: null, // The approved source ends on the final portal; it contains no black frame.
  videoEnd: 81,
};

// All source-time decisions live here. Values are seconds in the Magnific master.
const chapters = [
  {
    id: "negroni", number: "01", title: "NEGRONI", emotion: "TEMPTATION",
    chapterStart: 10.75, cocktailAppear: 11.2, heroReveal: 11.5, heroPeak: 14.5, descentStart: 16.5,
    historyStart: 16.7, historyEnd: 18.35, recipeStart: 18.1, recipeEnd: 20.55,
    transitionStart: 18, chapterEnd: 20.75,
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
    chapterStart: 19.5, cocktailAppear: 22.5, heroReveal: 22.75, heroPeak: 25.25, descentStart: 27,
    historyStart: 27.1, historyEnd: 28.2, recipeStart: 28, recipeEnd: 29.55,
    transitionStart: 28, chapterEnd: 29.75,
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
    chapterStart: 28, cocktailAppear: 29.25, heroReveal: 29.5, heroPeak: 31.5, descentStart: 32.75,
    historyStart: 32.85, historyEnd: 33.8, recipeStart: 33.55, recipeEnd: 35.55,
    transitionStart: 33.5, chapterEnd: 35.75,
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
    chapterStart: 33.5, cocktailAppear: 35.25, heroReveal: 35.5, heroPeak: 37.25, descentStart: 38.75,
    historyStart: 38.9, historyEnd: 40.5, recipeStart: 40.4, recipeEnd: 45.8,
    transitionStart: 39.75, chapterEnd: 46.25,
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
    chapterStart: 45.75, cocktailAppear: 46.25, heroReveal: 46.5, heroPeak: 49.5, descentStart: 51.5,
    historyStart: 51.6, historyEnd: 52.8, recipeStart: 52.55, recipeEnd: 54.3,
    transitionStart: 52.5, chapterEnd: 54.5,
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
    chapterStart: 53, cocktailAppear: 54.25, heroReveal: 54.5, heroPeak: 56.5, descentStart: 57.75,
    historyStart: 57.85, historyEnd: 58.5, recipeStart: 58.35, recipeEnd: 60.05,
    transitionStart: 58.25, chapterEnd: 60.25,
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
    chapterStart: 59, cocktailAppear: 60.25, heroReveal: 60.5, heroPeak: 62.5, descentStart: 64,
    historyStart: 64.05, historyEnd: 65.2, recipeStart: 65, recipeEnd: 66.55,
    transitionStart: 65, chapterEnd: 66.75,
    heroLine: "An artifact waits beyond the last atmosphere.", year: "19TH C.", place: "THE OLDER STYLE",
    historyTitle: "The original formula remembers.",
    history: "The Old Fashioned developed from the early cocktail formula of spirit, sugar, water and bitters. During the 19th century, its name became linked to ordering a cocktail made in the older style.",
    recipeTitle: "Four elements. Absolute gravity.",
    ingredients: [["60 ml", "Bourbon or rye"], ["1 cube / 7.5 ml", "Sugar / simple syrup"], ["2–3 dashes", "Angostura bitters"]],
    preparation: "Combine and stir with ice until chilled and diluted.", serve: "Rocks glass with a large ice cube.",
    garnish: "Orange peel.", transition: "AUTHORITY HOLDS THE FINAL FRAME",
  },
  {
    id: "french-75", number: "08", title: "FRENCH 75", emotion: "SPARK",
    chapterStart: 65.5, cocktailAppear: 66.75, heroReveal: 67, heroPeak: 69, descentStart: 70.5,
    historyStart: 70.6, historyEnd: 71.8, recipeStart: 71.6, recipeEnd: 73.75,
    transitionStart: 72, chapterEnd: 74,
    heroLine: "A bright charge before the final fall.", year: "EARLY 20TH C.", place: "FRANCE / NEW YORK",
    historyTitle: "A sparkling classic with a forceful name.",
    history: "The French 75 evolved through early twentieth-century bar books. Its name is associated with the French 75 mm field gun rather than one definitively established inventor.",
    recipeTitle: "Lift the spark with Champagne.",
    ingredients: [["30 ml", "Gin"], ["15 ml", "Fresh lemon juice"], ["15 ml", "Sugar syrup"], ["60 ml", "Champagne"]],
    preparation: "Shake everything except Champagne with ice. Strain into a flute, top with Champagne and stir gently.",
    garnish: "Lemon twist.", transition: "SPARK RETURNS TO THE PORTAL",
  },
];

function IntroMoment() {
  return (
    <header className="intro-moment" aria-labelledby="intro-title">
      <div className="intro-copy">
        <h1 id="intro-title"><span>DISCOVER</span><span>YOUR</span><span>DESIRE</span></h1>
        <p>Every drink opens another world.</p>
      </div>
      <div className="scroll-instruction" aria-label="Scroll to enter">
        <span>SCROLL TO ENTER</span>
        <span className="scroll-symbol" aria-hidden="true"><i /></span>
      </div>
    </header>
  );
}

const journeyEmotions = ["Temptation", "Provocation", "Desire", "Excess", "Power", "Obsession", "Authority", "Spark"];

function SiteNavigation({ openSection, onToggle, onClose, onHome, onJourneySelect }) {
  return (
    <nav className={`site-nav${openSection ? " is-expanded" : ""}`} aria-label="Main navigation">
      <div className="nav-capsule">
        <button className="brand-button organic-button" type="button" onClick={onHome} aria-label="The Sip — return to the beginning">
          <span className="brand-mark"><img src={sipLogo} alt="" /></span>
          <span>THE SIP</span>
        </button>
        <button className="nav-link organic-button" type="button" onClick={() => onToggle("journey")} aria-expanded={openSection === "journey"} aria-controls="journey-panel">JOURNEY</button>
        <button className="nav-link organic-button" type="button" onClick={() => onToggle("about")} aria-expanded={openSection === "about"} aria-controls="about-panel">ABOUT US</button>
      </div>

      <div className={`nav-drawer${openSection ? " is-open" : ""}`} aria-hidden={!openSection}>
        <div className="nav-drawer-top">
          <span>{openSection === "journey" ? "Choose your desire" : "About us"}</span>
          <button className="close-button organic-button" type="button" onClick={onClose} aria-label={`Close ${openSection ?? "navigation"}`}>×</button>
        </div>
        <div id="journey-panel" className={`drawer-view journey-view${openSection === "journey" ? " is-active" : ""}`}>
          <ol>
            {chapters.map((chapter, index) => (
              <li key={chapter.id}>
                <button type="button" onClick={() => onJourneySelect(chapter)}>
                  <span className="journey-number">{chapter.number}</span>
                  <span className="journey-name">{chapter.title}</span>
                  <span className="journey-emotion">{journeyEmotions[index]}</span>
                </button>
              </li>
            ))}
          </ol>
        </div>
        <section id="about-panel" className={`drawer-view about-view${openSection === "about" ? " is-active" : ""}`} aria-labelledby="about-title">
          <h2 id="about-title">THE SIP</h2>
          <p>An immersive journey through classic cocktails, their stories, recipes and the worlds they inspire.</p>
          <p>Built as a continuous visual experience where every cocktail opens another world.</p>
        </section>
      </div>
    </nav>
  );
}

function CocktailHud({ chapter, openPanel, onPanelToggle }) {
  if (!chapter) return <div className="cocktail-hud" aria-hidden="true" />;

  return (
    <aside className="cocktail-hud is-visible" aria-label={`${chapter.title} information`}>
      <div className="cocktail-label" aria-live="polite"><span>{chapter.number}</span><strong>{chapter.title}</strong></div>
      <div className="cocktail-actions">
        <div className={`info-control history-control${openPanel === "history" ? " is-open" : ""}`}>
          <button type="button" className="info-trigger organic-button" onClick={() => onPanelToggle("history")} aria-expanded={openPanel === "history"} aria-controls={`${chapter.id}-history-panel`}>HISTORY</button>
          <section id={`${chapter.id}-history-panel`} className="info-panel history-panel" aria-hidden={openPanel !== "history"} aria-labelledby={`${chapter.id}-history-title`}>
            <div className="panel-eyebrow"><span>{chapter.year}</span><span>{chapter.place}</span></div>
            <h2 id={`${chapter.id}-history-title`}>{chapter.historyTitle}</h2>
            <p>{chapter.history}</p>
          </section>
        </div>
        <div className={`info-control recipe-control${openPanel === "recipe" ? " is-open" : ""}`}>
          <button type="button" className="info-trigger organic-button" onClick={() => onPanelToggle("recipe")} aria-expanded={openPanel === "recipe"} aria-controls={`${chapter.id}-recipe-panel`}>RECIPE</button>
          <section id={`${chapter.id}-recipe-panel`} className="info-panel recipe-panel" aria-hidden={openPanel !== "recipe"} aria-labelledby={`${chapter.id}-recipe-title`}>
            <h2 id={`${chapter.id}-recipe-title`}>Ingredients</h2>
            <ol>{chapter.ingredients.map(([amount, ingredient]) => <li key={ingredient}><strong>{amount}</strong><span>{ingredient}</span></li>)}</ol>
            <div className="recipe-method"><p><b>Preparation</b>{chapter.preparation}</p>{chapter.serve ? <p><b>Serve</b>{chapter.serve}</p> : null}<p><b>Garnish</b>{chapter.garnish}</p></div>
          </section>
        </div>
      </div>
    </aside>
  );
}

function Ending({ layerRef, contentRef, onEnterAgain }) {
  return (
    <section className="ending-layer" ref={layerRef} aria-label="End of the journey">
      <div className="ending-content" ref={contentRef} aria-hidden="true">
        <h2>YOU FOUND<br />YOUR DESIRE.</h2>
        <p>But desire never really ends.</p>
        <button className="enter-again organic-button" type="button" onClick={onEnterAgain}>ENTER AGAIN</button>
      </div>
    </section>
  );
}

export function App() {
  const [openSection, setOpenSection] = useState(null);
  const [activeChapterId, setActiveChapterId] = useState(null);
  const [openPanel, setOpenPanel] = useState(null);
  const worldRef = useRef(null);
  const stageRef = useRef(null);
  const videoRef = useRef(null);
  const endingLayerRef = useRef(null);
  const endingContentRef = useRef(null);
  const scrollTriggerRef = useRef(null);
  const activeChapterRef = useRef(null);
  const panelSwapTimerRef = useRef(null);
  const targetTimeRef = useRef(0);
  const smoothTimeRef = useRef(0);
  const lastRequestedTimeRef = useRef(-1);
  const rafRef = useRef(null);
  const mediaReadyRef = useRef(false);
  const debugRef = useRef(null);
  const timingAudit = new URLSearchParams(window.location.search).has("timing-audit");
  const debugScroll = import.meta.env.DEV && new URLSearchParams(window.location.search).get("debugScroll") === "1";

  const scrollToTime = useCallback((time) => {
    const scrollTrigger = scrollTriggerRef.current;
    if (!scrollTrigger) return;
    const videoProgress = Math.min(1, Math.max(0, time / MASTER_VIDEO.measuredDuration));
    const pageProgress = videoProgress * VIDEO_PHASE_RATIO;
    const targetScroll = scrollTrigger.start + (scrollTrigger.end - scrollTrigger.start) * pageProgress;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: targetScroll, behavior: reduceMotion ? "auto" : "smooth" });
  }, []);

  const closeTransientUi = useCallback(() => {
    window.clearTimeout(panelSwapTimerRef.current);
    setOpenSection(null);
    setOpenPanel(null);
  }, []);

  const returnToBeginning = useCallback(() => {
    closeTransientUi();
    scrollToTime(0);
  }, [closeTransientUi, scrollToTime]);

  const togglePanel = useCallback((nextPanel) => {
    window.clearTimeout(panelSwapTimerRef.current);
    setOpenPanel((current) => {
      if (current === nextPanel) return null;
      if (current) {
        panelSwapTimerRef.current = window.setTimeout(() => setOpenPanel(nextPanel), 190);
        return null;
      }
      return nextPanel;
    });
  }, []);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key !== "Escape") return;
      closeTransientUi();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.clearTimeout(panelSwapTimerRef.current);
    };
  }, [closeTransientUi]);

  useLayoutEffect(() => {
    const world = worldRef.current;
    const stage = stageRef.current;
    const video = videoRef.current;
    const endingLayer = endingLayerRef.current;
    const endingContent = endingContentRef.current;
    if (!world || !stage || !video || !endingLayer || !endingContent) return undefined;
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
      const chapter = [...chapters].reverse().find((item) => targetTime >= item.chapterStart);

      if (debugRef.current) {
        debugRef.current.textContent = [
          `SCROLL PROGRESS  ${video.dataset.masterProgress ?? "0.0000"}`,
          `TARGET TIME      ${targetTime.toFixed(3)} s`,
          `ACTUAL TIME      ${video.currentTime.toFixed(3)} s`,
          `SEEK DIFFERENCE  ${(targetTime - video.currentTime).toFixed(3)} s`,
          `CURRENT CHAPTER  ${chapter?.title ?? "PORTAL INTRO"}`,
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

      const desiredTime = Math.min(MASTER_VIDEO.lastFrameTime, Math.max(0, smoothTimeRef.current));
      const requestedDelta = Math.abs(desiredTime - lastRequestedTimeRef.current);
      const mediaDelta = Math.abs(desiredTime - video.currentTime);
      const frameIntervalElapsed = timestamp - lastFrameTimestamp >= SEEK_INTERVAL_MS;

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
        const duration = MASTER_VIDEO.measuredDuration;
        const getHudChapter = (time) => {
          for (let index = 0; index < chapters.length; index += 1) {
            const chapter = chapters[index];
            const nextChapter = chapters[index + 1];
            const hudStart = chapter.heroReveal - 0.35;
            const hudEnd = Math.min(chapter.chapterEnd - 0.08, nextChapter ? nextChapter.heroReveal - 0.36 : chapter.chapterEnd - 0.08);
            if (time >= hudStart && time < hudEnd) return chapter;
          }
          return null;
        };
        const setActiveChapter = (time) => {
          const nextChapter = getHudChapter(time);
          const nextId = nextChapter?.id ?? null;
          if (nextId === activeChapterRef.current) return;
          activeChapterRef.current = nextId;
          setActiveChapterId(nextId);
          setOpenPanel(null);
          window.clearTimeout(panelSwapTimerRef.current);
        };
        const setVideoTarget = (progress) => {
          const value = Math.min(1, Math.max(0, progress));
          const nextTime = value === 1 ? MASTER_VIDEO.lastFrameTime : duration * value;
          targetTimeRef.current = nextTime;
          video.dataset.masterProgress = value.toFixed(4);
          video.dataset.masterTime = nextTime.toFixed(3);
          setActiveChapter(nextTime);
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
              const videoProgress = Math.min(1, self.progress / VIDEO_PHASE_RATIO);
              const endingProgress = Math.min(1, Math.max(0, (self.progress - VIDEO_PHASE_RATIO) / (1 - VIDEO_PHASE_RATIO)));
              setVideoTarget(videoProgress);
              endingLayer.style.opacity = String(endingProgress);
              const contentProgress = Math.min(1, Math.max(0, (endingProgress - 0.72) / 0.28));
              endingContent.style.opacity = String(contentProgress);
              endingContent.style.transform = `translateY(${(1 - contentProgress) * 18}px)`;
              endingContent.style.visibility = contentProgress > 0.02 ? "visible" : "hidden";
              endingContent.style.pointerEvents = contentProgress > 0.85 ? "auto" : "none";
              endingContent.setAttribute("aria-hidden", contentProgress > 0.85 ? "false" : "true");
            },
          },
        });
        scrollTriggerRef.current = timeline.scrollTrigger;
        timeline
          .to({}, { duration }, 0)
          .to(".scroll-instruction", { y: "-1.2rem", opacity: 0, duration: 1.35 }, 0.25)
          .to(".intro-copy", { y: "-7vh", opacity: 0, duration: 2.35 }, 1.05);

        const initializeVideo = () => {
          const progress = timeline.scrollTrigger?.progress ?? 0;
          const videoProgress = Math.min(1, progress / VIDEO_PHASE_RATIO);
          const initialTime = videoProgress === 1 ? MASTER_VIDEO.lastFrameTime : duration * videoProgress;
          mediaReadyRef.current = true;
          targetTimeRef.current = initialTime;
          smoothTimeRef.current = initialTime;
          lastRequestedTimeRef.current = initialTime;
          video.pause();
          recordSeek(initialTime);
          video.currentTime = Math.min(MASTER_VIDEO.lastFrameTime, initialTime);
          video.dataset.masterProgress = videoProgress.toFixed(4);
          video.dataset.masterTime = initialTime.toFixed(3);
          setActiveChapter(initialTime);
        };
        if (video.readyState >= 2) initializeVideo();
        else {
          video.addEventListener("loadeddata", initializeVideo, { once: true });
          removeMetadataListener = () => video.removeEventListener("loadeddata", initializeVideo);
        }
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
      scrollTriggerRef.current = null;
      context.revert();
    };
  }, []);

  const activeChapter = chapters.find((chapter) => chapter.id === activeChapterId) ?? null;

  return (
    <main className="experience">
      <section
        className={`scroll-world${timingAudit ? " timing-audit" : ""}`}
        ref={worldRef}
        aria-label="A continuous descent through eight cocktail worlds"
        data-portal-intro-start={experienceTiming.portalIntroStart}
        data-portal-intro-end={experienceTiming.portalIntroEnd}
        data-ending-start={experienceTiming.endingStart}
        data-black-frame-start={experienceTiming.blackFrameStart ?? "none"}
        data-video-end={experienceTiming.videoEnd}
        data-video-fps={MASTER_VIDEO.frameRate}
      >
        <div className="world-stage" ref={stageRef}>
          <div className="master-media" aria-hidden="true"><video ref={videoRef} src={MASTER_VIDEO.src} preload="auto" muted playsInline controls={false} tabIndex={-1} /></div>
          <IntroMoment />
          <SiteNavigation
            openSection={openSection}
            onToggle={(section) => { setOpenPanel(null); setOpenSection((current) => current === section ? null : section); }}
            onClose={() => setOpenSection(null)}
            onHome={returnToBeginning}
            onJourneySelect={(chapter) => { setOpenSection(null); setOpenPanel(null); scrollToTime(chapter.heroPeak); }}
          />
          <CocktailHud chapter={activeChapter} openPanel={openPanel} onPanelToggle={togglePanel} />
          <Ending layerRef={endingLayerRef} contentRef={endingContentRef} onEnterAgain={returnToBeginning} />
          {debugScroll ? <output className="scroll-debug" ref={debugRef} aria-live="off" /> : null}
        </div>
      </section>
    </main>
  );
}
