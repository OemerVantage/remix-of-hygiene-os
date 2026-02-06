
# Plan: Nachhaltigkeits-Sektion auf der "Über uns"-Seite hinzufügen

## Übersicht
Eine neue Sektion zum Thema Nachhaltigkeit wird nach der "Unsere Werte"-Sektion eingefügt. Das Design passt sich dem bestehenden Stil der Seite an.

---

## Neue Sektion: Nachhaltigkeit

Die Sektion wird folgende Elemente enthalten:

- Überschrift "Nachhaltigkeit" mit kurzer Einleitung
- 3-4 Nachhaltigkeits-Punkte mit Icons, z.B.:
  - **Umweltfreundliche Produkte** - Recycelbare Materialien und biologisch abbaubare Optionen
  - **CO2-reduzierte Lieferkette** - Optimierte Logistik für minimalen ökologischen Fussabdruck
  - **Ressourcenschonend** - Effiziente Verpackungen und reduzierter Materialeinsatz
  - **Zertifizierte Partner** - Zusammenarbeit mit nachhaltig zertifizierten Lieferanten

---

## Technische Änderungen

**Datei:** `src/pages/About.tsx`

### 1. Neue Icons importieren (Zeile 3):

```tsx
import { Users, Target, Award, Heart, Leaf, Recycle, Package, BadgeCheck } from "lucide-react";
```

### 2. Nachhaltigkeits-Daten hinzufügen (nach Zeile 26):

```tsx
const sustainabilityPoints = [
  {
    icon: Leaf,
    title: "Umweltfreundliche Produkte",
    description: "Wir bieten recycelbare Materialien und biologisch abbaubare Optionen für eine saubere Zukunft.",
  },
  {
    icon: Recycle,
    title: "CO2-reduzierte Lieferkette",
    description: "Optimierte Logistik und regionale Partner minimieren unseren ökologischen Fussabdruck.",
  },
  {
    icon: Package,
    title: "Ressourcenschonend",
    description: "Effiziente Verpackungen und reduzierter Materialeinsatz schonen natürliche Ressourcen.",
  },
  {
    icon: BadgeCheck,
    title: "Zertifizierte Partner",
    description: "Wir arbeiten ausschliesslich mit nachhaltig zertifizierten Lieferanten zusammen.",
  },
];
```

### 3. Neue Sektion nach "Unsere Werte" einfügen (nach Zeile 122):

```tsx
{/* Sustainability Section */}
<section className="py-20">
  <div className="container mx-auto px-4">
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-16 animate-fade-in">
        <span className="inline-block px-4 py-2 bg-green-100 text-green-700 rounded-full text-sm font-medium mb-4">
          Verantwortung für morgen
        </span>
        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
          Nachhaltigkeit
        </h2>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          Umweltbewusstes Handeln ist Teil unserer Unternehmens-DNA. 
          Wir setzen auf nachhaltige Lösungen entlang der gesamten Wertschöpfungskette.
        </p>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
        {sustainabilityPoints.map((point, index) => (
          <div
            key={point.title}
            className="bg-gradient-to-br from-green-50 to-green-100/50 rounded-2xl p-8 border border-green-200/50 hover:shadow-lg transition-all duration-300 animate-fade-in group"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="w-14 h-14 bg-green-100 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-green-500 group-hover:scale-110 transition-all duration-300">
              <point.icon className="w-7 h-7 text-green-600 group-hover:text-white transition-colors" />
            </div>
            <h3 className="text-xl font-bold text-foreground mb-3">{point.title}</h3>
            <p className="text-muted-foreground">{point.description}</p>
          </div>
        ))}
      </div>
    </div>
  </div>
</section>
```

---

## Seitenstruktur nach der Änderung

| Position | Sektion |
|----------|---------|
| 1 | Hero (Über uns) |
| 2 | Unsere Mission |
| 3 | Unsere Werte |
| 4 | **Nachhaltigkeit (NEU)** |

---

## Betroffene Datei

| Datei | Änderung |
|-------|----------|
| `src/pages/About.tsx` | Neue Icons importieren, sustainabilityPoints-Array hinzufügen, Nachhaltigkeits-Sektion einfügen |
