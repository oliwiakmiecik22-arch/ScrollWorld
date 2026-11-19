import { useEffect, useId, useLayoutEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { MOTION, motionDistance } from "../motion/tokens";
import { Action, CloseIcon } from "./Action";

const usePresentationEffect = typeof window === "undefined" ? useEffect : useLayoutEffect;

export function SiteNavigation({
  openSection, onToggle, onClose, onHome, onJourneySelect,
  chapters, logoSrc, aboutLogoSrc = logoSrc, currentChapterId, selectedChapterId,
  modalOpen = false,
}) {
  const navRef = useRef(null);
  const closeButtonRef = useRef(null);
  const lastTriggerRef = useRef(null);
  const closeRef = useRef(onClose);
  closeRef.current = onClose;
  const drawerOpen = Boolean(openSection);
  // Presentation may outlive semantics only while inert, never as a second drawer.
  const [presentedSection, setPresentedSection] = useState(openSection);
  const [reduceMotion, setReduceMotion] = useState(() => typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  const presentationRef = useRef(openSection);
  const liveOpenRef = useRef(drawerOpen);
  liveOpenRef.current = drawerOpen;
  const section = openSection || presentedSection;
  const pendingChapterRef = useRef(null);
  const feedbackRef = useRef(null);
  const journeySelectRef = useRef(onJourneySelect);
  journeySelectRef.current = onJourneySelect;
  const cancelFeedback = () => {
    feedbackRef.current?.tween.kill();
    if (feedbackRef.current) gsap.set(feedbackRef.current.row, { clearProps: "opacity" });
    feedbackRef.current = null;
  };
  const requestClose = () => {
    pendingChapterRef.current = null;
    cancelFeedback();
    closeRef.current();
  };
  const requestCloseRef = useRef(requestClose);
  requestCloseRef.current = requestClose;
  const selectChapter = (event, chapter) => {
    cancelFeedback();
    pendingChapterRef.current = chapter;
    const row = event.currentTarget;
    const commit = () => {
      gsap.set(row, { clearProps: "opacity" });
      feedbackRef.current = null;
      closeRef.current();
    };
    if (reduceMotion) { commit(); return; }
    feedbackRef.current = { row, tween: gsap.to(row, { opacity: .72, duration: MOTION.fast, ease: MOTION.ease, onComplete: commit }) };
  };

  useEffect(() => () => { cancelFeedback(); pendingChapterRef.current = null; }, []);
  usePresentationEffect(() => {
    if (reduceMotion) feedbackRef.current?.tween.progress(1);
  }, [reduceMotion]);

  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduceMotion(preference.matches);
    update();
    preference.addEventListener("change", update);
    return () => preference.removeEventListener("change", update);
  }, []);

  usePresentationEffect(() => {
    const drawer = navRef.current?.querySelector(".sip-navbar__drawer");
    const scrim = navRef.current?.querySelector(".sip-navbar__scrim");
    if (!drawer) return undefined;
    const wasPresented = presentationRef.current;
    presentationRef.current = openSection;
    const distance = motionDistance(window.innerWidth, window.innerHeight);
    const targets = [drawer, scrim].filter(Boolean);
    const clear = () => gsap.set(targets, { clearProps: "opacity,--sip-nav-offset" });
    if (openSection) {
      if (openSection !== wasPresented) {
        pendingChapterRef.current = null;
        cancelFeedback();
      }
      setPresentedSection(openSection);
      if (reduceMotion) { clear(); return undefined; }
      if (!wasPresented && !presentedSection) {
        gsap.set(drawer, { opacity: 0, "--sip-nav-offset": `${-distance}px` });
        if (scrim) gsap.set(scrim, { opacity: 0 });
      }
      const view = drawer.querySelector(".sip-navbar__view:not([hidden])");
      let content;
      if (view && openSection !== wasPresented) {
        gsap.set(view, { opacity: .45, y: distance / 2 });
        content = gsap.to(view, { opacity: 1, y: 0, duration: MOTION.content, ease: MOTION.ease, onComplete: () => gsap.set(view, { clearProps: "opacity,transform" }) });
      }
      const panel = gsap.to(drawer, { opacity: 1, "--sip-nav-offset": "0px", duration: MOTION.panel, ease: MOTION.ease, onComplete: clear });
      const shade = scrim && gsap.to(scrim, { opacity: 1, duration: MOTION.content, ease: MOTION.ease });
      return () => {
        panel.kill(); shade?.kill(); content?.kill();
        if (view) gsap.set(view, { clearProps: "opacity,transform" });
      };
    }
    if (!presentedSection) return undefined;
    cancelFeedback();
    const finish = () => {
      clear(); setPresentedSection(null);
      const chapter = pendingChapterRef.current;
      pendingChapterRef.current = null;
      if (chapter) journeySelectRef.current(chapter);
    };
    if (reduceMotion) { finish(); return undefined; }
    const panel = gsap.to(drawer, { opacity: 0, "--sip-nav-offset": `${-distance}px`, duration: MOTION.close, ease: MOTION.easeInOut, onComplete: finish });
    const shade = scrim && gsap.to(scrim, { opacity: 0, duration: MOTION.close, ease: MOTION.ease });
    return () => { panel.kill(); shade?.kill(); };
  }, [openSection, reduceMotion]);
  const id = useId();
  const titleId = `${id}-title`;
  const journeyId = `${id}-journey`;
  const aboutId = `${id}-about`;

  // Retain Phase 1 modal isolation, scroll compensation and focus restoration.
  usePresentationEffect(() => {
    if (!drawerOpen) return undefined;
    const nav = navRef.current;
    const scope = nav?.parentElement;
    const restoreTarget = document.activeElement && document.activeElement !== document.body
      ? document.activeElement : lastTriggerRef.current;
    const previousRootOverflow = document.documentElement.style.overflow;
    const previousBodyOverflow = document.body.style.overflow;
    const previousBodyPadding = document.body.style.paddingRight;
    const scrollbarWidth = Math.max(0, window.innerWidth - document.documentElement.clientWidth);
    const obscuredSiblings = scope
      ? [...scope.children].filter((element) => element !== nav && !element.classList.contains("liquid-afterimage-layer"))
      : [];
    const siblingState = obscuredSiblings.map((element) => ({
      element, inert: element.hasAttribute("inert"), ariaHidden: element.getAttribute("aria-hidden"),
    }));
    const capsule = nav?.querySelector(".sip-navbar__bar");
    const capsuleState = capsule ? {
      inert: capsule.hasAttribute("inert"), ariaHidden: capsule.getAttribute("aria-hidden"),
    } : null;
    obscuredSiblings.forEach((element) => {
      element.setAttribute("inert", "");
      element.setAttribute("aria-hidden", "true");
    });
    capsule?.setAttribute("inert", "");
    capsule?.setAttribute("aria-hidden", "true");
    if (scrollbarWidth) {
      const currentPadding = Number.parseFloat(getComputedStyle(document.body).paddingRight) || 0;
      document.body.style.paddingRight = `${currentPadding + scrollbarWidth}px`;
    }
    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";
    document.body.classList.add("nav-modal-open");

    const focusDrawer = requestAnimationFrame(() => closeButtonRef.current?.focus({ preventScroll: true }));
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        event.preventDefault();
        requestCloseRef.current();
        return;
      }
      if (event.key !== "Tab") return;
      const focusable = [...(nav?.querySelectorAll(".sip-navbar__drawer button:not(:disabled), .sip-navbar__drawer a[href], .sip-navbar__drawer [tabindex]:not([tabindex='-1'])") ?? [])]
        .filter((element) => element.getClientRects().length > 0);
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
      cancelAnimationFrame(focusDrawer);
      window.removeEventListener("keydown", handleKeyDown);
      siblingState.forEach(({ element, inert, ariaHidden }) => {
        if (!inert) element.removeAttribute("inert");
        if (ariaHidden === null) element.removeAttribute("aria-hidden");
        else element.setAttribute("aria-hidden", ariaHidden);
      });
      if (capsule && capsuleState) {
        if (!capsuleState.inert) capsule.removeAttribute("inert");
        if (capsuleState.ariaHidden === null) capsule.removeAttribute("aria-hidden");
        else capsule.setAttribute("aria-hidden", capsuleState.ariaHidden);
      }
      document.documentElement.style.overflow = previousRootOverflow;
      document.body.style.overflow = previousBodyOverflow;
      document.body.style.paddingRight = previousBodyPadding;
      document.body.classList.remove("nav-modal-open");
      requestAnimationFrame(() => {
        if (!liveOpenRef.current && restoreTarget?.isConnected) restoreTarget.focus({ preventScroll: true });
      });
    };
  }, [drawerOpen]);

  const toggleSection = (event, section) => {
    lastTriggerRef.current = event.currentTarget;
    onToggle(section);
  };

  return (
    <nav ref={navRef} className="sip-navbar" aria-label="Main navigation" inert={modalOpen ? "" : undefined}>
      <div className="sip-navbar__bar">
        <Action className="sip-navbar__journey" variant="nav" onClick={(event) => toggleSection(event, "journey")} aria-expanded={openSection === "journey"} aria-controls={journeyId}>JOURNEY</Action>
        <Action className="sip-navbar__home" variant="logo" onClick={onHome} aria-label="The Sip — return to the beginning">
          <img className="sip-navbar__logo" src={logoSrc} width="173" height="124" alt="The Sip" />
        </Action>
        <Action className="sip-navbar__about" variant="nav" onClick={(event) => toggleSection(event, "about")} aria-expanded={openSection === "about"} aria-controls={aboutId}>ABOUT US</Action>
      </div>

      {(drawerOpen || presentedSection) && <button className="sip-navbar__scrim" type="button" onClick={requestClose} aria-hidden={!drawerOpen || undefined} inert={drawerOpen ? undefined : ""} aria-label="Close navigation drawer" tabIndex={-1} />}
      <div className="sip-navbar__drawer" hidden={!drawerOpen && !presentedSection} role={drawerOpen ? "dialog" : undefined} aria-modal={drawerOpen ? "true" : undefined} aria-hidden={!drawerOpen || undefined} aria-labelledby={drawerOpen ? titleId : undefined} inert={drawerOpen ? undefined : ""}>
        <div className="sip-navbar__drawer-top">
          <div className="sip-navbar__drawer-heading">
            <p className="sip-navbar__drawer-eyebrow">
              <span>{section === "journey" ? "Journey" : "The Sip"}</span>
              {section === "journey" && <span className="sip-navbar__drawer-count">{String(chapters.length).padStart(2, "0")} cocktails</span>}
            </p>
            <h2 id={titleId}>{section === "journey" ? "Choose your desire" : "About us"}</h2>
          </div>
          <Action ref={closeButtonRef} variant="close" onClick={requestClose} aria-label={`Close ${openSection ?? "navigation"}`}><CloseIcon /></Action>
        </div>
        <div id={journeyId} className="sip-navbar__view" hidden={section !== "journey"}>
          <ol className="sip-navbar__list">
            {chapters.map((chapter) => {
              const current = chapter.id === currentChapterId;
              const selected = !current && chapter.id === selectedChapterId;
              return (
                <li key={chapter.id}>
                  <Action variant="row" onClick={(event) => selectChapter(event, chapter)} aria-current={current ? "location" : undefined} data-selected={selected || undefined}>
                    <span className="sip-journey-number">{chapter.number}</span>
                    <span className="sip-journey-name">{chapter.title}</span>
                    <span className="sip-journey-emotion">{chapter.emotion}</span>
                    <span className="sip-journey-state">{current ? "Current" : selected ? "Selected" : ""}</span>
                  </Action>
                </li>
              );
            })}
          </ol>
        </div>
        <section id={aboutId} className="sip-navbar__view sip-navbar__about-reading" hidden={section !== "about"} aria-label="About The Sip">
          <img className="sip-navbar__about-logo" src={aboutLogoSrc} alt="The Sip" />
          <div className="sip-navbar__about-copy">
            <p>An immersive journey through classic cocktails, their stories, recipes and the worlds they inspire.</p>
            <p>Built as a continuous visual experience where every cocktail opens another world.</p>
          </div>
        </section>
      </div>
    </nav>
  );
}
