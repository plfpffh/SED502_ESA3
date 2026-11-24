/**
 * seitentitel.ts – Text für den Titel im Browser-Tab
 *
 * Jede Seite hat einen eigenen Titel (WCAG 2.4.2 Page Titled). Gesetzt wird er vom Hook useSeitentitel.
 *
 * @project  FERNFH SED502 Frontend Development WS 2026/27 ESA 3: Seen im Klimawandel
 * @author   Peter Luckmann
 */

export const APP_NAME = 'Seen im Klimawandel';

/** Titel der Startseite, derselbe wie in index.html. */
export const STANDARD_TITEL = `${APP_NAME} – Salzburg & Oberösterreich`;

/** „Attersee – Seen im Klimawandel“; ohne Seitennamen (Startseite) der Standardtitel. */
export function seitentitel(seite?: string): string {
  const name = seite?.trim();
  return name ? `${name} – ${APP_NAME}` : STANDARD_TITEL;
}
