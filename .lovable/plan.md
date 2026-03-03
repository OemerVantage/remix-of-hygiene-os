

## Plan: Neuen Shopify-Store verbinden

Der Storefront Access Token wurde bereitgestellt. Ich aktualisiere die Zugangsdaten in `src/lib/shopify.ts`:

### Änderungen in `src/lib/shopify.ts`

- **Zeile 4**: `SHOPIFY_STORE_PERMANENT_DOMAIN` → `'mp0y11-0r.myshopify.com'`
- **Zeile 6**: `SHOPIFY_STOREFRONT_TOKEN` → `'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'`

Das ist alles – Produkte, Warenkorb und Checkout werden automatisch mit dem neuen Store funktionieren.

