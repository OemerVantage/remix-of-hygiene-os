

# Plan: E-Mail-Benachrichtigung bei Neuregistrierung

## Ziel
Wenn sich ein neuer Kunde registriert, soll der Besitzer automatisch eine E-Mail erhalten mit den Kundendaten (Name, Firma, E-Mail, Telefon).

## Technische Umsetzung

### 1. Edge Function erstellen: `notify-new-registration`
- Neue Backend-Funktion `supabase/functions/notify-new-registration/index.ts`
- Empfängt Kundendaten (Name, E-Mail, Firma, Telefon) per POST
- Nutzt die Lovable AI (Gemini) zum Senden? Nein — stattdessen Resend oder die Supabase interne Mail-Funktion
- Einfachste Lösung: Nutzt den **Supabase SMTP** (bereits konfiguriert) via `supabase.auth.admin` oder einen externen Mail-Service

**Beste Lösung ohne zusätzliche API-Keys:** Database Webhook / Trigger auf der `profiles`-Tabelle, der bei INSERT eine Edge Function aufruft, die eine E-Mail versendet.

**Pragmatischste Lösung:** Die Edge Function wird direkt aus dem Frontend nach erfolgreicher Registrierung aufgerufen und sendet die E-Mail via Resend API.

→ Da kein Mail-Service-Secret vorhanden ist, wird ein API-Key benötigt (z.B. Resend).

### 2. Ablauf

1. **Edge Function** `notify-new-registration/index.ts`:
   - Empfängt: `firstName`, `lastName`, `email`, `company`, `phone`
   - Sendet eine formatierte E-Mail an die Besitzer-Adresse
   - Nutzt Resend API (benötigt `RESEND_API_KEY` Secret)

2. **Register.tsx** anpassen:
   - Nach erfolgreicher Registrierung (Schritt 6): Edge Function aufrufen mit den Kundendaten

3. **config.toml** anpassen:
   - Function-Eintrag mit `verify_jwt = false` hinzufügen

### 3. Benötigtes Secret
- `RESEND_API_KEY` — muss vom Besitzer bereitgestellt werden (kostenlos bei resend.com)
- Besitzer-E-Mail-Adresse wird als Konstante in der Edge Function hinterlegt

### 4. E-Mail-Inhalt
```
Betreff: Neue Kundenregistrierung – [Vorname Nachname]

Neuer Kunde registriert:
- Name: Max Mustermann
- Firma: Muster AG
- E-Mail: max@muster.ch
- Telefon: +41 79 123 45 67

→ Freigabe unter: [Link zur Admin-Seite]
```

## Voraussetzung
Der Besitzer muss einen Resend API-Key bereitstellen. Ich werde zuerst danach fragen, bevor ich die Implementierung starte.

