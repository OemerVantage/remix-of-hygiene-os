

## Ziel
Erweiterte Produkteigenschaften in Shopify einrichten, sodass alle Felder aus deinem Screenshot editierbar sind.

## Zusätzliche Metafields erstellen

Gehe wieder zu **Einstellungen → Benutzerdefinierte Daten → Produkte** und erstelle diese weiteren Felder:

| Name | Namespace & Key | Typ |
|------|-----------------|-----|
| Systemgruppe | `custom.system_group` | Einzeiliger Text |
| Geeignet für | `custom.suitable_for` | Einzeiliger Text |
| Kapazität | `custom.capacity` | Einzeiliger Text |
| Abschließbar | `custom.lockable` | Einzeiliger Text |
| Sichtfenster | `custom.view_window` | Einzeiliger Text |

**Wichtig:** Bei jedem Feld "Storefront-Zugriff" aktivieren!

## Code-Änderungen

### `src/lib/shopify.ts`
Neue Metafield-Keys zur GraphQL-Query hinzufügen:
```graphql
{namespace: "custom", key: "system_group"},
{namespace: "custom", key: "suitable_for"},
{namespace: "custom", key: "capacity"},
{namespace: "custom", key: "lockable"},
{namespace: "custom", key: "view_window"}
```

### `src/components/ProductDescription.tsx`
Labels-Mapping erweitern:
```typescript
const PROPERTY_LABELS: Record<string, string> = {
  gtin: "GTIN-Code (EAN)",
  dimensions: "Abmessungen",
  material: "Material",
  color: "Farbe",
  industries: "Branchen",
  system_group: "Systemgruppe",
  suitable_for: "Geeignet für",
  capacity: "Kapazität",
  lockable: "Abschließbar",
  view_window: "Sichtfenster",
};
```

## Dateien

| Datei | Änderung |
|-------|----------|
| `src/lib/shopify.ts` | 5 neue Metafield-Keys zur Query |
| `src/components/ProductDescription.tsx` | 5 neue Labels im Mapping |

