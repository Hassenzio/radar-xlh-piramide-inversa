/* ═══════════════════════════════════════════════════════════════════════
   RADAR XLH — Registro Casi Clinici Piramide Inversa
   Contiene il Caso Clinico #01 ufficiale trascritto integralmente da:
   input/RADAR XLH/2.02 Caso Clinico Pregresso XLH.md
   (Paziente: Matteo, 26 anni · 5 Step · 15 Snodi 1->2->3->4->5 · 53 Post-it)
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

  const CASO_202_MATTEO = {
    meta: {
      id: 'caso-202-xlh-pregresso',
      code: 'CASO 01',
      title: 'XLH nell’Adulto con Patologia Pregressa — Matteo, 26 anni',
      subtitle: 'Caso clinico interattivo narrativo a 5 Step (1 → 2 → 3 → 4 → 5 snodi) su continuità assistenziale dell’adulto, team multidisciplinare e mappatura familiare',
      patientBadge: 'Matteo · 26 anni (Adulto)',
      focusTags: ['Transizione Adulto', 'Team Multidisciplinare', 'Chiari I & Scoliosi', 'Ereditarietà X‑Linked'],
      launcherSummary: 'Paziente di 26 anni con diagnosi a 6 mesi (variante PHEX, familiarità materna), scoliosi lombare, ascessi dentali ricorrenti, frattura del coccige e intervento per Chiari tipo I, oggi esposto al rischio di follow-up interrotto.',
      status: 'active',
      isCalibration: false,
      authors: 'Governance Scientifica RADAR XLH · Script Ufficiale 2.02',
      targetSpecialties: [
        'MMG',
        'Endocrinologi',
        'Nefrologi',
        'Ortopedici',
        'Fisiatri',
        'Odontoiatri',
        'Pediatri'
      ],
      initialQualityPct: 100,
      passThresholdPct: 75,
      sourceReference: '2.02 Caso Clinico Pregresso XLH (Matteo, 26 anni)'
    },

    apex: {
      code: 'STEP 0 · APICE DELLA PIRAMIDE',
      badge: 'Caso Clinico Ufficiale · Matteo, 26 anni',
      title: 'Inquadramento Iniziale & Briefing Narrativo d’Ingresso',
      briefingQuotes: [
        '“Sei il medico di riferimento chiamato a riprendere in mano una storia clinica rimasta a metà. Matteo ha 26 anni ed è un ragazzo che da bambino ha affrontato una diagnosi precoce di XLH, una scoliosi lombare, episodi ricorrenti di ascessi dentali, una frattura del coccige e persino l’intervento per una malformazione di Chiari tipo I, ma che ora – entrato nell’età adulta – rischia di perdersi tra visite frammentate, dolore, rigidità e la convinzione che il capitolo difficile appartenga ormai solo al passato.”',
        '“Nel percorso reale di chi vive con XLH, l’uscita dall’età pediatrica o l’interruzione del follow-up espongono a diagnosi o inquadramenti incompleti, passaggi multipli tra specialisti e conseguenze che restano attive per tutta la vita. Ogni scelta che farai su questa piramide non è un semplice clic: muoverà il Coefficiente di Qualità (CQ) a partire dal 100% e deciderà se Matteo troverà finalmente una regia clinica continua o se resterà intrappolato nelle criticità del percorso.”'
      ],
      clinicalParameters: [
        { label: 'Paziente', value: 'Matteo, Maschio, 26 anni', flag: 'info' },
        { label: 'Diagnosi XLH', value: 'A 6 mesi · Variante PHEX', flag: 'core' },
        { label: 'Familiarità', value: 'Materna (X‑Linked)', flag: 'info' },
        { label: 'Storia Pregressa', value: 'Scoliosi · Ascessi · Coccige · Chiari I', flag: 'alert' },
        { label: 'Stato Attuale', value: 'Dolore, rigidità, follow-up interrotto', flag: 'alert' }
      ],
      sections: [
        {
          heading: 'Dati anagrafici, diagnosi e familiarità',
          items: [
            'Paziente maschio, 26 anni (fascia adulta 26–49 anni), in fase di continuità/transizione dall’età pediatrica all’età adulta, con XLH nota e pregressa patologia clinica documentata.',
            'Diagnosi posta a 6 mesi di vita con alterazioni biochimiche caratteristiche, variante del gene PHEX (perdita di funzione con eccesso di FGF23, perdita renale di fosfato e ipofosfatemia cronica) e familiarità materna per rachitismo ipofosfatemico (trasmissione legata al cromosoma X).'
          ]
        },
        {
          heading: 'Anamnesi patologica remota e pregressa',
          items: [
            'Scoliosi lombare a convessità sinistra.',
            'Ascessi dentali ricorrenti (legati a scarsa mineralizzazione della dentina e rischio di infezioni endodontiche/parodontali).',
            'Frattura del coccige a 10 anni.',
            'Malformazione di Chiari tipo I diagnosticata a 10 anni e sottoposta a intervento chirurgico a 11 anni.',
            'Pregresso inquadramento/trattamento in età pediatrica (tra i 6 mesi e i 12 anni), con rischio tipico di interruzione o discontinuità del follow-up/terapia nel passaggio all’età adulta.'
          ]
        },
        {
          heading: 'Stato clinico attuale e fattori gestionali indispensabili',
          items: [
            'Condizione cronica e progressiva che dura tutta la vita, con esiti/manifestazioni pregresse e sintomi attivi nell’adulto (dolore muscoloscheletrico, rigidità, limitazione della mobilità e della funzionalità quotidiana).',
            'Necessità di raccogliere anamnesi aggiornata, esami biochimici/radiologici/genetici appropriati, coordinamento multidisciplinare guidato da uno specialista in malattie metaboliche dell’osso, valutazione delle esigenze individuali e attenzione al family mapping / consulenza genetica.'
          ]
        }
      ]
    },

    steps: [
      /* ══════════════════ STEP 1 — 1 SNODO (2 POST-IT) ══════════════════ */
      {
        stepNumber: 1,
        title: 'Primo Avanzamento',
        preChoiceEvolutionByBranch: {
          default: {
            headline: 'Aggiornamento Narrativo Evolutivo (Prima della Scelta)',
            narrative: 'Matteo (26 anni) entra in ambulatorio camminando con rigidità e riferendo dolore osseo/muscoloscheletrico che gli rende faticosi gli spostamenti quotidiani. Porta con sé il ricordo di una cartella pediatrica complessa – diagnosi a 6 mesi con variante PHEX e familiarità materna, scoliosi lombare, ascessi dentali ricorrenti, frattura del coccige a 10 anni e intervento per Chiari tipo I a 11 anni – ma ammette di aver diradato/interrotto i controlli pensando che, superata la crescita, il problema fosse alle spalle.'
          }
        },
        snodi: [
          {
            snodoId: 's1-1',
            snodoCode: '1.1',
            domainKey: 'comunicazionale',
            domainLabel: 'Scelta Comunicazionale',
            valueWeight: 100,
            tiles: [
              {
                id: 'S1-COM-A',
                headline: 'Validare i sintomi attuali e chiarire che l’XLH prosegue nell’età adulta',
                bodyText: 'Riconoscere dolore, rigidità e fatica nella mobilità quotidiana e spiegare che l’XLH è una malattia progressiva che dura tutta la vita, richiedendo continuità assistenziale anche dopo l’infanzia.',
                isCorrect: true,
                qualityDeltaPct: 0,
                valuePoints: 100,
                nextBranchKey: 'from_s1_a',
                feedbackText: 'Corretto. Comprendere l’impatto dell’XLH nell’età adulta favorisce la consapevolezza della necessità di assistenza continuativa e contrasta l’interruzione del follow-up.',
                evolutionImpact: 'Matteo si sente ascoltato, collega i disturbi attuali alla storia di XLH e accetta di approfondire il quadro.'
              },
              {
                id: 'S1-COM-B',
                headline: 'Minimizzare dicendo che la fase critica era solo pediatrica',
                bodyText: 'Rassicurare che, essendo ormai adulto a 26 anni, i vecchi episodi (scoliosi, denti, Chiari tipo I) non richiedono una presa in carico continuativa per XLH.',
                isCorrect: false,
                qualityDeltaPct: -15,
                valuePoints: 0,
                nextBranchKey: 'from_s1_b',
                feedbackText: 'Errato (-15% CQ). L’XLH dura tutta la vita e gli adulti affrontano sia le conseguenze pregresse sia manifestazioni ancora in corso; l’interruzione dei controlli nell’adulto è un errore critico.',
                evolutionImpact: 'Matteo resta incerto e tende a sottovalutare il legame tra i sintomi attuali e la sua storia clinica.'
              }
            ]
          }
        ]
      },

      /* ══════════════════ STEP 2 — 2 SNODI (3 + 3 = 6 POST-IT) ══════════════════ */
      {
        stepNumber: 2,
        title: 'Secondo Avanzamento',
        preChoiceEvolutionByBranch: {
          default: {
            headline: 'Aggiornamento Narrativo Evolutivo (Prima della Scelta)',
            narrative: 'Matteo precisa la localizzazione del dolore e della rigidità, racconta l’impatto sulle attività quotidiane e ricorda i pregressi ascessi dentali, la scoliosi lombare, la frattura del coccige e l’intervento a 11 anni per malformazione di Chiari tipo I.'
          },
          from_s1_a: {
            headline: 'Evoluzione dopo S1-COM-A · Adesione Consapevole',
            narrative: 'Matteo dettagliatamente precisa la localizzazione del dolore e della rigidità, racconta l’impatto sulle attività quotidiane e ricorda i pregressi ascessi dentali, la scoliosi lombare, la frattura del coccige e l’intervento a 11 anni per malformazione di Chiari tipo I.'
          },
          from_s1_b: {
            headline: 'Evoluzione dopo S1-COM-B · Persistenza Sintomatica nonostante Minimizzazione',
            narrative: 'Matteo appare disorientato per la minimizzazione, ma insiste sul fatto che dolore, rigidità e ridotta mobilità pesano nella vita di tutti i giorni nonostante la storia pediatrica nota.'
          }
        },
        snodi: [
          {
            snodoId: 's2-1',
            snodoCode: '2.1',
            domainKey: 'investigativa',
            domainLabel: 'Scelta Investigativa / Esaminazione',
            valueWeight: 100,
            tiles: [
              {
                id: 'S2-INV-A',
                headline: 'Anamnesi completa (personale, familiare, pregressa) ed esame clinico mirato',
                bodyText: 'Integrare familiarità materna, storia pediatrica (diagnosi a 6 mesi, PHEX, scoliosi, denti, coccige, Chiari tipo I) con esame clinico su dolore, rigidità, mobilità, postura/deformità e sintomi correlati.',
                isCorrect: true,
                qualityDeltaPct: 0,
                valuePoints: 100,
                feedbackText: 'Corretto. L’inquadramento richiede anamnesi personale/familiare ed esame clinico sistematico di segni, sintomi e storia clinica pregressa.'
              },
              {
                id: 'S2-INV-B',
                headline: 'Esaminare solo il distretto doloroso del momento ignorando anamnesi familiare e storia pregressa',
                bodyText: 'Trattare il caso come un episodio isolato.',
                isCorrect: false,
                qualityDeltaPct: -10,
                valuePoints: 0,
                feedbackText: 'Errato (-10% CQ). Ignorare familiarità legata all’X, variante PHEX e pregresse manifestazioni scheletriche/dentali/neurologiche fa perdere elementi chiave del quadro.'
              },
              {
                id: 'S2-INV-C',
                headline: 'Rimandare l’esame clinico e l’aggiornamento anamnestico a un controllo generico futuro',
                bodyText: 'Non approfondire ora.',
                isCorrect: false,
                qualityDeltaPct: -10,
                valuePoints: 0,
                feedbackText: 'Errato (-10% CQ). Ritardare l’inquadramento e il trattamento può determinare esiti clinici peggiori e conseguenze per tutta la vita.'
              }
            ]
          },
          {
            snodoId: 's2-2',
            snodoCode: '2.2',
            domainKey: 'diagnostica',
            domainLabel: 'Scelta Diagnostica',
            valueWeight: 100,
            tiles: [
              {
                id: 'S2-DIA-A',
                headline: 'Valutazione biochimica mirata, verifica genetica/FGF23 e imaging appropriato',
                bodyText: 'Valutare fosfato sierico e perdita renale di fosfato, parametri biochimici associati (ALP/BALP, calcio, PTH, FGF23 se indicato), conferma genetica (PHEX) quando possibile e imaging mirato sulle aree clinicamente rilevanti.',
                isCorrect: true,
                qualityDeltaPct: 0,
                valuePoints: 100,
                feedbackText: 'Corretto. La diagnosi combina caratteristiche cliniche, biochimiche, radiografiche e genetiche, con conferma genetica quando possibile.'
              },
              {
                id: 'S2-DIA-B',
                headline: 'Richiedere solo un controllo generico del calcio senza valutare fosfato o perdita renale',
                bodyText: 'Limitarsi a un parametro parziale.',
                isCorrect: false,
                qualityDeltaPct: -10,
                valuePoints: 0,
                feedbackText: 'Errato (-10% CQ). L’XLH è caratterizzata da perdita renale di fosfato e ipofosfatemia cronica guidata dall’eccesso di FGF23.'
              },
              {
                id: 'S2-DIA-C',
                headline: 'Non richiedere alcun esame diagnostico o strumentale',
                bodyText: 'Affidarsi solo alla visita iniziale.',
                isCorrect: false,
                qualityDeltaPct: -15,
                valuePoints: 0,
                feedbackText: 'Errato (-15% CQ). L’inquadramento richiede una combinazione integrata di dati clinici, biochimici, radiografici e genetici.'
              }
            ]
          }
        ]
      },

      /* ══════════════════ STEP 3 — 3 SNODI (3 + 3 + 3 = 9 POST-IT) ══════════════════ */
      {
        stepNumber: 3,
        title: 'Terzo Avanzamento',
        preChoiceEvolutionByBranch: {
          default: {
            headline: 'Aggiornamento Narrativo Evolutivo (Prima della Scelta)',
            narrative: 'I dati raccolti confermano un adulto di 26 anni con storia nota di XLH (diagnosi a 6 mesi, variante PHEX, familiarità materna) e anamnesi pregressa di scoliosi lombare, ascessi dentali ricorrenti, frattura del coccige a 10 anni e Chiari tipo I operato a 11 anni, ora alle prese con sintomi cronici e la necessità di evitare percorsi frammentati o passaggi dispersivi tra specialisti.'
          }
        },
        snodi: [
          {
            snodoId: 's3-1',
            snodoCode: '3.1',
            domainKey: 'gestionale',
            domainLabel: 'Scelta Gestionale',
            valueWeight: 100,
            tiles: [
              {
                id: 'S3-GES-A',
                headline: 'Attivare un team multidisciplinare coordinato da uno specialista in malattie metaboliche dell’osso',
                bodyText: 'Strutturare la presa in carico adulta con coordinamento centrale e coinvolgimento mirato delle altre aree (es. odontoiatria, reumatologia, terapia del dolore, fisioterapia, psicologia/salute mentale, neurochirurgia/consulenza genetica se indicato).',
                isCorrect: true,
                qualityDeltaPct: 0,
                valuePoints: 100,
                feedbackText: 'Corretto. I pazienti con XLH devono ricevere un’assistenza multidisciplinare organizzata da uno specialista esperto in malattie metaboliche dell’osso, con ulteriori aree attivate in base alle esigenze individuali.'
              },
              {
                id: 'S3-GES-B',
                headline: 'Lasciare il paziente a consultazioni scollegate senza un centro/specialista coordinatore',
                bodyText: 'Replicare un percorso frammentato.',
                isCorrect: false,
                qualityDeltaPct: -10,
                valuePoints: 0,
                feedbackText: 'Errato (-10% CQ). La frammentazione e la mancanza di coordinamento ostacolano una gestione continua ed efficace dell’adulto con XLH.'
              },
              {
                id: 'S3-GES-C',
                headline: 'Chiudere l’inquadramento senza un referente di continuità',
                bodyText: 'Rimandare a future richieste spontanee.',
                isCorrect: false,
                qualityDeltaPct: -15,
                valuePoints: 0,
                feedbackText: 'Errato (-15% CQ). L’XLH è una malattia progressiva che dura tutta la vita e richiede continuità assistenziale.'
              }
            ]
          },
          {
            snodoId: 's3-2',
            snodoCode: '3.2',
            domainKey: 'diagnostica',
            domainLabel: 'Scelta Diagnostica',
            valueWeight: 100,
            tiles: [
              {
                id: 'S3-DIA-A',
                headline: 'Integrare conferma genetica (PHEX) e valutazione biochimico-radiografica mirata',
                bodyText: 'Valorizzare la conferma genetica quando possibile (e in assenza di analisi molecolare, storia familiare legata all’X, FGF23 non soppresso e ipofosfatemia) insieme alla valutazione delle manifestazioni cliniche/radiografiche.',
                isCorrect: true,
                qualityDeltaPct: 0,
                valuePoints: 100,
                feedbackText: 'Corretto. La diagnosi combina dati clinici, biochimici, radiografici e genetici e dovrebbe essere confermata mediante test genetici ogni volta che è possibile.'
              },
              {
                id: 'S3-DIA-B',
                headline: 'Sospendere ogni valutazione se non si dispone subito di un nuovo test genetico',
                bodyText: 'Bloccare l’inquadramento.',
                isCorrect: false,
                qualityDeltaPct: -10,
                valuePoints: 0,
                feedbackText: 'Errato (-10% CQ). Se l’analisi genetica molecolare non è disponibile, la diagnosi è supportata da storia familiare X‑Linked, FGF23 non soppresso e ipofosfatemia.'
              },
              {
                id: 'S3-DIA-C',
                headline: 'Ignorare i dati biochimici e di storia familiare già presenti',
                bodyText: 'Trattare il caso come una generica artrosi da usura.',
                isCorrect: false,
                qualityDeltaPct: -10,
                valuePoints: 0,
                feedbackText: 'Errato (-10% CQ). Il quadro clinico-anamnestico e biochimico depone per XLH e richiede un inquadramento coerente.'
              }
            ]
          },
          {
            snodoId: 's3-3',
            snodoCode: '3.3',
            domainKey: 'comunicazionale',
            domainLabel: 'Scelta Comunicazionale',
            valueWeight: 100,
            tiles: [
              {
                id: 'S3-COM-A',
                headline: 'Collegare in modo chiaro fisiopatologia (loss-of-function PHEX / eccesso di FGF23) e vita adulta',
                bodyText: 'Spiegare come l’alterazione del metabolismo del fosfato e la storia pregressa spieghino i sintomi attuali e la necessità di un percorso strutturato.',
                isCorrect: true,
                qualityDeltaPct: 0,
                valuePoints: 100,
                feedbackText: 'Corretto. Una spiegazione chiara rafforza la comprensione dell’impatto nell’età adulta e l’adesione al percorso.'
              },
              {
                id: 'S3-COM-B',
                headline: 'Fornire indicazioni generiche senza spiegare il perché del percorso',
                bodyText: 'Lasciare il paziente senza chiavi di lettura.',
                isCorrect: false,
                qualityDeltaPct: -5,
                valuePoints: 0,
                feedbackText: 'Errato (-5% CQ). La scarsa consapevolezza del legame tra patologia e gestione nell’adulto favorisce l’abbandono dei controlli.'
              },
              {
                id: 'S3-COM-C',
                headline: 'Affermare che una diagnosi posta a 6 mesi non ha più implicazioni nell’adulto',
                bodyText: 'Negare la cronicità dell’XLH.',
                isCorrect: false,
                qualityDeltaPct: -10,
                valuePoints: 0,
                feedbackText: 'Errato (-10% CQ). L’XLH è una condizione cronica e progressiva per tutta la vita.'
              }
            ]
          }
        ]
      },

      /* ══════════════════ STEP 4 — 4 SNODI (4 x 4 = 16 POST-IT) ══════════════════ */
      {
        stepNumber: 4,
        title: 'Quarto Avanzamento',
        preChoiceEvolutionByBranch: {
          default: {
            headline: 'Aggiornamento Narrativo Evolutivo (Prima della Scelta)',
            narrative: 'Matteo (26 anni) ha un quadro ben delineato sul piano anamnestico e clinico, ma riferisce ancora dolore, rigidità, ridotta mobilità e timori legati alla gestione quotidiana della malattia nell’età adulta, avendo sperimentato in passato un percorso complesso (scoliosi, ascessi dentali ricorrenti, frattura del coccige, intervento per Chiari tipo I) e l’interruzione dei controlli dopo l’infanzia.'
          }
        },
        snodi: [
          {
            snodoId: 's4-1',
            snodoCode: '4.1',
            domainKey: 'gestionale',
            domainLabel: 'Scelta Gestionale',
            valueWeight: 100,
            tiles: [
              {
                id: 'S4-GES-A',
                headline: 'Coordinare il team multidisciplinare sulle esigenze individuali di Matteo',
                bodyText: 'Attivare sotto regia dello specialista in malattie metaboliche dell’osso le aree rilevanti (es. odontoiatria per la storia di ascessi ricorrenti, fisioterapia/terapia del dolore per rigidità e mobilità, supporto psicologico/salute mentale e consulenze mirate).',
                isCorrect: true,
                qualityDeltaPct: 0,
                valuePoints: 100,
                feedbackText: 'Corretto. L’assistenza multidisciplinare coordinata dallo specialista in malattie metaboliche dell’osso include ulteriori aree in base alle esigenze individuali dell’adulto.'
              },
              {
                id: 'S4-GES-B',
                headline: 'Trascurare l’area odontoiatrica nonostante l’anamnesi di ascessi dentali ricorrenti',
                bodyText: 'Non attivare il dentista.',
                isCorrect: false,
                qualityDeltaPct: -10,
                valuePoints: 0,
                feedbackText: 'Errato (-10% CQ). Le complicanze dentali/ascessi sono tipiche dell’XLH e l’odontoiatria è parte del percorso multidisciplinare.'
              },
              {
                id: 'S4-GES-C',
                headline: 'Escludere fisioterapia e supporto psicologico/salute mentale',
                bodyText: 'Ignorare mobilità e vissuto del paziente.',
                isCorrect: false,
                qualityDeltaPct: -10,
                valuePoints: 0,
                feedbackText: 'Errato (-10% CQ). Le fonti includono fisioterapia e supporto per la salute mentale/psicologia tra le aree potenzialmente coinvolte nella cura dell’adulto.'
              },
              {
                id: 'S4-GES-D',
                headline: 'Non fissare un referente o un piano continuativo',
                bodyText: 'Lasciare la gestione al caso.',
                isCorrect: false,
                qualityDeltaPct: -15,
                valuePoints: 0,
                feedbackText: 'Errato (-15% CQ). La continuità assistenziale è fondamentale per evitare ricadute e interruzioni del percorso.'
              }
            ]
          },
          {
            snodoId: 's4-2',
            snodoCode: '4.2',
            domainKey: 'diagnostica',
            domainLabel: 'Scelta Diagnostica',
            valueWeight: 100,
            tiles: [
              {
                id: 'S4-DIA-A',
                headline: 'Eseguire rivalutazione clinica, biochimica, dentale e imaging mirato alle manifestazioni presenti',
                bodyText: 'Verificare parametri biochimici, stato dentale e studi strumentali mirati in base alla clinica e all’anamnesi (inclusa storia di scoliosi, frattura coccigea e Chiari tipo I).',
                isCorrect: true,
                qualityDeltaPct: 0,
                valuePoints: 100,
                feedbackText: 'Corretto. Il monitoraggio e l’inquadramento devono essere personalizzati sulle caratteristiche cliniche, biochimiche, radiologiche e anamnestiche del paziente.'
              },
              {
                id: 'S4-DIA-B',
                headline: 'Omettere qualsiasi controllo biochimico, dentale o strumentale',
                bodyText: 'Non verificare lo stato attuale.',
                isCorrect: false,
                qualityDeltaPct: -10,
                valuePoints: 0,
                feedbackText: 'Errato (-10% CQ). Il monitoraggio clinico, biochimico, funzionale e dentale è essenziale per seguire l’evoluzione della malattia.'
              },
              {
                id: 'S4-DIA-C',
                headline: 'Presumere che l’anamnesi pregressa escluda nuove manifestazioni o complicanze',
                bodyText: 'Non controllare i sintomi attuali.',
                isCorrect: false,
                qualityDeltaPct: -10,
                valuePoints: 0,
                feedbackText: 'Errato (-10% CQ). Nell’adulto con XLH possono persistere o comparire manifestazioni e complicanze che richiedono valutazione mirata.'
              },
              {
                id: 'S4-DIA-D',
                headline: 'Applicare un protocollo identico per tutti senza adattarlo al profilo individuale',
                bodyText: 'Ignorare la variabilità clinica.',
                isCorrect: false,
                qualityDeltaPct: -5,
                valuePoints: 0,
                feedbackText: 'Errato (-5% CQ). Le manifestazioni cliniche, radiologiche e biochimiche variano tra individui e richiedono personalizzazione.'
              }
            ]
          },
          {
            snodoId: 's4-3',
            snodoCode: '4.3',
            domainKey: 'terapeutica',
            domainLabel: 'Scelta Terapeutica',
            valueWeight: 100,
            tiles: [
              {
                id: 'S4-TER-A',
                headline: 'Personalizzare il trattamento sull’adulto in base a bisogni individuali, storia clinica e valutazione specialistica',
                bodyText: 'Definire la strategia terapeutica insieme al paziente, tenendo conto del profilo clinico, della storia di pregressa interruzione e della disponibilità/modalità di somministrazione e monitoraggio.',
                isCorrect: true,
                qualityDeltaPct: 0,
                valuePoints: 100,
                feedbackText: 'Corretto. Trattamento e monitoraggio vanno personalizzati in base alle manifestazioni cliniche, alla storia clinica, al giudizio specialistico e ai bisogni individuali.'
              },
              {
                id: 'S4-TER-B',
                headline: 'Ritenere che nell’adulto non serva alcuna terapia perché la crescita è finita',
                bodyText: 'Escludere a priori il trattamento dell’adulto.',
                isCorrect: false,
                qualityDeltaPct: -15,
                valuePoints: 0,
                feedbackText: 'Errato (-15% CQ). L’XLH è una malattia progressiva che dura tutta la vita; la scarsa consapevolezza del trattamento nell’adulto è una delle cause di mancata o interrotta cura.'
              },
              {
                id: 'S4-TER-C',
                headline: 'Impostare una terapia senza prevedere monitoraggio di efficacia, sicurezza e potenziali eventi avversi',
                bodyText: 'Trascurare la sorveglianza.',
                isCorrect: false,
                qualityDeltaPct: -10,
                valuePoints: 0,
                feedbackText: 'Errato (-10% CQ). Nel paziente adulto progressione di malattia, sintomi irrisolti e potenziali eventi avversi richiedono un monitoraggio regolare.'
              },
              {
                id: 'S4-TER-D',
                headline: 'Ignorare i bisogni e le difficoltà pratiche del paziente nella gestione quotidiana della terapia',
                bodyText: 'Non considerare l’impatto pratico.',
                isCorrect: false,
                qualityDeltaPct: -10,
                valuePoints: 0,
                feedbackText: 'Errato (-10% CQ). Considerare i bisogni individuali e le modalità di gestione/somministrazione aiuta a ridurre gli ostacoli nella vita quotidiana.'
              }
            ]
          },
          {
            snodoId: 's4-4',
            snodoCode: '4.4',
            domainKey: 'comunicazionale',
            domainLabel: 'Scelta Comunicazionale',
            valueWeight: 100,
            tiles: [
              {
                id: 'S4-COM-A',
                headline: 'Costruire un’alleanza terapeutica basata su chiarezza e obiettivi realistici',
                bodyText: 'Illustrare come la gestione mirata e la continuità delle cure aiutino ad affrontare dolore, rigidità, mobilità e prevenzione delle complicanze.',
                isCorrect: true,
                qualityDeltaPct: 0,
                valuePoints: 100,
                feedbackText: 'Corretto. Una comunicazione chiara e condivisa favorisce la comprensione del percorso e la continuità assistenziale.'
              },
              {
                id: 'S4-COM-B',
                headline: 'Promettere la cancellazione immediata di tutti gli esiti strutturali pregressi',
                bodyText: 'Creare aspettative irrealistiche.',
                isCorrect: false,
                qualityDeltaPct: -10,
                valuePoints: 0,
                feedbackText: 'Errato (-10% CQ). Alcune manifestazioni o conseguenze strutturali richiedono un inquadramento realistico della progressione e del controllo sintomatologico.'
              },
              {
                id: 'S4-COM-C',
                headline: 'Giudicare o colpevolizzare Matteo per aver interrotto i controlli dopo l’infanzia',
                bodyText: 'Adottare un approccio punitivo.',
                isCorrect: false,
                qualityDeltaPct: -10,
                valuePoints: 0,
                feedbackText: 'Errato (-10% CQ). L’interruzione dei controlli nell’adulto è spesso legata alla scarsa consapevolezza della necessità di cura continua nell’età adulta.'
              },
              {
                id: 'S4-COM-D',
                headline: 'Imporre decisioni senza coinvolgere il paziente',
                bodyText: 'Non spiegare le motivazioni delle scelte.',
                isCorrect: false,
                qualityDeltaPct: -5,
                valuePoints: 0,
                feedbackText: 'Errato (-5% CQ). Coinvolgere il paziente migliora la consapevolezza e l’aderenza al percorso.'
              }
            ]
          }
        ]
      },

      /* ══════════════════ STEP 5 — 5 SNODI (5 x 4 = 20 POST-IT) ══════════════════ */
      {
        stepNumber: 5,
        title: 'Quinto Avanzamento',
        preChoiceEvolutionByBranch: {
          default: {
            headline: 'Aggiornamento Narrativo Evolutivo (Prima della Scelta)',
            narrative: 'Matteo (26 anni) ha completato l’inquadramento iniziale e ha avviato un percorso strutturato. Ora il focus si sposta sul mantenimento nel tempo: come monitorare regolarmente sintomi, funzionalità, stato dentale ed eventuali esami strumentali, come mantenere viva la rete multidisciplinare e come gestire gli aspetti familiari e riproduttivi legati alla trasmissione X‑Linked della sua storia.'
          }
        },
        snodi: [
          {
            snodoId: 's5-1',
            snodoCode: '5.1',
            domainKey: 'followup',
            domainLabel: 'Scelta Mantenimento / Follow-up',
            valueWeight: 100,
            tiles: [
              {
                id: 'S5-FOL-A',
                headline: 'Definire un piano di follow-up e monitoraggio regolare e strutturato',
                bodyText: 'Programmare controlli clinici periodici, valutazione funzionale (test del cammino dei 6 minuti) e qualità di vita (BPI e WOMAC), monitoraggio dentale (rischio parodontale e ortopantomografia) e imaging mirato secondo indicazione.',
                isCorrect: true,
                qualityDeltaPct: 0,
                valuePoints: 100,
                feedbackText: 'Corretto. Nell’adulto la progressione della patologia, le complicanze correlate a sintomi irrisolti e i potenziali eventi avversi richiedono follow-up e monitoraggio regolari e frequenti.'
              },
              {
                id: 'S5-FOL-B',
                headline: 'Non programmare alcun calendario di follow-up, rimandando solo a eventuali emergenze',
                bodyText: 'Abbandonare il monitoraggio periodico.',
                isCorrect: false,
                qualityDeltaPct: -15,
                valuePoints: 0,
                feedbackText: 'Errato (-15% CQ). Il piano di follow-up per l’adulto con XLH prevede controlli e monitoraggio periodici e strutturati.'
              },
              {
                id: 'S5-FOL-C',
                headline: 'Omettere il monitoraggio dentale e funzionale/qualità di vita',
                bodyText: 'Trascurare aspetti chiave del follow-up adulto.',
                isCorrect: false,
                qualityDeltaPct: -10,
                valuePoints: 0,
                feedbackText: 'Errato (-10% CQ). Il follow-up dell’adulto include valutazione dentale (rischio parodontale, ortopantomografia), test del cammino dei 6 minuti e scale BPI/WOMAC.'
              },
              {
                id: 'S5-FOL-D',
                headline: 'Ripetere indistintamente esami di imaging avanzato senza indicazioni cliniche',
                bodyText: 'Non seguire i criteri del piano.',
                isCorrect: false,
                qualityDeltaPct: -10,
                valuePoints: 0,
                feedbackText: 'Errato (-10% CQ). Gli esami di imaging (come RMI del cranio, ecocardiogramma, ecografia renale) hanno indicazioni mirate nel piano di follow-up.'
              }
            ]
          },
          {
            snodoId: 's5-2',
            snodoCode: '5.2',
            domainKey: 'gestionale',
            domainLabel: 'Scelta Gestionale',
            valueWeight: 100,
            tiles: [
              {
                id: 'S5-GES-A',
                headline: 'Mantenere la regia dello specialista in malattie metaboliche dell’osso con revisioni multidisciplinari periodiche',
                bodyText: 'Garantire il raccordo continuo tra centro di riferimento e specialisti coinvolti in base all’evoluzione individuale.',
                isCorrect: true,
                qualityDeltaPct: 0,
                valuePoints: 100,
                feedbackText: 'Corretto. I pazienti con XLH devono essere rivisti regolarmente da un team multidisciplinare coordinato da un esperto in malattie metaboliche dell’osso.'
              },
              {
                id: 'S5-GES-B',
                headline: 'Scollegare il paziente dal centro di riferimento dopo il primo inquadramento',
                bodyText: 'Interrompere il coordinamento.',
                isCorrect: false,
                qualityDeltaPct: -10,
                valuePoints: 0,
                feedbackText: 'Errato (-10% CQ). La continuità coordinata previene frammentazione assistenziale e perdita al follow-up.'
              },
              {
                id: 'S5-GES-C',
                headline: 'Considerare concluso il percorso di cura',
                bodyText: 'Ritenere non più necessaria la gestione specialistica.',
                isCorrect: false,
                qualityDeltaPct: -15,
                valuePoints: 0,
                feedbackText: 'Errato (-15% CQ). L’XLH è una condizione che dura tutta la vita e richiede assistenza continuativa.'
              },
              {
                id: 'S5-GES-D',
                headline: 'Non aggiornare il team al variare dei bisogni di Matteo',
                bodyText: 'Mantenere una gestione statica.',
                isCorrect: false,
                qualityDeltaPct: -5,
                valuePoints: 0,
                feedbackText: 'Errato (-5% CQ). Le aree coinvolte nella cura dell’adulto si adattano alle esigenze individuali nel tempo.'
              }
            ]
          },
          {
            snodoId: 's5-3',
            snodoCode: '5.3',
            domainKey: 'investigativa',
            domainLabel: 'Scelta Investigativa / Esaminazione',
            valueWeight: 100,
            tiles: [
              {
                id: 'S5-INV-A',
                headline: 'Raccogliere periodicamente la storia clinica di tutti i domini rilevanti',
                bodyText: 'Indagare a ogni controllo cefalea, manifestazioni orali, fatigue, pseudofratture, dolore muscoloscheletrico, udito, neurologia e funzionalità motoria.',
                isCorrect: true,
                qualityDeltaPct: 0,
                valuePoints: 100,
                feedbackText: 'Corretto. L’esame clinico nel follow-up dell’adulto include la raccolta periodica della storia clinica di questi sintomi e la valutazione funzionale/uditiva/neurologica.'
              },
              {
                id: 'S5-INV-B',
                headline: 'Chiedere solo se il dolore è presente al momento della visita',
                bodyText: 'Non esplorare fatigue, sintomi orali, uditivi o neurologici.',
                isCorrect: false,
                qualityDeltaPct: -10,
                valuePoints: 0,
                feedbackText: 'Errato (-10% CQ). Il monitoraggio clinico richiede un’indagine sistematica su più sintomi e domini funzionali.'
              },
              {
                id: 'S5-INV-C',
                headline: 'Ignorare i cambiamenti nella funzionalità quotidiana e nella mobilità',
                bodyText: 'Non valutare l’impatto pratico.',
                isCorrect: false,
                qualityDeltaPct: -10,
                valuePoints: 0,
                feedbackText: 'Errato (-10% CQ). Dolore, rigidità e limitazioni funzionali influenzano la qualità di vita e vanno monitorati nel tempo.'
              },
              {
                id: 'S5-INV-D',
                headline: 'Non annotare i sintomi riferiti dal paziente tra una visita e l’altra',
                bodyText: 'Sottovalutare l’anamnesi di aggiornamento.',
                isCorrect: false,
                qualityDeltaPct: -5,
                valuePoints: 0,
                feedbackText: 'Errato (-5% CQ). La raccolta della storia clinica dei sintomi è parte centrale del piano di follow-up.'
              }
            ]
          },
          {
            snodoId: 's5-4',
            snodoCode: '5.4',
            domainKey: 'diagnostica',
            domainLabel: 'Scelta Diagnostica',
            valueWeight: 100,
            tiles: [
              {
                id: 'S5-DIA-A',
                headline: 'Eseguire esami di monitoraggio e imaging mirato secondo le indicazioni cliniche',
                bodyText: 'Valutare parametri biochimici/esami speciali e attivare l’imaging appropriato (es. RMI del cranio se indicato da segni/sintomi neurologici o cefalea ricorrente/declino cognitivo/craniosinostosi, ecocardiogramma se ipertensione, ecografia renale se nefrocalcitosi/ipercalciuria).',
                isCorrect: true,
                qualityDeltaPct: 0,
                valuePoints: 100,
                feedbackText: 'Corretto. Il piano di follow-up definisce esami speciali e imaging mirato in base alle condizioni cliniche del paziente.'
              },
              {
                id: 'S5-DIA-B',
                headline: 'Non eseguire alcun controllo biochimico o strumentale di monitoraggio',
                bodyText: 'Rinunciare a verifiche oggettive.',
                isCorrect: false,
                qualityDeltaPct: -10,
                valuePoints: 0,
                feedbackText: 'Errato (-10% CQ). Il monitoraggio periodico permette di seguire l’andamento clinico e intercettare complicanze o eventi avversi.'
              },
              {
                id: 'S5-DIA-C',
                headline: 'Prescrivere ecografia renale o ecocardiogramma senza legarli alle rispettive indicazioni del piano',
                bodyText: 'Eseguire esami non mirati.',
                isCorrect: false,
                qualityDeltaPct: -5,
                valuePoints: 0,
                feedbackText: 'Errato (-5% CQ). Nel piano di follow-up l’ecocardiogramma è indicato in caso di ipertensione e l’ecografia renale in caso di nefrocalcitosi/ipercalciuria.'
              },
              {
                id: 'S5-DIA-D',
                headline: 'Leggere un singolo esame isolato senza integrarlo con clinica e anamnesi',
                bodyText: 'Trarre conclusioni parziali.',
                isCorrect: false,
                qualityDeltaPct: -5,
                valuePoints: 0,
                feedbackText: 'Errato (-5% CQ). La valutazione richiede sempre una lettura integrata di clinica, laboratorio, genetica ed eventuali indagini strumentali.'
              }
            ]
          },
          {
            snodoId: 's5-5',
            snodoCode: '5.5',
            domainKey: 'comunicazionale',
            domainLabel: 'Scelta Comunicazionale',
            valueWeight: 100,
            tiles: [
              {
                id: 'S5-COM-A',
                headline: 'Attivare family mapping, consulenza genetica e family planning con corretta informazione sull’ereditarietà X‑Linked',
                bodyText: 'Raccomandare lo screening dei familiari a rischio (chiarendo che per un paziente maschio figli maschi e padre non sono a rischio) e offrire consulenza genetica per chi pianifica una gravidanza.',
                isCorrect: true,
                qualityDeltaPct: 0,
                valuePoints: 100,
                feedbackText: 'Corretto. Lo screening familiare (family mapping) favorisce diagnosi precoce, avvio tempestivo della terapia e family planning accurato, con consulenza genetica per le famiglie che pianificano una gravidanza.'
              },
              {
                id: 'S5-COM-B',
                headline: 'Dire che anche i figli maschi o il padre di Matteo (maschio) sono a rischio di trasmissione X‑Linked',
                bodyText: 'Fornire un dato genetico errato.',
                isCorrect: false,
                qualityDeltaPct: -10,
                valuePoints: 0,
                feedbackText: 'Errato (-10% CQ). Nell’ereditarietà legata all’X, i figli maschi e il padre di un soggetto maschio affetto da XLH non sono a rischio, mentre i familiari a rischio vanno sottoposti a screening.'
              },
              {
                id: 'S5-COM-C',
                headline: 'Non affrontare il tema della mappatura familiare né della consulenza genetica',
                bodyText: 'Ignorare l’impatto familiare e riproduttivo.',
                isCorrect: false,
                qualityDeltaPct: -10,
                valuePoints: 0,
                feedbackText: 'Errato (-10% CQ). Le raccomandazioni sottolineano l’importanza del family mapping e dell’offerta di consulenza genetica, soprattutto per chi pianifica una gravidanza.'
              },
              {
                id: 'S5-COM-D',
                headline: 'Sostenere che identificare precocemente i familiari a rischio non porta benefici',
                bodyText: 'Sottovalutare la diagnosi tempestiva.',
                isCorrect: false,
                qualityDeltaPct: -10,
                valuePoints: 0,
                feedbackText: 'Errato (-10% CQ). La storia familiare e lo screening consentono diagnosi precoci ed evitano ritardi diagnostici e terapeutici.'
              }
            ]
          }
        ]
      }
    ]
  };

  const CASO_202_ELENA = {
    meta: {
      id: 'caso-202-elena-adolescente',
      code: 'CASO 02',
      title: 'XLH in Adolescenza con Patologia Pregressa — Elena, 15 anni',
      subtitle: 'Caso clinico interattivo narrativo a 5 Step (1 → 2 → 3 → 4 → 5 snodi) su carico psicologico adolescenziale, continuità terapeutica, gestione multidisciplinare e family mapping',
      patientBadge: 'Elena · 15 anni (Adolescente)',
      focusTags: ['Carico Psicologico', 'Continuità Terapeutica', 'Deformità & Crescita', 'Ereditarietà X‑Linked'],
      launcherSummary: 'Ragazza di 15 anni con diagnosi infantile di XLH (mutazione PHEX), deformità degli arti inferiori, bassa statura e pregresso ascesso dentale, alle prese con dolore, rigidità e un crescente carico psicologico in adolescenza.',
      status: 'active',
      isCalibration: false,
      authors: 'Governance Scientifica RADAR XLH · Script Ufficiale 2.02',
      targetSpecialties: [
        'Pediatri',
        'PLS',
        'Endocrinologi',
        'Ortopedici',
        'Fisiatri',
        'Odontoiatri',
        'Psicologi'
      ],
      initialQualityPct: 100,
      passThresholdPct: 75,
      sourceReference: '2.02 secondo caso pregresso (Elena, 15 anni)'
    },

    apex: {
      code: 'STEP 0 · APICE DELLA PIRAMIDE',
      badge: 'Caso Clinico Ufficiale · Elena, 15 anni',
      title: 'Inquadramento Iniziale & Briefing Narrativo d’Ingresso',
      briefingQuotes: [
        '“Sei il medico chiamato a seguire Elena, 15 anni, un’adolescente che conosce il peso della malattia fin da bambina. La sua storia clinica non inizia oggi: ha ricevuto diagnosi di XLH durante l’infanzia, ha affrontato deformità degli arti inferiori, bassa statura e un episodio di ascesso dentale, ma nell’adolescenza il vissuto cambia volto – il carico psicologico si fa più pesante, la voglia di somigliare ai coetanei entra in tensione con sintomi come dolore, rigidità e ridotta mobilità, e il rischio di rallentare o interrompere il percorso è dietro l’angolo.”',
        '“Le evidenze raccolte nel notebook mostrano che durante l’adolescenza aumenta il carico psicologico dell’XLH e che un trattamento continuo e ininterrotto è necessario per sostenere i benefici clinici e biologici e prevenire la progressione delle complicanze. Partendo da un Coefficiente di Qualità (CQ) del 100%, ogni scelta che farai lungo questa piramide discendente determinerà la qualità della presa in carico di Elena e l’andamento del suo percorso.”'
      ],
      clinicalParameters: [
        { label: 'Paziente', value: 'Elena, Femmina, 15 anni', flag: 'info' },
        { label: 'Diagnosi XLH', value: 'Infantile · Mutazione PHEX', flag: 'core' },
        { label: 'Ereditarietà', value: 'X‑Linked Dominante', flag: 'info' },
        { label: 'Storia Pregressa', value: 'Deformità arti inf. · Bassa statura · Ascesso dentale', flag: 'alert' },
        { label: 'Stato Attuale', value: 'Dolore, rigidità, carico psicologico adolescenziale', flag: 'alert' }
      ],
      sections: [
        {
          heading: 'Dati anagrafici, diagnosi e fisiopatologia',
          items: [
            'Paziente femmina, 15 anni (adolescente), in una fase evolutiva in cui l’impatto psicologico della malattia aumenta accanto alle sfide legate a crescita, scheletro, mobilità e continuità delle cure.',
            'Ipofosfatemia X‑Linked (XLH) nota dall’infanzia, legata a mutazioni con perdita di funzionalità del gene PHEX (cromosoma X), con eccesso di FGF23, perdita renale di fosfato, ipofosfatemia e ridotta idrossilazione della vitamina D nel rene.'
          ]
        },
        {
          heading: 'Anamnesi patologica pregressa e familiarità',
          items: [
            'Esordio in età infantile con deformità degli arti inferiori e bassa statura/crescita compromessa, associati a pregresso ascesso dentale riconducibile a difetti di mineralizzazione (dentina/smalto) e a una storia di trattamento/follow-up pediatrico da mantenere in continuità nell’adolescenza.',
            'Malattia genetica a trasmissione X‑Linked dominante (con possibilità di familiarità materna o paterna o mutazioni sporadiche), in cui tutti i familiari a rischio devono essere considerati per lo screening (family mapping) e per eventuale consulenza genetica in prospettiva futura.'
          ]
        },
        {
          heading: 'Stato clinico attuale e fattori gestionali indispensabili',
          items: [
            'Riferisce dolore muscoloscheletrico, rigidità e fatica/limitazione della funzionalità fisica nelle attività quotidiane e scolastiche/sportive, accompagnate da un crescente carico psicologico e relazionale tipico dell’adolescenza.',
            'Coordinamento multidisciplinare guidato da specialista esperto, valutazione clinica/biochimica/dentale/funzionale/qualità di vita, continuità terapeutica e monitoraggio regolare, comunicazione empatica attenta al benessere mentale e all’aderenza dell’adolescente.'
          ]
        }
      ]
    },

    steps: [
      /* ══════════════════ STEP 1 — 1 SNODO (2 POST-IT) ══════════════════ */
      {
        stepNumber: 1,
        title: 'Primo Avanzamento',
        preChoiceEvolutionByBranch: {
          default: {
            headline: 'Aggiornamento Narrativo Evolutivo (Prima della Scelta)',
            narrative: 'Elena (15 anni) si siede in ambulatorio tenendo le spalle leggermente curvate e riferisce che, oltre a dolore osseo/muscoloscheletrico e rigidità quando cammina o sta in piedi a lungo, si sente stanca e spesso a disagio rispetto alle compagne di scuola. Ricorda la diagnosi infantile, le gambe segnate dalle deformità, la bassa statura e un vecchio ascesso dentale, e lascia intendere che a volte vorrebbe “staccare” da visite e terapie per sentirsi come tutte le altre.'
          }
        },
        snodi: [
          {
            snodoId: 'e-s1-1',
            snodoCode: '1.1',
            domainKey: 'comunicazionale',
            domainLabel: 'Scelta Comunicazionale',
            valueWeight: 100,
            tiles: [
              {
                id: 'S1-COM-A',
                headline: 'Accogliere il carico psicologico dell’adolescenza e spiegare l’importanza della continuità',
                bodyText: 'Validare fatica, dolore, rigidità e vissuto emotivo legato alla malattia, spiegando che l’XLH prosegue oltre l’infanzia e che seguire il percorso aiuta a proteggere funzionalità e benessere.',
                isCorrect: true,
                qualityDeltaPct: 0,
                valuePoints: 100,
                nextBranchKey: 'from_s1_a',
                feedbackText: 'Corretto. Durante l’adolescenza aumenta il carico psicologico dell’XLH e mobilità limitata, dolore cronico e fatica incidono sul benessere mentale; una comunicazione attenta favorisce continuità e aderenza.',
                evolutionImpact: 'Elena abbassa le difese, racconta con maggiore sincerità dolore, rigidità e stanchezza e accetta i controlli.'
              },
              {
                id: 'S1-COM-B',
                headline: 'Sminuire l’impatto emotivo e dire che a 15 anni basta “stringere i denti”',
                bodyText: 'Liquidare il disagio psicologico e l’affaticamento come normali capricci adolescenziali.',
                isCorrect: false,
                qualityDeltaPct: -15,
                valuePoints: 0,
                nextBranchKey: 'from_s1_b',
                feedbackText: 'Errato (-15% CQ). L’adolescenza comporta un aumento del carico psicologico dell’XLH e i sintomi cronici impattano su funzionalità e benessere mentale; minimizzare ostacola la presa in carico.',
                evolutionImpact: 'Elena si chiude e risponde in modo evasivo alle domande su sintomi e abitudini.'
              }
            ]
          }
        ]
      },

      /* ══════════════════ STEP 2 — 2 SNODI (3 + 3 = 6 POST-IT) ══════════════════ */
      {
        stepNumber: 2,
        title: 'Secondo Avanzamento',
        preChoiceEvolutionByBranch: {
          default: {
            headline: 'Aggiornamento Narrativo Evolutivo (Prima della Scelta)',
            narrative: 'Elena descrive dolore muscoloscheletrico e rigidità che riducono la funzionalità fisica nella vita quotidiana, ricorda la storia infantile di deformità degli arti inferiori, bassa statura e pregresso ascesso dentale.'
          },
          from_s1_a: {
            headline: 'Evoluzione dopo S1-COM-A · Apertura e Collaborazione Clinica',
            narrative: 'Elena descrive con chiarezza dolore muscoloscheletrico e rigidità che riducono la funzionalità fisica nella vita quotidiana, ricorda la storia infantile di deformità degli arti inferiori, bassa statura e pregresso ascesso dentale e accetta di essere visitata.'
          },
          from_s1_b: {
            headline: 'Evoluzione dopo S1-COM-B · Chiusura Emotiva nonostante i Sintomi',
            narrative: 'Elena resta trattenuta, ma ribadisce che il dolore, la rigidità e la fatica limitano ciò che riesce a fare durante la giornata nonostante la storia clinica già nota.'
          }
        },
        snodi: [
          {
            snodoId: 'e-s2-1',
            snodoCode: '2.1',
            domainKey: 'investigativa',
            domainLabel: 'Scelta Investigativa / Esaminazione',
            valueWeight: 100,
            tiles: [
              {
                id: 'S2-INV-A',
                headline: 'Anamnesi completa (personale, familiare, pregressa) ed esame clinico mirato',
                bodyText: 'Raccogliere anamnesi familiare ed evolutiva (diagnosi infantile, PHEX, deformità arti inferiori, bassa statura, pregresso ascesso dentale) ed eseguire esame clinico su dolore, rigidità, mobilità, postura/scheletro e sintomi associati.',
                isCorrect: true,
                qualityDeltaPct: 0,
                valuePoints: 100,
                feedbackText: 'Corretto. L’inquadramento integra anamnesi personale e familiare con esame clinico mirato a segni, sintomi, storia pregressa e funzionalità.'
              },
              {
                id: 'S2-INV-B',
                headline: 'Limitarsi a chiedere se ha mal di denti oggi senza anamnesi familiare né valutazione scheletrica/funzionale',
                bodyText: 'Ridurre la visita a un singolo sintomo pregresso.',
                isCorrect: false,
                qualityDeltaPct: -10,
                valuePoints: 0,
                feedbackText: 'Errato (-10% CQ). L’XLH è una patologia multisistemica con manifestazioni scheletriche, dentali, muscoloscheletriche e familiari che vanno valutate nel loro insieme.'
              },
              {
                id: 'S2-INV-C',
                headline: 'Rinviare anamnesi ed esame clinico a un controllo generico tra un anno',
                bodyText: 'Non indagare ora il quadro clinico.',
                isCorrect: false,
                qualityDeltaPct: -10,
                valuePoints: 0,
                feedbackText: 'Errato (-10% CQ). Il ritardo nella valutazione e nella gestione può determinare esiti clinici peggiori e conseguenze a lungo termine.'
              }
            ]
          },
          {
            snodoId: 'e-s2-2',
            snodoCode: '2.2',
            domainKey: 'diagnostica',
            domainLabel: 'Scelta Diagnostica',
            valueWeight: 100,
            tiles: [
              {
                id: 'S2-DIA-A',
                headline: 'Valutazione biochimica mirata, verifica genetica/FGF23 e imaging appropriato',
                bodyText: 'Valutare fosfato sierico e perdita renale di fosfato, parametri biochimici correlati (ALP/BALP, calcio, PTH, FGF23 se indicato), conferma genetica (PHEX) quando possibile e imaging mirato in base a segni/sintomi.',
                isCorrect: true,
                qualityDeltaPct: 0,
                valuePoints: 100,
                feedbackText: 'Corretto. La diagnosi combina caratteristiche cliniche, biochimiche, radiografiche e genetiche, con conferma genetica quando possibile.'
              },
              {
                id: 'S2-DIA-B',
                headline: 'Dosare solo il calcio sierico escludendo fosfato e perdita renale di fosfato',
                bodyText: 'Ritenere sufficiente il calcio.',
                isCorrect: false,
                qualityDeltaPct: -10,
                valuePoints: 0,
                feedbackText: 'Errato (-10% CQ). L’XLH è caratterizzata da ipofosfatemia dovuta a perdita renale di fosfato ed eccesso di FGF23.'
              },
              {
                id: 'S2-DIA-C',
                headline: 'Non richiedere alcun esame ematochimico né strumentale',
                bodyText: 'Basarsi solo sull’impressione iniziale.',
                isCorrect: false,
                qualityDeltaPct: -15,
                valuePoints: 0,
                feedbackText: 'Errato (-15% CQ). L’inquadramento richiede una combinazione integrata di dati clinici, biochimici, radiografici e genetici.'
              }
            ]
          }
        ]
      },

      /* ══════════════════ STEP 3 — 3 SNODI (3 + 3 + 3 = 9 POST-IT) ══════════════════ */
      {
        stepNumber: 3,
        title: 'Terzo Avanzamento',
        preChoiceEvolutionByBranch: {
          default: {
            headline: 'Aggiornamento Narrativo Evolutivo (Prima della Scelta)',
            narrative: 'Gli elementi raccolti confermano il quadro di XLH (mutazione con perdita di funzione di PHEX, eccesso di FGF23 e perdita renale di fosfato) in una ragazza di 15 anni con pregresse deformità degli arti inferiori, bassa statura e pregresso ascesso dentale, ora alle prese con dolore, rigidità, limitazioni funzionali e un sensibile carico psicologico.'
          }
        },
        snodi: [
          {
            snodoId: 'e-s3-1',
            snodoCode: '3.1',
            domainKey: 'gestionale',
            domainLabel: 'Scelta Gestionale',
            valueWeight: 100,
            tiles: [
              {
                id: 'S3-GES-A',
                headline: 'Attivare un team multidisciplinare coordinato da uno specialista in malattie metaboliche dell’osso',
                bodyText: 'Includere, in base alle esigenze individuali di Elena, figure come odontoiatria, fisioterapia, terapia del dolore e supporto psicologico/salute mentale.',
                isCorrect: true,
                qualityDeltaPct: 0,
                valuePoints: 100,
                feedbackText: 'Corretto. L’assistenza deve essere organizzata e coordinata da uno specialista esperto in malattie metaboliche dell’osso con un team multidisciplinare che includa, quando appropriato, fisioterapia e supporto per la salute mentale.'
              },
              {
                id: 'S3-GES-B',
                headline: 'Gestire il caso in modo isolato senza coordinamento multidisciplinare',
                bodyText: 'Lasciare i diversi aspetti senza regia.',
                isCorrect: false,
                qualityDeltaPct: -10,
                valuePoints: 0,
                feedbackText: 'Errato (-10% CQ). La mancanza di coordinamento multidisciplinare rende meno efficace la presa in carico di una patologia cronica e multisistemica.'
              },
              {
                id: 'S3-GES-C',
                headline: 'Dimettere la paziente invitandola a tornare solo se peggiora',
                bodyText: 'Non impostare continuità assistenziale.',
                isCorrect: false,
                qualityDeltaPct: -15,
                valuePoints: 0,
                feedbackText: 'Errato (-15% CQ). L’XLH è una patologia rara, cronica e progressiva che dura tutta la vita e richiede continuità di cura.'
              }
            ]
          },
          {
            snodoId: 'e-s3-2',
            snodoCode: '3.2',
            domainKey: 'diagnostica',
            domainLabel: 'Scelta Diagnostica',
            valueWeight: 100,
            tiles: [
              {
                id: 'S3-DIA-A',
                headline: 'Integrare conferma genetica (PHEX) e valutazione biochimico-radiografica mirata',
                bodyText: 'Considerare la conferma genetica ogni volta che è possibile (e in assenza di analisi genetica molecolare, storia familiare legata all’X, FGF23 intatto non soppresso e ipofosfatemia) con valutazione mirata di segni/sintomi.',
                isCorrect: true,
                qualityDeltaPct: 0,
                valuePoints: 100,
                feedbackText: 'Corretto. La diagnosi si basa sulla combinazione di caratteristiche cliniche, biochimiche, radiografiche e genetiche e dovrebbe essere confermata mediante test genetici quando possibile.'
              },
              {
                id: 'S3-DIA-B',
                headline: 'Fermare qualsiasi inquadramento se un nuovo test genetico non è immediatamente disponibile',
                bodyText: 'Bloccare il percorso.',
                isCorrect: false,
                qualityDeltaPct: -10,
                valuePoints: 0,
                feedbackText: 'Errato (-10% CQ). Se l’analisi genetica molecolare non è disponibile, la diagnosi è supportata da storia familiare X‑Linked, FGF23 non soppresso e ipofosfatemia.'
              },
              {
                id: 'S3-DIA-C',
                headline: 'Scambiare il quadro per un semplice deficit nutrizionale di vitamina D senza verificare il profilo biochimico/renale',
                bodyText: 'Ignorare la perdita renale di fosfato.',
                isCorrect: false,
                qualityDeltaPct: -10,
                valuePoints: 0,
                feedbackText: 'Errato (-10% CQ). L’XLH è caratterizzata da perdita renale di fosfato e anomalie della mineralizzazione ossea legate all’eccesso di FGF23.'
              }
            ]
          },
          {
            snodoId: 'e-s3-3',
            snodoCode: '3.3',
            domainKey: 'comunicazionale',
            domainLabel: 'Scelta Comunicazionale',
            valueWeight: 100,
            tiles: [
              {
                id: 'S3-COM-A',
                headline: 'Spiegare in modo chiaro fisiopatologia e perché la cura conta anche nell’adolescenza',
                bodyText: 'Chiarire come il gene PHEX e l’eccesso di FGF23 determinino perdita di fosfato e sintomi che impattano su ossa, mobilità e benessere.',
                isCorrect: true,
                qualityDeltaPct: 0,
                valuePoints: 100,
                feedbackText: 'Corretto. Una maggiore comprensione dell’impatto della malattia favorisce consapevolezza, benessere e continuità assistenziale.'
              },
              {
                id: 'S3-COM-B',
                headline: 'Dare istruzioni tecniche senza spiegare il senso del percorso',
                bodyText: 'Lasciare Elena senza contesto.',
                isCorrect: false,
                qualityDeltaPct: -5,
                valuePoints: 0,
                feedbackText: 'Errato (-5% CQ). La scarsa consapevolezza del bisogno di assistenza continuativa ostacola l’aderenza e la continuità di cura.'
              },
              {
                id: 'S3-COM-C',
                headline: 'Affermare che le manifestazioni pregresse dell’infanzia non abbiano alcun legame con il presente',
                bodyText: 'Negare la continuità evolutiva.',
                isCorrect: false,
                qualityDeltaPct: -10,
                valuePoints: 0,
                feedbackText: 'Errato (-10% CQ). L’XLH è una malattia progressiva che dura tutta la vita, con conseguenze ed evoluzioni che richiedono attenzione continua.'
              }
            ]
          }
        ]
      },

      /* ══════════════════ STEP 4 — 4 SNODI (4 x 4 = 16 POST-IT) ══════════════════ */
      {
        stepNumber: 4,
        title: 'Quarto Avanzamento',
        preChoiceEvolutionByBranch: {
          default: {
            headline: 'Aggiornamento Narrativo Evolutivo (Prima della Scelta)',
            narrative: 'Elena (15 anni) ha compreso meglio il quadro, ma continua ad avvertire dolore, rigidità e difficoltà funzionali nelle attività quotidiane, oltre a temere che l’interruzione o l’irregolarità del trattamento faccia tornare i sintomi e peggiori la funzionalità. Le evidenze indicano che negli adolescenti il trattamento continuo e ininterrotto è necessario per sostenere i benefici clinici e biologici e prevenire la progressione di complicanze.'
          }
        },
        snodi: [
          {
            snodoId: 'e-s4-1',
            snodoCode: '4.1',
            domainKey: 'gestionale',
            domainLabel: 'Scelta Gestionale',
            valueWeight: 100,
            tiles: [
              {
                id: 'S4-GES-A',
                headline: 'Coordinare la rete multidisciplinare sulle esigenze individuali di Elena',
                bodyText: 'Attivare sotto regia dello specialista esperto in malattie metaboliche dell’osso il supporto psicologico/salute mentale, la fisioterapia/riabilitazione e il monitoraggio odontoiatrico per la storia di ascesso dentale.',
                isCorrect: true,
                qualityDeltaPct: 0,
                valuePoints: 100,
                feedbackText: 'Corretto. Un team multidisciplinare coordinato, includendo quando appropriato fisioterapia e supporto per la salute mentale, sostiene funzionalità e benessere.'
              },
              {
                id: 'S4-GES-B',
                headline: 'Escludere il supporto per la salute mentale nonostante l’aumento del carico psicologico in adolescenza',
                bodyText: 'Ignorare il benessere emotivo.',
                isCorrect: false,
                qualityDeltaPct: -10,
                valuePoints: 0,
                feedbackText: 'Errato (-10% CQ). Durante l’adolescenza aumenta il carico psicologico dell’XLH e dolore, rigidità e mobilità limitata possono impattare sul benessere mentale.'
              },
              {
                id: 'S4-GES-C',
                headline: 'Trascurare la prevenzione odontoiatrica nonostante il pregresso ascesso dentale',
                bodyText: 'Non considerare il rischio dentale.',
                isCorrect: false,
                qualityDeltaPct: -10,
                valuePoints: 0,
                feedbackText: 'Errato (-10% CQ). Le complicanze dentali (come ascessi legati a scarsa mineralizzazione della dentina e rischio parodontale) fanno parte del quadro XLH.'
              },
              {
                id: 'S4-GES-D',
                headline: 'Non fissare un referente o un controllo periodico',
                bodyText: 'Lasciare il percorso senza continuità.',
                isCorrect: false,
                qualityDeltaPct: -15,
                valuePoints: 0,
                feedbackText: 'Errato (-15% CQ). La continuità dell’assistenza è indispensabile per prevenire peggioramenti e interruzioni.'
              }
            ]
          },
          {
            snodoId: 'e-s4-2',
            snodoCode: '4.2',
            domainKey: 'diagnostica',
            domainLabel: 'Scelta Diagnostica',
            valueWeight: 100,
            tiles: [
              {
                id: 'S4-DIA-A',
                headline: 'Valutare parametri biochimici, funzionalità, stato dentale e imaging mirato alle esigenze cliniche',
                bodyText: 'Integrare controllo biochimico, valutazione dentale e accertamenti strumentali mirati in base ai segni/sintomi e alla storia clinica.',
                isCorrect: true,
                qualityDeltaPct: 0,
                valuePoints: 100,
                feedbackText: 'Corretto. La valutazione deve essere personalizzata in base a manifestazioni cliniche, biochimiche, radiografiche e storia clinica.'
              },
              {
                id: 'S4-DIA-B',
                headline: 'Non eseguire alcun controllo biochimico, dentale o funzionale',
                bodyText: 'Procedere senza verifiche oggettive.',
                isCorrect: false,
                qualityDeltaPct: -10,
                valuePoints: 0,
                feedbackText: 'Errato (-10% CQ). Il monitoraggio clinico, biochimico, funzionale e dentale è essenziale per seguire l’andamento della malattia.'
              },
              {
                id: 'S4-DIA-C',
                headline: 'Dare per scontato che i sintomi riferiti non abbiano correlazione con la malattia',
                bodyText: 'Ignorare dolore e rigidità.',
                isCorrect: false,
                qualityDeltaPct: -10,
                valuePoints: 0,
                feedbackText: 'Errato (-10% CQ). Dolore, rigidità e limitazioni funzionali sono manifestazioni centrali dell’XLH e vanno valutate con attenzione.'
              },
              {
                id: 'S4-DIA-D',
                headline: 'Applicare una valutazione generica non adattata al profilo individuale',
                bodyText: 'Ignorare la variabilità interindividuale.',
                isCorrect: false,
                qualityDeltaPct: -5,
                valuePoints: 0,
                feedbackText: 'Errato (-5% CQ). Le manifestazioni dell’XLH variano da persona a persona e richiedono un approccio personalizzato.'
              }
            ]
          },
          {
            snodoId: 'e-s4-3',
            snodoCode: '4.3',
            domainKey: 'terapeutica',
            domainLabel: 'Scelta Terapeutica',
            valueWeight: 100,
            tiles: [
              {
                id: 'S4-TER-A',
                headline: 'Garantire continuità terapeutica personalizzata sul profilo clinico e sui bisogni della paziente',
                bodyText: 'Impostare/mantenere una terapia mirata e personalizzata in base a manifestazioni cliniche, storia clinica e giudizio dello specialista, sottolineando la continuità per sostenere i benefici su dolore e funzionalità.',
                isCorrect: true,
                qualityDeltaPct: 0,
                valuePoints: 100,
                feedbackText: 'Corretto. Trattamento e monitoraggio vanno personalizzati e mantenuti con continuità per sostenere i benefici clinici e biologici e prevenire la progressione delle complicanze.'
              },
              {
                id: 'S4-TER-B',
                headline: 'Consigliare di sospendere o diradare liberamente la terapia ogni volta che si sente meno stanca',
                bodyText: 'Favorire l’interruzione discontinua.',
                isCorrect: false,
                qualityDeltaPct: -15,
                valuePoints: 0,
                feedbackText: 'Errato (-15% CQ). L’interruzione o la riduzione non guidata del trattamento può comportare la ricomparsa di dolore osseo e compromissione funzionale e la perdita dei benefici.'
              },
              {
                id: 'S4-TER-C',
                headline: 'Impostare il trattamento senza pianificare il monitoraggio di efficacia e sicurezza',
                bodyText: 'Trascurare la sorveglianza.',
                isCorrect: false,
                qualityDeltaPct: -10,
                valuePoints: 0,
                feedbackText: 'Errato (-10% CQ). Il trattamento richiede un monitoraggio regolare e personalizzato per valutare risposta e potenziali eventi avversi.'
              },
              {
                id: 'S4-TER-D',
                headline: 'Ignorare le difficoltà pratiche o le preferenze di gestione nella vita quotidiana',
                bodyText: 'Non adattare il piano.',
                isCorrect: false,
                qualityDeltaPct: -10,
                valuePoints: 0,
                feedbackText: 'Errato (-10% CQ). Tenere conto dei bisogni individuali della paziente aiuta a rendere sostenibile il percorso nel tempo.'
              }
            ]
          },
          {
            snodoId: 'e-s4-4',
            snodoCode: '4.4',
            domainKey: 'comunicazionale',
            domainLabel: 'Scelta Comunicazionale',
            valueWeight: 100,
            tiles: [
              {
                id: 'S4-COM-A',
                headline: 'Coinvolgere Elena in modo empatico e trasparente sugli obiettivi del percorso',
                bodyText: 'Spiegare perché la continuità delle cure protegge mobilità, funzionalità e qualità di vita, ascoltando dubbi e timori.',
                isCorrect: true,
                qualityDeltaPct: 0,
                valuePoints: 100,
                feedbackText: 'Corretto. Una comunicazione chiara ed empatica rafforza la consapevolezza e sostiene la continuità assistenziale.'
              },
              {
                id: 'S4-COM-B',
                headline: 'Promettere che il trattamento eliminerà all’istante ogni traccia passata o futura della malattia',
                bodyText: 'Creare aspettative non realistiche.',
                isCorrect: false,
                qualityDeltaPct: -10,
                valuePoints: 0,
                feedbackText: 'Errato (-10% CQ). L’XLH è una condizione cronica e progressiva che richiede un inquadramento realistico di benefici, continuità e monitoraggio.'
              },
              {
                id: 'S4-COM-C',
                headline: 'Rimproverare Elena per i momenti di esitazione o stanchezza verso le cure',
                bodyText: 'Adottare un tono colpevolizzante.',
                isCorrect: false,
                qualityDeltaPct: -10,
                valuePoints: 0,
                feedbackText: 'Errato (-10% CQ). Il carico psicologico e i sintomi cronici richiedono ascolto e supporto, non colpevolizzazione.'
              },
              {
                id: 'S4-COM-D',
                headline: 'Parlare esclusivamente con i genitori ignorando la diretta interessata',
                bodyText: 'Escludere la quindicenne dal dialogo.',
                isCorrect: false,
                qualityDeltaPct: -5,
                valuePoints: 0,
                feedbackText: 'Errato (-5% CQ). Coinvolgere la paziente in modo adeguato all’età favorisce comprensione e adesione continua.'
              }
            ]
          }
        ]
      },

      /* ══════════════════ STEP 5 — 5 SNODI (5 x 4 = 20 POST-IT) ══════════════════ */
      {
        stepNumber: 5,
        title: 'Quinto Avanzamento',
        preChoiceEvolutionByBranch: {
          default: {
            headline: 'Aggiornamento Narrativo Evolutivo (Prima della Scelta)',
            narrative: 'Elena (15 anni) ha intrapreso un percorso strutturato e si sente più partecipe e sostenuta. Ora occorre definire il mantenimento e il follow-up nel tempo, consolidare il team multidisciplinare, mantenere una sorveglianza accurata di sintomi, funzionalità, stato dentale ed esami mirati e affrontare con chiarezza gli aspetti di family mapping e consulenza genetica legati all’ereditarietà X‑Linked.'
          }
        },
        snodi: [
          {
            snodoId: 'e-s5-1',
            snodoCode: '5.1',
            domainKey: 'followup',
            domainLabel: 'Scelta Mantenimento / Follow-up',
            valueWeight: 100,
            tiles: [
              {
                id: 'S5-FOL-A',
                headline: 'Impostare un piano di follow-up e monitoraggio regolare e strutturato',
                bodyText: 'Definire controlli clinici periodici, valutazione funzionale (es. test del cammino dei 6 minuti) e qualità di vita (BPI e WOMAC), monitoraggio dentale (rischio parodontale e ortopantomografia) e imaging mirato secondo indicazione.',
                isCorrect: true,
                qualityDeltaPct: 0,
                valuePoints: 100,
                feedbackText: 'Corretto. Il follow-up e il monitoraggio regolari sono necessari per sostenere i benefici, intercettare complicanze/eventi avversi e prevenire la progressione.'
              },
              {
                id: 'S5-FOL-B',
                headline: 'Non programmare controlli regolari, rimandando solo a eventuali urgenze',
                bodyText: 'Rinunciare al follow-up strutturato.',
                isCorrect: false,
                qualityDeltaPct: -15,
                valuePoints: 0,
                feedbackText: 'Errato (-15% CQ). Il monitoraggio regolare è parte integrante della gestione per prevenire peggioramenti e complicanze.'
              },
              {
                id: 'S5-FOL-C',
                headline: 'Omettere il monitoraggio dentale e la valutazione di funzionalità e qualità di vita',
                bodyText: 'Trascurare aree rilevanti del follow-up.',
                isCorrect: false,
                qualityDeltaPct: -10,
                valuePoints: 0,
                feedbackText: 'Errato (-10% CQ). Il follow-up include valutazione dentale (rischio parodontale, ortopantomografia), funzionalità (6MWT) e qualità di vita (BPI, WOMAC).'
              },
              {
                id: 'S5-FOL-D',
                headline: 'Prescrivere esami di imaging avanzato a intervalli fissi senza indicazioni cliniche',
                bodyText: 'Non seguire i criteri del piano.',
                isCorrect: false,
                qualityDeltaPct: -10,
                valuePoints: 0,
                feedbackText: 'Errato (-10% CQ). L’imaging (come RMI del cranio, ecocardiogramma, ecografia renale) ha indicazioni mirate in base alle condizioni cliniche.'
              }
            ]
          },
          {
            snodoId: 'e-s5-2',
            snodoCode: '5.2',
            domainKey: 'gestionale',
            domainLabel: 'Scelta Gestionale',
            valueWeight: 100,
            tiles: [
              {
                id: 'S5-GES-A',
                headline: 'Mantenere il coordinamento multidisciplinare guidato dallo specialista esperto in malattie metaboliche dell’osso',
                bodyText: 'Assicurare revisioni periodiche coordinate e continuità nella transizione verso le fasi successive di vita.',
                isCorrect: true,
                qualityDeltaPct: 0,
                valuePoints: 100,
                feedbackText: 'Corretto. I pazienti devono essere rivisti regolarmente da un team multidisciplinare coordinato da un esperto in malattie metaboliche dell’osso, con continuità di assistenza anche verso l’età adulta.'
              },
              {
                id: 'S5-GES-B',
                headline: 'Interrompere il raccordo tra specialista di riferimento e altri professionisti coinvolti',
                bodyText: 'Frammentare il mantenimento.',
                isCorrect: false,
                qualityDeltaPct: -10,
                valuePoints: 0,
                feedbackText: 'Errato (-10% CQ). La frammentazione e la mancanza di coordinamento espongono a discontinuità e cali di aderenza.'
              },
              {
                id: 'S5-GES-C',
                headline: 'Considerare concluso il percorso di cura',
                bodyText: 'Ritenere non più necessaria la presa in carico.',
                isCorrect: false,
                qualityDeltaPct: -15,
                valuePoints: 0,
                feedbackText: 'Errato (-15% CQ). L’XLH dura tutta la vita e richiede assistenza continuativa.'
              },
              {
                id: 'S5-GES-D',
                headline: 'Non adattare la rete assistenziale ai nuovi bisogni emergenti nel tempo',
                bodyText: 'Mantenere un assetto rigido.',
                isCorrect: false,
                qualityDeltaPct: -5,
                valuePoints: 0,
                feedbackText: 'Errato (-5% CQ). Le aree coinvolte nella cura si modulano in base alle esigenze individuali nel tempo.'
              }
            ]
          },
          {
            snodoId: 'e-s5-3',
            snodoCode: '5.3',
            domainKey: 'investigativa',
            domainLabel: 'Scelta Investigativa / Esaminazione',
            valueWeight: 100,
            tiles: [
              {
                id: 'S5-INV-A',
                headline: 'Aggiornare regolarmente la storia clinica su tutti i domini sintomatologici e funzionali',
                bodyText: 'Indagare periodicamente cefalea, manifestazioni orali, fatigue, pseudofratture, dolore muscoloscheletrico, udito, neurologia e funzionalità quotidiana.',
                isCorrect: true,
                qualityDeltaPct: 0,
                valuePoints: 100,
                feedbackText: 'Corretto. L’esame clinico nel follow-up include la raccolta periodica della storia clinica di questi sintomi e la valutazione funzionale/uditiva/neurologica.'
              },
              {
                id: 'S5-INV-B',
                headline: 'Chiedere solo se il dolore è cambiato nell’ultima settimana',
                bodyText: 'Trascurare fatigue, sintomi orali, uditivi o neurologici.',
                isCorrect: false,
                qualityDeltaPct: -10,
                valuePoints: 0,
                feedbackText: 'Errato (-10% CQ). Il monitoraggio clinico richiede un’indagine sistematica su più domini sintomatologici e funzionali.'
              },
              {
                id: 'S5-INV-C',
                headline: 'Non valutare nel tempo l’impatto su mobilità e attività quotidiane',
                bodyText: 'Ignorare la funzionalità.',
                isCorrect: false,
                qualityDeltaPct: -10,
                valuePoints: 0,
                feedbackText: 'Errato (-10% CQ). Dolore, rigidità e limitazioni funzionali incidono sulla vita quotidiana e vanno monitorati nel tempo.'
              },
              {
                id: 'S5-INV-D',
                headline: 'Trascurare i sintomi riferiti tra un controllo e l’altro',
                bodyText: 'Sottovalutare l’anamnesi di aggiornamento.',
                isCorrect: false,
                qualityDeltaPct: -5,
                valuePoints: 0,
                feedbackText: 'Errato (-5% CQ). La raccolta della storia clinica dei sintomi è parte centrale del piano di follow-up.'
              }
            ]
          },
          {
            snodoId: 'e-s5-4',
            snodoCode: '5.4',
            domainKey: 'diagnostica',
            domainLabel: 'Scelta Diagnostica',
            valueWeight: 100,
            tiles: [
              {
                id: 'S5-DIA-A',
                headline: 'Eseguire monitoraggio biochimico/speciale e imaging mirato secondo le indicazioni del piano',
                bodyText: 'Valutare parametri di monitoraggio/laboratorio e attivare l’imaging appropriato (es. RMI del cranio se indicato da segni/sintomi neurologici o cefalea ricorrente/declino cognitivo/craniosinostosi, ecocardiogramma se ipertensione, ecografia renale se nefrocalcitosi/ipercalciuria).',
                isCorrect: true,
                qualityDeltaPct: 0,
                valuePoints: 100,
                feedbackText: 'Corretto. Il piano di follow-up definisce esami speciali e imaging mirato in base alle condizioni cliniche.'
              },
              {
                id: 'S5-DIA-B',
                headline: 'Non eseguire alcun controllo biochimico o strumentale di monitoraggio',
                bodyText: 'Rinunciare a verifiche oggettive.',
                isCorrect: false,
                qualityDeltaPct: -10,
                valuePoints: 0,
                feedbackText: 'Errato (-10% CQ). Il monitoraggio periodico consente di seguire l’andamento clinico e intercettare complicanze o eventi avversi.'
              },
              {
                id: 'S5-DIA-C',
                headline: 'Richiedere ecografia renale o ecocardiogramma senza legarli alle rispettive indicazioni',
                bodyText: 'Prescrivere esami fuori criterio.',
                isCorrect: false,
                qualityDeltaPct: -5,
                valuePoints: 0,
                feedbackText: 'Errato (-5% CQ). Nel piano di follow-up l’ecocardiogramma è indicato in caso di ipertensione e l’ecografia renale in caso di nefrocalcitosi/ipercalciuria.'
              },
              {
                id: 'S5-DIA-D',
                headline: 'Interpretare un singolo valore isolato senza considerare il quadro complessivo',
                bodyText: 'Trarre conclusioni parziali.',
                isCorrect: false,
                qualityDeltaPct: -5,
                valuePoints: 0,
                feedbackText: 'Errato (-5% CQ). L’inquadramento richiede sempre la lettura integrata di clinica, laboratorio, genetica ed eventuali indagini strumentali.'
              }
            ]
          },
          {
            snodoId: 'e-s5-5',
            snodoCode: '5.5',
            domainKey: 'comunicazionale',
            domainLabel: 'Scelta Comunicazionale',
            valueWeight: 100,
            tiles: [
              {
                id: 'S5-COM-A',
                headline: 'Promuovere family mapping e consulenza genetica / family planning con corretta informazione X‑Linked',
                bodyText: 'Raccomandare lo screening dei familiari a rischio (chiarendo che per una donna affetta sia figli maschi sia figlie femmine possono essere a rischio di trasmissione legata all’X) e offrire consulenza genetica per il family planning.',
                isCorrect: true,
                qualityDeltaPct: 0,
                valuePoints: 100,
                feedbackText: 'Corretto. Il family mapping favorisce diagnosi precoce, avvio tempestivo della terapia e family planning accurato, con consulenza genetica per chi pianifica una gravidanza.'
              },
              {
                id: 'S5-COM-B',
                headline: 'Affermare che una madre affetta da XLH non può mai trasmettere la mutazione ai figli maschi',
                bodyText: 'Fornire un’informazione errata sull’ereditarietà X‑Linked.',
                isCorrect: false,
                qualityDeltaPct: -10,
                valuePoints: 0,
                feedbackText: 'Errato (-10% CQ). Nelle femmine affette da XLH la trasmissione legata all’X può interessare sia i figli maschi sia le figlie femmine, e tutti i familiari a rischio vanno sottoposti a screening.'
              },
              {
                id: 'S5-COM-C',
                headline: 'Omettere il tema dello screening familiare e della consulenza genetica',
                bodyText: 'Non informare sulle implicazioni familiari.',
                isCorrect: false,
                qualityDeltaPct: -10,
                valuePoints: 0,
                feedbackText: 'Errato (-10% CQ). Le linee guida raccomandano lo screening dei familiari a rischio e l’offerta di consulenza genetica.'
              },
              {
                id: 'S5-COM-D',
                headline: 'Sostenere che la storia familiare e lo screening non abbiano impatto sulla diagnosi precoce',
                bodyText: 'Sottovalutare il family mapping.',
                isCorrect: false,
                qualityDeltaPct: -10,
                valuePoints: 0,
                feedbackText: 'Errato (-10% CQ). La storia familiare e lo screening consentono diagnosi più precoci ed evitano ritardi diagnostici e terapeutici.'
              }
            ]
          }
        ]
      }
    ]
  };

  return {
    CASES_REGISTRY: [CASO_202_MATTEO, CASO_202_ELENA]
  };
});
