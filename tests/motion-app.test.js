import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
const app = readFileSync(new URL("../src/App.jsx",import.meta.url),"utf8");
test("entry and reading transitions use shared motion timings",()=>{
 assert.match(app,/import \{ MOTION, motionDistance \} from "\.\/motion\/tokens"/);
 assert.match(app,/duration: MOTION\.panel/);
 assert.match(app,/duration: MOTION\.cinematic/);
});
test("closed chapters have a short inert exit rather than an abrupt removal",()=>{
 assert.match(app,/const \[lastChapter, setLastChapter\] = useState\(currentChapter\)/);
 assert.match(app,/inert=\{!currentChapter \? "" : undefined\}/);
});
test("motion layer changes movement only, never approved layout or color",()=>{
 const css=readFileSync(new URL("../src/design/motion-polish.css",import.meta.url),"utf8");
 assert.doesNotMatch(css,/(?:^|[;{])\s*(?:width|height|padding|margin|border-radius|background|color|font|font-size|display|gap)\s*:/m);
 assert.match(css,/prefers-reduced-motion/);
 assert.match(css,/translate: 0 3px/);
});
