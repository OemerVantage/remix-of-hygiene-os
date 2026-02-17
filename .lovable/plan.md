

# Plan: Logo noch groesser machen

## Aenderung

Das Logo im Header und Footer wird von `h-20` (80px) auf `h-28` (112px) vergroessert.

**Datei:** `src/components/Header.tsx` (Zeile 43)
- `className="h-20 w-auto"` wird zu `className="h-28 w-auto"`
- Die Header-Navigation-Hoehe wird ebenfalls von `h-20` auf `h-28` angepasst (Zeile 40), damit das Logo nicht abgeschnitten wird.

**Datei:** `src/components/Footer.tsx` (Zeile 36)
- `className="h-20 w-auto"` wird zu `className="h-28 w-auto"`

## Zusammenfassung
- **2 Dateien** betroffen
- Logo-Hoehe von 80px (`h-20`) auf 112px (`h-28`) erhoeht
- Header-Hoehe entsprechend angepasst

