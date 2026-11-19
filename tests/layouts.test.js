import test from "node:test";
import assert from "node:assert/strict";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { buildSync } from "esbuild";
import { createRequire } from "node:module";
import { runInNewContext } from "node:vm";
import { readFileSync } from "node:fs";

function loadLayout(file, name) {
  const result = buildSync({
    entryPoints: [new URL(`../src/components/${file}.jsx`, import.meta.url).pathname],
    bundle: true, write: false, platform: "node", format: "cjs", jsx: "automatic",
    external: ["react", "react/jsx-runtime"],
  });
  const module = { exports: {} };
  runInNewContext(result.outputFiles[0].text, { module, exports: module.exports, require: createRequire(import.meta.url) });
  return module.exports[name];
}

test("both experience routes use the unified HUD without a duplicate identity badge or reserved badge styles", () => {
  const app = readFileSync(new URL("../src/App.jsx", import.meta.url), "utf8");
  assert.doesNotMatch(app, /JourneyPosition|journey-position/);
  assert.equal((app.match(/<CocktailHud\b/g) ?? []).length, 2);
  for (const file of ["screens.css", "minimal-interface.css"]) {
    const css = readFileSync(new URL(`../src/design/${file}`, import.meta.url), "utf8");
    assert.doesNotMatch(css, /journey-position/);
  }
});

test("the static ending shows the minimal closing world, footer and available restart", () => {
  const EndingContent = loadLayout("EndingContent", "EndingContent");
  const html = renderToStaticMarkup(createElement(EndingContent, { staticMode: true, logoSrc: "approved-logo.svg", onEnterAgain() {} }));
  assert.match(html, /ONE MORE SIP\?/);
  assert.match(html, /<footer class="ending-footer"/);
  assert.match(html, /An experimental cocktail experience/);
  assert.match(html, /ENTER AGAIN/);
  assert.match(html, /aria-hidden="false"/);
  assert.match(html, /tabindex="0"/);
  assert.doesNotMatch(html, /^<div[^>]*(?:inert=|aria-hidden="true")/);
});

test("the film-controlled ending stays inert until its existing controller reveals it", () => {
  const EndingContent = loadLayout("EndingContent", "EndingContent");
  const html = renderToStaticMarkup(createElement(EndingContent, { logoSrc: "approved-logo.svg", onEnterAgain() {} }));
  assert.match(html, /class="ending-content"/);
  assert.match(html, /aria-hidden="true"/);
  assert.match(html, /inert=""/);
  assert.match(html, /tabindex="-1"/);
});
