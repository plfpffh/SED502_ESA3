/**
 * useSeitentitel.ts – setzt den Titel im Browser-Tab für die aktuelle Seite
 *
 * In einer Single Page Application ändert sich document.title beim Seitenwechsel nicht von selbst. Screenreader
 * lesen den Titel beim Seitenwechsel vor, und im Tab sieht man, wo man ist (WCAG 2.4.2 Page Titled).
 * Den Seitentitel zu ändern ist ein Seiteneffekt, daher useEffect mit Cleanup (Kompendium M04 4.1 und 4.5).
 *
 * @project  FERNFH SED502 Frontend Development WS 2026/27 ESA 3: Seen im Klimawandel
 * @author   Peter Luckmann
 */

import { useEffect } from 'react';
import { STANDARD_TITEL, seitentitel } from '../utils/seitentitel';

/** Setzt den Titel, solange die Seite angezeigt wird; ohne Seitennamen den Standardtitel (Startseite). */
export function useSeitentitel(seite?: string): void {
  useEffect(() => {
    document.title = seitentitel(seite);
    // Cleanup: Beim Verlassen der Seite den Standardtitel setzen, damit während des Ladens der nächsten Seite
    // (React.lazy) nicht der alte Titel stehen bleibt.
    return () => {
      document.title = STANDARD_TITEL;
    };
  }, [seite]);
}
