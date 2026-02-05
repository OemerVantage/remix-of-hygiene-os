

# Produktbeschreibung schön strukturieren

## Problem

Die Produktbeschreibung wird als einfacher Textblock angezeigt, obwohl die Informationen strukturiert sind (Beschreibung, Produkteigenschaften, Versandinformationen).

## Lösung

Die Produktdetailseite wird überarbeitet, um die Beschreibung in separate, visuell ansprechende Abschnitte aufzuteilen:

### Neues Layout

```
+----------------------------------+
|  Beschreibung                    |
|  (Fließtext mit Überschrift)     |
+----------------------------------+

+----------------------------------+
|  Produkteigenschaften            |
|  +------------+----------------+ |
|  | GTIN       | 4029068C92120  | |
|  | Abmessungen| 275x360x125mm  | |
|  | Material   | Kunststoff     | |
|  | Farbe      | weiß/schwarz   | |
|  +------------+----------------+ |
+----------------------------------+

+----------------------------------+
|  Versandinformationen            |
|  +------------+----------------+ |
|  | Inhalt/VE  | 1              | |
|  | VE/Palette | 60 Stück       | |
|  +------------+----------------+ |
+----------------------------------+
```

### Technische Umsetzung

**Datei: `src/pages/ProductDetail.tsx`**

1. Funktion erstellen, die den Beschreibungstext parst und in Abschnitte aufteilt
2. Abschnitte mit Cards und Tabellen darstellen
3. Icons für bessere Visualisierung (Package, Info, Truck)

**Parsing-Logik:**
- Sucht nach Schlüsselwörtern wie "Produkteigenschaften", "Versandinformationen"
- Extrahiert Key-Value-Paare aus dem Text
- Zeigt strukturierte Daten in einer übersichtlichen Tabelle

