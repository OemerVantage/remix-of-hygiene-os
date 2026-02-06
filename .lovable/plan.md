
# Plan: Suchfeld-Fokus-Problem beheben

## Problem
Bei jeder Eingabe einer Ziffer/Buchstabe verliert das Suchfeld den Fokus. Der Benutzer muss erneut in das Feld klicken.

## Ursache
In `ProductFilters.tsx` sind `SearchBar` und `FilterContent` als Funktionen innerhalb der Komponente definiert:

```text
const SearchBar = () => (...)    // Zeile 201
const FilterContent = () => (...) // Zeile 106
```

Bei jedem State-Update (z.B. `setLocalSearch`) wird die gesamte `ProductFilters`-Komponente neu gerendert. Dabei werden `SearchBar` und `FilterContent` als **neue Funktionen** erstellt. React erkennt diese als neue Komponenten und mountet sie komplett neu - der Fokus geht verloren.

## Loesung
Die inneren Funktionen durch direktes JSX ersetzen. Statt einer Funktion, die JSX zurueckgibt, wird das JSX direkt in den Return eingebettet.

## Technische Aenderung

**Datei:** `src/components/ProductFilters.tsx`

1. **SearchBar-Funktion entfernen** (Zeile 200-212) und das JSX direkt verwenden
2. **FilterContent-Funktion entfernen** (Zeile 106-198) und das JSX direkt einbetten
3. **ActiveFilters-Funktion entfernen** (Zeile 214-254) und das JSX direkt einbetten

### Vorher (vereinfacht):

```text
const SearchBar = () => (
  <div className="relative">
    <Input value={localSearch} onChange={...} />
  </div>
);

return (
  <div>
    <SearchBar />
  </div>
);
```

### Nachher (vereinfacht):

```text
const searchBarContent = (
  <div className="relative">
    <Input value={localSearch} onChange={...} />
  </div>
);

return (
  <div>
    {searchBarContent}
  </div>
);
```

## Warum funktioniert das?
- JSX-Variablen werden bei Re-Renders nicht als "neue Komponenten" behandelt
- React erkennt, dass es sich um das gleiche Input-Element handelt
- Der Fokus bleibt erhalten

## Betroffene Datei

| Datei | Aenderung |
|-------|-----------|
| `src/components/ProductFilters.tsx` | Innere Funktionskomponenten durch JSX-Variablen ersetzen |
