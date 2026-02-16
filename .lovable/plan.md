
# Plan: Mehrere Anpassungen umsetzen

## 1. Produkt-Filter ersetzen mit festen Kategorien

Die bisherigen dynamischen Filter (Produkttyp, Hersteller, Preis) werden durch feste Kategorie-Buttons ersetzt:

- Handtuchrollenspender
- Handtuchspender
- Toilettenpapierspender
- Seifenspender
- Handtuchrollen
- Falthandtuecher
- Toilettenpapier
- Handseife
- Toilettenhygiene

Die Suchleiste bleibt bestehen. Statt dynamischer Checkboxen werden klickbare Kategorie-Chips/Buttons angezeigt, die als Filter auf den Produkttyp oder Tags wirken.

**Datei:** `src/components/ProductFilters.tsx`
- Dynamische `productTypes`, `vendors`, `priceRange`-Berechnung entfernen
- Feste Kategorie-Liste definieren
- Filter-UI durch Kategorie-Buttons ersetzen (ein Klick = Kategorie aktiv, nochmal klicken = deaktivieren)
- `FilterState` vereinfachen: `searchQuery` + `categories: string[]` statt productTypes/vendors/priceRange

**Datei:** `src/pages/Products.tsx`
- `FilterState` und Filterlogik anpassen: statt productTypes/vendors/priceRange nach `categories` filtern (Abgleich gegen `productType` und `tags` des Produkts)

---

## 2. Neue Sektion auf der Landingpage: "Gratis Spendersystem"

Eine neue CTA-Sektion wird zwischen den bestehenden Sektionen eingefuegt.

**Neue Datei:** `src/components/FreeDispenserSection.tsx`
- Auffaellige Sektion mit Ueberschrift "Gratis Spendersystem"
- Untertitel / Beschreibung
- CTA-Button "Rufen Sie uns an" oder Telefonnummer prominent angezeigt
- Telefon-Icon mit Kontaktinfo

**Datei:** `src/pages/Index.tsx`
- `FreeDispenserSection` importieren und zwischen bestehenden Sektionen einbinden (z.B. nach BestsellerSection oder vor CTASection)

---

## 3. "Ueber uns"-Seite: Timeline + Geschaeftsfuehrer-Vorstellung

### Timeline-Sektion
- Neue Sektion "Unsere Geschichte" mit einer einfachen vertikalen Timeline
- Kernpunkt: "Seit ueber 20 Jahren" existiert die Firma
- Meilensteine der Firmengeschichte

### Geschaeftsfuehrer-Sektion
- Vorstellung des Geschaeftsfuehrers (ohne Name und Gesicht)
- Silhouette/Icon statt Foto
- 34 Jahre Berufserfahrung
- Familienbetrieb hervorheben

**Datei:** `src/pages/About.tsx`
- Hero-Text anpassen: "Seit ueber 20 Jahren" statt "Seit ueber 8 Jahren"
- Statistik "20+" statt "8+" Jahre Erfahrung
- Neue Timeline-Sektion nach Mission einfuegen
- Neue Geschaeftsfuehrer-Sektion einfuegen

---

## 4. Schriftfarbe: Schwarz auf Dunkelgrau aendern

Die `--foreground`-Variable in `src/index.css` wird von einem sehr dunklen Farbton auf ein Dunkelgrau angepasst.

**Datei:** `src/index.css`
- Aendern: `--foreground: 220 30% 15%;` zu `--foreground: 220 15% 30%;` (Dunkelgrau statt fast-Schwarz)
- Gleiches fuer `--card-foreground`, `--popover-foreground`, `--secondary-foreground`

---

## Zusammenfassung der betroffenen Dateien

| Datei | Aenderung |
|-------|-----------|
| `src/components/ProductFilters.tsx` | Filter durch feste Kategorien ersetzen |
| `src/pages/Products.tsx` | Filterlogik an neue Kategorien anpassen |
| `src/components/FreeDispenserSection.tsx` | Neue Komponente: Gratis Spendersystem CTA |
| `src/pages/Index.tsx` | FreeDispenserSection einbinden |
| `src/pages/About.tsx` | Timeline, GF-Vorstellung, "20 Jahre" anpassen |
| `src/index.css` | Foreground-Farbe auf Dunkelgrau aendern |
