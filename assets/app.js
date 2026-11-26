/* ═══════════════════════════════════════════════════════════════════════
   RADAR XLH — Piramide Inversa Multi-Snodo UI Controller
   ═══════════════════════════════════════════════════════════════════════ */

(function () {
  'use strict';

  const { DOMAIN_META, getDisplayTiles, validateCaseSchema, createSession } = window.PyramidEngine;
  const { CASES_REGISTRY, CASE_JSON_TEMPLATE } = window.RADAR_CASES_DATA;

  const STORAGE_PREFIX = 'radar_xlh_pyramid_v2_';
  const RING_CIRCUMFERENCE = 2 * Math.PI * 18;

  let casesCatalog = [...CASES_REGISTRY];
  let activeCase = casesCatalog[0];
  let session = null;
  let viewMode = 'full';
  let zoomScale = 1;
  let activeDialogContext = null;
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
    dom.hudStepCounter = document.getElementById('hudStepCounter');
    dom.hudSnodiCounter = document.getElementById('hudSnodiCounter');
    dom.hudStepPills = document.getElementById('hudStepPills');
    dom.hudActiveSnodo = document.getElementById('hudActiveSnodo');
    dom.hudScoreValue = document.getElementById('hudScoreValue');
    dom.hudScoreMax = document.getElementById('hudScoreMax');

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
        const prefix = c.meta.status === 'pending_case' ? '⏳ ' : '● ';
        return `<option value="${escapeAttr(c.meta.id)}">${escapeHtml(prefix + c.meta.code + ' · ' + c.meta.title)}</option>`;
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
    if (dom.hudQualityDelta) dom.hudQualityDelta.hidden = true;
    renderAll();
  }

  function saveSessionSnapshot() {
    if (!session) return;
    try {
      sessionStorage.setItem(STORAGE_PREFIX + activeCase.meta.id, JSON.stringify(session.getSnapshot()));
    } catch (e) {}
  }

  function resetCurrentCaseSession() {
    if (!activeCase || activeCase.meta.status === 'pending_case') return;
    try {
      sessionStorage.removeItem(STORAGE_PREFIX + activeCase.meta.id);
    } catch (e) {}
    session = createSession(activeCase);
    if (dom.hudQualityDelta) dom.hudQualityDelta.hidden = true;
    renderAll();
    showToast('Caso riavviato: Coefficiente di Qualità ripristinato al 100%.', 'ok');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function setViewMode(mode) {
    viewMode = mode;
    document.body.classList.toggle('mode-focus', mode === 'focus');
    dom.btnModeFull?.classList.toggle('active', mode === 'full');
    dom.btnModeFocus?.classList.toggle('active', mode === 'focus');
    if (mode === 'focus' && session && !session.getSnapshot().completed) {
      scrollToStep(session.getSnapshot().activeStep);
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
    dom.hudStepCounter.textContent = '—';
    dom.hudSnodiCounter.textContent = '0/0';
    dom.hudActiveSnodo.textContent = 'In attesa contenuti';
    dom.hudScoreValue.textContent = '0';
    dom.hudScoreMax.textContent = '/ — pt';
    dom.hudStepPills.innerHTML = '';

    const items = (activeCase.meta.plannedStructure || [])
      .map((line) => `<li>${formatClinicalNoBreak(escapeHtml(line))}</li>`)
      .join('');

    dom.pendingSlotView.innerHTML = `
      <span class="badge-case-code">${escapeHtml(activeCase.meta.code)}</span>
      <h2>${formatClinicalNoBreak(escapeHtml(activeCase.meta.title))}</h2>
      <p>${formatClinicalNoBreak(escapeHtml(activeCase.meta.subtitle))}</p>
      <ul class="pending-checklist">${items}</ul>
      <div class="pending-actions">
        <button type="button" class="btn-primary" id="btnBackToMainCase">Torna al Caso Clinico 2.02 (Matteo, 26 anni)</button>
        <button type="button" class="btn-secondary" id="btnOpenJsonSlot">Carica / Testa File JSON</button>
      </div>
    `;

    document.getElementById('btnBackToMainCase')?.addEventListener('click', () => {
      loadCaseById('caso-202-xlh-pregresso', { restoreFromStorage: true });
    });
    document.getElementById('btnOpenJsonSlot')?.addEventListener('click', openShareDialog);
  }

  function renderContextHeader() {
    const meta = activeCase.meta;
    const badges = [`<span class="badge-case-code">${escapeHtml(meta.code)}</span>`];
    if (meta.status === 'active') {
      badges.push('<span class="badge-case-live">Caso Clinico Interattivo Attivo</span>');
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

    const displayStep = snap.completed ? snap.totalSteps : snap.activeStep;
    dom.hudStepCounter.textContent = `${displayStep} di ${snap.totalSteps}`;
    dom.hudSnodiCounter.textContent = `${snap.resolvedSnodiCount}/${snap.totalSnodiCount} snodi`;
    dom.hudActiveSnodo.textContent = snap.completed
      ? 'Completato (Debriefing)'
      : `${snap.activeSnodo?.snodoCode || ''} · ${snap.activeSnodo?.domainLabel || ''}`;

    dom.hudScoreValue.textContent = String(snap.valueScore);
    dom.hudScoreMax.textContent = `/ ${snap.maxPossibleScore} pt`;

    dom.hudStepPills.innerHTML = activeCase.steps.map((st) => {
      const status = session.getStepStatus(st.stepNumber);
      let cls = '';
      if (status === 'active') cls = 'active';
      else if (status === 'resolved') {
        const hasErr = st.snodi.some((sn) => snap.resolvedSnodi[sn.snodoId]?.isCorrect === false);
        cls = hasErr ? 'resolved-warn' : 'resolved-ok';
      }
      return `<span class="step-pill ${cls}" title="Step ${st.stepNumber}">${st.stepNumber}</span>`;
    }).join('');
  }

  function renderDomainLegend() {
    if (!session) return;
    const snap = session.getSnapshot();
    const activeDomainKey = snap.activeSnodo?.domainKey;
    dom.domainLegendBar.innerHTML = Object.values(DOMAIN_META).map((d) => {
      const isCurrent = !snap.completed && activeDomainKey === d.domainKey;
      return `
        <span class="legend-chip ${isCurrent ? 'is-current' : ''}">
          <span class="legend-swatch" style="background:${d.accentColor}"></span>
          <span>${escapeHtml(d.domainLabel)}</span>
        </span>
      `;
    }).join('');
  }

  function renderPyramid() {
    if (!session) return;
    const snap = session.getSnapshot();
    const apex = activeCase.apex;

    const quotesHtml = (apex.briefingQuotes || [])
      .map((q) => `<blockquote class="apex-quote">${formatClinicalNoBreak(escapeHtml(q))}</blockquote>`)
      .join('');

    const paramsHtml = (apex.clinicalParameters || [])
      .map((p) => `<span class="param-pill flag-${escapeAttr(p.flag || 'info')}"><strong>${escapeHtml(p.label)}:</strong> ${formatClinicalNoBreak(escapeHtml(p.value))}</span>`)
      .join('');

    const sectionsHtml = (apex.sections || []).map((sec) => `
      <div class="apex-section-box">
        <h3>${formatClinicalNoBreak(escapeHtml(sec.heading))}</h3>
        <ul>${sec.items.map((it) => `<li>${formatClinicalNoBreak(escapeHtml(it))}</li>`).join('')}</ul>
      </div>
    `).join('');

    const apexHtml = `
      <div class="pyramid-step-band is-apex" data-step-band="0">
        <article class="apex-card" id="apexTileCard">
          <div class="apex-top">
            <span class="apex-code">${escapeHtml(apex.code || 'STEP 0 · APICE')}</span>
            <span class="apex-badge">${formatClinicalNoBreak(escapeHtml(apex.badge || 'Caso Clinico'))}</span>
          </div>
          <h2 class="apex-title">${formatClinicalNoBreak(escapeHtml(apex.title))}</h2>
          <div class="apex-quotes">${quotesHtml}</div>
          <div class="apex-params">${paramsHtml}</div>
          <details class="apex-dossier-details">
            <summary>Consulta la Scheda Iniziale Completa del Paziente (Anamnesi remota, PHEX, Chiari I, Scoliosi)</summary>
            <div class="apex-sections-grid">${sectionsHtml}</div>
          </details>
        </article>
      </div>
    `;

    const stepsHtml = activeCase.steps.map((step) => {
      const stepStatus = session.getStepStatus(step.stepNumber);
      const evolution = session.getStepPreChoiceEvolution(step.stepNumber);
      const snodiCount = step.snodi.length;
      const postitsTotal = step.snodi.reduce((sum, sn) => sum + sn.tiles.length, 0);
      const resolvedInStep = step.snodi.filter((sn) => Boolean(snap.resolvedSnodi[sn.snodoId])).length;

      const stateBadgeText = stepStatus === 'resolved'
        ? `Step Completato (${snodiCount}/${snodiCount})`
        : (stepStatus === 'active'
          ? `Step Attivo · ${resolvedInStep}/${snodiCount} snodi risolti`
          : `Bloccato · ${snodiCount} snodi (${postitsTotal} Post-it)`);

      let evolutionHtml = '';
      if ((stepStatus === 'active' || stepStatus === 'resolved') && evolution) {
        evolutionHtml = `
          <div class="evolution-briefing-card" id="evolutionCardStep${step.stepNumber}">
            <div class="evolution-kicker">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
              <span>Step ${step.stepNumber} di ${activeCase.steps.length} · Prima della Scelta</span>
            </div>
            <h3 class="evolution-headline">${formatClinicalNoBreak(escapeHtml(evolution.headline))}</h3>
            <p class="evolution-narrative">${formatClinicalNoBreak(escapeHtml(evolution.narrative))}</p>
          </div>
        `;
      }

      const snodiHtml = step.snodi.map((snodo) => {
        const domainMeta = DOMAIN_META[snodo.domainKey] || { accentColor: '#0E8AC8' };
        const resolved = snap.resolvedSnodi[snodo.snodoId];
        const isSnodoResolved = Boolean(resolved);
        const snodoStateCls = stepStatus === 'locked'
          ? 'is-locked'
          : (isSnodoResolved ? 'is-resolved' : 'is-active');

        let statusBadge = 'In attesa';
        let statusCls = '';
        if (stepStatus === 'active' && !isSnodoResolved) {
          statusBadge = 'Scegli 1 Post-it';
          statusCls = 'status-active';
        } else if (isSnodoResolved) {
          statusBadge = resolved.isCorrect ? 'Corretto · 0% CQ' : `Errato · ${resolved.qualityDeltaPct}% CQ`;
          statusCls = resolved.isCorrect ? 'status-ok' : 'status-err';
        }

        let tilesBodyHtml = '';
        if (stepStatus === 'locked') {
          const minis = snodo.tiles.map((_, idx) => `
            <div class="postit-tile is-locked-mini" aria-disabled="true">
              <span>Post-it #${idx + 1}</span>
            </div>
          `).join('');
          tilesBodyHtml = `<div class="snodo-locked-grid">${minis}</div>`;
        } else if (isSnodoResolved) {
          const chosenCls = resolved.isCorrect ? 'is-chosen-correct' : 'is-chosen-error';
          const pillCls = resolved.isCorrect ? 'pill-optimal' : 'pill-error';
          const deltaLabel = resolved.qualityDeltaPct < 0 ? `${resolved.qualityDeltaPct}% CQ` : '0% CQ';
          tilesBodyHtml = `
            <div class="snodo-tiles-stack">
              <button
                type="button"
                class="postit-tile is-chosen ${chosenCls}"
                data-snodo-id="${escapeAttr(snodo.snodoId)}"
                data-tile-id="${escapeAttr(resolved.tileId)}"
                data-resolved-inspect="1"
              >
                <div class="postit-top">
                  <span class="postit-code">${escapeHtml(resolved.tileId)}</span>
                  <span class="postit-outcome-pill ${pillCls}">${deltaLabel}</span>
                </div>
                <div class="postit-title">${formatClinicalNoBreak(escapeHtml(resolved.headline))}</div>
                <div class="postit-footer">
                  <span style="color:var(--navy-deep);">+${resolved.valuePoints} pt</span>
                  <span class="postit-cta">Rivedi Feedback</span>
                </div>
              </button>
              <div class="postit-tile is-collapsed-other">
                Altre ${snodo.tiles.length - 1} opzioni archiviate
              </div>
            </div>
          `;
        } else {
          const displayTiles = getDisplayTiles(snodo);
          const buttons = displayTiles.map((tile, idx) => `
            <button
              type="button"
              class="postit-tile is-active"
              data-snodo-id="${escapeAttr(snodo.snodoId)}"
              data-tile-id="${escapeAttr(tile.id)}"
              aria-label="${escapeAttr(`Snodo ${snodo.snodoCode} Post-it ${idx + 1}: ${tile.headline}`)}"
            >
              <div class="postit-top">
                <span class="postit-code">Post-it #${idx + 1}</span>
                <span class="mono" style="font-size:0.65rem;color:var(--text-muted);">${snodo.valueWeight} pt</span>
              </div>
              <div class="postit-title">${formatClinicalNoBreak(escapeHtml(tile.headline))}</div>
              <div class="postit-footer">
                <span class="postit-cta">Esamina &amp; Scegli →</span>
              </div>
            </button>
          `).join('');
          tilesBodyHtml = `<div class="snodo-tiles-stack">${buttons}</div>`;
        }

        return `
          <article
            class="snodo-board ${snodoStateCls}"
            id="snodoBoard_${escapeAttr(snodo.snodoId)}"
            data-snodo-id="${escapeAttr(snodo.snodoId)}"
            style="--snodo-accent:${domainMeta.accentColor};"
          >
            <header class="snodo-board-head">
              <div class="snodo-head-row">
                <span class="snodo-code-badge">SNODO ${escapeHtml(snodo.snodoCode)}</span>
                <span class="snodo-mini-status ${statusCls}">${statusBadge}</span>
              </div>
              <h4 class="snodo-domain-title">${formatClinicalNoBreak(escapeHtml(snodo.domainLabel))}</h4>
            </header>
            ${tilesBodyHtml}
          </article>
        `;
      }).join('');

      return `
        <section
          class="pyramid-step-band is-${stepStatus}"
          id="stepBand${step.stepNumber}"
          data-step-band="${step.stepNumber}"
        >
          <div class="step-header-strip">
            <span class="step-num-tag">STEP 0${step.stepNumber}</span>
            <span class="step-title-name">${escapeHtml(step.title)}</span>
            <span class="step-meta-cap">${snodiCount} ${snodiCount === 1 ? 'Snodo' : 'Snodi'} · ${postitsTotal} Post-it</span>
            <span class="step-state-badge state-${stepStatus}">${stateBadgeText}</span>
          </div>
          ${evolutionHtml}
          <div class="step-snodi-grid cols-${snodiCount}">
            ${snodiHtml}
          </div>
        </section>
      `;
    }).join('');

    dom.pyramidRows.innerHTML = apexHtml + stepsHtml;

    dom.pyramidRows.querySelectorAll('.postit-tile[data-tile-id]').forEach((btn) => {
      btn.addEventListener('click', () => {
        const snodoId = btn.dataset.snodoId;
        const tileId = btn.dataset.tileId;
        const isInspect = btn.dataset.resolvedInspect === '1';
        openTileDialog(snodoId, tileId, isInspect);
      });
    });
  }

  function findSnodoById(snodoId) {
    for (const step of activeCase.steps) {
      const snodo = step.snodi.find((sn) => sn.snodoId === snodoId);
      if (snodo) return { step, snodo };
    }
    return null;
  }

  function openTileDialog(snodoId, tileId, isInspect) {
    if (!session) return;
    const found = findSnodoById(snodoId);
    if (!found) return;
    const { step, snodo } = found;
    const tile = snodo.tiles.find((t) => t.id === tileId);
    if (!tile) return;

    const domainMeta = DOMAIN_META[snodo.domainKey];
    activeDialogContext = { snodoId, tileId };

    dom.decisionDomainPill.textContent = `Step ${step.stepNumber} · Snodo ${snodo.snodoCode} · ${snodo.domainLabel}`;
    dom.decisionDomainPill.style.color = domainMeta?.accentColor || 'var(--blue-radar)';
    dom.decisionCodePill.textContent = isInspect ? tile.id : `Post-it · Snodo ${snodo.snodoCode}`;
    dom.decisionDialogTitle.innerHTML = formatClinicalNoBreak(escapeHtml(tile.headline));

    if (isInspect) {
      const rec = session.getSnapshot().resolvedSnodi[snodoId];
      renderFeedbackInsideDialog(tile, {
        record: rec,
        stepAdvanced: false,
        completed: session.getSnapshot().completed,
        inspectMode: true
      });
    } else {
      const snap = session.getSnapshot();
      dom.decisionDynamicContent.innerHTML = `
        <div class="decision-stakes-bar">
          <span><strong>Coeff. Qualità attuale:</strong> <span class="mono">${snap.qualityPct}%</span></span>
          <span><strong>Valore snodo:</strong> <span class="mono">${snodo.valueWeight} pt</span></span>
          <span><strong>Categoria:</strong> ${formatClinicalNoBreak(escapeHtml(snodo.domainLabel))}</span>
        </div>
        <div class="decision-box">
          ${formatClinicalNoBreak(escapeHtml(tile.bodyText))}
        </div>
        <p style="font-size:0.8rem;color:var(--text-muted);">
          Confermando questa scelta clinica il sistema aggiornerà il Coefficiente di Qualità (CQ) e mostrerà il razionale didattico.
        </p>
      `;

      dom.decisionDialogFooter.innerHTML = `
        <button type="button" class="btn-secondary" id="btnCancelTileChoice">Annulla</button>
        <button type="button" class="btn-primary" id="btnConfirmTileChoice" autofocus>Conferma Scelta Clinica</button>
      `;

      document.getElementById('btnCancelTileChoice')?.addEventListener('click', () => dom.tileDecisionDialog.close());
      document.getElementById('btnConfirmTileChoice')?.addEventListener('click', confirmActiveTileChoice);
    }

    dom.tileDecisionDialog.showModal();
  }

  function confirmActiveTileChoice() {
    if (!session || !activeDialogContext) return;
    const { snodoId, tileId } = activeDialogContext;
    const result = session.selectTile(snodoId, tileId);

    saveSessionSnapshot();
    renderTelemetryHud(result.record.qualityDeltaPct);
    renderDomainLegend();
    renderPyramid();
    renderDebriefing();
    requestAnimationFrame(drawPyramidConnectors);

    if (result.record.qualityDeltaPct < 0) {
      showToast(`Scelta errata (${result.record.tileId}): ${result.record.qualityDeltaPct}% CQ (ora ${result.record.qualityAfter}%).`, 'error');
    } else {
      showToast(`Scelta corretta (${result.record.tileId}): +${result.record.valuePoints} pt · CQ ${result.record.qualityAfter}%.`, 'ok');
    }

    dom.decisionCodePill.textContent = result.record.tileId;
    renderFeedbackInsideDialog(result.record, result);
  }

  function renderFeedbackInsideDialog(tileOrRecord, outcome) {
    const rec = outcome.record || tileOrRecord;
    const isCorrect = Boolean(rec.isCorrect);
    const delta = rec.qualityDeltaPct ?? 0;
    const deltaText = delta < 0
      ? `${delta}% CQ (${rec.qualityBefore}% → ${rec.qualityAfter}%)`
      : `0% penalità (CQ ${rec.qualityAfter}%)`;

    dom.decisionDynamicContent.innerHTML = `
      <div class="feedback-banner ${isCorrect ? 'outcome-optimal' : 'outcome-error'}">
        <strong>${isCorrect ? 'Scelta Corretta' : 'Scelta Errata'} — ${escapeHtml(rec.tileId || tileOrRecord.id)}</strong>
        <div class="feedback-metrics-row">
          <span class="feedback-metric-chip">Qualità: ${deltaText}</span>
          <span class="feedback-metric-chip">Valore acquisito: +${rec.valuePoints} pt</span>
        </div>
      </div>

      <div class="feedback-detail-card">
        <h2>Esito &amp; Feedback Didattico</h2>
        <p>${formatClinicalNoBreak(escapeHtml(rec.feedbackText || tileOrRecord.feedbackText))}</p>
      </div>

      ${rec.evolutionImpact ? `
        <div class="feedback-detail-card">
          <h2>Evoluzione del Paziente</h2>
          <p>${formatClinicalNoBreak(escapeHtml(rec.evolutionImpact))}</p>
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

    let nextBtnLabel = 'Prosegui nello Step Corrente';
    if (outcome.completed) nextBtnLabel = 'Visualizza Debriefing Finale';
    else if (outcome.stepAdvanced) nextBtnLabel = `Procedi allo Step 0${outcome.nextStepNumber} ↓`;

    dom.decisionDialogFooter.innerHTML = `
      <button type="button" class="btn-primary" id="btnFeedbackProceed" autofocus>${nextBtnLabel}</button>
    `;

    document.getElementById('btnFeedbackProceed')?.addEventListener('click', () => {
      dom.tileDecisionDialog.close();
      if (outcome.completed) {
        dom.finalDebriefingSection?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      } else if (outcome.stepAdvanced) {
        scrollToStep(outcome.nextStepNumber);
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
      const badgeCls = item.isCorrect ? 'pill-optimal' : 'pill-error';
      const badgeText = item.isCorrect ? 'Corretta' : 'Errata';
      const goldRef = item.isCorrect
        ? 'Coincide con l’opzione corretta'
        : `<strong>${escapeHtml(item.correctTileId)}:</strong> ${formatClinicalNoBreak(escapeHtml(item.correctHeadline))}`;

      return `
        <tr>
          <td><strong class="mono">${escapeHtml(item.snodoCode)}</strong></td>
          <td>${formatClinicalNoBreak(escapeHtml(item.domainLabel))}</td>
          <td><span class="mono">${escapeHtml(item.tileId)}</span> — ${formatClinicalNoBreak(escapeHtml(item.headline))}</td>
          <td><span class="postit-outcome-pill ${badgeCls}">${badgeText}</span></td>
          <td class="mono">${item.qualityDeltaPct < 0 ? `${item.qualityDeltaPct}%` : '0%'}</td>
          <td>${goldRef}</td>
        </tr>
      `;
    }).join('');

    dom.finalDebriefingSection.innerHTML = `
      <div class="debrief-hero">
        <div>
          <div class="debrief-kicker">Chiusura del Caso · ${escapeHtml(report.caseMeta.code)}</div>
          <h2 class="debrief-title">${escapeHtml(report.qualityBand.label)} (CQ Finale: ${report.finalQualityPct}%)</h2>
          <p class="debrief-verdict-sub">
            ${report.passedThreshold
              ? `Soglia qualitativa (${report.passThresholdPct}%) superata su tutti i ${report.totalSnodiCount} snodi della piramide.`
              : `Coefficiente di Qualità inferiore alla soglia (${report.passThresholdPct}%): esamina gli snodi critici nella tabella e ripeti il caso.`}
          </p>
        </div>
        <span class="postit-outcome-pill ${report.passedThreshold ? 'pill-optimal' : 'pill-error'}" style="font-size:0.84rem;padding:6px 14px;">
          ${escapeHtml(report.qualityBand.badgeText)}
        </span>
      </div>

      <div class="debrief-kpis">
        <div class="debrief-kpi-card">
          <div class="debrief-kpi-label">CQ Finale</div>
          <div class="debrief-kpi-val" style="color:${report.qualityBand.color}">${report.finalQualityPct}%</div>
        </div>
        <div class="debrief-kpi-card">
          <div class="debrief-kpi-label">Valore Decisionale</div>
          <div class="debrief-kpi-val">${report.totalValueScore} / ${report.maxPossibleScore} pt</div>
        </div>
        <div class="debrief-kpi-card">
          <div class="debrief-kpi-label">Snodi Corretti</div>
          <div class="debrief-kpi-val">${report.correctCount} / ${report.totalSnodiCount}</div>
        </div>
        <div class="debrief-kpi-card">
          <div class="debrief-kpi-label">Errori Commessi</div>
          <div class="debrief-kpi-val">${report.errorCount}</div>
        </div>
      </div>

      <div class="debrief-table-wrap">
        <table class="debrief-table">
          <thead>
            <tr>
              <th>Snodo</th>
              <th>Categoria</th>
              <th>Scelta Effettuata</th>
              <th>Esito</th>
              <th>Impatto CQ</th>
              <th>Riferimento Corretto</th>
            </tr>
          </thead>
          <tbody>${rowsHtml}</tbody>
        </table>
      </div>

      <div class="debrief-actions">
        <button type="button" class="btn-primary" id="btnDebriefReset">Ripeti Caso (Reset al 100%)</button>
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
    const entries = [
      `
        <div class="timeline-entry">
          <h3>${escapeHtml(activeCase.apex.code || 'STEP 0')} — ${formatClinicalNoBreak(escapeHtml(activeCase.apex.title))}</h3>
          <p>${formatClinicalNoBreak(escapeHtml((activeCase.apex.briefingQuotes || [])[0] || ''))}</p>
        </div>
      `
    ];

    activeCase.steps.forEach((step) => {
      const status = session.getStepStatus(step.stepNumber);
      if (status === 'locked') return;
      const evo = session.getStepPreChoiceEvolution(step.stepNumber);
      const snodiLines = step.snodi.map((sn) => {
        const rec = snap.resolvedSnodi[sn.snodoId];
        if (!rec) return `<li><strong>Snodo ${escapeHtml(sn.snodoCode)}:</strong> in attesa di scelta</li>`;
        return `<li><strong>Snodo ${escapeHtml(sn.snodoCode)} (${escapeHtml(rec.tileId)}):</strong> ${formatClinicalNoBreak(escapeHtml(rec.headline))} · <span class="mono">${rec.qualityDeltaPct < 0 ? `${rec.qualityDeltaPct}% CQ` : '0% CQ'}</span></li>`;
      }).join('');

      entries.push(`
        <div class="timeline-entry">
          <h3>Step 0${step.stepNumber} · ${escapeHtml(step.title)}</h3>
          <p>${formatClinicalNoBreak(escapeHtml(evo?.narrative || ''))}</p>
          <ul style="margin-top:6px;padding-left:16px;font-size:0.8rem;color:var(--text-secondary);display:grid;gap:3px;">
            ${snodiLines}
          </ul>
        </div>
      `);
    });

    dom.timelineDialogBody.innerHTML = entries.join('');
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
      dom.shareEmbedCode.value = `<iframe src="${embedUrl}" title="RADAR XLH — Piramide Inversa" style="width:100%;height:860px;border:0;border-radius:12px;" allow="fullscreen" loading="lazy"></iframe>`;
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
        dom.jsonUploadFeedback.textContent = `Caso "${parsed.meta.title}" validato (${check.summary?.snodiCount || 0} snodi, ${check.summary?.totalDecisionTiles || 0} Post-it).`;
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
    const ro = new ResizeObserver(() => requestAnimationFrame(drawPyramidConnectors));
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
    svg.setAttribute('viewBox', `0 0 ${stage.offsetWidth} ${stage.offsetHeight}`);

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
    const firstSnodoEl = document.getElementById(`snodoBoard_${activeCase.steps[0]?.snodi[0]?.snodoId}`);
    if (apexEl && firstSnodoEl) {
      const a = relBox(apexEl);
      const b = relBox(firstSnodoEl);
      paths.push(makeCurve(a.cx, a.bottom, b.cx, b.top, 'is-active-trail'));
    }

    for (let i = 0; i < activeCase.steps.length - 1; i += 1) {
      const curStep = activeCase.steps[i];
      const nextStep = activeCase.steps[i + 1];
      const curStatus = session.getStepStatus(curStep.stepNumber);
      const sourceContainer = document.querySelector(`#stepBand${curStep.stepNumber} .step-snodi-grid`);
      if (!sourceContainer) continue;

      const s = relBox(sourceContainer);
      const cls = curStatus === 'resolved' ? 'is-active-trail' : '';

      nextStep.snodi.forEach((nextSnodo) => {
        const targetBoard = document.getElementById(`snodoBoard_${nextSnodo.snodoId}`);
        if (targetBoard) {
          const t = relBox(targetBoard);
          paths.push(makeCurve(s.cx, s.bottom, t.cx, t.top, cls));
        }
      });
    }

    svg.innerHTML = paths.join('');
  }

  function makeCurve(x1, y1, x2, y2, cls) {
    const midY = (y1 + y2) / 2;
    return `<path class="connector-path ${cls}" d="M ${x1.toFixed(1)} ${y1.toFixed(1)} C ${x1.toFixed(1)} ${midY.toFixed(1)}, ${x2.toFixed(1)} ${midY.toFixed(1)}, ${x2.toFixed(1)} ${y2.toFixed(1)}" />`;
  }

  function scrollToStep(stepNumber) {
    const target = document.getElementById(`evolutionCardStep${stepNumber}`) || document.getElementById(`stepBand${stepNumber}`);
    if (target) {
      const y = target.getBoundingClientRect().top + window.scrollY - 90;
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
