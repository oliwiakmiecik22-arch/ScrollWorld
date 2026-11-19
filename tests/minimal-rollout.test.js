import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const read = (path) => readFileSync(new URL(path, import.meta.url), "utf8");

test("approved minimal language has one static rollout layer without media or motion changes", () => {
  const css = read("../src/design/minimal-interface.css");
  assert.match(read("../src/design/system.css"), /@import "\.\/minimal-interface\.css" layer\(layouts\)/);
  for (const selector of [".age-gate-content", ".sip-navbar__bar", ".sip-navbar__drawer", ".cocktail-hud", ".ending-footer"]) {
    assert.ok(css.includes(selector), `Missing static treatment: ${selector}`);
  }
  assert.doesNotMatch(css, /@keyframes|animation:|backdrop-filter|url\(|\.cosmic-intro-video|\.master-media/);
  assert.match(css, /grid-template-columns: repeat\(2, minmax\(0, 1fr\)\)/);
  assert.match(css, /@media \(max-width: 700px\)/);
});

test("reduced-motion stepper does not duplicate long personality text into the HUD clearance", () => {
  const css = read("../src/design/minimal-interface.css");
  assert.match(css, /\.reduced-motion-controls p strong\s*\{\s*display: none;/);
});
