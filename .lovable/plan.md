
## Ziel
Produktbilder verbessern: Bilder werden zentriert und proportional skaliert angezeigt. Bei Klick öffnet sich eine Lightbox mit dem vergrößerten Bild.

## Änderungen

### 1. Bild-Darstellung verbessern (`src/pages/ProductDetail.tsx`)

**Problem aktuell:**
- `object-cover` schneidet Bilder zu (wie in deinem Screenshot mit dem schwarzen Kasten)
- Kein Klick zum Vergrößern möglich

**Lösung:**
- `object-cover` → `object-contain` für proportionale Skalierung ohne Zuschneiden
- Weißer/heller Hintergrund für bessere Darstellung
- Cursor-Pointer und Hover-Effekt für Klickbarkeit
- Lightbox-State für Vollbildansicht

### 2. Lightbox-Komponente hinzufügen

Neue Lightbox-Funktionalität mit Dialog:
- Vollbild-Overlay beim Klick auf Hauptbild
- Bild zentriert und maximal groß
- Schließen per X-Button oder Klick außerhalb
- Navigation zwischen Bildern möglich (falls mehrere vorhanden)

## Technische Umsetzung

```text
+---------------------------+
|  Produktbild Container    |
|  +---------------------+  |
|  |                     |  |
|  |   Bild zentriert    |  | ← object-contain
|  |   (proportional)    |  |
|  |                     |  |
|  +---------------------+  |
|         ↓ Klick           |
+---------------------------+
         ↓
+---------------------------+
|     Lightbox (Dialog)     |
|  +---------------------+  |
|  |                     |  |
|  |   Vollbild-Ansicht  |  |
|  |                     |  |
|  +---------------------+  |
|    [←]  1/3  [→]  [X]     |
+---------------------------+
```

## Dateien

| Datei | Änderung |
|-------|----------|
| `src/pages/ProductDetail.tsx` | Lightbox-State, `object-contain`, Dialog für Vollbild |

## Resultat
- Bilder werden immer vollständig angezeigt (nicht zugeschnitten)
- Bilder sind zentriert mit neutralem Hintergrund
- Bei Klick öffnet sich eine große Ansicht
- Navigation zwischen mehreren Bildern in der Lightbox
