import test from "node:test";
import assert from "node:assert/strict";
import { MOTION, motionDistance } from "../src/motion/tokens.js";

test("motion timings stay restrained and use a single reusable scale", () => {
  assert.equal(MOTION.fast, .14);
  assert.equal(MOTION.hover, .2);
  assert.equal(MOTION.content, .3);
  assert.equal(MOTION.panel, .46);
  assert.equal(MOTION.close, .38);
  assert.equal(MOTION.cinematic, .72);
  assert.doesNotMatch(MOTION.ease + MOTION.easeInOut, /bounce|elastic|back/);
});
test("small screens get shorter motion distances rather than scaled desktop travel", () => {
  assert.equal(motionDistance(1440,900), 8);
  assert.equal(motionDistance(390,844), 4);
  assert.equal(motionDistance(844,390), 3);
});
