/* ═══════════════════════════════════════════════════════════════════════
   RADAR XLH — Piramide Inversa Multi-Caso · Launcher & Step-by-Step Controller
   ═══════════════════════════════════════════════════════════════════════ */

(function () {
  'use strict';

  const { DOMAIN_META, getDisplayTiles, createSession } = window.PyramidEngine;
  const { CASES_REGISTRY } = window.RADAR_CASES_DATA;

  const DEFAULT_RETURN_URL = 'https://hassenzio.github.io/radar-xlh-faculty-review/?module=2&unit=02:02:00#stageViewer';
  const STORAGE_PREFIX = 'radar_xlh_pyramid_didactic_v3_';
  const RING_CIRCUMFERENCE = 2 * Math.PI * 18;

  let returnPlatformUrl = DEFAULT_RETURN_URL;
  let currentScreen = 'launcher'; // 'launcher' | 'case'
  let activeCase = CASES_REGISTRY[0];
  let session = null;
  let activeDialogContext = null;
  let toastTimeoutId = null;
  let lastUnlockedStep = 1;
  let displayedQualityPct = 100;
  let qualityAnimFrame = null;

  const dom = {};

  document.addEventListener('DOMContentLoaded', () => {
    cacheDom();
    const directCaseId = applyUrlParameters();
    setupDialogFallbacks();
    bindGlobalEvents();
    if (directCaseId) {
      selectCaseAndStart(directCaseId, { animate: false });
    } else {
      openLauncher({ animate: false });
    }
    observePyramidResize();
  });

  function cacheDom() {
    dom.cqRingFill = document.getElementById('cqRingFill');
    dom.hudQualityValue = document.getElementById('hudQualityValue');
    dom.hudQualityDelta = document.getElementById('hudQualityDelta');
    dom.hudStepCounter = document.getElementById('hudStepCounter');
    dom.hudStepPills = document.getElementById('hudStepPills');
    dom.hudSnodoDot = document.getElementById('hudSnodoDot');
    dom.hudActiveSnodo = document.getElementById('hudActiveSnodo');

    dom.caseLauncherView = document.getElementById('caseLauncherView');
    dom.caseCardsGrid = document.getElementById('caseCardsGrid');
    dom.caseHero = document.getElementById('caseHero');
    dom.contextBadges = document.getElementById('contextBadges');
    dom.caseTitle = document.getElementById('caseTitle');
    dom.caseSubtitle = document.getElementById('caseSubtitle');
    dom.domainLegendBar = document.getElementById('domainLegendBar');

    dom.pyramidViewport = document.getElementById('pyramidViewport');
    dom.pyramidStage = document.getElementById('pyramidStage');
    dom.pyramidConnectors = document.getElementById('pyramidConnectors');
    dom.pyramidRows = document.getElementById('pyramidRows');
    dom.finalDebriefingSection = document.getElementById('finalDebriefingSection');

    dom.btnSwitchCase = document.getElementById('btnSwitchCase');
    dom.btnReturnPlatform = document.getElementById('btnReturnPlatform');
    dom.btnOpenTimeline = document.getElementById('btnOpenTimeline');
    dom.btnResetSession = document.getElementById('btnResetSession');

    dom.tileDecisionDialog = document.getElementById('tileDecisionDialog');
    dom.decisionDomainPill = document.getElementById('decisionDomainPill');
    dom.decisionCodePill = document.getElementById('decisionCodePill');
    dom.decisionDialogTitle = document.getElementById('decisionDialogTitle');
    dom.decisionDynamicContent = document.getElementById('decisionDynamicContent');
    dom.decisionDialogFooter = document.getElementById('decisionDialogFooter');
    dom.btnCloseDecisionDialog = document.getElementById('btnCloseDecisionDialog');

    dom.patientTimelineDialog = document.getElementById('patientTimelineDialog');
    dom.timelineDialogTitle = document.getElementById('timelineDialogTitle');
    dom.timelineDialogBody = document.getElementById('timelineDialogBody');
    dom.btnCloseTimelineDialog = document.getElementById('btnCloseTimelineDialog');

    dom.resetConfirmDialog = document.getElementById('resetConfirmDialog');
    dom.btnCloseResetDialog = document.getElementById('btnCloseResetDialog');
    dom.btnCancelReset = document.getElementById('btnCancelReset');
    dom.btnConfirmReset = document.getElementById('btnConfirmReset');

    dom.telemetryToast = document.getElementById('telemetryToast');
  }

  function isAllowedReturnUrl(candidate) {
    try {
      const parsed = new URL(candidate);
      if (parsed.href.startsWith('https://hassenzio.github.io/radar-xlh-faculty-review/')) return true;
      if ((parsed.hostname === '127.0.0.1' || parsed.hostname === 'localhost') && (parsed.protocol === 'http:' || parsed.protocol === 'https:')) {
        return true;
      }
      return false;
    } catch (e) {
      return false;
    }
  }

  function applyUrlParameters() {
    const params = new URLSearchParams(window.location.search);
    if (params.get('embed') === '1') {
      document.body.classList.add('is-embed');
    }
    const rawReturn = params.get('returnTo');
    if (rawReturn && isAllowedReturnUrl(rawReturn)) {
      returnPlatformUrl = rawReturn;
    }
    if (dom.btnReturnPlatform) {
      dom.btnReturnPlatform.href = returnPlatformUrl;
    }
    const requestedCaseId = params.get('case');
    if (requestedCaseId) {
      const found = CASES_REGISTRY.find((c) => c.meta.id === requestedCaseId);
      if (found) return found.meta.id;
    }
    return null;
  }

  function setupDialogFallbacks() {
    const dialogs = [dom.tileDecisionDialog, dom.patientTimelineDialog, dom.resetConfirmDialog];
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
    dom.btnSwitchCase?.addEventListener('click', () => openLauncher({ animate: true }));
    dom.btnOpenTimeline?.addEventListener('click', openTimelineDialog);
    dom.btnCloseTimelineDialog?.addEventListener('click', () => dom.patientTimelineDialog.close());

    dom.btnCloseDecisionDialog?.addEventListener('click', () => dom.tileDecisionDialog.close());

    dom.btnResetSession?.addEventListener('click', () => dom.resetConfirmDialog.showModal());
    dom.btnCloseResetDialog?.addEventListener('click', () => dom.resetConfirmDialog.close());
    dom.btnCancelReset?.addEventListener('click', () => dom.resetConfirmDialog.close());
    dom.btnConfirmReset?.addEventListener('click', () => {
      dom.resetConfirmDialog.close();
      resetCurrentCaseSession();
    });
  }

  function readSavedSnapshot(caseId) {
    try {
      const raw = sessionStorage.getItem(STORAGE_PREFIX + caseId);
      return raw ? JSON.parse(raw) : null;
    } catch (e) {
      return null;
    }
  }

  function openLauncher({ animate = true } = {}) {
    const renderFn = () => {
      currentScreen = 'launcher';
      document.body.classList.add('is-launcher');
      dom.caseLauncherView.hidden = false;
      dom.caseHero.hidden = true;
      dom.pyramidViewport.hidden = true;
      dom.finalDebriefingSection.hidden = true;
      renderLauncherCards();
      window.scrollTo({ top: 0, behavior: animate ? 'smooth' : 'auto' });
    };

    if (animate && typeof document.startViewTransition === 'function' && !window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) {
      document.startViewTransition(renderFn);
    } else {
      renderFn();
    }
  }

  function renderLauncherCards() {
    if (!dom.caseCardsGrid) return;

    dom.caseCardsGrid.innerHTML = CASES_REGISTRY.map((caseItem, idx) => {
      const meta = caseItem.meta;
      const saved = readSavedSnapshot(meta.id);

      let statusText = 'Da iniziare · CQ 100%';
      let statusCls = 'status-new';
      let ctaLabel = 'Avvia Caso Clinico →';

      if (saved) {
        if (saved.completed) {
          statusText = `Completato · CQ Finale ${saved.qualityPct}%`;
          statusCls = 'status-done';
          ctaLabel = 'Rivedi Percorso & Debriefing →';
        } else if ((saved.resolvedSnodiCount || 0) > 0 || (saved.activeStep || 1) > 1) {
          statusText = `In corso · Step ${saved.activeStep} di ${saved.totalSteps} · CQ ${saved.qualityPct}%`;
          statusCls = 'status-progress';
          ctaLabel = 'Riprendi Caso Clinico →';
        }
      }

      const tagsHtml = (meta.focusTags || [])
        .map((tag) => `<span class="case-focus-tag">${formatClinicalNoBreak(escapeHtml(tag))}</span>`)
        .join('');

      return `
        <article class="case-choice-card" style="--card-idx:${idx};">
          <div class="case-choice-top">
            <span class="case-choice-code">${escapeHtml(meta.code)}</span>
            <span class="case-choice-status ${statusCls}">${escapeHtml(statusText)}</span>
          </div>
          <div class="case-choice-patient">${formatClinicalNoBreak(escapeHtml(meta.patientBadge || ''))}</div>
          <h2 class="case-choice-title">${formatClinicalNoBreak(escapeHtml(meta.title))}</h2>
          <p class="case-choice-summary">${formatClinicalNoBreak(escapeHtml(meta.launcherSummary || meta.subtitle))}</p>
          <div class="case-choice-tags">${tagsHtml}</div>
          <div class="case-choice-footer">
            <span class="case-choice-meta">5 Step · 15 Snodi Decisionali · 53 Post-it</span>
            <button type="button" class="btn-primary case-launch-btn" data-launch-case="${escapeAttr(meta.id)}">${ctaLabel}</button>
          </div>
        </article>
      `;
    }).join('');

    dom.caseCardsGrid.querySelectorAll('[data-launch-case]').forEach((btn) => {
      btn.addEventListener('click', () => selectCaseAndStart(btn.dataset.launchCase, { animate: true }));
    });
  }

  function selectCaseAndStart(caseId, { animate = true } = {}) {
    const found = CASES_REGISTRY.find((c) => c.meta.id === caseId) || CASES_REGISTRY[0];
    activeCase = found;

    const saved = readSavedSnapshot(activeCase.meta.id);
    session = createSession(activeCase, saved);
    const snap = session.getSnapshot();
    lastUnlockedStep = snap.completed ? snap.totalSteps : snap.activeStep;
    displayedQualityPct = snap.qualityPct;

    const enterCaseView = () => {
      currentScreen = 'case';
      document.body.classList.remove('is-launcher');
      dom.caseLauncherView.hidden = true;
      dom.caseHero.hidden = false;
      dom.pyramidViewport.hidden = false;
      if (dom.hudQualityDelta) dom.hudQualityDelta.hidden = true;
      renderAll({ newlyUnlockedStep: null });
      window.scrollTo({ top: 0, behavior: animate ? 'smooth' : 'auto' });
    };

    if (animate && typeof document.startViewTransition === 'function' && !window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) {
      document.startViewTransition(enterCaseView);
    } else {
      enterCaseView();
    }
  }

  function saveSessionSnapshot() {
    if (!session) return;
    try {
      sessionStorage.setItem(STORAGE_PREFIX + activeCase.meta.id, JSON.stringify(session.getSnapshot()));
    } catch (e) {}
  }

  function resetCurrentCaseSession() {
    try {
      sessionStorage.removeItem(STORAGE_PREFIX + activeCase.meta.id);
    } catch (e) {}
    session = createSession(activeCase);
    lastUnlockedStep = 1;
    displayedQualityPct = 100;
    if (dom.hudQualityDelta) dom.hudQualityDelta.hidden = true;
    renderAll({ newlyUnlockedStep: 1 });
    showToast('Percorso riavviato: Coefficiente di Qualità ripristinato al 100%.', 'ok');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function renderAll({ newlyUnlockedStep = null, lastDelta = 0 } = {}) {
    renderContextHeader();
    renderTelemetryHud(lastDelta);
    renderDomainLegend();
    renderPyramid(newlyUnlockedStep);
    renderDebriefing();
    requestAnimationFrame(() => drawPyramidConnectors(Boolean(newlyUnlockedStep)));
  }

  function renderContextHeader() {
    const meta = activeCase.meta;
    dom.contextBadges.innerHTML = `
      <span class="badge-case-code">${escapeHtml(meta.code)}</span>
      <span class="badge-case-live">${formatClinicalNoBreak(escapeHtml(meta.patientBadge || 'Percorso Clinico Interattivo'))}</span>
    `;
    dom.caseTitle.innerHTML = formatClinicalNoBreak(escapeHtml(meta.title));
    dom.caseSubtitle.innerHTML = formatClinicalNoBreak(escapeHtml(meta.subtitle));
  }

  function animateQualityCounter(targetPct) {
    cancelAnimationFrame(qualityAnimFrame);
    const prefersReduced = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced || displayedQualityPct === targetPct) {
      displayedQualityPct = targetPct;
      dom.hudQualityValue.textContent = `${targetPct}%`;
      return;
    }

    const startVal = displayedQualityPct;
    const startTime = performance.now();
    const duration = 380;

    function tick(now) {
      const progress = Math.min(1, (now - startTime) / duration);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(startVal + (targetPct - startVal) * eased);
      displayedQualityPct = current;
      dom.hudQualityValue.textContent = `${current}%`;
      if (progress < 1) {
        qualityAnimFrame = requestAnimationFrame(tick);
      } else {
        displayedQualityPct = targetPct;
      }
    }
    qualityAnimFrame = requestAnimationFrame(tick);
  }

  function renderTelemetryHud(lastDelta = 0) {
    if (!session) return;
    const snap = session.getSnapshot();
    const band = snap.qualityBand;

    animateQualityCounter(snap.qualityPct);

    const offset = RING_CIRCUMFERENCE * (1 - snap.qualityPct / 100);
    if (dom.cqRingFill) {
      dom.cqRingFill.style.strokeDashoffset = String(offset);
      dom.cqRingFill.style.stroke = band.color;
    }

    if (dom.hudQualityDelta) {
      if (lastDelta < 0) {
        dom.hudQualityDelta.textContent = `${lastDelta}%`;
        dom.hudQualityDelta.hidden = false;
      } else if (snap.qualityPct === 100) {
        dom.hudQualityDelta.hidden = true;
      }
    }

    const displayStep = snap.completed ? snap.totalSteps : snap.activeStep;
    dom.hudStepCounter.textContent = `${displayStep} di ${snap.totalSteps}`;

    const activeSnodo = snap.activeSnodo;
    const domainColor = activeSnodo ? DOMAIN_META[activeSnodo.domainKey]?.accentColor : '#10B981';
    if (dom.hudSnodoDot) {
      dom.hudSnodoDot.style.backgroundColor = snap.completed ? '#10B981' : (domainColor || '#3BA5DB');
    }
    dom.hudActiveSnodo.textContent = snap.completed
      ? 'Percorso Completato'
      : `${activeSnodo?.snodoCode || ''} · ${activeSnodo?.domainLabel || ''}`;

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

  function renderPyramid(newlyUnlockedStep) {
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
            <summary>Consulta la Scheda Iniziale Completa del Paziente</summary>
            <div class="apex-sections-grid">${sectionsHtml}</div>
          </details>
        </article>
      </div>
    `;

    const maxVisibleStep = snap.completed ? snap.totalSteps : snap.activeStep;
    const visibleSteps = activeCase.steps.filter((s) => s.stepNumber <= maxVisibleStep);

    const stepsHtml = visibleSteps.map((step) => {
      const stepStatus = session.getStepStatus(step.stepNumber);
      const evolution = session.getStepPreChoiceEvolution(step.stepNumber);
      const snodiCount = step.snodi.length;
      const postitsTotal = step.snodi.reduce((sum, sn) => sum + sn.tiles.length, 0);
      const resolvedInStep = step.snodi.filter((sn) => Boolean(snap.resolvedSnodi[sn.snodoId])).length;
      const isNewStep = newlyUnlockedStep === step.stepNumber;

      const stateBadgeText = stepStatus === 'resolved'
        ? `Step Completato (${snodiCount}/${snodiCount})`
        : `Step Attivo · ${resolvedInStep}/${snodiCount} snodi completati`;

      const evolutionHtml = evolution ? `
        <div class="evolution-briefing-card" id="evolutionCardStep${step.stepNumber}">
          <div class="evolution-kicker">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
            <span>Step ${step.stepNumber} di ${activeCase.steps.length} · Prima della Scelta</span>
          </div>
          <h3 class="evolution-headline">${formatClinicalNoBreak(escapeHtml(evolution.headline))}</h3>
          <p class="evolution-narrative">${formatClinicalNoBreak(escapeHtml(evolution.narrative))}</p>
        </div>
      ` : '';

      const snodiHtml = step.snodi.map((snodo, sIdx) => {
        const domainMeta = DOMAIN_META[snodo.domainKey] || { accentColor: '#0E8AC8' };
        const resolved = snap.resolvedSnodi[snodo.snodoId];
        const isSnodoResolved = Boolean(resolved);
        const snodoStateCls = isSnodoResolved ? 'is-resolved' : 'is-active';

        let statusBadge = 'Scegli 1 Post-it';
        let statusCls = 'status-active';
        if (isSnodoResolved) {
          statusBadge = resolved.isCorrect ? 'Corretto · 0% CQ' : `Errato · ${resolved.qualityDeltaPct}% CQ`;
          statusCls = resolved.isCorrect ? 'status-ok' : 'status-err';
        }

        let tilesBodyHtml = '';
        if (isSnodoResolved) {
          const chosenCls = resolved.isCorrect ? 'is-chosen-correct' : 'is-chosen-error';
          const pillCls = resolved.isCorrect ? 'pill-optimal' : 'pill-error';
          const deltaLabel = resolved.qualityDeltaPct < 0 ? `${resolved.qualityDeltaPct}% CQ` : '0% CQ';
          tilesBodyHtml = `
            <div class="snodo-tiles-stack">
              <button
                type="button"
                class="postit-tile is-chosen ${chosenCls}"
                data-domain="${escapeAttr(snodo.domainKey)}"
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
          const buttons = displayTiles.map((tile, tIdx) => `
            <button
              type="button"
              class="postit-tile is-active"
              style="--tile-idx:${tIdx};"
              data-domain="${escapeAttr(snodo.domainKey)}"
              data-snodo-id="${escapeAttr(snodo.snodoId)}"
              data-tile-id="${escapeAttr(tile.id)}"
              aria-label="${escapeAttr(`Snodo ${snodo.snodoCode} Opzione ${tIdx + 1}: ${tile.headline}`)}"
            >
              <div class="postit-top">
                <span class="postit-code">Opzione ${tIdx + 1}</span>
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
            style="--snodo-accent:${domainMeta.accentColor}; --snodo-idx:${sIdx};"
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
          class="pyramid-step-band is-${stepStatus} ${isNewStep ? 'is-newly-unlocked' : ''}"
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

    let teaserHtml = '';
    if (!snap.completed && snap.activeStep < snap.totalSteps) {
      const nextStepCfg = activeCase.steps[snap.activeStep];
      const nextSnodiCount = nextStepCfg.snodi.length;
      const nextTilesCount = nextStepCfg.snodi.reduce((sum, sn) => sum + sn.tiles.length, 0);
      teaserHtml = `
        <div class="next-step-teaser" id="nextStepTeaser">
          <span class="teaser-pulse-dot" aria-hidden="true"></span>
          <span>Completa lo Step 0${snap.activeStep} per svelare lo <strong>Step 0${nextStepCfg.stepNumber}</strong> (${nextSnodiCount} snodi · ${nextTilesCount} Post-it)</span>
        </div>
      `;
    }

    dom.pyramidRows.innerHTML = apexHtml + stepsHtml + teaserHtml;

    dom.pyramidRows.querySelectorAll('.postit-tile[data-tile-id]').forEach((btn) => {
      btn.addEventListener('click', () => {
        openTileDialog(btn.dataset.snodoId, btn.dataset.tileId, btn.dataset.resolvedInspect === '1');
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
    dom.decisionCodePill.textContent = isInspect ? tile.id : `Snodo ${snodo.snodoCode}`;
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
          <span><strong>Coefficiente Qualità attuale:</strong> <span class="mono">${snap.qualityPct}%</span></span>
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

    const snap = result.snapshot;
    const unlockedNow = result.stepAdvanced && snap.activeStep > lastUnlockedStep
      ? snap.activeStep
      : null;
    if (unlockedNow) lastUnlockedStep = unlockedNow;

    const updateView = () => {
      renderAll({ newlyUnlockedStep: unlockedNow, lastDelta: result.record.qualityDeltaPct });
    };

    if (typeof document.startViewTransition === 'function' && !window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) {
      document.startViewTransition(updateView);
    } else {
      updateView();
    }

    if (result.record.qualityDeltaPct < 0) {
      showToast(`Scelta errata (${result.record.tileId}): ${result.record.qualityDeltaPct}% CQ (ora ${result.record.qualityAfter}%).`, 'error');
    } else {
      showToast(`Scelta corretta (${result.record.tileId}): CQ mantenuto al ${result.record.qualityAfter}%.`, 'ok');
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
          <span class="feedback-metric-chip">Coefficiente Qualità: ${deltaText}</span>
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
    if (outcome.completed) nextBtnLabel = 'Visualizza Sintesi & Debriefing Finale';
    else if (outcome.stepAdvanced) nextBtnLabel = `Svela Step 0${outcome.nextStepNumber} ↓`;

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

    const otherCase = CASES_REGISTRY.find((c) => c.meta.id !== activeCase.meta.id);

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
              ? `Soglia qualitativa (${report.passThresholdPct}%) superata lungo tutti i ${report.totalSnodiCount} snodi della piramide.`
              : `Coefficiente di Qualità inferiore alla soglia (${report.passThresholdPct}%): analizza gli snodi critici nella tabella e ripeti il percorso.`}
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
        ${otherCase ? `<button type="button" class="btn-primary" id="btnDebriefNextCase">Affronta ${escapeHtml(otherCase.meta.code)} (${escapeHtml(otherCase.meta.patientBadge)}) →</button>` : ''}
        <a href="${escapeAttr(returnPlatformUrl)}" class="btn-secondary" id="btnDebriefReturnPlatform" style="text-decoration:none;">← Torna a RADAR XLH (Modulo 02)</a>
        <button type="button" class="btn-secondary" id="btnDebriefReset">Ricomincia Questo Caso</button>
        <button type="button" class="btn-secondary" id="btnDebriefPrint">Stampa / Salva Report PDF</button>
        <button type="button" class="btn-secondary" id="btnDebriefTop">Torna all’Apice ↑</button>
      </div>
    `;

    document.getElementById('btnDebriefNextCase')?.addEventListener('click', () => {
      if (otherCase) selectCaseAndStart(otherCase.meta.id, { animate: true });
    });
    document.getElementById('btnDebriefReset')?.addEventListener('click', () => dom.resetConfirmDialog.showModal());
    document.getElementById('btnDebriefPrint')?.addEventListener('click', () => window.print());
    document.getElementById('btnDebriefTop')?.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  function openTimelineDialog() {
    if (!session) return;
    const snap = session.getSnapshot();
    if (dom.timelineDialogTitle) {
      dom.timelineDialogTitle.innerHTML = `Evoluzione Clinica · ${formatClinicalNoBreak(escapeHtml(activeCase.meta.patientBadge || activeCase.meta.title))}`;
    }

    const entries = [
      `
        <div class="timeline-entry">
          <h3>${escapeHtml(activeCase.apex.code || 'STEP 0')} — ${formatClinicalNoBreak(escapeHtml(activeCase.apex.title))}</h3>
          <p>${formatClinicalNoBreak(escapeHtml((activeCase.apex.briefingQuotes || [])[0] || ''))}</p>
        </div>
      `
    ];

    activeCase.steps.forEach((step) => {
      if (!snap.completed && step.stepNumber > snap.activeStep) return;
      const evo = session.getStepPreChoiceEvolution(step.stepNumber);
      const snodiLines = step.snodi.map((sn) => {
        const rec = snap.resolvedSnodi[sn.snodoId];
        if (!rec) return `<li><strong>Snodo ${escapeHtml(sn.snodoCode)}:</strong> in attesa di decisione</li>`;
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

  /* ══════════════════ CONNETTORI SVG DINAMICI PIRAMIDE ══════════════════ */
  function observePyramidResize() {
    if (typeof ResizeObserver === 'undefined' || !dom.pyramidRows) return;
    const ro = new ResizeObserver(() => requestAnimationFrame(() => drawPyramidConnectors(false)));
    ro.observe(dom.pyramidRows);
    window.addEventListener('resize', () => requestAnimationFrame(() => drawPyramidConnectors(false)), { passive: true });
  }

  function drawPyramidConnectors(animateNew) {
    if (currentScreen !== 'case') return;
    const svg = dom.pyramidConnectors;
    const stage = dom.pyramidStage;
    if (!svg || !stage || !session) return;

    const stageRect = stage.getBoundingClientRect();
    if (stageRect.width === 0 || stageRect.height === 0) return;

    svg.setAttribute('viewBox', `0 0 ${stage.offsetWidth} ${stage.offsetHeight}`);

    const snap = session.getSnapshot();
    const maxVisibleStep = snap.completed ? snap.totalSteps : snap.activeStep;
    const paths = [];

    const relBox = (el) => {
      const r = el.getBoundingClientRect();
      return {
        cx: r.left - stageRect.left + r.width / 2,
        top: r.top - stageRect.top,
        bottom: r.bottom - stageRect.top
      };
    };

    const apexEl = document.getElementById('apexTileCard');
    const firstSnodoEl = document.getElementById(`snodoBoard_${activeCase.steps[0]?.snodi[0]?.snodoId}`);
    if (apexEl && firstSnodoEl) {
      const a = relBox(apexEl);
      const b = relBox(firstSnodoEl);
      paths.push(makeCurve(a.cx, a.bottom, b.cx, b.top, 'is-active-trail'));
    }

    for (let i = 0; i < maxVisibleStep - 1; i += 1) {
      const curStep = activeCase.steps[i];
      const nextStep = activeCase.steps[i + 1];
      const sourceContainer = document.querySelector(`#stepBand${curStep.stepNumber} .step-snodi-grid`);
      if (!sourceContainer) continue;

      const s = relBox(sourceContainer);
      const isNewestBand = animateNew && nextStep.stepNumber === snap.activeStep;
      const cls = isNewestBand ? 'is-active-trail is-new-connector' : 'is-active-trail';

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
    const target = document.getElementById(`stepBand${stepNumber}`) || document.getElementById(`evolutionCardStep${stepNumber}`);
    if (target) {
      const y = target.getBoundingClientRect().top + window.scrollY - 82;
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
    }, 3600);
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
