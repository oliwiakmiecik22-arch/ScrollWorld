import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

import { getChapterTargetTime, getEndingState, getExperienceMode, selectExperienceVideo } from "../src/phase1.js";

const appSource = readFileSync(new URL("../src/App.jsx", import.meta.url), "utf8");
const stylesSource = readFileSync(new URL("../src/styles.css", import.meta.url), "utf8");
const indexSource = readFileSync(new URL("../index.html", import.meta.url), "utf8");
const navigationSource = readFileSync(new URL("../src/components/SiteNavigation.jsx", import.meta.url), "utf8");
const componentStyles = readFileSync(new URL("../src/design/components.css", import.meta.url), "utf8");
const tokensSource = readFileSync(new URL("../src/design/tokens.css", import.meta.url), "utf8");

test("selectExperienceVideo uses the mobile encode for narrow or data-saving devices", () => {
  const sources = { desktop: "desktop.mp4", mobile: "mobile.mp4" };

  assert.equal(selectExperienceVideo({ viewportWidth: 390, saveData: false }, sources), "mobile.mp4");
  assert.equal(selectExperienceVideo({ viewportWidth: 1440, saveData: true }, sources), "mobile.mp4");
  assert.equal(selectExperienceVideo({ viewportWidth: 1440, saveData: false }, sources), "desktop.mp4");
});

test("getExperienceMode replaces the pinned video journey when reduced motion is requested", () => {
  assert.equal(getExperienceMode(true), "reduced");
  assert.equal(getExperienceMode(false), "cinematic");
});

test("getChapterTargetTime targets the selected cocktail hero frame", () => {
  assert.equal(getChapterTargetTime({ heroPeak: 31.5 }), 31.5);
  assert.equal(getChapterTargetTime(null), 0);
});

test("getEndingState keeps visibility, focus and accessibility in sync", () => {
  assert.deepEqual(getEndingState(0.84), { visible: false, ariaHidden: true, inert: true, tabIndex: -1 });
  assert.deepEqual(getEndingState(0.85), { visible: true, ariaHidden: false, inert: false, tabIndex: 0 });
});

test("an open navigation drawer also isolates the navigation capsule", () => {
  assert.match(navigationSource, /const capsule = nav\?\.querySelector\("\.sip-navbar__bar"\)/);
  assert.match(navigationSource, /capsule\?\.setAttribute\("inert", ""\)/);
  assert.match(navigationSource, /capsule\?\.setAttribute\("aria-hidden", "true"\)/);
  assert.match(navigationSource, /capsule\.removeAttribute\("inert"\)/);
  assert.match(componentStyles, /\.sip-navbar__bar\s*{[^}]*z-index:\s*var\(--sip-layer-bar\)/s);
  assert.match(componentStyles, /\.sip-navbar__scrim\s*{[^}]*z-index:\s*var\(--sip-layer-scrim\)/s);
  assert.match(tokensSource, /--sip-layer-bar:\s*1;/);
  assert.match(tokensSource, /--sip-layer-scrim:\s*2;/);
});

test("the intro reacts when reduced-motion preference changes", () => {
  assert.match(appSource, /function CosmicIntro\(\{ onEnter, onHome, reduceMotion, selectedChapterId \}\)/);
  assert.match(appSource, /function CosmicIntro[\s\S]*?\}, \[reduceMotion\]\);/);
  assert.match(appSource, /onHome=\{returnToIntro\} reduceMotion=\{reduceMotion\}/);
  assert.match(appSource, /if \(reduceMotion\) \{[\s\S]*?gsap\.set\([\s\S]*?clearProps: "all"/);
});

test("the ending layer and its controls share one accessibility state", () => {
  assert.match(appSource, /<section className="ending-layer"[^>]*aria-hidden="true"[^>]*inert=""/);
  assert.match(appSource, /endingLayer\.setAttribute\("aria-hidden", String\(endingState\.ariaHidden\)\)/);
  assert.match(appSource, /endingLayer\.toggleAttribute\("inert", endingState\.inert\)/);
  assert.match(appSource, /endingLayer\.contains\(document\.activeElement\)[\s\S]*heroHeadingRef\.current\?\.focus/);
});

test("notched devices receive safe-area-aware navigation at every viewport width", () => {
  assert.match(indexSource, /viewport-fit=cover/);
  assert.match(tokensSource, /--sip-navbar-inset:\s*max\(var\(--sip-page-gutter\), env\(safe-area-inset-left\), env\(safe-area-inset-right\)\)/);
  assert.match(componentStyles, /\.sip-navbar\s*{[^}]*top:\s*max\(var\(--sip-navbar-top\), env\(safe-area-inset-top\)\)/s);
  assert.match(componentStyles, /\.sip-navbar\s*{[^}]*right:\s*var\(--sip-navbar-inset\);[^}]*left:\s*var\(--sip-navbar-inset\)/s);
});
