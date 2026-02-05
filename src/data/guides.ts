export interface Guide {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  readTime: string;
  image: string;
  featured?: boolean;
}

export const guides: Guide[] = [
  {
    id: 1,
    slug: "haendehygiene-am-arbeitsplatz",
    title: "Der ultimative Leitfaden zur Händehygiene am Arbeitsplatz",
    excerpt: "Erfahren Sie, wie Sie mit einfachen Massnahmen die Händehygiene in Ihrem Unternehmen verbessern können.",
    content: `Händehygiene ist eine der wichtigsten Massnahmen zur Verhinderung von Infektionen. Gerade am Arbeitsplatz, wo viele Menschen zusammenkommen, ist das Risiko der Keimübertragung hoch.

## Warum ist Händehygiene so wichtig?

Bis zu 80% aller Infektionskrankheiten werden über die Hände übertragen. Regelmässiges Händewaschen und Desinfizieren kann Krankheitsausfällen effektiv vorbeugen und so die Produktivität in Ihrem Unternehmen sichern.

## Die 5 Momente der Händehygiene

1. **Vor Arbeitsbeginn**: Um keine Keime in den Arbeitsbereich zu tragen.
2. **Vor dem Essen**: Um die Aufnahme von Krankheitserregern zu vermeiden.
3. **Nach dem Toilettengang**: Eine Selbstverständlichkeit, die dennoch oft vernachlässigt wird.
4. **Nach Kontakt mit potenziell kontaminierten Oberflächen**: Türgriffe, gemeinsam genutzte Tastaturen etc.
5. **Nach Arbeitsende**: Um keine Keime mit nach Hause zu nehmen.

## Tipps für die Umsetzung

Stellen Sie ausreichend Desinfektionsmittelspender zur Verfügung und schulen Sie Ihre Mitarbeiter regelmässig. Visuelle Erinnerungen in Waschräumen können ebenfalls helfen, die Compliance zu erhöhen.`,
    category: "Hygiene Basics",
    readTime: "8 min",
    image: "https://images.unsplash.com/photo-1584744982491-665216d95f8b?w=800&h=400&fit=crop",
    featured: true,
  },
  {
    id: 2,
    slug: "haccp-hygieneschulung",
    title: "HACCP-Hygieneschulung: Was Sie wissen müssen",
    excerpt: "Ein umfassender Überblick über HACCP-Anforderungen und wie Sie diese in Ihrer Küche umsetzen.",
    content: `HACCP (Hazard Analysis and Critical Control Points) ist ein präventives System, das die Sicherheit von Lebensmitteln und Verbrauchern gewährleisten soll.

## Grundprinzipien des HACCP

Das Konzept basiert auf der Identifizierung, Bewertung und Beherrschung von Risiken bei der Lebensmittelherstellung. Es ist in der Schweiz für alle lebensmittelverarbeitenden Betriebe gesetzlich vorgeschrieben.

## Kritische Kontrollpunkte

Ein wesentlicher Bestandteil ist die Bestimmung von Critical Control Points (CCPs). Dies sind Punkte im Prozess, an denen eine Gefahr vermieden, eliminiert oder auf ein akzeptables Mass reduziert werden kann. Beispiele sind Temperaturkontrollen beim Kochen oder Kühlen.

## Dokumentation

Eine saubere Dokumentation ist unerlässlich. Checklisten für die Reinigung, Temperaturprotokolle und Schulungsnachweise müssen lückenlos geführt werden, um im Falle einer behördlichen Prüfung abgesichert zu sein.`,
    category: "Gastronomie",
    readTime: "12 min",
    image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&h=400&fit=crop",
  },
  {
    id: 3,
    slug: "nachhaltige-reinigung",
    title: "Nachhaltige Reinigung: Umweltfreundliche Alternativen",
    excerpt: "Wie Sie Ihre Reinigungsprozesse nachhaltiger gestalten, ohne Kompromisse bei der Hygiene einzugehen.",
    content: `Nachhaltigkeit gewinnt auch in der Reinigungsbranche immer mehr an Bedeutung. Doch bedeutet öko auch gleich weniger sauber? Keineswegs.

## Moderne Öko-Reiniger

Moderne ökologische Reinigungsmittel stehen ihren chemischen Pendants in Sachen Reinigungsleistung in nichts nach. Sie basieren oft auf pflanzlichen Tensiden und verzichten auf Mikroplastik und aggressive Säuren.

## Dosierung ist der Schlüssel

Ein grosser Hebel für mehr Nachhaltigkeit ist die korrekte Dosierung. Überdosierung belastet nicht nur die Umwelt, sondern kostet auch unnötig Geld und kann Oberflächen beschädigen.

## Wiederverwendbare Materialien

Setzen Sie auf waschbare Mikrofasertücher statt Einwegtücher, wo immer es hygienisch vertretbar ist. Das reduziert Müll und schont Ressourcen.`,
    category: "Nachhaltigkeit",
    readTime: "6 min",
    image: "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=800&h=400&fit=crop",
  },
  {
    id: 4,
    slug: "desinfektion-vs-reinigung",
    title: "Desinfektion vs. Reinigung: Der Unterschied erklärt",
    excerpt: "Wann ist Reinigung ausreichend und wann sollten Sie desinfizieren? Ein praktischer Guide.",
    content: `Oft werden Reinigung und Desinfektion synonym verwendet, doch es handelt sich um zwei völlig unterschiedliche Prozesse mit unterschiedlichen Zielen.

## Reinigung

Reinigung entfernt sichtbaren Schmutz und Staub und reduziert die Keimzahl mechanisch um bis zu 90%. Für viele Bereiche im Alltag ist eine gründliche Reinigung völlig ausreichend.

## Desinfektion

Desinfektion zielt darauf ab, Mikroorganismen gezielt abzutöten oder inaktivieren. Sie ist dort notwendig, wo ein erhöhtes Infektionsrisiko besteht, etwa im Gesundheitswesen oder bei der Verarbeitung von rohem Fleisch.

## Die goldene Regel

"Erst reinigen, dann desinfizieren." Desinfektionsmittel wirken auf schmutzigen Oberflächen oft schlechter, da der Schmutz die Keime schützen kann (Eiweissfehler).`,
    category: "Hygiene Basics",
    readTime: "5 min",
    image: "https://images.unsplash.com/photo-1563453392212-326f5e854473?w=800&h=400&fit=crop",
  },
  {
    id: 5,
    slug: "hygiene-im-gesundheitswesen",
    title: "Hygiene im Gesundheitswesen: Best Practices",
    excerpt: "Die wichtigsten Hygienestandards für medizinische Einrichtungen und deren Umsetzung.",
    content: `In Krankenhäusern und Pflegeeinrichtungen hat Hygiene oberste Priorität. Nosokomiale Infektionen (Krankenhausinfektionen) sind ein ernstes Problem, dem nur mit strengen Protokollen begegnet werden kann.

## Händehygiene

Der wichtigste Faktor. Spender müssen gut erreichbar sein (Point-of-Care).

## Flächenhygiene

Patientennahe Flächen müssen täglich desinfiziert werden. Risikoflächen erfordern noch häufigere Intervalle.

## Instrumentenaufbereitung

Sterilgut muss unter streng kontrollierten Bedingungen aufbereitet werden, um Kreuzkontaminationen sicher auszuschliessen.`,
    category: "Gesundheitswesen",
    readTime: "15 min",
    image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800&h=400&fit=crop",
  },
  {
    id: 6,
    slug: "spendersysteme-warten",
    title: "Spendersysteme richtig warten und pflegen",
    excerpt: "Tipps und Tricks für die optimale Wartung Ihrer Hygiene-Spendersysteme.",
    content: `Ein defekter Seifenspender ist nicht nur ärgerlich, sondern auch unhygienisch. Regelmässige Wartung sichert die Funktion.

## Regelmässige Reinigung

Reinigen Sie die Spender auch von innen, wenn Sie Kartuschen wechseln. Verklebungen können die Pumpe blockieren.

## Batteriewechsel

Bei Sensor-Spendern sollten Batterien rechtzeitig gewechselt werden. Viele Modelle haben eine LED-Anzeige für niedrigen Batteriestand.

## Kompatibilität

Nutzen Sie nur die vom Hersteller empfohlenen Füllmedien. Falsche Viskosität kann zum Tropfen oder Verstopfen führen.`,
    category: "Produkte",
    readTime: "7 min",
    image: "https://images.unsplash.com/photo-1583947215259-38e31be8751f?w=800&h=400&fit=crop",
  },
];
