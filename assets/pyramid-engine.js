/* ═══════════════════════════════════════════════════════════════════════
   RADAR XLH — Piramide Inversa Multi-Snodo Engine
   Supporta strutture piramidali a N Step progressivi con 1..K snodi
   decisionali per step, ramificazione narrativa pre-scelta, Coefficiente
   di Qualità (%) da 100% e ordinamento anti-bias deterministico dei Post-it.
   Compatibile con Browser (window.PyramidEngine) e Node.js (CommonJS).
   ═══════════════════════════════════════════════════════════════════════ */

(function (root, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.PyramidEngine = factory();
  }
})(typeof globalThis !== 'undefined' ? globalThis : this, function () {
  'use strict';

  const DOMAIN_META = Object.freeze({
    comunicazionale: {
      domainKey: 'comunicazionale',
      domainLabel: 'Scelta Comunicazionale',
      shortLabel: 'Comunicazionale',
      accentColor: '#0E8AC8'
    },
    investigativa: {
      domainKey: 'investigativa',
      domainLabel: 'Scelta Investigativa / Esaminazione',
      shortLabel: 'Investigativa',
      accentColor: '#0284C7'
    },
    gestionale: {
      domainKey: 'gestionale',
      domainLabel: 'Scelta Gestionale',
      shortLabel: 'Gestionale',
      accentColor: '#1B3A5C'
    },
    diagnostica: {
      domainKey: 'diagnostica',
      domainLabel: 'Scelta Diagnostica',
      shortLabel: 'Diagnostica',
      accentColor: '#D97706'
    },
    terapeutica: {
      domainKey: 'terapeutica',
      domainLabel: 'Scelta Terapeutica',
      shortLabel: 'Terapeutica',
      accentColor: '#E87C1E'
    },
    followup: {
      domainKey: 'followup',
      domainLabel: 'Scelta Mantenimento / Follow-up',
      shortLabel: 'Follow-up',
      accentColor: '#0F766E'
    }
  });

  function clamp(val, min, max) {
    return Math.min(max, Math.max(min, val));
  }

  function hashString(str) {
    let h = 2166136261;
    for (let i = 0; i < str.length; i += 1) {
      h ^= str.charCodeAt(i);
      h = Math.imul(h, 16777619);
    }
    return h >>> 0;
  }

  /**
   * Restituisce i Post-it dello snodo in ordine deterministico anti-bias
   * (la risposta corretta non compare sistematicamente come prima opzione).
   */
  function getDisplayTiles(snodo) {
    const tiles = [...(snodo.tiles || [])];
    if (tiles.length <= 1) return tiles;
    let seed = hashString(String(snodo.snodoId || snodo.snodoCode || 'snodo'));
    for (let i = tiles.length - 1; i > 0; i -= 1) {
      seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0;
      const j = seed % (i + 1);
      const tmp = tiles[i];
      tiles[i] = tiles[j];
      tiles[j] = tmp;
    }
    return tiles;
  }

  function getQualityBand(pct) {
    const value = Number(pct);
    if (value >= 90) {
      return {
        key: 'excellent',
        label: 'Eccellenza Clinica',
        badgeText: 'Percorso Ottimale (≥ 90%)',
        color: '#059669'
      };
    }
    if (value >= 75) {
      return {
        key: 'pass',
        label: 'Standard Qualitativo Raggiunto',
        badgeText: 'Soglia ≥ 75% Superata',
        color: '#0E8AC8'
      };
    }
    if (value >= 55) {
      return {
        key: 'warning',
        label: 'Criticità Decisionali Rilevate',
        badgeText: 'Sotto Soglia (55–74%)',
        color: '#E87C1E'
      };
    }
    return {
      key: 'critical',
      label: 'Deriva Clinica Significativa',
      badgeText: 'Critico (< 55%)',
      color: '#DC2626'
    };
  }

  function validateCaseSchema(caseObj) {
    const errors = [];

    if (!caseObj || typeof caseObj !== 'object') {
      return { valid: false, isPending: false, errors: ['Il payload del caso deve essere un oggetto JSON valido.'] };
    }

    const meta = caseObj.meta;
    if (!meta || typeof meta !== 'object') {
      errors.push('Sezione "meta" mancante.');
      return { valid: false, isPending: false, errors };
    }

    if (!meta.id || typeof meta.id !== 'string') errors.push('Campo "meta.id" obbligatorio.');
    if (!meta.title || typeof meta.title !== 'string') errors.push('Campo "meta.title" obbligatorio.');

    if (meta.status === 'pending_case') {
      return { valid: errors.length === 0, isPending: true, errors };
    }

    if (!caseObj.apex || typeof caseObj.apex !== 'object') {
      errors.push('Sezione "apex" (Step 0) mancante.');
    } else {
      if (!caseObj.apex.title) errors.push('Campo "apex.title" mancante.');
    }

    if (!Array.isArray(caseObj.steps) || caseObj.steps.length === 0) {
      errors.push('La proprietà "steps" deve contenere almeno 1 step.');
      return { valid: false, isPending: false, errors };
    }

    let snodiCount = 0;
    let totalDecisionTiles = 0;
    let maxPossibleScore = 0;

    caseObj.steps.forEach((step, idx) => {
      const expectedStep = idx + 1;
      if (!step || typeof step !== 'object') {
        errors.push(`Step ${expectedStep} non valido.`);
        return;
      }
      if (step.stepNumber !== expectedStep) {
        errors.push(`Step ${expectedStep}: "stepNumber" deve essere ${expectedStep}.`);
      }
      if (!step.preChoiceEvolutionByBranch || !step.preChoiceEvolutionByBranch.default) {
        errors.push(`Step ${expectedStep}: "preChoiceEvolutionByBranch.default" è obbligatorio.`);
      }
      if (!Array.isArray(step.snodi) || step.snodi.length === 0) {
        errors.push(`Step ${expectedStep}: deve contenere almeno 1 snodo.`);
        return;
      }

      step.snodi.forEach((snodo) => {
        snodiCount += 1;
        if (!snodo.snodoId || !snodo.snodoCode) {
          errors.push(`Step ${expectedStep}: snodo privo di "snodoId" o "snodoCode".`);
        }
        if (!DOMAIN_META[snodo.domainKey]) {
          errors.push(`Snodo ${snodo.snodoCode || '?'}: "domainKey" non riconosciuto ("${snodo.domainKey}").`);
        }
        if (typeof snodo.valueWeight !== 'number' || snodo.valueWeight <= 0) {
          errors.push(`Snodo ${snodo.snodoCode || '?'}: "valueWeight" deve essere > 0.`);
        } else {
          maxPossibleScore += snodo.valueWeight;
        }
        if (!Array.isArray(snodo.tiles) || snodo.tiles.length < 2) {
          errors.push(`Snodo ${snodo.snodoCode || '?'}: servono almeno 2 tile/post-it.`);
          return;
        }

        let hasCorrect = false;
        let hasError = false;
        snodo.tiles.forEach((tile) => {
          totalDecisionTiles += 1;
          if (!tile.id || !tile.headline || !tile.bodyText) {
            errors.push(`Snodo ${snodo.snodoCode} tile ${tile.id || '?'}: campi obbligatori mancanti.`);
          }
          if (typeof tile.isCorrect !== 'boolean') {
            errors.push(`Snodo ${snodo.snodoCode} tile ${tile.id}: "isCorrect" deve essere boolean.`);
          }
          if (typeof tile.qualityDeltaPct !== 'number' || tile.qualityDeltaPct > 0) {
            errors.push(`Snodo ${snodo.snodoCode} tile ${tile.id}: "qualityDeltaPct" deve essere <= 0.`);
          }
          if (!tile.feedbackText) {
            errors.push(`Snodo ${snodo.snodoCode} tile ${tile.id}: "feedbackText" mancante.`);
          }
          if (tile.isCorrect) hasCorrect = true;
          else hasError = true;
        });

        if (!hasCorrect) errors.push(`Snodo ${snodo.snodoCode}: manca l'opzione corretta.`);
        if (!hasError) errors.push(`Snodo ${snodo.snodoCode}: manca almeno un'opzione errata con penalità %.`);
      });
    });

    return {
      valid: errors.length === 0,
      isPending: false,
      errors,
      summary: {
        stepsCount: caseObj.steps.length,
        snodiCount,
        totalDecisionTiles,
        maxPossibleScore
      }
    };
  }

  function createSession(caseData, savedSnapshot) {
    const validation = validateCaseSchema(caseData);
    if (!validation.valid || validation.isPending) {
      throw new Error(
        validation.isPending
          ? 'Il caso selezionato è in attesa di caricamento contenuti.'
          : `Schema caso non valido: ${validation.errors.join(' | ')}`
      );
    }

    const totalSteps = caseData.steps.length;
    const totalSnodi = validation.summary.snodiCount;
    const maxPossibleScore = validation.summary.maxPossibleScore;
    const initialQualityPct = Number(caseData.meta.initialQualityPct ?? 100);
    const passThresholdPct = Number(caseData.meta.passThresholdPct ?? 75);

    const state = savedSnapshot && savedSnapshot.caseId === caseData.meta.id
      ? {
          caseId: savedSnapshot.caseId,
          qualityPct: clamp(Number(savedSnapshot.qualityPct ?? initialQualityPct), 0, 100),
          valueScore: Math.max(0, Number(savedSnapshot.valueScore ?? 0)),
          activeStep: clamp(Number(savedSnapshot.activeStep ?? 1), 1, totalSteps),
          completed: Boolean(savedSnapshot.completed),
          branchHistory: { 1: 'default', ...(savedSnapshot.branchHistory || {}) },
          resolvedSnodi: { ...(savedSnapshot.resolvedSnodi || {}) },
          attemptsLog: Array.isArray(savedSnapshot.attemptsLog) ? [...savedSnapshot.attemptsLog] : []
        }
      : {
          caseId: caseData.meta.id,
          qualityPct: initialQualityPct,
          valueScore: 0,
          activeStep: 1,
          completed: false,
          branchHistory: { 1: 'default' },
          resolvedSnodi: {},
          attemptsLog: []
        };

    function getStepConfig(stepNumber) {
      return caseData.steps.find((s) => s.stepNumber === stepNumber) || null;
    }

    function findSnodoLocation(snodoId) {
      for (const step of caseData.steps) {
        const snodo = step.snodi.find((sn) => sn.snodoId === snodoId);
        if (snodo) return { step, snodo };
      }
      return null;
    }

    function getStepStatus(stepNumber) {
      const step = getStepConfig(stepNumber);
      if (!step) return 'locked';
      const allResolved = step.snodi.every((sn) => Boolean(state.resolvedSnodi[sn.snodoId]));
      if (allResolved) return 'resolved';
      if (!state.completed && state.activeStep === stepNumber) return 'active';
      return 'locked';
    }

    function getStepPreChoiceEvolution(stepNumber) {
      const step = getStepConfig(stepNumber);
      if (!step) return null;
      const branchKey = state.branchHistory[stepNumber] || 'default';
      return step.preChoiceEvolutionByBranch[branchKey] || step.preChoiceEvolutionByBranch.default;
    }

    function getActiveSnodoPointer() {
      if (state.completed) return null;
      const step = getStepConfig(state.activeStep);
      if (!step) return null;
      return step.snodi.find((sn) => !state.resolvedSnodi[sn.snodoId]) || step.snodi[0];
    }

    function selectTile(snodoId, tileId) {
      if (state.completed) {
        throw new Error('Il caso clinico è già stato completato.');
      }
      const loc = findSnodoLocation(snodoId);
      if (!loc) {
        throw new Error(`Snodo "${snodoId}" non trovato.`);
      }
      const { step, snodo } = loc;
      if (step.stepNumber !== state.activeStep) {
        throw new Error(`Lo snodo ${snodo.snodoCode} appartiene allo Step ${step.stepNumber} (Step attivo: ${state.activeStep}).`);
      }
      if (state.resolvedSnodi[snodoId]) {
        throw new Error(`Lo snodo ${snodo.snodoCode} è già stato completato.`);
      }

      const tile = snodo.tiles.find((t) => t.id === tileId);
      if (!tile) {
        throw new Error(`Tile "${tileId}" non presente nello snodo ${snodo.snodoCode}.`);
      }

      const qualityBefore = state.qualityPct;
      const delta = tile.qualityDeltaPct < 0 ? tile.qualityDeltaPct : 0;
      state.qualityPct = clamp(state.qualityPct + delta, 0, 100);
      const qualityAfter = state.qualityPct;

      const awardedValue = tile.isCorrect ? snodo.valueWeight : 0;
      state.valueScore += awardedValue;

      const correctTile = snodo.tiles.find((t) => t.isCorrect) || snodo.tiles[0];

      const record = {
        stepNumber: step.stepNumber,
        snodoId: snodo.snodoId,
        snodoCode: snodo.snodoCode,
        domainKey: snodo.domainKey,
        domainLabel: snodo.domainLabel,
        tileId: tile.id,
        headline: tile.headline,
        bodyText: tile.bodyText,
        isCorrect: tile.isCorrect,
        qualityDeltaPct: delta,
        qualityBefore,
        qualityAfter,
        valuePoints: awardedValue,
        maxValuePoints: snodo.valueWeight,
        feedbackText: tile.feedbackText,
        evolutionImpact: tile.evolutionImpact || '',
        nextBranchKey: tile.nextBranchKey || 'default',
        correctTileId: correctTile.id,
        correctHeadline: correctTile.headline,
        correctFeedbackText: correctTile.feedbackText,
        timestamp: new Date().toISOString()
      };

      state.resolvedSnodi[snodoId] = record;
      state.attemptsLog.push(record);

      const stepFinished = step.snodi.every((sn) => Boolean(state.resolvedSnodi[sn.snodoId]));
      let stepAdvanced = false;

      if (stepFinished) {
        if (step.stepNumber < totalSteps) {
          const nextStepNum = step.stepNumber + 1;
          const nextStepCfg = getStepConfig(nextStepNum);
          let chosenBranch = 'default';
          for (const sn of step.snodi) {
            const r = state.resolvedSnodi[sn.snodoId];
            if (r && r.nextBranchKey && nextStepCfg?.preChoiceEvolutionByBranch?.[r.nextBranchKey]) {
              chosenBranch = r.nextBranchKey;
              break;
            }
          }
          state.activeStep = nextStepNum;
          state.branchHistory[nextStepNum] = chosenBranch;
          stepAdvanced = true;
        } else {
          state.completed = true;
        }
      }

      return {
        record,
        stepFinished,
        stepAdvanced,
        completed: state.completed,
        nextStepNumber: stepAdvanced ? state.activeStep : null,
        snapshot: getSnapshot()
      };
    }

    function getFinalReport() {
      const timeline = [];
      let correctCount = 0;
      let errorCount = 0;

      caseData.steps.forEach((step) => {
        step.snodi.forEach((snodo) => {
          const rec = state.resolvedSnodi[snodo.snodoId];
          if (rec) {
            timeline.push(rec);
            if (rec.isCorrect) correctCount += 1;
            else errorCount += 1;
          }
        });
      });

      return {
        caseMeta: caseData.meta,
        completed: state.completed,
        finalQualityPct: state.qualityPct,
        initialQualityPct,
        passThresholdPct,
        passedThreshold: state.qualityPct >= passThresholdPct,
        qualityBand: getQualityBand(state.qualityPct),
        totalValueScore: state.valueScore,
        maxPossibleScore,
        correctCount,
        errorCount,
        resolvedSnodiCount: timeline.length,
        totalSnodiCount: totalSnodi,
        timeline
      };
    }

    function getSnapshot() {
      const resolvedCount = Object.keys(state.resolvedSnodi).length;
      const activeSnodo = getActiveSnodoPointer();
      return {
        caseId: state.caseId,
        qualityPct: state.qualityPct,
        valueScore: state.valueScore,
        maxPossibleScore,
        activeStep: state.activeStep,
        totalSteps,
        resolvedSnodiCount: resolvedCount,
        totalSnodiCount: totalSnodi,
        activeSnodo,
        completed: state.completed,
        branchHistory: { ...state.branchHistory },
        resolvedSnodi: { ...state.resolvedSnodi },
        attemptsLog: [...state.attemptsLog],
        qualityBand: getQualityBand(state.qualityPct)
      };
    }

    return {
      caseData,
      getDisplayTiles,
      getStepConfig,
      getStepStatus,
      getStepPreChoiceEvolution,
      getActiveSnodoPointer,
      selectTile,
      getFinalReport,
      getSnapshot
    };
  }

  return {
    DOMAIN_META,
    getDisplayTiles,
    getQualityBand,
    validateCaseSchema,
    createSession
  };
});
