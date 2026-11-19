import { useEffect, useRef } from "react";
import gsap from "gsap";

const COLORS = ["#f477de", "#fff8f2", "#c990bd"];
const MAX_FRAGMENTS = 8;

export default function LiquidAfterimage() {
  const layerRef = useRef(null);

  useEffect(() => {
    const media = gsap.matchMedia();
    const enableAfterimage = () => {
    const layer = layerRef.current;
    const active = [];
    let last = null;
    let index = 0;

    const handlePointerMove = (event) => {
      if (event.pointerType !== "mouse") return;
      const target = event.target instanceof Element ? event.target : null;
      if (target?.closest("button,a,input,textarea,select,[contenteditable='true'],.nav-drawer,.cocktail-hud,.info-panel,.ending-content,h1,h2,h3,p")) {
        last = null;
        return;
      }

      if (last) {
        const dx = event.clientX - last.x;
        const dy = event.clientY - last.y;
        const distance = Math.hypot(dx, dy);
        if (distance < 28) return;

        const fragment = document.createElement("span");
        fragment.className = "liquid-afterimage-fragment";
        fragment.style.left = `${event.clientX}px`;
        fragment.style.top = `${event.clientY}px`;
        fragment.style.backgroundColor = COLORS[index % COLORS.length];
        fragment.style.width = `${Math.min(16, Math.max(7, distance * 0.16))}px`;
        fragment.style.transform = `translate(-50%, -50%) rotate(${Math.atan2(dy, dx) * 57.2958}deg)`;
        layer.appendChild(fragment);
        active.push(fragment);
        index += 1;

        if (active.length > MAX_FRAGMENTS) {
          const oldest = active.shift();
          gsap.killTweensOf(oldest);
          oldest.remove();
        }

        gsap.fromTo(fragment,
          { opacity: 0.58, scaleX: 0.4, scaleY: 0.75 },
          {
            opacity: 0,
            scaleX: 1.35,
            scaleY: 0.12,
            duration: 0.58,
            ease: "power2.out",
            onComplete: () => {
              const fragmentIndex = active.indexOf(fragment);
              if (fragmentIndex !== -1) active.splice(fragmentIndex, 1);
              fragment.remove();
            },
          },
        );
      }
      last = { x: event.clientX, y: event.clientY };
    };

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      active.forEach((fragment) => {
        gsap.killTweensOf(fragment);
        fragment.remove();
      });
    };
    };
    media.add("(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)", enableAfterimage);
    return () => media.revert();
  }, []);

  return <div ref={layerRef} className="liquid-afterimage-layer" aria-hidden="true" />;
}
