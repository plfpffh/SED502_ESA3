/**
 * Layout.tsx – gemeinsamer Rahmen aller Seiten
 *
 * Kopfzeile mit Navigation, darunter die jeweilige Seite (Outlet), unten die Fußzeile mit den Datenquellen.
 * Der Skip-Link ganz oben führt Tastaturnutzer*innen an der Navigation vorbei direkt zum Inhalt (Kompendium M06 5.3).
 * tabIndex={-1} macht main per Link fokussierbar, ohne es in die Tab-Reihenfolge aufzunehmen.
 * Suspense zeigt die Ladeanzeige, solange eine per React.lazy geladene Seite nachgeladen wird (siehe App.tsx).
 *
 * @project  FERNFH SED502 Frontend Development WS 2026/27 ESA 2: Seen im Klimawandel
 * @author   Peter Luckmann
 */

import { Suspense } from 'react';
import { Outlet } from 'react-router';
import Ladeanimation from './Ladeanimation';
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
        <Suspense fallback={<Ladeanimation text="Seite wird geladen …" />}>
          <Outlet />
        </Suspense>
      </main>
      <footer className="fusszeile">
        <p>
          Daten: Hydris Salzburg, Hydrographischer Dienst Oberösterreich, Open-Meteo. Studienprojekt SED502, FernFH.
        </p>
      </footer>
    </>
  );
}
