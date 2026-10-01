import { useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import negroniPoster from "../assets/negroni.png";
import negroniVideo from "../assets/negroni.mp4";

gsap.registerPlugin(ScrollTrigger);

const ingredients = [
  { amount: "30 ml", name: "Gin", className: "ingredient-gin" },
  { amount: "30 ml", name: "Campari", className: "ingredient-campari" },
  { amount: "30 ml", name: "Sweet vermouth", className: "ingredient-vermouth" },
];

export function App() {
  const chapterRef = useRef(null);
  const viewportRef = useRef(null);
  const worldRef = useRef(null);
  const videoRef = useRef(null);
  const [videoReady, setVideoReady] = useState(false);

  useLayoutEffect(() => {
    const chapter = chapterRef.current;
    const viewport = viewportRef.current;
    const world = worldRef.current;
    const video = videoRef.current;

    if (!chapter || !viewport || !world || !video) return undefined;

    let context;
    let mediaQuery;

    const createTimeline = () => {
      if (!Number.isFinite(video.duration) || video.duration <= 0) return;

      video.pause();
      video.currentTime = 0;

      context = gsap.context(() => {
        mediaQuery = gsap.matchMedia();

        mediaQuery.add("(prefers-reduced-motion: no-preference)", () => {
          const playhead = { time: 0 };
          const worldTravel = () => -(world.offsetHeight - viewport.clientHeight);

          const timeline = gsap.timeline({
            defaults: { ease: "none" },
            scrollTrigger: {
              trigger: chapter,
              start: "top top",
              end: "+=700%",
              pin: viewport,
              pinSpacing: true,
              scrub: 0.55,
              anticipatePin: 1,
              invalidateOnRefresh: true,
            },
          });

          timeline
            // 0–25: the Magnific footage supplies the glass rotation.
            .to(
              playhead,
              {
                time: video.duration,
                duration: 25,
                onUpdate: () => {
                  if (Math.abs(video.currentTime - playhead.time) > 0.015) {
                    video.currentTime = playhead.time;
                  }
                },
              },
              0,
            )
            // 25–100: gravity takes over and the illustrated world travels upward.
            .to(world, { y: worldTravel, duration: 75 }, 25)
            .to(".hero-copy", { y: "-84vh", opacity: 0, duration: 10 }, 25)
            .to(".descent-cue", { y: "-46vh", opacity: 0, duration: 8 }, 25)
            .to(".hero-video-shell", { opacity: 0, duration: 8 }, 27)
            .to(".far-drift", { y: "-30vh", duration: 75 }, 25)
            .to(".near-drift-a", { y: "-105vh", x: "8vw", duration: 62 }, 25)
            .to(".near-drift-b", { y: "-132vh", x: "-6vw", duration: 68 }, 25)
            .fromTo(
              ".history-content",
              { opacity: 0, y: "22vh" },
              { opacity: 1, y: 0, duration: 9 },
              38,
            )
            .fromTo(
              ".history-year",
              { opacity: 0, x: "-18vw" },
              { opacity: 0.72, x: 0, duration: 12 },
              35,
            )
            .to(".history-content", { opacity: 0, y: "-24vh", duration: 9 }, 59)
            .to(".history-year", { opacity: 0, y: "-34vh", duration: 10 }, 58)
            .fromTo(
              ".recipe-content",
              { opacity: 0, y: "25vh" },
              { opacity: 1, y: 0, duration: 10 },
              72,
            )
            .fromTo(
              ".ingredient",
              { opacity: 0, y: "28vh", rotation: -3 },
              {
                opacity: 1,
                y: 0,
                rotation: 0,
                duration: 9,
                stagger: 2.2,
              },
              74,
            )
            .fromTo(
              ".method-fragment",
              { opacity: 0, y: "18vh" },
              { opacity: 1, y: 0, duration: 8 },
              84,
            )
            .to(".recipe-content", { opacity: 0, y: "-18vh", duration: 6 }, 95)
            .fromTo(
              ".exit-message",
              { opacity: 0, y: "18vh" },
              { opacity: 1, y: 0, duration: 5 },
              95,
            );
        });
      }, chapter);

      ScrollTrigger.refresh();
    };

    if (video.readyState >= 1) {
      createTimeline();
    } else {
      video.addEventListener("loadedmetadata", createTimeline, { once: true });
    }

    return () => {
      video.removeEventListener("loadedmetadata", createTimeline);
      mediaQuery?.revert();
      context?.revert();
    };
  }, []);

  return (
    <main className="negroni-experience">
      <section ref={chapterRef} className="negroni-chapter" aria-labelledby="title">
        <div ref={viewportRef} className="world-viewport">
          <div ref={worldRef} className="illustrated-world">
            <div className="environment-panel hero-environment">
              <img
                className="world-art hero-art"
                src={negroniPoster}
                alt="A vivid psychedelic Negroni among orange peel, electric foliage and surreal botanical forms."
              />

              <div
                className={`hero-video-shell${videoReady ? " is-ready" : ""}`}
                aria-hidden="true"
              >
                <video
                  ref={videoRef}
                  className="negroni-video"
                  src={negroniVideo}
                  poster={negroniPoster}
                  preload="auto"
                  muted
                  playsInline
                  onCanPlay={() => setVideoReady(true)}
                />
              </div>

              <header className="hero-copy">
                <h1 id="title">
                  <span>NEGRONI</span>
                  <em>TEMPTATION</em>
                </h1>
              </header>

              <p className="descent-cue" aria-hidden="true">
                <span />
                Fall deeper
              </p>
            </div>

            <div className="environment-panel environment-a" aria-hidden="true">
              <img className="world-art" src={negroniPoster} alt="" />
            </div>
            <div className="environment-panel environment-b" aria-hidden="true">
              <img className="world-art" src={negroniPoster} alt="" />
            </div>
            <div className="environment-panel environment-c" aria-hidden="true">
              <img className="world-art" src={negroniPoster} alt="" />
            </div>

            <div className="color-current current-one" aria-hidden="true" />
            <div className="color-current current-two" aria-hidden="true" />
            <div className="golden-twist" aria-hidden="true" />

            <article className="history-scene" aria-labelledby="history-title">
              <div className="history-year" aria-hidden="true">1919?</div>
              <div className="history-content">
                <p className="world-label">A Florentine legend</p>
                <h2 id="history-title">A bitter request after dark.</h2>
                <p className="history-lead">
                  Camillo Negroni is said to have asked for his Americano with
                  gin instead of soda. An orange replaced the lemon—and
                  temptation acquired a name.
                </p>
                <p className="history-whisper">
                  The familiar 1919 story is celebrated. Its exact origin is
                  still debated.
                </p>
              </div>
            </article>

            <article className="recipe-scene" aria-labelledby="recipe-title">
              <div className="recipe-content">
                <p className="world-label">The ritual of equal parts</p>
                <h2 id="recipe-title">No apologies.</h2>

                <ol className="ingredients" aria-label="Negroni ingredients">
                  {ingredients.map((ingredient) => (
                    <li
                      className={`ingredient ${ingredient.className}`}
                      key={ingredient.name}
                    >
                      <strong>{ingredient.amount}</strong>
                      <span>{ingredient.name}</span>
                    </li>
                  ))}
                </ol>

                <div className="method-fragment">
                  <span>Stir / chill / strain</span>
                  <p>
                    Build over one large clear ice block. Stir until cold.
                    Express an orange peel and let The Golden Twist fall.
                  </p>
                </div>
              </div>
            </article>

            <div className="exit-message">
              <span>The Golden Twist continues</span>
            </div>
          </div>

          <div className="far-drift drift-vine" aria-hidden="true" />
          <div className="near-drift near-drift-a" aria-hidden="true">
            <img src={negroniPoster} alt="" />
          </div>
          <div className="near-drift near-drift-b" aria-hidden="true">
            <img src={negroniPoster} alt="" />
          </div>
          <div className="print-grain" aria-hidden="true" />
        </div>
      </section>
    </main>
  );
}
