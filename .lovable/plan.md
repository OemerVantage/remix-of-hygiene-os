

## Plan: Shopify Storefront Token aktualisieren

Die Shopify API gibt 401 (UNAUTHORIZED) zurück, weil der aktuelle Token `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` nicht mehr gültig ist.

### Änderung
- **`src/lib/shopify.ts`** Zeile 5: Den `SHOPIFY_STOREFRONT_TOKEN` auf `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` aktualisieren.

Das ist die einzige Änderung — alle API-Aufrufe nutzen diesen Token zentral.

