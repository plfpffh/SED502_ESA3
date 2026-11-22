/**
 * Layout.tsx – gemeinsamer Rahmen aller Seiten
 *
 * Kopfzeile mit Navigation, darunter die jeweilige Seite (Outlet), unten die Fußzeile mit den Datenquellen.
 * Der Skip-Link ganz oben führt Tastaturnutzer*innen an der Navigation vorbei direkt zum Inhalt (Kompendium M06 5.3).
 * tabIndex={-1} macht main per Link fokussierbar, ohne es in die Tab-Reihenfolge aufzunehmen.
 *
 * @project  FERNFH SED502 Frontend Development WS 2026/27 ESA 2: Seen im Klimawandel
 * @author   Peter Luckmann
 */

import { Outlet } from 'react-router';
import Navigation from './Navigation';

export default function Layout(): React.JSX.Element {
  return (
    <>
      <a className="skip-link" href="#inhalt">
        Zum Inhalt springen
      </a>
      <header className="kopfzeile">
        <p className="app-name">Seen im Klimawandel</p>
        <Navigation />
      </header>
      <main id="inhalt" tabIndex={-1}>
        <Outlet />
      </main>
      <footer className="fusszeile">
        <p>
          Daten: Hydris Salzburg, Hydrographischer Dienst Oberösterreich, Open-Meteo. Studienprojekt SED502, FernFH.
        </p>
      </footer>
    </>
  );
}
