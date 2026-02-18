

# Plan: Ratgeber-Detailseite professioneller gestalten

## Probleme aktuell
- Der Markdown-Content wird ohne sichtbare Ueberschriften dargestellt (h2 fehlt visuell)
- Kein Abstand zwischen Absaetzen und Ueberschriften
- Die Seite wirkt insgesamt flach und wenig magazinartig
- Kein Inhaltsverzeichnis oder visuelle Struktur im Artikeltext
- Die "Teilen"-Sektion und der Autorenbereich wirken schlicht

## Geplante Aenderungen

### 1. Markdown/Prose-Styling verbessern (GuideDetail.tsx)
- Erweiterte `prose`-Klassen fuer sichtbare h2/h3-Ueberschriften mit Abstand, Groesse und Farbe
- Bessere Absatzabstaende, Listen-Styling und Blockquote-Design
- Nummerierte Listen mit Custom-Styling

### 2. Hero-Bereich aufwerten (GuideDetail.tsx)
- Vollbreites Hero-Bild mit Gradient-Overlay und Titel darueber (magazinartiger Look)
- Kategorie-Badge und Lesezeit prominenter platzieren
- Groessere, elegantere Typografie

### 3. Sticky Inhaltsverzeichnis / Progress Bar
- Eine dezente Lese-Fortschrittsanzeige oben auf der Seite
- Gibt dem Leser Orientierung im Artikel

### 4. Autorenbereich und Teilen-Sektion modernisieren
- Schoenerer Autorenbereich mit Hintergrund-Card
- Teilen-Buttons mit Hover-Effekten
- CTA-Box am Ende ("Mehr Ratgeber entdecken")

### 5. Verwandte Artikel aufwerten
- Lesezeit-Badge auf den Karten anzeigen
- Hover-Animationen verbessern

## Technische Details

**Betroffene Datei:** `src/pages/GuideDetail.tsx` (komplettes Redesign)

Aenderungen im Detail:
- Hero-Section: Bild wird fullwidth mit dunklem Gradient-Overlay, Titel/Meta werden darauf platziert (weiss auf dunkel)
- Content-Bereich: Erweiterte prose-Klassen: `prose-h2:text-2xl prose-h2:font-bold prose-h2:mt-12 prose-h2:mb-4 prose-h2:border-b prose-h2:border-border prose-h2:pb-3 prose-ol:list-decimal prose-ol:pl-6 prose-ul:list-disc prose-ul:pl-6 prose-li:mb-2`
- Lese-Fortschritt: `useEffect` + `onScroll`-Handler fuer eine `Progress`-Leiste am oberen Rand
- Autorenbox: Card-Komponente mit dezenter Hintergrundfarbe statt einfacher Border
- CTA am Ende des Artikels: Farbiger Kasten mit Link zurueck zur Uebersicht
- Verwandte Artikel: Lesezeit-Badge + konsistentes Card-Design mit der Guides-Uebersichtsseite

Keine neuen Abhaengigkeiten noetig -- alle verwendeten Komponenten (Progress, Card) und Icons sind bereits vorhanden.

