import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const app = readFileSync(new URL("../src/App.jsx", import.meta.url), "utf8");
const intro = app.slice(app.indexOf("function CosmicIntro"), app.indexOf("function CocktailHud"));
const components = readFileSync(new URL("../src/design/components.css", import.meta.url), "utf8");

test("minimal Intro retains one accessible headline without a handwritten sign", () => {
  assert.doesNotMatch(intro, /THE SIP \/ A COCKTAIL JOURNEY/);
  assert.match(intro, /<h1[^>]*aria-label="DISCOVER YOUR DESIRE"/);
  for (const word of ["DISCOVER", "YOUR", "DESIRE"]) {
    assert.match(intro, new RegExp(`>${word}</span>`));
  }
  assert.doesNotMatch(intro, /go on, get lost|immersive-handwriting/);
  assert.match(intro, /className="cosmic-intro-handwriting" aria-hidden="true" hidden\s*\/>/);
});

test("the invitation remains the same accessible entry action, not a decorative scroll label", () => {
  assert.match(intro, /className="scroll-instruction sip-scroll-action" variant="text"/);
  assert.match(intro, /onClick=\{enter\} loading=\{!introReady\}/);
  assert.match(intro, /loadingLabel="PREPARING YOUR JOURNEY" disabled=\{leaving\}/);
  assert.match(intro, /SCROLL TO ENTER <ArrowIcon direction="down"/);
  assert.match(intro, /aria-label=\{introReady \? "Scroll to enter the journey"/);
});

test("shared navigation has one compact balanced masthead instead of an enclosing pill", () => {
  const bar = components.slice(components.indexOf(".sip-navbar__bar {"), components.indexOf(".sip-navbar__journey"));
  assert.match(bar, /grid-template-columns: minmax\(0, 1fr\) auto minmax\(0, 1fr\)/);
  assert.match(bar, /width: min\(100%, var\(--sip-navbar-width\)\)/);
  assert.match(bar, /margin-inline: auto/);
  assert.match(bar, /border-radius: 0/);
  assert.match(bar, /background: transparent/);
  assert.doesNotMatch(components, /@keyframes|backdrop-filter/);
});

test("transparent masthead retains opaque local ink behind small navigation labels", () => {
  assert.ok(/\.sip-navbar__bar \.sip-action--nav \.sip-action__content\s*\{[^}]*background:\s*var\(--sip-color-night\)/.test(components),
    "Small navigation labels need local opaque backing over bright footage, not a full navbar panel");
});

test("immersive cosmic proof is desktop-scoped, with no new motion or other-screen redesign", () => {
  const url = new URL("../src/design/immersive-intro.css", import.meta.url);
  assert.doesNotThrow(() => readFileSync(url), "The isolated Intro proof stylesheet must exist");
  const proof = readFileSync(url, "utf8");
  assert.match(proof, /@media \(min-width: 1100px\) and \(min-height: 600px\)/);
  assert.doesNotMatch(proof, /@keyframes|backdrop-filter|animation:|\.sip-navbar__drawer|\.age-gate|\.cocktail-hud|\.ending|"Modak"/);
  assert.doesNotMatch(proof, /immersive-handwriting/);
  assert.doesNotMatch(proof, /intro-world-fragment|background-image|content:\s*url/);
  const system = readFileSync(new URL("../src/design/system.css", import.meta.url), "utf8");
  assert.match(system, /@import "\.\/immersive-intro\.css" layer\(layouts\)/);
  assert.doesNotMatch(system, /sip-loud-intro/);
});

test("minimal Intro controls use quiet system type and no raised decorative edge", () => {
  const proof = readFileSync(new URL("../src/design/immersive-intro.css", import.meta.url), "utf8");
  assert.match(proof, /-apple-system/);
  const cta = proof.slice(proof.indexOf(".cosmic-intro .sip-scroll-action {"), proof.indexOf(".cosmic-intro .sip-scroll-action .sip-action__content"));
  assert.match(cta, /box-shadow: none;/);
  const arrow = proof.slice(proof.indexOf(".cosmic-intro .sip-scroll-action .sip-icon {"), proof.indexOf(".cosmic-intro .sip-navbar__bar .sip-action:focus-visible"));
  assert.match(arrow, /background: transparent;/);
});

test("portal caption explicitly resets the inherited stacked headline layout", () => {
  const proof = readFileSync(new URL("../src/design/immersive-intro.css", import.meta.url), "utf8");
  const title = proof.slice(proof.indexOf(".cosmic-intro .cosmic-intro-title {"), proof.indexOf(".cosmic-intro .cosmic-intro-title span"));
  assert.match(title, /flex-direction: row;/);
});

test("Intro has no floating world fragments or replacement media beyond the portal", () => {
  assert.doesNotMatch(intro, /intro-world-fragment|src=\{(?:negroniStill|dirtyMartiniStill|margaritaStill|french75Still)\}/);
  assert.equal((intro.match(/<img\b/g) ?? []).length, 1, "Only the original portal image belongs in Intro markup; shared navigation retains its logo");
  assert.match(intro, /className="cosmic-intro-video" src=\{MASTER_VIDEO.poster\}/);
});
