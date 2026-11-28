# Accessibility-Audit

## Farbkontrast und Tastaturfokus (24.11.2026)

Die Kontrastwerte sind aus den CSS-Farben nach WCAG 2.2 berechnet. Wo zwei Werte stehen, beziehen sie sich auf den Seitenhintergrund und die getönte Fläche, in dieser Reihenfolge. Normaler Text braucht mindestens 4,5:1. Für große Schrift und visuelle Merkmale, die zum Erkennen von Bedienelementen oder Grafiken nötig sind, gilt 3:1.

| Verwendung | Hell vorher → nachher | Dunkel vorher → nachher |
| --- | --- | --- |
| Normaler Text | 14,76 / 13,46 | 14,42 / 12,54 |
| Dezenter Text und Achsenbeschriftungen | 6,46 / 5,89 | 7,15 / 6,21 |
| Akzent für Links, Fokusrahmen und Diagrammlinie | 7,43 / 6,78 | 9,07 / 7,89 |
| Rahmen der Beraterfelder und Diagrammachsen | 1,31 / 1,19 → 4,73 / 4,32 | 1,66 / 1,44 → 5,53 / 4,81 |
| Fehlerrand auf dem Seitenhintergrund | 6,57 → 6,57 | 2,72 → 7,73 |

Alle Tabellenwerte sind Kontrastverhältnisse zu 1. Unveränderte Farben stehen einmal in der Tabelle. Seitenhintergrund und getönte Fläche unterscheiden sich um 1,10:1 im hellen und 1,15:1 im dunklen Design. Die helleren Zierlinien an Karten und Tabellen sowie das Hilfsraster im Diagramm bleiben dezent. Feldgrenzen und Diagrammachsen haben eine eigene, kontrastreichere Farbe.

Bei 320 px war im Browser mit nachgebildeten Messdaten der Fokus auf Sprunglink, Navigation und Filtern sichtbar. Dazu gehörten Auswahlfelder, Radiobutton, Checkbox und Temperaturregler. Im dunklen Design war der Fokus auch auf den Feldern und Buttons des KI-Beraters sichtbar.

Der Fokusrahmen des Klimadiagramms liegt jetzt innerhalb der Grafik. Er war in beiden Farbschemata sichtbar. Die Pfeiltaste wechselte den angezeigten Winter. Die Datentabelle ließ sich per Enter öffnen und per Tab fokussieren.

Die erste Lighthouse-Messung vom 28.11.2026 steht in [lighthouse.md](lighthouse.md). Der folgende Abschnitt ergänzt diesen Stand um eine Prüfung mit axe.

[WCAG 2.2 – Textkontrast](https://www.w3.org/TR/WCAG22/#contrast-minimum) · [Kontrast von Bedienelementen und Grafiken](https://www.w3.org/TR/WCAG22/#non-text-contrast) · [Sichtbarer Fokus](https://www.w3.org/TR/WCAG22/#focus-visible)

## Zwischenstand mit axe am 28.11.2026

Geprüft wurde der lokale Produktions-Build von `02781c9` auf dem Branch `feature/b-accessibility-audit`, abgezweigt von `feature/b-performance`. Die noch ausstehenden Seiten und Änderungen von Person A werden nach ihrer Integration erneut geprüft.

### Durchführung

- Chrome 158, Node 26.13.1 und **axe-core 4.14.0**, ausgeführt über Playwright im Browser. Die Prüfung verwendet die axe-API. Die Browser-Erweiterung axe DevTools wurde dabei nicht verwendet.
- WCAG 2.0 A/AA, 2.1 A/AA, 2.2 AA und Best Practices über die Tags `wcag2a`, `wcag2aa`, `wcag21a`, `wcag21aa`, `wcag22aa` und `best-practice`.
- **320 × 800 und 1280 × 800 px**, jeweils helles und dunkles Farbschema.
- Reproduzierbare, nachgebildete Wasser-, Wetter- und Klimadaten. Die KI-Antworten und Zugangscodes waren Testdaten. Es wurden keine Anfragen an Gemini gesendet.
- Sieben Seiten mit je vier Ansichten ergeben **28 Basisprüfungen**. Die Hauptprüfreihe umfasste mit geöffneten und fehlerhaften Zuständen **60 axe-Prüfungen**. Dazu kommen 28 Prüfungen von Sprunglink und Tab-Reihenfolge sowie die gezielte SVG-Kontrastnachprüfung.

axe prüft gerenderte Inhalte. Deshalb wurden zusätzliche Zustände gezielt geöffnet und erneut geprüft. Das Vorgehen und die verwendeten Regel-Tags beschreibt die [offizielle axe-API-Dokumentation](https://github.com/dequelabs/axe-core/blob/develop/doc/API.md).

### Ergebnis

| Seite | Geprüfte Zustände | axe-Prüfungen | Bestätigte Verstöße |
| --- | --- | ---: | ---: |
| Start `/` | geladene Seite | 4 | 0 |
| Seen `/seen` | Baden, Eissport-Filter, offene Messstellen | 12 | 0 |
| Detail `/seen/attersee` | geladene Grafik, offene Frosttage-Tabelle, KI-Freischaltung | 12 | 0 |
| KI-Berater `/berater` | geladen, ungültiger Wohnort, leerer und falscher Zugangscode, lange KI-Antwort | 20 | 0 |
| Impressum `/impressum` | vorhandenes Beispielimpressum | 4 | 0 |
| Datenschutz `/datenschutz` | vorhandener Entwurf | 4 | 0 |
| Unbekannte Adresse `/unbekannt` | 404-Seitenkomponente | 4 | 0 |

Alle 60 Zustände hatten keine horizontalen Scrollbalken und keine bestätigten axe-Verstöße. Die [maschinenlesbare Ergebnisübersicht](axe-ergebnisse.json) enthält die Zustände, Regelanzahlen, Hinweise zur Nachprüfung sowie Tastatur- und Kontrastergebnisse.

### SVG-Kontrast nachgeprüft

Bei den zwölf Detailseiten-Prüfungen meldete axe `color-contrast` als **manuell zu prüfen**. Die Hintergrundfarbe unter den SVG-Achsenbeschriftungen konnte wegen des SVG-Bildelements nicht automatisch bestimmt werden. Der Hinweis blieb in der Ergebnisübersicht erhalten.

Die tatsächlich gerenderten Text- und Hintergrundfarben wurden bei beiden Breiten aus dem Browser gelesen und nach WCAG berechnet.

| Farbschema | Achsenbeschriftung | Hintergrund | Kontrast | Anforderung für kleinen Text |
| --- | --- | --- | ---: | ---: |
| Hell | `#52606d` | `#ffffff` | 6,46:1 | 4,5:1 |
| Dunkel | `#9aa5b1` | `#12181d` | 7,15:1 | 4,5:1 |

Beide Farbschemata erfüllen die Textkontrast-Anforderung. Die gerenderten Diagramme wurden bei 320 px zusätzlich visuell auf lesbare Beschriftung und sichtbaren Fokus geprüft. Dafür war keine Codeänderung erforderlich.

### Tastatur und Bedienung

- Der Sprunglink führte auf allen sieben Seiten in beiden Breiten und Farbschemata zum fokussierten Hauptinhalt.
- Die Tab-Reihenfolge erreichte die vorhandenen Links und aktivierbaren Bedienelemente. Bei den durchlaufenen Tabstopps war der Fokusrahmen gesetzt. Die Reihenfolge ließ sich bis zum Dokumentende durchlaufen.
- In der Seenliste wechselten die Pfeiltasten zwischen Baden und Eissport. Checkboxen, Temperaturregler, Zurücksetzen und die Messstellen-Aufklapper waren bedienbar.
- Im Diagramm wechselte die Pfeiltaste den angezeigten Winter. Die Frosttage-Tabelle ließ sich mit Enter öffnen und ihr Scrollbereich fokussieren.
- Ein ungültiger Wohnort beim Absenden führte zurück zum fehlerhaften Feld. Die Freischaltung wurde mit leerem, formal gültigem falschem und akzeptiertem Testcode geprüft. Lange KI-Texte brachen bei 320 px um.

### Noch offen

- Nach den weiteren Änderungen von Person A die ergänzten Seiten, Navigation und Footer erneut prüfen. Die geplante Lizenzseite und die Footer-Links zu den rechtlichen Seiten waren im geprüften Stand noch nicht vorhanden.
- Den Abschlussaudit auf dem fertig deployten Stand durchführen. Dazu die fertigen Seiten in axe DevTools oder WAVE öffnen und die manuell zu prüfenden Punkte bewerten.
- Die Bedienung und Ansagen mit einem tatsächlichen Screenreader sowie die gegenseitigen Tests durch beide Personen stehen noch aus. Dieser Zwischenstand umfasst automatisierte axe-Prüfungen, rechnerische Kontrastprüfung, visuelle Kontrolle des Diagramms und Browsersteuerung per Tastatur.
