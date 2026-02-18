

# Plan: Branchendaten und Detailseite aktualisieren

## Uebersicht
Die Texte, Beschreibungen und Kacheln der Branchenloesungen werden mit den neuen, auf Spendersysteme und Verbrauchsmaterialien ausgerichteten Inhalten ersetzt. Die Detailseite wird entsprechend angepasst.

## Aenderungen

### 1. Branchendaten aktualisieren (`src/data/industries.ts`)

Alle 6 Branchen erhalten neue Texte:

| Branche | Neuer Subtitle | Neue Kacheln |
|---|---|---|
| Hotellerie | Professionelle Hygieneloesungen fuer Hotels und Unterkuenfte aller Groessen. | Handtuchspender, Seifenspender, Toilettenhygiene, Gaestebereiche |
| Gastronomie | Hygienische Loesungen fuer Restaurants, Cafes und Catering. | Seifenspender, Handtuchrollenspender, Toilettenpapier, Personalbereich |
| Gesundheitswesen | Zuverlaessige Hygieneprodukte fuer Praxen, Kliniken und Pflegeeinrichtungen. | Seifenspender, Handtuchspender, Toilettenhygiene, Verbrauchsmaterial |
| Industrie & Produktion | Robuste Hygieneloesungen fuer Produktionsstaetten und Werkstaetten. | Handtuchrollenspender, Handseife, Toilettenpapier, Grossverbraucher-Loesungen |
| Bildung & Kinderbetreuung | Kindgerechte Hygieneprodukte fuer Schulen und Kitas. | Seifenspender, Handtuchspender, Toilettenpapier, Sanitaerhygiene |
| Buero & Verwaltung | Saubere Arbeitsumgebungen fuer produktive Mitarbeiter. | Seifenspender, Handtuchspender, Toilettenpapier, Sanitaerbereiche |

Jede Branche erhaelt auch die neuen `longDescription`-Texte (2 Absaetze, fokussiert auf Spendersysteme und Verbrauchsmaterialien statt auf Reinigungschemie).

### 2. Detailseite anpassen (`src/pages/IndustryDetail.tsx`)

- Den statischen Text "Spezialisierte Anwendung" unter den Kacheln entfernen -- die Kachel-Titel (z.B. "Handtuchspender") sprechen fuer sich selbst
- Den Platzhalter-Produktbereich mit Emoji-Boxen entfernen und durch einen einfachen CTA-Button "Produkte entdecken" ersetzen
- Den Abschnittstitel "Hygienestandards neu definiert" zu "Ueber diese Branche" aendern
- Den Feature-Titel "Unsere Loesungen fuer die {Branche}" beibehalten

### 3. Branchensektion auf Startseite (`src/components/SolutionsSection.tsx`)

- Den Filter fuer "bildung-kinderbetreuung" entfernen, damit alle 6 Branchen angezeigt werden
- Das Grid von 5 Spalten auf 6 Spalten (bzw. 2x3 auf Mobile) anpassen

## Technische Details

**Betroffene Dateien:**
- `src/data/industries.ts` -- Alle Texte, Descriptions und Features aktualisieren
- `src/pages/IndustryDetail.tsx` -- Platzhalter-Produkte entfernen, Texte anpassen
- `src/components/SolutionsSection.tsx` -- Filter entfernen, Grid auf 6 Spalten

**Keine neuen Abhaengigkeiten noetig.**

