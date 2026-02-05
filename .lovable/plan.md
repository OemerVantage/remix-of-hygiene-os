
## Ziel
Produkteigenschaften und Versandinformationen als separate, editierbare Felder in Shopify einrichten - nicht mehr im Beschreibungstext versteckt.

## Aktuelle Situation (das Problem)
- Alle Produkteigenschaften stecken im `description`-Feld als formatierter Text
- Ein Parser extrahiert die Daten anhand von Textmustern ("Produkteigenschaften:", "Key: Value")
- Fehleranfällig und mühsam zu pflegen

## Lösung: Shopify Metafields
Shopify bietet "Metafields" - das sind benutzerdefinierte Felder, die du direkt im Admin bearbeiten kannst.

### Was eingerichtet wird

**1. Metafield-Definitionen in Shopify erstellen**
Du musst im Shopify Admin unter Einstellungen → Benutzerdefinierte Daten → Produkte folgende Felder anlegen:

| Feld | Namespace & Key | Typ |
|------|-----------------|-----|
| GTIN-Code (EAN) | `custom.gtin` | Text |
| Abmessungen | `custom.dimensions` | Text |
| Material | `custom.material` | Text |
| Farbe | `custom.color` | Text |
| Branchen | `custom.industries` | Text |
| Inhalt/VE | `custom.unit_content` | Text |
| VE/Palette | `custom.units_per_pallet` | Text |

**2. GraphQL-Queries erweitern** (`src/lib/shopify.ts`)
- Metafields in `PRODUCTS_QUERY` und `PRODUCT_BY_HANDLE_QUERY` abfragen
- TypeScript-Typen für Metafields hinzufügen

**3. ProductDescription-Komponente anpassen** (`src/components/ProductDescription.tsx`)
- Metafields direkt verwenden statt Text-Parsing
- Fallback auf altes Parsing für bestehende Produkte ohne Metafields

### Technische Änderungen

**`src/lib/shopify.ts`**
```graphql
# Zu den Product-Queries hinzufügen:
metafields(identifiers: [
  {namespace: "custom", key: "gtin"},
  {namespace: "custom", key: "dimensions"},
  {namespace: "custom", key: "material"},
  {namespace: "custom", key: "color"},
  {namespace: "custom", key: "industries"},
  {namespace: "custom", key: "unit_content"},
  {namespace: "custom", key: "units_per_pallet"}
]) {
  key
  value
}
```

**`src/components/ProductDescription.tsx`**
- Neue Props für `metafields`
- Mapping von Metafield-Keys zu deutschen Labels
- Fallback auf Text-Parsing wenn keine Metafields vorhanden

### Einrichtung in Shopify Admin

1. Gehe zu: **Einstellungen** → **Benutzerdefinierte Daten** → **Produkte**
2. Klicke **Definition hinzufügen** für jedes Feld
3. Danach erscheinen die Felder bei jedem Produkt unter "Metafields"

### Dateien

| Datei | Änderung |
|-------|----------|
| `src/lib/shopify.ts` | Metafields zur GraphQL-Query hinzufügen, TypeScript-Typen erweitern |
| `src/components/ProductDescription.tsx` | Metafields direkt anzeigen, Fallback auf Parsing |
| `src/pages/ProductDetail.tsx` | Metafields an ProductDescription übergeben |
