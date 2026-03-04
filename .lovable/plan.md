

## Plan: Resend API Key aktualisieren

Der `RESEND_API_KEY` ist bereits als Secret konfiguriert. Ich werde ihn mit dem neuen Wert `re_3hgDZaRB_CamwjgGVSNtXDKptJKXFQumu` aktualisieren.

### Änderung
- **Secret `RESEND_API_KEY`** mit dem neuen Wert überschreiben (via `add_secret` Tool)

Keine Code-Änderungen nötig — die Edge Function `notify-new-registration` liest den Key bereits korrekt aus `Deno.env.get("RESEND_API_KEY")`.

