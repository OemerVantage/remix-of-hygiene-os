
# Plan: Bestseller-Section auf der Startseite

## Ziel
Eine neue "Bestseller"-Section auf der Startseite hinzufuegen, die Produkte anzeigt, welche in Shopify mit dem Tag "bestseller" markiert sind. So kannst du im Shopify-Admin einfach steuern, welche Produkte als Bestseller erscheinen.

## Wie es funktioniert

### Steuerung ueber Shopify Admin
1. Gehe zu deinem Shopify Admin unter "Produkte"
2. Waehle ein Produkt aus, das als Bestseller erscheinen soll
3. Fuege im Feld "Tags" den Tag `bestseller` hinzu
4. Speichern - fertig! Das Produkt erscheint nun in der Bestseller-Section

```text
Shopify Admin                      Webseite
+------------------------+         +------------------------+
| Produkt: Seifenspender |         | Bestseller             |
| Tags: [bestseller]     |  --->   | +----+ +----+ +----+   |
+------------------------+         | |Prod| |Prod| |Prod|   |
                                   | +----+ +----+ +----+   |
                                   +------------------------+
```

---

## Technische Umsetzung

### 1. Neue Komponente: `BestsellerSection.tsx`

**Funktionen:**
- Laedt Produkte von Shopify mit dem Query-Filter `tag:bestseller`
- Zeigt maximal 4 Produkte in einem responsiven Grid an
- Verwendet die bestehende `ProductCard`-Komponente
- Loading-State mit Skeleton-Loader
- Fallback-Anzeige, wenn keine Bestseller vorhanden sind
- Link zur Produktuebersicht "Alle Produkte ansehen"

**Design:**
- Konsistentes Design mit anderen Sections (GuidesSection, SolutionsSection)
- Section-Titel: "Bestseller" mit Untertitel
- Badge "Beliebt" oder Stern-Icon zur Hervorhebung
- Hover-Effekte wie bei anderen Produktkarten

### 2. Integration in Index.tsx

Die Section wird nach der HeroSection eingefuegt:

```text
Startseite Layout:
+----------------------+
| Header               |
+----------------------+
| HeroSection          |
+----------------------+
| BestsellerSection    |  <-- NEU
+----------------------+
| SolutionsSection     |
+----------------------+
| ModulesSection       |
+----------------------+
| TrustSection         |
+----------------------+
| GuidesSection        |
+----------------------+
| CTASection           |
+----------------------+
| Footer               |
+----------------------+
```

### 3. Shopify Query

Nutzt die bestehende `PRODUCTS_QUERY` mit dem Filter:
```javascript
storefrontApiRequest(PRODUCTS_QUERY, { 
  first: 4, 
  query: "tag:bestseller" 
})
```

---

## Dateien

| Datei | Aktion |
|-------|--------|
| `src/components/BestsellerSection.tsx` | Neu erstellen |
| `src/pages/Index.tsx` | BestsellerSection importieren und einbinden |

---

## Vorteile dieser Loesung

- **Einfache Verwaltung**: Tags hinzufuegen/entfernen im Shopify Admin
- **Keine Datenbank noetig**: Alles ueber Shopify gesteuert
- **Flexibel**: Beliebig viele Produkte koennen als Bestseller markiert werden
- **Automatisch**: Aenderungen in Shopify werden sofort auf der Webseite sichtbar
