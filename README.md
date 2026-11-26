# RADAR XLH — Casi Clinici Interattivi a Piramide Inversa

Tool interattivo narrativo ed esperienziale progettato per l'erogazione di casi clinici a snodi decisionali su interfaccia a **Post-it / Tile dinamici in Piramide Inversa Discendente**, sviluppato per il percorso ECM **RADAR XLH** (*Rete di Apprendimento, Dialogo, Accoglienza e Relazione in XLH* — Provider FORUM pro S.r.l., ID 95).

## Architettura Didattica a Piramide Inversa

1. **Vertice (Livello 0)**: Tile descrittiva iniziale del paziente e dei parametri clinici di ingresso.
2. **Discesa a 6 Snodi Decisionali** (numero di Post-it e complessità crescenti scendendo):
   - **Snodo 1**: Scelta Comunicazionale
   - **Snodo 2**: Scelta Investigativa / Esaminazione
   - **Snodo 3**: Scelta Gestionale
   - **Snodo 4**: Scelta Diagnostica
   - **Snodo 5**: Scelta Terapeutica
   - **Snodo 6**: Scelta Mantenimento / Follow-up
3. **Narrazione Evolutiva Pre-Scelta & Diramazioni**: prima di ciascuna decisione il discente riceve aggiornamenti clinici evolutivi del paziente coerenti con il percorso seguito.
4. **Coefficiente di Qualità (CQ%) & Valore Snodi**: il discente parte da **100%**; ogni opzione errata o sub-ottimale decurta il CQ% in modo esplicito e documentato, mentre ogni snodo assegna punti di valore clinico fino al Debriefing Finale (soglia qualitativa di riferimento: 75%).

## Modalità di Fruizione Remota & LMS

- **Accesso diretto**: aprire `index.html` tramite HTTPS (GitHub Pages) o server statico locale.
- **Selezione caso via URL**: `?case=<id>`
- **Modalità Embed LMS (Iframe)**: `?embed=1` (compatta header e controlli esterni per integrarsi nelle piattaforme FAD).
- **Test / Anteprima JSON Locale**: pulsante *Carica JSON* nell'header per caricare e validare istantaneamente nuovi casi nel browser senza backend.

## Struttura

```text
├── index.html                  # Struttura semantica HTML5 e dialoghi nativi
├── assets/
│   ├── styles.css              # Design System RADAR XLH + Post-it Pyramid + @media print
│   ├── pyramid-engine.js       # State machine, branching, calcolo CQ% e validatore schema
│   ├── cases-registry.js       # Registro casi (Calibrazione Motore + Slot Caso #01)
│   ├── app.js                  # Renderer piramide, SVG connectors, UX e telemetry HUD
│   └── img/                    # Logo e fondale ufficiali RADAR XLH
└── tests/
    └── engine.test.mjs         # Suite test automatici Node (`node --test`)
```
