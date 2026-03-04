

## Plan: Neuen Storefront API Token einsetzen

Der bisherige Token (`shpss_...`) lieferte 401-Fehler. Der neue Token `6299f84b62a9be79ff8e4b8694dd39f9` wird in `src/lib/shopify.ts` ersetzt.

### Änderung
- **Datei:** `src/lib/shopify.ts`, Zeile 6
- **Alt:** `const SHOPIFY_STOREFRONT_TOKEN = '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';`
- **Neu:** `const SHOPIFY_STOREFRONT_TOKEN = '6299f84b62a9be79ff8e4b8694dd39f9';`

Nach der Änderung teste ich die `/produkte`-Seite, um zu prüfen ob Produkte geladen werden.

