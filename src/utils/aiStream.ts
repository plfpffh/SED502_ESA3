/**
 * aiStream.ts – liest die Antwort von /api/ki Chunk für Chunk (Kompendium Modul 05, Abschnitt 3.2)
 *
 * Abweichung vom Kompendium: Der Browser ruft nicht die LLM-API direkt auf, sondern den eigenen Endpunkt /api/ki.
 * Der API-Key bleibt dadurch auf dem Server. /api/ki liefert bereits reinen Text, deshalb wird hier kein
 * anbieterspezifisches SSE-Format gelesen.
 *
 * @project  FERNFH SED502 Frontend Development WS 2026/27 ESA 2: Seen im Klimawandel
 * @author   Peter Luckmann
 */

// mit Endung, weil auch die Tests (Node) diese Datei laden
import type { KiFehlerkennung, Nachricht } from '../typen/ai.ts';
import type { ChatStream } from '../typen/schnittstellen.ts';
import { HttpFehler } from './fetchJSON.ts';
import { leseKiZugangscode, speichereKiZugangscode, verwerfeKiZugangscode } from './kiZugang.ts';

export class KiHttpFehler extends HttpFehler {
  readonly kennung: KiFehlerkennung | null;

  constructor(status: number, meldung: string, kennung: KiFehlerkennung | null) {
    super(status, meldung);
    this.kennung = kennung;
  }
}

function zugangskennung(status: number, kennung: unknown): KiFehlerkennung | null {
  if (status === 429 && kennung === 'KONTINGENT_AUFGEBRAUCHT') return kennung;
  if (status === 503 && kennung === 'NUR_MIT_ZUGANGSCODE') return kennung;
  if (status === 403 && kennung === 'CODE_UNGUELTIG') return kennung;
  return null;
}

async function fehlerAusAntwort(antwort: Response): Promise<KiHttpFehler> {
  try {
    const body: unknown = await antwort.json();
    if (body !== null && typeof body === 'object' && 'fehler' in body && typeof body.fehler === 'string') {
      const kennung = zugangskennung(antwort.status, 'kennung' in body ? body.kennung : null);
      return new KiHttpFehler(antwort.status, body.fehler, kennung);
    }
  } catch {
    // kein JSON
  }
  return new KiHttpFehler(antwort.status, `HTTP Fehler ${antwort.status}`, null);
}

/**
 * Sendet den Verlauf an /api/ki und gibt jeden empfangenen Textteil an onChunk weiter.
 * Ein Abbruch über signal (Button „Abbrechen“) gilt nicht als Fehler, sondern beendet die Antwort mit onFertig.
 */
export const chatStream: ChatStream = async (nachrichten, onChunk, onFertig, onFehler, signal, freischaltung) => {
  try {
    const code = freischaltung?.code ?? leseKiZugangscode();
    const headers = new Headers({ 'Content-Type': 'application/json' });
    if (code) headers.set('X-KI-Zugangscode', code);
    const antwort = await fetch('/api/ki', {
      method: 'POST',
      headers,
      redirect: 'error',
      // an die API gehen nur role und content, nicht die id aus dem lokalen Verlauf
      body: JSON.stringify({ nachrichten: nachrichten.map(({ role, content }) => ({ role, content })) }),
      signal,
    });
    if (!antwort.ok) {
      const fehler = await fehlerAusAntwort(antwort);
      if (code && fehler.kennung === 'CODE_UNGUELTIG') verwerfeKiZugangscode(code);
      throw fehler;
    }

    const reader = antwort.body?.getReader();
    if (!reader) throw new Error('Kein Stream verfügbar.');

    if (freischaltung) {
      speichereKiZugangscode(freischaltung.code);
      freischaltung.onAkzeptiert();
    }

    const decoder = new TextDecoder();
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      // stream: true, damit Umlaute, die auf zwei Chunks verteilt sind, richtig dekodiert werden
      const text = decoder.decode(value, { stream: true });
      if (text) onChunk(text);
    }
    onFertig();
  } catch (fehler: unknown) {
    if (signal?.aborted) {
      onFertig();
      return;
    }
    onFehler(fehler instanceof Error ? fehler : new Error('Unbekannter Fehler.'));
  }
};

/**
 * Übersetzt einen Fehler in eine verständliche Meldung (Kompendium Modul 05, Abschnitt 6.3).
 * Meldungen von /api/ki sind bereits verständlich und werden übernommen, rohe Fehlertexte nie.
 */
export function beschreibeKiFehler(fehler: Error): string {
  if (fehler instanceof HttpFehler) {
    if (fehler.message.startsWith('HTTP Fehler')) {
      return fehler.status === 429
        ? 'Zu viele Anfragen. Bitte einen Moment warten und erneut versuchen.'
        : 'Die KI ist gerade nicht verfügbar. Bitte später erneut versuchen.';
    }
    return fehler.message;
  }
  if (fehler instanceof TypeError) {
    // fetch() wirft TypeError, wenn keine Verbindung besteht oder der Stream abreißt
    return 'Die Verbindung zur KI ist unterbrochen. Bitte die Internetverbindung prüfen und erneut versuchen.';
  }
  return 'Bei der Antwort der KI ist ein Fehler aufgetreten. Bitte erneut versuchen.';
}

/**
 * Baut den Verlauf für die Anfrage: optional die Systemanweisung, dann die letzten maxNachrichten Nachrichten
 * (bei 0 keine).
 * Leere Nachrichten (z.B. eine abgebrochene Antwort ohne Text) werden nicht mitgeschickt.
 */
export function baueVerlauf(verlauf: Nachricht[], systemPrompt: string | undefined, maxNachrichten: number): Nachricht[] {
  // slice(-0) würde alles liefern, deshalb 0 eigens behandeln
  const gekuerzt = maxNachrichten > 0 ? verlauf.filter((n) => n.content.trim() !== '').slice(-maxNachrichten) : [];
  return systemPrompt ? [{ id: 'system', role: 'system', content: systemPrompt }, ...gekuerzt] : gekuerzt;
}
