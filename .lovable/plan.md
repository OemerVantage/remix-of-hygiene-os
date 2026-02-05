
# Plan: Produktanfrage-Formular verschoenern

## Ziel
Das Produktanfrage-Formular am Ende der Produktdetailseite optisch aufwerten, sodass es zum Premium-Design des restlichen Shops passt - inspiriert vom Hauptkontaktformular, aber kompakter.

## Aenderungen an `ProductInquiryForm.tsx`

### 1. Neue visuelle Elemente

**Karten-Design:**
- Formular in einer abgerundeten Karte (`rounded-3xl`) mit Schatten und Border
- Subtiler dekorativer Blur-Kreis in der Ecke
- Mehr Padding und Luft zwischen den Elementen

**Titel-Bereich:**
- Badge ueber dem Titel ("Produktanfrage")
- Groesserer, prominenterer Titel
- Bessere visuelle Hierarchie mit dem Produktnamen

**Formularfelder:**
- Groessere Eingabefelder (`h-12`) mit abgerundeten Ecken (`rounded-xl`)
- Sanftere Border-Farben mit Fokus-Effekten
- Sternchen in der Primaerfarbe fuer Pflichtfelder

**Button:**
- Groesserer, prominenterer Senden-Button
- Schatten-Effekt und Hover-Animation (`hover:-translate-y-0.5`)

**Erfolgs-Ansicht:**
- Groessere Success-Anzeige mit mehr visuellem Feedback
- Animierter Uebergang

### 2. Layout-Verbesserungen

```text
Vorher:
+----------------------------------+
| [Icon] Anfrage zu diesem Produkt |
| Haben Sie Fragen zu...           |
| [Formular - schlicht]            |
+----------------------------------+

Nachher:
+--------------------------------------+
|  [Badge: Produktanfrage]             |
|  Fragen zu diesem Produkt?           |
|  Produktname hervorgehoben           |
|                                      |
|  +--------------------------------+  |
|  | Karte mit Formular             |  |
|  | - Groessere Inputs             |  |
|  | - Moderne Styling              |  |
|  | - Dekorative Elemente          |  |
|  | - Prominenter Button           |  |
|  +--------------------------------+  |
|                                      |
|  [Hinweis: Schnelle Antwort]         |
+--------------------------------------+
```

### 3. Beibehaltene Funktionalitaet

- Zod-Validierung bleibt identisch
- Speicherung in `contact_submissions` mit `product_reference` bleibt
- Vorausgefuellte Nachricht mit Produktname
- Toast-Benachrichtigungen
- Erfolgs-Ansicht mit "Neue Anfrage stellen" Button

---

## Technische Details

**Geaenderte Datei:** `src/components/ProductInquiryForm.tsx`

**Wichtige CSS-Klassen:**
- `rounded-3xl` fuer abgerundete Karten
- `shadow-lg`, `shadow-xl` fuer Schatten
- `h-12 rounded-xl` fuer groessere Inputs
- `hover:-translate-y-0.5` fuer Button-Hover
- `bg-primary/10` fuer Badge-Hintergrund
- Dekorative `blur-2xl` Elemente
