import { useEffect, useRef } from "react";
import gsap from "gsap";
import { MOTION, motionDistance } from "../motion/tokens";
import { Action, ArrowIcon } from "./Action";

export function EndingContent({ contentRef, headingRef, onEnterAgain, logoSrc, staticMode = false }) {
  const rootRef = useRef(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return undefined;
    const layer = root.closest(".ending-layer") ?? root;
    const heading = root.querySelector("h2");
    const supporting = [root.querySelector("p"), root.querySelector(".enter-again")];
    const footer = root.querySelector(".ending-footer");
    const targets = [heading, ...supporting, footer];
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    let context;
    let wasVisible = false;

    const reset = () => {
      context?.revert();
      context = undefined;
    };
    const settle = () => {
      reset();
      context = gsap.context(() => gsap.set(targets, { opacity: 1, y: 0 }), root);
    };
    const sync = () => {
      const visible = staticMode || (layer.getAttribute("aria-hidden") !== "true" && !layer.hasAttribute("inert"));
      if (visible === wasVisible) return;
      wasVisible = visible;
      reset();
      if (!visible) return;
      if (staticMode || media.matches) {
        settle();
        return;
      }
      const distance = motionDistance(window.innerWidth, window.innerHeight);
      // Only descendants belong to this reveal; the film controller owns the root.
      // Nonzero starting opacity keeps the whole ending visible and actionable.
      context = gsap.context(() => {
        gsap.timeline({ defaults: { ease: MOTION.ease } })
          .fromTo(heading, { opacity: .55, y: distance }, { opacity: 1, y: 0, duration: MOTION.panel }, 0)
          .fromTo(supporting, { opacity: .65, y: distance / 2 }, { opacity: 1, y: 0, duration: MOTION.content }, MOTION.fast)
          .fromTo(footer, { opacity: .65 }, { opacity: 1, duration: MOTION.content }, MOTION.cinematic - MOTION.content);
      }, root);
    };
    const onMotionChange = () => {
      if (media.matches && wasVisible) settle();
    };
    const observer = new MutationObserver(sync);
    observer.observe(layer, { attributes: true, attributeFilter: ["aria-hidden", "inert"] });
    media.addEventListener("change", onMotionChange);
    sync();
    return () => {
      observer.disconnect();
      media.removeEventListener("change", onMotionChange);
      reset();
    };
  }, [staticMode]);

  const setRootRef = (node) => {
    rootRef.current = node;
    if (typeof contentRef === "function") contentRef(node);
    else if (contentRef) contentRef.current = node;
  };

  return (
    <div className="ending-content" ref={setRootRef} aria-hidden={!staticMode} inert={staticMode ? undefined : ""}>
      <h2 ref={headingRef} tabIndex={-1}>ONE MORE SIP?</h2>
      <p>But desire never really ends.</p>
      <Action variant="primary" size="large" className="enter-again" onClick={onEnterAgain} tabIndex={staticMode ? 0 : -1}>ENTER AGAIN <ArrowIcon /></Action>
      <footer className="ending-footer">
        <img className="ending-logo" src={logoSrc} alt="The Sip" />
        <small>The Sip · An experimental cocktail experience · {new Date().getFullYear()}</small>
      </footer>
    </div>
  );
}
