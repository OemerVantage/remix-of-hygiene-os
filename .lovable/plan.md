

# Plan: Header-Button "Kontakt aufnehmen" zu "Zum Shop" aendern

## Aenderung

**Datei:** `src/components/Header.tsx`

Der primaere Button rechts oben im Header wird von "Kontakt aufnehmen" (verlinkt auf `/kontakt`) zu "Zum Shop" (verlinkt auf `/produkte`) geaendert.

Betrifft zwei Stellen:
1. **Desktop-Navigation** (Zeile 87-91): Link und Button-Text aendern
2. **Mobile-Menue** (Zeile 131-133): Link und Button-Text aendern

## Technische Details

- `href`: `/kontakt` wird zu `/produkte`
- Button-Text: "Kontakt aufnehmen" wird zu "Zum Shop"
- Styling und Variante bleiben gleich (`variant="default"`)
- **1 Datei**, **2 Stellen** betroffen

