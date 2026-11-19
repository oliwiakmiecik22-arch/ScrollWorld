export function selectExperienceVideo({ viewportWidth, saveData }, sources) {
  return viewportWidth <= 900 || saveData ? sources.mobile : sources.desktop;
}

export function getExperienceMode(reduceMotion) {
  return reduceMotion ? "reduced" : "cinematic";
}

export function getChapterTargetTime(chapter) {
  return chapter?.heroPeak ?? 0;
}

// Match the approved Intro crop, not a new camera animation. Hold it while the
// source portal is nearly static; release within its existing forward approach.
// Framing is native again before any cocktail and follows decoded source time.
export function getPortalHandoffScale(sourceTime, openingScale) {
  const progress = Math.min(1, Math.max(0, (sourceTime - 4) / 5));
  const release = progress * progress * (3 - 2 * progress);
  return 1 + (openingScale - 1) * (1 - release);
}

export function getEndingState(contentProgress) {
  const visible = contentProgress >= 0.85;
  return {
    visible,
    ariaHidden: !visible,
    inert: !visible,
    tabIndex: visible ? 0 : -1,
  };
}
