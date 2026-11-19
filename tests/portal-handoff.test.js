import test from 'node:test';
import assert from 'node:assert/strict';
import * as phase from '../src/phase1.js';

test('opening media retains the approved Intro crop through the static portal hold', () => {
 assert.equal(typeof phase.getPortalHandoffScale, 'function');
 for(const time of [0,1,3,4])assert.equal(phase.getPortalHandoffScale(time,1.2),1.2);
});
test('opening crop releases only within the forward portal approach and is native before cocktails', () => {
 assert.equal(typeof phase.getPortalHandoffScale, 'function');
 const scale=phase.getPortalHandoffScale;
 assert.ok(scale(6.5,1.2)>1&&scale(6.5,1.2)<1.2);
 for(const time of [9,11.5,14.5,25.25,69,81])assert.equal(scale(time,1.2),1);
 for(const time of [0,5,9,69])assert.equal(scale(time,1),1);
 // No time-based animation: identical decoded source time always has identical framing.
 assert.equal(scale(6.5,1.2),scale(6.5,1.2));
});
