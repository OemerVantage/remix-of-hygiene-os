
# Plan: Shopify-Code vollständig entfernen

## Übersicht
Da Shopify getrennt wurde, werden alle damit verbundenen Dateien, Komponenten und Referenzen aus dem Projekt entfernt. Die Produkte-Seite wird temporär durch eine Platzhalter-Seite ersetzt.

---

## Zu löschende Dateien

| Datei | Grund |
|-------|-------|
| `src/lib/shopify.ts` | Shopify API-Konfiguration und Queries |
| `src/stores/cartStore.ts` | Warenkorb-Store mit Shopify-Abhängigkeiten |
| `src/components/CartDrawer.tsx` | Warenkorb-Drawer Komponente |
| `src/pages/ProductDetail.tsx` | Produktdetail-Seite |

---

## Zu ändernde Dateien

### 1. `src/App.tsx`
- Route `/produkt/:handle` entfernen
- ProductDetail Import entfernen

### 2. `src/components/Header.tsx`
- CartDrawer Import und Verwendung entfernen
- Warenkorb-Button aus Desktop und Mobile Navigation entfernen

### 3. `src/pages/Products.tsx`
- Komplett neu schreiben als einfache Platzhalter-Seite
- "Shop kommt bald" Nachricht anzeigen

---

## Ergebnis
- Keine Shopify-Referenzen mehr im Code
- Saubere Produkte-Seite bereit für zukünftige E-Commerce-Integration
- Navigation funktioniert weiterhin

---

## Technische Details

### Neue Products.tsx Struktur
```text
┌─────────────────────────────────┐
│           Header                │
├─────────────────────────────────┤
│                                 │
│    "Shop kommt bald"            │
│    Platzhalter-Nachricht        │
│                                 │
├─────────────────────────────────┤
│           Footer                │
└─────────────────────────────────┘
```

### Header-Änderungen
- `CartDrawer` Import entfernen
- Warenkorb-Icon aus Desktop-Navigation entfernen
- Warenkorb-Icon aus Mobile-Navigation entfernen
