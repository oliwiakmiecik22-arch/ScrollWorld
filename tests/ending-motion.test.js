import test from "node:test";
import assert from "node:assert/strict";
import { buildSync } from "esbuild";
import { createRequire } from "node:module";
import { runInNewContext } from "node:vm";
import { readFileSync } from "node:fs";
import * as React from "react";
import { renderToStaticMarkup } from "react-dom/server";

const require = createRequire(import.meta.url);
const compiled = buildSync({
  entryPoints: [new URL("../src/components/EndingContent.jsx", import.meta.url).pathname],
  bundle: true, write: false, platform: "node", format: "cjs", jsx: "automatic",
  external: ["react", "react/jsx-runtime", "gsap"],
}).outputFiles[0].text;

// Minimal host adapters exercise the actual effect without a browser dependency.
function mountEnding({ visible = false, reduced = false, staticMode = false, width = 1440, height = 900, onEnterAgain = () => {} } = {}) {
  const effects = [];
  const observers = [];
  const contexts = [];
  const timelines = [];
  const targets = Object.fromEntries(["h2", "p", ".enter-again", ".ending-footer"].map((selector) => [selector, { selector }]));
  const attributes = new Map(visible ? [] : [["aria-hidden", "true"], ["inert", ""]]);
  const layer = { getAttribute: (name) => attributes.get(name) ?? null, hasAttribute: (name) => attributes.has(name) };
  const root = {
    ...layer, closest: () => layer,
    querySelector: (selector) => targets[selector],
    querySelectorAll: () => Object.values(targets),
  };
  const mediaListeners = new Set();
  const media = {
    matches: reduced,
    addEventListener: (_, listener) => mediaListeners.add(listener),
    removeEventListener: (_, listener) => mediaListeners.delete(listener),
  };
  const gsap = {
    context(callback) {
      const snapshots = Object.values(targets).map((target) => [target, { ...target }]);
      const context = { reverted: false, revert() {
        this.reverted = true;
        for (const [target, snapshot] of snapshots) {
          for (const key of Object.keys(target)) delete target[key];
          Object.assign(target, snapshot);
        }
      } };
      contexts.push(context);
      callback();
      return context;
    },
    set(nodes, values) { for (const node of Array.isArray(nodes) ? nodes : [nodes]) Object.assign(node, values); },
    timeline(options = {}) {
      const timeline = {
        options, steps: [],
        fromTo(nodes, from, to, at) {
          const list = Array.isArray(nodes) ? nodes : [nodes];
          for (const node of list) Object.assign(node, from);
          this.steps.push({ nodes: list, from, to, at });
          return this;
        },
        finish() { for (const step of this.steps) for (const node of step.nodes) Object.assign(node, step.to); },
      };
      timelines.push(timeline);
      return timeline;
    },
  };
  const module = { exports: {} };
  runInNewContext(compiled, {
    module, exports: module.exports,
    require: (name) => name === "gsap" ? gsap : name === "react" ? {
      ...React, useRef: () => ({ current: root }),
      useEffect: (effect) => effects.push(effect), useLayoutEffect: (effect) => effects.push(effect),
    } : require(name),
    window: { innerWidth: width, innerHeight: height, matchMedia: () => media },
    MutationObserver: class {
      constructor(callback) { this.callback = callback; observers.push(this); }
      observe(target, options) { this.target = target; this.options = options; }
      disconnect() { this.disconnected = true; }
    },
  });
  const element = module.exports.EndingContent({ staticMode, logoSrc: "approved-logo.svg", onEnterAgain });
  const cleanups = effects.map((effect) => effect());
  return {
    element, root, layer, targets, contexts, timelines, observers, mediaListeners,
    reveal(nextVisible) {
      attributes.set("aria-hidden", String(!nextVisible));
      if (nextVisible) attributes.delete("inert"); else attributes.set("inert", "");
      for (const observer of observers) observer.callback([]);
    },
    reduce(nextReduced) { media.matches = nextReduced; for (const listener of mediaListeners) listener({ matches: nextReduced }); },
    cleanup() { for (const cleanup of cleanups) cleanup?.(); },
  };
}

test("a mounted-hidden ending reveals heading, subtitle/CTA, then quiet footer in 720ms", () => {
  const ending = mountEnding();
  assert.equal(ending.timelines.length, 0);
  ending.reveal(true);
  assert.equal(ending.timelines.length, 1, "controller visibility must start the reveal");
  const { steps } = ending.timelines[0];
  assert.deepEqual(steps.map((step) => Array.from(step.nodes, (node) => node.selector)), [["h2"], ["p", ".enter-again"], [".ending-footer"]]);
  assert.ok(steps[0].at < steps[1].at && steps[1].at < steps[2].at);
  assert.equal(Math.max(...steps.map((step) => step.at + step.to.duration)), .72);
  assert.equal(steps[0].from.y, 8);
  for (const step of steps) {
    assert.ok(step.from.opacity > 0, "no invisible actionable content");
    assert.equal(step.to.opacity, 1);
    assert.equal(step.to.y ?? 0, 0);
    assert.equal(step.from.autoAlpha, undefined, "motion must not hide content from accessibility");
  }
  ending.timelines[0].finish();
  for (const target of Object.values(ending.targets)) assert.equal(target.opacity, 1);
});

test("reduced motion settles immediately, including changes during an active reveal", () => {
  const reduced = mountEnding({ reduced: true });
  reduced.reveal(true);
  assert.equal(reduced.timelines.length, 0, "reduced motion must skip cinematic travel");
  for (const target of Object.values(reduced.targets)) {
    assert.equal(target.opacity, 1);
    assert.equal(target.y, 0);
  }
  const ending = mountEnding({ visible: true });
  assert.equal(ending.timelines.length, 1);
  ending.reduce(true);
  assert.equal(ending.contexts[0].reverted, true, "cancel the in-flight timeline before settling");
  for (const target of Object.values(ending.targets)) {
    assert.equal(target.opacity, 1);
    assert.equal(target.y, 0);
  }
  ending.reduce(false);
  ending.reveal(true);
  assert.equal(ending.timelines.length, 1, "changing preferences must not replay a visible ending");
  ending.reveal(false);
  ending.reveal(true);
  assert.equal(ending.timelines.length, 2, "a later genuine reveal can animate again");
});

test("static ending stays fully visible without an entrance", () => {
  const ending = mountEnding({ staticMode: true });
  assert.equal(ending.timelines.length, 0);
  for (const target of Object.values(ending.targets)) assert.equal(target.opacity, 1);
});

test("hidden-again, repeated controller writes and unmount preserve controller ownership", () => {
  const ending = mountEnding();
  ending.reveal(true);
  ending.reveal(true);
  assert.equal(ending.timelines.length, 1);
  assert.equal(ending.observers[0].target, ending.layer);
  assert.deepEqual(Array.from(ending.observers[0].options.attributeFilter), ["aria-hidden", "inert"]);
  ending.reveal(false);
  assert.equal(ending.contexts[0].reverted, true);
  ending.reveal(true);
  assert.equal(ending.timelines.length, 2);
  assert.equal(ending.root.opacity, undefined, "the film controller alone owns root opacity");
  assert.equal(ending.root.y, undefined, "the film controller alone owns root travel");
  ending.cleanup();
  assert.ok(ending.contexts.every((context) => context.reverted));
  assert.equal(ending.observers[0].disconnected, true);
  assert.equal(ending.mediaListeners.size, 0);
});

test("mobile and short landscape reveals use the shared shorter travel", () => {
  for (const [width, height, distance] of [[390, 844, 4], [844, 390, 3]]) {
    const ending = mountEnding({ visible: true, width, height });
    assert.equal(ending.timelines[0].steps[0].from.y, distance);
  }
});

test("Enter Again has restrained hover/focus/press feedback without static redesign", () => {
  const css = readFileSync(new URL("../src/design/ending-motion.css", import.meta.url), "utf8");
  assert.match(css, /@media\s*\(hover:\s*hover\)\s*and\s*\(pointer:\s*fine\)/);
  assert.match(css, /:hover\s+\.sip-icon/);
  assert.match(css, /:focus-visible\s+\.sip-icon/);
  assert.match(css, /:active\s+\.sip-action__content/);
  assert.match(css, /translateX\(2px\)/);
  assert.match(css, /scale\(\.99\)/);
  assert.match(css, /140ms/);
  assert.match(css, /200ms/);
  assert.match(css, /prefers-reduced-motion:\s*reduce/);
  assert.match(css, /transition:\s*none\s*!important/);
  assert.match(css, /transform:\s*none\s*!important/);
  assert.doesNotMatch(css, /@keyframes|animation:|infinite|bounce|spring/);
  const properties = [...css.matchAll(/(?:\{|;)\s*([\w-]+)\s*:/g)].map((match) => match[1]);
  assert.ok(properties.length > 0);
  for (const property of properties) assert.ok(["transition", "transition-duration", "transform"].includes(property), `${property} must not change the approved static design`);
});

test("approved markup, footer, accessibility and immediate activation are preserved", () => {
  const module = { exports: {} };
  runInNewContext(compiled, { module, exports: module.exports, require });
  const { EndingContent } = module.exports;
  const html = renderToStaticMarkup(React.createElement(EndingContent, { staticMode: true, logoSrc: "approved-logo.svg" }));
  assert.match(html, /<h2 tabindex="-1">ONE MORE SIP\?<\/h2><p>But desire never really ends\.<\/p>/);
  assert.match(html, /<button[^>]*tabindex="0"[^>]*type="button"/);
  assert.match(html, /ENTER AGAIN/);
  assert.match(html, /<footer class="ending-footer"><img class="ending-logo" src="approved-logo.svg" alt="The Sip"\/>/);
  assert.ok(html.includes(`The Sip · An experimental cocktail experience · ${new Date().getFullYear()}`));
  assert.doesNotMatch(html, /inert=|aria-hidden="true"[^>]*><h2|disabled=|style=/);
  let activations = 0;
  const ending = mountEnding({ visible: true, onEnterAgain: () => { activations += 1; } });
  const children = ending.element.props.children;
  assert.equal(children.length, 4, "no geometry-changing wrappers");
  children[2].props.onClick();
  assert.equal(activations, 1, "activation does not wait for the reveal timeline");
  assert.equal(children[2].props.disabled, undefined);
  assert.equal(ending.element.props["aria-hidden"], true, "film controller retains ownership of initial accessibility");
});
