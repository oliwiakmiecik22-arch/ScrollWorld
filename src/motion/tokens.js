/** Seconds for GSAP. CSS companions use the same scale in motion-polish.css. */
export const MOTION = Object.freeze({
  fast: .14, hover: .2, content: .3, panel: .46, close: .38, cinematic: .72,
  ease: "power2.out", easeInOut: "power2.inOut",
});

export function motionDistance(width, height) {
  if (height <= 520) return 3;
  return width <= 700 ? 4 : 8;
}
