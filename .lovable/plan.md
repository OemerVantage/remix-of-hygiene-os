
## Plan: Footer-Links korrekt zuweisen oder entfernen

### Bestandsaufnahme der Footer-Links

**Vorhandene Routen in der App:**
- `/` (Index)
- `/ueber-uns` (About)
- `/branchenloesungen` + `/branchenloesungen/:handle`
- `/produkte` + `/produkt/:handle`
- `/ratgeber` + `/ratgeber/:handle`
- `/kontakt`
- `/login`, `/registrieren`, `/passwort-vergessen`, `/konto`

**Aktuelle Footer-Links (alle `<a href="#...">` – tote Anker):**

| Spalte | Link | Aktion |
|---|---|---|
| **Unternehmen** | Über uns | → `/ueber-uns` |
| | Karriere | **entfernen** (keine Seite) |
| | Kontakt | → `/kontakt` |
| **Produkte** | Spender | → `/produkte` |
| | Verbrauchsmaterial | → `/produkte` |
| | Desinfektion | → `/produkte` |
| | Reinigung | → `/produkte` |
| **Branchen** | Gastronomie | → `/branchenloesungen/gastronomie` *(falls handle existiert, sonst `/branchenloesungen`)* |
| | Gesundheitswesen | → `/branchenloesungen/gesundheitswesen` |
| | Büro | → `/branchenloesungen/buero` |
| | Industrie | → `/branchenloesungen/industrie` |
| **Service** | Ratgeber | → `/ratgeber` |
| | FAQ | **entfernen** (keine Seite) |
| | Lieferung | **entfernen** (keine Seite) |
| | B2B-Konditionen | → `/kontakt` (Anfrage-Kontext) *oder entfernen* |
| **Bottom-Leiste** | Impressum | **entfernen** (keine Seite) |
| | Datenschutz | **entfernen** (keine Seite) |
| | AGB | **entfernen** (keine Seite) |

### Vorgehen

1. **`src/data/industries.ts` prüfen**, um die exakten `handle`-Werte der Branchen zu nutzen. Nur Branchen, die dort existieren, bleiben im Footer; nicht-existierende werden entfernt.
2. **`src/components/Footer.tsx` umbauen:**
   - `<a href>` → `<Link to>` aus `react-router-dom`
   - Tote Links (Karriere, FAQ, Lieferung, B2B, Impressum, Datenschutz, AGB) entfernen
   - Produkt-Unterkategorien zeigen alle auf `/produkte` (es gibt keine Kategorie-Routen)
3. **Bottom-Leiste**: Da Impressum/Datenschutz/AGB rechtlich oft nötig sind, werden sie laut Wunsch dennoch entfernt (keine Seiten vorhanden). Nur Copyright bleibt.

### Keine Backend-Änderungen
Reine Frontend-Anpassung in einer Datei.
