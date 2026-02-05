
# Plan: Produkt-Anfrage Kontaktformular

## Ziel
Ein kompaktes Kontaktformular am Ende der Produktdetailseite hinzufuegen, das automatisch den Produktnamen in der Anfrage mit uebertraegt.

## Umsetzung

### 1. Neue Komponente erstellen: `ProductInquiryForm.tsx`

Eine schlankere Version des Kontaktformulars, speziell fuer Produktanfragen:

**Props:**
- `productTitle`: Der Produktname wird automatisch in die Nachricht/Betreff eingebunden
- `productSku`: Optional die Artikelnummer fuer Referenz

**Formularfelder:**
- Name (Pflichtfeld)
- E-Mail (Pflichtfeld)  
- Telefon (optional)
- Nachricht (Pflichtfeld, mit vorausgefuelltem Hinweis auf das Produkt)

**Design:**
- Kompakt ohne Karte und Kontaktinfos
- Passend zum bestehenden Produktseiten-Design
- Titel: "Anfrage zu diesem Produkt"
- Untertitel mit Produktname

### 2. ProductDetail.tsx anpassen

Das neue Formular nach der RelatedProducts-Sektion einfuegen:

```text
Position in der Seite:
+---------------------------+
| Header                    |
+---------------------------+
| Produktbilder | Infos     |
+---------------------------+
| Aehnliche Produkte        |
+---------------------------+
| Anfrage zu diesem Produkt | <-- NEU
+---------------------------+
| Footer                    |
+---------------------------+
```

### 3. Datenbank-Integration

Das bestehende `contact_submissions`-Schema wird erweitert:
- Neues Feld `product_reference` (optional) fuer Produktname/SKU
- Ermoeglicht spaetere Filterung nach Produktanfragen im Admin

---

## Technische Details

**Neue Datei:** `src/components/ProductInquiryForm.tsx`
- Zod-Validierung wie beim bestehenden ContactForm
- Speichert in `contact_submissions` mit Produktreferenz
- Schlankes Design ohne dekorative Elemente

**Aenderungen an:** `src/pages/ProductDetail.tsx`
- Import der neuen Komponente
- Einbindung nach RelatedProducts mit Produkttitel und SKU als Props

**Datenbank-Migration:**
- `ALTER TABLE contact_submissions ADD COLUMN product_reference TEXT`
- Keine Aenderung an bestehenden RLS-Policies noetig
