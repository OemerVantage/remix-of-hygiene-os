
# Plan: Markdown-Styling im Ratgeber reparieren

## Problem

Das `@tailwindcss/typography`-Plugin ist zwar installiert (`package.json`), aber **nicht in der Tailwind-Konfiguration als Plugin registriert**. Deshalb haben alle `prose`-Klassen (z.B. `prose-h2`, `prose-p`, `prose-ol`) keine Wirkung -- der Markdown-Inhalt wird als unformatierter Fliesstext angezeigt, ohne sichtbare Ueberschriften, Listen oder Absaetze.

## Loesung

**Datei:** `tailwind.config.ts` (Zeile 108)

Das Typography-Plugin wird zu den Tailwind-Plugins hinzugefuegt:

```text
Vorher:  plugins: [require("tailwindcss-animate")]
Nachher: plugins: [require("tailwindcss-animate"), require("@tailwindcss/typography")]
```

## Ergebnis

- `##`-Ueberschriften werden als grosse, fettgedruckte h2-Elemente mit Trennlinie dargestellt
- Nummerierte Listen (1., 2., 3...) werden korrekt als `<ol>` gerendert
- Absaetze erhalten korrekten Abstand
- Blockquotes werden mit linkem Rand und kursiver Schrift angezeigt
- Alle bestehenden `prose-*`-Klassen in `GuideDetail.tsx` greifen sofort

## Umfang
- **1 Datei** betroffen, **1 Zeile** geaendert
- Keine neuen Abhaengigkeiten noetig (Plugin ist bereits installiert)
