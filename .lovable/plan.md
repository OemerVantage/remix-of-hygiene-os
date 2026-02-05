

# Parser-Fix für Produktbeschreibung

## Problem

Der aktuelle Parser erkennt das Shopify-Beschreibungsformat nicht:
- Sektionen sind mit `**Fett**` markiert (z.B. `**Produkteigenschaften**`)
- Zeilen beginnen mit `•` Bullet Points
- Format: `• Abmessungen: 275 mm x 360 mm`

## Lösung

Die `parseProductDescription` Funktion wird angepasst:

### Änderungen in `src/components/ProductDescription.tsx`

1. **Regex für Sektionsüberschriften anpassen** - `**Produkteigenschaften**` und `**Versandinformationen**` erkennen

2. **Bullet Points entfernen** - `•` am Zeilenanfang strippen bevor Key-Value geparst wird

3. **Markdown-Sternchen ignorieren** - `**` aus dem Text entfernen

### Neue Parser-Logik

```javascript
// Regex erkennt beide Formate
text.split(/\*{0,2}Produkteigenschaften\*{0,2}[:\s]*/i)

// Bullet Points entfernen
line.replace(/^[•\-\*]\s*/, '')
```

### Ergebnis

| Tab | Inhalt |
|-----|--------|
| Beschreibung | Der celtex® L Falthandtuchspender ist abschließbar... |
| Eigenschaften | Abmessungen, Material, Kapazität als Tabelle |
| Versand | Inhalt/VE, VE/Palette als Tabelle |

