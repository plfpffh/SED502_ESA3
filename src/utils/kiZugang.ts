export const KI_ZUGANGSSCHLUESSEL = 'ki-zugangscode';

export function hatZugangscodeFormat(code: string): boolean {
  return /^[A-Za-z0-9_-]{43}$/.test(code);
}

export function leseKiZugangscode(): string | null {
  try {
    const code = sessionStorage.getItem(KI_ZUGANGSSCHLUESSEL);
    return code && hatZugangscodeFormat(code) ? code : null;
  } catch {
    return null;
  }
}

export function speichereKiZugangscode(code: string): void {
  try {
    sessionStorage.setItem(KI_ZUGANGSSCHLUESSEL, code);
  } catch {
    // Eine Anfrage funktioniert auch, wenn der Browser die Speicherung sperrt.
  }
}

export function verwerfeKiZugangscode(code: string): void {
  try {
    if (leseKiZugangscode() === code) sessionStorage.removeItem(KI_ZUGANGSSCHLUESSEL);
  } catch {
    // Gibt es keinen Zugriff auf den Speicher. Auch kein Löschen möglich.
  }
}
