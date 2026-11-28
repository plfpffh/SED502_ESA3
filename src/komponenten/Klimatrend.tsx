/**
 * Klimatrend.tsx – Abschnitt „Klimatrend“ der Detailseite: Frosttage pro Winter ab 1950
 *
 * Die Grafik (Recharts) wird erst bei Sichtbarkeit und vorhandenen Daten geladen.
 * Erklärung, Datentabelle und Platz für die Grafik sind bereits vorher verfügbar.
 *
 * @project  FERNFH SED502 Frontend Development WS 2026/27 ESA 2: Seen im Klimawandel
 * @author   Christoph Hauser
 */

import { lazy, Suspense, useEffect, useId, useRef, useState } from 'react';
import type { FrosttageWinter } from '../typen/klima';
import { frosttageVerlauf, letzterAbgeschlossenerWinter } from '../utils/klima';
import FehlerMeldung from './FehlerMeldung';
import Ladeanimation from './Ladeanimation';

const KlimaDiagramm = lazy(() => import('./KlimaDiagramm'));

interface KlimatrendProps {
  seeName: string;
  frosttage: FrosttageWinter[];
  isLaden: boolean;
  fehler: string | null;
  onNeuLaden: () => void;
}

export default function Klimatrend({ seeName, frosttage, isLaden, fehler, onNeuLaden }: KlimatrendProps): React.JSX.Element {
  const id = useId();
  const grafikRef = useRef<HTMLDivElement>(null);
  const [istSichtbar, setIstSichtbar] = useState(() => typeof IntersectionObserver === 'undefined');
  const daten = frosttage.length > 0 ? frosttageVerlauf(frosttage, 1950, letzterAbgeschlossenerWinter()) : [];

  useEffect(() => {
    const grafik = grafikRef.current;
    if (istSichtbar || !grafik) return;

    const observer = new IntersectionObserver((eintraege) => {
      if (eintraege.some((eintrag) => eintrag.isIntersecting)) {
        setIstSichtbar(true);
        observer.disconnect();
      }
    });
    observer.observe(grafik);
    return () => observer.disconnect();
  }, [istSichtbar]);

  return (
    <section aria-labelledby="klimatrend-titel">
      <h2 id="klimatrend-titel">Klimatrend</h2>
      <figure className="klimadiagramm" aria-labelledby={`${id}-titel`} aria-describedby={`${id}-hinweis`}>
        <figcaption id={`${id}-titel`}>Frosttage pro Winter – {seeName}</figcaption>
        <p id={`${id}-hinweis`}>
          Ein Tag gilt als Frosttag, wenn er ein Tagesminimum der Lufttemperatur unter 0 °C aufweist. Der Winter umfasst Dezember bis Februar.
          Fehlende Werte erscheinen als Lücke.
        </p>

        {fehler && <FehlerMeldung meldung={fehler} onErneutVersuchen={onNeuLaden} />}
        <div ref={grafikRef} className="klimadiagramm__grafik">
          {isLaden && <Ladeanimation text="Klimatrend wird geladen …" />}
          {!isLaden && frosttage.length === 0 && <p>Für diesen See sind keine Klimadaten verfügbar.</p>}
          {!isLaden && frosttage.length > 0 && istSichtbar && (
            <Suspense fallback={<Ladeanimation text="Diagramm wird geladen …" />}>
              <KlimaDiagramm seeName={seeName} frosttage={frosttage} />
            </Suspense>
          )}
        </div>

        <p className="klimadiagramm__hinweis">Für die Bedienung des Diagramms mit der Tastatur: Mit Tab ins Diagramm wechseln und mit den Pfeiltasten navigieren.</p>
        <details>
          <summary>Frosttage als Tabelle anzeigen</summary>
          <div className="klimadiagramm__tabelle" role="region" aria-label={`Frosttage-Tabelle für ${seeName}`} tabIndex={0}>
            <table>
              <caption>Frosttage pro Winter – {seeName}</caption>
              <thead>
                <tr><th scope="col">Winter</th><th scope="col">Frosttage</th></tr>
              </thead>
              <tbody>
                {daten.map((punkt) => (
                  <tr key={punkt.winter}>
                    <th scope="row">{punkt.winter}</th>
                    <td>{punkt.frosttage ?? 'Wert aktuell nicht vorhanden'}</td>
                  </tr>
                ))}
                {daten.length === 0 && (
                  <tr><td colSpan={2}>{isLaden ? 'Daten werden geladen …' : 'Wert aktuell nicht vorhanden'}</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </details>
        <p className="klimadiagramm__hinweis">
          Daten: <a href="https://open-meteo.com/en/docs/historical-weather-api">Open-Meteo</a> (ERA5-Reanalysedaten).
        </p>
      </figure>
    </section>
  );
}
