
## Plan: Neues HygiSwiss AG Logo überall ersetzen

### Vorgehen

1. **Logo-Datei kopieren**
   - `user-uploads://ChatGPT_Image_17._Apr._2026_00_08_45.png` → `src/assets/logo.png`
   - Überschreibt das aktuelle Logo. Da alle Komponenten via `import logo from "@/assets/logo.png"` referenzieren, wird es automatisch überall aktiv.

2. **Betroffene Stellen (automatisch aktualisiert)**
   - `src/components/Header.tsx` (Desktop + Mobile Navigation)
   - `src/components/Footer.tsx` (Footer-Branding)
   - Alle weiteren Komponenten, die `@/assets/logo.png` importieren

3. **Prüfung**
   - Vor der Umsetzung: `search_files` nach `logo.png` und `logo.svg`, um sicherzustellen, dass keine alternative Logo-Datei woanders eingebunden ist (z.B. `public/`, `index.html`, Edge Functions für Email).
   - Falls in `index.html` oder Email-Templates ein anderes Logo referenziert wird, ebenfalls anpassen.

4. **Favicon**
   - Bleibt unverändert (separate Datei `/favicon.png`). Falls das Logo auch als Favicon gewünscht ist, bitte separat melden.

### Keine Backend-Änderungen
Reiner Asset-Austausch.
