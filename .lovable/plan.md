
## Plan: Adresse auf "Zürcherstrasse 320, 8406 Winterthur" aktualisieren

### Änderungen in `src/components/ContactForm.tsx`

1. **Adress-Anzeige** (Zeile ~52):
   - `"Schlachthofstrasse 1, 8406 Winterthur"` → `"Zürcherstrasse 320, 8406 Winterthur"`

2. **Google Maps iframe** (Zeile ~287):
   - Embed-URL aktualisieren: `https://www.google.com/maps?q=Zürcherstrasse+320,+8406+Winterthur&output=embed`

### Prüfung weiterer Vorkommen
Vor der Umsetzung scanne ich den Code mit `search_files` nach `Schlachthofstrasse`, um sicherzustellen, dass die alte Adresse nirgendwo sonst (z.B. Footer, About, index.html, Edge Functions) referenziert wird. Funde werden ebenfalls aktualisiert.

### Keine Backend-Änderungen
Reine Textanpassung im Frontend.
