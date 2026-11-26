import test from 'node:test';
import assert from 'node:assert/strict';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const PyramidEngine = require('../assets/pyramid-engine.js');
const CasesData = require('../assets/cases-registry.js');

const { validateCaseSchema, createSession, CANONICAL_DOMAINS } = PyramidEngine;
const { CASES_REGISTRY } = CasesData;

const calibrationCase = CASES_REGISTRY.find((c) => c.meta.id === 'calibration-xlh-pathway');
const slot01Case = CASES_REGISTRY.find((c) => c.meta.id === 'case-01-slot');

test('CANONICAL_DOMAINS covers the 6 required decision categories in order', () => {
  assert.equal(CANONICAL_DOMAINS.length, 6);
  assert.deepEqual(
    CANONICAL_DOMAINS.map((d) => d.domainKey),
    ['comunicazionale', 'investigativa', 'gestionale', 'diagnostica', 'terapeutica', 'followup']
  );
});

test('CALIBRATION_CASE passes schema validation with 1->2->3->4->5->6->7 pyramid (28 tiles)', () => {
  const result = validateCaseSchema(calibrationCase);
  assert.equal(result.valid, true);
  assert.equal(result.isPending, false);
  assert.deepEqual(result.errors, []);
  assert.equal(result.summary.defaultTilesCount, 28);
  assert.equal(result.summary.maxPossibleScore, 1350);

  const rowCounts = calibrationCase.levels.map((l) => l.nodesByBranch.default.tiles.length);
  assert.deepEqual(rowCounts, [2, 3, 4, 5, 6, 7]);
});

test('CASE_01_SLOT is recognized as valid pending slot', () => {
  const result = validateCaseSchema(slot01Case);
  assert.equal(result.valid, true);
  assert.equal(result.isPending, true);
});

test('Optimal path maintains 100% Quality Coefficient and earns 1350 points', () => {
  const session = createSession(calibrationCase);
  assert.equal(session.getSnapshot().qualityPct, 100);
  assert.equal(session.getSnapshot().activeLevel, 1);

  const optimalIds = ['l1-a', 'l2-a', 'l3-a', 'l4-a', 'l5-a', 'l6-a'];
  optimalIds.forEach((tileId, idx) => {
    const res = session.selectTile(idx + 1, tileId);
    assert.equal(res.appliedQualityDelta, 0);
    assert.equal(res.qualityAfter, 100);
    assert.equal(res.advanced, true);
  });

  const report = session.getFinalReport();
  assert.equal(report.completed, true);
  assert.equal(report.finalQualityPct, 100);
  assert.equal(report.totalValueScore, 1350);
  assert.equal(report.optimalCount, 6);
  assert.equal(report.errorAttemptsCount, 0);
  assert.equal(report.passedThreshold, true);
});

test('Error selection deducts % CQ and triggers different pre-choice narrative branch', () => {
  const session = createSession(calibrationCase);
  const res1 = session.selectTile(1, 'l1-b'); // -15% CQ -> rushed_comm branch
  assert.equal(res1.appliedQualityDelta, -15);
  assert.equal(res1.qualityAfter, 85);
  assert.equal(res1.nextLevel, 2);

  const level2Node = session.getNodeForLevel(2);
  assert.equal(session.getBranchKeyForLevel(2), 'rushed_comm');
  assert.match(level2Node.preChoiceEvolution.headline, /Minimizzazione Iniziale/i);

  const res2 = session.selectTile(2, 'l2-rc-c'); // -20% CQ -> partial_workup branch
  assert.equal(res2.qualityAfter, 65);
  assert.equal(session.getBranchKeyForLevel(3), 'partial_workup');

  session.selectTile(3, 'l3-pw-d'); // -20% -> 45%
  session.selectTile(4, 'l4-c'); // -16% -> 29%
  session.selectTile(5, 'l5-f'); // -20% -> 9%
  session.selectTile(6, 'l6-d'); // -20% -> clamped to 0%

  const report = session.getFinalReport();
  assert.equal(report.completed, true);
  assert.equal(report.finalQualityPct, 0);
  assert.equal(report.passedThreshold, false);
  assert.equal(report.errorAttemptsCount, 6);
});

test('Retry-gate mode (advanceOnSelect: false) does not advance and prevents double penalty on same tile', () => {
  const gatedCase = structuredClone(calibrationCase);
  gatedCase.meta.id = 'gated-test';
  gatedCase.levels[0].nodesByBranch.default.tiles[1].advanceOnSelect = false;

  const session = createSession(gatedCase);
  const firstErr = session.selectTile(1, 'l1-b');
  assert.equal(firstErr.advanced, false);
  assert.equal(firstErr.qualityAfter, 85);
  assert.equal(session.getSnapshot().activeLevel, 1);

  const repeatErr = session.selectTile(1, 'l1-b');
  assert.equal(repeatErr.alreadyPenalized, true);
  assert.equal(repeatErr.appliedQualityDelta, 0);
  assert.equal(repeatErr.qualityAfter, 85);

  const recover = session.selectTile(1, 'l1-a');
  assert.equal(recover.advanced, true);
  assert.equal(recover.nextLevel, 2);
});
