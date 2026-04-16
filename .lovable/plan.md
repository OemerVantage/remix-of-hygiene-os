
## Plan: Bei Seitenwechsel automatisch an den Seitenanfang scrollen

### Problem (klargestellt)
Aktuell: Beim Klicken auf einen Link (Navbar/Footer) öffnet sich die neue Seite, aber die Scroll-Position der alten Seite bleibt erhalten – der Nutzer landet mitten/unten in der neuen Seite.

Gewünscht: Bei jedem Seitenwechsel soll automatisch **ganz nach oben (Anfang der Seite)** gescrollt werden.

### Lösung
Eine kleine `ScrollToTop`-Komponente, die bei jedem Routenwechsel `window.scrollTo(0, 0)` ausführt – also **an den Seitenanfang** springt.

### Änderungen

1. **Neue Datei `src/components/ScrollToTop.tsx`**
   - Nutzt `useLocation()` aus react-router-dom
   - `useEffect` reagiert auf `pathname`-Änderung → `window.scrollTo(0, 0)`
   - Rendert nichts (`return null`)

2. **`src/App.tsx`**
   - `<ScrollToTop />` direkt nach `<BrowserRouter>` und vor `<AppContent />` einfügen
   - Wirkt damit global für alle Routen (Navbar-Links, Footer-Links, programmatische Navigation)

### Keine Backend-Änderungen
Reine Frontend-Anpassung in zwei Dateien.
