

# Shop-Implementierung mit Shopify Integration

## Übersicht
Komplette E-Commerce-Lösung mit Shopify-Anbindung, Warenkorb und Checkout.

---

## Neue Dateien

| Datei | Beschreibung |
|-------|--------------|
| `src/lib/shopify.ts` | Shopify Storefront API Client mit GraphQL |
| `src/stores/cartStore.ts` | Zustand-Store für Warenkorb-Management |
| `src/hooks/useCartSync.ts` | Hook zur Synchronisation nach Checkout |
| `src/components/CartDrawer.tsx` | Warenkorb-Seitenleiste |
| `src/components/ProductCard.tsx` | Produktkarte mit Kaufen-Button |
| `src/pages/ProductDetail.tsx` | Produktdetail-Seite |

## Geänderte Dateien

| Datei | Änderung |
|-------|----------|
| `src/pages/Products.tsx` | Produkte von Shopify laden, Grid-Layout |
| `src/components/Header.tsx` | Warenkorb-Icon mit Badge hinzufügen |
| `src/App.tsx` | Produktdetail-Route + useCartSync Hook |

---

## Features

- Produktliste mit Suchfunktion
- Produktdetailseite mit Bildergalerie und Variantenauswahl
- Warenkorb mit Mengenänderung
- Checkout über Shopify (öffnet in neuem Tab)
- Automatische Synchronisation nach Checkout

---

## Technische Details

**Shopify API Setup:**
- API Version: 2025-07
- Storefront Token wird im Frontend verwendet (sicher)
- GraphQL Queries für Produkte und Cart-Mutationen

**Cart-System:**
- Zustand mit localStorage-Persistenz
- Echtzeit-Sync mit Shopify Cart API
- Checkout-URL mit `channel=online_store` Parameter

**Komponenten:**
- Sheet-Komponente für CartDrawer (rechte Seite)
- Responsive Grid für Produktliste (1-4 Spalten)
- Loading-States und Error-Handling

