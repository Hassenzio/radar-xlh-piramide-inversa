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
      code: 'CASO 2.02',
      title: 'XLH con Patologia Pregressa — Matteo, 26 anni',
      subtitle: 'Caso clinico interattivo narrativo a 5 Step (1 → 2 → 3 → 4 → 5 snodi) su continuità assistenziale dell’adulto, team multidisciplinare e mappatura familiare',
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

  return {
    CASES_REGISTRY: [CASO_202_MATTEO]
  };
});
