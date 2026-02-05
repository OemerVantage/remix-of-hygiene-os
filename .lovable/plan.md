
# Plan: Shopify Produktverwaltung einrichten

## Übersicht
Du bekommst die Möglichkeit, Produkte aus deinem Shopify-Store zu verwalten und diese auf der Produkte-Seite anzuzeigen.

---

## Was wird gebaut

### 1. Shopify-Integration wiederherstellen
- Neue `src/lib/shopify.ts` Datei mit Shopify Storefront API Konfiguration
- GraphQL Queries für Produktabruf

### 2. Produkte-Seite mit Shop-Anzeige
- Produktliste mit Bildern, Namen und Preisen
- Kategoriefilter und Suchfunktion
- Responsive Grid-Layout

### 3. Produktdetail-Seite
- Einzelansicht mit großen Bildern
- Varianten-Auswahl (Größe, Farbe etc.)
- Beschreibung und Preis

### 4. Warenkorb-Funktionalität
- Warenkorb-Store mit Zustand
- Warenkorb-Drawer Komponente
- Weiterleitung zum Shopify Checkout

---

## Dateien die erstellt werden

| Datei | Beschreibung |
|-------|--------------|
| `src/lib/shopify.ts` | Shopify API-Client und Queries |
| `src/stores/cartStore.ts` | Warenkorb-Zustand mit Zustand |
| `src/components/CartDrawer.tsx` | Warenkorb-Seitenleiste |
| `src/components/ProductCard.tsx` | Produktkarte für Grid |
| `src/pages/ProductDetail.tsx` | Produktdetail-Ansicht |

---

## Dateien die geändert werden

| Datei | Änderung |
|-------|----------|
| `src/pages/Products.tsx` | Platzhalter durch echte Produktliste ersetzen |
| `src/components/Header.tsx` | Warenkorb-Icon hinzufügen |
| `src/App.tsx` | Route für Produktdetails hinzufügen |

---

## Technische Details

### Shopify Storefront API
```text
┌─────────────────┐      ┌──────────────────┐
│  Lovable App    │─────▶│ Shopify Store    │
│  (Frontend)     │◀─────│ (1prwxp-fi)      │
└─────────────────┘      └──────────────────┘
         │
         ▼
  GraphQL Queries:
  - products(first: 20)
  - product(handle: "...")
  - cart mutations
```

### Warenkorb-Flow
```text
Produkt ansehen → In Warenkorb → Drawer öffnet → Checkout bei Shopify
```

### Komponenten-Struktur
```text
Products.tsx
├── ProductCard.tsx (für jedes Produkt)
└── Filter/Suche

ProductDetail.tsx
├── Bildgalerie
├── Varianten-Auswahl
└── "In den Warenkorb" Button

Header.tsx
└── CartDrawer.tsx
    ├── Warenkorb-Items
    ├── Gesamtsumme
    └── "Zur Kasse" Button
```

---

## Ergebnis
- Vollständige Shop-Integration mit deinem Shopify-Store
- Kunden können Produkte durchstöbern und kaufen
- Checkout läuft sicher über Shopify
