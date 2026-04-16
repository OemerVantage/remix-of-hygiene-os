
## Plan: Logo überall verkleinern

### Problem
Nach dem Auto-Crop ist das Logo formatfüllend und wirkt dadurch in Header und Footer zu gross/dominant.

### Lösung
Logo-Höhen reduzieren:

1. **`src/components/Header.tsx`**
   - Desktop/Mobile Logo: `h-28` → `h-12`
   - Header-Höhe der Nav: `h-28` → `h-20` (passt zum kleineren Logo, kompaktere Navbar)
   - Mobile-Menu Top-Position: `top-28` → `top-20` (muss zur Header-Höhe passen)

2. **`src/pages/IndustryDetail.tsx`**
   - Hero-Padding `pt-28` → `pt-20` (an neue Header-Höhe angleichen)

3. **`src/components/Footer.tsx`**
   - Logo: `h-16` → `h-12` (proportional zum Header)

### Nicht betroffen
- Logo-Datei selbst bleibt unverändert (bereits sauber gecroppt).
- Keine weiteren Seiten/Komponenten – Logo wird nur in Header und Footer eingebunden.
- Keine Backend-Änderungen.

### Hinweis
Solche reinen Grössenanpassungen kannst du in Zukunft auch kostenlos über **Visual Edits** (Edit-Button unten links im Chat) erledigen.
