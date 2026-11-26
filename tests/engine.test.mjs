import test from 'node:test';
import assert from 'node:assert/strict';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const PyramidEngine = require('../assets/pyramid-engine.js');
const CasesData = require('../assets/cases-registry.js');

const { validateCaseSchema, createSession, getDisplayTiles } = PyramidEngine;
const { CASES_REGISTRY } = CasesData;

const caso202 = CASES_REGISTRY.find((c) => c.meta.id === 'caso-202-xlh-pregresso');
const slotNext = CASES_REGISTRY.find((c) => c.meta.id === 'caso-successivo-slot');

test('CASO_202 passes validation with 5 steps, 1->2->3->4->5 snodi (15) and 53 decision tiles', () => {
  const res = validateCaseSchema(caso202);
  assert.equal(res.valid, true);
  assert.equal(res.isPending, false);
  assert.deepEqual(res.errors, []);
  assert.equal(res.summary.stepsCount, 5);
  assert.equal(res.summary.snodiCount, 15);
  assert.equal(res.summary.totalDecisionTiles, 53);
  assert.equal(res.summary.maxPossibleScore, 1500);

  const snodiCounts = caso202.steps.map((s) => s.snodi.length);
  assert.deepEqual(snodiCounts, [1, 2, 3, 4, 5]);

  const tileCountsPerStep = caso202.steps.map((s) =>
    s.snodi.reduce((sum, sn) => sum + sn.tiles.length, 0)
  );
  assert.deepEqual(tileCountsPerStep, [2, 6, 9, 16, 20]);
});

test('NEXT_CASE_SLOT is recognized as pending slot', () => {
  const res = validateCaseSchema(slotNext);
  assert.equal(res.valid, true);
  assert.equal(res.isPending, true);
});

test('getDisplayTiles deterministically varies correct answer position across snodi', () => {
  const correctIndices = [];
  caso202.steps.forEach((step) => {
    step.snodi.forEach((snodo) => {
      const shuffled = getDisplayTiles(snodo);
      assert.equal(shuffled.length, snodo.tiles.length);
      correctIndices.push(shuffled.findIndex((t) => t.isCorrect));
    });
  });
  const uniquePositions = new Set(correctIndices);
  assert.ok(uniquePositions.size >= 2, `Expected varied positions, got ${[...uniquePositions]}`);
});

test('All-correct run across 15 snodi maintains 100% CQ and earns 1500 pt', () => {
  const session = createSession(caso202);
  assert.equal(session.getSnapshot().qualityPct, 100);
  assert.equal(session.getSnapshot().activeStep, 1);

  caso202.steps.forEach((step) => {
    step.snodi.forEach((snodo) => {
      const correctTile = snodo.tiles.find((t) => t.isCorrect);
      const out = session.selectTile(snodo.snodoId, correctTile.id);
      assert.equal(out.record.qualityDeltaPct, 0);
      assert.equal(out.record.qualityAfter, 100);
    });
  });

  const report = session.getFinalReport();
  assert.equal(report.completed, true);
  assert.equal(report.finalQualityPct, 100);
  assert.equal(report.totalValueScore, 1500);
  assert.equal(report.correctCount, 15);
  assert.equal(report.errorCount, 0);
  assert.equal(report.passedThreshold, true);
});

test('Step 1 error S1-COM-B (-15% CQ) changes Step 2 pre-choice evolution narrative and clamps cumulative errors', () => {
  const session = createSession(caso202);
  const res1 = session.selectTile('s1-1', 'S1-COM-B');
  assert.equal(res1.record.qualityAfter, 85);
  assert.equal(res1.stepAdvanced, true);
  assert.equal(session.getSnapshot().activeStep, 2);

  const evoStep2 = session.getStepPreChoiceEvolution(2);
  assert.match(evoStep2.narrative, /disorientato per la minimizzazione/i);

  // Choose worst errors across remaining 14 snodi to verify clamping at 0%
  caso202.steps.slice(1).forEach((step) => {
    step.snodi.forEach((snodo) => {
      const wrongTile = snodo.tiles.find((t) => !t.isCorrect);
      session.selectTile(snodo.snodoId, wrongTile.id);
    });
  });

  const report = session.getFinalReport();
  assert.equal(report.completed, true);
  assert.equal(report.finalQualityPct, 0);
  assert.equal(report.passedThreshold, false);
  assert.equal(report.errorCount, 15);
});
