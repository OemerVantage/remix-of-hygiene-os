

## Plan: "Dazu passende Produkte" – Spender ↔ Papier Zuordnung

### Kontext
Die Sektion existiert bereits, wird aber nicht angezeigt weil das Metafield `custom.related_products` bei den Produkten `null` zurückgibt. Die Idee ist: Bei einem Spender sollen die passenden Papiere angezeigt werden und umgekehrt.

### Lösung
Da die Zuordnung Spender ↔ Papier über das Metafield `custom.related_products` gesteuert wird (kommagetrennte Produkt-Handles), muss dieses Metafield in Shopify für die Produkte befüllt sein. **Der Code funktioniert bereits korrekt** – er liest das Metafield aus und zeigt die verlinkten Produkte an.

### Was zu tun ist

**In Shopify Admin** (durch dich):
- Beim Spender-Produkt das Metafield `custom.related_products` mit den Handles der passenden Papiere befüllen, z.B.: `racon-comfort-toilettenpapier,racon-premium-handtuchpapier`
- Beim Papier-Produkt das Metafield mit den Handles der passenden Spender befüllen

**Im Code** (durch mich): Keine Änderung nötig – `RelatedProducts.tsx` und `ProductDetail.tsx` verarbeiten das Metafield bereits korrekt.

### Alternative: Falls du die Metafields nicht manuell pflegen willst
Ich kann einen **automatischen Fallback** einbauen, der das Metafield `custom.system_group` nutzt. Produkte mit der gleichen Systemgruppe (z.B. "Designo L") aber anderem Produkttyp (Spender vs. Papier) werden automatisch als passende Produkte angezeigt. Das würde bedeuten:

1. **`src/components/RelatedProducts.tsx`**: Erweitern um Props `systemGroup`, `productType`, `currentHandle`. Wenn `handles` leer ist, automatisch alle Produkte mit gleicher `system_group` aber anderem `productType` laden via `PRODUCTS_QUERY`
2. **`src/pages/ProductDetail.tsx`**: `systemGroup`, `productType` und `handle` an `RelatedProducts` übergeben

So würde z.B. beim "Designo L Toilettenpapier-Spender" automatisch das passende "Designo L Toilettenpapier" angezeigt – ohne manuelles Pflegen.

### Empfehlung
Den automatischen Fallback über `system_group` einbauen, mit Metafield-Override wenn `related_products` befüllt ist. So funktioniert die Zuordnung sofort ohne manuelle Arbeit.

