import assert from 'node:assert/strict';
import { createHash, randomBytes } from 'node:crypto';
import { test } from 'node:test';
import {
  STANDARD_TAGESLIMIT,
  entscheide,
  istHashGueltig,
  leseRedisZugang,
  leseTageslimit,
  pruefeZugangscode,
  tagesSchluessel,
  zaehleAnfrage,
  type KontingentEingaben,
} from '../api/_kontingent.ts';

const CODE = randomBytes(32).toString('base64url');
const HASH = createHash('sha512').update(CODE).digest('hex');
const REDIS = { url: 'https://redis.test', token: 'geheim' };

/** Nachgebildetes Redis (Upstash-REST, Pipeline): zählt pro Schlüssel und merkt sich die Aufrufe. */
function redisNachbildung(startwerte: Record<string, number> = {}) {
  const zaehler = new Map(Object.entries(startwerte));
  const aufrufe: { url: string; optionen: RequestInit }[] = [];
  const abruf = (async (url: string, optionen: RequestInit) => {
    aufrufe.push({ url, optionen });
    const befehle = JSON.parse(String(optionen.body)) as string[][];
    const schluessel = befehle[0][1];
    const stand = (zaehler.get(schluessel) ?? 0) + 1;
    zaehler.set(schluessel, stand);
    return Response.json([{ result: stand }, { result: 1 }]);
  }) as unknown as typeof fetch;
  return { abruf, aufrufe, zaehler };
}

const kaputtesRedis = (async () => new Response('Fehler', { status: 500 })) as unknown as typeof fetch;

function eingaben(aenderungen: Partial<KontingentEingaben> = {}): KontingentEingaben {
  return {
    zugangscode: null, hash: HASH, tageslimit: 10, umgebung: 'production', redis: REDIS,
    jetzt: new Date('2026-11-20T10:00:00Z'), ...aenderungen,
  };
}

test('Zugangscode: richtiger Code passt, falscher und leerer nicht', () => {
  assert.equal(pruefeZugangscode(CODE, HASH), true);
  assert.equal(pruefeZugangscode(CODE, HASH.toUpperCase()), true);
  assert.equal(pruefeZugangscode(`${CODE}x`, HASH), false);
  assert.equal(pruefeZugangscode('', HASH), false);
});

test('Zugangscode: ohne oder mit falsch eingetragenem Hash passt kein Code', () => {
  assert.equal(pruefeZugangscode(CODE, undefined), false);
  assert.equal(pruefeZugangscode(CODE, HASH.slice(1)), false); // ein Zeichen zu kurz
  assert.equal(pruefeZugangscode(CODE, createHash('sha256').update(CODE).digest('hex')), false);
  assert.equal(istHashGueltig(HASH), true);
  assert.equal(istHashGueltig(`${HASH.slice(1)}g`), false);
});

test('Tagesschlüssel: Kalendertag in Wien, getrennt nach Umgebung', () => {
  assert.equal(tagesSchluessel('production', new Date('2026-11-20T10:00:00Z')), 'ki:production:2026-11-20');
  // 23:30 UTC ist in Wien (Winterzeit, UTC+1) schon der nächste Tag
  assert.equal(tagesSchluessel('preview', new Date('2026-11-20T23:30:00Z')), 'ki:preview:2026-11-21');
  // Sommerzeit (UTC+2): 22:30 UTC am 30.06. ist in Wien der 01.07.
  assert.equal(tagesSchluessel('production', new Date('2026-06-30T22:30:00Z')), 'ki:production:2026-07-01');
  assert.equal(tagesSchluessel(undefined, new Date('2026-11-20T10:00:00Z')), 'ki:lokal:2026-11-20');
});

test('Tageslimit aus der Umgebungsvariable, sonst Standard', () => {
  assert.equal(leseTageslimit(undefined), STANDARD_TAGESLIMIT);
  assert.equal(leseTageslimit(''), STANDARD_TAGESLIMIT);
  assert.equal(leseTageslimit('abc'), STANDARD_TAGESLIMIT);
  assert.equal(leseTageslimit('-1'), STANDARD_TAGESLIMIT);
  assert.equal(leseTageslimit('2.5'), STANDARD_TAGESLIMIT);
  assert.equal(leseTageslimit('25'), 25);
  assert.equal(leseTageslimit('0'), 0);
});

test('Redis-Zugang aus beiden Namensvarianten der Upstash-Integration', () => {
  assert.deepEqual(leseRedisZugang({ KV_REST_API_URL: 'https://a.test/', KV_REST_API_TOKEN: 't' }), { url: 'https://a.test', token: 't' });
  assert.deepEqual(leseRedisZugang({ UPSTASH_REDIS_REST_URL: 'https://b.test', UPSTASH_REDIS_REST_TOKEN: 'u' }), { url: 'https://b.test', token: 'u' });
  assert.equal(leseRedisZugang({ KV_REST_API_URL: 'https://a.test' }), null);
  assert.equal(leseRedisZugang({}), null);
});

test('zaehleAnfrage: INCR und EXPIRE (48 h) in einem Pipeline-Aufruf mit Token', async () => {
  const redis = redisNachbildung({ 'ki:production:2026-11-20': 4 });
  assert.equal(await zaehleAnfrage(REDIS, 'ki:production:2026-11-20', redis.abruf), 5);
  const { url, optionen } = redis.aufrufe[0];
  assert.equal(url, 'https://redis.test/pipeline');
  assert.equal((optionen.headers as Record<string, string>).Authorization, 'Bearer geheim');
  assert.deepEqual(JSON.parse(String(optionen.body)), [
    ['INCR', 'ki:production:2026-11-20'],
    ['EXPIRE', 'ki:production:2026-11-20', '172800'],
  ]);
});

test('zaehleAnfrage: Fehler und unerwartete Antworten von Redis werden als Fehler gemeldet', async () => {
  await assert.rejects(zaehleAnfrage(REDIS, 'k', kaputtesRedis), /HTTP 500/);
  const ohneZahl = (async () => Response.json([{ error: 'WRONGTYPE' }])) as unknown as typeof fetch;
  await assert.rejects(zaehleAnfrage(REDIS, 'k', ohneZahl), /keinen Zählerstand/);
});

test('ohne Code: bis zum Tageslimit erlaubt, danach 429 KONTINGENT_AUFGEBRAUCHT', async () => {
  const redis = redisNachbildung({ 'ki:production:2026-11-20': 9 });
  assert.deepEqual(await entscheide(eingaben(), redis.abruf), { erlaubt: true }); // 10. Anfrage
  const elfte = await entscheide(eingaben(), redis.abruf);
  assert.equal(elfte.erlaubt, false);
  assert.ok(!elfte.erlaubt && elfte.status === 429 && elfte.kennung === 'KONTINGENT_AUFGEBRAUCHT');
  assert.ok(!elfte.erlaubt && /freien KI-Anfragen für heute sind aufgebraucht/.test(elfte.meldung));
});

test('mit gültigem Code: kein Limit, die Anfrage wird aber mitgezählt', async () => {
  const redis = redisNachbildung({ 'ki:production:2026-11-20': 50 });
  assert.deepEqual(await entscheide(eingaben({ zugangscode: CODE }), redis.abruf), { erlaubt: true });
  assert.equal(redis.zaehler.get('ki:production:2026-11-20'), 51);
});

test('mit falschem Code: 403 CODE_UNGUELTIG, auch wenn noch freie Anfragen übrig sind, und nicht gezählt', async () => {
  const redis = redisNachbildung();
  const ergebnis = await entscheide(eingaben({ zugangscode: 'falsch' }), redis.abruf);
  assert.ok(!ergebnis.erlaubt && ergebnis.status === 403 && ergebnis.kennung === 'CODE_UNGUELTIG');
  assert.equal(redis.aufrufe.length, 0);
});

test('Redis auf Vercel nicht erreichbar: ohne Code 503 NUR_MIT_ZUGANGSCODE, mit Code erlaubt', async (t) => {
  t.mock.method(console, 'error', () => {});
  const ohneCode = await entscheide(eingaben(), kaputtesRedis);
  assert.ok(!ohneCode.erlaubt && ohneCode.status === 503 && ohneCode.kennung === 'NUR_MIT_ZUGANGSCODE');
  assert.deepEqual(await entscheide(eingaben({ zugangscode: CODE }), kaputtesRedis), { erlaubt: true });
});

test('Redis auf Vercel nicht eingerichtet: ohne Code 503, mit Code erlaubt', async () => {
  const ohneCode = await entscheide(eingaben({ redis: null }));
  assert.ok(!ohneCode.erlaubt && ohneCode.kennung === 'NUR_MIT_ZUGANGSCODE');
  assert.deepEqual(await entscheide(eingaben({ redis: null, zugangscode: CODE })), { erlaubt: true });
});

test('lokal (kein VERCEL_ENV) ohne Redis: kein Limit, kein Aufruf', async () => {
  const redis = redisNachbildung();
  assert.deepEqual(await entscheide(eingaben({ umgebung: undefined, redis: null }), redis.abruf), { erlaubt: true });
  assert.equal(redis.aufrufe.length, 0);
});

test('Code gesendet, aber kein Hash hinterlegt: abgelehnt und im Server-Log gemeldet', async (t) => {
  const log = t.mock.method(console, 'error', () => {});
  const ergebnis = await entscheide(eingaben({ zugangscode: CODE, hash: undefined }), redisNachbildung().abruf);
  assert.ok(!ergebnis.erlaubt && ergebnis.kennung === 'CODE_UNGUELTIG');
  assert.equal(log.mock.callCount(), 1);
});
