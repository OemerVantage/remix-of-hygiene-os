

# Plan: Bestseller-Produkte zentriert anzeigen

## Ziel
Bei weniger als 4 Produkten sollen diese zentriert angezeigt werden, nicht links im Grid.

## Aktuelle Situation
Das Grid nutzt `grid-cols-4` - bei weniger Produkten bleiben die Produkte links im Grid-Bereich.

## Loesung
Von Grid zu Flexbox wechseln mit `justify-center` - so werden Produkte immer zentriert, unabhaengig von der Anzahl.

## Technische Aenderung

**Datei:** `src/components/BestsellerSection.tsx`

### Vorher (Zeile 64):
```text
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
  {products.map((product) => (
    <ProductCard key={product.node.id} product={product} />
  ))}
</div>
```

### Nachher:
```text
<div className="flex flex-wrap justify-center gap-6">
  {products.map((product) => (
    <div key={product.node.id} className="w-full sm:w-[calc(50%-12px)] lg:w-[calc(25%-18px)]">
      <ProductCard product={product} />
    </div>
  ))}
</div>
```

## Visuelle Darstellung

```text
Mit 4 Produkten:
┌─────────────────────────────────────────────────┐
│  [Produkt 1] [Produkt 2] [Produkt 3] [Produkt 4]│
└─────────────────────────────────────────────────┘

Mit 2 Produkten (zentriert):
┌─────────────────────────────────────────────────┐
│          [Produkt 1] [Produkt 2]                │
└─────────────────────────────────────────────────┘

Mit 1 Produkt (zentriert):
┌─────────────────────────────────────────────────┐
│                  [Produkt 1]                    │
└─────────────────────────────────────────────────┘
```

## Betroffene Datei

| Datei | Aenderung |
|-------|-----------|
| `src/components/BestsellerSection.tsx` | Grid durch Flexbox mit `justify-center` ersetzen (Zeile 64 und Skeleton-Bereich) |

