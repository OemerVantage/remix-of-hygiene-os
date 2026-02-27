
Ziel: Den gesamten Textblock in der FreeDispenserSection wirklich mittig platzieren (nicht nur innerhalb der linken Grid-Spalte), damit „Exklusives Angebot“, Titel, Beschreibung, CTA und Öffnungszeiten visuell in der Seitenmitte stehen.

1) `src/components/FreeDispenserSection.tsx` Layout auf echte Mittelachse umbauen
- Aktuelles `md:grid-cols-2` entfernen bzw. nur noch für Bilddarstellung nutzen.
- Einen zentralen Content-Wrapper einführen (`max-w-2xl mx-auto text-center`), der den kompletten Textblock enthält.
- Dadurch steht der Textblock unabhängig vom Bild exakt in der Mitte des Bereichs.

2) Textblock gegen „aus dem Block raus“-Effekte absichern
- Wrapper-Breite klar begrenzen (`max-w-*` + `mx-auto`).
- Headline/Absatz mit sauberem Umbruch belassen/ergänzen (`break-words` nur falls nötig).
- CTA-Gruppe weiterhin zentriert (`justify-center`, mobil vertikal, ab `sm` horizontal).

3) Bildposition so anpassen, dass die Mitte des Texts nicht verschoben wird
- Entweder:
  - mobil/tablet: Bild unter dem Text (zentriert),
  - große Screens: Bild rechts als separater Bereich, ohne den Text-Mittelpunkt zu verschieben.
- Ziel: Text bleibt optisch mittig, Bild bleibt harmonisch eingebunden.

4) Feinschliff für Konsistenz mit restlicher Seite
- Design-System-Typo (`text-display-sm/md`, `text-body-lg`, `text-body-sm`) beibehalten.
- Container auf `container-hygiswiss` belassen.
- Vertikale Abstände (Badge → Titel → Text → CTA) auf gleichmäßige Rhythmik prüfen.

Technische Details
- Datei: `src/components/FreeDispenserSection.tsx`
- Kernänderung: von „2-Spalten-Text links“ zu „zentrierter Text-Wrapper als primäre Struktur“.
- Relevante Klassen:
  - entfernen/ändern: `grid grid-cols-1 md:grid-cols-2 ...` (für Textführung)
  - setzen: `max-w-2xl mx-auto text-center`
  - CTA: `flex flex-col sm:flex-row items-center justify-center`
  - Bild: responsive Platzierung (unterhalb oder rechts, ohne Textzentrum zu beeinflussen)
