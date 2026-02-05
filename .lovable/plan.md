
# Plan: Verpackung-Feld hinzufuegen

## Ziel
Das Feld "Verpackung" (z.B. "6 Stueck/Karton") zu den Versandinformationen auf der Produktdetailseite hinzufuegen.

## Shopify Admin Setup

Zuerst musst du das Metafield in Shopify anlegen:

1. Gehe zu **Einstellungen** → **Benutzerdefinierte Daten** → **Produkte**
2. Klicke auf **Definition hinzufuegen**
3. Trage folgende Werte ein:
   - **Name**: `Verpackung`
   - **Namespace und Schluessel**: `custom.packaging`
   - **Typ**: Einzeiliger Text
4. Speichern

Danach kannst du bei jedem Produkt unter "Metafelder" den Wert eintragen, z.B. "6 Stueck/Karton".

---

## Technische Umsetzung

### 1. Shopify API Query erweitern

**Datei:** `src/lib/shopify.ts`

Fuege das neue Metafield zur Abfrage hinzu:

```text
METAFIELD_IDENTIFIERS (Zeile ~105):
+ {namespace: "custom", key: "packaging"}
```

### 2. Label-Mapping hinzufuegen

**Datei:** `src/components/ProductDescription.tsx`

Fuege das Label zum `SHIPPING_LABELS` Mapping hinzu:

```text
SHIPPING_LABELS (Zeile ~17):
  unit_content: "Inhalt/Verkaufseinheit",
+ packaging: "Verpackung",
  units_per_pallet: "VE/PAL",
```

---

## Ergebnis

Nach der Implementierung wird die Versandinformationen-Tabelle so aussehen:

```text
+---------------------------+------------------------+
| Versandinformationen                               |
+---------------------------+------------------------+
| Inhalt/Verkaufseinheit    | 1                      |
| Verpackung                | 6 Stueck/Karton        |
| VE/PAL                    | 12 Karton(s)/Palette   |
+---------------------------+------------------------+
```

---

## Dateien

| Datei | Aenderung |
|-------|-----------|
| `src/lib/shopify.ts` | Metafield `packaging` zur Query hinzufuegen |
| `src/components/ProductDescription.tsx` | Label `packaging: "Verpackung"` hinzufuegen |
