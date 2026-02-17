

# Plan: Favicon mit dem hochgeladenen Logo ersetzen

## Aenderung

Das hochgeladene Bild (`user-uploads://image-27.png`) wird als neues Favicon verwendet.

**Schritt 1:** Die Datei `user-uploads://image-27.png` wird nach `public/favicon.png` kopiert (ersetzt das bisherige Favicon).

**Schritt 2:** Die Referenz in `index.html` (Zeile 19) bleibt unveraendert, da sie bereits auf `/favicon.png` zeigt:
```html
<link rel="icon" type="image/png" href="/favicon.png" />
```

## Zusammenfassung
- **1 Datei** wird kopiert: das hochgeladene Logo ersetzt `public/favicon.png`
- Keine Code-Aenderung noetig, da `index.html` bereits korrekt konfiguriert ist

