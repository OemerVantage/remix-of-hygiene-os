

## Plan: FreeDispenserSection – Schriftgrössen, Bild und Zentrierung anpassen

### Analyse

Verglichen mit dem Rest der Seite (Hero, Branchenlösungen etc.) fallen folgende Inkonsistenzen auf:

1. **Container**: Nutzt `container mx-auto px-4` statt dem projektweiten `container-hygiswiss`
2. **Schriftgrössen**: Nutzt rohe Tailwind-Klassen (`text-3xl`, `text-4xl`, `text-5xl`) statt des Design-Systems (`text-display-sm`, `text-display-md`)
3. **Text-Zentrierung**: Text ist zwar `text-center`, aber auf Desktop im Grid linksbündig da nur die linke Spalte. Soll über die volle Breite zentriert werden, mit dem Bild darunter oder daneben passend ausgerichtet.

### Änderungen in `src/components/FreeDispenserSection.tsx`

1. **Container** auf `container-hygiswiss` umstellen
2. **Überschrift** auf `text-display-sm md:text-display-md` ändern (konsistent mit SolutionsSection)
3. **Beschreibungstext** auf `text-body-lg` ändern (konsistent mit HeroSection)
4. **Öffnungszeiten-Text** auf `text-body-sm` mit korrekter Opacity
5. **Layout**: Text-Spalte zentriert ausrichten (`text-center` beibehalten, `max-w` auf Absatz anpassen)
6. **Bild**: Grösse auf `max-h-[380px]` leicht reduzieren für bessere Proportionen zum Text

