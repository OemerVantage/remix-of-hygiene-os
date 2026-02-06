
# Plan: Grid-Layout auf 5 Spalten zurücksetzen

## Problem
Das Grid-Layout wurde von `lg:grid-cols-5` auf `lg:grid-cols-6` geändert, was die Kartengröße verändert hat.

## Lösung
Nur die Grid-Klasse zurückändern - die Verlinkung mit React Router und die industries-Daten bleiben erhalten.

---

## Technische Änderung

**Datei:** `src/components/SolutionsSection.tsx`

### Zeile 17 ändern:

**Aktuell:**
```
<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6">
```

**Zurück zu:**
```
<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
```

---

## Hinweis
Da die `industries`-Daten 6 Einträge enthalten (inklusive Hotellerie), wird bei 5 Spalten die 6. Karte in eine zweite Zeile umbrechen.

---

## Was bleibt erhalten
- Verlinkung zu `/branchenloesungen/{slug}` via React Router
- Alle 6 Branchen aus `industries` werden angezeigt
- Icons, Titel und Beschreibungen

## Betroffene Datei

| Datei | Änderung |
|-------|----------|
| `src/components/SolutionsSection.tsx` | Grid von `lg:grid-cols-6` zurück auf `lg:grid-cols-5` |
