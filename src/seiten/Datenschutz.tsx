import { Link } from 'react-router'
import { useSeitentitel } from '../hooks/useSeitentitel'

export default function Datenschutz(): React.JSX.Element {
  useSeitentitel('Datenschutz')

  return (
    <>
      <h1>Datenschutzerklärung</h1>
      <p>
        <strong>Entwurf.</strong> Kontaktweg, Rechtsgrundlagen sowie die konkreten Speicherfristen und
        Übermittlungsgrundlagen der eingesetzten Dienste werden vor der Veröffentlichung geprüft und ergänzt.
      </p>

      <section>
        <h2>Verantwortliche</h2>
        <p>
          Dies ist ein Studienprojekt. Die Infos zu den Inhabern und den Kontaktwegen findest du im <Link to="/impressum">Impressum</Link>.
        </p>
      </section>

      <section>
        <h2>Hosting über Vercel</h2>
        <p>
          Vercel Inc. (USA) stellt die Website und ihre API-Endpunkte bereit. Bei einem Abruf verarbeitet Vercel
          Verbindungsdaten wie die IP-Adresse, den Zeitpunkt und die aufgerufene Adresse. Für Betrieb und
          Sicherheit ist als Rechtsgrundlage das berechtigte Interesse an einer stabilen und sicheren
          Website vorgesehen (Art. 6 Abs. 1 lit. f DSGVO). Die Serverfunktionen sind für Frankfurt
          konfiguriert. Vercel kann Daten bei der Bereitstellung auch in den USA verarbeiten.
        </p>
        <p><a href="https://vercel.com/legal/privacy-notice">Datenschutzhinweise von Vercel</a></p>
      </section>

      <section>
        <h2>Wetter- und Klimadaten über Open-Meteo</h2>
        <p>
          Für Wetterprognosen und Klimaauswertungen ruft dein Browser Daten direkt bei Open-Meteo ab.
          OpenMeteo GmbH (Schweiz) erhält dabei deine IP-Adresse, feste Koordinaten und Höhen der Seen
          sowie die abgefragten Wettergrößen und Zeiträume. Für die Schweiz gibt es einen
          Angemessenheitsbeschluss der EU.
        </p>
        <p><a href="https://open-meteo.com/en/terms">Nutzungsbedingungen und Datenschutz von Open-Meteo</a></p>
      </section>

      <section>
        <h2>KI-Empfehlungen und Einschätzungen über Google Gemini</h2>
        <p>
          Wenn du eine Empfehlung anforderst, sendet unser Server deine Auswahl zu Aktivität, Tag und Region
          und gegebenenfalls deinen eingegebenen Wohnort, deine zusätzlichen Angaben und die passenden
          See- und Wetterdaten an die Gemini API. Für eine KI-Einschätzung auf der See-Detailseite
          übermittelt der Server die Mess- und Klimadaten des jeweiligen Sees.
          Bitte gib keine persönlichen oder vertraulichen Informationen in die Freitextfelder ein.
        </p>
        <p>
          Die App speichert Fragen und Antworten für die Anzeige im laufenden Seitenzustand. Google kann
          Inhalte zur Sicherheit und zum Missbrauchsschutz vorübergehend protokollieren und auch
          außerhalb des EWR verarbeiten.
        </p>
        <p><a href="https://aistudio.google.com/docs/terms">Zusatzbedingungen und Datenverwendung der Gemini API</a></p>
      </section>

      <section>
        <h2>Tageskontingent über Upstash</h2>
        <p>
          Um das tägliche KI-Kontingent zu verwalten, führt unser Server bei Upstash, Inc. (USA) einen
          gemeinsamen Zähler pro Kalendertag und Umgebung. Der Eintrag läuft 48 Stunden nach der letzten
          Aktualisierung ab. Der Server übermittelt dabei keine Besucher-IP, KI-Eingaben oder Zugangscodes.
        </p>
        <p><a href="https://upstash.com/trust/privacy">Datenschutzhinweise von Upstash</a></p>
      </section>

      <section>
        <h2>Speicher im Browser</h2>
        <ul>
          <li>
            <strong>Klimacache:</strong> Der Browser speichert berechnete Klimakennzahlen und den
            Speicherzeitpunkt im lokalen Speicher (localStorage), um erneute Abrufe zu vermeiden.
            Die App nutzt die Einträge höchstens 24 Stunden. Danach können sie bis zum Überschreiben
            oder Löschen im Browser gespeichert bleiben.
          </li>
          <li>
            <strong>KI-Zugangscode:</strong> Nach erfolgreicher Freischaltung hält die App den Zugangscode
            im Sitzungsspeicher (sessionStorage) des Tabs bereit und sendet ihn bei weiteren Anfragen an
            die eigene KI-Schnittstelle. Der Sitzungsspeicher endet in der Regel beim Schließen des Tabs.
          </li>
        </ul>
      </section>

      <section>
        <h2>Deine Rechte</h2>
        <p>
          Du kannst nach Maßgabe der DSGVO Auskunft, Berichtigung, Löschung und Einschränkung der Verarbeitung
          verlangen. Je nach Rechtsgrundlage hast du außerdem ein Recht auf Datenübertragbarkeit oder
          Widerspruch. Eine erteilte Einwilligung kannst du mit Wirkung für die Zukunft widerrufen.
        </p>
        <p>
          Wenn du eine Verletzung deiner Datenschutzrechte vermutest, kannst du
          eine <a href="https://dsb.gv.at/eingabe-an-die-dsb/beschwerde">
            Beschwerde bei der österreichischen Datenschutzbehörde
          </a> einreichen.
        </p>
      </section>
    </>
  )
}
