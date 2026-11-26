import test from 'node:test';
import assert from 'node:assert/strict';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const PyramidEngine = require('../assets/pyramid-engine.js');
const CasesData = require('../assets/cases-registry.js');

const { validateCaseSchema, createSession, getDisplayTiles } = PyramidEngine;
const { CASES_REGISTRY } = CasesData;

const casoMatteo = CASES_REGISTRY.find((c) => c.meta.id === 'caso-202-xlh-pregresso');
const casoElena = CASES_REGISTRY.find((c) => c.meta.id === 'caso-202-elena-adolescente');

test('CASES_REGISTRY contains both official active clinical cases (Matteo 26y and Elena 15y)', () => {
  assert.equal(CASES_REGISTRY.length, 2);
  assert.ok(casoMatteo, 'Missing Matteo case');
  assert.ok(casoElena, 'Missing Elena case');
  assert.equal(casoMatteo.meta.status, 'active');
  assert.equal(casoElena.meta.status, 'active');
});

for (const [label, caseObj] of [
  ['CASO 01 (Matteo, 26 anni)', casoMatteo],
  ['CASO 02 (Elena, 15 anni)', casoElena]
]) {
  test(`${label} passes validation with 5 steps, 1->2->3->4->5 snodi (15) and 53 decision tiles`, () => {
    const res = validateCaseSchema(caseObj);
    assert.equal(res.valid, true);
    assert.equal(res.isPending, false);
    assert.deepEqual(res.errors, []);
    assert.equal(res.summary.stepsCount, 5);
    assert.equal(res.summary.snodiCount, 15);
    assert.equal(res.summary.totalDecisionTiles, 53);
    assert.equal(res.summary.maxPossibleScore, 1500);

    const snodiCounts = caseObj.steps.map((s) => s.snodi.length);
    assert.deepEqual(snodiCounts, [1, 2, 3, 4, 5]);

    const tileCountsPerStep = caseObj.steps.map((s) =>
      s.snodi.reduce((sum, sn) => sum + sn.tiles.length, 0)
    );
    assert.deepEqual(tileCountsPerStep, [2, 6, 9, 16, 20]);
  });

  test(`${label}: all-correct run across 15 snodi maintains 100% CQ and earns 1500 pt`, () => {
    const session = createSession(caseObj);
    caseObj.steps.forEach((step) => {
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
}

test('getDisplayTiles deterministically varies correct answer position across snodi', () => {
  const correctIndices = [];
  casoElena.steps.forEach((step) => {
    step.snodi.forEach((snodo) => {
      const shuffled = getDisplayTiles(snodo);
      assert.equal(shuffled.length, snodo.tiles.length);
      correctIndices.push(shuffled.findIndex((t) => t.isCorrect));
    });
  });
  assert.ok(new Set(correctIndices).size >= 2);
});

test('Elena Step 1 error S1-COM-B (-15% CQ) triggers Step 2 defensive narrative branch and clamps cumulative errors', () => {
  const session = createSession(casoElena);
  const res1 = session.selectTile('e-s1-1', 'S1-COM-B');
  assert.equal(res1.record.qualityAfter, 85);
  assert.equal(res1.stepAdvanced, true);

  const evoStep2 = session.getStepPreChoiceEvolution(2);
  assert.match(evoStep2.narrative, /Elena resta trattenuta/i);

  casoElena.steps.slice(1).forEach((step) => {
    step.snodi.forEach((snodo) => {
      const wrongTile = snodo.tiles.find((t) => !t.isCorrect);
      session.selectTile(snodo.snodoId, wrongTile.id);
    });
  });

  const report = session.getFinalReport();
  assert.equal(report.completed, true);
  assert.equal(report.finalQualityPct, 0);
  assert.equal(report.passedThreshold, false);
});
