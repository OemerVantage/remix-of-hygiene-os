
# Plan: Globale Suche und Produktfilter

## Ziel
Erweiterte Suchfunktion auf der Produktseite, die nach Artikelnummer (SKU), Titel, Beschreibung und Tags sucht. Zusaetzlich Filteroptionen fuer Produkttyp, Hersteller und Preis.

---

## Funktionsumfang

### Globale Suche
- Suche nach **Produktname**
- Suche nach **Artikelnummer (SKU)** aller Varianten
- Suche nach **Beschreibung**
- Suche nach **Tags** (z.B. "autocut", "hygiene")

### Filter
- **Produkttyp** (z.B. Handtuchrollenspender, Handtuchspender, Schaumseifenspender)
- **Hersteller/Marke** (Vendor, z.B. Celtex, CLIVIA)
- **Preisbereich** (Min/Max Slider oder Eingabefelder)
- Filter zuruecksetzen Button

### UX/Design
- Desktop: Filter-Sidebar links neben Produktraster
- Mobile: Filter-Button oeffnet Sheet von links
- Aktive Filter als Badges anzeigen
- Anzahl gefundene Produkte anzeigen

---

## Technische Umsetzung

### 1. Neue Komponente: ProductFilters

**Neue Datei:** `src/components/ProductFilters.tsx`

Enthaelt:
- Suchfeld mit Debounce (300ms)
- Collapsible-Sektionen fuer jeden Filtertyp
- Checkbox-Liste fuer Produkttyp und Hersteller
- Preis-Slider oder Min/Max Inputs
- Reset-Button

### 2. Products Page erweitern

**Datei:** `src/pages/Products.tsx`

Aenderungen:
- State fuer Filter hinzufuegen (productTypes, vendors, priceRange)
- Filterlogik erweitern um SKU-Suche in allen Varianten
- Layout aendern: Sidebar + Grid (Desktop) / Sheet + Grid (Mobile)
- Dynamische Extraktion der verfuegbaren Filteroptionen aus Produktdaten

### 3. Erweiterte Suchlogik

Die Suche durchsucht:

```text
Produkt
├── title (Produktname)
├── description (Beschreibung)
├── productType (Produkttyp)
├── vendor (Hersteller)
├── tags (Schlagwoerter)
└── variants[]
    └── sku (Artikelnummer pro Variante)
```

---

## Neues Layout (Desktop)

```text
┌────────────────────────────────────────────────────────────┐
│  Header                                                     │
├────────────────────────────────────────────────────────────┤
│  Hero: "Unsere Produkte" + Suchfeld                        │
├──────────────┬─────────────────────────────────────────────┤
│              │                                              │
│   Filter     │   Produktraster                             │
│   Sidebar    │   (3-4 Spalten)                             │
│              │                                              │
│  - Typ       │   [Card] [Card] [Card] [Card]               │
│  - Marke     │   [Card] [Card] [Card] [Card]               │
│  - Preis     │   ...                                        │
│              │                                              │
│  [Reset]     │   "12 Produkte gefunden"                    │
│              │                                              │
└──────────────┴─────────────────────────────────────────────┘
```

## Neues Layout (Mobile)

```text
┌────────────────────────────────────────────────┐
│  Header                                         │
├────────────────────────────────────────────────┤
│  "Unsere Produkte"                             │
│  [Suchfeld                              ]      │
│  [Filter-Button]  "12 Produkte"                │
├────────────────────────────────────────────────┤
│  [Card]  [Card]                                │
│  [Card]  [Card]                                │
│  ...                                           │
└────────────────────────────────────────────────┘
```

---

## Dateien

| Datei | Aenderung |
|-------|-----------|
| `src/components/ProductFilters.tsx` | **Neu** - Filter-Komponente mit Suche, Typ, Marke, Preis |
| `src/pages/Products.tsx` | Layout mit Sidebar, erweiterte Suchlogik inkl. SKU |
| `src/lib/shopify.ts` | ggf. Tags-Feld zur Query hinzufuegen (falls nicht vorhanden) |

---

## Beispiel Filterlogik

Die erweiterte Suche prueft:

```text
Suchbegriff "C92660" findet:
→ Produkt "celtex autocut Handtuchrollenspender"
  (weil Variante "Schwarz" SKU = "C92660" hat)

Suchbegriff "autocut" findet:
→ Produkt "celtex autocut Handtuchrollenspender"
  (weil "autocut" im Titel und in den Tags ist)
```

