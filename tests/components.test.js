import test from "node:test";
import assert from "node:assert/strict";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { buildSync } from "esbuild";
import { createRequire } from "node:module";
import { runInNewContext } from "node:vm";
import { readFileSync } from "node:fs";

// Compile the real React component for Node; no browser or extra test package is needed.
function loadComponent(relativePath) {
  const file = new URL(relativePath, import.meta.url);
  const result = buildSync({
    entryPoints: [file.pathname], bundle: true, write: false,
    platform: "node", format: "cjs", jsx: "automatic", external: ["react", "react/jsx-runtime"],
  });
  const module = { exports: {} };
  runInNewContext(result.outputFiles[0].text, {
    module, exports: module.exports, require: createRequire(import.meta.url),
  });
  return module.exports;
}

const { Action } = loadComponent("../src/components/Action.jsx");
const renderAction = (props) => renderToStaticMarkup(createElement(Action, props, "Explore"));

test("actions default to safe button semantics and share a variant contract", () => {
  const html = renderAction({ variant: "secondary" });
  assert.match(html, /type="button"/);
  assert.match(html, /sip-action--secondary/);
  assert.doesNotMatch(html, /disabled=""/);
  assert.match(html, /Explore/);
});

test("loading actions expose honest busy text and prevent duplicate activation", () => {
  const html = renderAction({ loading: true, loadingLabel: "Preparing journey" });
  assert.match(html, /aria-busy="true"/);
  assert.match(html, /disabled=""/);
  assert.match(html, /Preparing journey/);
  assert.doesNotMatch(html, /Explore/);
});

test("selected, disabled and keyboard properties are preserved independently", () => {
  const html = renderAction({ selected: true, disabled: true, tabIndex: -1, "aria-label": "Recipe" });
  assert.match(html, /aria-pressed="true"/);
  assert.match(html, /disabled=""/);
  assert.match(html, /tabindex="-1"/);
  assert.match(html, /aria-label="Recipe"/);
});

test("tertiary and close controls remain real accessible buttons", () => {
  assert.match(renderAction({ variant: "text" }), /sip-action--text/);
  assert.match(renderAction({ variant: "close", "aria-label": "Close Journey" }), /aria-label="Close Journey"/);
});

test("one navbar renders centered-brand structure and an explicit current chapter", () => {
  const { SiteNavigation } = loadComponent("../src/components/SiteNavigation.jsx");
  const html = renderToStaticMarkup(createElement(SiteNavigation, {
    openSection: "journey", logoSrc: "approved-logo.svg", currentChapterId: "negroni",
    chapters: [{ id: "negroni", number: "01", title: "NEGRONI", emotion: "Temptation" }],
    onClose() {}, onToggle() {}, onHome() {}, onJourneySelect() {},
  }));
  assert.match(html, /sip-navbar__bar/);
  assert.match(html, /aria-current="location"/);
  assert.match(html, /Current/);
  assert.match(html, /role="dialog"/);
  assert.doesNotMatch(html, /Primary_navigation\.png/);
});

test("approved foundations and functional-only interactions are centralized", () => {
  const tokens = readFileSync(new URL("../src/design/tokens.css", import.meta.url), "utf8");
  const components = readFileSync(new URL("../src/design/components.css", import.meta.url), "utf8");
  assert.match(tokens, /--sip-color-night:\s*#0e0b12/i);
  assert.match(tokens, /--sip-color-pink:\s*#f477de/i);
  assert.match(tokens, /--sip-duration-fast:\s*120ms/);
  assert.match(components, /grid-template-columns:\s*minmax\(0, 1fr\) auto minmax\(0, 1fr\)/);
  assert.match(components, /prefers-reduced-motion:\s*reduce/);
  assert.doesNotMatch(components, /(?:^|\n)\s*\.sip-action--logo[^{}]*:hover/, "Logo is a calm anchor without hover decoration");
  assert.match(components, /\.sip-action:focus-visible\s*\{[^}]*outline: 2px/s, "Keyboard focus remains visible");
  assert.doesNotMatch(components, /@keyframes|backdrop-filter|drop-shadow/);
});

test("active brand and UI assets are real vectors or live controls, never raster UI", () => {
  const app = readFileSync(new URL("../src/App.jsx", import.meta.url), "utf8");
  assert.match(app, /assets\/brand\/the-sip\.svg/);
  assert.doesNotMatch(app, /assets\/images\/(?:new_logo|thesip_logo|Primary_navigation|YES|NO|scroll)\.png/);
  for (const name of ["the-sip", "the-sip-legacy"]) {
    const svg = readFileSync(new URL(`../assets/brand/${name}.svg`, import.meta.url), "utf8");
    assert.match(svg, /viewBox=/);
    assert.match(svg, /<path/);
    assert.doesNotMatch(svg, /<image|data:image|<script|foreignObject/);
  }
});

test("pending chapter selection remains visible when the age gate hands over to intro", () => {
  const app = readFileSync(new URL("../src/App.jsx", import.meta.url), "utf8");
  assert.match(app, /function CosmicIntro\(\{ onEnter, onHome, reduceMotion, selectedChapterId \}\)/);
  const intro = app.slice(app.indexOf("function CosmicIntro"), app.indexOf("function CocktailHud"));
  assert.match(intro, /selectedChapterId=\{selectedChapterId\}/);
  const introMount = app.split("\n").find((line) => line.includes("<CosmicIntro"));
  assert.match(introMount, /selectedChapterId=\{selectedChapterId\}/);
});
