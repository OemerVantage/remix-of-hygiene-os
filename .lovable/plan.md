
# Plan: Schweizer Deutsch Anpassungen

## Ziel
Alle deutschen Texte in der Anwendung auf Schweizer Schreibweise anpassen - kein "ß" (Eszett), sondern "ss", sowie Schweizer Kontaktdaten und Formate.

## Betroffene Dateien

### 1. `src/components/ProductInquiryForm.tsx`
**Textanpassungen:**
- "schnellstmöglich" → "schnellstmoeglich" ist falsch, "ö" bleibt! Nur "ß" wird ersetzt
- Telefon-Placeholder: `+49 123 456789` → `+41 44 123 45 67`
- E-Mail-Placeholder: `ihre@email.de` → `ihre@email.ch`
- PLZ-Placeholder: `12345` → `8001`

### 2. `src/components/ContactForm.tsx`
**Textanpassungen:**
- "Musterstraße" → "Musterstrasse"
- "Öffnungszeiten" → bleibt (ö ist ok in CH)
- Telefonnummer: `+49 (0) 123 456 789` → `+41 44 123 45 67`
- E-Mail: `info@hygiscout.de` → `info@hygiscout.ch`
- "vollständiger Name" → "vollstaendiger" ist falsch → "vollständiger" bleibt!
- Telefon-Placeholder: `+49 123 456789` → `+41 44 123 45 67`

### 3. `src/components/account/AddressBook.tsx`
**Textanpassungen:**
- "Straße" → "Strasse"

### 4. `src/pages/About.tsx`
**Textanpassungen:**
- "Größe" → "Grösse"

### 5. `src/pages/Guides.tsx`
**Textanpassungen:**
- "Maßnahmen" → "Massnahmen"
- "regelmäßig" → "regelmässig"

### 6. `src/pages/Solutions.tsx`
**Textanpassungen:**
- "Größen" → "Grössen"
- "Maßgeschneiderte" → "Massgeschneiderte"

### 7. `src/components/SolutionsSection.tsx`
**Textanpassungen:**
- "Maßgeschneiderte" → "Massgeschneiderte"

---

## Zusammenfassung der Ersetzungen

| Original | Schweizer Schreibweise |
|----------|------------------------|
| ß | ss |
| Straße | Strasse |
| Größe/Größen | Grösse/Grössen |
| Maßnahmen | Massnahmen |
| Maßgeschneidert | Massgeschneidert |
| regelmäßig | regelmässig |
| vollständig | vollständig (bleibt!) |
| schnellstmöglich | schnellstmöglich (bleibt!) |
| +49 | +41 |
| .de | .ch |
| 12345 (PLZ) | 8001 (4-stellig) |

**Wichtig:** Umlaute (ö, ä, ü) bleiben erhalten - nur das "ß" wird zu "ss"!
