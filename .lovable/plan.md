
# Plan: Produktbilder zentriert und vollständig anzeigen

## Problem
Aktuell verwenden die Produktkarten `object-cover` für die Bilder. Das bewirkt:
- Bilder werden beschnitten um den quadratischen Container zu füllen
- Manche Produkte erscheinen "reingezoomt"
- Das vollständige Produkt ist nicht immer sichtbar

## Lösung
Änderung von `object-cover` zu `object-contain` mit zusätzlichem Padding und weißem Hintergrund. Das entspricht dem gleichen Stil, der bereits auf der Produktdetailseite verwendet wird.

## Technische Änderung

**Datei:** `src/components/ProductCard.tsx`

Änderung in der Bild-Komponente (Zeile 49-61):

**Vorher:**
```
<div className="aspect-square overflow-hidden bg-secondary/10">
  <img 
    src={image.url} 
    alt={image.altText || node.title}
    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
  />
```

**Nachher:**
```
<div className="aspect-square overflow-hidden bg-white border-b border-border">
  <img 
    src={image.url} 
    alt={image.altText || node.title}
    className="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-300"
  />
```

## Visuelle Verbesserungen

| Eigenschaft | Vorher | Nachher |
|-------------|--------|---------|
| Bild-Fitting | `object-cover` (beschnitten) | `object-contain` (vollständig) |
| Hintergrund | `bg-secondary/10` (grau) | `bg-white` (weiß) |
| Innenabstand | Keiner | `p-4` (16px) |
| Trennung | Keine | `border-b border-border` |

## Ergebnis
- Alle Produktbilder werden vollständig und zentriert angezeigt
- Einheitlicher weißer Hintergrund wie auf der Produktdetailseite
- Subtile Linie trennt das Bild vom Textbereich
- Hover-Zoom-Effekt bleibt erhalten
