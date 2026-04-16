
## Plan: Adresse überall auf "Schlachthofstrasse 1, 8406 Winterthur" anpassen

### Suche nach allen Adress-Vorkommen

Ich muss alle Stellen finden, wo die alte Adresse (`Musterstrasse 123, 8001 Zürich`) verwendet wird. Bekannte Stellen:

**1. `src/components/ContactForm.tsx`** (Zeile ~52)
- `content: "Musterstrasse 123, 8001 Zürich"` → `"Schlachthofstrasse 1, 8406 Winterthur"`

**2. Google Maps iframe in `ContactForm.tsx`** (Zeile ~287)
- Aktuell zeigt die Karte das **Brandenburger Tor in Berlin** – komplett falsch
- Neue Embed-URL für Schlachthofstrasse 1, 8406 Winterthur einsetzen

### Weitere zu prüfende Stellen
Ich werde zusätzlich folgende Dateien nach Adress-/Standort-Erwähnungen durchsuchen, um sicherzustellen, dass nichts übersehen wird:
- `src/pages/About.tsx` (Firmenstandort/Timeline)
- `src/components/Footer.tsx` (Adresse im Footer-Bereich)
- `index.html` (Meta-Tags / Structured Data)
- Alle anderen Komponenten via Suche nach `Zürich`, `Musterstrasse`, `8001`

### Änderungen
1. **ContactForm.tsx**: Adresstext aktualisieren
2. **ContactForm.tsx**: Google Maps Embed-URL durch korrekten Winterthur-Link ersetzen
3. **Sonstige Funde**: Falls die Adresse oder "Zürich" als Standort an weiteren Stellen erscheint, ebenfalls anpassen

### Keine Backend-Änderungen nötig
Reine Text-/Konfigurationsanpassungen im Frontend.
