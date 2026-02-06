

# Plan: SolutionsSection mit Branchenlösungen verknüpfen

## Problem
Die Karten in "Wählen Sie Ihre Umgebung" auf der Startseite haben aktuell nur Anker-Links (`#gastronomie`), die nirgendwo hinfuehren. Sie sollen stattdessen zu den Branchenlösungs-Detailseiten navigieren.

## Loesung
Die `SolutionsSection` Komponente anpassen, um die `industries` Daten aus `src/data/industries.ts` zu verwenden und mit React Router Links zu den Detailseiten zu navigieren.

---

## Technische Aenderungen

### Datei: `src/components/SolutionsSection.tsx`

**1. Importe aendern:**
- `industries` aus `@/data/industries` importieren
- `Link` aus `react-router-dom` importieren
- Lokale `solutions` Array entfernen

**2. Mapping anpassen:**
Die Karten sollen die `industries` Daten nutzen und zu `/branchenloesungen/{slug}` navigieren.

### Vorher:
```text
import { UtensilsCrossed, ... } from "lucide-react";

const solutions = [
  { icon: UtensilsCrossed, title: "Gastronomie", ... },
  ...
];

<a href={`#${solution.title.toLowerCase()}`}>
```

### Nachher:
```text
import { Link } from "react-router-dom";
import { industries } from "@/data/industries";

<Link to={`/branchenloesungen/${industry.slug}`}>
```

---

## Mapping der Branchen

| Startseite | Ziel-URL |
|------------|----------|
| Hotellerie | `/branchenloesungen/hotellerie` |
| Gastronomie | `/branchenloesungen/gastronomie` |
| Gesundheitswesen | `/branchenloesungen/gesundheitswesen` |
| Buero & Verwaltung | `/branchenloesungen/buero-verwaltung` |
| Industrie & Produktion | `/branchenloesungen/industrie-produktion` |
| Bildung & Kinderbetreuung | `/branchenloesungen/bildung-kinderbetreuung` |

---

## Visuelle Darstellung

```text
Startseite "Waehlen Sie Ihre Umgebung"
┌──────────────────────────────────────────────────────┐
│  [Hotellerie] [Gastro] [Gesundheit] [Buero] [Bildung]│
│       ↓          ↓          ↓          ↓        ↓   │
└──────────────────────────────────────────────────────┘
                      Klick
                        ↓
┌──────────────────────────────────────────────────────┐
│  /branchenloesungen/gastronomie                      │
│  ┌────────────────────────────────────────────────┐  │
│  │  Gastronomie Detailseite mit Hero, Features... │  │
│  └────────────────────────────────────────────────┘  │
└──────────────────────────────────────────────────────┘
```

---

## Betroffene Datei

| Datei | Aenderung |
|-------|-----------|
| `src/components/SolutionsSection.tsx` | Industries-Daten verwenden, `<a>` durch `<Link>` ersetzen, Navigation zu Detailseiten |

