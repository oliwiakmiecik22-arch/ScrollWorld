import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
test("Negroni styling is isolated with reduced-motion and visible keyboard focus", () => {
  const css = readFileSync(new URL("../src/design/negroni-prototype.css", import.meta.url), "utf8");
  assert.match(css, /\.negroni-prototype/);
  assert.match(css, /prefers-reduced-motion/);
  assert.match(css, /focus-visible/);
  assert.match(css, /\.negroni-prototype \.negroni-emotion\s*\{[^}]*order: 2/s);
  assert.match(css, /\.recipe-panel li\s*\{[^}]*border: 0;/s);
  assert.doesNotMatch(css, /backdrop-filter:\s*blur|spring|bounce/);
});
