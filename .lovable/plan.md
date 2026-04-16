
## Plan: Gründungsjahr überall auf 2005 korrigieren

### Änderungen

**1. `src/components/HeroSection.tsx`** (Zeile 27)
- `"Seit 2006 Ihr Partner..."` → `"Seit 2005 Ihr Partner..."`

**2. `src/pages/About.tsx`**
- Zeile 52 (Timeline): `year: "2004"` → `year: "2005"`
- Zeile 162 (Badge): `"Seit über 20 Jahren"` → `"Seit 2005"`
- Hero-Text "Seit über 20 Jahren" bleibt (stimmt seit 2005 weiterhin)

**3. Suche nach weiteren Vorkommen**
Vor der Umsetzung prüfe ich via `search_files` nach `2004`, `2006`, `seit 20`, um sicherzugehen, dass keine Stelle übersehen wird (z.B. in `index.html`, Footer, Meta-Tags).

### Keine Backend-Änderungen
Reine Textanpassungen im Frontend.
