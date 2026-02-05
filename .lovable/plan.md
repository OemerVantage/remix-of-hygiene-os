

# Plan: Shopify API-Key speichern und Integration starten

## Schritt 1: API-Key sicher speichern
- Speichere `SHOPIFY_ADMIN_API_TOKEN` als verschlüsseltes Secret
- Speichere `SHOPIFY_STORE_DOMAIN` (dein Store: `1prwxp-fi.myshopify.com`)

## Schritt 2: Edge Function für Shopify-Zugriff
Da der Admin API Key nicht im Frontend verwendet werden darf, erstelle ich eine Edge Function die:
- Den API-Key sicher auf dem Server verwendet
- Produkte vom Shopify Store abruft
- Daten an das Frontend weitergibt

## Schritt 3: Produkte-Seite implementieren
- Produktliste mit Bildern, Namen, Preisen
- Responsive Grid-Layout
- Kategoriefilter und Suche

## Schritt 4: Warenkorb und Checkout
- Warenkorb-Store mit Zustand
- CartDrawer Komponente
- Weiterleitung zum Shopify Checkout

---

## Dateien die erstellt werden

| Datei | Beschreibung |
|-------|--------------|
| `supabase/functions/shopify-products/index.ts` | Edge Function für Produktabruf |
| `src/stores/cartStore.ts` | Warenkorb-Zustand |
| `src/components/CartDrawer.tsx` | Warenkorb-Seitenleiste |
| `src/components/ProductCard.tsx` | Produktkarte |
| `src/pages/ProductDetail.tsx` | Produktdetail-Seite |

## Dateien die geändert werden

| Datei | Änderung |
|-------|----------|
| `src/pages/Products.tsx` | Produktliste statt Platzhalter |
| `src/components/Header.tsx` | Warenkorb-Icon |
| `src/App.tsx` | Produktdetail-Route |

---

## Sicherheit
- API-Key wird NUR in der Edge Function verwendet (Server-seitig)
- Frontend erhält nur die Produktdaten, niemals den API-Key

