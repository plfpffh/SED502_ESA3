/**
 * useAI.ts – Verlauf, Streaming-Zustand und Fehler eines KI-Chats (Kompendium Modul 05, Abschnitt 4.1)
 *
 * Wie im Kompendium, mit drei Ergänzungen (README: Einsatz von AI-Tools, In der App):
 *  - abbrechen() beendet eine laufende Antwort (AbortController), der bisher empfangene Text bleibt stehen
 *  - jede Nachricht hat eine stabile id als React-Listenkey
 *  - Fehler werden mit beschreibeKiFehler() in verständliche Meldungen übersetzt
 * Verwendet in SeeDetail und in useBeraterAnfrage (KI-Berater), beides von Christoph Hauser (Person B).
 *
 * @project  FERNFH SED502 Frontend Development WS 2026/27 ESA 2: Seen im Klimawandel
 * @author   Peter Luckmann
 */

import { useCallback, useEffect, useRef, useState } from 'react';
import type { KiFehler, KiZugangStatus, Nachricht } from '../typen/ai';
import type { UseAI } from '../typen/schnittstellen';
import { baueVerlauf, beschreibeKiFehler, chatStream, KiHttpFehler } from '../utils/aiStream';

export const useAI: UseAI = (optionen = {}) => {
  const { systemPrompt, maxNachrichten = 20 } = optionen;

  const [nachrichten, setNachrichten] = useState<Nachricht[]>([]);
  const [isStreaming, setIsStreaming] = useState<boolean>(false);
  const [fehler, setFehler] = useState<KiFehler | null>(null);
  const [zugangStatus, setZugangStatus] = useState<KiZugangStatus>(null);
  const controllerRef = useRef<AbortController | null>(null);

  // Seite verlassen: laufende Antwort abbrechen
  useEffect(() => () => controllerRef.current?.abort(), []);

  const sendeNachricht = useCallback(
    async (inhalt: string, zugangscode?: string): Promise<void> => {
      if (!inhalt.trim() || isStreaming) return;

      const frage: Nachricht = { id: crypto.randomUUID(), role: 'user', content: inhalt.trim() };
      const antwortId = crypto.randomUUID();
      const verlauf = baueVerlauf([...nachrichten, frage], systemPrompt, maxNachrichten);

      // leere Antwort vorbereiten, in die der Stream schreibt
      setNachrichten((alt) => [...alt, frage, { id: antwortId, role: 'assistant', content: '' }]);
      setFehler(null);
      setZugangStatus(zugangscode ? 'wird-geprueft' : null);
      setIsStreaming(true);

      const controller = new AbortController();
      controllerRef.current = controller;
      // eine Antwort ohne Text (Abbruch vor dem ersten Chunk, Fehler) wird entfernt, ein Teil der Antwort bleibt
      const beenden = (): void => {
        setNachrichten((alt) => alt.filter((n) => n.id !== antwortId || n.content !== ''));
        setIsStreaming(false);
        setZugangStatus((status) => status === 'wird-geprueft' ? null : status);
      };

      await chatStream(
        verlauf,
        (text) =>
          setNachrichten((alt) => alt.map((n) => (n.id === antwortId ? { ...n, content: n.content + text } : n))),
        beenden,
        (err) => {
          setFehler({
            meldung: beschreibeKiFehler(err),
            kennung: err instanceof KiHttpFehler ? err.kennung : null,
          });
          beenden();
        },
        controller.signal,
        zugangscode ? { code: zugangscode, onAkzeptiert: () => setZugangStatus('akzeptiert') } : undefined,
      );
      if (controllerRef.current === controller) controllerRef.current = null;
    },
    [nachrichten, isStreaming, systemPrompt, maxNachrichten],
  );

  const abbrechen = useCallback((): void => {
    controllerRef.current?.abort();
  }, []);

  const zuruecksetzen = useCallback((): void => {
    controllerRef.current?.abort();
    setNachrichten([]);
    setFehler(null);
    setZugangStatus(null);
    setIsStreaming(false);
  }, []);

  return { nachrichten, isStreaming, fehler, zugangStatus, sendeNachricht, abbrechen, zuruecksetzen };
};
