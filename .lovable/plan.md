
# Plan: Logo mit transparentem Hintergrund ersetzen

## Uebersicht
Das hochgeladene Logo (mit transparentem Hintergrund) wird als neue Logo-Datei ins Projekt kopiert und ersetzt das bisherige Logo ueberall.

## Schritte

1. **Logo-Datei kopieren**: Das hochgeladene Bild (`ChatGPT_Image_17._Feb._2026_10_51_00.png`) wird nach `src/assets/logo.png` kopiert und ersetzt die bestehende Datei.

2. **Keine Code-Aenderungen noetig**: Sowohl `Header.tsx` als auch `Footer.tsx` importieren bereits `@/assets/logo.png` -- durch das Ersetzen der Datei wird das neue Logo automatisch ueberall angezeigt.

## Betroffene Stellen
- **Header** (Navigation oben): `src/components/Header.tsx` -- importiert `@/assets/logo.png`
- **Footer** (Fusszeile): `src/components/Footer.tsx` -- importiert `@/assets/logo.png`

## Technische Details
- 1 Datei wird ersetzt: `src/assets/logo.png`
- Keine Code-Aenderungen erforderlich
- Das Favicon (`public/favicon.png`) bleibt unveraendert -- soll das auch aktualisiert werden?
