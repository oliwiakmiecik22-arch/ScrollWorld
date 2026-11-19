import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import Flip from "gsap/Flip";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import masterVideo from "../assets/video/cocktail-world-master-v2-scroll.mp4";
import mobileVideo from "../assets/video/delivery/cocktail-world-mobile-960.mp4";
import introPoster from "../assets/images/intro-poster.webp";
import negroniStill from "../assets/images/reduced-motion/negroni.webp";
import dirtyMartiniStill from "../assets/images/reduced-motion/dirty-martini.webp";
import margaritaStill from "../assets/images/reduced-motion/margarita.webp";
import maiTaiStill from "../assets/images/reduced-motion/mai-tai.webp";
import manhattanStill from "../assets/images/reduced-motion/manhattan.webp";
import espressoMartiniStill from "../assets/images/reduced-motion/espresso-martini.webp";
import oldFashionedStill from "../assets/images/reduced-motion/old-fashioned.webp";
import french75Still from "../assets/images/reduced-motion/french-75.webp";
import sipLogo from "../assets/brand/the-sip.svg";
import originalSipLogo from "../assets/brand/the-sip-legacy.svg";

import LiquidAfterimage from "./LiquidAfterimage";
import { Action, ArrowIcon, CloseIcon } from "./components/Action";
import { SiteNavigation as SharedNavigation } from "./components/SiteNavigation";

import { EndingContent } from "./components/EndingContent";
import { getChapterTargetTime, getEndingState, getExperienceMode, getPortalHandoffScale, selectExperienceVideo } from "./phase1";
import { MOTION, motionDistance } from "./motion/tokens";

gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(Flip);

const MASTER_VIDEO = {
  poster: introPoster,
  measuredDuration: 81,
  frameRate: 24,
  lastFrameTime: 80.958333,
};

const VIDEO_SOURCES = {
  desktop: masterVideo,
  mobile: mobileVideo,
};

const REDUCED_MOTION_STILLS = {
  negroni: negroniStill,
  "dirty-martini": dirtyMartiniStill,
  margarita: margaritaStill,
  "mai-tai": maiTaiStill,
  manhattan: manhattanStill,
  "espresso-martini": espressoMartiniStill,
  "old-fashioned": oldFashionedStill,
  "french-75": french75Still,
};

const SCROLL_LENGTH_VH = 38;
const VIDEO_LERP = 0.22;
const SEEK_THRESHOLD_SECONDS = 1 / 48;
const SEEK_INTERVAL_MS = 40;
const VIDEO_PHASE_RATIO = 0.94;
const AGE_CONFIRMATION_KEY = "the-sip-age-confirmed";

function useReducedMotion() {
  const [reduceMotion, setReduceMotion] = useState(() => window.matchMedia("(prefers-reduced-motion: reduce)").matches);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduceMotion(media.matches);
    media.addEventListener?.("change", update);
    return () => media.removeEventListener?.("change", update);
  }, []);

  return reduceMotion;
}

function hasAgeConfirmation() {
  try {
    return window.sessionStorage.getItem(AGE_CONFIRMATION_KEY) === "yes";
  } catch {
    return false;
  }
}

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
    history: [
      "The Negroni is commonly linked to Florence around 1919. The best-known account says Count Camillo Negroni asked bartender Fosco Scarselli at Caffè Casoni to make his Americano stronger by replacing its soda water with gin. It is a memorable origin story, but the surviving record is incomplete, so the date and details are best treated as tradition rather than certainty.",
      "The drink grew from an existing Italian aperitivo: the Americano, made with bitter liqueur, sweet vermouth and soda. That combination was already part of the bar culture of the period. The change in the Negroni story is small but decisive. Gin gives the drink a firmer spirit base, while the vermouth keeps its sweetness and the bitter liqueur holds the finish in balance.",
      "A second detail in the familiar story is the garnish. The new drink was said to arrive with an orange instead of the Americano’s lemon, giving the glass its own visual cue. The orange’s soft sweetness sits against the bitter, herbal centre of the drink; the garnish became part of the classic presentation that many bars still use.",
      "The recipe is remembered for its simple equal-parts structure: gin, bitter aperitivo and sweet vermouth. That proportion is easy to carry from one bar to another, but the ingredients still matter. A drier gin makes the botanicals more direct, while a richer vermouth softens the bitter edge. The finished drink is stirred cold and served over fresh ice.",
      "The Negroni’s place in cocktail culture did not depend on a single dramatic invention. Its appeal comes from a clear shape: bitter, sweet and strong in the same glass. The Florence story remains its most familiar beginning, while the gaps in the historical record leave room for caution. That tension between a vivid legend and an enduring formula is part of the drink’s character.",
    ],
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

const chapterThemes = {
  negroni: "light",
  "dirty-martini": "light",
  margarita: "dark",
  "mai-tai": "light",
  manhattan: "light",
  "espresso-martini": "dark",
  "old-fashioned": "dark",
  "french-75": "light",
};

const journeyEmotions = ["Temptation", "Provocation", "Desire", "Excess", "Power", "Obsession", "Authority", "Spark"];

const navigationChapters = chapters.map((chapter, index) => ({ ...chapter, emotion: journeyEmotions[index] }));

function SiteNavigation(props) {
  return <SharedNavigation {...props} logoSrc={sipLogo} aboutLogoSrc={originalSipLogo} chapters={navigationChapters} />;
}

function CosmicIntro({ onEnter, onHome, reduceMotion, selectedChapterId }) {
  const [openSection, setOpenSection] = useState(null);
  const [leaving, setLeaving] = useState(false);
  const [introReady, setIntroReady] = useState(false);
  const [touchStart, setTouchStart] = useState(null);
  const rootRef = useRef(null);

  useLayoutEffect(() => {
    const previousRootOverflow = document.documentElement.style.overflow;
    const previousBodyOverflow = document.body.style.overflow;
    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";
    const root = rootRef.current;
    const nav = root?.querySelector(".sip-navbar");
    const titleLines = [...(root?.querySelectorAll(".cosmic-intro-title span") ?? [])];
    const cta = root?.querySelector(".scroll-instruction");
    const poster = root?.querySelector(".cosmic-intro-video");
    let cancelled = false;
    setIntroReady(false);
    // Readiness describes real asset work, not the length of a decorative reveal.
    Promise.all([poster.decode().catch(() => {}), document.fonts.ready]).then(() => {
      if (!cancelled) setIntroReady(true);
    });
    gsap.set(nav, { clearProps: "all" });
    const tl = gsap.timeline({ defaults: { ease: "power2.out" } });
    if (reduceMotion) {
      gsap.set([poster, ...titleLines, cta], { clearProps: "all" });
    } else {
      // A visible headline from the first frame; small travel, no clipping or long blank wait.
      const travel = motionDistance(window.innerWidth, window.innerHeight);
      tl.fromTo(poster, { opacity: 0.19 }, { opacity: 1, duration: MOTION.cinematic, clearProps: "opacity" }, 0)
        .fromTo(titleLines, { opacity: 0.3, y: travel / 2 }, { opacity: 1, y: 0, duration: MOTION.panel, clearProps: "all" }, 0.06)
        .fromTo(cta, { opacity: 0.35 }, { opacity: 1, duration: MOTION.content, clearProps: "opacity" }, 0.22);
    }
    return () => {
      cancelled = true;
      tl.kill();
      document.documentElement.style.overflow = previousRootOverflow;
      document.body.style.overflow = previousBodyOverflow;
    };
  }, [reduceMotion]);

  const enter = useCallback((chapter = null) => {
    if (!introReady || leaving) return;
    setLeaving(true);
    setOpenSection(null);
    const root = rootRef.current;
    if (reduceMotion || !root) {
      onEnter(chapter?.id ?? null);
      return;
    }
    const travel = motionDistance(window.innerWidth, window.innerHeight);
    gsap.timeline({ onComplete: () => onEnter(chapter?.id ?? null) })
      .to(root.querySelector(".scroll-instruction"), { opacity: 0, y: travel / 2, duration: MOTION.content, ease: MOTION.easeInOut })
      .to(root.querySelector(".cosmic-intro-title"), { opacity: 0, y: -travel, duration: MOTION.close, ease: MOTION.easeInOut }, "<")
      .to(root.querySelector(".sip-navbar"), { opacity: 0, duration: MOTION.content, ease: MOTION.easeInOut }, "<0.04");
  }, [introReady, leaving, onEnter, reduceMotion]);

  const onWheel = (event) => {
    if (openSection || event.target.closest(".sip-navbar__drawer")) return;
    if (event.deltaY > 6 && !leaving) {
      event.preventDefault();
      enter();
    }
  };
  const onTouchStart = (event) => {
    if (openSection || event.target.closest(".sip-navbar__drawer")) return;
    setTouchStart(event.touches[0]?.clientY ?? null);
  };
  const onTouchEnd = (event) => {
    if (openSection || event.target.closest(".sip-navbar__drawer")) return;
    const end = event.changedTouches[0]?.clientY;
    if (touchStart !== null && end !== undefined && touchStart - end > 30) enter();
    setTouchStart(null);
  };

  return (
    <main ref={rootRef} className={`cosmic-intro${leaving ? " is-leaving" : ""}`} aria-label="Discover your desire" onWheel={onWheel} onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
      <img className="cosmic-intro-video" src={MASTER_VIDEO.poster} alt="" aria-hidden="true" />

      <SiteNavigation
        openSection={openSection}
        theme="dark"
        variant="hero"
        selectedChapterId={selectedChapterId}
        onToggle={(section) => setOpenSection((current) => current === section ? null : section)}
        onClose={() => setOpenSection(null)}
        onHome={onHome}
        onJourneySelect={(chapter) => enter(chapter)}
      />
      <div className="intro-editorial">
        <h1 className="cosmic-intro-title" aria-label="DISCOVER YOUR DESIRE"><span>DISCOVER</span><span>YOUR</span><span>DESIRE</span></h1>
        <div className="cosmic-intro-handwriting" aria-hidden="true" hidden />
      </div>
      <Action className="scroll-instruction sip-scroll-action" variant="text" aria-label={introReady ? "Scroll to enter the journey" : "Preparing your journey"} onClick={enter} loading={!introReady} loadingLabel="PREPARING YOUR JOURNEY" disabled={leaving}>
        SCROLL TO ENTER <ArrowIcon direction="down" />
      </Action>
    </main>
  );
}

function CocktailHud({ chapter: currentChapter, openPanel, modalActive, onPanelToggle, onKeyDown, hudRef }) {
  const touchStartYRef = useRef(null);
  const [lastChapter, setLastChapter] = useState(currentChapter);
  const chapter = currentChapter ?? lastChapter;
  const useMotionLayoutEffect = typeof window === "undefined" ? useEffect : useLayoutEffect;
  useMotionLayoutEffect(() => {
    if (currentChapter) setLastChapter(currentChapter);
    const root = hudRef.current;
    if (!root || !chapter) return undefined;
    const media = gsap.matchMedia();
    media.add({ reduce: "(prefers-reduced-motion: reduce)", full: "(prefers-reduced-motion: no-preference)" }, (context) => {
      if (context.conditions.reduce) {
        gsap.set([root, ...root.querySelectorAll(".cocktail-label > *, .info-trigger, .info-panel")], { clearProps: "opacity,transform" });
        if (!currentChapter) setLastChapter(null);
        return;
      }
      if (!currentChapter) {
        gsap.to(root, { opacity: 0, duration: MOTION.fast, ease: MOTION.easeInOut, onComplete: () => setLastChapter(null) });
      } else if (openPanel) {
        gsap.fromTo(root.querySelector(".info-control.is-open .info-panel"), { opacity: .3, y: 3 }, { opacity: 1, y: 0, duration: MOTION.content, ease: MOTION.ease, clearProps: "opacity,transform" });
      } else {
        gsap.fromTo(root.querySelectorAll(".cocktail-label > *, .info-trigger"), { opacity: .4, y: motionDistance(window.innerWidth, window.innerHeight) }, { opacity: 1, y: 0, stagger: .035, duration: MOTION.content, ease: MOTION.ease, clearProps: "opacity,transform" });
      }
    });
    return () => media.revert();
  }, [currentChapter?.id, openPanel]);
  const isNegroni = chapter?.id === "negroni";
  if (!chapter) return <div className="cocktail-hud" aria-hidden="true" />;
  const theme = chapterThemes[chapter.id] ?? "dark";
  const handlePanelWheel = (event) => {
    if (event.deltaY < 0 && event.currentTarget.scrollTop <= 0) {
      event.preventDefault();
      onPanelToggle(null);
    }
  };
  const handleTouchStart = (event) => { touchStartYRef.current = event.touches[0]?.clientY ?? null; };
  const handleTouchEnd = (event) => {
    const endY = event.changedTouches[0]?.clientY;
    if (touchStartYRef.current !== null && endY - touchStartYRef.current > 48 && event.currentTarget.scrollTop <= 0) onPanelToggle(null);
    touchStartYRef.current = null;
  };

  return (
    <aside ref={hudRef} className={`cocktail-hud is-visible theme-${theme}${isNegroni && openPanel ? " negroni-prototype" : ""}${openPanel ? " is-expanded" : ""}`} inert={!currentChapter ? "" : undefined} aria-hidden={!currentChapter ? "true" : undefined} role={modalActive ? "dialog" : undefined} aria-modal={modalActive ? "true" : undefined} aria-labelledby={`${chapter.id}-cocktail-name`} onKeyDown={onKeyDown}>
      <div className="cocktail-label" aria-live="polite">
        {openPanel ? <>
          <p className="cocktail-meta"><span>{chapter.number} / 08</span>{!isNegroni ? <><span aria-hidden="true">—</span><span>{chapter.emotion}</span></> : null}</p>
          <strong id={`${chapter.id}-cocktail-name`}>{chapter.title}</strong>
          {isNegroni ? <p className="negroni-emotion">{chapter.emotion}</p> : null}
        </> : <>
          <p className="cocktail-meta"><span>{chapter.number} / 08</span></p>
          <strong id={`${chapter.id}-cocktail-name`}>{chapter.title}</strong>
          <p className="cocktail-emotion">{chapter.emotion}</p>
        </>}
      </div>
      {openPanel ? (
        <>
          <div className="panel-tabs" role="group" aria-label="Cocktail details">
            <Action size="compact" selected={openPanel === "history"} onClick={() => { if (openPanel !== "history") onPanelToggle("history"); }}>HISTORY</Action>
            <Action size="compact" selected={openPanel === "recipe"} onClick={() => { if (openPanel !== "recipe") onPanelToggle("recipe"); }}>RECIPE</Action>
          </div>
          <Action variant="close" className="panel-back sip-panel-close" onClick={(event) => onPanelToggle(null, event.currentTarget)} aria-label="Close details and return to the cocktail scene"><CloseIcon /><span>Close</span></Action>
        </>
      ) : null}
      <div className="cocktail-actions">
        <div data-sip-control="information" className={`info-control history-control${openPanel === "history" ? " is-open" : ""}`}>
          <Action size="fill" className="info-trigger" onClick={(event) => onPanelToggle("history", event.currentTarget)} aria-expanded={openPanel === "history"} aria-controls={`${chapter.id}-history-panel`}>HISTORY</Action>
          <section id={`${chapter.id}-history-panel`} className="info-panel history-panel" aria-hidden={openPanel !== "history"} aria-labelledby={`${chapter.id}-history-title`} onWheel={handlePanelWheel} onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd}>
            <div className="panel-eyebrow"><span>{chapter.year}</span><span>{chapter.place}</span></div>
            <h2 id={`${chapter.id}-history-title`}>The history</h2>
            <h3>{chapter.historyTitle}</h3>
            <div className="history-copy">{(Array.isArray(chapter.history) ? chapter.history : [chapter.history]).map((paragraph, index) => <p key={paragraph} className={isNegroni && index === 0 ? "negroni-lead" : undefined}>{paragraph}</p>)}</div>
          </section>
        </div>
        <div data-sip-control="information" className={`info-control recipe-control${openPanel === "recipe" ? " is-open" : ""}`}>
          <Action size="fill" className="info-trigger" onClick={(event) => onPanelToggle("recipe", event.currentTarget)} aria-expanded={openPanel === "recipe"} aria-controls={`${chapter.id}-recipe-panel`}>RECIPE</Action>
          <section id={`${chapter.id}-recipe-panel`} className="info-panel recipe-panel" aria-hidden={openPanel !== "recipe"} aria-labelledby={`${chapter.id}-recipe-title`} onWheel={handlePanelWheel} onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd}>
            <div className="panel-eyebrow"><span>THE POUR</span><span>{chapter.number} / 08</span></div>
            {isNegroni ? <h3 className="negroni-recipe-lead">{chapter.recipeTitle}</h3> : null}
            <div className="recipe-layout">
              <div className="recipe-ingredients">
                <h2 id={`${chapter.id}-recipe-title`}>Ingredients</h2>
                <ol>{chapter.ingredients.map(([amount, ingredient]) => <li key={ingredient}><strong>{amount}</strong><span>{ingredient}</span></li>)}</ol>
              </div>
              <div className="recipe-method"><p><b>Preparation</b>{chapter.preparation}</p>{chapter.serve ? <p><b>Serve</b>{chapter.serve}</p> : null}<p><b>Garnish</b>{chapter.garnish}</p></div>
            </div>
          </section>
        </div>
      </div>
    </aside>
  );
}

function Ending({ layerRef, contentRef, onEnterAgain }) {
  return (
    <section className="ending-layer" ref={layerRef} aria-label="End of the journey" aria-hidden="true" inert="">
      <EndingContent contentRef={contentRef} onEnterAgain={onEnterAgain} logoSrc={sipLogo} />
    </section>
  );
}

function CinematicExperience({ onReturnToIntro, initialChapterId = null, onChapterChange, onMediaError }) {
  const [openSection, setOpenSection] = useState(null);
  const [activeChapterId, setActiveChapterId] = useState(null);
  const [openPanel, setOpenPanel] = useState(null);
  const [panelModalActive, setPanelModalActive] = useState(false);
  const [videoSource] = useState(() => selectExperienceVideo({
    viewportWidth: window.innerWidth,
    saveData: navigator.connection?.saveData === true,
  }, VIDEO_SOURCES));
  const hudRef = useRef(null);
  const pendingPanelFlipRef = useRef(null);
  const panelFlipRef = useRef(null);
  const panelLockedRef = useRef(false);
  const panelOpenRef = useRef(false);
  const panelScrollYRef = useRef(0);
  const lastPanelTriggerRef = useRef(null);
  const pageOverflowRef = useRef(null);
  const worldRef = useRef(null);
  const stageRef = useRef(null);
  const videoRef = useRef(null);
  const endingLayerRef = useRef(null);
  const endingContentRef = useRef(null);
  const heroHeadingRef = useRef(null);
  const scrollTriggerRef = useRef(null);
  const activeChapterRef = useRef(null);
  const targetTimeRef = useRef(0);
  const smoothTimeRef = useRef(0);
  const lastRequestedTimeRef = useRef(-1);
  const rafRef = useRef(null);
  const resumeVideoControllerRef = useRef(null);
  const mediaReadyRef = useRef(false);
  const debugRef = useRef(null);
  useLayoutEffect(() => {
    const video = videoRef.current;
    // Same breakpoint/crop as the approved immersive Intro. Pin geometry stays
    // untouched: only the incoming media matches the outgoing media's framing.
    const desktopIntro = window.matchMedia("(min-width: 1100px) and (min-height: 600px)");
    const syncFraming = () => {
      const scale = getPortalHandoffScale(video.currentTime, desktopIntro.matches ? 1.2 : 1);
      video.style.transform = scale === 1 ? "none" : `scale(${scale})`;
    };
    syncFraming();
    video.addEventListener("loadeddata", syncFraming);
    video.addEventListener("seeked", syncFraming);
    desktopIntro.addEventListener("change", syncFraming);
    return () => {
      video.removeEventListener("loadeddata", syncFraming);
      video.removeEventListener("seeked", syncFraming);
      desktopIntro.removeEventListener("change", syncFraming);
      video.style.removeProperty("transform");
    };
  }, []);
  const timingAudit = new URLSearchParams(window.location.search).has("timing-audit");
  const debugScroll = import.meta.env.DEV && new URLSearchParams(window.location.search).get("debugScroll") === "1";

  const scrollToTime = useCallback((time, behavior = "smooth") => {
    const scrollTrigger = scrollTriggerRef.current;
    if (!scrollTrigger) return;
    const videoProgress = Math.min(1, Math.max(0, time / MASTER_VIDEO.measuredDuration));
    const pageProgress = videoProgress * VIDEO_PHASE_RATIO;
    const targetScroll = scrollTrigger.start + (scrollTrigger.end - scrollTrigger.start) * pageProgress;
    window.scrollTo({ top: targetScroll, behavior });
  }, []);

  const togglePanel = useCallback((nextPanel, trigger) => {
    const hud = hudRef.current;
    const shouldClose = !nextPanel || openPanel === nextPanel;
    if (shouldClose && !openPanel) return;

    panelFlipRef.current?.kill();
    panelFlipRef.current = null;
    const changesFrame = !openPanel || shouldClose;
    pendingPanelFlipRef.current = null;
    if (changesFrame && hud) {
      pendingPanelFlipRef.current = {
        state: Flip.getState(hud),
        opening: !shouldClose && !openPanel,
        closing: shouldClose,
      };
    }

    if (shouldClose) {
      setOpenPanel(null);
      return;
    }

    if (!panelLockedRef.current) {
      panelScrollYRef.current = window.scrollY;
      const scrollbarWidth = Math.max(0, window.innerWidth - document.documentElement.clientWidth);
      pageOverflowRef.current = {
        root: document.documentElement.style.overflow,
        body: document.body.style.overflow,
        bodyPaddingRight: document.body.style.paddingRight,
      };
      panelLockedRef.current = true;
      panelOpenRef.current = true;
      if (scrollbarWidth) {
        const currentPadding = Number.parseFloat(getComputedStyle(document.body).paddingRight) || 0;
        document.body.style.paddingRight = `${currentPadding + scrollbarWidth}px`;
      }
      document.documentElement.style.overflow = "hidden";
      document.body.style.overflow = "hidden";
      const video = videoRef.current;
      if (video) {
        if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
        targetTimeRef.current = video.currentTime;
        smoothTimeRef.current = video.currentTime;
        lastRequestedTimeRef.current = video.currentTime;
      }
      setPanelModalActive(true);
    }
    if (!openPanel) lastPanelTriggerRef.current = trigger ?? null;
    setOpenPanel(nextPanel);
  }, [openPanel]);

  const closeTransientUi = useCallback(() => {
    setOpenSection(null);
    if (openPanel) togglePanel(null);
  }, [openPanel, togglePanel]);

  const returnToBeginning = useCallback(() => {
    closeTransientUi();
    onReturnToIntro();
  }, [closeTransientUi, onReturnToIntro]);

  const handlePanelKeyDown = useCallback((event) => {
    if (!panelModalActive || event.key !== "Tab") return;
    const focusable = [...(hudRef.current?.querySelectorAll("button:not(:disabled), a[href], [tabindex]:not([tabindex='-1'])") ?? [])]
      .filter((element) => element.getClientRects().length > 0 && !element.closest("[aria-hidden='true']"));
    if (!focusable.length) return;
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  }, [panelModalActive]);

  useLayoutEffect(() => {
    const hud = hudRef.current;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const pending = pendingPanelFlipRef.current;
    pendingPanelFlipRef.current = null;

    if (openPanel) {
      hud?.querySelector(`.panel-tabs button[aria-pressed='true']`)?.focus({ preventScroll: true });
    }

    const finishClose = () => {
      if (!panelLockedRef.current) return;
      const overflow = pageOverflowRef.current;
      if (overflow) {
        document.documentElement.style.overflow = overflow.root;
        document.body.style.overflow = overflow.body;
        document.body.style.paddingRight = overflow.bodyPaddingRight;
        pageOverflowRef.current = null;
      }
      panelLockedRef.current = false;
      panelOpenRef.current = false;
      setPanelModalActive(false);
      window.scrollTo({ top: panelScrollYRef.current, behavior: "auto" });
      ScrollTrigger.update();
      resumeVideoControllerRef.current?.();
      lastPanelTriggerRef.current?.focus({ preventScroll: true });
    };

    if (!pending || !hud) {
      if (!openPanel && panelLockedRef.current) finishClose();
      return;
    }

    if (reduceMotion) {
      if (pending.closing) finishClose();
      return;
    }

    panelFlipRef.current = Flip.from(pending.state, {
        duration: pending.opening ? MOTION.panel : MOTION.close,
        ease: "power2.inOut",
        absolute: true,
        scale: true,
        onComplete: () => {
          panelFlipRef.current = null;
          if (pending.closing) finishClose();
        },
      });
  }, [openPanel]);

  useEffect(() => () => {
    panelFlipRef.current?.kill();
    panelFlipRef.current = null;
    if (panelLockedRef.current) {
      const overflow = pageOverflowRef.current;
      if (overflow) {
        document.documentElement.style.overflow = overflow.root;
        document.body.style.overflow = overflow.body;
        document.body.style.paddingRight = overflow.bodyPaddingRight;
        pageOverflowRef.current = null;
      }
      panelLockedRef.current = false;
      panelOpenRef.current = false;
    }
  }, []);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key !== "Escape") return;
      closeTransientUi();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [closeTransientUi]);

  useEffect(() => {
    if (!document.fonts?.ready) return undefined;
    let cancelled = false;
    document.fonts.ready.then(() => {
      if (!cancelled) ScrollTrigger.refresh();
    });
    return () => { cancelled = true; };
  }, []);

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
    resumeVideoControllerRef.current = startVideoController;

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
              if (panelOpenRef.current) return;
              debugScrollVelocity = self.getVelocity();
              const videoProgress = Math.min(1, self.progress / VIDEO_PHASE_RATIO);
              const endingProgress = Math.min(1, Math.max(0, (self.progress - VIDEO_PHASE_RATIO) / (1 - VIDEO_PHASE_RATIO)));
              setVideoTarget(videoProgress);
              endingLayer.style.opacity = String(endingProgress);
              const contentProgress = Math.min(1, Math.max(0, (endingProgress - 0.72) / 0.28));
              const endingState = getEndingState(contentProgress);
              const endingButton = endingContent.querySelector(".enter-again");
              endingContent.style.opacity = String(contentProgress);
              endingContent.style.transform = `translateY(${(1 - contentProgress) * 18}px)`;
              endingContent.style.visibility = endingState.visible ? "visible" : "hidden";
              endingContent.style.pointerEvents = endingState.visible ? "auto" : "none";
              endingLayer.style.pointerEvents = endingState.visible ? "auto" : "none";
              if (!endingState.visible && endingLayer.contains(document.activeElement)) {
                heroHeadingRef.current?.focus({ preventScroll: true });
              }
              endingLayer.setAttribute("aria-hidden", String(endingState.ariaHidden));
              endingLayer.toggleAttribute("inert", endingState.inert);
              endingContent.setAttribute("aria-hidden", String(endingState.ariaHidden));
              endingContent.toggleAttribute("inert", endingState.inert);
              if (endingButton) endingButton.tabIndex = endingState.tabIndex;
            },
          },
        });
        scrollTriggerRef.current = timeline.scrollTrigger;
        timeline.to({}, { duration }, 0);

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
      resumeVideoControllerRef.current = null;
      if (pageOverflowRef.current) {
        document.documentElement.style.overflow = pageOverflowRef.current.root;
        document.body.style.overflow = pageOverflowRef.current.body;
        document.body.style.paddingRight = pageOverflowRef.current.bodyPaddingRight;
        pageOverflowRef.current = null;
      }
      panelLockedRef.current = false;
      panelOpenRef.current = false;
      scrollTriggerRef.current = null;
      context.revert();
    };
  }, []);

  const activeChapter = chapters.find((chapter) => chapter.id === activeChapterId) ?? null;
  useEffect(() => {
    if (activeChapterId) onChapterChange?.(activeChapterId);
  }, [activeChapterId, onChapterChange]);
  useEffect(() => {
    heroHeadingRef.current?.focus({ preventScroll: true });
  }, []);

  useEffect(() => {
    if (!initialChapterId) return undefined;
    const chapter = chapters.find((item) => item.id === initialChapterId);
    if (!chapter) return undefined;
    const frame = requestAnimationFrame(() => scrollToTime(getChapterTargetTime(chapter), "auto"));
    return () => cancelAnimationFrame(frame);
  }, [initialChapterId, scrollToTime]);

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
        data-video-variant={videoSource === VIDEO_SOURCES.mobile ? "mobile" : "desktop"}
      >
        <div className="world-stage" ref={stageRef}>
          <div className="master-media" aria-hidden="true"><video ref={videoRef} src={videoSource} poster={MASTER_VIDEO.poster} preload="auto" muted playsInline controls={false} tabIndex={-1} onError={onMediaError} /></div>
          <h1 ref={heroHeadingRef} tabIndex={-1} className="experience-focus-target">Cinematic cocktail journey</h1>
          <SiteNavigation
            openSection={openSection}
            theme={activeChapter ? chapterThemes[activeChapter.id] : "dark"}
            variant="scene"
            modalOpen={panelModalActive}
            currentChapterId={activeChapterId}
            onToggle={(section) => { setOpenPanel(null); setOpenSection((current) => current === section ? null : section); }}
            onClose={() => setOpenSection(null)}
            onHome={returnToBeginning}
            onJourneySelect={(chapter) => { setOpenSection(null); setOpenPanel(null); scrollToTime(getChapterTargetTime(chapter)); }}
          />

          <CocktailHud chapter={activeChapter} openPanel={openPanel} modalActive={panelModalActive} onPanelToggle={togglePanel} onKeyDown={handlePanelKeyDown} hudRef={hudRef} />
          <Ending layerRef={endingLayerRef} contentRef={endingContentRef} onEnterAgain={returnToBeginning} />
          {debugScroll ? <output className="scroll-debug" ref={debugRef} aria-live="off" /> : null}
        </div>
      </section>
    </main>
  );
}

function ReducedMotionExperience({ onReturnToIntro, initialChapterId = null, onChapterChange, mediaFallback = false }) {
  const initialIndex = Math.max(0, chapters.findIndex((chapter) => chapter.id === initialChapterId));
  const [activeIndex, setActiveIndex] = useState(initialIndex);
  const [openSection, setOpenSection] = useState(null);
  const [openPanel, setOpenPanel] = useState(null);
  const [showEnding, setShowEnding] = useState(false);
  const hudRef = useRef(null);
  const headingRef = useRef(null);
  const endingHeadingRef = useRef(null);
  const lastPanelTriggerRef = useRef(null);
  const chapter = chapters[activeIndex];
  const panelOpen = Boolean(openPanel);
  useEffect(() => {
    onChapterChange?.(chapter.id);
  }, [chapter.id, onChapterChange]);

  const closePanel = useCallback(() => setOpenPanel(null), []);
  const togglePanel = useCallback((nextPanel, trigger) => {
    if (!nextPanel || openPanel === nextPanel) {
      closePanel();
      return;
    }
    if (!openPanel) lastPanelTriggerRef.current = trigger ?? null;
    setOpenPanel(nextPanel);
  }, [closePanel, openPanel]);

  useLayoutEffect(() => {
    if (openPanel) hudRef.current?.querySelector(`.panel-tabs button[aria-pressed='true']`)?.focus({ preventScroll: true });
  }, [openPanel]);

  useEffect(() => {
    if (!panelOpen) return undefined;
    const previousRootOverflow = document.documentElement.style.overflow;
    const previousBodyOverflow = document.body.style.overflow;
    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        event.preventDefault();
        closePanel();
        return;
      }
      if (event.key !== "Tab") return;
      const focusable = [...(hudRef.current?.querySelectorAll("button:not(:disabled), a[href], [tabindex]:not([tabindex='-1'])") ?? [])]
        .filter((element) => element.getClientRects().length > 0 && !element.closest("[aria-hidden='true']"));
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.documentElement.style.overflow = previousRootOverflow;
      document.body.style.overflow = previousBodyOverflow;
      requestAnimationFrame(() => lastPanelTriggerRef.current?.focus({ preventScroll: true }));
    };
  }, [closePanel, panelOpen]);

  useEffect(() => {
    // Let the closing drawer restore its trigger first, then focus the destination.
    const frame = requestAnimationFrame(() => {
      const heading = showEnding ? endingHeadingRef.current : headingRef.current;
      heading?.focus({ preventScroll: true });
    });
    return () => cancelAnimationFrame(frame);
  }, [activeIndex, showEnding]);

  const selectChapter = (selectedChapter) => {
    const nextIndex = chapters.findIndex((item) => item.id === selectedChapter.id);
    if (nextIndex < 0) return;
    setOpenSection(null);
    setOpenPanel(null);
    setShowEnding(false);
    setActiveIndex(nextIndex);
  };

  return (
    <main className="experience reduced-motion-experience" data-reduced-motion="true">
      <section className={`reduced-motion-stage theme-${chapterThemes[chapter.id]}`} aria-label="Reduced-motion cocktail journey">
        {!showEnding ? <>
          <img className="reduced-motion-still" src={REDUCED_MOTION_STILLS[chapter.id]} alt="" aria-hidden="true" />
          <div className="reduced-motion-vignette" aria-hidden="true" />
          <h1 ref={headingRef} className="experience-focus-target" tabIndex={-1}>{chapter.title}: {mediaFallback ? "Video unavailable. Still-image cocktail journey" : "reduced-motion cocktail journey"}</h1>
        </> : null}
        <SiteNavigation
          openSection={openSection}
          theme={chapterThemes[chapter.id]}
          variant="scene"
          modalOpen={panelOpen}
          currentChapterId={chapter.id}
          onToggle={(section) => setOpenSection((current) => current === section ? null : section)}
          onClose={() => setOpenSection(null)}
          onHome={onReturnToIntro}
          onJourneySelect={selectChapter}
        />
        {showEnding ? (
          <section className="ending-layer is-static" aria-label="End of the journey">
            <EndingContent staticMode headingRef={endingHeadingRef} onEnterAgain={onReturnToIntro} logoSrc={sipLogo} />
          </section>
        ) : <>

          <div className="reduced-motion-controls" inert={panelOpen ? "" : undefined}>
            <Action size="compact" onClick={() => setActiveIndex((index) => Math.max(0, index - 1))} disabled={activeIndex === 0}>PREVIOUS</Action>
            <p><span>{chapter.number} / 08</span><strong>{chapter.emotion}</strong></p>
            <Action size="compact" onClick={() => activeIndex === chapters.length - 1 ? setShowEnding(true) : setActiveIndex((index) => index + 1)}>{activeIndex === chapters.length - 1 ? "FINISH" : "NEXT"}</Action>
          </div>
          <CocktailHud chapter={chapter} openPanel={openPanel} modalActive={panelOpen} onPanelToggle={togglePanel} onKeyDown={() => {}} hudRef={hudRef} />
        </>}
      </section>
    </main>
  );
}

export function App() {
  const [screen, setScreen] = useState(() => hasAgeConfirmation() ? "intro" : "gate");
  const [gatePhase, setGatePhase] = useState("entering");
  const [gateNavigation, setGateNavigation] = useState(null);
  const [selectedChapterId, setSelectedChapterId] = useState(null);
  const [mediaFailed, setMediaFailed] = useState(false);
  // A ref hands state across motion-mode remounts without retargeting the scroll controller.
  const lastActiveChapterRef = useRef(null);
  const rememberChapter = useCallback((id) => { lastActiveChapterRef.current = id; }, []);
  const reduceMotion = useReducedMotion();
  const experienceMode = getExperienceMode(reduceMotion || mediaFailed);
  const gateRef = useRef(null);
  const questionRef = useRef(null);
  const actionsRef = useRef(null);
  const yesButtonRef = useRef(null);
  const deniedHeadingRef = useRef(null);

  useEffect(() => {
    if (screen !== "gate") return undefined;
    if (reduceMotion) {
      setGatePhase("ready");
      return undefined;
    }
    const timeline = gsap.timeline({ defaults: { ease: "power3.out" } });
    timeline.fromTo(questionRef.current, { y: motionDistance(window.innerWidth, window.innerHeight) / 2, opacity: 0.5 }, { y: 0, opacity: 1, duration: MOTION.panel });
    timeline.fromTo(actionsRef.current, { opacity: 0.5 }, { opacity: 1, duration: MOTION.content, onStart: () => setGatePhase("ready") }, 0.1);
    return () => timeline.kill();
  }, [reduceMotion, screen]);

  useEffect(() => {
    if (screen === "gate") questionRef.current?.focus({ preventScroll: true });
    if (screen === "denied") deniedHeadingRef.current?.focus({ preventScroll: true });
  }, [screen]);

  useLayoutEffect(() => {
    if (screen !== "denied") return undefined;
    const media = gsap.matchMedia();
    media.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.fromTo(deniedHeadingRef.current?.parentElement, { opacity: .4, y: motionDistance(window.innerWidth, window.innerHeight) / 2 }, { opacity: 1, y: 0, duration: MOTION.content, ease: MOTION.ease, clearProps: "opacity,transform" });
    });
    return () => media.revert();
  }, [screen]);

  const confirmAge = () => {
    if (gatePhase !== "ready") return;
    try {
      window.sessionStorage.setItem(AGE_CONFIRMATION_KEY, "yes");
    } catch {}
    if (reduceMotion) {
      setScreen("intro");
      return;
    }
    setGatePhase("exiting");
    gsap.timeline({ onComplete: () => setScreen("intro") })
      .to(actionsRef.current, { y: -motionDistance(window.innerWidth, window.innerHeight) / 2, opacity: 0, duration: MOTION.content, ease: MOTION.easeInOut })
      .to(questionRef.current, { y: -motionDistance(window.innerWidth, window.innerHeight), opacity: 0, duration: MOTION.close, ease: MOTION.easeInOut }, "<");
  };

  const denyAge = () => {
    setGatePhase("exiting");
    if (reduceMotion) {
      setScreen("denied");
      return;
    }
    gsap.timeline({ onComplete: () => setScreen("denied") })
      .to(actionsRef.current, { opacity: 0, y: 8, duration: 0.2, ease: "power1.in" })
      .to(questionRef.current, { opacity: 0, y: -10, duration: 0.25, ease: "power1.in" }, "<")
      .to(gateRef.current, { opacity: 0, duration: 0.22 }, "<0.04");
  };

  const enterExperience = (chapterId = null) => {
    if (chapterId) setSelectedChapterId(chapterId);
    setScreen("experience");
  };
  const returnToIntro = () => {
    lastActiveChapterRef.current = null;
    setMediaFailed(false);
    setSelectedChapterId(null);
    setScreen("intro");
  };
  const returnToAgeGate = () => {
    setGateNavigation(null);
    setGatePhase("entering");
    setScreen("gate");
  };

  if (screen === "experience") {
    const ExperienceComponent = experienceMode === "reduced" ? ReducedMotionExperience : CinematicExperience;
    return <><ExperienceComponent initialChapterId={lastActiveChapterRef.current ?? selectedChapterId} onReturnToIntro={returnToIntro} onChapterChange={rememberChapter} onMediaError={() => setMediaFailed(true)} mediaFallback={mediaFailed} /><LiquidAfterimage /></>;
  }
  if (screen === "intro") return <><CosmicIntro onEnter={(chapterId) => enterExperience(chapterId ?? selectedChapterId)} onHome={returnToIntro} reduceMotion={reduceMotion} selectedChapterId={selectedChapterId} /><LiquidAfterimage /></>;

  return (
    <>
      {screen === "gate" ? (
        <main key="age-check" className={`age-gate-screen${gatePhase === "exiting" ? " is-exiting" : ""}`} ref={gateRef}>
          <img className="age-gate-environment" src={MASTER_VIDEO.poster} alt="" aria-hidden="true" />
          <LiquidAfterimage />
          <SiteNavigation
            openSection={gateNavigation}
            theme="dark"
            variant="age"
            selectedChapterId={selectedChapterId}
            onToggle={(section) => setGateNavigation((current) => current === section ? null : section)}
            onClose={() => setGateNavigation(null)}
            onHome={() => setGateNavigation(null)}
            onJourneySelect={(chapter) => { setSelectedChapterId(chapter.id); setGateNavigation(null); }}
          />
          <section className="age-gate-content" aria-labelledby="age-gate-title">
            <div className="age-gate-prompt">
              <h1 id="age-gate-title" ref={questionRef} tabIndex={-1} aria-describedby="age-gate-explanation">
                <span>ARE YOU OF</span>
                <span>LEGAL AGE?</span>
              </h1>
            </div>
            <div className="age-gate-decision">
              <p className="age-gate-note" id="age-gate-explanation">This cocktail journey is for visitors of legal drinking age in their country.</p>
              <div className="age-gate-actions" ref={actionsRef}>
                <Action ref={yesButtonRef} variant="primary" className="sip-action--age" onClick={confirmAge} disabled={gatePhase !== "ready"} aria-label="Yes, I am of legal age">YES</Action>
                <Action variant="secondary" className="sip-action--age" onClick={denyAge} disabled={gatePhase !== "ready"} aria-label="No, I am not of legal age">NO</Action>
              </div>
            </div>
          </section>
        </main>
      ) : (
        <main key="access-denied" className="access-denied-screen" aria-labelledby="access-denied-title">
          <img className="access-denied-environment" src={MASTER_VIDEO.poster} alt="" aria-hidden="true" />
          <LiquidAfterimage />
          <section>
            <p className="sip-eyebrow">BEFORE THE FIRST SIP</p>
            <h1 id="access-denied-title" ref={deniedHeadingRef} tabIndex={-1}>SORRY, NOT THIS TIME.</h1>
            <p>This experience is restricted to visitors of legal drinking age in their country.</p>
            <Action variant="text" onClick={returnToAgeGate}>RETURN TO AGE CHECK <ArrowIcon /></Action>
          </section>
        </main>
      )}
    </>
  );
}
