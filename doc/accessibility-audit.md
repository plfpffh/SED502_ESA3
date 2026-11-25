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

Der vollständige Audit mit axe oder WAVE sowie die Lighthouse-Messung folgen separat.

[WCAG 2.2 – Textkontrast](https://www.w3.org/TR/WCAG22/#contrast-minimum) · [Kontrast von Bedienelementen und Grafiken](https://www.w3.org/TR/WCAG22/#non-text-contrast) · [Sichtbarer Fokus](https://www.w3.org/TR/WCAG22/#focus-visible)
