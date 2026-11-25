/**
 * App.tsx – Routen der Anwendung
 *
 * Alle Seiten liegen unter einem gemeinsamen Layout (Kopfzeile mit Navigation, Fußzeile).
 * Code Splitting (Kompendium M07 2.2): Jede Seite wird mit React.lazy erst geladen, wenn sie aufgerufen wird,
 * und landet im Build in einem eigenen Chunk. Das Suspense mit der Ladeanzeige liegt im Layout um das Outlet,
 * damit Kopf- und Fußzeile beim Seitenwechsel stehen bleiben.
 *
 * @project  FERNFH SED502 Frontend Development WS 2026/27 ESA 2: Seen im Klimawandel
 * @author   Peter Luckmann
 */

import { lazy } from 'react';
import { Route, Routes } from 'react-router';
import Layout from './komponenten/Layout';

const Startseite = lazy(() => import('./seiten/Startseite'));
const Seenliste = lazy(() => import('./seiten/Seenliste'));
const SeeDetail = lazy(() => import('./seiten/SeeDetail'));
const KiBerater = lazy(() => import('./seiten/KiBerater'));
const Impressum = lazy(() => import('./seiten/Impressum'));
const Datenschutz = lazy(() => import('./seiten/Datenschutz'));
const NichtGefunden = lazy(() => import('./seiten/NichtGefunden'));

export default function App(): React.JSX.Element {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Startseite />} />
        <Route path="seen" element={<Seenliste />} />
        <Route path="seen/:id" element={<SeeDetail />} />
        <Route path="berater" element={<KiBerater />} />
        <Route path="impressum" element={<Impressum />} />
        <Route path="datenschutz" element={<Datenschutz />} />
        <Route path="*" element={<NichtGefunden />} />
      </Route>
    </Routes>
  );
}
