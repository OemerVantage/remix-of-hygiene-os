
## Ziel (wie im Screenshot)
Die Produktbeschreibung soll nicht mehr als “Tabs + Textblock” wirken, sondern wie im Bild als **zwei klare Key/Value-Tabellen nebeneinander**:

- Links: **Produkteigenschaften** (2 Spalten: Feld / Wert)
- Rechts: **Versandinformationen** (2 Spalten: Feld / Wert)
- Auf Mobile: Tabellen untereinander
- Optional darüber: kurzer Fließtext “Beschreibung” (nur wenn vorhanden)

## Ist-Stand (was aktuell passiert)
- `src/components/ProductDescription.tsx` rendert aktuell **Tabs** (Beschreibung / Eigenschaften / Versand).
- Der Parser wurde bereits verbessert (Markdown `**…**` entfernt, Bulletpoints entfernt), aber das Layout entspricht nicht dem gewünschten Tabellen-Look.

## Umsetzung (UI)
### 1) Tabs entfernen, Tabellen-Layout einführen
Änderung in `src/components/ProductDescription.tsx`:
- Entfernen von `Tabs`, `TabsList`, `TabsTrigger`, `TabsContent`
- Stattdessen Layout:
  - `Beschreibung` als Absatz (optional)
  - Danach ein `div` mit `grid gap-6 md:grid-cols-2`
  - Pro Spalte eine “Section” mit:
    - Titelzeile (z.B. `h3`/`div` mit `font-semibold`)
    - darunter eine Tabelle

### 2) Tabellen-Styling wie Screenshot
Innerhalb der Tabellen:
- 2 Spalten: Key links, Value rechts
- Zeilen mit ruhigem Zebra-Look (ähnlich dem Screenshot), z.B.:
  - `index % 2 === 0 ? "bg-muted/60" : "bg-muted/30"`
- Keine “Card”-Optik zwingend nötig (Screenshot wirkt eher wie flache Tabellen). Falls gewünscht: nur sehr dezente Umrandung (`border rounded-md overflow-hidden`) statt Card-Shadow.
- Key-Spalte:
  - etwas schmaler (`w-[45%] md:w-1/3`), `text-muted-foreground` oder `font-medium`
- Value-Spalte normal.

### 3) Edgecases im Layout
- Wenn nur eine der beiden Listen Daten hat:
  - Tabelle über volle Breite anzeigen (z.B. `md:col-span-2` oder conditional grid-cols)
- Wenn gar keine strukturierten Daten erkannt werden:
  - Fallback: nur `description` als Text anzeigen (wie aktuell)

## Umsetzung (Parser – Stabilität)
Die aktuelle Logik ist schon besser; wir machen sie robuster, damit Shopify-Format “immer” klappt:

1) **Abschnitt-Erkennung toleranter**
- Header-Regex so erweitern, dass auch Varianten funktionieren (z.B. zusätzliche Spaces, optionaler Doppelpunkt, ggf. Singluar/Plural):
  - `Produkteigenschaften`
  - `Versandinformationen` (optional auch `Versandinformation`)
- Weiterhin Markdown `**` entfernen (bleibt).

2) **Zeilen-Trennung verbessern**
Momentan wird nur per `\n` gesplittet. Shopify kann manchmal Bulletpoints inline liefern.
- Split auf `\n` **oder** `•`:
  - z.B. `text.split(/\n|•\s*/g)` und danach wie gehabt trim/clean

3) **Zeilen-Cleanup**
Beibehalten/ergänzen:
- Entfernen von Bullet/Listen-Markern am Anfang
- Entfernen von Rest-Markdown (z.B. einzelne `*` oder überflüssige Leerzeichen)

## Konkrete Code-Änderungen (Dateien)
1) `src/components/ProductDescription.tsx`
- Imports anpassen (Tabs raus, optional Card raus)
- Neue Render-Struktur (2 Tabellen nebeneinander)
- Kleine Hilfsfunktion/Komponente im selben File:
  - `KeyValueSection({ title, rows })`
- Parser-Regex & line-splitting minimal robuster machen (wie oben)

2) `src/pages/ProductDetail.tsx`
- Keine Änderung nötig (nutzt `<ProductDescription />` bereits korrekt)

## Testplan (kurz, aber vollständig)
1) Produktdetail öffnen: `/produkt/celtex®-l-falthandtuchspender`
2) Prüfen:
   - Werden **Produkteigenschaften** und **Versandinformationen** als zwei Tabellen nebeneinander angezeigt (Desktop)?
   - Mobile: Tabellen stapeln untereinander, keine horizontalen Scrollbars
   - Zebra-Optik sichtbar und ruhig
3) Parser-Checks:
   - Shopify-Beschreibung mit `**Produkteigenschaften**` / `**Versandinformationen**` wird korrekt getrennt
   - Bulletpoints `•` werden korrekt entfernt
   - Key/Value Paare stehen sauber in 2 Spalten

## Optional (wenn du’s noch “mehr wie im Bild” willst)
- Titelzeile exakt wie Screenshot: größerer Abstand, ggf. grauer Hintergrundbalken
- Tabelle ohne Hover-Effekt (TableRow hat aktuell hover) – kann pro Row per class überschrieben werden (`hover:bg-transparent`) oder wir verwenden ein simples `<table>` ohne das shadcn TableRow Hover-Styling.
