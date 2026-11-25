import { Link } from 'react-router'
import { useSeitentitel } from '../hooks/useSeitentitel'

export default function Impressum(): React.JSX.Element {
  useSeitentitel('Impressum')

  return (
    <>
      <h1>Impressum</h1>
      <p><strong>Dies ist nur ein Beispielimpressum.</strong> Hier sollten Adresse und Kontaktweg stehen.</p>

      <section>
        <h2>Medieninhaber</h2>
        <ul>
          <li>Thomas Beispielinhaber</li>
          <li>Max Musterman Inhaberzwei</li>
        </ul>
      </section>

      <section>
        <h2>Über das Projekt</h2>
        <p>
          „Seen im Klimawandel“ zeigt Wassertemperaturen und Klimadaten von Seen in Salzburg und
          Oberösterreich.
        </p>
      </section>

      <section>
        <h2>Kontakt</h2>
        <p>
          Dies ist ein Beispielimpressum. Hier sollten bei einer produktiven Anwendung, die Kontaktdaten der Inhaber stehen.
        </p>
      </section>

      <p><Link to="/datenschutz">Zur Datenschutzerklärung</Link></p>
    </>
  )
}
