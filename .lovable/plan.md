
## Plan: Footer-Jahr dynamisch machen

### Änderung
`src/components/Footer.tsx` Zeile 115:

```tsx
© {new Date().getFullYear()} HygiSwiss AG. Alle Rechte vorbehalten.
```

statt fixem `© 2024`. Damit ist das Jahr immer automatisch aktuell (2026 jetzt, 2027 nächstes Jahr usw.) – kein manuelles Nachpflegen mehr nötig.

### Nicht betroffen
Sonst nichts – reine Einzeiler-Änderung im Footer.
