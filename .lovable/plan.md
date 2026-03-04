

## Plan: Bestellsperre für Gäste + nicht-freigegebene Kunden

### Änderung in `src/components/CartDrawer.tsx`

1. **`canCheckout`-Logik ändern** (Zeile 17):
   - Von: `const canCheckout = !user || isApproved;`
   - Zu: `const canCheckout = !!user && isApproved;`

2. **Hinweis für nicht-eingeloggte Besucher hinzufügen**:
   - Wenn `!user`: Meldung "Bitte melde dich an, um bestellen zu können" mit Link zur Login-Seite
   - Wenn `user && !isApproved`: Bestehende Meldung "Dein Konto wartet auf Freigabe" bleibt

3. **"In den Warenkorb"-Button bleibt für alle aktiv** — Besucher können Produkte in den Warenkorb legen, aber erst beim Checkout wird geprüft ob sie berechtigt sind.

