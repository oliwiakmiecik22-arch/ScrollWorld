import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
const app = readFileSync(new URL("../src/App.jsx", import.meta.url), "utf8");
const intro = app.slice(app.indexOf("function CosmicIntro"), app.indexOf("function CocktailHud"));
test("Intro readiness follows decoded poster and fonts rather than an ornamental timeline", () => {
  assert.match(intro, /poster\.decode\(\)/);
  assert.match(intro, /document\.fonts\.ready/);
  assert.doesNotMatch(intro, /onComplete: \(\) => setIntroReady\(true\)/);
  assert.match(intro, /loadingLabel="PREPARING YOUR JOURNEY"/);
  assert.match(intro, /if \(!introReady \|\| leaving\) return/);
});

test("age gate keeps branding in navigation without a duplicate scene logo", () => {
  assert.doesNotMatch(app, /className="age-gate-logo"/);
  const nav = readFileSync(new URL("../src/components/SiteNavigation.jsx", import.meta.url), "utf8");
  assert.match(nav, /className="sip-navbar__logo"/);
  const css = readFileSync(new URL("../src/design/entry-review.css", import.meta.url), "utf8");
  assert.match(css, /\.age-gate-actions \.sip-action--age\s*\{[^}]*height: 48px/s);
  assert.match(css, /focus-visible/);
  assert.match(css, /prefers-reduced-motion/);
});
