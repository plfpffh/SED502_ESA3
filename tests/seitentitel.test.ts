import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { test } from 'node:test';
import { STANDARD_TITEL, seitentitel } from '../src/utils/seitentitel.ts';

test('Seitentitel: Seitenname vor dem App-Namen', () => {
  assert.equal(seitentitel('Attersee'), 'Attersee – Seen im Klimawandel');
  assert.equal(seitentitel('KI-Berater'), 'KI-Berater – Seen im Klimawandel');
});

test('Seitentitel: ohne Seitennamen der Standardtitel', () => {
  assert.equal(seitentitel(), STANDARD_TITEL);
  assert.equal(seitentitel(''), STANDARD_TITEL);
  assert.equal(seitentitel('   '), STANDARD_TITEL);
});

test('Standardtitel stimmt mit index.html überein', () => {
  const html = readFileSync(join(import.meta.dirname, '..', 'index.html'), 'utf8');
  const titel = html.match(/<title>(.*)<\/title>/)?.[1].replace('&amp;', '&');
  assert.equal(titel, STANDARD_TITEL);
});

test('jede Seite setzt ihren Titel mit useSeitentitel', () => {
  const ordner = join(import.meta.dirname, '..', 'src', 'seiten');
  for (const datei of ['Startseite.tsx', 'Seenliste.tsx', 'SeeDetail.tsx', 'KiBerater.tsx', 'NichtGefunden.tsx']) {
    const text = readFileSync(join(ordner, datei), 'utf8');
    assert.match(text, /useSeitentitel\(/, `${datei} ruft useSeitentitel nicht auf`);
  }
});
