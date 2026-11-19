import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync, existsSync } from "node:fs";
import { transformSync } from "esbuild";
import { createRequire } from "node:module";
import { runInNewContext } from "node:vm";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";

const app = readFileSync(new URL("../src/App.jsx", import.meta.url), "utf8");
const hudSource = app.slice(app.indexOf("function CocktailHud("), app.indexOf("\nfunction Ending("));
const dataSource = app.slice(app.indexOf("const chapters ="), app.indexOf("const journeyEmotions"));
const { code } = transformSync(`${dataSource}\n${hudSource}\nmodule.exports = { CocktailHud, chapters };`, { loader: "jsx", jsx: "automatic", format: "cjs" });
const module = { exports: {} };
const require = createRequire(import.meta.url);
const { code: actionCode } = transformSync(readFileSync(new URL("../src/components/Action.jsx", import.meta.url), "utf8"), { loader: "jsx", jsx: "automatic", format: "cjs" });
const actionModule = { exports: {} };
runInNewContext(actionCode, { module: actionModule, exports: actionModule.exports, require });
runInNewContext(code, { module, exports: module.exports, require, ...require("react"), ...actionModule.exports });
const { CocktailHud, chapters } = module.exports;
const render = (chapter, openPanel = null, modalActive = Boolean(openPanel)) => renderToStaticMarkup(createElement(CocktailHud, { chapter, openPanel, modalActive, hudRef: { current: null }, onPanelToggle() {}, onKeyDown() {} }));

test("closed HUDs share architecture; the existing Negroni reading-panel treatment stays isolated", () => {
  assert.match(render(chapters[0], "history"), /negroni-prototype/);
  for (const chapter of chapters) {
    const html = render(chapter);
    assert.doesNotMatch(html, /negroni-prototype|negroni-emotion/);
    assert.match(html, /cocktail-hud is-visible/);
    assert.ok(html.includes(`${chapter.number} / 08`));
  }
  assert.match(render(null), /aria-hidden="true"/);
});

test("Negroni reading hierarchy uses existing copy and preserves the modal contract", () => {
  const history = render(chapters[0], "history");
  assert.match(history, /class="negroni-emotion">TEMPTATION/);
  assert.match(history, /class="negroni-lead"/);
  assert.match(history, /role="dialog" aria-modal="true"/);
  assert.match(history, /aria-pressed="true"/);
  assert.match(history, /aria-controls="negroni-history-panel"/);
  assert.ok(history.includes(chapters[0].history[0]));
  const recipe = render(chapters[0], "recipe");
  assert.ok(recipe.includes(chapters[0].recipeTitle));
  for (const [amount, ingredient] of chapters[0].ingredients) assert.ok(recipe.includes(`<strong>${amount}</strong><span>${ingredient}</span>`));
  assert.match(recipe, /Close details and return to the cocktail scene/);
});

test("every closed HUD reads chapter number, name, then desire without a Negroni exception", () => {
  for (const chapter of chapters) {
    const label = render(chapter).match(/<div class="cocktail-label"[^>]*>([\s\S]*?)<\/div>/)[1];
    const nameAt = label.indexOf(chapter.title);
    const desireAt = label.indexOf(chapter.emotion);
    const numberAt = label.indexOf(`${chapter.number} / 08`);
    assert.ok(numberAt >= 0 && nameAt > numberAt && desireAt > nameAt, chapter.id);
    assert.match(label, /class="cocktail-emotion"/);
  }
});
