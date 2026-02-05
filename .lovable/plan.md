
## Ziel
Vollständiges Kunden-Account-System mit Login/Registrierung, Bestellhistorie (Shopify), persönlichen Daten, Lieferadressen und Wunschliste.

## Architektur-Überblick

```text
┌─────────────────────────────────────────────────────────────────┐
│                      HYGISCOUT Account-System                     │
├─────────────────────────────────────────────────────────────────┤
│                                                                   │
│  ┌─────────────────┐    ┌──────────────────────────────────────┐│
│  │  Lovable Cloud  │    │         Shopify Storefront API       ││
│  │  Authentifizier │    │                                      ││
│  │                 │    │  - Kundenregistrierung               ││
│  │  - Login        │◄──►│  - Bestellhistorie                   ││
│  │  - Registrierung│    │  - Lieferadressen                    ││
│  │  - Passwort     │    │  - Customer Access Token             ││
│  │    Reset        │    │                                      ││
│  └─────────────────┘    └──────────────────────────────────────┘│
│           │                                                       │
│           ▼                                                       │
│  ┌─────────────────────────────────────────────────────────────┐│
│  │                     Lovable Cloud Datenbank                  ││
│  │                                                               ││
│  │  profiles           │  wishlist_items      │ addresses       ││
│  │  - user_id (FK)     │  - user_id (FK)      │ - user_id (FK)  ││
│  │  - email            │  - product_handle    │ - street        ││
│  │  - display_name     │  - variant_id        │ - city          ││
│  │  - phone            │  - created_at        │ - postal_code   ││
│  │  - shopify_customer │                      │ - country       ││
│  │    _id              │                      │ - is_default    ││
│  └─────────────────────────────────────────────────────────────┘│
└─────────────────────────────────────────────────────────────────┘
```

## Strategie

Da wir Lovable Cloud (Auth) + Shopify (Checkout/Bestellungen) kombinieren, brauchen wir eine Brücke:

1. **Authentifizierung**: Lovable Cloud Auth (E-Mail/Passwort)
2. **Profile & Wunschliste**: Lovable Cloud Datenbank
3. **Bestellhistorie**: Shopify Storefront API (Customer Access Token)
4. **Lieferadressen**: Können entweder in Lovable Cloud ODER Shopify gespeichert werden - ich empfehle Lovable Cloud, da Shopify-Adressen erst beim Checkout relevant werden

## Implementierungsschritte

### Phase 1: Datenbank-Setup

**Tabelle: profiles**
| Spalte | Typ | Beschreibung |
|--------|-----|--------------|
| id | uuid (PK) | Primärschlüssel |
| user_id | uuid (FK → auth.users) | Referenz zum Auth-User |
| email | text | E-Mail-Adresse |
| display_name | text | Anzeigename |
| phone | text | Telefonnummer |
| shopify_customer_id | text | Verknüpfung zu Shopify |
| created_at | timestamptz | Erstellungsdatum |

**Tabelle: wishlist_items**
| Spalte | Typ | Beschreibung |
|--------|-----|--------------|
| id | uuid (PK) | Primärschlüssel |
| user_id | uuid (FK → auth.users) | Referenz zum Auth-User |
| product_handle | text | Shopify Produkt-Handle |
| variant_id | text | Shopify Varianten-ID |
| created_at | timestamptz | Hinzugefügt am |

**Tabelle: addresses**
| Spalte | Typ | Beschreibung |
|--------|-----|--------------|
| id | uuid (PK) | Primärschlüssel |
| user_id | uuid (FK → auth.users) | Referenz zum Auth-User |
| label | text | z.B. "Zuhause", "Büro" |
| first_name | text | Vorname |
| last_name | text | Nachname |
| street | text | Straße + Hausnummer |
| postal_code | text | PLZ |
| city | text | Stadt |
| country | text | Land |
| is_default | boolean | Standard-Adresse? |

**RLS-Policies**: Alle Tabellen mit user_id-basierter Zugriffskontrolle

### Phase 2: Authentifizierung

**Neue Seiten:**
- `/login` - Login-Formular
- `/registrieren` - Registrierungs-Formular
- `/passwort-vergessen` - Passwort-Reset
- `/konto` - Account-Dashboard (geschützt)

**Komponenten:**
- `AuthProvider.tsx` - Auth-Context für die gesamte App
- `ProtectedRoute.tsx` - Route-Guard für geschützte Seiten

### Phase 3: Konto-Bereich

**Account-Dashboard (`/konto`) mit Tabs:**

1. **Übersicht** - Willkommen, letzte Aktivitäten
2. **Bestellungen** - Bestellhistorie von Shopify
3. **Profil** - Persönliche Daten bearbeiten
4. **Adressen** - Lieferadressen verwalten
5. **Wunschliste** - Gespeicherte Produkte

### Phase 4: Shopify-Integration

**Shopify Customer Account Flow:**

```text
1. User registriert sich auf HYGISCOUT
         ↓
2. Wir erstellen parallel einen Shopify-Kunden (customerCreate)
         ↓
3. shopify_customer_id wird im Profil gespeichert
         ↓
4. Bei Bestellhistorie: customerAccessTokenCreate + customer.orders Query
```

**GraphQL-Queries für Shopify:**
- `customerCreate` - Neuen Kunden anlegen
- `customerAccessTokenCreate` - Login-Token für Shopify
- `customer.orders` - Bestellungen abrufen

### Phase 5: Wunschliste-Feature

- Herz-Icon auf Produktkarten
- Toast-Benachrichtigung beim Hinzufügen/Entfernen
- Sync mit Datenbank für eingeloggte User
- Lokaler Fallback für nicht-eingeloggte User (localStorage)

## Dateien

| Datei | Beschreibung |
|-------|--------------|
| `src/contexts/AuthContext.tsx` | Auth-Provider mit Lovable Cloud |
| `src/components/ProtectedRoute.tsx` | Route-Guard |
| `src/pages/Login.tsx` | Login-Seite |
| `src/pages/Register.tsx` | Registrierungs-Seite |
| `src/pages/ForgotPassword.tsx` | Passwort-Reset |
| `src/pages/Account.tsx` | Account-Dashboard |
| `src/components/account/AccountOverview.tsx` | Dashboard-Übersicht |
| `src/components/account/OrderHistory.tsx` | Bestellungen (Shopify) |
| `src/components/account/ProfileSettings.tsx` | Profil bearbeiten |
| `src/components/account/AddressBook.tsx` | Adressen verwalten |
| `src/components/account/Wishlist.tsx` | Wunschliste |
| `src/components/WishlistButton.tsx` | Herz-Button für Produkte |
| `src/hooks/useWishlist.ts` | Wunschlisten-Logik |
| `src/lib/shopify.ts` | Erweitert um Customer-Queries |
| `src/App.tsx` | Neue Routen + AuthProvider |
| `src/components/Header.tsx` | Login/Account-Button |

## Technische Details

### Shopify Customer API Queries

```graphql
mutation customerCreate($input: CustomerCreateInput!) {
  customerCreate(input: $input) {
    customer { id email }
    customerUserErrors { message }
  }
}

mutation customerAccessTokenCreate($input: CustomerAccessTokenCreateInput!) {
  customerAccessTokenCreate(input: $input) {
    customerAccessToken { accessToken expiresAt }
    customerUserErrors { message }
  }
}

query customer($customerAccessToken: String!) {
  customer(customerAccessToken: $customerAccessToken) {
    id
    email
    firstName
    lastName
    orders(first: 10) {
      edges {
        node {
          id
          orderNumber
          processedAt
          totalPrice { amount currencyCode }
          fulfillmentStatus
          lineItems(first: 5) {
            edges {
              node {
                title
                quantity
              }
            }
          }
        }
      }
    }
  }
}
```

## Hinweise zur Zahlungsabwicklung

Die Zahlungsabwicklung bleibt wie sie ist:
- Warenkorb → "Zur Kasse" → Shopify Checkout (neuer Tab)
- Shopify verarbeitet alle Zahlungen
- Bestellungen werden in Shopify gespeichert
- Wir zeigen sie nur im Account-Bereich an

## Implementierungsreihenfolge

1. Datenbank-Migration (profiles, wishlist_items, addresses + RLS)
2. Auth-Setup (Context, Login, Register)
3. Account-Seite mit Tabs (Grundstruktur)
4. Profil-Bearbeitung
5. Adressbuch
6. Wunschliste
7. Shopify-Integration (Customer erstellen bei Registrierung)
8. Bestellhistorie von Shopify laden
9. Header-Update (Login/Account-Button)
