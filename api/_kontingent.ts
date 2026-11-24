/**
 * _kontingent.ts – schützt das Gemini-Kontingent der öffentlichen App: Tageszähler und Zugangscode
 *
 * Der Unterstrich am Anfang sorgt dafür, dass Vercel aus dieser Datei keinen eigenen Endpunkt macht. Sie wird nur
 * von api/ki.ts verwendet (Konzept „KI-Kontingent und Zugangscode“ in doc/ESA3-Planung.md).
 *
 * Regeln:
 *  - ohne Code: höchstens KI_TAGESLIMIT Anfragen pro Kalendertag (Wien), danach 429 KONTINGENT_AUFGEBRAUCHT
 *  - mit gültigem Code: kein Tageslimit der App; die Anfrage wird mitgezählt, aber nie blockiert
 *  - mit falschem Code: 403 CODE_UNGUELTIG
 *  - Redis auf Vercel nicht erreichbar oder nicht eingerichtet: ohne Code 503 NUR_MIT_ZUGANGSCODE (fail closed),
 *    mit gültigem Code geht die Anfrage trotzdem durch
 *  - lokal (kein VERCEL_ENV) ohne Redis: kein Limit
 * Gezählt wird, bevor die Anfrage an Gemini geht. Scheitert Gemini, bleibt sie gezählt; sonst könnten viele
 * gleichzeitige Anfragen das Limit überholen. Kosten-Kontrolle über Rate Limits: Kompendium M05 6.4 und Üb. 6.1.
 *
 * Redis: Upstash über die REST-API (https://upstash.com/docs/redis/features/restapi, geprüft am 20.11.2026),
 * bewusst mit fetch statt eines npm-Pakets, damit keine neue Laufzeit-Abhängigkeit dazukommt.
 * Gespeichert wird nur eine Zahl pro Tag, keine IP-Adresse und keine Eingaben.
 *
 * @project  FERNFH SED502 Frontend Development WS 2026/27 ESA 3: Seen im Klimawandel
 * @author   Peter Luckmann
 */

import { createHash, timingSafeEqual } from 'node:crypto';

export type Kennung = 'KONTINGENT_AUFGEBRAUCHT' | 'CODE_UNGUELTIG' | 'NUR_MIT_ZUGANGSCODE';

export type Entscheidung =
  | { erlaubt: true }
  | { erlaubt: false; status: number; kennung: Kennung; meldung: string };

export interface RedisZugang {
  url: string;
  token: string;
}

export interface KontingentEingaben {
  zugangscode: string | null; // aus dem Header X-KI-Zugangscode, null wenn keiner mitgeschickt wurde
  hash: string | undefined; // KI_ZUGANGSCODE_SHA512: SHA-512 des Codes als Hex (128 Zeichen)
  tageslimit: number;
  umgebung: string | undefined; // VERCEL_ENV (production, preview, development), lokal undefined
  redis: RedisZugang | null;
  jetzt: Date;
}

export const STANDARD_TAGESLIMIT = 10;
const ABLAUF_SEKUNDEN = 48 * 60 * 60; // der Schlüssel eines Tages wird danach von Redis gelöscht
const REDIS_TIMEOUT_MS = 3000;

const ABGELEHNT = {
  aufgebraucht: {
    erlaubt: false, status: 429, kennung: 'KONTINGENT_AUFGEBRAUCHT',
    meldung: 'Die freien KI-Anfragen für heute sind aufgebraucht. Mit einem Zugangscode lässt sich die KI weiter nutzen.',
  },
  codeUngueltig: {
    erlaubt: false, status: 403, kennung: 'CODE_UNGUELTIG',
    meldung: 'Der Zugangscode ist nicht gültig.',
  },
  nurMitCode: {
    erlaubt: false, status: 503, kennung: 'NUR_MIT_ZUGANGSCODE',
    meldung: 'Freie KI-Anfragen sind gerade nicht verfügbar. Mit einem Zugangscode lässt sich die KI weiter nutzen.',
  },
} as const satisfies Record<string, Entscheidung>;

const ERLAUBT: Entscheidung = { erlaubt: true };

/** true, wenn der Hash wie erwartet aussieht: SHA-512 als Hex, also genau 128 Zeichen 0-9 und a-f. */
export function istHashGueltig(hash: string | undefined): hash is string {
  return hash !== undefined && /^[0-9a-f]{128}$/i.test(hash);
}

/**
 * Vergleicht SHA-512 des Codes mit dem hinterlegten Hash in konstanter Zeit (timingSafeEqual).
 * Ein schneller Hash ohne Salt reicht, weil der Code 256 Bit Zufall enthält (Planung: Warum SHA-512 hier reicht).
 */
export function pruefeZugangscode(code: string, hash: string | undefined): boolean {
  if (!istHashGueltig(hash)) return false;
  const erwartet = Buffer.from(hash, 'hex');
  const berechnet = createHash('sha512').update(code, 'utf8').digest();
  return timingSafeEqual(berechnet, erwartet);
}

/** Redis-Schlüssel des Tages, z.B. 'ki:production:2026-11-20'. Ein Tag ist ein Kalendertag in Wien. */
export function tagesSchluessel(umgebung: string | undefined, jetzt: Date): string {
  // en-CA formatiert ein Datum als JJJJ-MM-TT
  const datum = new Intl.DateTimeFormat('en-CA', { timeZone: 'Europe/Vienna' }).format(jetzt);
  return `ki:${umgebung ?? 'lokal'}:${datum}`;
}

/** KI_TAGESLIMIT als ganze Zahl ab 0, sonst der Standard. 0 heißt: nur mit Zugangscode. */
export function leseTageslimit(wert: string | undefined): number {
  const zahl = Number(wert);
  return wert !== undefined && wert.trim() !== '' && Number.isInteger(zahl) && zahl >= 0 ? zahl : STANDARD_TAGESLIMIT;
}

/**
 * Zugangsdaten für Redis aus den Umgebungsvariablen. Die Upstash-Integration von Vercel setzt je nach Version
 * KV_REST_API_URL/KV_REST_API_TOKEN oder UPSTASH_REDIS_REST_URL/UPSTASH_REDIS_REST_TOKEN, deshalb werden beide gelesen.
 */
export function leseRedisZugang(env: Record<string, string | undefined>): RedisZugang | null {
  const url = env.KV_REST_API_URL || env.UPSTASH_REDIS_REST_URL;
  const token = env.KV_REST_API_TOKEN || env.UPSTASH_REDIS_REST_TOKEN;
  return url && token ? { url: url.replace(/\/+$/, ''), token } : null;
}

/**
 * Erhöht den Zähler des Tages um 1 und gibt den neuen Stand zurück. INCR ist atomar, auch bei gleichzeitigen
 * Anfragen. INCR und EXPIRE gehen in einem Aufruf (Pipeline) an Redis.
 */
export async function zaehleAnfrage(redis: RedisZugang, schluessel: string, abruf: typeof fetch = fetch): Promise<number> {
  const antwort = await abruf(`${redis.url}/pipeline`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${redis.token}`, 'Content-Type': 'application/json' },
    body: JSON.stringify([['INCR', schluessel], ['EXPIRE', schluessel, String(ABLAUF_SEKUNDEN)]]),
    signal: AbortSignal.timeout(REDIS_TIMEOUT_MS),
  });
  if (!antwort.ok) throw new Error(`Redis antwortet mit HTTP ${antwort.status}`);
  const daten: unknown = await antwort.json();
  const erstes: unknown = Array.isArray(daten) ? daten[0] : undefined;
  const stand = erstes !== null && typeof erstes === 'object' && 'result' in erstes ? erstes.result : undefined;
  if (typeof stand !== 'number') throw new Error('Redis liefert keinen Zählerstand');
  return stand;
}

/** Entscheidet nach den Regeln oben, ob die Anfrage an Gemini gehen darf. */
export async function entscheide(eingaben: KontingentEingaben, abruf: typeof fetch = fetch): Promise<Entscheidung> {
  const { zugangscode, hash, tageslimit, umgebung, redis, jetzt } = eingaben;
  const schluessel = tagesSchluessel(umgebung, jetzt);

  if (zugangscode !== null) {
    if (!istHashGueltig(hash)) {
      // Konfigurationsfehler auf unserer Seite: Details nur im Server-Log
      console.error('[api/ki] KI_ZUGANGSCODE_SHA512 fehlt oder ist kein SHA-512-Hash in Hex (128 Zeichen)');
    }
    if (!pruefeZugangscode(zugangscode, hash)) return ABGELEHNT.codeUngueltig;
    // mitzählen, damit der Zähler den ganzen Verbrauch zeigt; ein Fehler von Redis blockiert die Anfrage nicht
    if (redis) {
      await zaehleAnfrage(redis, schluessel, abruf).catch((fehler: unknown) => {
        console.error('[api/ki] Zähler nicht erreichbar:', fehler instanceof Error ? fehler.message : fehler);
      });
    }
    return ERLAUBT;
  }

  if (!redis) {
    // auf Vercel ohne Redis nur mit Code (fail closed), lokal ohne Limit
    return umgebung ? ABGELEHNT.nurMitCode : ERLAUBT;
  }

  try {
    const stand = await zaehleAnfrage(redis, schluessel, abruf);
    return stand > tageslimit ? ABGELEHNT.aufgebraucht : ERLAUBT;
  } catch (fehler: unknown) {
    console.error('[api/ki] Zähler nicht erreichbar:', fehler instanceof Error ? fehler.message : fehler);
    return umgebung ? ABGELEHNT.nurMitCode : ERLAUBT;
  }
}
