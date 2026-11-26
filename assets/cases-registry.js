/* ═══════════════════════════════════════════════════════════════════════
   RADAR XLH — Registro Casi Clinici Piramide Inversa
   Contiene:
   1. calibration-xlh-pathway: Motore calibrato sui 6 snodi canonici con
      geometria piramidale completa (1 -> 2 -> 3 -> 4 -> 5 -> 6 -> 7 post-it),
      diramazioni narrative Sliding Doors ed esclusivamente concetti
      scientifici verificati dal dossier ufficiale FaD RADAR XLH.
   2. case-01-slot: Slot predisposto per il Caso Clinico #01 della Faculty.
   3. CASE_JSON_TEMPLATE: Schema di riferimento pronto per l'import/innesto.
   Compatibile con Browser (window.RADAR_CASES_DATA) e Node.js (CommonJS).
   ═══════════════════════════════════════════════════════════════════════ */

(function (root, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.RADAR_CASES_DATA = factory();
  }
})(typeof globalThis !== 'undefined' ? globalThis : this, function () {
  'use strict';

  const CALIBRATION_CASE = {
    meta: {
      id: 'calibration-xlh-pathway',
      code: 'CALIB-XLH-00',
      title: 'Percorso Metodologico XLH — Calibrazione Motore a Piramide Inversa',
      subtitle: 'Ambiente interattivo di calibrazione basato sui concetti clinici ufficiali RADAR XLH (in attesa del Caso Clinico #01 dalla Faculty)',
      isCalibration: true,
      status: 'active',
      authors: 'Governance Scientifica RADAR XLH · Architettura Didattica',
      targetSpecialties: [
        'Pediatri di Libera Scelta (PLS)',
        'Medici di Medicina Generale (MMG)',
        'Odontoiatri',
        'Ortopedici',
        'Fisiatri',
        'Endocrinologi',
        'Nefrologi'
      ],
      initialQualityPct: 100,
      passThresholdPct: 75,
      sourceReference: 'FaD RADAR XLH — Presentazione Iniziativa & Razionale Scientifico (FORUM pro S.r.l., ID 95)'
    },
    apex: {
      code: 'VERTICE · T0',
      badge: 'Modalità Calibrazione Motore · Percorso Ufficiale XLH',
      title: 'Inquadramento Iniziale: Dal Sospetto Territoriale alla Gestione XLH',
      patientSummary: 'Questo scenario verifica l’intera meccanica a Piramide Inversa (1 → 2 → 3 → 4 → 5 → 6 → 7 Post-it, 6 snodi clinici, narrazione evolutiva pre-scelta e decurtazione % del Coefficiente di Qualità). I contenuti clinici utilizzano esclusivamente il razionale scientifico ufficiale RADAR XLH.',
      clinicalParameters: [
        { label: 'Asse Fisiopatologico', value: 'PHEX → ↑ FGF23', flag: 'core' },
        { label: 'Target Renale', value: 'Inibizione NPT2a', flag: 'alert' },
        { label: 'Vitamina D Attiva', value: '↓ 1,25(OH)2D', flag: 'alert' },
        { label: 'Ereditarietà', value: 'X‑Linked Dominante', flag: 'info' },
        { label: 'Coefficiente Qualità Iniziale', value: '100%', flag: 'ok' }
      ],
      narrativeIntro: 'L’Ipofosfatemia Legata all’X (XLH) è un rachitismo/osteomalacia ereditaria rara caratterizzata da ipofosfatemia cronica con perdita renale di fosfato. La diagnosi tempestiva dipende in misura decisiva dalle figure specialistiche periferiche (PLS, MMG, odontoiatri, ortopedici e fisiatri) prima che si sviluppino deformità scheletriche gravi. Scendi lungo i 6 snodi della piramide inversa per testare l’evoluzione narrativa e l’impatto di ogni scelta sul Coefficiente di Qualità (%).',
      startPrompt: 'Snodo 1 già pronto qui sotto: seleziona un Post-it del livello Comunicazionale per iniziare la discesa.'
    },
    levels: [
      /* ══════════════════ LIVELLO 1 — COMUNICAZIONALE (2 POST-IT) ══════════════════ */
      {
        level: 1,
        domainKey: 'comunicazionale',
        domainLabel: 'Scelta Comunicazionale',
        nodesByBranch: {
          default: {
            complexityRank: 1,
            stageMaxValue: 100,
            preChoiceEvolution: {
              headline: 'T1 · Primo Contatto in Ambulatorio Territoriale (Sentinella)',
              narrative: 'Durante una valutazione ambulatoriale emergono segnali clinici compatibili con un possibile disturbo del metabolismo fosfo‑calcico (in età pediatrica: gambe arcuate, bassa statura, disturbi della deambulazione o ascessi dentari spontanei; nell’adulto: dolore muscolo-scheletrico cronico, entesopatie o anomalie dentarie non cariose). Il paziente o i genitori attendono indicazioni su come proseguire.',
              clinicalUpdates: [
                { label: 'Contesto', value: 'Primo contatto specialistico periferico (Sentinella)' },
                { label: 'Obiettivo Comunicazionale', value: 'Attivare alleanza diagnostica e raccogliere anamnesi familiare' }
              ],
              decisionPrompt: 'Come imposti il colloquio iniziale prima di programmare gli accertamenti?'
            },
            tiles: [
              {
                id: 'l1-a',
                code: 'L1-A',
                shortTitle: 'Colloquio strutturato con alleanza diagnostica e anamnesi mirata',
                clinicalTag: 'Comunicazione Efficace',
                bodyText: 'Spieghi con chiarezza e senza allarmismo perché è utile approfondire i segni osservati, raccogli una storia accurata su dolore, affaticabilità, episodi dentari e possibili casi analoghi in famiglia, e condividi la necessità di esami ematochimici mirati.',
                outcomeType: 'optimal',
                qualityDeltaPct: 0,
                valuePoints: 100,
                advanceOnSelect: true,
                nextBranchKey: 'default',
                feedbackTitle: 'Alleanza clinica ed efficacia anamnestica',
                feedbackRationale: 'Secondo il percorso RADAR XLH, la comunicazione chiara delle figure sentinella trasforma il sospetto iniziale in collaborazione attiva del paziente e consente di intercettare subito segnali familiari cruciali nella trasmissione X‑Linked dominante.',
                patientImpact: 'Il paziente/famiglia aderisce al percorso di approfondimento senza ritardi e segnala elementi anamnestici utili per lo step investigativo.'
              },
              {
                id: 'l1-b',
                code: 'L1-B',
                shortTitle: 'Rassicurazione generica senza anamnesi familiare né piano di rivalutazione',
                clinicalTag: 'Sottovalutazione Segnali',
                bodyText: 'Liquidare il quadro come semplice variazione costituzionale o disturbo aspecifico da crescita/sovraccarico, rassicurando genericamente senza esplorare la storia familiare né fissare un controllo clinico-laboratoristico.',
                outcomeType: 'error',
                qualityDeltaPct: -15,
                valuePoints: 0,
                advanceOnSelect: true,
                nextBranchKey: 'rushed_comm',
                feedbackTitle: 'Errore comunicazionale — Ritardo di presa in carico (-15% CQ)',
                feedbackRationale: 'La minimizzazione iniziale senza indagine anamnestica è una delle cause principali di ritardo diagnostico nell’XLH: i pazienti non riconosciuti o persi al follow-up sviluppano nel tempo deformità progressive, dolore cronico e perdita di fiducia nel percorso.',
                patientImpact: 'La famiglia rimanda gli accertamenti per diversi mesi, tornando solo quando i sintomi diventano più invalidanti.'
              }
            ]
          }
        }
      },

      /* ══════════════════ LIVELLO 2 — INVESTIGATIVA / ESAMINAZIONE (3 POST-IT) ══════════════════ */
      {
        level: 2,
        domainKey: 'investigativa',
        domainLabel: 'Scelta Investigativa / Esaminazione',
        nodesByBranch: {
          default: {
            complexityRank: 2,
            stageMaxValue: 150,
            preChoiceEvolution: {
              headline: 'T2 · Ritorno con Adesione Completa: Impostazione del Workup',
              narrative: 'Grazie al colloquio strutturato, il paziente ritorna puntualmente con i dettagli anamnestici familiari e chiede quali esami obiettivi e di laboratorio permettano di chiarire l’origine dei disturbi scheletrici e dentari.',
              clinicalUpdates: [
                { label: 'Aderenza Paziente', value: 'Alta · Disponibile a esame obiettivo e prelievo mirato' },
                { label: 'Focus Clinico', value: 'Valutazione del fosfato sierico corretto per età e bilancio fosfo‑calcico' }
              ],
              decisionPrompt: 'Quale pacchetto investigativo e di esaminazione clinica attivi?'
            },
            tiles: [
              {
                id: 'l2-a',
                code: 'L2-A',
                shortTitle: 'Esame obiettivo completo + Pannello fosfo‑calcico con Fosfato e TRP',
                clinicalTag: 'Gold Standard Investigativo',
                bodyText: 'Esegui esame obiettivo mirato (postura, deambulazione, cavo orale per ascessi non cariosi/difetti dello smalto) e richiedi fosfatemia (valutata rispetto ai range pediatrici/adulti), fosfaturia/riassorbimento tubulare di fosfato (TRP), fosfatasi alcalina, calcemia, PTH e 25(OH)D.',
                outcomeType: 'optimal',
                qualityDeltaPct: 0,
                valuePoints: 150,
                advanceOnSelect: true,
                nextBranchKey: 'early_phosphate',
                feedbackTitle: 'Il fosfato riconosciuto come biomarker centrale',
                feedbackRationale: 'Come evidenziato dal Modulo 1 (Omeostasi minerale) e Modulo 2 di RADAR XLH, il fosfato sierico corretto per età unito al calcolo della perdita renale (TRP/TmP-GFR) e all’ALP permette di distinguere immediatamente una ipofosfatemia da perdita renale da altre cause.',
                patientImpact: 'Gli esami documentano subito ipofosfatemia con perdita renale di fosfato e iper-fosfatasi alcalina, aprendo la corsia rapida verso il Centro Esperto.'
              },
              {
                id: 'l2-b',
                code: 'L2-B',
                shortTitle: 'Richiesta di sola Calcemia e 25(OH)D senza Fosfatemia né Fosfaturia',
                clinicalTag: 'Pannello Incompleto',
                bodyText: 'Prescrivi esami di routine con calcemia e vitamina D 25(OH)D per escludere un comune rachitismo carenziale o osteomalacia semplice, tralasciando il dosaggio del fosfato sierico e urinario.',
                outcomeType: 'acceptable',
                qualityDeltaPct: -6,
                valuePoints: 90,
                advanceOnSelect: true,
                nextBranchKey: 'partial_workup',
                feedbackTitle: 'Workup parziale — Fosfato omesso (-6% CQ)',
                feedbackRationale: 'Nell’XLH calcemia e 25(OH)D risultano frequentemente nella norma: fermarsi a questi parametri senza dosare la fosfatemia (e valutare i range per età) maschera il difetto principale di mineralizzazione.',
                patientImpact: 'I primi esami appaiono falsamente rassicuranti su calcio e 25(OH)D; è necessario un secondo prelievo per chiarire il quadro.'
              },
              {
                id: 'l2-c',
                code: 'L2-C',
                shortTitle: 'Supplementazione empirica con Vitamina D senza esami fosfo‑calcici',
                clinicalTag: 'Errore Metodologico',
                bodyText: 'Avvii direttamente vitamina D orale ad alto dosaggio ex juvantibus senza eseguire prelievo per fosfatemia, fosfatasi alcalina e parametri renali.',
                outcomeType: 'error',
                qualityDeltaPct: -18,
                valuePoints: 0,
                advanceOnSelect: true,
                nextBranchKey: 'partial_workup',
                feedbackTitle: 'Errore investigativo — Terapia empirica alla cieca (-18% CQ)',
                feedbackRationale: 'La terapia empirica con sola vitamina D nativa non corregge la perdita renale di fosfato mediata da FGF23 e ritarda l’inquadramento biochimico corretto.',
                patientImpact: 'I sintomi persistono invariati nonostante la supplementazione, aggravando il ritardo diagnostico.'
              }
            ]
          },
          rushed_comm: {
            complexityRank: 2,
            stageMaxValue: 150,
            preChoiceEvolution: {
              headline: 'T2 · Evoluzione dopo Minimizzazione Iniziale: Riacutizzazione Sintomi',
              narrative: 'A seguito della rassicurazione generica al T1, la famiglia si ripresenta dopo 6 mesi perché la limitazione funzionale, l’affaticabilità e gli episodi dolorosi/dentari si sono accentuati. Ora è indispensabile recuperare tempestività nell’esaminazione.',
              clinicalUpdates: [
                { label: 'Evoluzione Negativa', value: 'Ritardo accumulato di 6 mesi · Peggioramento tolleranza allo sforzo' },
                { label: 'Priorità Clinica', value: 'Recupero immediato tramite profilo biochimico fosfo‑calcico completo' }
              ],
              decisionPrompt: 'Come procedi ora nell’esaminazione e negli esami di laboratorio?'
            },
            tiles: [
              {
                id: 'l2-rc-a',
                code: 'L2-A',
                shortTitle: 'Recupero diagnostico: Esame obiettivo mirato + Fosfato, TRP e ALP',
                clinicalTag: 'Recupero Tempestivo',
                bodyText: 'Rivaluti sistematicamente apparato muscolo-scheletrico e cavo orale e richiedi subito pannello completo con fosfatemia per età, fosfaturia/TRP, ALP, calcemia, PTH e 25(OH)D.',
                outcomeType: 'optimal',
                qualityDeltaPct: 0,
                valuePoints: 150,
                advanceOnSelect: true,
                nextBranchKey: 'early_phosphate',
                feedbackTitle: 'Inversione di rotta efficace',
                feedbackRationale: 'L’inserimento mirato di fosfatemia, ALP e valutazione del riassorbimento tubulare di fosfato consente di recuperare il ritardo accumulato e identificare l’ipofosfatemia renale.',
                patientImpact: 'Il laboratorio mostra finalmente il segnale chiave di perdita renale di fosfato.'
              },
              {
                id: 'l2-rc-b',
                code: 'L2-B',
                shortTitle: 'Sola radiografia distrettuale con Calcemia/25(OH)D senza Fosfato',
                clinicalTag: 'Esaminazione Incompleta',
                bodyText: 'Esegui solo un controllo radiografico locale e dosi calcemia e 25(OH)D, rimandando ancora il pannello del fosfato.',
                outcomeType: 'acceptable',
                qualityDeltaPct: -8,
                valuePoints: 75,
                advanceOnSelect: true,
                nextBranchKey: 'partial_workup',
                feedbackTitle: 'Segnale biochimico ancora non intercettato (-8% CQ)',
                feedbackRationale: 'Senza fosfatemia e valutazione della perdita tubulare renale, i segni radiologici rischiano di essere attribuiti erroneamente a carenza nutrizionale o sovraccarico meccanico.',
                patientImpact: 'Permane incertezza diagnostica e necessità di ulteriore rivalutazione.'
              },
              {
                id: 'l2-rc-c',
                code: 'L2-C',
                shortTitle: 'Invio a fisioterapia sintomatica senza alcun approfondimento biochimico',
                clinicalTag: 'Ritardo Critico',
                bodyText: 'Prescrivi esclusivamente cicli fisioterapici antalgici o plantari senza esami ematochimici fosfo‑calcici.',
                outcomeType: 'error',
                qualityDeltaPct: -20,
                valuePoints: 0,
                advanceOnSelect: true,
                nextBranchKey: 'partial_workup',
                feedbackTitle: 'Errore investigativo grave — Sintomo trattato senza causa (-20% CQ)',
                feedbackRationale: 'Intervenire solo sul piano sintomatico meccanico in presenza di ipofosfatemia non diagnosticata espone a progressione delle deformità e pseudofratture.',
                patientImpact: 'Il quadro osseo continua a deteriorarsi in assenza di diagnosi metabolica.'
              }
            ]
          }
        }
      },

      /* ══════════════════ LIVELLO 3 — GESTIONALE (4 POST-IT) ══════════════════ */
      {
        level: 3,
        domainKey: 'gestionale',
        domainLabel: 'Scelta Gestionale',
        nodesByBranch: {
          default: {
            complexityRank: 3,
            stageMaxValue: 200,
            preChoiceEvolution: {
              headline: 'T3 · Referto di Ipofosfatemia Cronica con Perdita Renale di Fosfato',
              narrative: 'I risultati mostrano ipofosfatemia al di sotto del limite inferiore per età, ridotto riassorbimento tubulare di fosfato (TRP ridotto), fosfatasi alcalina elevata, calcemia normale e 25(OH)D adeguata. Il sospetto di patologia rara fosfo‑dismetabolica (XLH) è altamente fondato.',
              clinicalUpdates: [
                { label: 'Fosfatemia', value: 'Ridotta per età · Perdita renale documentata (↓ TRP)' },
                { label: 'Calcemia / 25(OH)D', value: 'Nella norma · ↑ Fosfatasi Alcalina' }
              ],
              decisionPrompt: 'Quale decisione gestionale e di network di referral attui a questo snodo?'
            },
            tiles: [
              {
                id: 'l3-a',
                code: 'L3-A',
                shortTitle: 'Referral strutturato al Centro Specialistico Malattie Rare/Metabolismo Osseo',
                clinicalTag: 'Network RADAR XLH Ottimale',
                bodyText: 'Attivi il referral rapido verso il Centro di Riferimento multidisciplinare (endocrinologia/nefrologia/pediatria metabolica ossea), allegando il dossier completo (curva di crescita/sintomi, anamnesi familiare, fosfatemia, TRP, ALP e segnalazioni dentarie/ortopediche).',
                outcomeType: 'optimal',
                qualityDeltaPct: 0,
                valuePoints: 200,
                advanceOnSelect: true,
                nextBranchKey: 'default',
                feedbackTitle: 'Referral tempestivo e dossier completo',
                feedbackRationale: 'Nel Modulo 4 (Mappatura e Network di Referral), la sentinella non sostituisce lo specialista ma anticipa il sospetto e indirizza il paziente con dati biochimici completi al centro appropriato.',
                patientImpact: 'Il paziente accede al Centro Esperto in tempi brevi evitando peregrinazioni specialistiche frammentate.'
              },
              {
                id: 'l3-b',
                code: 'L3-B',
                shortTitle: 'Invio al Centro Esperto senza allegare dati biochimici né anamnesi familiare',
                clinicalTag: 'Referral Incompleto',
                bodyText: 'Consigli genericamente al paziente di prenotare una visita specialistica di terzo livello senza relazione clinica di accompagnamento né referti fosfo‑calcici organizzati.',
                outcomeType: 'acceptable',
                qualityDeltaPct: -5,
                valuePoints: 120,
                advanceOnSelect: true,
                nextBranchKey: 'default',
                feedbackTitle: 'Indirizzo corretto ma coordinamento debole (-5% CQ)',
                feedbackRationale: 'Il referral privo di documentazione biochimica e di sintesi anamnestica rallenta il triage specialistico e costringe spesso a ripetere accertamenti.',
                patientImpact: 'Il paziente raggiunge il centro ma con allungamento dei tempi di presa in carico.'
              },
              {
                id: 'l3-c',
                code: 'L3-C',
                shortTitle: 'Invio diretto a chirurgia ortopedica correttiva prima dell’inquadramento metabolico',
                clinicalTag: 'Errore Gestionale',
                bodyText: 'Indirizzi il paziente esclusivamente all’ortopedico per valutare un intervento correttivo meccanico sulle deformità, ignorando l’ipofosfatemia renale.',
                outcomeType: 'error',
                qualityDeltaPct: -16,
                valuePoints: 0,
                advanceOnSelect: true,
                nextBranchKey: 'default',
                feedbackTitle: 'Errore gestionale — Chirurgia su osso non mineralizzato (-16% CQ)',
                feedbackRationale: 'Programmare interventi ortopedici correttivi senza aver prima diagnosticato e stabilizzato metabolicamente l’XLH espone ad alto rischio di recidiva delle deformità e complicanze.',
                patientImpact: 'Il paziente rischia procedure invasive premature senza correzione della causa metabolica.'
              },
              {
                id: 'l3-d',
                code: 'L3-D',
                shortTitle: 'Monitoraggio annuale passivo in attesa che i valori si normalizzino spontaneamente',
                clinicalTag: 'Inerzia Clinica',
                bodyText: 'Decidi di ripetere gli esami solo dopo 12 mesi senza avviare alcun percorso di referral specialistico.',
                outcomeType: 'error',
                qualityDeltaPct: -18,
                valuePoints: 0,
                advanceOnSelect: true,
                nextBranchKey: 'default',
                feedbackTitle: 'Errore gestionale — Attesa passiva dannosa (-18% CQ)',
                feedbackRationale: 'L’XLH è una condizione cronica genetica che non si risolve spontaneamente: attendere 12 mesi con ipofosfatemia attiva aggrava rachitismo, dolore e rischio di complicanze dentarie/scheletriche.',
                patientImpact: 'Progressione evitabile della malattia prima dell’accesso alle cure.'
              }
            ]
          },
          partial_workup: {
            complexityRank: 3,
            stageMaxValue: 200,
            preChoiceEvolution: {
              headline: 'T3 · Persistenza Sintomi dopo Workup Incompleto: Necessità di Riallineamento',
              narrative: 'Calcemia e 25(OH)D risultano sostanzialmente nella norma, ma il paziente continua a riferire dolore osseo, limitazione motoria o ascessi dentari ricorrenti. Emerge la necessità di sbloccare lo stallo gestionale.',
              clinicalUpdates: [
                { label: 'Stato Percorso', value: 'Stallo diagnostico · Fosfato non ancora caratterizzato' },
                { label: 'Rischio Attuale', value: 'Dispersione tra visite specialistiche non integrate' }
              ],
              decisionPrompt: 'Quale azione gestionale scegli per uscire dallo stallo?'
            },
            tiles: [
              {
                id: 'l3-pw-a',
                code: 'L3-A',
                shortTitle: 'Integrazione immediata di Fosfatemia/TRP e invio strutturato al Centro Esperto',
                clinicalTag: 'Riallineamento Ottimale',
                bodyText: 'Completi senza ulteriore indugio il profilo con fosfatemia per età, fosfaturia/TRP e ALP, e attivi il canale di referral verso il Centro Specialistico multidisciplinare.',
                outcomeType: 'optimal',
                qualityDeltaPct: 0,
                valuePoints: 200,
                advanceOnSelect: true,
                nextBranchKey: 'default',
                feedbackTitle: 'Percorso ricondotto al network RADAR XLH',
                feedbackRationale: 'Integrare il fosfato e connettere subito la sentinella al centro prescrittore interrompe il pellegrinaggio diagnostico del paziente raro.',
                patientImpact: 'Viene finalmente documentata la perdita renale di fosfato e avviata la presa in carico specialistica.'
              },
              {
                id: 'l3-pw-b',
                code: 'L3-B',
                shortTitle: 'Consulenze specialistiche isolate (solo odontoiatra o solo fisiatra) senza regia',
                clinicalTag: 'Gestione Frammentata',
                bodyText: 'Invii il paziente a singoli specialisti d’organo per gestire solo il singolo sintomo (denti o dolore articolare) senza collegare i segni in una valutazione metabolica unitaria.',
                outcomeType: 'acceptable',
                qualityDeltaPct: -7,
                valuePoints: 100,
                advanceOnSelect: true,
                nextBranchKey: 'default',
                feedbackTitle: 'Frammentazione assistenziale (-7% CQ)',
                feedbackRationale: 'Senza regia metabolica, ciascuno specialista tratta il proprio distretto ma la causa comune (asse PHEX‑FGF23) rimane invisibile.',
                patientImpact: 'Solo l’integrazione successiva dei referti porterà al sospetto unitario.'
              },
              {
                id: 'l3-pw-c',
                code: 'L3-C',
                shortTitle: 'Prescrizione di terapia antinfiammatoria cronica e scarico motorio prolungato',
                clinicalTag: 'Gestione Palliativa Impropria',
                bodyText: 'Imposti terapia sintomatica cronica con FANS senza approfondire l’ipofosfatemia né coinvolgere un centro specialistico.',
                outcomeType: 'error',
                qualityDeltaPct: -15,
                valuePoints: 0,
                advanceOnSelect: true,
                nextBranchKey: 'default',
                feedbackTitle: 'Errore gestionale — Mascheramento sintomatico (-15% CQ)',
                feedbackRationale: 'L’uso cronico di analgesici non modifica la mineralizzazione ossea difettiva e ritarda ulteriormente la diagnosi eziologica.',
                patientImpact: 'Esposizione a effetti collaterali farmacologici senza beneficio sulla malattia di base.'
              },
              {
                id: 'l3-pw-d',
                code: 'L3-D',
                shortTitle: 'Chiusura del caso per assenza di ipocalcemia',
                clinicalTag: 'Errore Critico',
                bodyText: 'Archivi il sospetto metabolico considerando normale il metabolismo minerale perché calcemia e 25(OH)D non sono alterate.',
                outcomeType: 'error',
                qualityDeltaPct: -20,
                valuePoints: 0,
                advanceOnSelect: true,
                nextBranchKey: 'default',
                feedbackTitle: 'Errore critico — Falsa esclusione su calcemia normale (-20% CQ)',
                feedbackRationale: 'Nell’XLH la calcemia è tipicamente normale; escludere un rachitismo/osteomalacia ipofosfatemica sulla base della sola calcemia è un errore classico da evitare.',
                patientImpact: 'Il paziente resta non diagnosticato con perdita di anni utili di trattamento.'
              }
            ]
          }
        }
      },

      /* ══════════════════ LIVELLO 4 — DIAGNOSTICA (5 POST-IT) ══════════════════ */
      {
        level: 4,
        domainKey: 'diagnostica',
        domainLabel: 'Scelta Diagnostica',
        nodesByBranch: {
          default: {
            complexityRank: 4,
            stageMaxValue: 250,
            preChoiceEvolution: {
              headline: 'T4 · Valutazione al Centro Specialistico: Conferma Molecolare e Familiare',
              narrative: 'Al Centro Esperto il quadro biochimico conferma ipofosfatemia cronica con perdita renale di fosfato (↓ TmP/GFR), ↑ FGF23 sierico inappropriatamente normale/elevato rispetto all’ipofosfatemia, 1,25(OH)2D ridotta/inappropriatamente bassa e PTH normale o lievemente mosso. Occorre chiudere la diagnosi e definire l’estensione familiare.',
              clinicalUpdates: [
                { label: 'Asse Patogenetico', value: '↑ FGF23 → inibizione NPT2a & 1α-idrossilasi' },
                { label: 'Calcitriolo 1,25(OH)2D', value: 'Inappropriatamente ridotto · Stimolazione 24-idrossilasi' },
                { label: 'Step Richiesto', value: 'Conferma diagnostica XLH + Mappatura Familiare' }
              ],
              decisionPrompt: 'Quale strategia diagnostica completa selezioni in questa fase?'
            },
            tiles: [
              {
                id: 'l4-a',
                code: 'L4-A',
                shortTitle: 'Diagnosi di XLH (test genetico PHEX) + Albero genealogico e screening familiare attivo',
                clinicalTag: 'Diagnosi Completa & Pedigree',
                bodyText: 'Confermi la diagnosi di Ipofosfatemia X‑Linked mediante analisi genetica del gene PHEX (escludendo forme secondarie o altre tubulopatie) e costruisci sistematicamente il pedigree su 3 generazioni per avviare lo screening biochimico-clinico dei familiari a rischio secondo le regole X‑Linked dominanti.',
                outcomeType: 'optimal',
                qualityDeltaPct: 0,
                valuePoints: 250,
                advanceOnSelect: true,
                nextBranchKey: 'default',
                feedbackTitle: 'Paziente indice moltiplicatore di diagnosi familiari',
                feedbackRationale: 'Come insegnato nel Modulo 5 (Mappatura Famigliare), la trasmissione X‑Linked dominante implica che ogni paziente indice può svelare familiari non diagnosticati (madre, figlie, fratelli/sorelle secondo la linea di trasmissione).',
                patientImpact: 'Diagnosi molecolare certa e identificazione precoce di altri membri della famiglia fino a quel momento misconosciuti.'
              },
              {
                id: 'l4-b',
                code: 'L4-B',
                shortTitle: 'Diagnosi clinico-biochimica di XLH corretta, ma senza screening familiare',
                clinicalTag: 'Mappatura Familiare Omessa',
                bodyText: 'Confermi l’XLH sul singolo paziente con test PHEX, ma limiti l’intervento al paziente indice senza costruire l’albero genealogico né proporre screening ai consanguinei.',
                outcomeType: 'acceptable',
                qualityDeltaPct: -6,
                valuePoints: 150,
                advanceOnSelect: true,
                nextBranchKey: 'default',
                feedbackTitle: 'Diagnosi individuale corretta ma opportunità familiare persa (-6% CQ)',
                feedbackRationale: 'Omettere il pedigree fa perdere il valore moltiplicativo dello screening familiare strutturato, lasciando potenzialmente esposti altri parenti sintomatici.',
                patientImpact: 'Il paziente indice è diagnosticato, ma eventuali familiari affetti restano senza inquadramento.'
              },
              {
                id: 'l4-c',
                code: 'L4-C',
                shortTitle: 'Etichettamento come Rachitismo/Osteomalacia Carenziale resistente senza test PHEX',
                clinicalTag: 'Errore Diagnostico',
                bodyText: 'Attribuisci il quadro a malassorbimento o deficit vitaminico D atipico, escludendo l’indagine genetica PHEX e il dosaggio di FGF23.',
                outcomeType: 'error',
                qualityDeltaPct: -16,
                valuePoints: 0,
                advanceOnSelect: true,
                nextBranchKey: 'default',
                feedbackTitle: 'Errore diagnostico — Misclassificazione (-16% CQ)',
                feedbackRationale: 'Confondere una forma genetica FGF23-mediata con un deficit nutrizionale impedisce l’accesso a terapie specifiche e alla consulenza genetica.',
                patientImpact: 'Inquadramento errato e percorso terapeutico inadeguato.'
              },
              {
                id: 'l4-d',
                code: 'L4-D',
                shortTitle: 'Consulenza genetica basata su modello autosomico recessivo',
                clinicalTag: 'Errore Genetica X‑Linked',
                bodyText: 'Comunichi alla famiglia che la malattia si trasmette in modo autosomico recessivo e che un padre affetto trasmette lo stesso rischio ai figli maschi e alle femmine.',
                outcomeType: 'error',
                qualityDeltaPct: -14,
                valuePoints: 0,
                advanceOnSelect: true,
                nextBranchKey: 'default',
                feedbackTitle: 'Errore di trasmissione genetica (-14% CQ)',
                feedbackRationale: 'L’XLH è X‑Linked dominante: il padre affetto trasmette la mutazione al 100% delle figlie femmine e allo 0% dei figli maschi; la madre affetta ha il 50% di probabilità di trasmissione a ciascun figlio/a indipendentemente dal sesso.',
                patientImpact: 'Informazione genetica fuorviante per la pianificazione familiare e lo screening.'
              },
              {
                id: 'l4-e',
                code: 'L4-E',
                shortTitle: 'Biopsia ossea invasiva di routine prima della valutazione biochimica e genetica',
                clinicalTag: 'Esame Inappropriato',
                bodyText: 'Richiedi immediatamente una biopsia ossea diagnostica come primo accertamento al posto del percorso biochimico-genetico non invasivo.',
                outcomeType: 'error',
                qualityDeltaPct: -12,
                valuePoints: 0,
                advanceOnSelect: true,
                nextBranchKey: 'default',
                feedbackTitle: 'Invasività non necessaria (-12% CQ)',
                feedbackRationale: 'La diagnosi di XLH si fonda su clinica, biochimica fosfo‑calcica (ipofosfatemia con perdita renale di fosfato, FGF23) e test genetico PHEX, non su biopsia ossea routinaria.',
                patientImpact: 'Procedura invasiva evitabile con stress e ritardo diagnostico.'
              }
            ]
          }
        }
      },

      /* ══════════════════ LIVELLO 5 — TERAPEUTICA (6 POST-IT) ══════════════════ */
      {
        level: 5,
        domainKey: 'terapeutica',
        domainLabel: 'Scelta Terapeutica',
        nodesByBranch: {
          default: {
            complexityRank: 5,
            stageMaxValue: 300,
            preChoiceEvolution: {
              headline: 'T5 · Strategia Terapeutica Multidisciplinare post-Diagnosi XLH',
              narrative: 'La diagnosi di Ipofosfatemia X‑Linked è confermata (mutazione loss-of-function PHEX con iperproduzione di FGF23). Il team multidisciplinare del Centro Prescrittore deve impostare il programma terapeutico e di supporto personalizzato per età e quadro clinico.',
              clinicalUpdates: [
                { label: 'Diagnosi Confermata', value: 'XLH · Mutazione PHEX / Eccesso FGF23' },
                { label: 'Dimensioni da Coprire', value: 'Omeostasi fosfato · Scheletro · Denti · Funzionalità motoria' }
              ],
              decisionPrompt: 'Quale impostazione terapeutica integrata (non prescrittiva in simulazione) è coerente con il percorso RADAR XLH?'
            },
            tiles: [
              {
                id: 'l5-a',
                code: 'L5-A',
                shortTitle: 'Approccio mirato alla via FGF23 / valutazione specialistica + presa in carico multidisciplinare',
                clinicalTag: 'Care Pathway Ottimale',
                bodyText: 'Nel Centro Prescrittore si valuta l’opzione terapeutica mirata al meccanismo fisiopatologico (blocco dell’eccesso di FGF23) rispetto o in confronto alla terapia convenzionale (sali di fosfato + calcitriolo), integrando presa in carico odontoiatrica, ortopedica e fisiatrica.',
                outcomeType: 'optimal',
                qualityDeltaPct: 0,
                valuePoints: 300,
                advanceOnSelect: true,
                nextBranchKey: 'default',
                feedbackTitle: 'Terapia mirata al meccanismo e presa in carico integrata',
                feedbackRationale: 'Come illustrato nel Modulo 6 di RADAR XLH, l’evoluzione delle terapie mirate alla via FGF23 agisce a monte della perdita renale di fosfato e dell’inibizione della 1α-idrossilasi, affiancandosi a un percorso multidisciplinare strutturato.',
                patientImpact: 'Controllo fisiopatologico della perdita di fosfato e protezione coordinata di ossa, denti e mobilità.'
              },
              {
                id: 'l5-b',
                code: 'L5-B',
                shortTitle: 'Terapia convenzionale (fosfato orale + calcitriolo) con stretto monitoraggio sicurezza',
                clinicalTag: 'Opzione Convenzionale Monitorata',
                bodyText: 'Imposti terapia convenzionale con supplementi frazionati di fosfato e analoghi attivi della vitamina D (calcitriolo/alfacalcidolo), programmando stretto monitoraggio di calciuria, nefrocalcinosi e iperparatiroidismo secondario.',
                outcomeType: 'acceptable',
                qualityDeltaPct: -5,
                valuePoints: 200,
                advanceOnSelect: true,
                nextBranchKey: 'default',
                feedbackTitle: 'Approccio convenzionale vigile (-5% CQ)',
                feedbackRationale: 'La terapia convenzionale resta un riferimento storico con efficacia variabile e rischio di effetti avversi (nefrocalcinosi, iperparatiroidismo, scarsa tollerabilità GI), che richiede quindi attenta valutazione comparativa con le terapie mirate anti-FGF23.',
                patientImpact: 'Richiede frequenti somministrazioni giornaliere e sorveglianza ecografica/biochimica serrata.'
              },
              {
                id: 'l5-c',
                code: 'L5-C',
                shortTitle: 'Terapia specifica senza coinvolgimento di odontoiatra, ortopedico e fisiatra',
                clinicalTag: 'Approccio Monodisciplinare',
                bodyText: 'Avvii il trattamento farmacologico corretto ma trascuri la valutazione odontoiatrica preventiva e il supporto riabilitativo/ortopedico.',
                outcomeType: 'acceptable',
                qualityDeltaPct: -8,
                valuePoints: 150,
                advanceOnSelect: true,
                nextBranchKey: 'default',
                feedbackTitle: 'Farmaco ok, ma rete multidisciplinare incompleta (-8% CQ)',
                feedbackRationale: 'Nell’XLH le manifestazioni odontoiatriche (ascessi spontanei, alterazioni dentinali) e muscolo-scheletriche richiedono collaborazione continuativa tra specialisti.',
                patientImpact: 'Complicanze dentarie o limitazioni funzionali residue non intercettate precocemente.'
              },
              {
                id: 'l5-d',
                code: 'L5-D',
                shortTitle: 'Soli sali di fosfato ad alte dosi senza calcitriolo né valutazione anti-FGF23',
                clinicalTag: 'Squilibrio Metabolico',
                bodyText: 'Somministri solo fosfato orale ad alto dosaggio senza vitamina D attiva e senza considerare il ruolo di FGF23.',
                outcomeType: 'error',
                qualityDeltaPct: -15,
                valuePoints: 0,
                advanceOnSelect: true,
                nextBranchKey: 'default',
                feedbackTitle: 'Errore terapeutico — Rischio iperparatiroidismo (-15% CQ)',
                feedbackRationale: 'Il fosfato orale da solo stimola il PTH favorendo iperparatiroidismo secondario/terziario e peggiorando ulteriormente la perdita renale di fosfato.',
                patientImpact: 'Squilibrio calcio-PTH e scarso controllo della mineralizzazione.'
              },
              {
                id: 'l5-e',
                code: 'L5-E',
                shortTitle: 'Sola supplementazione di Calcio e Colecalciferolo (vitamina D nativa)',
                clinicalTag: 'Terapia Inefficace',
                bodyText: 'Tratti la condizione come un comune deficit calcico/vitaminico D con calcio carbonato e colecalciferolo.',
                outcomeType: 'error',
                qualityDeltaPct: -18,
                valuePoints: 0,
                advanceOnSelect: true,
                nextBranchKey: 'default',
                feedbackTitle: 'Errore terapeutico — Target sbagliato (-18% CQ)',
                feedbackRationale: 'Il blocco della 1α-idrossilasi indotto da FGF23 impedisce l’attivazione fisiologica della 25(OH)D e non corregge la fosfaturia; inoltre il carico di calcio espone a ipercalciuria senza beneficiare il fosfato.',
                patientImpact: 'Nessun miglioramento osseo e potenziale danno renale da calcio.'
              },
              {
                id: 'l5-f',
                code: 'L5-F',
                shortTitle: 'Bifosfonati o corticosteroidi sistemici per il dolore osseo',
                clinicalTag: 'Controindicazione Clinica',
                bodyText: 'Prescrivi bifosfonati o cicli steroidei per ridurre il dolore muscolo-scheletrico diffuso.',
                outcomeType: 'error',
                qualityDeltaPct: -20,
                valuePoints: 0,
                advanceOnSelect: true,
                nextBranchKey: 'default',
                feedbackTitle: 'Errore grave — Farmaci controindicati nell’osteomalacia (-20% CQ)',
                feedbackRationale: 'I bifosfonati inibiscono il rimodellamento senza correggere il difetto di mineralizzazione ipofosfatemico e possono peggiorare l’osteomalacia; gli steroidi aggravano la fragilità scheletrica.',
                patientImpact: 'Peggioramento del quadro scheletrico e del rischio di pseudofratture.'
              }
            ]
          }
        }
      },

      /* ══════════════════ LIVELLO 6 — MANTENIMENTO / FOLLOW-UP (7 POST-IT) ══════════════════ */
      {
        level: 6,
        domainKey: 'followup',
        domainLabel: 'Scelta Mantenimento / Follow-up',
        nodesByBranch: {
          default: {
            complexityRank: 6,
            stageMaxValue: 350,
            preChoiceEvolution: {
              headline: 'T6 · Lungo Termine, Transizione Pediatrico-Adulto e Qualità di Vita',
              narrative: 'Il percorso entra nella fase longitudinale: bisogna garantire continuità terapeutica e assistenziale lungo tutto l’arco di vita, governando la delicata transizione dall’età pediatrica all’età adulta ed evitando la perdita al follow-up che genera dolore cronico, entesopatie, pseudofratture e compromissione della qualità di vita.',
              clinicalUpdates: [
                { label: 'Orizzonte Temporale', value: 'Follow-up life-long · Transizione Pediatrico → Adulto' },
                { label: 'Outcome Principali', value: 'Dolore, entesopatie, pseudofratture, salute dentaria, QoL' }
              ],
              decisionPrompt: 'Quale piano di mantenimento e follow-up strutturato adotti?'
            },
            tiles: [
              {
                id: 'l6-a',
                code: 'L6-A',
                shortTitle: 'Follow-up life-long strutturato, transizione guidata Pediatrico-Adulto e rete territoriale',
                clinicalTag: 'Standard RADAR XLH Ottimale',
                bodyText: 'Pianifichi un passaggio strutturato dal team pediatrico al team dell’adulto (senza interrompere le cure al termine della crescita), con monitoraggio periodico biochimico, renale, odontoiatrico, ortopedico/fisiatrico, valutazione della qualità di vita (PRO) e raccordo costante con MMG/territorio.',
                outcomeType: 'optimal',
                qualityDeltaPct: 0,
                valuePoints: 350,
                advanceOnSelect: true,
                nextBranchKey: 'default',
                feedbackTitle: 'Continuità di cura lungo tutto il ciclo di vita',
                feedbackRationale: 'I Moduli 6 e 7 di RADAR XLH sottolineano che l’XLH non termina con la chiusura delle cartilagini di accrescimento: la transizione guidata e il monitoraggio multidisciplinare prevengono entesopatie, pseudofratture e perdita al follow-up.',
                patientImpact: 'Massima tutela della funzionalità motoria, della salute orale e della qualità di vita a lungo termine.'
              },
              {
                id: 'l6-b',
                code: 'L6-B',
                shortTitle: 'Follow-up continuo solo presso il Centro Specialistico senza raccordo con MMG e dentista',
                clinicalTag: 'Follow-up Parziale',
                bodyText: 'Mantieni i controlli annuali al Centro di riferimento ma non coinvolgi il medico di medicina generale territoriale né programmi controlli odontoiatrici cadenzati.',
                outcomeType: 'acceptable',
                qualityDeltaPct: -4,
                valuePoints: 230,
                advanceOnSelect: true,
                nextBranchKey: 'default',
                feedbackTitle: 'Monitoraggio buono ma rete territoriale incompleta (-4% CQ)',
                feedbackRationale: 'Coinvolgere le figure territoriali riduce la distanza tra controlli specialistici e intercetta precocemente ascessi dentari o riacutizzazioni algiche.',
                patientImpact: 'Controllo discreto ma minore tempestività tra una visita di centro e l’altra.'
              },
              {
                id: 'l6-c',
                code: 'L6-C',
                shortTitle: 'Monitoraggio dei soli esami del sangue senza valutazione dolore, mobilità e PRO',
                clinicalTag: 'Focus Solo Biochimico',
                bodyText: 'Valuti esclusivamente fosfatemia e ALP nei controlli periodici, trascurando questionari su qualità di vita, stanchezza, rigidità articolare e ricerca di entesopatie.',
                outcomeType: 'acceptable',
                qualityDeltaPct: -7,
                valuePoints: 170,
                advanceOnSelect: true,
                nextBranchKey: 'default',
                feedbackTitle: 'Trascurati gli outcome centrati sul paziente (-7% CQ)',
                feedbackRationale: 'Nell’adulto con XLH dolore, rigidità, entesopatie e qualità di vita possono impattare fortemente anche a fronte di parametri ematochimici stabilizzati.',
                patientImpact: 'Disagio funzionale sottostimato durante il follow-up.'
              },
              {
                id: 'l6-d',
                code: 'L6-D',
                shortTitle: 'Sospensione del follow-up e della terapia al termine dell’accrescimento staturale',
                clinicalTag: 'Errore Classico di Transizione',
                bodyText: 'Concludi il percorso clinico al raggiungimento dell’età adulta ritenendo che, esaurito il rachitismo pediatrico, la malattia sia ormai stabilizzata.',
                outcomeType: 'error',
                qualityDeltaPct: -20,
                valuePoints: 0,
                advanceOnSelect: true,
                nextBranchKey: 'default',
                feedbackTitle: 'Errore critico — Interruzione alla fine della crescita (-20% CQ)',
                feedbackRationale: 'È una delle criticità maggiori evidenziate dal Modulo 6 e 7: interrompere il follow-up dopo la crescita espone l’adulto a osteomalacia sintomatica, pseudofratture, entesopatie calcifiche, perdita dentaria e perdita al follow-up.',
                patientImpact: 'Comparsa di complicanze croniche invalidanti in età adulta.'
              },
              {
                id: 'l6-e',
                code: 'L6-E',
                shortTitle: 'Controlli esclusivamente al bisogno in caso di frattura o dolore acuto',
                clinicalTag: 'Gestione Reattiva',
                bodyText: 'Affidi al paziente la decisione di prenotare controlli solo se dovessero comparire dolori acuti o eventi traumatici.',
                outcomeType: 'error',
                qualityDeltaPct: -15,
                valuePoints: 0,
                advanceOnSelect: true,
                nextBranchKey: 'default',
                feedbackTitle: 'Errore di follow-up — Approccio solo reattivo (-15% CQ)',
                feedbackRationale: 'Le pseudofratture e la nefrocalcinosi decorrono spesso in modo subdolo: solo un monitoraggio proattivo programmato previene complicanze irreversibili.',
                patientImpact: 'Intervento tardivo a danno scheletrico o renale già instaurato.'
              },
              {
                id: 'l6-f',
                code: 'L6-F',
                shortTitle: 'Sospensione dei controlli renali e dell’ecografia in terapia cronica',
                clinicalTag: 'Omissione Sicurezza',
                bodyText: 'Mantieni la prescrizione ma elimini ecografia renale, calciuria e PTH dal piano di sorveglianza periodica.',
                outcomeType: 'error',
                qualityDeltaPct: -12,
                valuePoints: 0,
                advanceOnSelect: true,
                nextBranchKey: 'default',
                feedbackTitle: 'Errore di sicurezza nel mantenimento (-12% CQ)',
                feedbackRationale: 'La sorveglianza della funzionalità renale, della calciuria e del PTH è indispensabile nel follow-up dell’XLH per prevenire o individuare precocemente nefrocalcinosi e iperparatiroidismo.',
                patientImpact: 'Rischio di tossicità renale non rilevata.'
              },
              {
                id: 'l6-g',
                code: 'L6-G',
                shortTitle: 'Interruzione dell’attività fisica adattata per timore generico di fragilità',
                clinicalTag: 'Restrizione Controproducente',
                bodyText: 'Sconsigli qualsiasi attività motoria e fisioterapica prescrivendo riposo prolungato permanente.',
                outcomeType: 'error',
                qualityDeltaPct: -16,
                valuePoints: 0,
                advanceOnSelect: true,
                nextBranchKey: 'default',
                feedbackTitle: 'Errore riabilitativo — Decondizionamento (-16% CQ)',
                feedbackRationale: 'La presa in carico fisiatrica mirata e l’esercizio fisico sicuro e adattato migliorano forza muscolare, mobilità articolare e qualità di vita nell’XLH.',
                patientImpact: 'Peggioramento di astenia, rigidità e qualità di vita percepita.'
              }
            ]
          }
        }
      }
    ]
  };

  CALIBRATION_CASE.levels[2].nodesByBranch.early_phosphate = CALIBRATION_CASE.levels[2].nodesByBranch.default;

  const CASE_01_SLOT = {
    meta: {
      id: 'case-01-slot',
      code: 'CASO-01',
      title: 'Caso Clinico #01 — In Attesa di Caricamento Contenuti dalla Faculty',
      subtitle: 'Slot predisposto per il primo caso clinico narrativo ufficiale RADAR XLH con snodi decisionali personalizzati',
      isCalibration: false,
      status: 'pending_case',
      authors: 'Faculty Scientifica RADAR XLH',
      targetSpecialties: ['Tutte le professioni accreditate ECM RADAR XLH'],
      initialQualityPct: 100,
      passThresholdPct: 75,
      plannedStructure: [
        'Vertice (T0): Profilo clinico reale del paziente indice e parametri basali',
        'Snodo 1: Scelta Comunicazionale (Post-it crescenti + narrazione pre-scelta)',
        'Snodo 2: Scelta Investigativa / Esaminazione (con diramazioni Sliding Doors)',
        'Snodo 3: Scelta Gestionale',
        'Snodo 4: Scelta Diagnostica',
        'Snodo 5: Scelta Terapeutica',
        'Snodo 6: Scelta Mantenimento / Follow-up & Debriefing CQ%'
      ]
    }
  };

  const CASE_JSON_TEMPLATE = {
    meta: {
      id: 'caso-01-esempio',
      code: 'CASO-01',
      title: 'Titolo del Caso Clinico',
      subtitle: 'Sottotitolo descrittivo del caso',
      isCalibration: false,
      status: 'active',
      authors: 'Nome Docente / Faculty',
      targetSpecialties: ['PLS', 'MMG', 'Ortopedici', 'Odontoiatri'],
      initialQualityPct: 100,
      passThresholdPct: 75
    },
    apex: {
      code: 'VERTICE · T0',
      badge: 'Caso Clinico Interattivo',
      title: 'Presentazione Iniziale del Paziente',
      patientSummary: 'Sintesi clinica iniziale visibile al vertice della piramide.',
      clinicalParameters: [
        { label: 'Età / Sesso', value: 'Da definire', flag: 'info' },
        { label: 'Segno Principale', value: 'Da definire', flag: 'alert' }
      ],
      narrativeIntro: 'Descrizione narrativa iniziale del paziente al tempo T0.',
      startPrompt: 'Seleziona la prima scelta al Livello 1.'
    },
    levels: [
      { level: 1, domainKey: 'comunicazionale', domainLabel: 'Scelta Comunicazionale', nodesByBranch: { default: { complexityRank: 1, stageMaxValue: 100, preChoiceEvolution: { headline: 'T1', narrative: 'Evoluzione prima della scelta 1', clinicalUpdates: [], decisionPrompt: 'Domanda 1' }, tiles: [] } } },
      { level: 2, domainKey: 'investigativa', domainLabel: 'Scelta Investigativa / Esaminazione', nodesByBranch: { default: { complexityRank: 2, stageMaxValue: 150, preChoiceEvolution: { headline: 'T2', narrative: 'Evoluzione prima della scelta 2', clinicalUpdates: [], decisionPrompt: 'Domanda 2' }, tiles: [] } } },
      { level: 3, domainKey: 'gestionale', domainLabel: 'Scelta Gestionale', nodesByBranch: { default: { complexityRank: 3, stageMaxValue: 200, preChoiceEvolution: { headline: 'T3', narrative: 'Evoluzione prima della scelta 3', clinicalUpdates: [], decisionPrompt: 'Domanda 3' }, tiles: [] } } },
      { level: 4, domainKey: 'diagnostica', domainLabel: 'Scelta Diagnostica', nodesByBranch: { default: { complexityRank: 4, stageMaxValue: 250, preChoiceEvolution: { headline: 'T4', narrative: 'Evoluzione prima della scelta 4', clinicalUpdates: [], decisionPrompt: 'Domanda 4' }, tiles: [] } } },
      { level: 5, domainKey: 'terapeutica', domainLabel: 'Scelta Terapeutica', nodesByBranch: { default: { complexityRank: 5, stageMaxValue: 300, preChoiceEvolution: { headline: 'T5', narrative: 'Evoluzione prima della scelta 5', clinicalUpdates: [], decisionPrompt: 'Domanda 5' }, tiles: [] } } },
      { level: 6, domainKey: 'followup', domainLabel: 'Scelta Mantenimento / Follow-up', nodesByBranch: { default: { complexityRank: 6, stageMaxValue: 350, preChoiceEvolution: { headline: 'T6', narrative: 'Evoluzione prima della scelta 6', clinicalUpdates: [], decisionPrompt: 'Domanda 6' }, tiles: [] } } }
    ]
  };

  return {
    CASES_REGISTRY: [CALIBRATION_CASE, CASE_01_SLOT],
    CASE_JSON_TEMPLATE
  };
});
