/* ═══════════════════════════════════════════════════════════════════════
   RADAR XLH — Piramide Inversa UI & Interactive Controller
   ═══════════════════════════════════════════════════════════════════════ */

(function () {
  'use strict';

  const { CANONICAL_DOMAINS, validateCaseSchema, createSession } = window.PyramidEngine;
  const { CASES_REGISTRY, CASE_JSON_TEMPLATE } = window.RADAR_CASES_DATA;

  const STORAGE_PREFIX = 'radar_xlh_pyramid_session_v1_';
  const RING_CIRCUMFERENCE = 2 * Math.PI * 18; // r = 18

  let casesCatalog = [...CASES_REGISTRY];
  let activeCase = casesCatalog[0];
  let session = null;
  let viewMode = 'full'; // 'full' | 'focus'
  let zoomScale = 1;
  let activeDialogContext = null; // { levelNumber, tileId }
  let toastTimeoutId = null;

  const dom = {};

  document.addEventListener('DOMContentLoaded', () => {
    cacheDom();
    applyUrlParameters();
    setupDialogFallbacks();
    bindGlobalEvents();
    populateCaseSelector();
    loadCaseById(activeCase.meta.id, { restoreFromStorage: true });
    observePyramidResize();
  });

  function cacheDom() {
    dom.caseSelector = document.getElementById('caseSelector');
    dom.cqRingFill = document.getElementById('cqRingFill');
    dom.hudQualityValue = document.getElementById('hudQualityValue');
    dom.hudQualityDelta = document.getElementById('hudQualityDelta');
    dom.hudScoreValue = document.getElementById('hudScoreValue');
    dom.hudScoreMax = document.getElementById('hudScoreMax');
    dom.hudStepPills = document.getElementById('hudStepPills');

    dom.contextBadges = document.getElementById('contextBadges');
    dom.caseTitle = document.getElementById('caseTitle');
    dom.caseSubtitle = document.getElementById('caseSubtitle');
    dom.domainLegendBar = document.getElementById('domainLegendBar');

    dom.pendingSlotView = document.getElementById('pendingSlotView');
    dom.pyramidViewport = document.getElementById('pyramidViewport');
    dom.pyramidStage = document.getElementById('pyramidStage');
    dom.pyramidConnectors = document.getElementById('pyramidConnectors');
    dom.pyramidRows = document.getElementById('pyramidRows');
    dom.finalDebriefingSection = document.getElementById('finalDebriefingSection');

    dom.btnModeFull = document.getElementById('btnModeFull');
    dom.btnModeFocus = document.getElementById('btnModeFocus');
    dom.btnZoomOut = document.getElementById('btnZoomOut');
    dom.btnZoomFit = document.getElementById('btnZoomFit');
    dom.btnZoomIn = document.getElementById('btnZoomIn');

    dom.btnOpenTimeline = document.getElementById('btnOpenTimeline');
    dom.btnOpenShare = document.getElementById('btnOpenShare');
    dom.btnResetSession = document.getElementById('btnResetSession');

    dom.tileDecisionDialog = document.getElementById('tileDecisionDialog');
    dom.decisionDomainPill = document.getElementById('decisionDomainPill');
    dom.decisionCodePill = document.getElementById('decisionCodePill');
    dom.decisionDialogTitle = document.getElementById('decisionDialogTitle');
    dom.decisionDynamicContent = document.getElementById('decisionDynamicContent');
    dom.decisionDialogFooter = document.getElementById('decisionDialogFooter');
    dom.btnCloseDecisionDialog = document.getElementById('btnCloseDecisionDialog');

    dom.patientTimelineDialog = document.getElementById('patientTimelineDialog');
    dom.timelineDialogBody = document.getElementById('timelineDialogBody');
    dom.btnCloseTimelineDialog = document.getElementById('btnCloseTimelineDialog');

    dom.shareEmbedDialog = document.getElementById('shareEmbedDialog');
    dom.btnCloseShareDialog = document.getElementById('btnCloseShareDialog');
    dom.shareDirectUrl = document.getElementById('shareDirectUrl');
    dom.shareEmbedCode = document.getElementById('shareEmbedCode');
    dom.jsonFileInput = document.getElementById('jsonFileInput');
    dom.btnDownloadTemplate = document.getElementById('btnDownloadTemplate');
    dom.jsonUploadFeedback = document.getElementById('jsonUploadFeedback');

    dom.telemetryToast = document.getElementById('telemetryToast');
  }

  function applyUrlParameters() {
    const params = new URLSearchParams(window.location.search);
    if (params.get('embed') === '1') {
      document.body.classList.add('is-embed');
    }
    const requestedCaseId = params.get('case');
    if (requestedCaseId) {
      const found = casesCatalog.find((c) => c.meta.id === requestedCaseId);
      if (found) activeCase = found;
    }
  }

  function setupDialogFallbacks() {
    const dialogs = [dom.tileDecisionDialog, dom.patientTimelineDialog, dom.shareEmbedDialog];
    const hasClosedBy = 'closedBy' in HTMLDialogElement.prototype;

    dialogs.forEach((dialog) => {
      if (!dialog) return;

      dialog.addEventListener('close', () => {
        dialog.returnValue = '';
      });

      if (!hasClosedBy) {
        const isOutside = (e) => {
          const r = dialog.getBoundingClientRect();
          return e.clientX < r.left || e.clientX > r.right || e.clientY < r.top || e.clientY > r.bottom;
        };
        let pressedOutside = false;
        dialog.addEventListener('pointerdown', (e) => {
          pressedOutside = isOutside(e);
        });
        dialog.addEventListener('pointerup', (e) => {
          if (pressedOutside && isOutside(e)) {
            dialog.close();
          }
        });
      }
    });
  }

  function bindGlobalEvents() {
    dom.caseSelector?.addEventListener('change', (e) => {
      loadCaseById(e.target.value, { restoreFromStorage: true });
    });

    dom.btnModeFull?.addEventListener('click', () => setViewMode('full'));
    dom.btnModeFocus?.addEventListener('click', () => setViewMode('focus'));

    dom.btnZoomOut?.addEventListener('click', () => setZoom(zoomScale - 0.1));
    dom.btnZoomIn?.addEventListener('click', () => setZoom(zoomScale + 0.1));
    dom.btnZoomFit?.addEventListener('click', () => setZoom(1));

    dom.btnResetSession?.addEventListener('click', resetCurrentCaseSession);

    dom.btnOpenTimeline?.addEventListener('click', openTimelineDialog);
    dom.btnCloseTimelineDialog?.addEventListener('click', () => dom.patientTimelineDialog.close());

    dom.btnOpenShare?.addEventListener('click', openShareDialog);
    dom.btnCloseShareDialog?.addEventListener('click', () => dom.shareEmbedDialog.close());

    dom.btnCloseDecisionDialog?.addEventListener('click', () => dom.tileDecisionDialog.close());

    document.querySelectorAll('[data-copy-target]').forEach((btn) => {
      btn.addEventListener('click', () => {
        const input = document.getElementById(btn.dataset.copyTarget);
        if (!input) return;
        navigator.clipboard?.writeText(input.value).then(() => {
          showToast('Copiato negli appunti.', 'ok');
        }).catch(() => {
          input.select();
          showToast('Selezionato negli appunti: usa Ctrl+C.', 'info');
        });
      });
    });

    dom.jsonFileInput?.addEventListener('change', handleJsonUpload);
    dom.btnDownloadTemplate?.addEventListener('click', downloadTemplateJson);
  }

  function populateCaseSelector() {
    if (!dom.caseSelector) return;
    dom.caseSelector.innerHTML = casesCatalog
      .map((c) => {
        const prefix = c.meta.isCalibration ? '⚙ [Calibrazione] ' : (c.meta.status === 'pending_case' ? '⏳ ' : '● ');
        return `<option value="${escapeAttr(c.meta.id)}">${escapeHtml(prefix + c.meta.title)}</option>`;
      })
      .join('');
    dom.caseSelector.value = activeCase.meta.id;
  }

  function loadCaseById(caseId, options = { restoreFromStorage: true }) {
    const found = casesCatalog.find((c) => c.meta.id === caseId) || casesCatalog[0];
    activeCase = found;
    if (dom.caseSelector) dom.caseSelector.value = activeCase.meta.id;

    const validation = validateCaseSchema(activeCase);
    if (validation.isPending) {
      session = null;
      renderPendingCaseSlot();
      return;
    }

    let saved = null;
    if (options.restoreFromStorage) {
      try {
        const raw = sessionStorage.getItem(STORAGE_PREFIX + activeCase.meta.id);
        if (raw) saved = JSON.parse(raw);
      } catch (e) {
        saved = null;
      }
    }

    session = createSession(activeCase, saved);
    renderAll();
  }

  function saveSessionSnapshot() {
    if (!session) return;
    try {
      sessionStorage.setItem(STORAGE_PREFIX + activeCase.meta.id, JSON.stringify(session.getSnapshot()));
    } catch (e) {
      // Ignora errori quota in browser restrittivi
    }
  }

  function resetCurrentCaseSession() {
    if (!activeCase || activeCase.meta.status === 'pending_case') return;
    try {
      sessionStorage.removeItem(STORAGE_PREFIX + activeCase.meta.id);
    } catch (e) {}
    session = createSession(activeCase);
    if (dom.hudQualityDelta) dom.hudQualityDelta.hidden = true;
    renderAll();
    showToast('Sessione riavviata: Coefficiente di Qualità ripristinato al 100%.', 'ok');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function setViewMode(mode) {
    viewMode = mode;
    document.body.classList.toggle('mode-focus', mode === 'focus');
    dom.btnModeFull?.classList.toggle('active', mode === 'full');
    dom.btnModeFocus?.classList.toggle('active', mode === 'focus');
    if (mode === 'focus' && session && !session.getSnapshot().completed) {
      scrollToActiveLevel();
    }
    requestAnimationFrame(drawPyramidConnectors);
  }

  function setZoom(nextScale) {
    zoomScale = Math.min(1.2, Math.max(0.7, Math.round(nextScale * 10) / 10));
    document.documentElement.style.setProperty('--pyramid-scale', String(zoomScale));
    requestAnimationFrame(drawPyramidConnectors);
  }

  function renderAll() {
    dom.pendingSlotView.hidden = true;
    dom.pyramidViewport.hidden = false;
    dom.domainLegendBar.hidden = false;

    renderContextHeader();
    renderTelemetryHud();
    renderDomainLegend();
    renderPyramid();
    renderDebriefing();
    requestAnimationFrame(drawPyramidConnectors);
  }

  function renderPendingCaseSlot() {
    dom.pyramidViewport.hidden = true;
    dom.finalDebriefingSection.hidden = true;
    dom.domainLegendBar.hidden = true;
    dom.pendingSlotView.hidden = false;

    renderContextHeader();
    dom.hudQualityValue.textContent = '100%';
    dom.hudScoreValue.textContent = '0';
    dom.hudScoreMax.textContent = '/ — pt';
    dom.hudStepPills.innerHTML = CANONICAL_DOMAINS.map((d) => `<span class="step-pill">${d.level}</span>`).join('');

    const items = (activeCase.meta.plannedStructure || [])
      .map((line) => `<li>${formatClinicalNoBreak(escapeHtml(line))}</li>`)
      .join('');

    dom.pendingSlotView.innerHTML = `
      <span class="badge-case-code">${escapeHtml(activeCase.meta.code)}</span>
      <h2>${formatClinicalNoBreak(escapeHtml(activeCase.meta.title))}</h2>
      <p>${formatClinicalNoBreak(escapeHtml(activeCase.meta.subtitle))}</p>
      <ul class="pending-checklist">${items}</ul>
      <div class="pending-actions">
        <button type="button" class="btn-primary" id="btnBackToCalibration">Torna al Percorso di Calibrazione Interattivo</button>
        <button type="button" class="btn-secondary" id="btnOpenJsonSlot">Carica / Testa File JSON Caso #01</button>
      </div>
    `;

    document.getElementById('btnBackToCalibration')?.addEventListener('click', () => {
      loadCaseById('calibration-xlh-pathway', { restoreFromStorage: true });
    });
    document.getElementById('btnOpenJsonSlot')?.addEventListener('click', openShareDialog);
  }

  function renderContextHeader() {
    const meta = activeCase.meta;
    const badges = [];
    badges.push(`<span class="badge-case-code">${escapeHtml(meta.code)}</span>`);
    if (meta.isCalibration) {
      badges.push('<span class="badge-calibration">Modalità Calibrazione Motore · Percorso Metodologico XLH</span>');
    }
    dom.contextBadges.innerHTML = badges.join('');
    dom.caseTitle.innerHTML = formatClinicalNoBreak(escapeHtml(meta.title));
    dom.caseSubtitle.innerHTML = formatClinicalNoBreak(escapeHtml(meta.subtitle));
  }

  function renderTelemetryHud(lastDelta = 0) {
    if (!session) return;
    const snap = session.getSnapshot();
    const band = snap.qualityBand;

    dom.hudQualityValue.textContent = `${snap.qualityPct}%`;
    const offset = RING_CIRCUMFERENCE * (1 - snap.qualityPct / 100);
    if (dom.cqRingFill) {
      dom.cqRingFill.style.strokeDashoffset = String(offset);
      dom.cqRingFill.style.stroke = band.color;
    }

    if (dom.hudQualityDelta) {
      if (lastDelta < 0) {
        dom.hudQualityDelta.textContent = `${lastDelta}% CQ`;
        dom.hudQualityDelta.hidden = false;
      } else if (snap.qualityPct === 100) {
        dom.hudQualityDelta.hidden = true;
      }
    }

    dom.hudScoreValue.textContent = String(snap.valueScore);
    dom.hudScoreMax.textContent = `/ ${snap.maxPossibleScore} pt`;

    dom.hudStepPills.innerHTML = CANONICAL_DOMAINS.map((domInfo) => {
      const resolved = snap.resolvedLevels[domInfo.level];
      let cls = '';
      if (resolved) cls = `resolved-${resolved.outcomeType}`;
      else if (!snap.completed && snap.activeLevel === domInfo.level) cls = 'active';
      return `<span class="step-pill ${cls}" title="Snodo ${domInfo.level}: ${escapeAttr(domInfo.domainLabel)}">${domInfo.level}</span>`;
    }).join('');
  }

  function renderDomainLegend() {
    if (!session) return;
    const snap = session.getSnapshot();
    dom.domainLegendBar.innerHTML = CANONICAL_DOMAINS.map((d) => {
      const isCurrent = !snap.completed && snap.activeLevel === d.level;
      return `
        <span class="legend-chip ${isCurrent ? 'is-current' : ''}">
          <span class="legend-swatch" style="background:${d.accentColor}"></span>
          <span>${d.level}. ${escapeHtml(d.domainLabel)}</span>
        </span>
      `;
    }).join('');
  }

  function renderPyramid() {
    if (!session) return;
    const snap = session.getSnapshot();
    const apex = activeCase.apex;

    const paramsHtml = (apex.clinicalParameters || [])
      .map((p) => `<span class="param-pill flag-${escapeAttr(p.flag || 'info')}"><strong>${escapeHtml(p.label)}:</strong> ${formatClinicalNoBreak(escapeHtml(p.value))}</span>`)
      .join('');

    const apexHtml = `
      <div class="pyramid-level-band is-apex" data-level-band="0">
        <article class="apex-card" id="apexTileCard">
          <div class="apex-top">
            <span class="apex-code">${escapeHtml(apex.code || 'VERTICE · T0')}</span>
            <span class="apex-badge">${formatClinicalNoBreak(escapeHtml(apex.badge || 'Caso Clinico'))}</span>
          </div>
          <h2 class="apex-title">${formatClinicalNoBreak(escapeHtml(apex.title))}</h2>
          <p class="apex-narrative">${formatClinicalNoBreak(escapeHtml(apex.narrativeIntro))}</p>
          <div class="apex-params">${paramsHtml}</div>
          <div class="apex-prompt">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="12" y1="5" x2="12" y2="19"/><polyline points="19 12 12 19 5 12"/></svg>
            <span>${formatClinicalNoBreak(escapeHtml(apex.startPrompt || 'Avanza lungo la piramide inversa.'))}</span>
          </div>
        </article>
      </div>
    `;

    const levelsHtml = CANONICAL_DOMAINS.map((domainMeta) => {
      const levelNum = domainMeta.level;
      const status = session.getLevelStatus(levelNum);
      const node = session.getNodeForLevel(levelNum);
      const resolved = snap.resolvedLevels[levelNum];
      const tilesCount = node.tiles.length;

      const complexityBars = Array.from({ length: 6 }, (_, i) => (
        `<span class="complexity-bar ${i < node.complexityRank ? 'filled' : ''}"></span>`
      )).join('');

      const stateBadgeText = status === 'resolved'
        ? 'Snodo Completato'
        : (status === 'active' ? 'Snodo Attivo · Scegli 1 Post-it' : 'In Attesa Snodo Precedente');

      let preChoiceHtml = '';
      if (status === 'active' || status === 'resolved') {
        const updatesHtml = (node.preChoiceEvolution.clinicalUpdates || [])
          .map((u) => `<span class="evolution-update-chip"><strong>${escapeHtml(u.label)}:</strong> ${formatClinicalNoBreak(escapeHtml(u.value))}</span>`)
          .join('');

        preChoiceHtml = `
          <div class="evolution-briefing-card" id="evolutionCardL${levelNum}">
            <div class="evolution-kicker">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
              <span>Aggiornamento Evolutivo del Paziente · Prima della Scelta</span>
            </div>
            <h3 class="evolution-headline">${formatClinicalNoBreak(escapeHtml(node.preChoiceEvolution.headline))}</h3>
            <p class="evolution-narrative">${formatClinicalNoBreak(escapeHtml(node.preChoiceEvolution.narrative))}</p>
            ${updatesHtml ? `<div class="evolution-updates-row">${updatesHtml}</div>` : ''}
            <div class="evolution-prompt">${formatClinicalNoBreak(escapeHtml(node.preChoiceEvolution.decisionPrompt))}</div>
          </div>
        `;
      }

      const tilesHtml = node.tiles.map((tile, idx) => {
        if (status === 'locked') {
          return `
            <div class="postit-tile is-locked" aria-disabled="true">
              <div class="postit-top">
                <span class="postit-code">L${levelNum}-${idx + 1}</span>
                <span class="postit-tag">Snodo 0${levelNum}</span>
              </div>
              <div class="postit-lock-body">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                <span>Opzione ${idx + 1} (sblocco progressivo)</span>
              </div>
            </div>
          `;
        }

        if (status === 'active') {
          const wasPenalizedBefore = snap.penalizedTileKeys.includes(`${levelNum}:${tile.id}`);
          return `
            <button
              type="button"
              class="postit-tile is-active ${wasPenalizedBefore ? 'is-penalized-retry' : ''}"
              data-level="${levelNum}"
              data-tile-id="${escapeAttr(tile.id)}"
              aria-label="${escapeAttr(`${tile.code}: ${tile.shortTitle}`)}"
            >
              <div>
                <div class="postit-top">
                  <span class="postit-code">${escapeHtml(tile.code)}</span>
                  <span class="postit-tag">${formatClinicalNoBreak(escapeHtml(tile.clinicalTag || domainMeta.shortLabel))}</span>
                </div>
                <div class="postit-title">${formatClinicalNoBreak(escapeHtml(tile.shortTitle))}</div>
              </div>
              <div class="postit-footer">
                <span class="postit-cta">${wasPenalizedBefore ? 'Già valutata · Rivedi' : 'Esamina & Scegli →'}</span>
                <span class="mono" style="color:var(--text-muted);font-size:0.68rem;">Max ${node.stageMaxValue} pt</span>
              </div>
            </button>
          `;
        }

        // status === 'resolved'
        const isChosen = resolved && resolved.tileId === tile.id;
        if (isChosen) {
          const outcomeCls = `is-chosen is-chosen-${resolved.outcomeType}`;
          const pillCls = `pill-${resolved.outcomeType}`;
          const deltaLabel = resolved.qualityDeltaPct < 0 ? `${resolved.qualityDeltaPct}% CQ` : '0% penalità';
          return `
            <button
              type="button"
              class="postit-tile ${outcomeCls}"
              data-level="${levelNum}"
              data-tile-id="${escapeAttr(tile.id)}"
              data-resolved-inspect="1"
            >
              <div>
                <div class="postit-top">
                  <span class="postit-code">${escapeHtml(tile.code)}</span>
                  <span class="postit-outcome-pill ${pillCls}">${deltaLabel}</span>
                </div>
                <div class="postit-title">${formatClinicalNoBreak(escapeHtml(tile.shortTitle))}</div>
              </div>
              <div class="postit-footer">
                <span style="color:var(--navy-deep);">+${resolved.valuePoints} pt</span>
                <span class="postit-cta">Rivedi Razionale</span>
              </div>
            </button>
          `;
        }

        return `
          <div class="postit-tile is-resolved-dim" aria-hidden="true">
            <div>
              <div class="postit-top">
                <span class="postit-code">${escapeHtml(tile.code)}</span>
                <span class="postit-tag">${formatClinicalNoBreak(escapeHtml(tile.clinicalTag || ''))}</span>
              </div>
              <div class="postit-title">${formatClinicalNoBreak(escapeHtml(tile.shortTitle))}</div>
            </div>
            <div class="postit-footer">
              <span style="color:var(--text-muted);">Non selezionata</span>
            </div>
          </div>
        `;
      }).join('');

      return `
        <div
          class="pyramid-level-band is-${status}"
          id="levelBand${levelNum}"
          data-level-band="${levelNum}"
          style="--level-accent:${domainMeta.accentColor};"
        >
          <div class="level-header-strip">
            <span class="level-num-tag">SNODO 0${levelNum}</span>
            <span class="level-domain-name">${escapeHtml(domainMeta.domainLabel)}</span>
            <span class="level-complexity" title="Complessità livello ${node.complexityRank}/6">
              <span>Complessità:</span>
              ${complexityBars}
            </span>
            <span class="level-value-cap">${tilesCount} Post-it · Max ${node.stageMaxValue} pt</span>
            <span class="level-state-badge state-${status}">${stateBadgeText}</span>
          </div>
          ${preChoiceHtml}
          <div class="pyramid-tiles-row" style="--row-count:${tilesCount};">
            ${tilesHtml}
          </div>
        </div>
      `;
    }).join('');

    dom.pyramidRows.innerHTML = apexHtml + levelsHtml;

    dom.pyramidRows.querySelectorAll('.postit-tile[data-tile-id]').forEach((btn) => {
      btn.addEventListener('click', () => {
        const lvl = Number(btn.dataset.level);
        const tileId = btn.dataset.tileId;
        const isResolvedInspect = btn.dataset.resolvedInspect === '1';
        openTileDialog(lvl, tileId, isResolvedInspect);
      });
    });
  }

  function openTileDialog(levelNumber, tileId, isResolvedInspect) {
    if (!session) return;
    const levelCfg = session.getLevelConfig(levelNumber);
    const node = session.getNodeForLevel(levelNumber);
    const tile = node?.tiles.find((t) => t.id === tileId);
    const domainMeta = CANONICAL_DOMAINS.find((d) => d.level === levelNumber);
    if (!levelCfg || !node || !tile) return;

    activeDialogContext = { levelNumber, tileId };

    dom.decisionDomainPill.textContent = `Snodo 0${levelNumber} · ${levelCfg.domainLabel}`;
    dom.decisionDomainPill.style.color = domainMeta?.accentColor || 'var(--blue-radar)';
    dom.decisionCodePill.textContent = tile.code;
    dom.decisionDialogTitle.innerHTML = formatClinicalNoBreak(escapeHtml(tile.shortTitle));

    if (isResolvedInspect) {
      const resolved = session.getSnapshot().resolvedLevels[levelNumber];
      renderFeedbackInsideDialog(tile, {
        appliedQualityDelta: resolved?.qualityDeltaPct ?? 0,
        qualityBefore: resolved?.qualityBefore ?? 100,
        qualityAfter: resolved?.qualityAfter ?? 100,
        valueAwarded: resolved?.valuePoints ?? 0,
        advanced: true,
        completed: session.getSnapshot().completed,
        inspectMode: true
      });
    } else {
      const snap = session.getSnapshot();
      dom.decisionDynamicContent.innerHTML = `
        <div class="decision-stakes-bar">
          <span><strong>Coeff. Qualità attuale:</strong> <span class="mono">${snap.qualityPct}%</span></span>
          <span><strong>Valore max snodo:</strong> <span class="mono">${node.stageMaxValue} pt</span></span>
          <span><strong>Riferimento:</strong> ${formatClinicalNoBreak(escapeHtml(tile.clinicalTag || levelCfg.domainLabel))}</span>
        </div>
        <div class="decision-box">
          ${formatClinicalNoBreak(escapeHtml(tile.bodyText))}
        </div>
        <p style="font-size:0.8rem;color:var(--text-muted);">
          Confermando questa scelta applicherai la decisione al paziente: eventuali errori decurteranno il Coefficiente di Qualità (%).
        </p>
      `;

      dom.decisionDialogFooter.innerHTML = `
        <button type="button" class="btn-secondary" id="btnCancelTileChoice">Annulla</button>
        <button type="button" class="btn-primary" id="btnConfirmTileChoice" autofocus>Attua Questa Scelta Clinica</button>
      `;

      document.getElementById('btnCancelTileChoice')?.addEventListener('click', () => dom.tileDecisionDialog.close());
      document.getElementById('btnConfirmTileChoice')?.addEventListener('click', confirmActiveTileChoice);
    }

    dom.tileDecisionDialog.showModal();
  }

  function confirmActiveTileChoice() {
    if (!session || !activeDialogContext) return;
    const { levelNumber, tileId } = activeDialogContext;
    const outcome = session.selectTile(levelNumber, tileId);

    saveSessionSnapshot();
    renderTelemetryHud(outcome.appliedQualityDelta);
    renderDomainLegend();
    renderPyramid();
    renderDebriefing();
    requestAnimationFrame(drawPyramidConnectors);

    if (outcome.appliedQualityDelta < 0) {
      showToast(`Attenzione clinica: ${outcome.appliedQualityDelta}% al Coefficiente di Qualità (ora ${outcome.qualityAfter}%).`, 'error');
    } else {
      showToast(`Scelta ottimale confermata: +${outcome.valueAwarded} pt · Qualità mantenuta al ${outcome.qualityAfter}%.`, 'ok');
    }

    renderFeedbackInsideDialog(outcome.tile, outcome);
  }

  function renderFeedbackInsideDialog(tile, outcome) {
    const outcomeLabel = tile.outcomeType === 'optimal'
      ? 'Scelta Ottimale'
      : (tile.outcomeType === 'acceptable' ? 'Scelta Parziale / Sub-ottimale' : 'Scelta Errata');

    const deltaText = outcome.appliedQualityDelta < 0
      ? `${outcome.appliedQualityDelta}% CQ (${outcome.qualityBefore}% → ${outcome.qualityAfter}%)`
      : `0% penalità (Qualità ${outcome.qualityAfter}%)`;

    dom.decisionDynamicContent.innerHTML = `
      <div class="feedback-banner outcome-${escapeAttr(tile.outcomeType)}">
        <strong>${outcomeLabel} — ${formatClinicalNoBreak(escapeHtml(tile.feedbackTitle || tile.shortTitle))}</strong>
        <div class="feedback-metrics-row">
          <span class="feedback-metric-chip">Qualità: ${deltaText}</span>
          <span class="feedback-metric-chip">Valore acquisito: +${outcome.valueAwarded} pt</span>
        </div>
      </div>

      <div class="feedback-detail-card">
        <h2>Razionale Scientifico RADAR XLH</h2>
        <p>${formatClinicalNoBreak(escapeHtml(tile.feedbackRationale))}</p>
      </div>

      ${tile.patientImpact ? `
        <div class="feedback-detail-card">
          <h2>Impatto sull'Evoluzione del Paziente</h2>
          <p>${formatClinicalNoBreak(escapeHtml(tile.patientImpact))}</p>
        </div>
      ` : ''}
    `;

    if (outcome.inspectMode) {
      dom.decisionDialogFooter.innerHTML = `
        <button type="button" class="btn-primary" id="btnFeedbackClose" autofocus>Chiudi</button>
      `;
      document.getElementById('btnFeedbackClose')?.addEventListener('click', () => dom.tileDecisionDialog.close());
      return;
    }

    let nextBtnLabel = 'Rivaluta le Opzioni dello Snodo';
    if (outcome.completed) nextBtnLabel = 'Visualizza Report & Debriefing Finale';
    else if (outcome.advanced) nextBtnLabel = `Procedi allo Snodo 0${outcome.nextLevel} ↓`;

    dom.decisionDialogFooter.innerHTML = `
      <button type="button" class="btn-primary" id="btnFeedbackProceed" autofocus>${nextBtnLabel}</button>
    `;

    document.getElementById('btnFeedbackProceed')?.addEventListener('click', () => {
      dom.tileDecisionDialog.close();
      if (outcome.completed) {
        dom.finalDebriefingSection?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      } else if (outcome.advanced) {
        scrollToActiveLevel();
      }
    });
  }

  function renderDebriefing() {
    if (!session) return;
    const report = session.getFinalReport();
    if (!report.completed) {
      dom.finalDebriefingSection.hidden = true;
      dom.finalDebriefingSection.innerHTML = '';
      return;
    }

    dom.finalDebriefingSection.hidden = false;

    const rowsHtml = report.timeline.map((item) => {
      const outcomeMap = {
        optimal: { label: 'Ottimale', cls: 'pill-optimal' },
        acceptable: { label: 'Parziale', cls: 'pill-acceptable' },
        error: { label: 'Errata', cls: 'pill-error' }
      };
      const meta = outcomeMap[item.outcomeType] || outcomeMap.optimal;
      const goldRef = item.outcomeType === 'optimal'
        ? 'Coincide con il Gold Standard'
        : `<strong>${escapeHtml(item.optimalTileCode)}:</strong> ${formatClinicalNoBreak(escapeHtml(item.optimalTileTitle))}`;

      return `
        <tr>
          <td><strong>0${item.level}. ${escapeHtml(item.domainLabel)}</strong></td>
          <td><span class="mono">${escapeHtml(item.tileCode)}</span> — ${formatClinicalNoBreak(escapeHtml(item.shortTitle))}</td>
          <td><span class="postit-outcome-pill ${meta.cls}">${meta.label}</span></td>
          <td class="mono">${item.qualityDeltaPct < 0 ? `${item.qualityDeltaPct}%` : '0%'}</td>
          <td class="mono">+${item.valuePoints} / ${item.stageMaxValue} pt</td>
          <td>${goldRef}</td>
        </tr>
      `;
    }).join('');

    dom.finalDebriefingSection.innerHTML = `
      <div class="debrief-hero">
        <div>
          <div class="debrief-kicker">Debriefing Clinico Completato · ${escapeHtml(report.caseMeta.code)}</div>
          <h2 class="debrief-title">${escapeHtml(report.qualityBand.label)} (${report.finalQualityPct}%)</h2>
          <p class="debrief-verdict-sub">
            ${report.passedThreshold
              ? `Soglia qualitativa di riferimento (${report.passThresholdPct}%) superata con successo lungo tutti i 6 snodi.`
              : `Coefficiente di Qualità inferiore alla soglia di riferimento (${report.passThresholdPct}%): esamina gli snodi critici nella tabella sotto e riprova un percorso alternativo.`}
          </p>
        </div>
        <span class="postit-outcome-pill ${report.passedThreshold ? 'pill-optimal' : 'pill-error'}" style="font-size:0.85rem;padding:6px 14px;">
          ${escapeHtml(report.qualityBand.badgeText)}
        </span>
      </div>

      <div class="debrief-kpis">
        <div class="debrief-kpi-card">
          <div class="debrief-kpi-label">Coefficiente Qualità Finale</div>
          <div class="debrief-kpi-val" style="color:${report.qualityBand.color}">${report.finalQualityPct}%</div>
        </div>
        <div class="debrief-kpi-card">
          <div class="debrief-kpi-label">Valore Decisionale</div>
          <div class="debrief-kpi-val">${report.totalValueScore} / ${report.maxPossibleScore} pt</div>
        </div>
        <div class="debrief-kpi-card">
          <div class="debrief-kpi-label">Scelte Ottimali</div>
          <div class="debrief-kpi-val">${report.optimalCount} / 6</div>
        </div>
        <div class="debrief-kpi-card">
          <div class="debrief-kpi-label">Errori Commessi</div>
          <div class="debrief-kpi-val">${report.errorAttemptsCount}</div>
        </div>
      </div>

      <div class="debrief-table-wrap">
        <table class="debrief-table">
          <thead>
            <tr>
              <th>Snodo</th>
              <th>Scelta Effettuata</th>
              <th>Esito</th>
              <th>Impatto CQ%</th>
              <th>Valore</th>
              <th>Confronto Gold Standard</th>
            </tr>
          </thead>
          <tbody>${rowsHtml}</tbody>
        </table>
      </div>

      <div class="debrief-actions">
        <button type="button" class="btn-primary" id="btnDebriefReset">Ripeti Percorso (Reset al 100%)</button>
        <button type="button" class="btn-secondary" id="btnDebriefPrint">Stampa / Salva Report PDF</button>
        <button type="button" class="btn-secondary" id="btnDebriefTop">Rivedi Piramide Inversa ↑</button>
      </div>
    `;

    document.getElementById('btnDebriefReset')?.addEventListener('click', resetCurrentCaseSession);
    document.getElementById('btnDebriefPrint')?.addEventListener('click', () => window.print());
    document.getElementById('btnDebriefTop')?.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  function openTimelineDialog() {
    if (!session) return;
    const snap = session.getSnapshot();
    const apexHtml = `
      <div class="timeline-entry">
        <h3>${escapeHtml(activeCase.apex.code || 'T0')} — ${formatClinicalNoBreak(escapeHtml(activeCase.apex.title))}</h3>
        <p>${formatClinicalNoBreak(escapeHtml(activeCase.apex.narrativeIntro))}</p>
      </div>
    `;

    const entries = [];
    for (let lvl = 1; lvl <= 6; lvl += 1) {
      const resolved = snap.resolvedLevels[lvl];
      const isCurrent = !snap.completed && snap.activeLevel === lvl;
      if (resolved) {
        entries.push(`
          <div class="timeline-entry ${resolved.outcomeType === 'error' ? 'is-error' : ''}">
            <h3>Snodo 0${lvl} (${escapeHtml(resolved.domainLabel)}) — ${formatClinicalNoBreak(escapeHtml(resolved.preChoiceHeadline))}</h3>
            <p>${formatClinicalNoBreak(escapeHtml(resolved.preChoiceNarrative))}</p>
            <p style="margin-top:6px;">
              <strong>Decisione (${escapeHtml(resolved.tileCode)}):</strong> ${formatClinicalNoBreak(escapeHtml(resolved.shortTitle))}
              · <span class="mono">${resolved.qualityDeltaPct < 0 ? `${resolved.qualityDeltaPct}% CQ` : '0% penalità'}</span>
              · <span class="mono">+${resolved.valuePoints} pt</span>
            </p>
          </div>
        `);
      } else if (isCurrent) {
        const node = session.getNodeForLevel(lvl);
        entries.push(`
          <div class="timeline-entry">
            <h3>Snodo 0${lvl} (In Corso) — ${formatClinicalNoBreak(escapeHtml(node.preChoiceEvolution.headline))}</h3>
            <p>${formatClinicalNoBreak(escapeHtml(node.preChoiceEvolution.narrative))}</p>
          </div>
        `);
      }
    }

    dom.timelineDialogBody.innerHTML = apexHtml + entries.join('');
    dom.patientTimelineDialog.showModal();
  }

  function openShareDialog() {
    const baseUrl = `${window.location.origin}${window.location.pathname}`;
    const caseParam = `?case=${encodeURIComponent(activeCase.meta.id)}`;
    const directUrl = baseUrl.startsWith('null') || window.location.protocol === 'file:'
      ? `${window.location.href.split('?')[0]}${caseParam}`
      : `${baseUrl}${caseParam}`;
    const embedUrl = `${directUrl}&embed=1`;

    if (dom.shareDirectUrl) dom.shareDirectUrl.value = directUrl;
    if (dom.shareEmbedCode) {
      dom.shareEmbedCode.value = `<iframe src="${embedUrl}" title="RADAR XLH — Piramide Inversa" style="width:100%;height:820px;border:0;border-radius:12px;" allow="fullscreen" loading="lazy"></iframe>`;
    }
    if (dom.jsonUploadFeedback) dom.jsonUploadFeedback.hidden = true;
    dom.shareEmbedDialog.showModal();
  }

  function handleJsonUpload(event) {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      try {
        const parsed = JSON.parse(String(reader.result));
        const check = validateCaseSchema(parsed);
        if (!check.valid) {
          dom.jsonUploadFeedback.className = 'upload-feedback err';
          dom.jsonUploadFeedback.textContent = `Schema JSON non valido: ${check.errors.slice(0, 3).join(' · ')}`;
          dom.jsonUploadFeedback.hidden = false;
          return;
        }

        const existingIdx = casesCatalog.findIndex((c) => c.meta.id === parsed.meta.id);
        if (existingIdx >= 0) casesCatalog[existingIdx] = parsed;
        else casesCatalog.push(parsed);

        populateCaseSelector();
        loadCaseById(parsed.meta.id, { restoreFromStorage: false });

        dom.jsonUploadFeedback.className = 'upload-feedback ok';
        dom.jsonUploadFeedback.textContent = `Caso "${parsed.meta.title}" validato e caricato (${check.summary?.defaultTilesCount || 0} tile totali).`;
        dom.jsonUploadFeedback.hidden = false;
        showToast(`Caso "${parsed.meta.code}" caricato nella piramide!`, 'ok');
      } catch (err) {
        dom.jsonUploadFeedback.className = 'upload-feedback err';
        dom.jsonUploadFeedback.textContent = `Errore parsing JSON: ${err.message}`;
        dom.jsonUploadFeedback.hidden = false;
      } finally {
        event.target.value = '';
      }
    };
    reader.readAsText(file, 'utf-8');
  }

  function downloadTemplateJson() {
    const blob = new Blob([JSON.stringify(CASE_JSON_TEMPLATE, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'radar-xlh-caso-template.json';
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  }

  /* ══════════════════ CONNETTORI SVG DINAMICI PIRAMIDE ══════════════════ */
  function observePyramidResize() {
    if (typeof ResizeObserver === 'undefined' || !dom.pyramidRows) return;
    const ro = new ResizeObserver(() => {
      requestAnimationFrame(drawPyramidConnectors);
    });
    ro.observe(dom.pyramidRows);
    window.addEventListener('resize', () => requestAnimationFrame(drawPyramidConnectors), { passive: true });
  }

  function drawPyramidConnectors() {
    const svg = dom.pyramidConnectors;
    const stage = dom.pyramidStage;
    if (!svg || !stage || !session) return;

    const stageRect = stage.getBoundingClientRect();
    if (stageRect.width === 0 || stageRect.height === 0) return;

    const scale = zoomScale || 1;
    const width = stage.offsetWidth;
    const height = stage.offsetHeight;
    svg.setAttribute('viewBox', `0 0 ${width} ${height}`);

    const snap = session.getSnapshot();
    const paths = [];

    const relBox = (el) => {
      const r = el.getBoundingClientRect();
      return {
        cx: (r.left - stageRect.left + r.width / 2) / scale,
        top: (r.top - stageRect.top) / scale,
        bottom: (r.bottom - stageRect.top) / scale
      };
    };

    const apexEl = document.getElementById('apexTileCard');
    const level1Target = document.getElementById('evolutionCardL1') || document.querySelector('#levelBand1 .pyramid-tiles-row');
    if (apexEl && level1Target) {
      const a = relBox(apexEl);
      const b = relBox(level1Target);
      paths.push(makeCurve(a.cx, a.bottom, b.cx, b.top, 'is-active-trail'));
    }

    for (let lvl = 1; lvl < 6; lvl += 1) {
      const resolved = snap.resolvedLevels[lvl];
      const nextBand = document.getElementById(`levelBand${lvl + 1}`);
      if (!nextBand) continue;

      const sourceEl = resolved
        ? document.querySelector(`#levelBand${lvl} .postit-tile[data-tile-id="${CSS.escape(resolved.tileId)}"]`)
        : document.querySelector(`#levelBand${lvl} .pyramid-tiles-row`);
      const targetEl = document.getElementById(`evolutionCardL${lvl + 1}`) || nextBand.querySelector('.level-header-strip');

      if (sourceEl && targetEl) {
        const s = relBox(sourceEl);
        const t = relBox(targetEl);
        let cls = '';
        if (resolved) {
          cls = resolved.outcomeType === 'error' ? 'is-error-trail' : 'is-active-trail';
        }
        paths.push(makeCurve(s.cx, s.bottom, t.cx, t.top, cls));
      }
    }

    svg.innerHTML = paths.join('');
  }

  function makeCurve(x1, y1, x2, y2, cls) {
    const midY = (y1 + y2) / 2;
    return `<path class="connector-path ${cls}" d="M ${x1.toFixed(1)} ${y1.toFixed(1)} C ${x1.toFixed(1)} ${midY.toFixed(1)}, ${x2.toFixed(1)} ${midY.toFixed(1)}, ${x2.toFixed(1)} ${y2.toFixed(1)}" />`;
  }

  function scrollToActiveLevel() {
    if (!session) return;
    const lvl = session.getSnapshot().activeLevel;
    const target = document.getElementById(`evolutionCardL${lvl}`) || document.getElementById(`levelBand${lvl}`);
    if (target) {
      const y = target.getBoundingClientRect().top + window.scrollY - 92;
      window.scrollTo({ top: Math.max(0, y), behavior: 'smooth' });
    }
  }

  function showToast(msg, variant) {
    if (!dom.telemetryToast) return;
    clearTimeout(toastTimeoutId);
    dom.telemetryToast.textContent = msg;
    dom.telemetryToast.className = `telemetry-toast ${variant === 'error' ? 'is-error' : (variant === 'ok' ? 'is-ok' : '')}`;
    dom.telemetryToast.hidden = false;
    toastTimeoutId = setTimeout(() => {
      dom.telemetryToast.hidden = true;
    }, 3800);
  }

  function formatClinicalNoBreak(str) {
    if (!str) return '';
    return str
      .replace(/X[-‑]Linked/gi, '<span class="no-break">X&#8209;Linked</span>')
      .replace(/Fosfo[-‑]Calcic([oa])/gi, '<span class="no-break">Fosfo&#8209;Calcic$1</span>');
  }

  function escapeHtml(str) {
    return String(str ?? '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  function escapeAttr(str) {
    return escapeHtml(str);
  }
})();
