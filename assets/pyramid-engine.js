/* ═══════════════════════════════════════════════════════════════════════
   RADAR XLH — Piramide Inversa Decision Engine
   Motore deterministico per casi clinici interattivi a snodi ramificati,
   narrazione evolutiva pre-scelta, Coefficiente di Qualità (%) e scoring.
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

  const CANONICAL_DOMAINS = Object.freeze([
    {
      level: 1,
      domainKey: 'comunicazionale',
      domainLabel: 'Scelta Comunicazionale',
      shortLabel: 'Comunicazione',
      accentColor: '#0E8AC8',
      softBg: '#EBF5FB'
    },
    {
      level: 2,
      domainKey: 'investigativa',
      domainLabel: 'Scelta Investigativa / Esaminazione',
      shortLabel: 'Esaminazione',
      accentColor: '#0284C7',
      softBg: '#E0F2FE'
    },
    {
      level: 3,
      domainKey: 'gestionale',
      domainLabel: 'Scelta Gestionale',
      shortLabel: 'Gestione',
      accentColor: '#1B3A5C',
      softBg: '#E8EFF7'
    },
    {
      level: 4,
      domainKey: 'diagnostica',
      domainLabel: 'Scelta Diagnostica',
      shortLabel: 'Diagnostica',
      accentColor: '#D97706',
      softBg: '#FEF3C7'
    },
    {
      level: 5,
      domainKey: 'terapeutica',
      domainLabel: 'Scelta Terapeutica',
      shortLabel: 'Terapia',
      accentColor: '#E87C1E',
      softBg: '#FDF3E8'
    },
    {
      level: 6,
      domainKey: 'followup',
      domainLabel: 'Scelta Mantenimento / Follow-up',
      shortLabel: 'Follow-up',
      accentColor: '#0F766E',
      softBg: '#CCFBF1'
    }
  ]);

  const VALID_OUTCOMES = new Set(['optimal', 'acceptable', 'error']);

  function clamp(val, min, max) {
    return Math.min(max, Math.max(min, val));
  }

  function getQualityBand(pct) {
    const value = Number(pct);
    if (value >= 90) {
      return {
        key: 'excellent',
        label: 'Eccellenza Clinica',
        badgeText: 'Percorso Ottimale',
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

    if (!meta.id || typeof meta.id !== 'string') {
      errors.push('Campo "meta.id" obbligatorio.');
    }
    if (!meta.title || typeof meta.title !== 'string') {
      errors.push('Campo "meta.title" obbligatorio.');
    }

    if (meta.status === 'pending_case') {
      return { valid: errors.length === 0, isPending: true, errors };
    }

    if (!caseObj.apex || typeof caseObj.apex !== 'object') {
      errors.push('Sezione "apex" (tile vertice della piramide) mancante.');
    } else {
      if (!caseObj.apex.title) errors.push('Campo "apex.title" mancante.');
      if (!caseObj.apex.narrativeIntro) errors.push('Campo "apex.narrativeIntro" mancante.');
    }

    if (!Array.isArray(caseObj.levels) || caseObj.levels.length !== 6) {
      errors.push('La proprietà "levels" deve contenere esattamente 6 snodi decisionali.');
    } else {
      let maxPossibleScore = 0;
      let defaultTilesCount = 1; // 1 apex tile

      caseObj.levels.forEach((lvl, idx) => {
        const expected = CANONICAL_DOMAINS[idx];
        if (!lvl || typeof lvl !== 'object') {
          errors.push(`Livello ${idx + 1} non valido.`);
          return;
        }
        if (lvl.level !== expected.level) {
          errors.push(`Livello ${idx + 1}: "level" deve essere ${expected.level}.`);
        }
        if (lvl.domainKey !== expected.domainKey) {
          errors.push(`Livello ${idx + 1}: "domainKey" atteso "${expected.domainKey}", trovato "${lvl.domainKey}".`);
        }
        if (!lvl.nodesByBranch || typeof lvl.nodesByBranch !== 'object' || !lvl.nodesByBranch.default) {
          errors.push(`Livello ${idx + 1}: "nodesByBranch.default" è obbligatorio.`);
          return;
        }

        const branchKeys = Object.keys(lvl.nodesByBranch);
        branchKeys.forEach((branchKey) => {
          const node = lvl.nodesByBranch[branchKey];
          if (!node || !node.preChoiceEvolution) {
            errors.push(`Livello ${idx + 1} (${branchKey}): "preChoiceEvolution" mancante.`);
          } else {
            if (!node.preChoiceEvolution.headline) {
              errors.push(`Livello ${idx + 1} (${branchKey}): "preChoiceEvolution.headline" mancante.`);
            }
            if (!node.preChoiceEvolution.narrative) {
              errors.push(`Livello ${idx + 1} (${branchKey}): "preChoiceEvolution.narrative" mancante.`);
            }
            if (!node.preChoiceEvolution.decisionPrompt) {
              errors.push(`Livello ${idx + 1} (${branchKey}): "preChoiceEvolution.decisionPrompt" mancante.`);
            }
          }

          if (typeof node.stageMaxValue !== 'number' || node.stageMaxValue <= 0) {
            errors.push(`Livello ${idx + 1} (${branchKey}): "stageMaxValue" deve essere un numero > 0.`);
          } else if (branchKey === 'default') {
            maxPossibleScore += node.stageMaxValue;
          }

          if (!Array.isArray(node.tiles) || node.tiles.length < 2) {
            errors.push(`Livello ${idx + 1} (${branchKey}): servono almeno 2 tile decisionali.`);
          } else {
            if (branchKey === 'default') {
              defaultTilesCount += node.tiles.length;
            }
            let hasValidOption = false;
            let hasErrorOption = false;

            node.tiles.forEach((tile, tIdx) => {
              if (!tile.id || !tile.code || !tile.shortTitle || !tile.bodyText) {
                errors.push(`Livello ${idx + 1} (${branchKey}) tile #${tIdx + 1}: campi identificativi o testo incompleti.`);
              }
              if (!VALID_OUTCOMES.has(tile.outcomeType)) {
                errors.push(`Livello ${idx + 1} (${branchKey}) tile ${tile.id || tIdx}: "outcomeType" non valido.`);
              }
              if (typeof tile.qualityDeltaPct !== 'number' || tile.qualityDeltaPct > 0) {
                errors.push(`Livello ${idx + 1} (${branchKey}) tile ${tile.id || tIdx}: "qualityDeltaPct" deve essere <= 0.`);
              }
              if (typeof tile.valuePoints !== 'number' || tile.valuePoints < 0) {
                errors.push(`Livello ${idx + 1} (${branchKey}) tile ${tile.id || tIdx}: "valuePoints" deve essere >= 0.`);
              }
              if (!tile.feedbackRationale) {
                errors.push(`Livello ${idx + 1} (${branchKey}) tile ${tile.id || tIdx}: "feedbackRationale" mancante.`);
              }
              if (tile.outcomeType === 'optimal' || tile.outcomeType === 'acceptable') {
                hasValidOption = true;
              }
              if (tile.outcomeType === 'error') {
                hasErrorOption = true;
              }
            });

            if (!hasValidOption) {
              errors.push(`Livello ${idx + 1} (${branchKey}): deve includere almeno una opzione ottimale o accettabile.`);
            }
            if (!hasErrorOption) {
              errors.push(`Livello ${idx + 1} (${branchKey}): deve includere almeno una opzione errata con decurtazione %.`);
            }
          }
        });
      });

      return {
        valid: errors.length === 0,
        isPending: false,
        errors,
        summary: {
          maxPossibleScore,
          defaultTilesCount
        }
      };
    }

    return {
      valid: errors.length === 0,
      isPending: false,
      errors
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

    const initialQualityPct = Number(caseData.meta.initialQualityPct ?? 100);
    const passThresholdPct = Number(caseData.meta.passThresholdPct ?? 75);

    const state = savedSnapshot && savedSnapshot.caseId === caseData.meta.id
      ? {
          caseId: savedSnapshot.caseId,
          apexReviewed: Boolean(savedSnapshot.apexReviewed),
          qualityPct: clamp(Number(savedSnapshot.qualityPct ?? initialQualityPct), 0, 100),
          valueScore: Math.max(0, Number(savedSnapshot.valueScore ?? 0)),
          activeLevel: clamp(Number(savedSnapshot.activeLevel ?? 1), 1, 6),
          completed: Boolean(savedSnapshot.completed),
          branchHistory: { 1: 'default', ...(savedSnapshot.branchHistory || {}) },
          resolvedLevels: { ...(savedSnapshot.resolvedLevels || {}) },
          attemptsLog: Array.isArray(savedSnapshot.attemptsLog) ? [...savedSnapshot.attemptsLog] : [],
          penalizedTileKeys: Array.isArray(savedSnapshot.penalizedTileKeys) ? [...savedSnapshot.penalizedTileKeys] : []
        }
      : {
          caseId: caseData.meta.id,
          apexReviewed: false,
          qualityPct: initialQualityPct,
          valueScore: 0,
          activeLevel: 1,
          completed: false,
          branchHistory: { 1: 'default' },
          resolvedLevels: {},
          attemptsLog: [],
          penalizedTileKeys: []
        };

    function getMaxPossibleScore() {
      return caseData.levels.reduce((sum, lvl, index) => {
        const branchKey = state.branchHistory[index + 1] || 'default';
        const node = lvl.nodesByBranch[branchKey] || lvl.nodesByBranch.default;
        return sum + (node ? node.stageMaxValue : 0);
      }, 0);
    }

    function getLevelConfig(levelNumber) {
      return caseData.levels.find((l) => l.level === levelNumber) || null;
    }

    function getNodeForLevel(levelNumber) {
      const levelCfg = getLevelConfig(levelNumber);
      if (!levelCfg) return null;
      const branchKey = state.branchHistory[levelNumber] || 'default';
      return levelCfg.nodesByBranch[branchKey] || levelCfg.nodesByBranch.default;
    }

    function getBranchKeyForLevel(levelNumber) {
      const levelCfg = getLevelConfig(levelNumber);
      if (!levelCfg) return 'default';
      const candidate = state.branchHistory[levelNumber] || 'default';
      return levelCfg.nodesByBranch[candidate] ? candidate : 'default';
    }

    function getLevelStatus(levelNumber) {
      if (state.resolvedLevels[levelNumber]) return 'resolved';
      if (!state.completed && state.activeLevel === levelNumber) return 'active';
      return 'locked';
    }

    function markApexReviewed() {
      state.apexReviewed = true;
      return getSnapshot();
    }

    function selectTile(levelNumber, tileId) {
      if (state.completed) {
        throw new Error('Il caso clinico è già stato completato.');
      }
      if (levelNumber !== state.activeLevel) {
        throw new Error(`Lo snodo ${levelNumber} non è attivo (snodo corrente: ${state.activeLevel}).`);
      }

      const levelCfg = getLevelConfig(levelNumber);
      const node = getNodeForLevel(levelNumber);
      if (!levelCfg || !node) {
        throw new Error(`Nodo non trovato per il livello ${levelNumber}.`);
      }

      const tile = node.tiles.find((t) => t.id === tileId);
      if (!tile) {
        throw new Error(`Tile "${tileId}" non presente nel livello ${levelNumber}.`);
      }

      const tileKey = `${levelNumber}:${tileId}`;
      const alreadyPenalized = state.penalizedTileKeys.includes(tileKey);
      const qualityBefore = state.qualityPct;

      let appliedDelta = 0;
      if (tile.qualityDeltaPct < 0 && !alreadyPenalized) {
        appliedDelta = tile.qualityDeltaPct;
        state.qualityPct = clamp(state.qualityPct + appliedDelta, 0, 100);
        state.penalizedTileKeys.push(tileKey);
      }

      const qualityAfter = state.qualityPct;
      const attemptsBeforeOnLevel = state.attemptsLog.filter((a) => a.level === levelNumber).length;
      const shouldAdvance = tile.advanceOnSelect !== false;

      const logEntry = {
        level: levelNumber,
        domainKey: levelCfg.domainKey,
        domainLabel: levelCfg.domainLabel,
        branchUsed: getBranchKeyForLevel(levelNumber),
        tileId: tile.id,
        tileCode: tile.code,
        shortTitle: tile.shortTitle,
        outcomeType: tile.outcomeType,
        qualityDeltaRequested: tile.qualityDeltaPct,
        appliedQualityDelta: appliedDelta,
        qualityBefore,
        qualityAfter,
        valuePoints: shouldAdvance ? tile.valuePoints : 0,
        advanced: shouldAdvance,
        timestamp: new Date().toISOString()
      };
      state.attemptsLog.push(logEntry);

      let nextBranchKey = tile.nextBranchKey || 'default';

      if (shouldAdvance) {
        state.valueScore += tile.valuePoints;

        const optimalTile = node.tiles.find((t) => t.outcomeType === 'optimal') || node.tiles[0];
        state.resolvedLevels[levelNumber] = {
          level: levelNumber,
          domainKey: levelCfg.domainKey,
          domainLabel: levelCfg.domainLabel,
          branchUsed: getBranchKeyForLevel(levelNumber),
          tileId: tile.id,
          tileCode: tile.code,
          shortTitle: tile.shortTitle,
          bodyText: tile.bodyText,
          outcomeType: tile.outcomeType,
          qualityDeltaPct: appliedDelta,
          qualityBefore,
          qualityAfter,
          valuePoints: tile.valuePoints,
          stageMaxValue: node.stageMaxValue,
          firstTryOptimal: attemptsBeforeOnLevel === 0 && tile.outcomeType === 'optimal',
          attemptsOnLevel: attemptsBeforeOnLevel + 1,
          nextBranchKey,
          feedbackTitle: tile.feedbackTitle || tile.shortTitle,
          feedbackRationale: tile.feedbackRationale,
          patientImpact: tile.patientImpact || '',
          preChoiceHeadline: node.preChoiceEvolution.headline,
          preChoiceNarrative: node.preChoiceEvolution.narrative,
          optimalTileId: optimalTile.id,
          optimalTileCode: optimalTile.code,
          optimalTileTitle: optimalTile.shortTitle,
          optimalRationale: optimalTile.feedbackRationale
        };

        if (levelNumber < 6) {
          const nextLevel = levelNumber + 1;
          state.activeLevel = nextLevel;
          state.branchHistory[nextLevel] = nextBranchKey;
        } else {
          state.completed = true;
        }
      }

      return {
        level: levelNumber,
        tile,
        appliedQualityDelta: appliedDelta,
        alreadyPenalized,
        qualityBefore,
        qualityAfter,
        valueAwarded: shouldAdvance ? tile.valuePoints : 0,
        advanced: shouldAdvance,
        nextLevel: shouldAdvance && levelNumber < 6 ? levelNumber + 1 : null,
        completed: state.completed,
        nextBranchKey,
        snapshot: getSnapshot()
      };
    }

    function getFinalReport() {
      const resolvedList = [];
      let optimalCount = 0;
      let acceptableCount = 0;
      let errorCount = 0;
      let firstTryOptimalCount = 0;

      for (let lvl = 1; lvl <= 6; lvl += 1) {
        const item = state.resolvedLevels[lvl];
        if (item) {
          resolvedList.push(item);
          if (item.outcomeType === 'optimal') optimalCount += 1;
          else if (item.outcomeType === 'acceptable') acceptableCount += 1;
          else errorCount += 1;
          if (item.firstTryOptimal) firstTryOptimalCount += 1;
        }
      }

      const maxPossibleScore = getMaxPossibleScore();
      const scorePct = maxPossibleScore > 0 ? Math.round((state.valueScore / maxPossibleScore) * 100) : 0;
      const errorAttemptsCount = state.attemptsLog.filter((a) => a.outcomeType === 'error').length;

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
        scorePct,
        optimalCount,
        acceptableCount,
        errorCount,
        errorAttemptsCount,
        firstTryOptimalCount,
        resolvedCount: resolvedList.length,
        timeline: resolvedList
      };
    }

    function getSnapshot() {
      return {
        caseId: state.caseId,
        apexReviewed: state.apexReviewed,
        qualityPct: state.qualityPct,
        valueScore: state.valueScore,
        maxPossibleScore: getMaxPossibleScore(),
        activeLevel: state.activeLevel,
        completed: state.completed,
        branchHistory: { ...state.branchHistory },
        resolvedLevels: { ...state.resolvedLevels },
        attemptsLog: [...state.attemptsLog],
        penalizedTileKeys: [...state.penalizedTileKeys],
        qualityBand: getQualityBand(state.qualityPct)
      };
    }

    return {
      caseData,
      markApexReviewed,
      getLevelConfig,
      getNodeForLevel,
      getBranchKeyForLevel,
      getLevelStatus,
      selectTile,
      getMaxPossibleScore,
      getFinalReport,
      getSnapshot
    };
  }

  return {
    CANONICAL_DOMAINS,
    getQualityBand,
    validateCaseSchema,
    createSession
  };
});
