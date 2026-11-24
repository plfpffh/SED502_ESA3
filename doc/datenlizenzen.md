# Datenlizenzen für „Seen im Klimawandel“

Recherchiert am **24.11.2026** für die Seite `/lizenzen`. Das Datum gilt für alle unten verlinkten Quellen. Die Recherche unterscheidet die Lizenz der Daten von den Nutzungsbedingungen der abrufenden Schnittstelle.

| Quelle in der App | Ergebnis |
| --- | --- |
| Open-Meteo Forecast und Historical Weather | API-Daten unter CC BY 4.0. Der kostenlose API-Zugang ist für nicht kommerzielle Nutzung vorgesehen. |
| Copernicus ERA5, bezogen über Open-Meteo | CC BY 4.0. Copernicus und den konkreten ERA5-Datensatz zusätzlich nennen. |
| Hydrographischer Dienst Oberösterreich | Der offizielle Open-Data-Export der Wassertemperaturen ist CC BY 4.0. Für die verwendete Live-JSON-Datei fehlt eine ausdrückliche Zuordnung zur Freigabe. |
| Hydris Salzburg | Herkunft belegt. Für den verwendeten Live-Abruf der Wassertemperaturen ließ sich keine ausdrückliche offene Lizenz belegen. |
| Deutschsprachige Wikipedia | Quelle einzelner Stammdaten. Die Lizenz der Artikeltexte ist CC BY-SA 4.0. Die übernommenen Zahlenwerte sind als Fakten im eigenen Datenmodell erfasst. |

## Open-Meteo

Die App verwendet die [Forecast API](https://open-meteo.com/en/docs) für die kommenden sieben Tage und die letzten 92 Tage zur Berechnung der aktuellen Kälteserie. Über die [Historical Weather API](https://open-meteo.com/en/docs/historical-weather-api) ruft sie ERA5-Tageswerte ab und berechnet daraus Frosttage und historische Kennzahlen.

Die [Lizenzseite von Open-Meteo](https://open-meteo.com/en/license) nennt [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/deed.de) für API-Daten. Dieselbe Datenlizenz steht in den offiziellen API-Beschreibungen für [Forecast](https://github.com/open-meteo/open-meteo/blob/main/openapi/forecast.yml) und [Historical Weather](https://github.com/open-meteo/open-meteo/blob/main/openapi/historical-weather.yml). Die Quelle und Lizenz sollen verlinkt und Bearbeitungen kenntlich gemacht werden. Open-Meteo verlangt einen Quellenlink neben den Stellen, an denen seine Daten angezeigt werden. Im Klimadiagramm gibt es bereits einen Link. Für die Seenliste im Eissport-Modus und die Datengrundlage im KI-Berater sollte die sichtbare Quellenangabe ebenfalls verlinkt sein. Die [Bedingungen für den kostenlosen API-Zugang](https://open-meteo.com/en/terms) erlauben nicht kommerzielle Nutzung und nennen Bildung ausdrücklich als Beispiel.

**Text für die Lizenzseite**

> Wetter- und Klimadaten von [Open-Meteo.com](https://open-meteo.com/) unter [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/deed.de). Die App wählt Tageswerte aus und berechnet daraus Kälteserien, Frosttage und historische Kennzahlen.

## Copernicus ERA5

Die Archivabfrage setzt ausdrücklich `models=era5`. Für die daraus abgeleiteten Werte nennen wir zusätzlich zum Vermittler Open-Meteo den Datenproduzenten und den [ERA5-Datensatz des Copernicus Climate Change Service](https://doi.org/10.24381/cds.adbb2d47). Der Datensatz führt CC BY, der [ECMWF-Nachweis für genau diesen ERA5-Datensatz](https://confluence.ecmwf.int/spaces/CKB/pages/222493847/Use%2BCase%2B2%2BERA5%2Bhourly%2Bdata%2Bon%2Bsingle%2Blevels%2Bfrom%2B1940%2Bto%2Bpresent) erläutert Zitat und Namensnennung.

**Text für die Lizenzseite**

> Erstellt mit Informationen des Copernicus Climate Change Service (2026). Quelle der historischen Lufttemperaturen ist [ERA5 hourly data on single levels from 1940 to present](https://doi.org/10.24381/cds.adbb2d47), bezogen über Open-Meteo, unter [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/deed.de). Weder die Europäische Kommission noch ECMWF sind für die Nutzung dieser Copernicus-Informationen oder Daten verantwortlich.

Der [Leitfaden des ECMWF](https://confluence.ecmwf.int/spaces/CKB/pages/197704114/How%2Bto%2Backnowledge%2Band%2Bcite%2Ba%2BClimate%2BData%2BStore%2BCDS%2Bcatalogue%2Bentry%2Band%2Bthe%2Bdata%2Bpublished%2Bas%2Bpart%2Bof%2Bit) gibt die Formulierung und den Haftungshinweis vor. Hier beziehen sie sich auf die aus ERA5 berechneten Ergebnisse. Die aktuellen Wassertemperaturen kommen von den Landesdiensten.

## Wassertemperaturen aus Oberösterreich

Die App bezieht laufende Messwerte über [die JSON-Datei des Hydro-Portals](https://hydro.ooe.gv.at/daten/internet/layers/5/index.json), wählt die zur See-Auswahl passenden Messstellen aus und bildet bei mehreren Messwerten einen Mittelwert. Der [Landesdienst dokumentiert die Erhebung der Wassertemperaturen](https://www.land-oberoesterreich.gv.at/187895.htm).

Im [offiziellen Katalog „Hydrographie – Messdaten“](https://www.data.gv.at/katalog/datasets/586e08a5-1ca6-400b-b2e2-dfd8fd3f429d) ist die Ressource **Messdaten Wassertemperatur** unter [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/deed.de) veröffentlicht. Die [Verteilungsmetadaten](https://www.data.gv.at/api/hub/repo/datasets/586e08a5-1ca6-400b-b2e2-dfd8fd3f429d) verweisen dafür auf den [ZRX-Export](https://data.ooe.gv.at/files/hydro/HDOOE_Export_WT.zrxp). Die [Open-Data-Bedingungen des Landes](https://www.land-oberoesterreich.gv.at/119786.htm) geben für die dort veröffentlichten Daten diese Namensnennung vor.

> Datenquelle: Land Oberösterreich - [data.ooe.gv.at](https://data.ooe.gv.at)

**Für die aktuelle App** eignet sich die Quellenangabe „Wassertemperaturen vom [Hydrographischen Dienst Oberösterreich](https://hydro.ooe.gv.at/). Auswahl der Messstellen und Mittelwerte durch das Studienprojekt.“ Die CC-BY-Angabe kann den **OGD-Export** eindeutig bezeichnen. Für die konkret verwendete JSON-Datei verlinken die vorliegenden Katalogmetadaten keine eigene Freigabe. Wenn wir dafür ebenfalls CC BY ausweisen wollen, lassen wir die Zuordnung beim [Hydrographischen Dienst OÖ](https://www.land-oberoesterreich.gv.at/16367.htm) bestätigen oder verwenden den ausdrücklich lizenzierten Export.

**Abgleich des OGD-Exports am 24.11.2026:** Er enthielt alle zehn in der App verwendeten OÖ-Stationen mit gültigen Messwerten desselben Tages. Er liefert mehrere Tage als ZRX-Zeitreihe, im geprüften Abruf etwa 623 kB. Für einen Wechsel müsste der Proxy je Station den letzten gültigen Wert aus diesem Format lesen.

## Wassertemperaturen aus Hydris Salzburg

Die App verwendet [die JSON-Datei von Hydris Salzburg](https://www.salzburg.gv.at/wasser/hydro/grafiken/data.json) für aktuelle Wassertemperaturen und Messzeitpunkte. Die [Hydris-Hinweise des Landes](https://www.salzburg.gv.at/wasser/hydro/HydrisOnline/Pages/hd_rahmen_informationen.html) erläutern Datenaktualität und Haftung. Die JSON-Datei weist für die verwendeten Stationen überwiegend den HD Salzburg aus. Bei den Stationsnummern `205286` (Mondsee) und `205328` (Unterach) nennt das Betreiberfeld den HD Oberösterreich.

Die [Open-Data-Bedingungen des Landes Salzburg](https://www.salzburg.gv.at/themen/statistik/ogd/rechtliches-und-netiquette) nennen CC BY 4.0 für veröffentlichte Open Government Data und die Namensnennung „Datenquelle: Land Salzburg – data.salzburg.gv.at“. Eine Katalogressource, die die genutzte Live-Datei oder deren Wassertemperaturwerte unter diese Lizenz stellt, ließ sich bei der Recherche nicht belegen.

**Für die aktuelle App** eignet sich die Quellenangabe „Wassertemperaturen über [Hydris Salzburg](https://www.salzburg.gv.at/wasser/hydro/), Hydrographischer Dienst des Landes Salzburg und Betreiber der jeweiligen Messstelle.“ Das klärt die Herkunft. Offen ist die Erlaubnis zur automatisierten Abfrage und Weiteranzeige der Werte in der öffentlichen App, einschließlich der beiden Stationen mit anderem Betreiber. Zuständig für die Rückfrage ist der [Hydrographische Dienst Salzburg](https://www.salzburg.gv.at/dienststellen/abteilungen/20704).

## See-Stammdaten aus Wikipedia

Fläche, maximale Tiefe und Seehöhe stammen laut Kommentar in [`src/daten/seen.ts`](../src/daten/seen.ts) aus den Infoboxen der deutschsprachigen Wikipedia. Dort steht **25.09.2026** als ursprünglicher Abruf. Die App enthält einzelne Zahlenwerte, auf zwei Nachkommastellen gerundete Koordinaten und separat zugeordnete Messstellen. Die nachstehenden Artikel-Links wurden am **24.11.2026** geprüft. Die ursprünglich verwendeten Artikelrevisionen sind im Repository nicht festgehalten.

Die [Wikimedia-Nutzungsbedingungen, Abschnitt 7](https://foundation.wikimedia.org/wiki/Policy:Terms_of_Use#7._Licensing_of_Content) unterscheiden zwischen Artikeln unter [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/deed.de) und der Wiederverwendung einzelner Fakten. Für die Stammdaten nennen wir die Artikel als Quellen. Bei einer späteren Übernahme von Artikeltext oder Bildern wäre die Lizenz des jeweiligen Inhalts gesondert zu beachten.

| Seen | Artikel |
| --- | --- |
| Attersee, Traunsee, Mondsee, Wolfgangsee | [Attersee](https://de.wikipedia.org/wiki/Attersee_(See)), [Traunsee](https://de.wikipedia.org/wiki/Traunsee), [Mondsee](https://de.wikipedia.org/wiki/Mondsee_(See)), [Wolfgangsee](https://de.wikipedia.org/wiki/Wolfgangsee) |
| Hallstätter See, Wallersee, Obertrumer See, Zeller See | [Hallstätter See](https://de.wikipedia.org/wiki/Hallst%C3%A4tter_See), [Wallersee](https://de.wikipedia.org/wiki/Wallersee), [Obertrumer See](https://de.wikipedia.org/wiki/Obertrumer_See), [Zeller See in Salzburg](https://de.wikipedia.org/wiki/Zeller_See_(Salzburg)) |
| Mattsee, Irrsee, Fuschlsee, Grabensee | [Mattsee](https://de.wikipedia.org/wiki/Mattsee_(See)), [Irrsee](https://de.wikipedia.org/wiki/Irrsee), [Fuschlsee](https://de.wikipedia.org/wiki/Fuschlsee), [Grabensee](https://de.wikipedia.org/wiki/Grabensee_(%C3%96sterreich)) |
| Almsee, Holzöstersee | [Almsee](https://de.wikipedia.org/wiki/Almsee), [Holzöstersee](https://de.wikipedia.org/wiki/Holz%C3%B6stersee) |

**Text für die Lizenzseite**

> Die Angaben zu Fläche, maximaler Tiefe und Seehöhe beruhen auf den verlinkten Artikeln der deutschsprachigen Wikipedia, abgerufen am 25.09.2026.

Für `/lizenzen` können die Formulierungen zu Open-Meteo, ERA5 und den Wikipedia-Fakten direkt übernommen werden. Bei den Landesdiensten sollen die bestätigte Herkunft der Live-Werte und eine gegebenenfalls bestätigte Lizenz getrennt erkennbar bleiben.
