

# Timeline-Sektion von About-Seite entfernen

## Änderungen

### Datei: `src/pages/About.tsx`

**Entfernen:**
1. **Timeline-Sektion (Zeilen 132-169)** - Die gesamte "Unsere Geschichte" Sektion mit der vertikalen Timeline und Milestone-Karten
2. **milestones Array (Zeilen 28-34)** - Die Konstante ist nur für diese Sektion erforderlich und wird nicht mehr benötigt

**Nach der Änderung:**
- About-Seite enthält nur noch: Hero → Mission → Values
- Kurzer, fokussierter Überblick ohne historische Details

