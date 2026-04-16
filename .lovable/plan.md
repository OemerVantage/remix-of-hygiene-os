
## Plan: Transparenten Rand vom Logo entfernen + Footer-Logo verkleinern

### Problem
Das hochgeladene Logo (`src/assets/logo.png`) hat rundherum viel transparenten Leerraum. Dadurch wirkt es im Footer (und auch sonst) viel kleiner und „verloren", obwohl es mit `h-28` gerendert wird – die sichtbare Marke nimmt nur einen Bruchteil der Bildfläche ein.

### Lösung
1. **Logo-Bild beschneiden (Auto-Crop)**
   - Mit Python/Pillow im sandbox die transparenten Ränder von `src/assets/logo.png` automatisch entfernen (`image.getbbox()` → `image.crop(bbox)`).
   - Datei wird an Ort und Stelle überschrieben → wirkt automatisch in Header, Footer und überall sonst, da alle Komponenten dieselbe Datei importieren.
   - QA: Vorher-/Nachher-Dimensionen ausgeben und das gecroppte Bild kurz visuell prüfen.

2. **Footer-Logo zusätzlich verkleinern** (`src/components/Footer.tsx`)
   - `h-28` → `h-16`, damit das Logo proportional zum Footer-Kontext passt (war im vorherigen Plan bereits genehmigt, wird hier mit umgesetzt).

### Nicht betroffen
- Header bleibt bei `h-28` – wirkt durch das gecroppte Logo automatisch markanter, ohne Code-Änderung.
- Keine Backend-Änderungen.
