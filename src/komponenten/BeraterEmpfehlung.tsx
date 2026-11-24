/**
 * BeraterEmpfehlung.tsx – Abschnitt „KI-Empfehlung“ des KI-Beraters
 *
 * Die Seite rendert den Abschnitt pro Anfrage neu (key). Beim Erscheinen bekommt er den Fokus,
 * damit Tastatur- und Screenreader-Nutzer*innen direkt bei der Antwort landen.
 *
 * @project  FERNFH SED502 Frontend Development WS 2026/27 ESA 2: Seen im Klimawandel
 * @author   Christoph Hauser
 */

import { useEffect, useRef } from 'react';
import type { KiFehler, KiZugangStatus } from '../typen/ai';
import { formatierePrognosetag } from '../utils/format';
import type { BeraterWunsch } from '../utils/kiBerater';
import KiAntwort from './KiAntwort';

interface BeraterEmpfehlungProps {
  anfrage: BeraterWunsch;
  text: string;
  isStreaming: boolean;
  fehler: KiFehler | null;
  zugangStatus: KiZugangStatus;
  abgebrochen: boolean;
  onAbbrechen: () => void;
  onErneutVersuchen: (zugangscode?: string) => void;
}

export default function BeraterEmpfehlung({
  anfrage, text, isStreaming, fehler, zugangStatus, abgebrochen, onAbbrechen, onErneutVersuchen,
}: BeraterEmpfehlungProps): React.JSX.Element {
  const abschnittRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const abschnitt = abschnittRef.current;
    if (abschnitt && !abschnitt.contains(document.activeElement)) abschnitt.focus();
  }, []);

  const region = anfrage.bundesland === 'alle' ? 'Salzburg und Oberösterreich' : anfrage.bundesland;
  return (
    <section className="kieinschaetzung" aria-labelledby="berater-antwort-titel" ref={abschnittRef} tabIndex={-1}>
      <h2 id="berater-antwort-titel">KI-Empfehlung</h2>
      <p>
        Für {anfrage.aktivitaet === 'baden' ? 'Baden' : 'Eissport'} am {formatierePrognosetag(anfrage.datum)}, Region: {region}.
        Datengrundlage vom Anfragezeitpunkt.
      </p>
      <KiAntwort text={text} isStreaming={isStreaming} fehler={fehler} zugangStatus={zugangStatus} abgebrochen={abgebrochen}
        onAbbrechen={onAbbrechen} onErneutVersuchen={onErneutVersuchen} />
    </section>
  );
}
