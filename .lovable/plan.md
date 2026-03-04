

## Plan: Kontaktformulare mit E-Mail-Benachrichtigung verbinden

### Problem
- **Kontaktformular** und **Produktanfrage** speichern nur in die DB, senden aber keine E-Mail an `info@hygiswiss.ch`
- Die Registrierungs-Mail nutzt `onboarding@resend.dev` (Resend Test-Absender) statt einer eigenen Domain

### Lösung

#### 1. Neue Edge Function: `notify-contact-submission`
Erstellt eine neue Edge Function die bei Kontakt- und Produktanfragen eine E-Mail an `info@hygiswiss.ch` sendet:
- Empfängt: `name`, `email`, `phone`, `message`, `productReference` (optional)
- Sendet formatierte HTML-Mail via Resend API
- Unterscheidet zwischen allgemeiner Kontaktanfrage und Produktanfrage im Betreff

#### 2. ContactForm.tsx anpassen
Nach erfolgreichem DB-Insert zusätzlich `supabase.functions.invoke("notify-contact-submission", ...)` aufrufen (fire-and-forget wie bei der Registrierung).

#### 3. ProductInquiryForm.tsx anpassen
Gleicher Aufruf nach erfolgreichem DB-Insert, mit `productReference` im Body.

#### 4. Absender-Adresse
Alle E-Mails verwenden weiterhin `onboarding@resend.dev` als Absender (Resend Free Tier Limitation). Falls ihr eine eigene Domain bei Resend verifiziert habt, kann der Absender angepasst werden.

### Keine DB-Änderungen nötig
Die `contact_submissions` Tabelle und RLS-Policies bleiben unverändert.

