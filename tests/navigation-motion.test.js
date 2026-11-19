import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { buildSync } from "esbuild";
import { createRequire } from "node:module";
import { runInNewContext } from "node:vm";

// Exercise the real component lifecycle without adding a browser/test dependency.
function mountNavigation(initial = {}) {
  const hooks = [], effects = [], animations = [], events = new Map();
  let index = 0, dirty = false, tree, props, reduced = false;
  const node = () => ({ style: {}, isConnected: true, attrs: new Map(),
    focus() { document.activeElement = this; },
    setAttribute(k, v) { this.attrs.set(k, v); }, removeAttribute(k) { this.attrs.delete(k); },
    hasAttribute(k) { return this.attrs.has(k); }, getAttribute(k) { return this.attrs.get(k) ?? null; },
    getClientRects() { return [1]; }, contains(el) { return el === close; },
  });
  const close = node(), drawer = node(), scrim = node(), bar = node(), view = node(), heading = node(), sibling = node();
  const nav = { parentElement: { children: [] }, querySelector(selector) {
    if (selector === ".sip-navbar__bar") return bar;
    if (selector === ".sip-navbar__drawer") return drawer;
    if (selector === ".sip-navbar__scrim") return scrim;
    return view;
  }, querySelectorAll() { return [close]; } };
  sibling.classList = { contains: () => false };
  nav.parentElement.children = [nav, sibling];
  drawer.querySelector = () => view; drawer.querySelectorAll = () => [view, heading];
  const document = { documentElement: { style: {}, clientWidth: 1000 }, body: { style: {}, classList: { add() {}, remove() {} } }, activeElement: null };
  const media = { get matches() { return reduced; }, addEventListener(_, fn) { events.set("media", fn); }, removeEventListener() {} };
  const window = { innerWidth: 1000, innerHeight: 900, matchMedia: () => media,
    addEventListener(k, f) { events.set(k, f); }, removeEventListener(k) { events.delete(k); } };
  const useEffect = (fn, deps) => {
    const i = index++, old = hooks[i];
    if (!old || deps.some((d, j) => d !== old.deps[j])) {
      effects.push(() => { old?.cleanup?.(); hooks[i] = { deps, cleanup: fn() }; });
    }
  };
  const react = { useRef(v) { const i = index++; return hooks[i] ||= { current: v }; }, useId: () => "navigation",
    useState(v) { const i = index++; if (!(i in hooks)) hooks[i] = typeof v === "function" ? v() : v;
      return [hooks[i], (next) => { const value = typeof next === "function" ? next(hooks[i]) : next; if (value !== hooks[i]) { hooks[i] = value; dirty = true; } }]; },
    useEffect, useLayoutEffect: useEffect,
  };
  const apply = (target, values) => { for (const el of Array.isArray(target) ? target : [target]) if (el) Object.assign(el.style, values); };
  const gsap = { set: apply, to(target, values) { const tween = { target, values, killed: false,
    kill() { this.killed = true; }, progress() { if (!this.killed) { apply(target, values); this.killed = true; values.onComplete?.(); } return this; } };
    animations.push(tween); return tween;
  }, killTweensOf(target) { animations.filter((a) => a.target === target).forEach((a) => a.kill()); } };
  const output = buildSync({ entryPoints: [new URL("../src/components/SiteNavigation.jsx", import.meta.url).pathname], bundle: true, write: false, platform: "node", format: "cjs", jsx: "automatic", external: ["react", "react/jsx-runtime", "gsap"] });
  const module = { exports: {} }, realRequire = createRequire(import.meta.url);
  runInNewContext(output.outputFiles[0].text, { module, exports: module.exports,
    require: (name) => name === "react" ? { ...realRequire("react"), ...react } : name === "gsap" ? { gsap } : realRequire(name),
    window, document, getComputedStyle: () => ({ paddingRight: "0" }),
    requestAnimationFrame: (fn) => { fn(); return 1; }, cancelAnimationFrame() {},
  });
  const walk = (el, fn) => { if (!el || typeof el !== "object") return; fn(el); const children = el.props?.children; (Array.isArray(children) ? children.flat(Infinity) : [children]).forEach((child) => walk(child, fn)); };
  const all = () => { const result = []; walk(tree, (el) => result.push(el)); return result; };
  const render = () => { let guard = 0; do { dirty = false; index = 0; tree = module.exports.SiteNavigation(props);
    walk(tree, (el) => { if (el.ref) el.ref.current = el.type === "nav" ? nav : close; });
    while (effects.length) effects.shift()();
  } while (dirty && guard++ < 15); };
  const calls = [], chapter = { id: "source-id", number: "01", title: "SOURCE", emotion: "Desire", heroPeak: 31.5 };
  props = { openSection: null, chapters: [chapter], logoSrc: "logo.svg", onToggle() {}, onHome() {},
    onClose() { calls.push("close"); props = { ...props, openSection: null }; dirty = true; },
    onJourneySelect(value) { calls.push(value); }, ...initial };
  render();
  return { chapter, calls, drawer, sibling, document, animations,
    elements: all, render, focusOutside() { const trigger = node(); document.activeElement = trigger; return trigger; }, update(next) { props = { ...props, ...next }; render(); },
    clickRow() { all().find((el) => el.props?.variant === "row").props.onClick({ currentTarget: node() }); render(); },
    escape() { events.get("keydown")?.({ key: "Escape", preventDefault() {} }); render(); },
    finish() { const current = animations.filter((a) => !a.killed); current.forEach((a) => a.progress(1)); render(); },
    reduce() { reduced = true; events.get("media")?.({ matches: true }); render(); },
  };
}

test("row feedback closes before handing the identical chapter to its parent", () => {
  const app = mountNavigation({ openSection: "journey" });
  app.finish(); app.clickRow();
  assert.equal(app.calls.length, 0, "selection feedback must precede close");
  app.finish();
  assert.deepEqual(app.calls, ["close"]);
  assert.equal(drawerElement(app).props.inert, "");
  app.finish();
  assert.equal(app.calls[1], app.chapter, "do not reconstruct or retarget the chapter");
});

test("view switches animate only the newly active view, without locking its controls", () => {
  const app = mountNavigation({ openSection: "journey" });
  app.finish(); app.update({ openSection: "about" });
  const active = app.animations.filter((animation) => !animation.killed);
  assert.ok(active.some((animation) => animation.values.duration === .3 && animation.target !== app.drawer && animation.values.y === 0), "new view gets a restrained content transition");
  assert.equal(drawerElement(app).props.inert, undefined);
});

test("live reduced motion settles selection and closing with no delayed handoff", () => {
  const app = mountNavigation({ openSection: "journey" });
  app.finish(); app.clickRow(); app.reduce();
  assert.deepEqual(app.calls, ["close", app.chapter]);
  assert.equal(drawerElement(app).props.hidden, true);
  assert.equal(app.animations.filter((animation) => !animation.killed).length, 0);
});

test("Escape cancels pending feedback instead of navigating later", () => {
  const app = mountNavigation({ openSection: "journey" });
  app.clickRow(); app.escape(); app.finish(); app.finish();
  assert.deepEqual(app.calls, ["close"]);
});

test("reopening interrupts exit and never lets stale exit hide the new view", () => {
  const app = mountNavigation({ openSection: "journey" });
  app.finish(); app.clickRow(); app.finish();
  app.update({ openSection: "about" }); app.finish();
  assert.equal(drawerElement(app).props.hidden, false);
  assert.equal(drawerElement(app).props.role, "dialog");
  assert.deepEqual(app.calls, ["close"]);
});

test("open isolates and locks the page before the entrance completes", () => {
  const app = mountNavigation({ openSection: "journey" });
  assert.equal(app.sibling.hasAttribute("inert"), true);
  assert.equal(app.document.body.style.overflow, "hidden");
  assert.equal(drawerElement(app).props.inert, undefined);
  assert.notEqual(app.document.activeElement, null);
});

test("closing restores the previously focused opener even when controlled externally", () => {
  const app = mountNavigation();
  const opener = app.focusOutside();
  app.update({ openSection: "about" }); app.escape();
  assert.equal(app.document.activeElement, opener);
  assert.equal(app.sibling.hasAttribute("inert"), false);
});

test("reduced motion during entrance removes travel immediately", () => {
  const app = mountNavigation();
  app.update({ openSection: "journey" }); app.reduce();
  assert.equal(app.animations.filter((animation) => !animation.killed).length, 0);
  app.update({ openSection: null });
  assert.equal(drawerElement(app).props.hidden, true);
});

const drawerElement = (app) => app.elements().find((el) => el.props?.className === "sip-navbar__drawer");

test("close keeps presentation temporarily but immediately removes dialog and focusability", () => {
  const app = mountNavigation({ openSection: "journey" });
  app.finish(); app.update({ openSection: null });
  const drawer = drawerElement(app);
  assert.equal(drawer.props.hidden, false, "exit must remain painted until it settles");
  assert.equal(drawer.props.inert, "");
  assert.equal(drawer.props["aria-hidden"], true);
  assert.equal(drawer.props.role, undefined);
  app.finish();
  assert.equal(drawerElement(app).props.hidden, true);
});
