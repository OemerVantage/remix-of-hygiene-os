
## Plan: Navbar auf Branchenlösungs-Detailseiten dauerhaft weiss

### Problem
Auf `/branchenloesungen/:handle` (Hotellerie, Gastronomie, Gesundheitswesen, etc.) gibt es einen grossen Hero mit dunklem Bild. Die Navbar ist im Header nur dann weiss/mit Hintergrund, wenn `window.scrollY > 20`. Ganz oben ist sie transparent → Logo und Menüpunkte sind auf dem Bild kaum lesbar.

### Lösung
Die `Header`-Komponente erhält eine optionale Eigenschaft, die den transparenten Modus deaktiviert und sie immer mit weissem (Card-)Hintergrund rendert. Auf der Detailseite wird diese Variante genutzt.

### Änderungen

1. **`src/components/Header.tsx`**
   - Neue optionale Prop `alwaysSolid?: boolean`.
   - Wenn `alwaysSolid` true ist, wird unabhängig vom Scroll-Status die Klasse `bg-card/95 backdrop-blur-md shadow-sm` verwendet.

2. **`src/pages/IndustryDetail.tsx`**
   - `<Header alwaysSolid />` verwenden.
   - Damit der Hero nicht hinter der nun sichtbaren Navbar verschwindet, das Hero-Padding leicht anpassen (bereits `pt-20` vorhanden – ggf. auf `pt-28` erhöhen, passend zur Header-Höhe `h-28`).

### Nicht betroffen
- Startseite, Produkte, Über uns etc. behalten das bisherige Verhalten (transparent → solid beim Scrollen).
- Keine Backend-Änderungen.
