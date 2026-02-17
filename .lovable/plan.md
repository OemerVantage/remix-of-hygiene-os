

# Plan: Geschaeftsfuehrung-Sektion nach oben verschieben

## Uebersicht
Die "Geschaeftsfuehrung"-Sektion wird von ihrer aktuellen Position (zwischen "Unsere Geschichte" und "Unsere Werte") nach oben verschoben -- direkt vor die "Unsere Geschichte"-Sektion.

## Neue Reihenfolge der Sektionen

1. Hero
2. Unsere Mission
3. **Geschaeftsfuehrung** (hierhin verschoben)
4. Unsere Geschichte
5. Unsere Werte
6. Nachhaltigkeit

## Betroffene Datei

| Datei | Aenderung |
|-------|-----------|
| `src/pages/About.tsx` | Den Geschaeftsfuehrung-Abschnitt (Zeilen 174-199) ausschneiden und vor der Timeline-Sektion (vor Zeile 118) einfuegen |

Keine inhaltlichen Aenderungen -- nur die Position im Code aendert sich.

