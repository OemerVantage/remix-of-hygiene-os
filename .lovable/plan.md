

# Plan: Erweiterte Registrierung mit Firmen- und Adressdaten

## Ziel
Das Registrierungsformular erweitern um folgende Felder:
- Vorname & Nachname (getrennt statt "Anzeigename")
- Firma
- Telefonnummer
- Liefer- und Rechnungsadresse (mit Option "Rechnungsadresse = Lieferadresse")

---

## Datenbank-Aenderungen

### 1. Profiles-Tabelle erweitern

Neue Spalten hinzufuegen:

| Spalte | Typ | Pflicht |
|--------|-----|---------|
| `first_name` | text | Ja |
| `last_name` | text | Ja |
| `company` | text | Nein |

Die bestehende `phone` Spalte wird bereits verwendet.

### 2. Addresses-Tabelle

Neue Spalte fuer Adresstyp:

| Spalte | Typ | Beschreibung |
|--------|-----|--------------|
| `address_type` | text | 'billing' oder 'shipping' |

---

## Formular-Struktur

### Sektion 1: Persoenliche Daten
```text
┌─────────────────────────────────────────────┐
│  Vorname*           │  Nachname*            │
├─────────────────────┴───────────────────────┤
│  Firma (optional)                           │
├─────────────────────────────────────────────┤
│  E-Mail*                                    │
├─────────────────────────────────────────────┤
│  Telefon*                                   │
└─────────────────────────────────────────────┘
```

### Sektion 2: Lieferadresse
```text
┌─────────────────────────────────────────────┐
│  Strasse & Hausnummer*                      │
├──────────────────────┬──────────────────────┤
│  PLZ*                │  Ort*                │
├──────────────────────┴──────────────────────┤
│  Land (Standard: Schweiz)                   │
└─────────────────────────────────────────────┘
```

### Sektion 3: Rechnungsadresse
```text
┌─────────────────────────────────────────────┐
│  ☑ Rechnungsadresse = Lieferadresse         │
├─────────────────────────────────────────────┤
│  (Falls nicht angehakt: gleiche Felder)     │
└─────────────────────────────────────────────┘
```

### Sektion 4: Passwort
```text
┌─────────────────────────────────────────────┐
│  Passwort*                                  │
├─────────────────────────────────────────────┤
│  Passwort bestaetigen*                      │
└─────────────────────────────────────────────┘
```

---

## Technische Umsetzung

### 1. Datenbank-Migration

```sql
-- Profiles erweitern
ALTER TABLE profiles ADD COLUMN first_name text;
ALTER TABLE profiles ADD COLUMN last_name text;
ALTER TABLE profiles ADD COLUMN company text;

-- Addresses erweitern fuer Typ
ALTER TABLE addresses ADD COLUMN address_type text DEFAULT 'shipping';
```

### 2. AuthContext anpassen

Das Profile-Interface erweitern:

```text
interface Profile {
  ...
  first_name: string | null;
  last_name: string | null;
  company: string | null;
}
```

### 3. Registrierungsseite erweitern

**Datei:** `src/pages/Register.tsx`

- Formular in Sektionen aufteilen mit Ueberschriften
- Alle neuen Felder als State hinzufuegen
- Checkbox fuer "Rechnungsadresse = Lieferadresse"
- Bei Submit:
  1. Benutzer registrieren (auth.signUp)
  2. Profil aktualisieren (first_name, last_name, company, phone)
  3. Lieferadresse erstellen (address_type: 'shipping', is_default: true)
  4. Falls unterschiedlich: Rechnungsadresse erstellen (address_type: 'billing')

### 4. Formularvalidierung

Pflichtfelder:
- Vorname, Nachname
- E-Mail
- Telefon
- Strasse, PLZ, Ort (Lieferadresse)
- Passwort (min. 6 Zeichen)

---

## Betroffene Dateien

| Datei | Aenderung |
|-------|-----------|
| Datenbank | Migration fuer `profiles` (first_name, last_name, company) und `addresses` (address_type) |
| `src/contexts/AuthContext.tsx` | Profile-Interface erweitern |
| `src/pages/Register.tsx` | Komplettes Formular neu gestalten mit allen Feldern |
| `src/components/account/ProfileSettings.tsx` | Neue Felder anzeigen und bearbeitbar machen |

---

## Formular-Flow

```text
1. Benutzer fuellt Formular aus
          ↓
2. Validierung (Client-seitig)
          ↓
3. supabase.auth.signUp(email, password)
          ↓
4. Profile aktualisieren mit Namen, Firma, Telefon
          ↓
5. Lieferadresse in addresses-Tabelle speichern
          ↓
6. Falls noetig: Rechnungsadresse separat speichern
          ↓
7. Shopify-Kunde erstellen (Hintergrund)
          ↓
8. Weiterleitung zu /konto
```

