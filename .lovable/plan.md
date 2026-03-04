

## Plan: Spalte `invoice_allowed` zur Tabelle `profiles` hinzufügen

Ich führe die Migration aus, um die neue Spalte `invoice_allowed` (Boolean, Default `false`) zur `profiles`-Tabelle hinzuzufügen.

### Änderung
- **Migration**: `ALTER TABLE profiles ADD COLUMN IF NOT EXISTS invoice_allowed BOOLEAN DEFAULT FALSE;`

Keine Code-Änderungen nötig — die Spalte wird automatisch in den Supabase-Types reflektiert.

