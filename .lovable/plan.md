
# Plan: Module-Karten zum Shop verlinken

## Problem
Die Module-Karten (Spender, Verbrauchsmaterial, Desinfektion, Reinigung) haben aktuell einen Anker-Link `href="#shop"`, der nirgendwo hinfuehrt. Sie sollen zur Produktseite navigieren.

## Loesung
Die `<a>`-Tags durch React Router `<Link>`-Komponenten ersetzen, die zur Produktseite `/produkte` navigieren. Das Layout und alle Styling-Klassen bleiben unverändert.

---

## Technische Aenderung

**Datei:** `src/components/ModulesSection.tsx`

### 1. Import hinzufuegen (Zeile 1):
```
import { Link } from "react-router-dom";
```

### 2. Anchor-Tag in Link umwandeln (Zeile 48-52):

**Vorher:**
```
<a
  key={module.title}
  href="#shop"
  className="group relative overflow-hidden bg-card rounded-2xl p-8 hover-lift shadow-card border border-border/50"
>
```

**Nachher:**
```
<Link
  key={module.title}
  to="/produkte"
  className="group relative overflow-hidden bg-card rounded-2xl p-8 hover-lift shadow-card border border-border/50"
>
```

### 3. Schliessendes Tag aendern (Zeile 80):

**Vorher:**
```
</a>
```

**Nachher:**
```
</Link>
```

---

## Ergebnis

| Modul-Karte | Navigation |
|-------------|------------|
| Spender | `/produkte` |
| Verbrauchsmaterial | `/produkte` |
| Desinfektion | `/produkte` |
| Reinigung | `/produkte` |

Alle Modul-Karten fuehren bei Klick direkt zur Produkte-Seite. Das Layout, die Groesse und die Animations-Effekte bleiben erhalten.

---

## Betroffene Datei

| Datei | Aenderung |
|-------|-----------|
| `src/components/ModulesSection.tsx` | `Link` importieren, `<a href="#shop">` durch `<Link to="/produkte">` ersetzen |
