

# Plan: "Hygiscout" durch "Hygiswiss" ersetzen

## Uebersicht
Alle Vorkommen von "Hygiscout" (in allen Schreibweisen) werden durch "Hygiswiss" ersetzt. Das betrifft sichtbare Texte, CSS-Klassen/Kommentare und eine E-Mail-Adresse.

## Betroffene Dateien und Aenderungen

| Datei | Was wird geaendert |
|-------|-------------------|
| `src/components/HeroSection.tsx` | "Hygiscout ist Ihr Betriebssystem..." -> "Hygiswiss ist Ihr Betriebssystem..." |
| `src/components/TrustSection.tsx` | "Warum Hygiscout" -> "Warum Hygiswiss" |
| `src/pages/Register.tsx` | "Willkommen bei HYGISCOUT!" -> "Willkommen bei HYGISWISS!" |
| `src/components/ContactForm.tsx` | "info@hygiscout.ch" -> "info@hygiswiss.ch" |
| `src/index.css` | CSS-Kommentare: "Hygiscout Design System" -> "Hygiswiss Design System", "Custom Hygiscout Tokens" -> "Custom Hygiswiss Tokens" |

## CSS-Klasse `container-hygiscout`

Die CSS-Klasse `.container-hygiscout` wird in `.container-hygiswiss` umbenannt. Das betrifft:

| Datei | Anzahl Stellen |
|-------|---------------|
| `src/index.css` | 1 (Klassendefinition) |
| `src/components/Header.tsx` | 1 |
| `src/components/HeroSection.tsx` | 1 |
| `src/components/SolutionsSection.tsx` | 1 |
| `src/components/ModulesSection.tsx` | 1 |
| `src/components/TrustSection.tsx` | 1 |
| `src/components/GuidesSection.tsx` | 1 |
| `src/components/CTASection.tsx` | 1 |
| `src/components/Footer.tsx` | 1 |
| `src/pages/Account.tsx` | 1 |

## Zusammenfassung
- **12 Dateien** betroffen
- Alle sichtbaren Texte, Kommentare und die CSS-Klasse werden konsistent auf "Hygiswiss" umgestellt
- Keine funktionalen Aenderungen -- nur Namensaenderungen
