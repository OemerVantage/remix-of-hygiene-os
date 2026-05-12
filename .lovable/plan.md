## Ziel

Den Shopify Storefront Access Token aus dem hartcodierten Code entfernen und durch eine **Build-Time Environment Variable** ersetzen, damit du ihn jederzeit rotieren kannst, ohne den Code anfassen zu müssen. Gleichzeitig wird die aktuell defekte Verbindung (401 Unauthorized) wieder funktionieren.

## Was du vorab tun musst

1. **Neuen Storefront Access Token holen** im Shopify Admin:
   - https://admin.shopify.com/store/mp0y11-0r/settings/apps/development
   - Storefront-App öffnen → Tab **API credentials** → Token kopieren (oder neu generieren)
   - Benötigte Scopes: `unauthenticated_read_product_listings`, `unauthenticated_read_product_inventory`, `unauthenticated_read_checkouts`, `unauthenticated_write_checkouts`, `unauthenticated_read_customers`, `unauthenticated_write_customers`, `unauthenticated_read_metaobjects`

2. **Token als Lovable Secret hinterlegen** — ich öffne dir den Secret-Dialog für den Namen `VITE_SHOPIFY_STOREFRONT_TOKEN`. Du fügst dort den Token ein.

## Was ich danach umbaue

### 1. `src/lib/shopify.ts`
- Konstante `SHOPIFY_STOREFRONT_TOKEN` ersetzen durch `import.meta.env.VITE_SHOPIFY_STOREFRONT_TOKEN`
- Optional: `SHOPIFY_STORE_PERMANENT_DOMAIN` ebenfalls auslagern (`VITE_SHOPIFY_STORE_DOMAIN`), falls du den Store irgendwann wechseln willst — sage Bescheid, wenn du das auch möchtest
- Defensive Prüfung: Wenn Token fehlt, klare Fehlermeldung in der Console statt stiller 401

### 2. `src/vite-env.d.ts`
- Typ-Definition für `VITE_SHOPIFY_STOREFRONT_TOKEN` ergänzen, damit TypeScript korrekt typisiert

### 3. Verifikation
- Nach Deploy auf `/produkte` und Homepage prüfen, ob Bestseller + Produktliste laden
- Network-Tab kontrollieren: Status sollte 200 statt 401 sein

## Sicherheitshinweis

Auch als Env Var ist der Token im finalen JS-Bundle für jeden im Browser sichtbar — das ist bei **Storefront-Tokens explizit so vorgesehen** und sicher, weil sie nur Read-Access auf öffentliche Produktdaten geben. Der Vorteil dieses Setups ist Rotation: Token im Lovable-Dashboard ändern → neuer Build → fertig, ohne Code-Diff.

## Reihenfolge der Schritte beim Implementieren

1. Secret-Dialog öffnen (`VITE_SHOPIFY_STOREFRONT_TOKEN`) — du fügst den neuen Token ein
2. `src/lib/shopify.ts` und `src/vite-env.d.ts` anpassen
3. Preview neu laden und Produkte testen
