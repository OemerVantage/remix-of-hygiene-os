
# Plan: Spendersystem-Bild rechts einfuegen

## Uebersicht
Das zuvor hochgeladene Spender-Bild wird rechts neben dem Text in der "Gratis Spendersystem"-Sektion platziert -- wie im Referenz-Screenshot gezeigt.

## Aenderungen

### 1. Bild ins Projekt kopieren
- `user-uploads://Gemini_Generated_Image_lrrt7vlrrt7vlrrt.png` nach `src/assets/dispenser-systems.png`

### 2. `src/components/FreeDispenserSection.tsx`

Layout von zentriertem Einspalt-Layout zu Zwei-Spalten-Layout umbauen:

- **Links (Text-Spalte)**: Badge, Ueberschrift, Beschreibung, CTA-Button -- Text bleibt zentriert wie im Screenshot
- **Rechts (Bild-Spalte)**: Das Spender-Bild, vertikal zentriert

Technisch:
- `grid grid-cols-1 md:grid-cols-2` mit `items-center`
- Text-Bereich bleibt `text-center`
- Bild mit `import dispenserImage from "@/assets/dispenser-systems.png"` einbinden
- Auf Mobile: Text oben, Bild unten (einspaltig)
- Bild bekommt leichten Schatten/Transparenz-Effekt fuer den schwebenden Look

### Betroffene Dateien

| Datei | Aenderung |
|-------|-----------|
| `src/assets/dispenser-systems.png` | Neues Bild (kopiert aus Upload) |
| `src/components/FreeDispenserSection.tsx` | Zwei-Spalten-Layout: Text links, Bild rechts |
