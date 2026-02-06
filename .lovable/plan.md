
# Plan: "Bildung & Kinderbetreuung" von der Homepage entfernen

## Übersicht
Die Branche "Bildung & Kinderbetreuung" soll nur auf der Startseite ausgeblendet werden. Auf anderen Seiten (z.B. `/branchenloesungen`) bleibt sie weiterhin sichtbar.

---

## Lösung
Die `SolutionsSection`-Komponente filtert die Branchen-Liste, sodass "Bildung & Kinderbetreuung" (slug: `bildung-kinderbetreuung`) nicht angezeigt wird.

---

## Technische Änderung

**Datei:** `src/components/SolutionsSection.tsx`

### Zeilen 17-18 ändern:

**Vorher:**
```tsx
<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
  {industries.map((industry, index) => (
```

**Nachher:**
```tsx
<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
  {industries
    .filter((industry) => industry.slug !== "bildung-kinderbetreuung")
    .map((industry, index) => (
```

---

## Ergebnis

| Seite | "Bildung & Kinderbetreuung" sichtbar? |
|-------|---------------------------------------|
| Homepage (SolutionsSection) | Nein |
| `/branchenloesungen` | Ja |
| `/branchenloesungen/bildung-kinderbetreuung` | Ja (Detailseite weiterhin erreichbar) |

Das Grid zeigt dann nur noch 5 Branchen:
1. Hotellerie
2. Gastronomie
3. Gesundheitswesen
4. Büro & Verwaltung
5. Industrie & Produktion

---

## Betroffene Datei

| Datei | Änderung |
|-------|----------|
| `src/components/SolutionsSection.tsx` | Filter hinzufügen um "bildung-kinderbetreuung" auszuschliessen |
