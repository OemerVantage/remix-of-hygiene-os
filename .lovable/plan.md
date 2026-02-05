

## Ziel
Das Feld "Farbe" in den Produkteigenschaften soll sich automatisch ändern, wenn der Benutzer zwischen den Varianten (schwarz/weiß) wechselt.

## Problem
Aktuell wird die Farbe aus der statischen Produktbeschreibung gelesen ("Farbe: schwarz"). Diese ändert sich nicht beim Variantenwechsel.

## Lösung
Die gewählte Variante enthält bereits die Farboption in `selectedOptions`. Diese Information wird an die `ProductDescription`-Komponente übergeben und überschreibt den statischen Farbwert.

## Technische Umsetzung

```text
Variante gewählt (z.B. "Weiß")
         ↓
selectedOptions: [{name: "Farbe", value: "Weiß"}]
         ↓
ProductDescription erhält selectedOptions
         ↓
Farbe in Tabelle wird überschrieben: "Weiß"
```

## Dateien

| Datei | Änderung |
|-------|----------|
| `src/pages/ProductDetail.tsx` | `selectedOptions` der gewählten Variante an `ProductDescription` übergeben |
| `src/components/ProductDescription.tsx` | Neues Prop `selectedOptions` empfangen und Farbe daraus übernehmen |

## Ablauf
1. `ProductDetail.tsx`: Die `selectedOptions` der aktuellen Variante werden als Prop weitergereicht
2. `ProductDescription.tsx`: Prüft ob in `selectedOptions` eine "Farbe"-Option existiert
3. Falls ja: Überschreibt den statischen Farbwert in den Produkteigenschaften mit dem dynamischen Wert

## Resultat
- Bei Auswahl "Schwarz" → Tabelle zeigt "Farbe: schwarz"
- Bei Auswahl "Weiß" → Tabelle zeigt "Farbe: weiß"

