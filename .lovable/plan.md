
## Plan: "HygiSwiss Pro Abo" Badge in Gratis-Spender-Sektion ergänzen

### Ziel
In der Sektion „Gratis Spendersystem" auf der Startseite soll deutlich werden, dass das Angebot Teil des **HygiSwiss Pro Abos** ist.

### Änderung
Datei: `src/components/FreeDispenserSection.tsx`

1. **Neuer Hinweis-Badge** direkt unter der Überschrift „Gratis Spendersystem":
   - Text: **„Teil des HygiSwiss Pro Abos"**
   - Stil: dezenter Pill-Badge mit `bg-primary-foreground/15`, weisser Schrift, kleines Icon (z. B. `Sparkles` oder `BadgeCheck` aus lucide-react), passt zum bestehenden „Exklusives Angebot"-Badge oben.

2. **Beschreibungstext** bleibt inhaltlich gleich, wird aber leicht ergänzt, damit der Bezug zum Abo klar ist:
   > „Als Teil unseres **HygiSwiss Pro Abos** profitieren Sie von einem kostenlosen Spendersystem für Ihr Unternehmen. Wir beraten Sie gerne persönlich und finden die perfekte Lösung für Ihre Anforderungen."

   „HygiSwiss Pro Abo" wird im Text leicht hervorgehoben (`font-semibold`).

### Nicht betroffen
- Layout, Bild, CTA-Button und Telefonzeiten bleiben unverändert.
- Keine anderen Seiten/Komponenten.
- Keine Backend- oder DB-Änderungen.

### Hinweis
Falls du möchtest, dass „HygiSwiss Pro Abo" später eine eigene Detailseite (z. B. `/pro-abo`) bekommt, sag kurz Bescheid – dann verlinken wir den Badge direkt dorthin.
