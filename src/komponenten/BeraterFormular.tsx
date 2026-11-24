/**
 * BeraterFormular.tsx – kontrolliertes Formular des KI-Beraters (Kompendium Modul 04, Abschnitt 6)
 *
 * Der Wunsch liegt als State in der Seite, das Formular zeigt ihn an und meldet Änderungen über onAendern.
 *
 * @project  FERNFH SED502 Frontend Development WS 2026/27 ESA 2: Seen im Klimawandel
 * @author   Christoph Hauser
 */

import { useState, type FormEvent } from 'react';
import { flushSync } from 'react-dom';
import { formatierePrognosetag } from '../utils/format';
import { BERATER_EINGABEFELDER, pruefeBeraterEingaben, type BeraterEingabefeld, type BeraterWunsch } from '../utils/kiBerater';
import { prognoseTage } from '../utils/prognose';

interface BeraterFormularProps {
  wunsch: BeraterWunsch;
  isGesperrt: boolean; // während die KI antwortet
  kannAbsenden: boolean;
  hinweise: string[];
  fehler: string | null;
  onAendern: (wunsch: BeraterWunsch) => void;
  onAbsenden: () => void;
}

export default function BeraterFormular({
  wunsch, isGesperrt, kannAbsenden, hinweise, fehler, onAendern, onAbsenden,
}: BeraterFormularProps): React.JSX.Element {
  const [geprueft, setGeprueft] = useState<Partial<Record<BeraterEingabefeld, boolean>>>({});
  const tage = prognoseTage();
  const eingabefehler = pruefeBeraterEingaben(wunsch, tage);
  const datumFehler = geprueft.datum ? eingabefehler.datum : undefined;
  const wohnortFehler = geprueft.wohnort ? eingabefehler.wohnort : undefined;
  const zusatzFehler = geprueft.zusaetzlicheAngaben ? eingabefehler.zusaetzlicheAngaben : undefined;

  const feldVerlassen = (feld: BeraterEingabefeld): void => {
    setGeprueft((bisher) => ({ ...bisher, [feld]: true }));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    const fehlerBeimAbsenden = pruefeBeraterEingaben(wunsch, prognoseTage());
    const erstesFeld = BERATER_EINGABEFELDER.find((feld) => fehlerBeimAbsenden[feld]);
    if (erstesFeld) {
      const feld = event.currentTarget.elements.namedItem(erstesFeld);
      // Erst fokussieren, wenn der Fehler am Feld angezeigt und für Screenreader verknüpft ist.
      flushSync(() => {
        setGeprueft({ datum: true, wohnort: true, zusaetzlicheAngaben: true });
      });
      if (feld instanceof HTMLElement) feld.focus();
      return;
    }
    if (kannAbsenden && !isGesperrt) onAbsenden();
  };

  return (
    <form className="berater-form" noValidate onSubmit={handleSubmit}>
      <fieldset disabled={isGesperrt}>
        <legend>Dein Ausflug</legend>
        <fieldset className="berater__aktivitaet">
          <legend>Aktivität</legend>
          <label><input type="radio" name="aktivitaet" checked={wunsch.aktivitaet === 'baden'} onChange={() => onAendern({ ...wunsch, aktivitaet: 'baden' })} /> Baden</label>
          <label><input type="radio" name="aktivitaet" checked={wunsch.aktivitaet === 'eissport'} onChange={() => onAendern({ ...wunsch, aktivitaet: 'eissport' })} /> Eissport</label>
        </fieldset>
        <div className="berater-form__raster">
          <div>
            <label htmlFor="berater-tag">
              <span>Ausflugstag <span aria-hidden="true">*</span><span className="unsichtbar"> (Pflichtfeld)</span></span>
              <select
                id="berater-tag"
                name="datum"
                value={tage.includes(wunsch.datum) ? wunsch.datum : ''}
                required
                aria-required="true"
                aria-invalid={Boolean(datumFehler)}
                aria-describedby={datumFehler ? 'berater-tag-fehler' : undefined}
                onChange={(event) => onAendern({ ...wunsch, datum: event.target.value })}
                onBlur={() => feldVerlassen('datum')}
              >
                <option value="" disabled>Bitte auswählen</option>
                {tage.map((tag) => <option key={tag} value={tag}>{formatierePrognosetag(tag)}</option>)}
              </select>
            </label>
            <p id="berater-tag-fehler" className="berater__feldfehler" aria-live="polite">{datumFehler}</p>
          </div>
          <label htmlFor="berater-region">Region
            <select id="berater-region" value={wunsch.bundesland} onChange={(event) => onAendern({ ...wunsch, bundesland: event.target.value as BeraterWunsch['bundesland'] })}>
              <option value="alle">Salzburg und Oberösterreich</option>
              <option value="Salzburg">Salzburg</option>
              <option value="Oberösterreich">Oberösterreich</option>
            </select>
          </label>
        </div>
        <div>
          <label htmlFor="berater-wohnort">Wohnort (optional, nur Ortsname)
            <input
              id="berater-wohnort"
              name="wohnort"
              type="text"
              autoComplete="off"
              value={wunsch.wohnort}
              aria-invalid={Boolean(wohnortFehler)}
              aria-describedby={wohnortFehler ? 'wohnort-hinweis wohnort-fehler' : 'wohnort-hinweis'}
              onChange={(event) => onAendern({ ...wunsch, wohnort: event.target.value })}
              onBlur={() => feldVerlassen('wohnort')}
            />
          </label>
          <p id="wohnort-hinweis" className="berater__hinweis">Der Wohnort dient nur als Kontext. Es werden keine Entfernungen und Fahrzeiten ermittelt.</p>
          <p id="wohnort-fehler" className="berater__feldfehler" aria-live="polite">{wohnortFehler}</p>
        </div>
        <div>
          <label htmlFor="berater-zusatz">Zusätzliche Angaben:
            <textarea
              id="berater-zusatz"
              name="zusaetzlicheAngaben"
              rows={3}
              value={wunsch.zusaetzlicheAngaben}
              aria-invalid={Boolean(zusatzFehler)}
              aria-describedby={zusatzFehler ? 'zusatz-hinweis zusatz-fehler' : 'zusatz-hinweis'}
              onChange={(event) => onAendern({ ...wunsch, zusaetzlicheAngaben: event.target.value })}
              onBlur={() => feldVerlassen('zusaetzlicheAngaben')}
            />
          </label>
          <p id="zusatz-hinweis" className="berater__hinweis">Optional (max. 500 Zeichen)</p>
          <p id="zusatz-fehler" className="berater__feldfehler" aria-live="polite">{zusatzFehler}</p>
        </div>
        <p className="berater__hinweis">Bitte keine persönlichen Daten eingeben.</p>
        {fehler && <p role="alert">{fehler}</p>}
        {hinweise.map((hinweis) => <p key={hinweis}>{hinweis}</p>)}
        <button type="submit" disabled={!kannAbsenden}>Empfehlung anfordern</button>
      </fieldset>
    </form>
  );
}
