
## Ziel
Wenn der Benutzer eine Variante wählt (z.B. "Weiß" oder "Schwarz"), soll automatisch das passende Produktbild angezeigt werden.

## Problem
Aktuell sind `selectedVariantIndex` und `selectedImage` unabhängig voneinander. Wenn man auf "Schwarz" klickt, ändert sich die Variante aber das Bild bleibt gleich.

## Lösung
Shopify speichert Varianten-Bilder über das `image`-Feld in jeder Variante. Wir müssen:

1. **GraphQL-Query erweitern** (`src/lib/shopify.ts`)
   - Das `image`-Feld zur Varianten-Abfrage hinzufügen:
   ```graphql
   variants(first: 20) {
     edges {
       node {
         id
         title
         image {
           url
           altText
         }
         ...
       }
     }
   }
   ```

2. **TypeScript-Typen erweitern** (`src/lib/shopify.ts`)
   - `image?: { url: string; altText: string | null }` zum Varianten-Typ hinzufügen

3. **Bild-Wechsel bei Varianten-Auswahl** (`src/pages/ProductDetail.tsx`)
   - Wenn eine Variante gewählt wird und diese ein eigenes Bild hat → dieses Bild anzeigen
   - Logik im `onClick` der Varianten-Buttons:
     ```typescript
     onClick={() => {
       setSelectedVariantIndex(index);
       // Wenn Variante eigenes Bild hat, zeige es
       const variantImage = variant.node.image;
       if (variantImage) {
         const imageIndex = images.findIndex(img => img.node.url === variantImage.url);
         if (imageIndex >= 0) setSelectedImage(imageIndex);
       }
     }}
     ```

## Voraussetzung in Shopify
Die Bilder müssen in Shopify korrekt den Varianten zugeordnet sein:
- Shopify Admin → Produkt → Varianten → Bild pro Variante auswählen

## Dateien
| Datei | Änderung |
|-------|----------|
| `src/lib/shopify.ts` | `image { url altText }` zur Varianten-Query hinzufügen + Typ erweitern |
| `src/pages/ProductDetail.tsx` | Bei Varianten-Klick das passende Bild automatisch auswählen |
