

## Ziel
Die Artikelnummer (SKU) des Produkts unter dem Titel anzeigen, wie in der Referenzabbildung gezeigt.

## Problem
Aktuell wird nur der Produkttitel und der Preis angezeigt. Die Artikelnummer fehlt komplett.

## Lösung
Shopify speichert die Artikelnummer (SKU) im `sku`-Feld jeder Produktvariante. Wir müssen:

1. **GraphQL-Queries erweitern** (`src/lib/shopify.ts`)
   - Das `sku`-Feld zu den Varianten-Abfragen hinzufügen in:
     - `PRODUCTS_QUERY` (Zeile 119-137)
     - `PRODUCT_BY_HANDLE_QUERY` (Zeile 171-189)
   
2. **TypeScript-Typ erweitern** (`src/lib/shopify.ts`)
   - `sku?: string;` zum `ShopifyProduct.node.variants.edges[].node` Typ hinzufügen

3. **Artikelnummer im UI anzeigen** (`src/pages/ProductDetail.tsx`)
   - Unter dem Titel (nach Zeile 152) ein neues Element einfügen, das die SKU der aktuell ausgewählten Variante anzeigt:
   ```jsx
   {selectedVariant?.sku && (
     <p className="text-sm text-muted-foreground">
       Artikelnummer: {selectedVariant.sku}
     </p>
   )}
   ```

## Technische Details

**Warum die SKU von der ausgewählten Variante?**
- Jede Variante kann eine eigene SKU haben
- Wenn der Benutzer eine Variante (z.B. "Schwarz") wählt, soll dessen SKU angezeigt werden
- Die SKU ändert sich also mit der Variantenwahl

**Fallback:**
- Wenn die erste Variante keine SKU hat, wird die SKU nicht angezeigt (das ist OK, da SKUs optional sind)

## Dateien
| Datei | Änderung |
|-------|----------|
| `src/lib/shopify.ts` | `sku` zur Varianten-Query in beiden Queries hinzufügen + TypeScript-Typ erweitern |
| `src/pages/ProductDetail.tsx` | Unter dem Titel: `<p>Artikelnummer: {selectedVariant?.sku}</p>` anzeigen |

