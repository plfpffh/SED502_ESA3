# ESA 3 – Planung „Seen im Klimawandel“ (Abschlussprojekt)

Gruppenarbeit SED502 Front-End Development · dieselben 2 Personen wie ESA 2 · 50 Punkte
Abgabe **Sa, 16.01.2027, 23:59** im Online-Campus · Repository <https://github.com/plfpffh/SED502_ESA3>

| Rolle | GitHub | Name | Schwerpunkt |
|---|---|---|---|
| Person A | plfpffh | Peter Luckmann | Repository, Deployment, Code Splitting, Navigation, Sicherheit (KI-Kontingent) und Lizenzen, eigene Seiten responsive und barrierefrei |
| Person B | cchhrriiss | Christoph Hauser | Grundlayout und Barrierefreiheit (global), Formulare, Performance, Lighthouse-Messung und Audit, Impressum und Datenschutz, eigene Seiten responsive und barrierefrei |

> **Kurz für Person B:** ESA 3 baut auf unserer ESA-2-App auf (ESA 2: volle Punkte). Es kommt **keine neue Fachfunktion** dazu. Wir machen die App responsive, barrierefrei und schnell und stellen sie online. Neu sind nur der Schutz des KI-Kontingents (Zugangscode) und die Seiten „Lizenzen und Datenquellen“, „Impressum“ und „Datenschutz“. Lies Abschnitt 1, dann **deinen** Teil in Abschnitt 4. Wie in ESA 2 bleibt jede Person für die Seiten zuständig, die sie gebaut hat.

---

## 1. Anforderungen

### 1.1 Laut Angabe ESA 03

**Alle Anforderungen aus ESA 2 gelten weiterhin**, auch „jede Person hat erkennbare, gleichwertige Commits“. Zusätzlich:

**Responsive Design und Accessibility**
- Funktioniert auf Mobil (**ab 320 px**) und Desktop **ohne horizontale Scrollbalken**
- Lighthouse **Accessibility ≥ 70** und **Performance ≥ 70**, gemessen auf der **deployten URL**
- Semantisches HTML, korrekte Alt-Texte, ausreichender Farbkontrast (**WCAG 2.2 Level AA**)
- Alle interaktiven Elemente per **Tastatur** erreichbar, **Fokus-Stile sichtbar**

**Deployment**
- Auf **Vercel** deployt, öffentliche URL
- `npm run build` **ohne Fehler und ohne Warnungen**
- API-Schlüssel als **Umgebungsvariablen in Vercel**
- SPA-Routing gelöst (`vercel.json`)

**Erweiterte Qualität**
- **Code Splitting** mit `React.lazy()` für **mind. zwei Seiten-Komponenten**
- Mind. **ein Custom Hook in mehr als einer Komponente**
- **Benutzerfreundliche Fehlermeldungen**, kein roher Fehlertext aus der API

**README** – alle Abschnitte aus ESA 2, zusätzlich:
- Live-URL (direkt klickbar)
- Screenshots **Desktop und Mobil**
- **Lighthouse-Screenshots** (Performance und Accessibility)
- **Persönlicher Rückblick, max. 200 Wörter pro Person**: Was habe ich gelernt? Was würde ich beim nächsten Projekt anders machen?

**Bewertung:**

| Kriterium | Punkte |
|---|---|
| Funktionalität (API, AI-Feature, Routing) | 15 |
| Code-Qualität (TypeScript, Hooks, Struktur, Code Splitting) | 15 |
| Responsive und Accessibility | 10 |
| Deployment | 5 |
| Dokumentation, Rückblick, AI-Transparenz | 5 |
| **Gesamt** | **50** |

Positiv ab 25 Punkten. Eine **nicht deployte App gilt als unvollständig**. Verspätete Abgabe bis 23.01.2027 mit 20 % Abzug.

**Abgabe:**
- GitHub-URL
- Live-URL
- Namen beider Personen

Eine E-Mail bis 02.01.2027 ist nur bei einem Neustart oder einer geänderten Gruppe nötig. Beides trifft nicht zu.

### 1.2 Zusätzlich aus den Kompendien (wird so bewertet)

| Quelle | Vorgabe | Stand / Aufgabe |
|---|---|---|
| M08 1.1 | **Mind. ein Formular mit Validierung** (Pflichtanforderung) | `BeraterFormular` hat `required` und `maxLength` sowie einen gesperrten Button. Es fehlen sichtbare Feldfehler mit `aria-invalid` und `aria-describedby` → **B** |
| M08 1.3 | Beitrag nur aus einem großen Commit „wird kritisch bewertet“, Commits sind der Nachweis | ESA-2-Historie übernommen (Abschnitt 3); kleine Commits, eigene Branches, PRs |
| M08 2.1 | Abgabe enthält zusätzlich **3–5 Sätze Projektbeschreibung** im Abgabebereich | Checkliste |
| M08 2.2 | README: Projektname + 1–3 Sätze Beschreibung ganz oben, Live-URL, Screenshots | README-Endredaktion |
| M08 1.1, 2.3 | AI-Einsatz vollständig und ehrlich: welche Tools, wann (1.1), wofür, **übernommen / verworfen / angepasst** (2.3) | AI-Tabelle aus ESA 2 wie bisher fortführen: Zeitraum in der Tool-Spalte, je Person eigene Zeilen. Neu: pro Person ein bis zwei konkrete Fälle, in denen KI-Output übernommen, verworfen oder angepasst wurde. |
| M08 1.1, 4.5 | Kein TypeScript-Fehler „in der Konsole von VS Code“ | VS-Code-Ansicht *Probleme* leer, auch in `tests/` und `api/`, nicht nur `tsc -b` |
| M07 Üb. 1.1 | Core Web Vitals (LCP, INP, CLS) dokumentieren | in `doc/lighthouse.md` → **B** |
| M05 S.20 | README: welche Daten an die API gehen, was mit ihnen passiert | bei ESA 2 vorhanden; ergänzen: Der Tageszähler speichert keine IP und keine personenbezogenen Daten → **A** |
| M01 S.10 | „Kein Code wird committet, den man nicht vollständig erklären kann“ | gilt besonders für KI-generierten Code (Abschnitt 3, Git-Workflow) |
| M08 3.2 | Komponenten klein (50–100 Zeilen), keine Dopplungen, Cleanup in `useEffect` | beim Umbau beibehalten |
| M08 3.3 | Loading-Indikatoren, verständliche Fehler, „Formulare mit Validierung und Feedback“ | siehe oben |
| M08 3.4 | Nur halbe Punkte bei „Build-Warnungen“, das gilt auch für das **Vercel-Build-Log** | Vercel-Log prüfen (Abschnitt 5) |
| M07 1.2 | Lighthouse im **Inkognito-Modus** | Messanleitung Abschnitt 6 |
| M07 2.2 | `React.lazy` + `Suspense` mit sinnvollem Fallback (`Ladeanimation`) | **A** |
| M07 2.3 | Bilder mit `width`/`height` und `loading="lazy"` (CLS) | App hat kaum Bilder; README-Screenshots betrifft das nicht |
| M07 3.2 | CI mit GitHub Actions | besteht seit ESA 2 (`ci.yml`, Job `pruefen`) |
| M07 3.3 | Preview-URL je Pull Request, Produktion bei Merge auf `main` | über die Vercel-GitHub-Integration |
| M06 1.2 | **Mobile First**: Basis für Mobil, Erweiterung mit `min-width` | `index.css` hat noch **keine** Breakpoint-Media-Queries → **B** |
| M06 1.4 | relative Einheiten (`rem`, `%`, `clamp()`), Zeilenlänge `max-width: 70ch` | **B** global, je Person eigene Komponenten |
| M06 4.1 | `prefers-reduced-motion` | vorhanden |
| M06 4.2 | Farben als CSS-Variablen, dunkles Theme | vorhanden; **Kontrast in beiden Themes** prüfen |
| M06 5.3 | Skip-Link, `:focus-visible`, `sr-only`, Labels mit `htmlFor`, Fehler mit `aria-describedby` | `:focus-visible` und `.unsichtbar` vorhanden, Skip-Link fehlt |
| M06 5.5 | Accessibility-Audit mit axe/WAVE + Lighthouse vorher/nachher dokumentieren | `doc/accessibility-audit.md` → **B** |
| M05 Üb. 6.1 | KI-Inhalt gekennzeichnet, neue Inhalte über `aria-live` angesagt | vorhanden (`KiAntwort`), beim Responsive-Umbau erhalten |
| M04 S.40 | Namenskonventionen (`XxxProps`, `handleXxx`, `isXxx`) | beibehalten |
| M01 S.4 | Commit-Format `Add:` / `Fix:` / `Update:` / `Remove:` | beibehalten |

**Tailwind (M06 4.3)** setzen wir bewusst nicht ein. Die App hat seit ESA 2 eine eigene `index.css` mit CSS-Variablen und Hell-/Dunkel-Theme (ebenfalls M06, Abschnitt 4.2). Eine Umstellung brächte keinen Punkt, aber viel Risiko. Diese Entscheidung kommt in die README unter „Bewusste Entscheidungen“.

## 2. Ausgangslage aus ESA 2 (geprüft am 05.11.2026)

| Bereich | Stand | Aufgabe in ESA 3 |
|---|---|---|
| Build, Lint, Tests | `npm run build` ohne Warnung, `npm run lint` sauber, 168/168 Tests grün | so halten (CI) |
| Bundle | `index.js` 315 kB, `KlimaDiagramm.js` 354 kB (bereits lazy) | Seiten lazy laden → Hauptpaket kleiner |
| Code Splitting | nur `KlimaDiagramm` (eine **Komponente**, keine Seite) | `App.tsx`: mind. zwei **Seiten** lazy → **A** |
| Custom Hook in > 1 Komponente | `useAI` direkt nur in `SeeDetail` (im KI-Berater indirekt über `useBeraterAnfrage`); `useSeeDaten` nur in Hooks | **nicht eindeutig erfüllt** → neuer Hook `useSeitentitel` in allen Seiten → **A** (Abschnitt 4) |
| Fehlermeldungen | zentral verständlich (`fetchJSON` → `HttpFehler`, `aiStream`, `FehlerMeldung` mit „Erneut versuchen“) | jede Person prüft ihre Seiten, dass kein Rohtext durchkommt |
| Responsive | Grids teils flexibel, **keine** Breakpoints, Navigation nicht für Mobil gebaut | Abschnitt 4 |
| Barrierefreiheit | `lang="de"`, Landmarks, `aria-label` an der Navigation, `:focus-visible`, `role="status"`/`alert`, Diagramm mit Tabelle, `prefers-reduced-motion` | Skip-Link, Seitentitel, Kontrast, Formularfehler, Audit |
| Deployment | `vercel.json` mit SPA-Rewrite (ohne `/api/`), `api/`-Funktionen im Vercel-Format, `.env.example` | auf Vercel einrichten → **A** |
| CI | GitHub Actions `pruefen`: `npm ci`, Lint, Test, Build (Node 24) | Pflicht-Check im Ruleset |
| README | alle ESA-2-Abschnitte, CI-Badge zeigt noch auf ESA2-Repo | Badge, Titel und ESA-3-Abschnitte |

## 3. Repository und Git-Historie

**Entscheidung: Die Commit-Historie aus ESA 2 wird übernommen, kein Neustart.**

Begründung:
- ESA 3 übernimmt „alle Anforderungen aus ESA 2“, darunter die gleichwertigen Commits. Kompendium M08 wertet die Git-Commits als Nachweis und sieht einen einzelnen großen Commit kritisch.
- Bei einem Neustart stünde der gesamte ESA-2-Code, auch der von Person B, als ein einziger Commit von Person A im Repository.
- Mit Historie bleibt nachvollziehbar, was aus ESA 2 stammt (bis `18527c7`) und was in ESA 3 neu ist. In ESA 2 haben wir es mit ESA 1 genauso gehalten.
- Der ESA-2-Stand ist geprüft: Die Historie enthält keine `.env` und keinen API-Key.

**Einrichtung:**

1. ✅ `ESA3/` ist mit dem neuen Repository verbunden. `main` steht auf dem ESA-2-Endstand `18527c7`, der Arbeitsbaum ist identisch (`git status` leer).
2. ✅ **A:** `git push -u origin main` (übernimmt die komplette Historie)
3. ✅ **A:** annotierter Tag `esa2-abgabe` auf `18527c7` gesetzt und gepusht. Er trennt ESA 2 und ESA 3. Die ESA-3-Commits zählen ab hier: `git shortlog -sn esa2-abgabe..main`.
4. ✅ **A:** Person B als Collaborator eingeladen.
5. ✅ **A:** Rulesets angelegt **nach** dem ersten Push (sonst blockiert es den Push selbst), wie in ESA 2. Details unten.
6. ⬜ **A:** erster Pull Request `feature/a-esa3-planung`:
   - diese Planung
   - `package.json` und `package-lock.json`: `"name": "esa3"`
   - README: CI-Badge und erste Zeile auf ESA 3, Absatz „Ausgangsbasis ESA 3“ mit Tag und Vergleichslink, Ausblick ohne Landkarte

   Damit testen wir gleich CI und Ruleset. **B** reviewt.

**Ruleset `main schützen`** (*Settings → Rules → Rulesets → New branch ruleset*):

| Einstellung | Wert |
|---|---|
| Enforcement status | Active |
| Bypass list | leer |
| Target branches | *Include default branch* |
| Restrict deletions | ✔ |
| Block force pushes | ✔ |
| Require a pull request before merging | ✔ · Required approvals **1** · *Dismiss stale pull request approvals when new commits are pushed* ✔ · Allowed merge methods: **Merge** |
| Require status checks to pass | ✔ · Check **`pruefen`** (Quelle: GitHub Actions) hinzufügen |

Den Check `pruefen` findet die Suche erst, nachdem der Workflow einmal im Repository gelaufen ist. Deshalb erst pushen, dann `Actions` abwarten, dann das Ruleset anlegen.

**Ruleset `tags`** (neu gegenüber ESA 2): Es gilt für alle Tags, sperrt *Restrict creations*, *Restrict deletions* und *Restrict updates* und hat eine leere Bypass-Liste. `esa2-abgabe` lässt sich damit nicht mehr löschen oder verschieben, und es kommen keine weiteren Tags dazu.

Tags verlangt weder die Angabe noch ein Kompendium. Der Tag `esa2-abgabe` hat nur einen Zweck: Er markiert, wo ESA 3 beginnt. Einen Abgabe-Tag für ESA 3 setzen wir bewusst nicht. Bewertet wird der Stand von `main` und der Live-URL zur Abgabefrist.

**Git-Workflow wie in ESA 2:**
- Branches heißen `feature/<a|b>-<thema>` oder `fix/<a|b>-<thema>`.
- Kleine Commits im Format `Add:` / `Fix:` / `Update:` / `Remove:`.
- Jede Person committet von ihrem eigenen Konto (noreply-Adresse).
- Jede Person muss ihren Code vollständig erklären können, auch Teile, die mit KI-Unterstützung entstanden sind (M01).
- Jeder PR wird von der anderen Person reviewt.
- Vercel hängt an jeden PR eine Preview-URL. Der Review prüft die Änderung dort auch bei 320 px.

## 4. Aufgabenverteilung

Wie in ESA 2 gilt: **Jede Person macht ihre eigenen Seiten und Komponenten responsive und barrierefrei.** Mit der Bewertung von ESA 2 ist die gleichwertige Arbeit bis dahin festgestellt. Für ESA 3 zählen wir ab dem Tag `esa2-abgabe` neu, und die Arbeit ist **gleich aufgeteilt**:

| Bereich | A | B |
|---|---|---|
| Querschnitt Technik | Deployment, Code Splitting, `useSeitentitel` | Grundlayout Mobile First, Fokus |
| Querschnitt Qualität | Barrierefreiheit der eigenen Komponenten | Barrierefreiheit: Kontraste, Audit, Lighthouse-Messung; Performance-Optimierung |
| Sicherheit | KI-Kontingent serverseitig: Tageszähler, Zugangscode, Tests | Freischalt-Formular für den Zugangscode in der KI-Anzeige |
| Formulare | – | Validierung `BeraterFormular` (M08-Pflicht), Freischalt-Formular |
| Lizenzen | Lizenzbericht im Build, SBOM, Lizenz- und Audit-Prüfung in der CI, Seite „Lizenzen und Datenquellen“ | Recherche der Datenlizenzen (Open-Meteo, Salzburg, OÖ, Wikipedia) für diese Seite |
| Rechtliches | Links in der Fußzeile (`Layout`), fachliches Review der Datenschutzerklärung | Seiten `/impressum` und `/datenschutz`, Recherche der Datenschutzangaben der Anbieter |
| Rahmen | Navigation mobil, Skip-Link im Layout | – |
| eigene Seiten | 10 Komponenten, Seenliste und 404, neu: Lizenzen | 10 Komponenten, Start, Detail, KI-Berater, neu: Impressum, Datenschutz |
| Doku | README Deployment, Sicherheit, Nutzungsrechte; App-Screenshots; Endredaktion | README Responsive und Barrierefreiheit, Performance, Lighthouse-Screenshots, `doc/accessibility-audit.md`; Gegenlesen |
| gemeinsam | gegenseitiger Test, Rückblick, AI-Doku, Reviews | ← gleich |

Den Zwischenstand prüfen wir mit `git shortlog -sn esa2-abgabe..main`.

| Seiten und Komponenten aus ESA 2 | zuständig |
|---|---|
| `Layout`, `Navigation`, `Seenliste`, `SeenFilter`, `MindestwertFilter`, `SeeKarte`, `Kennzahlen`, `NichtGefunden`, `Ladeanimation`, `FehlerMeldung` | A |
| `Startseite`, `SeeDetail`, `SeeInformationen`, `Klimatrend`, `KlimaDiagramm`, `KiAntwort`, `KiBerater`, `BeraterFormular`, `BeraterDatengrundlage`, `BeraterEmpfehlung` | B |

### Person A – Repository, Deployment, Code Splitting, Navigation, Sicherheit und Lizenzen

**Repository (zuerst):** Abschnitt 3, Punkte 2–5

**Deployment auf Vercel (Woche 1, damit B auf der Live-URL messen kann)**
- Vercel-Projekt unter dem eigenen Konto (Hobby) mit dem GitHub-Repository verbinden, Preset Vite.
- Im Hobby-Plan gibt es keine Teammitglieder. B sieht die Deployments über die Vercel-Kommentare und Status-Checks im PR. Das reicht, weil das Repository öffentlich ist.
- *Settings → Deployment Protection → Vercel Authentication* für Previews **ausschalten**. Sonst kann B die Preview-URLs nicht öffnen, weil sie standardmäßig nur mit Vercel-Login des Projekts sichtbar sind.
- `GEMINI_API_KEY` (und optional `GEMINI_MODEL`) unter *Settings → Environment Variables* für **Production und Preview** eintragen. Ohne `VITE_`-Präfix, wie in ESA 2 begründet.
- Später, mit dem KI-Kontingent (Woche 3), ebenso:
  - `KI_ZUGANGSCODE_SHA512` und optional `KI_TAGESLIMIT` eintragen
  - Upstash Redis über *Storage / Marketplace* verbinden; die Integration setzt die Redis-Variablen selbst. M08 bewertet „Umgebungsvariablen korrekt“.
- **Region der Functions:** `vercel.json` → `"regions": ["fra1"]`. Der Standard ist die US-Ostküste. Frankfurt ist näher an den Landesquellen und verringert das Risiko, dass sie Anfragen aus dem Ausland sperren.
- **Node-Version:** `engines` von `">=22.18"` auf `"24.x"` ändern. Bei `>=` schreibt Vercel eine Warnung ins Build-Log, und M08 3.4 gibt bei Build-Warnungen nur halbe Punkte. CI läuft bereits mit Node 24.
- Auf der Live-URL testen:
  - `/seen/attersee` direkt aufrufen und neu laden: kein 404
  - `/xyz` zeigt die eigene 404-Seite
  - `/api/hydris-salzburg` und `/api/hydro-ooe` liefern Daten
  - KI-Streaming kommt **schrittweise** an und nicht als Block. Vercel puffert Antworten sonst.
- Das **Vercel-Build-Log** ist frei von Warnungen.

**Code Splitting**
- In `App.tsx` alle Seiten mit `lazy(() => import('./seiten/…'))` laden. Ein `<Suspense fallback={<Ladeanimation text="Seite wird geladen …" />}>` kommt im `Layout` um das `<Outlet />`, damit Kopf- und Fußzeile beim Seitenwechsel stehen bleiben.
- Im Build prüfen, ob pro Seite ein eigener Chunk entsteht. Hauptpaket vorher/nachher in `doc/lighthouse.md` notieren.

**Custom Hook in mehr als einer Komponente**
- Neuer Hook `src/hooks/useSeitentitel.ts`: setzt `document.title` („Attersee – Seen im Klimawandel“).
- Jede Seite ruft ihn auf, also mind. 5 Komponenten. Das erfüllt die Anforderung eindeutig und verbessert zugleich die Barrierefreiheit (WCAG 2.4.2 *Page Titled*). Bei einer SPA ändert sich der Titel sonst nie.
- Mit Test. In der README unter „Technische Details“ nennen, zusammen mit `useAI` und `useSeeDaten`.

**Navigation und Layout**
- `Navigation`: auf Mobil untereinander oder umbrechend, ab `min-width: 48rem` in einer Zeile. Ein Hamburger-Menü nur, wenn es nötig ist. Wenn ja, als `<button aria-expanded aria-controls>`, Escape schließt, der Fokus bleibt sinnvoll.
- Touch-Ziele mind. 24 × 24 px (WCAG 2.2, 2.5.8).
- `Layout`: Skip-Link „Zum Inhalt springen“ → `<main id="inhalt" tabIndex={-1}>`.

**KI-Kontingent schützen (serverseitig):** Konzept unten
- Tageszähler in Redis
- Prüfung des Zugangscodes in `api/ki.ts`
- Fehlercodes an `aiStream`/`useAI` weiterreichen
- verständliche Meldungen, die unser Tageslimit vom Gemini-Limit unterscheiden: „Die freien KI-Anfragen für heute sind aufgebraucht“ statt „Gemini hat zu viele Anfragen“
- Tests mit nachgebildetem Redis
- `.env.example` um die neuen Variablen ergänzen: `KI_TAGESLIMIT`, `KI_ZUGANGSCODE_SHA512` und die Redis-Zugangsdaten, mit Kommentar, wie der Hash erzeugt wird

**Lizenzen:** Konzept unten
- Lizenzbericht der Drittsoftware im Build
- SBOM
- Lizenz-Positivliste und `npm audit` in der CI
- Seite `/lizenzen` (lazy), verlinkt in der Fußzeile

**Eigene Seiten responsive und barrierefrei:** siehe Tabelle oben, Definition of Done in Abschnitt 5

**README:**
- Live-URL
- Abschnitt „Deployment“ (Umgebungsvariablen, Region, `vercel.json`)
- Abschnitt „Sicherheit“ (Bedrohungsanalyse: Angreifer, Risiko, Maßnahme, Restrisiko)
- Abschnitt „Nutzungsrechte“
- „Technologien“ und „APIs“ um Vercel und Upstash Redis ergänzen
- „Installation“ um die neuen Umgebungsvariablen ergänzen; lokal geht es weiterhin ohne Redis
- Datenschutzhinweis zur KI ergänzen: Der Zähler speichert nur eine Zahl pro Tag
- App-Screenshots Desktop und Mobil, mit Alt-Text im Markdown
- Endredaktion

### Person B – Grundlayout, Barrierefreiheit, Formulare, Performance, Lighthouse-Messung, Impressum und Datenschutz

**Grundlayout und Barrierefreiheit global (`index.css`, Woche 1–2)**
- **Mobile First**: Basis-Styles für 320 px, Breakpoints mit `min-width` (z. B. `48rem` Tablet, `64rem` Desktop) als Kommentar oben in `index.css` festhalten. Beide verwenden dieselben Breakpoints.
- `rem`/`clamp()` für Schrift und Abstände, Container mit `max-width` und Seitenrand, Fließtext `max-width: 70ch`.
- Lange Wörter umbrechen („Oberösterreich“, Stationsnamen), Tabellen und Diagramm in Containern mit `overflow-x: auto` statt Seiten-Scroll.
- **Kontrast** aller Farbvariablen in **hellem und dunklem Theme** prüfen: Text 4,5:1, große Schrift und UI-Elemente 3:1. Ergebnis als Tabelle in `doc/accessibility-audit.md`.
- `:focus-visible` auf allen interaktiven Elementen sichtbar, auch auf `summary`, Radio, Checkbox, Range und im Diagramm.

**Formular mit Validierung (M08-Pflicht)**
- `BeraterFormular`: Fehler pro Feld anzeigen, nicht nur den Button sperren. Geprüft wird beim Verlassen des Feldes und beim Absenden (M04).
- Fehlertext per `aria-describedby` am Feld, `aria-invalid="true"`, Fokus beim Absenden auf das erste fehlerhafte Feld.
- Regeln: Tag in den nächsten 7 Tagen, Wohnort nur ein Ortsname (Buchstaben, Leerzeichen, Bindestrich; max. 80 Zeichen), Zusatz max. 500 Zeichen.
- Pflichtfelder sichtbar kennzeichnen. Das Sternchen ist `aria-hidden`, dazu der Text „(Pflichtfeld)“ für Screenreader und `aria-required` (M06 5.3). Optionale Felder bleiben als „optional“ beschriftet.
- Mit Tests für die Prüffunktion in `utils/`.

**Freischalt-Formular für den Zugangscode** (Konzept unten)
- Komponente `KiFreischaltung`: Sie erscheint in `KiAntwort`, wenn der Server „Tageskontingent aufgebraucht“ meldet. Damit gilt sie für die Detailseite und den KI-Berater.
- Das Feld hat ein sichtbares Label, ist vom Typ `password` und zeigt den Fehler über `aria-describedby` an. Eine Prüfung im Browser gibt es nur für das Format: nicht leer, Länge und Zeichensatz des Codes.
- Den Code selbst prüft ausschließlich der Server.
- Verständliche Meldungen für die Fälle „Code falsch“ und „Code gültig, Anfrage wird gesendet“.
- Der Code wird nur im `sessionStorage` gehalten, damit man ihn nicht bei jeder Anfrage neu eingeben muss. Nie in `localStorage` und nie in der URL.

**Performance**
- Lighthouse-Hinweise aus der Kategorie *Performance* abarbeiten.
- Hauptpaket klein halten: Die Seiten lädt A bereits lazy. Dazu kommt, das `KlimaDiagramm` erst zu laden, wenn es in den sichtbaren Bereich kommt. Render-blockierende Ressourcen vermeiden.
- Layoutsprünge (CLS) vermeiden: feste Höhe für Diagramm und Ladeanimation.
- Ergebnis im Abschnitt „Performance“ von `doc/lighthouse.md`: Bundle-Größen vorher und nachher, umgesetzte Maßnahmen.

**Datenlizenzen recherchieren** (für die Seite `/lizenzen` von A)
- Lizenz und geforderte Namensnennung für Open-Meteo (CC BY 4.0, bei ERA5 zusätzlich Copernicus), Hydris Salzburg, Hydrographischer Dienst OÖ und die Wikipedia-Stammdaten.
- Mit Quelle und Abrufdatum in `doc/datenlizenzen.md`.

**Impressum und Datenschutz** (Konzept unten)
- Seiten `/impressum` und `/datenschutz` (lazy). Die Links in der Fußzeile setzt A, weil `Layout` A gehört.
- Datenschutzangaben der Anbieter recherchieren: Vercel, Google Gemini (kostenloses Kontingent), Open-Meteo, Upstash. Jeweils Sitz, verarbeitete Daten, Grundlage für eine Übermittlung in Drittländer.
- In `doc/datenschutz-recherche.md` mit Quelle und Abrufdatum festhalten
- A prüft die Datenschutzerklärung im Review fachlich

**Eigene Seiten responsive und barrierefrei**
- `KlimaDiagramm` bei 320 px lesbar: Achsenbeschriftung, Höhe. Die Tabelle bleibt Alternative.
- `KiAntwort`: `aria-live` und die Kennzeichnung „KI-generiert“ bleiben erhalten. Langer Text bricht um.
- `KiBerater`: die Formularfelder untereinander auf Mobil.

**Lighthouse-Messung und Accessibility-Audit**
- Erster Lauf, sobald die Live-URL steht. Zweiter Lauf in Woche 6, finaler Lauf vor der Abgabe. Messanleitung in Abschnitt 6.
- Scores und die Core Web Vitals (LCP, INP bzw. TBT im Labor, CLS) in `doc/lighthouse.md` eintragen (M07 Üb. 1.1). Accessibility-Hinweise gehen als Issue an die zuständige Person.
- axe DevTools oder WAVE auf allen Seiten. Gefundene Probleme als GitHub-Issue an die zuständige Person, Vorher/Nachher in `doc/accessibility-audit.md` (M06 Üb. 5.1).
- Lighthouse-Screenshots in `doc/screenshots/`, in der README mit Alt-Text, der die Scores nennt

**README:**
- Abschnitt „Responsive Design und Barrierefreiheit“
- Abschnitt „Performance“
- Lighthouse-Scores mit Screenshots
- Gegenlesen der Endredaktion

### Gemeinsam

- **Kick-off** (Abschnitt 7): Aufteilung und Breakpoints bestätigen.
- **Gegenseitiger Test:** Jede Person testet die Seiten der **anderen** nur mit Tastatur und bei 320 px. Funde als Issue.
- **Rückblick:** Jede Person schreibt ihren eigenen (max. 200 Wörter) und committet ihn selbst.
- **AI-Doku:** Jede Person ergänzt ihre Zeilen in „Einsatz von AI-Tools“ wie in ESA 2 (Tool mit Zeitraum, wofür, Ergebnis und eigene Prüfung). Dazu kommen konkrete Fälle von übernommenem, verworfenem oder angepasstem KI-Output. Am einfachsten notiert man sie gleich während der Arbeit.

### Konzept: KI-Kontingent und Zugangscode

**Problem:** Die Live-App ist öffentlich. Jede Person, auch ein Skript, kann über `/api/ki` unser Gemini-Kontingent aufbrauchen. Dann funktioniert das KI-Feature ausgerechnet bei der Bewertung nicht mehr.

**Regeln**

| Situation | Verhalten |
|---|---|
| Anfragen 1–10 eines Tages | KI antwortet normal, unabhängig von IP oder Person |
| ab der 11. Anfrage, ohne Code | Server antwortet mit `429` und der Kennung `KONTINGENT_AUFGEBRAUCHT`. Die App erklärt das verständlich und zeigt das Freischalt-Formular. |
| mit gültigem Zugangscode | KI antwortet ohne Tageslimit der App (das Gemini-Limit bleibt) |
| mit falschem Code | `403`, Meldung „Der Zugangscode ist nicht gültig.“ |
| Redis auf Vercel (Produktion und Preview) nicht erreichbar oder nicht konfiguriert | Die KI ist **nur noch mit gültigem Zugangscode** nutzbar. Ohne Code antwortet der Server mit `503` und der Kennung `NUR_MIT_ZUGANGSCODE`, und die App zeigt das Freischalt-Formular mit dem Hinweis, dass die freien Anfragen gerade nicht verfügbar sind (*fail closed* für die freien Anfragen). |

- Ein **Tag** ist ein Kalendertag in Europa/Wien. Gezählt wird jede KI-Anfrage, also jede gestreamte Antwort.
- Das Limit ist über die Umgebungsvariable `KI_TAGESLIMIT` einstellbar, Standard `10`.
- Die Prüfung des Zugangscodes hängt nicht von Redis ab. Sie braucht nur die Umgebungsvariable mit dem Hash. Fällt Redis aus, bleibt die KI über den Code erreichbar.
- Lokal (`npm run dev`, kein `VERCEL_ENV`) gibt es ohne Redis kein Limit, damit niemand beim Entwickeln gesperrt wird.

**Warum Redis:** Vercel Functions haben keinen gemeinsamen Speicher. Ein Zähler im Arbeitsspeicher beginnt bei jeder neuen Instanz und jedem Kaltstart wieder bei 0 und würde nichts begrenzen.
- Wir verwenden **Upstash Redis** über den Vercel Marketplace (kostenloses Kontingent). Die Zugangsdaten setzt Vercel als Umgebungsvariablen.
- Schlüssel `ki:<VERCEL_ENV>:<JJJJ-MM-TT>`. Er wird mit `INCR` atomar erhöht, auch wenn mehrere Anfragen gleichzeitig kommen, und läuft nach 48 h ab.
- Preview und Produktion zählen getrennt.

**Zugangscode**
- **Erzeugen:** 32 Byte aus einem sicheren Zufallsgenerator, als base64url-Text (43 Zeichen):
  `node -e "console.log(require('crypto').randomBytes(32).toString('base64url'))"`
- **Speichern:** Auf dem Server liegt nur der **SHA-512-Hash** des Codes, in der Umgebungsvariable `KI_ZUGANGSCODE_SHA512`. Der Code selbst steht weder im Repository noch in Vercel.
- **Prüfen:** Der Browser schickt den Code über HTTPS im Header `X-KI-Zugangscode`. `api/ki.ts` berechnet SHA-512 und vergleicht mit `crypto.timingSafeEqual`. Die Dauer des Vergleichs verrät so nichts über den Code.
- **Warum SHA-512 hier reicht:** Ein ungesalzener, schneller Hash ist nur sicher, weil der Code 256 Bit Zufall enthält. Ihn durchzuprobieren ist aussichtslos. Für ein von Menschen gewähltes Passwort wäre ein langsames Verfahren mit Salt nötig (Argon2, scrypt). Das steht so in der README. Aus demselben Grund braucht es keine Sperre nach Fehlversuchen.
- **Weitergabe:** Der Code steht nur im **Abgabetext im Online-Campus**. Die README sagt, dass er dort zu finden ist. Wer ihn hat, kann ihn nicht weitergeben, ohne dass wir das am Gemini-Verbrauch sehen. Im Notfall erzeugen wir einen neuen Code und tauschen den Hash in Vercel aus.
- Bestehende Grenzen aus ESA 2 bleiben: höchstens 20 Nachrichten, 20.000 Zeichen und 2048 Tokens pro Anfrage.

**Restrisiko (für die README):** Die ersten 10 Anfragen eines Tages kann jede Person verbrauchen. Das ist gewollt, damit die App ohne Code ausprobiert werden kann. Die Bewertung ist über den Code abgesichert.

### Konzept: Lizenzen und Nutzungsrechte

**Eigener Code: bewusst keine LICENSE-Datei.** Die App und ihr Code dürfen nicht weiterverwendet werden.
- Die README sagt das ausdrücklich im Abschnitt „Nutzungsrechte“: „© 2026 Peter Luckmann, Christoph Hauser. Alle Rechte vorbehalten. Das Repository ist zur Bewertung im Rahmen von SED502 öffentlich einsehbar. Eine Weiterverwendung ist nicht gestattet.“
- Hinweis: Bei öffentlichen Repositories erlauben die GitHub-Nutzungsbedingungen anderen GitHub-Nutzer\*innen trotzdem, den Code auf GitHub anzusehen und zu forken. Mehr erlaubt das nicht.
- Ein privates Repository mit Lesezugriff für die Lehrperson wäre laut M08 ebenfalls zulässig. Es bringt im Vercel-Hobby-Plan aber Einschränkungen bei Deployments aus Commits anderer Personen. Wir bleiben deshalb bei öffentlich.

**Fremder Code: Lizenzpflichten erfüllen.** Geprüft am 05.11.2026:
- Im Bundle stecken 48 Pakete, ausschließlich mit freizügigen Lizenzen: MIT (35), ISC (11), BSD-3-Clause (1) und `victory-vendor` mit MIT, ISC und BSD-3-Clause (1).
- **Kein Copyleft**, also kein Anspruch auf Herausgabe von Quellcode.
- Pflicht ist nur, Copyright-Vermerk und Lizenztext mitzuliefern. Unsere eigene Entscheidung „keine Weiterverwendung“ ändert daran nichts.

| Maßnahme | Umsetzung (A) |
|---|---|
| Lizenzbericht | Der Build erzeugt aus `node_modules` (nur Laufzeit-Abhängigkeiten) eine Liste mit Paket, Version, Lizenz und Lizenztext. Werkzeug: eigenes kleines Skript oder `rollup-plugin-license`, Entscheidung A. |
| Seite `/lizenzen` | Abschnitte: Nutzungsrechte; Drittsoftware aus dem Lizenzbericht; Datenquellen mit Lizenz und Namensnennung (Recherche von B); KI-Anbieter (Gemini, Nutzungsbedingungen des kostenlosen Kontingents). Link in der Fußzeile. |
| SBOM | `npm sbom --omit dev --sbom-format cyclonedx` in der CI, als Artefakt des Laufs gespeichert |
| Lizenzprüfung in der CI | Schlägt fehl, wenn eine Laufzeit-Abhängigkeit nicht auf der Positivliste steht (MIT, ISC, BSD-2-Clause, BSD-3-Clause, Apache-2.0, 0BSD). Gerade bei einem Code ohne freie Lizenz darf nicht unbemerkt eine GPL-Abhängigkeit dazukommen. |
| Sicherheitsprüfung in der CI | `npm audit --omit=dev --audit-level=high` |

### Konzept: Impressum und Datenschutz

Recherchiert am 05.11.2026, keine Rechtsberatung:

| Pflicht | gilt? | Grund |
|---|---|---|
| Impressum nach § 5 E-Commerce-Gesetz | nein | gilt für kommerzielle Websites |
| Offenlegung nach § 25 Mediengesetz | **ja** | gilt für jede Website, auch private; Verstoß bis 20.000 € |
| Datenschutzerklärung (DSGVO Art. 13) | **ja** | Eine öffentliche Website ist keine rein persönliche oder familiäre Tätigkeit (EuGH *Lindqvist*, C-101/01). Die App verarbeitet IP-Adressen und Eingaben. |

**Seite `/impressum`** (Offenlegung nach § 25 MedienG)
- Medieninhaber: Peter Luckmann und Christoph Hauser
- **Wohnort beider Personen, nur die Gemeinde.** § 25 Abs. 5 verlangt Name und Wohnort auch in der verkürzten Form. Der Hinweis auf die FernFH ersetzt den Wohnort nicht. ⬜ **Beide bestätigen**, dass die Gemeinde veröffentlicht werden darf.
- Hinweis: „Diese Anwendung ist eine Einsendeaufgabe (ESA 3) im Modul SED502 Front-End Development der Ferdinand Porsche FernFH, WS 2026/27.“
- Kontakt: „Kontakt zu den Studierenden kann über die Ferdinand Porsche FernFH hergestellt werden.“ Mit Link auf die Kontaktseite der FernFH. Es werden keine privaten Kontaktdaten veröffentlicht.
- Grundlegende Richtung, zur Sicherheit, falls die Seite als „große“ Website gilt: „Studienprojekt; informiert über Wassertemperaturen und Klimadaten von Seen in Salzburg und Oberösterreich.“
- Verweis auf `/datenschutz` und `/lizenzen`

**Seite `/datenschutz`**
- Verantwortliche: beide Personen, Kontakt wie im Impressum über die FernFH
- Hosting **Vercel**: Server-Logs mit IP-Adresse, Zeitpunkt und aufgerufener Adresse. Zweck: Betrieb und Sicherheit. Grundlage: berechtigtes Interesse (Art. 6 Abs. 1 lit. f). Hinweis auf die Übermittlung in die USA.
- **Google Gemini**: Eingaben im KI-Berater sowie die Mess- und Klimadaten, die an die KI gehen. Im kostenlosen Kontingent darf Google sie zur Verbesserung seiner Produkte verwenden. Deshalb die Bitte, keine persönlichen Daten einzugeben (steht so schon im KI-Berater).
- **Open-Meteo**: Der Browser ruft es direkt auf, Open-Meteo erhält dabei die IP-Adresse.
- **Upstash Redis**: nur ein Tageszähler, keine personenbezogenen Daten
- **Speicher im Browser**: Der Zugangscode liegt nur im `sessionStorage` und wird beim Schließen des Tabs gelöscht. Es gibt keine Cookies und kein Tracking, daher auch keinen Cookie-Banner.
- Rechte der Betroffenen (Auskunft, Berichtigung, Löschung, Einschränkung, Widerspruch) und das Beschwerderecht bei der österreichischen Datenschutzbehörde

### Landkarte: entfällt

Im ESA-2-README als optional angekündigt. **Entscheidung: Wir bauen keine Landkarte.** Gründe:
- Leaflet und die Kartenkacheln kosten Performance.
- Die Karte braucht eine Tastaturbedienung und eine Textalternative.
- Sie bringt laut Bewertung keinen Punkt. Die Seenliste ist bereits die barrierefreie Ansicht.

### Abhängigkeiten

| wer braucht | was | von | bis |
|---|---|---|---|
| B | Live-URL auf Vercel (für Lighthouse) | A | So 15.11. |
| A, B | Breakpoints, Abstands- und Farbvariablen in `index.css` | B | So 22.11. |
| B | Skip-Link und `main#inhalt` im Layout | A | So 22.11. |
| A | Datenlizenzen für `/lizenzen` | B | So 06.12. |
| B | Links in der Fußzeile (`Layout`) für Impressum und Datenschutz | A | So 13.12. |

## 5. Definition of Done je Seite

Eine Seite gilt als fertig, wenn:

- [ ] bei 320 px, 768 px und 1280 px kein horizontaler Scrollbalken entsteht und nichts abgeschnitten ist, auch bei 200 % Zoom
- [ ] alle Bedienelemente per Tastatur erreichbar sind, in logischer Reihenfolge, und der Fokus immer sichtbar ist
- [ ] das HTML semantisch ist: Landmarks (`header`, `nav`, `main`, `footer`), `button` für Aktionen und `a`/`Link` für Navigation, Listen als `ul`, Tabellen mit `th`/`caption`, kein „div-Suppe“ (M01, M06)
- [ ] genau eine `h1` vorhanden ist und die Überschriften lückenlos sind
- [ ] die Navigation in alle Richtungen funktioniert, auch Browser-Zurück und -Vor, direkter Aufruf und Neuladen (M08 3.1)
- [ ] der Seitentitel über `useSeitentitel` gesetzt ist
- [ ] Bilder sinnvolle Alt-Texte haben (dekorativ: `alt=""`)
- [ ] Kontraste AA-konform sind, im hellen **und** dunklen Theme
- [ ] loading, success und error benutzerfreundlich aussehen und kein roher Fehlertext erscheint
- [ ] fehlende Messwerte als Text „Wert aktuell nicht vorhanden“ erscheinen, nicht nur über Farbe (Regel aus ESA 2)
- [ ] die Seite per `React.lazy()` geladen wird
- [ ] axe/WAVE ohne Fehler durchläuft
- [ ] der PR-Review auf der Vercel-Preview-URL gemacht wurde

## 6. Lighthouse messen

- **Production-URL** verwenden, nicht `localhost` und nicht die Preview-URL. Bewertet wird die deployte URL, und Previews können eine Vercel-Leiste einblenden, die das Ergebnis verfälscht.
- Chrome im **Inkognito-Fenster** (M07 1.2), DevTools → Lighthouse → Modus *Navigation*, Gerät **Mobile**, danach **Desktop**.
- Gemessen werden Start (`/`), Seen (`/seen`), Detail (`/seen/attersee`) und KI-Berater (`/berater`). Die README zeigt mind. einen Screenshot je Gerät mit Performance **und** Accessibility.
- Scores schwanken. Deshalb 3 Läufe machen und den Median in `doc/lighthouse.md` eintragen, mit Datum.

## 7. Zeitplan

Meilensteine laut Kompendium M08: Grundstruktur 19.12., Kern 02.01., Feinschliff 13.01. Da ESA 2 schon bewertet ist, fangen wir früher an und haben über die Feiertage Puffer.

| Zeitraum | A | B |
|---|---|---|
| bis So 08.11. | Push, Collaborator, Ruleset, PR Planung | Einladung annehmen, Planung reviewen |
| **Kick-off** Mo 09.11. | Aufteilung, Breakpoints | ← gemeinsam |
| Woche 1–2 (09.–22.11.) | Vercel live, Region, Engines, Code Splitting, `useSeitentitel`, Skip-Link | `index.css` Mobile First, Kontraste, Fokus; erster Lighthouse-Lauf |
| Woche 3–4 (23.11.–06.12.) | KI-Kontingent (Redis, Zugangscode, Tests), Navigation mobil | Formularvalidierung, Freischalt-Formular, Datenlizenzen und Datenschutzangaben recherchieren |
| Woche 5–6 (07.–20.12.) | Lizenzbericht, Seite `/lizenzen`, SBOM und Prüfungen in der CI, Links in der Fußzeile, eigene Seiten responsive | Seiten Impressum und Datenschutz, Performance-Optimierung, axe/WAVE-Audit, eigene Seiten responsive, zweiter Lighthouse-Lauf |
| 21.12.–06.01. (Feiertage) | Puffer | Puffer |
| **Feature-Grenze Do 07.01.** | ab hier nur noch Korrekturen | |
| 07.–13.01. | gegenseitiger Test, App-Screenshots, README Deployment, Sicherheit und Nutzungsrechte, Rückblick | gegenseitiger Test, finaler Lighthouse-Lauf, Lighthouse-Screenshots, README Barrierefreiheit und Performance, Rückblick |
| Do 14.01. | README-Endredaktion, Checkliste | Checkliste gegenlesen |
| **Fr 15.01.** | **Abgabe** (ein Tag Puffer vor dem 16.01.) | Abgabe kontrollieren |

## 8. Risiken

| Risiko | Gegenmaßnahme |
|---|---|
| Landesquellen sperren Anfragen von Vercel oder liefern anders als lokal | Gleich nach dem ersten Deployment testen (Woche 1). Region `fra1`. Die App zeigt die andere Quelle weiter an (ESA 2). |
| Gemini-Kontingent (500 Anfragen/Tag) ist durch fremde Aufrufe der öffentlichen URL aufgebraucht, gerade während der Bewertung | Tageslimit 10 und Zugangscode im Abgabetext (Konzept in Abschnitt 4). Free Tier verursacht keine Kosten. |
| Lehrperson findet den Zugangscode nicht oder gibt ihn falsch ein | Die Meldung im Freischalt-Formular verweist auf den Abgabetext. Der Code steht dort deutlich abgesetzt. Am Abgabetag mit dem Code aus dem Abgabetext testen. |
| Upstash nicht erreichbar oder kostenloses Kontingent geändert | KI nur noch mit Zugangscode, mit verständlicher Meldung. Die Bewertung bleibt damit möglich. Früh einrichten (Woche 3), Konfiguration in der README dokumentieren. |
| Open-Meteo-Limit bei vielen gleichzeitigen Nutzer\*innen | Warteschlange und Zwischenspeicher aus ESA 2. Die App meldet das verständlich. |
| Lighthouse-Performance auf Mobil < 70 | Früh messen (Woche 2). Seiten lazy laden, Diagramm erst bei Sicht laden. |
| Vercel puffert den KI-Stream | Auf der Live-URL prüfen. Falls nötig, Header `Cache-Control: no-cache` / `X-Accel-Buffering: no` in `api/ki.ts`. |
| Arbeit oder Commits in ESA 3 unausgeglichen | Aufteilung in Abschnitt 4. Zwischenstand nach Woche 4 mit `git shortlog -sn esa2-abgabe..main` prüfen (nur ESA-3-Commits) und bei Bedarf Aufgaben verschieben. |

## 9. Checkliste vor Abgabe

- [ ] Alle Punkte der Checkliste aus ESA 2 weiterhin erfüllt
- [ ] Live-URL erreichbar. **Am Abgabetag im Inkognito-Fenster** prüfen, auch Unterseiten direkt aufrufen und neu laden.
- [ ] API-Key nur in den Vercel-Umgebungsvariablen, nicht im Repository (`git log --all -- .env` ist leer)
- [ ] `npm run build` lokal **und** im Vercel-Log ohne Fehler und Warnungen; CI grün
- [ ] VS Code: Ansicht *Probleme* leer (TypeScript und ESLint, auch `tests/` und `api/`)
- [ ] `.env.example` enthält alle Variablen; `.env` steht in `.gitignore`
- [ ] In Vercel für Production **und** Preview gesetzt: `GEMINI_API_KEY`, `KI_ZUGANGSCODE_SHA512`, optional `KI_TAGESLIMIT`; Redis-Zugangsdaten über die Upstash-Integration
- [ ] Mind. zwei Seiten per `React.lazy()`; eigener Chunk je Seite im Build
- [ ] Custom Hook in mehr als einer Komponente (`useSeitentitel`, in der README genannt)
- [ ] Formular mit Validierung und Feedback (KI-Berater, Freischalt-Formular)
- [ ] KI-Kontingent auf der Live-URL getestet:
  - [ ] nach 10 Anfragen erscheint das Freischalt-Formular
  - [ ] der Code aus dem Abgabetext funktioniert
  - [ ] ein falscher Code wird abgelehnt
  - [ ] Redis-Ausfall auf einer Preview geprobt (z. B. falsche Redis-URL): ohne Code gesperrt, mit Code nutzbar
- [ ] Im Repository und in Vercel steht nur der SHA-512-Hash, nicht der Zugangscode
- [ ] CI: Lizenzprüfung und `npm audit` grün, SBOM als Artefakt vorhanden
- [ ] Seite `/lizenzen` vollständig: Drittsoftware, Datenlizenzen mit Namensnennung, KI-Anbieter, Nutzungsrechte
- [ ] Keine LICENSE-Datei; „Alle Rechte vorbehalten“ in README und auf `/lizenzen`
- [ ] `/impressum` mit Name und Wohnort beider Personen, FernFH-Hinweis und Kontaktweg; `/datenschutz` vollständig; beide in der Fußzeile jeder Seite verlinkt
- [ ] Mobil ab 320 px und Desktop ohne horizontale Scrollbalken
- [ ] Lighthouse Accessibility ≥ 70 und Performance ≥ 70 auf der Live-URL, Screenshots im Repository
- [ ] Tastaturbedienung, sichtbarer Fokus, Skip-Link auf allen Seiten
- [ ] README:
  - [ ] Titel + 1–3 Sätze
  - [ ] Live-URL klickbar
  - [ ] Screenshots Desktop/Mobil
  - [ ] Lighthouse-Screenshots
  - [ ] alle ESA-2-Abschnitte
  - [ ] Aufgabenverteilung ESA 3
  - [ ] AI-Einsatz ESA 3 (Tool, Zeitraum, wofür, übernommen/verworfen/angepasst)
  - [ ] Technologien, APIs und Installation aktualisiert (Vercel, Upstash, neue Umgebungsvariablen)
  - [ ] alle Bilder mit Alt-Text
  - [ ] Rückblick beider Personen (je max. 200 Wörter)
- [ ] Beide Personen haben erkennbare, gleichwertige ESA-3-Commits
- [ ] Abgabe im Online-Campus:
  - [ ] Repository-URL
  - [ ] Live-URL
  - [ ] Namen beider Personen
  - [ ] Projektbeschreibung in 3–5 Sätzen
  - [ ] **Zugangscode für die KI**, deutlich abgesetzt
