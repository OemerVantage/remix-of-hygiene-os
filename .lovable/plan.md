
# Plan: Navbar-Reihenfolge anpassen

## Aktuelle Reihenfolge
1. Über uns
2. Branchenlösungen
3. Produkte
4. Ratgeber
5. Kontakt

## Neue Reihenfolge (wie gewünscht)
1. Branchenlösungen
2. Produkte
3. Ratgeber
4. Über uns
5. Kontakt

---

## Technische Änderung

**Datei:** `src/components/Header.tsx`

### Zeilen 9-15 ändern:

**Vorher:**
```tsx
const navItems = [
  { label: "Über uns", href: "/ueber-uns" },
  { label: "Branchenlösungen", href: "/branchenloesungen" },
  { label: "Produkte", href: "/produkte", highlight: true },
  { label: "Ratgeber", href: "/ratgeber" },
  { label: "Kontakt", href: "/kontakt" },
];
```

**Nachher:**
```tsx
const navItems = [
  { label: "Branchenlösungen", href: "/branchenloesungen" },
  { label: "Produkte", href: "/produkte", highlight: true },
  { label: "Ratgeber", href: "/ratgeber" },
  { label: "Über uns", href: "/ueber-uns" },
  { label: "Kontakt", href: "/kontakt" },
];
```

---

## Ergebnis

Die Navigation zeigt nun die Links in der gewünschten Reihenfolge - sowohl auf Desktop als auch im Mobile-Menü.

| Position | Menüpunkt |
|----------|-----------|
| 1 | Branchenlösungen |
| 2 | Produkte (hervorgehoben) |
| 3 | Ratgeber |
| 4 | Über uns |
| 5 | Kontakt |

## Betroffene Datei

| Datei | Änderung |
|-------|----------|
| `src/components/Header.tsx` | Reihenfolge im `navItems`-Array anpassen |
