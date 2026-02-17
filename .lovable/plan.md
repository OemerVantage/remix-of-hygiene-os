

# Plan: Geschaeftsfuehrer-Sektion neu gestalten

## Uebersicht
Die aktuelle Geschaeftsfuehrer-Sektion mit Karten-Layout und Avatar-Silhouette wird zu einer offenen "Vorstellung"-Sektion umgebaut -- im gleichen Stil wie die anderen Sektionen auf der Ueber-uns-Seite (z.B. "Unsere Mission" oder "Unsere Geschichte").

## Aktuell vs. Neu

| Aktuell | Neu |
|---------|-----|
| Abgerundete Karte mit Rahmen | Offenes Layout ohne Karte, wie die anderen Sektionen |
| Avatar-Silhouette (Kreis mit User-Icon) | Kein Avatar, kein Icon |
| Horizontal: Bild links, Text rechts | Zentrierter Aufbau mit Badge, Ueberschrift, Beschreibung |
| Einzelne Karte | Sektions-Layout wie "Unsere Mission" |

## Neues Layout

Aufbau (zentriert, wie die anderen Sektionen):

1. Badge: "Geschaeftsfuehrung" (wie bei den anderen Sektionen)
2. Ueberschrift: "Gefuehrt mit Erfahrung & Leidenschaft"
3. Beschreibungstext mit den Kerninfos (34 Jahre Erfahrung, Familienbetrieb, persoenliche Betreuung)
4. Optional: Die zwei Info-Punkte (Berufserfahrung, Familienbetrieb) als einfache Text-Zeilen oder dezente Highlight-Boxen

## Betroffene Datei

| Datei | Aenderung |
|-------|-----------|
| `src/pages/About.tsx` | Geschaeftsfuehrer-Sektion: Karten-Layout und Avatar entfernen, offenes Sektions-Layout wie die restlichen Bereiche |

