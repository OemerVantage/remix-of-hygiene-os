

# Plan: Logo groesser machen

## Aenderung

**Datei:** `src/components/Header.tsx`

Die Logo-Groesse wird von `h-10` auf `h-14` erhoert (Zeile 46):

```
// Vorher
<img src={logo} alt="HygiSwiss AG" className="h-10 w-auto" />

// Nachher
<img src={logo} alt="HygiSwiss AG" className="h-14 w-auto" />
```

**Datei:** `src/components/Footer.tsx`

Auch im Footer wird das Logo von `h-10` auf `h-14` vergroessert (Zeile 43):

```
// Vorher
<img src={logo} alt="HygiSwiss AG" className="h-10 w-auto" />

// Nachher
<img src={logo} alt="HygiSwiss AG" className="h-14 w-auto" />
```

## Zusammenfassung
- **2 Dateien** betroffen: `Header.tsx` und `Footer.tsx`
- Logo-Hoehe von 40px (`h-10`) auf 56px (`h-14`) erhoet
- Breite passt sich automatisch an (`w-auto`)

