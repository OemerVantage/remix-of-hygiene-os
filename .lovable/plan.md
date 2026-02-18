

# Plan: Kurzbeschreibungen fuer Branchen-Kacheln hinzufuegen

## Uebersicht
Jede Feature-Kachel auf den Branchen-Detailseiten erhaelt eine kurze Beschreibung unter dem Titel, um den Mehrwert besser zu vermitteln.

## Aenderungen

### 1. Datenstruktur erweitern (`src/data/industries.ts`)

Das `features`-Array wird von `string[]` zu einem Array mit Objekten geaendert:

```text
Vorher:  features: string[]
Nachher: features: { title: string; description: string }[]
```

Texte pro Branche:

**Hotellerie:**
| Kachel | Beschreibung |
|---|---|
| Handtuchspender | Elegante Spender fuer Zimmer, Lobby und Spa. |
| Seifenspender | Hochwertige Seifenloesungen fuer jeden Gastebereich. |
| Toilettenhygiene | Zuverlaessige Versorgung fuer alle Sanitaeranlagen. |
| Gaestebereiche | Komplettausstattung fuer Wellness und oeffentliche Raeume. |

**Gastronomie:**
| Kachel | Beschreibung |
|---|---|
| Seifenspender | Hygienische Handpflege fuer Kueche und Gaeste-WC. |
| Handtuchrollenspender | Schnelles Trocknen bei hohem Durchlauf. |
| Toilettenpapier | Wirtschaftliche Loesungen fuer stark frequentierte WCs. |
| Personalbereich | Saubere Umkleiden und Sozialraeume fuer Ihr Team. |

**Gesundheitswesen:**
| Kachel | Beschreibung |
|---|---|
| Seifenspender | Schonende Reinigung fuer haeufiges Haendewaschen. |
| Handtuchspender | Beruehrungslose Trocknung fuer maximale Hygiene. |
| Toilettenhygiene | Zuverlaessige Ausstattung fuer Patienten und Personal. |
| Verbrauchsmaterial | Nachfuellungen und Zubehoer fuer den taeglichen Bedarf. |

**Buero & Verwaltung:**
| Kachel | Beschreibung |
|---|---|
| Seifenspender | Gepflegte Waschraeume fuer zufriedene Mitarbeitende. |
| Handtuchspender | Praktische Loesungen fuer jeden Sanitaerbereich. |
| Toilettenpapier | Zuverlaessige Versorgung ohne Wartungsaufwand. |
| Sanitaerbereiche | Komplettloesungen fuer moderne Buerowelten. |

**Industrie & Produktion:**
| Kachel | Beschreibung |
|---|---|
| Handtuchrollenspender | Robuste Spender fuer stark beanspruchte Bereiche. |
| Handseife | Effektive Reinigung bei Oel, Staub und Schmutz. |
| Toilettenpapier | Grosspackungen fuer Bereiche mit hohem Verbrauch. |
| Grossverbraucher-Loesungen | Wirtschaftliche Systeme fuer den Dauerbetrieb. |

**Bildung & Kinderbetreuung:**
| Kachel | Beschreibung |
|---|---|
| Seifenspender | Kinderfreundliche Spender, die zum Haendewaschen motivieren. |
| Handtuchspender | Einfache Bedienung auch fuer kleine Haende. |
| Toilettenpapier | Zuverlaessig und kindgerecht in jeder Kabine. |
| Sanitaerhygiene | Saubere Sanitaerraeume fuer Schulen und Kitas. |

### 2. Detailseite anpassen (`src/pages/IndustryDetail.tsx`)

Die Kacheln zeigen unter dem Titel (`h3`) die neue Beschreibung als `p`-Element in `text-sm text-muted-foreground` an.

### 3. Uebersichtsseite pruefen (`src/components/SolutionsSection.tsx`)

Falls dort `features` referenziert wird, die Zugriffe auf das neue Objekt-Format anpassen.

## Technische Details

**Betroffene Dateien:**
- `src/data/industries.ts` -- Interface und alle Feature-Daten aktualisieren
- `src/pages/IndustryDetail.tsx` -- Beschreibung in Kacheln rendern
- `src/components/SolutionsSection.tsx` -- Ggf. Zugriff anpassen

**Keine neuen Abhaengigkeiten noetig.**

