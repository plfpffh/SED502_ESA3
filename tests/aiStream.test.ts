import assert from 'node:assert/strict';
import { test, type TestContext } from 'node:test';
import { baueVerlauf, beschreibeKiFehler, chatStream, KiHttpFehler } from '../src/utils/aiStream.ts';
import { HttpFehler } from '../src/utils/fetchJSON.ts';
import { hatZugangscodeFormat, KI_ZUGANGSSCHLUESSEL } from '../src/utils/kiZugang.ts';
import type { Nachricht } from '../src/typen/ai.ts';

const frage: Nachricht = { id: '1', role: 'user', content: 'Wo kann ich baden?' };

function textAntwort(chunks: Uint8Array[]): Response {
  return new Response(new ReadableStream<Uint8Array>({
    start(controller) {
      for (const chunk of chunks) controller.enqueue(chunk);
      controller.close();
    },
  }));
}

/** Ruft chatStream auf und sammelt, welche Callbacks mit was aufgerufen wurden. */
async function sammle(signal?: AbortSignal, freischaltung?: Parameters<typeof chatStream>[5]) {
  const ergebnis = { text: '', fertig: 0, fehler: null as Error | null };
  await chatStream([frage], (t) => { ergebnis.text += t; }, () => { ergebnis.fertig++; }, (f) => { ergebnis.fehler = f; }, signal, freischaltung);
  return ergebnis;
}

function sitzungsspeicher(t: TestContext): Map<string, string> {
  const vorher = Object.getOwnPropertyDescriptor(globalThis, 'sessionStorage');
  const daten = new Map<string, string>();
  Object.defineProperty(globalThis, 'sessionStorage', {
    configurable: true,
    value: {
      getItem: (key: string) => daten.get(key) ?? null,
      setItem: (key: string, wert: string) => { daten.set(key, wert); },
      removeItem: (key: string) => { daten.delete(key); },
    },
  });
  t.after(() => {
    if (vorher) Object.defineProperty(globalThis, 'sessionStorage', vorher);
    else Reflect.deleteProperty(globalThis, 'sessionStorage');
  });
  return daten;
}

test('sendet nur role und content an /api/ki und setzt den Text zusammen', async (t) => {
  // „ü“ ist in UTF-8 zwei Bytes und hier auf zwei Chunks verteilt
  const bytes = new TextEncoder().encode('Grüß Gott');
  const abruf = t.mock.method(globalThis, 'fetch', async () => textAntwort([bytes.slice(0, 3), bytes.slice(3)]));
  const ergebnis = await sammle();

  assert.deepEqual(ergebnis, { text: 'Grüß Gott', fertig: 1, fehler: null });
  const [url, optionen] = abruf.mock.calls[0].arguments as [string, RequestInit];
  assert.equal(url, '/api/ki');
  assert.deepEqual(JSON.parse(String(optionen.body)), { nachrichten: [{ role: 'user', content: 'Wo kann ich baden?' }] });
});

test('Fehlerantwort von /api/ki: Meldung des Servers wird übernommen', async (t) => {
  t.mock.method(globalThis, 'fetch', async () => Response.json({ fehler: 'Die KI ist gerade ausgelastet.' }, { status: 429 }));
  const ergebnis = await sammle();
  assert.ok(ergebnis.fehler instanceof HttpFehler);
  assert.ok(ergebnis.fehler instanceof KiHttpFehler && ergebnis.fehler.kennung === null);
  assert.equal(beschreibeKiFehler(ergebnis.fehler), 'Die KI ist gerade ausgelastet.');
  assert.equal(ergebnis.fertig, 0);
});

test('KI-Kontingent: Nur passende Statuscodes und Kennungen lösen die Freischaltung aus', async (t) => {
  const faelle = [
    { status: 429, kennung: 'KONTINGENT_AUFGEBRAUCHT', erwartet: 'KONTINGENT_AUFGEBRAUCHT' },
    { status: 503, kennung: 'NUR_MIT_ZUGANGSCODE', erwartet: 'NUR_MIT_ZUGANGSCODE' },
    { status: 403, kennung: 'CODE_UNGUELTIG', erwartet: 'CODE_UNGUELTIG' },
    { status: 503, kennung: 'CODE_UNGUELTIG', erwartet: null },
  ];
  for (const { status, kennung, erwartet } of faelle) {
    const abruf = t.mock.method(globalThis, 'fetch', async () => Response.json({ fehler: 'Meldung', kennung }, { status }));
    const { fehler } = await sammle();
    abruf.mock.restore();
    assert.ok(fehler instanceof KiHttpFehler);
    assert.equal(fehler.kennung, erwartet);
  }
});

test('Zugangscode: erst nach erfolgreicher Antwort speichern und später ausschließlich im Header senden', async (t) => {
  const codespeicher = sitzungsspeicher(t);
  const code = 'A'.repeat(43);
  let bestaetigt = 0;
  const abruf = t.mock.method(globalThis, 'fetch', async (_url: string, optionen: RequestInit) => {
    if (bestaetigt === 0) assert.equal(codespeicher.has(KI_ZUGANGSSCHLUESSEL), false);
    assert.equal(new Headers(optionen.headers).get('X-KI-Zugangscode'), code);
    assert.equal(optionen.redirect, 'error');
    assert.doesNotMatch(String(optionen.body), new RegExp(code));
    return new Response('Antwort');
  });
  const ergebnis = await sammle(undefined, { code, onAkzeptiert: () => { bestaetigt++; } });
  assert.equal(ergebnis.text, 'Antwort');
  assert.equal(bestaetigt, 1);
  assert.equal(codespeicher.get(KI_ZUGANGSSCHLUESSEL), code);
  assert.equal((await sammle()).text, 'Antwort');
  assert.equal(abruf.mock.callCount(), 2);
});

test('Zugangscode: 403 entfernt den zurückgewiesenen Code und speichert einen falschen neuen Code nicht', async (t) => {
  const codespeicher = sitzungsspeicher(t);
  const code = 'B'.repeat(43);
  codespeicher.set(KI_ZUGANGSSCHLUESSEL, code);
  t.mock.method(globalThis, 'fetch', async () =>
    Response.json({ fehler: 'Der Zugangscode ist nicht gültig.', kennung: 'CODE_UNGUELTIG' }, { status: 403 }));
  const { fehler } = await sammle();
  assert.ok(fehler instanceof KiHttpFehler && fehler.kennung === 'CODE_UNGUELTIG');
  assert.equal(codespeicher.size, 0);
  await sammle(undefined, { code, onAkzeptiert: () => assert.fail('Falscher Code wurde akzeptiert') });
  assert.equal(codespeicher.size, 0);
});

test('Zugangscode: nur 43 Base64url-Zeichen sind erlaubt', () => {
  assert.equal(hatZugangscodeFormat('Ab-_' + '9'.repeat(39)), true);
  for (const code of ['', 'a'.repeat(42), 'a'.repeat(44), 'a'.repeat(42) + '+']) {
    assert.equal(hatZugangscodeFormat(code), false);
  }
});

test('Abbrechen gilt nicht als Fehler', async (t) => {
  const controller = new AbortController();
  t.mock.method(globalThis, 'fetch', async () => {
    controller.abort();
    throw new DOMException('Abgebrochen', 'AbortError');
  });
  const ergebnis = await sammle(controller.signal);
  assert.deepEqual(ergebnis, { text: '', fertig: 1, fehler: null });
});

test('beschreibeKiFehler: verständliche Meldungen je Fehlerart, nie roher Text', () => {
  assert.match(beschreibeKiFehler(new HttpFehler(429, 'HTTP Fehler 429')), /Zu viele Anfragen/);
  assert.match(beschreibeKiFehler(new HttpFehler(500, 'HTTP Fehler 500')), /nicht verfügbar/);
  assert.match(beschreibeKiFehler(new TypeError('Failed to fetch')), /Verbindung/);
  assert.doesNotMatch(beschreibeKiFehler(new Error('roher interner Text')), /roher/);
});

test('baueVerlauf: Systemanweisung vorne, Verlauf gekürzt, leere Antworten weg', () => {
  const verlauf: Nachricht[] = [
    { id: 'a', role: 'user', content: 'eins' },
    { id: 'b', role: 'assistant', content: '' },
    { id: 'c', role: 'user', content: 'zwei' },
    { id: 'd', role: 'assistant', content: 'drei' },
    { id: 'e', role: 'user', content: 'vier' },
  ];
  const ergebnis = baueVerlauf(verlauf, 'Regeln', 3);
  assert.deepEqual(ergebnis.map((n) => n.content), ['Regeln', 'zwei', 'drei', 'vier']);
  assert.equal(ergebnis[0].role, 'system');
  assert.deepEqual(baueVerlauf(verlauf, undefined, 1).map((n) => n.content), ['vier']);
});

test('baueVerlauf: maxNachrichten 0 schickt keinen Verlauf mit, nur die Systemanweisung', () => {
  const verlauf: Nachricht[] = [{ id: 'a', role: 'user', content: 'eins' }];
  assert.deepEqual(baueVerlauf(verlauf, 'Regeln', 0).map((n) => n.content), ['Regeln']);
  assert.deepEqual(baueVerlauf(verlauf, undefined, 0), []);
});
