import { useEffect, useId, useRef, useState, type FormEvent } from 'react';
import { hatZugangscodeFormat } from '../utils/kiZugang';

interface KiFreischaltungProps {
  codefehler?: string;
  onFreischalten: (code: string) => void;
}

export default function KiFreischaltung({ codefehler, onFreischalten }: KiFreischaltungProps): React.JSX.Element {
  const id = useId();
  const eingabe = useRef<HTMLInputElement>(null);
  const [code, setCode] = useState('');
  const [fehler, setFehler] = useState(codefehler ?? '');

  useEffect(() => {
    eingabe.current?.focus();
  }, []);

  const absenden = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    const wert = code.trim();
    if (!hatZugangscodeFormat(wert)) {
      setFehler(wert ? 'Der Code muss 43 Zeichen lang sein und darf nur Buchstaben, Ziffern, - und _ enthalten.'
        : 'Bitte gib den Zugangscode ein.');
      eingabe.current?.focus();
      return;
    }
    onFreischalten(wert);
  };

  return (
    <form className="kifreischaltung" noValidate onSubmit={absenden}>
      <label htmlFor={id}>KI-Zugangscode</label>
      <p id={`${id}-hinweis`} className="berater__hinweis">Den Code findest du im Abgabetext im Online-Campus.</p>
      <input
        ref={eingabe}
        id={id}
        type="password"
        value={code}
        required
        autoComplete="off"
        aria-invalid={Boolean(fehler)}
        aria-describedby={fehler ? `${id}-hinweis ${id}-fehler` : `${id}-hinweis`}
        onChange={(event) => {
          setCode(event.target.value);
          setFehler('');
        }}
      />
      <p id={`${id}-fehler`} className="berater__feldfehler" aria-live="polite">{fehler}</p>
      <button type="submit">Freischalten und erneut senden</button>
    </form>
  );
}
