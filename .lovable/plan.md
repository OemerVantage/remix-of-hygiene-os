
## Ziel
Die Produktdaten für den **celtex® autocut Handtuchrollenspender** (Artikelnummer: C92660) in Shopify aktualisieren, damit die technischen Daten exakt dem bereitgestellten Bild entsprechen und in den Tabellen auf der Website korrekt angezeigt werden.

## Hintergrund
Da die Website so programmiert ist, dass sie strukturierte Informationen aus der Produktbeschreibung extrahiert (solange keine Metafields im Shopify-Admin gepflegt sind), werde ich die Beschreibung in Shopify so formatieren, dass die Tabellen "Produkteigenschaften" und "Versandinformationen" automatisch befüllt werden.

## Schritte

### 1. Produktdaten in Shopify aktualisieren
Ich werde die Produktbeschreibung (Body) in Shopify für das Produkt mit der ID `10403078930768` aktualisieren. Dabei werden die Daten aus deinem Screenshot für das Modell **C92660 (schwarz)** verwendet:

**Neue Struktur der Beschreibung:**
- Der bestehende Einleitungstext bleibt erhalten.
- **Produkteigenschaften:**
  - GTIN-Code (EAN): 4029068C92660
  - Abmessungen: 313 mm x 355 mm x 220 mm (B x H x T)
  - Material: Kunststoff
  - Farbe: schwarz
  - Branchen: Branchenunabhängig
  - Sichtfenster: Ja (zur Füllstandkontrolle)
  - Abschließbar: Ja
- **Versandinformationen:**
  - Inhalt/Verkaufseinheit: 1 Stück / VE
  - VE/PAL: 66 Stück/Palette

### 2. Überprüfung der Varianten
- Ich stelle sicher, dass die Artikelnummer (SKU) für die schwarze Variante im Shopify-Backend korrekt auf `C92660` gesetzt ist (dies scheint laut System bereits der Fall zu sein, ich werde es aber verifizieren).

## Technische Details
- **Tool-Einsatz:** Ich nutze das Tool `update_shopify_product`, um den `body`-Parameter mit dem neuen, strukturierten Text zu überschreiben.
- **Hinweis zu Varianten:** Da Shopify standardmäßig nur eine Beschreibung pro Produkt erlaubt, werden diese Daten nun primär für das schwarze Modell angezeigt. Falls du für die weiße Variante abweichende Daten (wie eine andere EAN) anzeigen möchtest, empfehle ich die Nutzung der Shopify Metafields, da diese für jede Variante individuell befüllt werden können.

## Ergebnis
Nach der Ausführung des Plans werden auf der Produktseite die Tabellen "Produkteigenschaften" und "Versandinformationen" automatisch mit den Werten aus deinem Bild befüllt.
