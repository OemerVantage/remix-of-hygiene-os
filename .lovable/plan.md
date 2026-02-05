

## Ziel
Kunden können sich registrieren, aber erst nach Admin-Freigabe bestellen. Der Checkout-Button wird blockiert bis der Account genehmigt wurde.

## Architektur

```text
┌─────────────────────────────────────────────────────────────────┐
│                    Account-Freigabe Flow                         │
├─────────────────────────────────────────────────────────────────┤
│                                                                   │
│  1. Kunde registriert sich                                       │
│         ↓                                                         │
│  2. profiles.is_approved = false (Standard)                      │
│         ↓                                                         │
│  3. Kunde sieht: "Dein Konto wartet auf Freigabe"                │
│     - Kann Produkte ansehen ✅                                   │
│     - Kann zum Warenkorb hinzufügen ✅                           │
│     - Kann NICHT zur Kasse gehen ❌                              │
│         ↓                                                         │
│  4. Admin erhält Benachrichtigung (optional: E-Mail)             │
│         ↓                                                         │
│  5. Admin öffnet /admin/kunden und genehmigt den Kunden          │
│         ↓                                                         │
│  6. profiles.is_approved = true                                  │
│         ↓                                                         │
│  7. Kunde kann jetzt bestellen ✅                                │
│                                                                   │
└─────────────────────────────────────────────────────────────────┘
```

## Datenbank-Änderungen

### 1. Profiles-Tabelle erweitern
```sql
ALTER TABLE public.profiles 
ADD COLUMN is_approved boolean DEFAULT false NOT NULL;
```

### 2. User Roles Tabelle (für Admins)
```sql
CREATE TYPE public.app_role AS ENUM ('admin', 'user');

CREATE TABLE public.user_roles (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    role app_role NOT NULL,
    UNIQUE (user_id, role)
);

ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;
```

### 3. Security Definer Funktion
```sql
CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role app_role)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = _user_id AND role = _role
  )
$$;
```

### 4. RLS Policies
- Admins können alle Profile sehen und `is_approved` ändern
- Normale User können nur ihr eigenes Profil sehen

## Frontend-Änderungen

### CartDrawer.tsx
- Prüft `profile.is_approved` bevor Checkout erlaubt wird
- Zeigt Hinweis: "Dein Konto wartet noch auf Freigabe"

### AuthContext.tsx
- `isApproved` Feld im Profile-Interface hinzufügen
- Gibt `isApproved` Status zurück

### Neue Admin-Seite: `/admin/kunden`
- Liste aller registrierten Kunden
- Filter: "Wartend auf Freigabe" / "Freigegeben"
- Button zum Freigeben/Sperren
- Geschützt durch `has_role(user_id, 'admin')`

### Account-Bereich
- Zeigt Status-Banner: "Konto freigegeben" oder "Wartet auf Freigabe"

## Dateien

| Datei | Änderung |
|-------|----------|
| `profiles` Tabelle | + `is_approved` Spalte |
| `user_roles` Tabelle | Neu: Admin-Rollen |
| `src/contexts/AuthContext.tsx` | + `isApproved` im Profile |
| `src/components/CartDrawer.tsx` | Checkout-Sperre wenn nicht freigegeben |
| `src/pages/admin/Customers.tsx` | Neue Admin-Seite für Kundenfreigabe |
| `src/components/AdminRoute.tsx` | Route-Guard für Admins |
| `src/components/account/AccountOverview.tsx` | Status-Anzeige |
| `src/App.tsx` | + Admin-Routen |

## Benutzer-Erfahrung

### Neuer Kunde (nicht freigegeben)
1. Registriert sich erfolgreich
2. Sieht im Konto-Bereich: "Dein Konto wartet auf Freigabe durch unser Team."
3. Kann Produkte ansehen und zum Warenkorb hinzufügen
4. Beim Klick auf "Zur Kasse": Button ist deaktiviert mit Tooltip "Konto noch nicht freigegeben"

### Freigegebener Kunde
1. Sieht im Konto-Bereich: "Dein Konto ist aktiv"
2. Kann normal zur Kasse gehen

### Admin
1. Öffnet `/admin/kunden`
2. Sieht Liste aller Kunden mit Status
3. Kann Kunden freigeben oder sperren

## Sicherheit

- Admin-Rollen werden in separater `user_roles` Tabelle gespeichert (keine Privilege Escalation möglich)
- `is_approved` kann nur von Admins geändert werden (RLS Policy)
- Server-seitige Validierung durch Security Definer Funktion

## Optionale Erweiterungen (später)

- E-Mail-Benachrichtigung an Admin bei neuer Registrierung
- E-Mail an Kunde wenn Konto freigegeben wurde
- Grund für Ablehnung angeben können

