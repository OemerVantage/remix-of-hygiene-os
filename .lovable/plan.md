

## Ziel
Eine neue Section "Dazu passende Produkte" auf jeder Produktdetailseite hinzufügen, die über ein Shopify Metafield gesteuert wird.

## Lösung

### Shopify-Steuerung
Du kannst im Shopify Admin ein Metafield `custom.related_products` anlegen, das eine Liste von Produkt-Handles oder -IDs enthält. Wenn du dort z.B. `handle1,handle2,handle3` einträgst, werden genau diese Produkte angezeigt.

### Ablauf

```text
Shopify Admin: Metafield "related_products" pflegen
         ↓
Wert: "produkt-handle-1,produkt-handle-2"
         ↓
Frontend lädt Hauptprodukt + Metafield
         ↓
Holt passende Produkte per GraphQL
         ↓
Zeigt "Dazu passende Produkte" Section
```

## Technische Umsetzung

### 1. Metafield in GraphQL-Query hinzufügen (`src/lib/shopify.ts`)
- Neuen Identifier `{namespace: "custom", key: "related_products"}` zur `METAFIELD_IDENTIFIERS` Liste hinzufügen

### 2. Neue Komponente erstellen (`src/components/RelatedProducts.tsx`)
- Empfängt die Produkt-Handles aus dem Metafield
- Holt die Produkte per GraphQL (mit `productByHandle` für jedes Handle)
- Zeigt sie in einem Grid an mit den existierenden `ProductCard`-Komponenten

### 3. ProductDetail-Seite erweitern (`src/pages/ProductDetail.tsx`)
- Nach dem Hauptprodukt-Grid die neue `RelatedProducts`-Komponente einbinden
- Metafield-Wert `related_products` auslesen und an die Komponente übergeben

## Dateien

| Datei | Änderung |
|-------|----------|
| `src/lib/shopify.ts` | Metafield `related_products` zur Query hinzufügen + neue Query für mehrere Handles |
| `src/components/RelatedProducts.tsx` | Neue Komponente für verwandte Produkte |
| `src/pages/ProductDetail.tsx` | RelatedProducts-Section unter dem Hauptbereich einbinden |

## Shopify Admin Anleitung
Nach der Implementierung kannst du für jedes Produkt:
1. Im Shopify Admin → Produkt öffnen
2. Unter "Metafields" das Feld `related_products` finden
3. Komma-getrennte Handles eintragen (z.B. `celtex-autocut-spender,handtuch-premium`)
4. Speichern → Die Produkte erscheinen automatisch auf der Website

## Fallback
Wenn kein Metafield gepflegt ist, wird die Section nicht angezeigt.

