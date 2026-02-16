

# Plan: Filter als Sidebar mit gruppierten Kategorien

## Übersicht
Die aktuellen horizontalen Kategorie-Chips werden durch eine Sidebar-Filterleiste auf der linken Seite ersetzt -- so wie es vorher war. Die Kategorien werden in Gruppen organisiert.

## Kategoriegruppen

| Gruppe | Kategorien |
|--------|-----------|
| Spendertyp | Handtuchrollenspender, Handtuchspender, Toilettenpapierspender, Seifenspender |
| Verbrauchsmaterial | Handtuchrollen, Falthandtuecher, Toilettenpapier, Handseife |
| *(ohne Gruppe)* | Toilettenhygiene |

---

## Technische Aenderungen

### 1. `src/components/ProductFilters.tsx` -- Sidebar mit Gruppen

- Flache `CATEGORIES`-Liste ersetzen durch gruppierte Struktur:
```tsx
const FILTER_GROUPS = [
  {
    label: "Spendertyp",
    items: ["Handtuchrollenspender", "Handtuchspender", "Toilettenpapierspender", "Seifenspender"],
  },
  {
    label: "Verbrauchsmaterial",
    items: ["Handtuchrollen", "Falthandtuecher", "Toilettenpapier", "Handseife"],
  },
  {
    label: "Sonstiges",
    items: ["Toilettenhygiene"],
  },
];
```

- Layout aendern: vertikale Sidebar statt horizontale Chips
- Jede Gruppe bekommt eine Ueberschrift und darunter Checkboxen (oder klickbare Items) fuer die einzelnen Kategorien
- Suchleiste bleibt oben in der Sidebar
- "Zuruecksetzen"-Button und Produktanzahl bleiben erhalten

### 2. `src/pages/Products.tsx` -- Zwei-Spalten-Layout

- Layout von einspaltig zu zweispaltig aendern: Filter-Sidebar links, Produkt-Grid rechts
- Auf Mobile: Filter oberhalb des Grids (responsive)

```
Desktop:                    Mobile:
+--------+-----------+      +----------------+
| Filter | Produkte  |      | Filter         |
| Bar    | Grid      |      +----------------+
|        |           |      | Produkte Grid  |
+--------+-----------+      +----------------+
```

- `FilterState` bleibt gleich (`searchQuery` + `categories: string[]`)
- Filterlogik in `filteredProducts` bleibt unveraendert

---

## Betroffene Dateien

| Datei | Aenderung |
|-------|-----------|
| `src/components/ProductFilters.tsx` | Sidebar-Layout mit gruppierten Kategorien und Checkboxen |
| `src/pages/Products.tsx` | Zwei-Spalten-Layout: Sidebar links, Grid rechts |

