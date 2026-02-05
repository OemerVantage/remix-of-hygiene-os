import { Package, Truck } from "lucide-react";
import { ShopifyMetafield } from "@/lib/shopify";

// Mapping from metafield keys to German labels
const PROPERTY_LABELS: Record<string, string> = {
  gtin: "GTIN-Code (EAN)",
  sheet_size: "Abriss-/Tuchgrösse",
  dimensions: "Abmessungen",
  material: "Material",
  material_extra: "Material Extra",
  color: "Farbe",
  industries: "Branchen",
  system_group: "Systemgruppe",
  suitable_for: "Geeignet für",
  capacity: "Kapazität",
  lockable: "Abschließbar",
  view_window: "Sichtfenster",
};

const SHIPPING_LABELS: Record<string, string> = {
  unit_content: "Inhalt/Verkaufseinheit",
  packaging: "Verpackung",
  units_per_pallet: "VE/PAL",
};

interface ParsedDescription {
  description: string;
  properties: Array<{ key: string; value: string }>;
  shipping: Array<{ key: string; value: string }>;
}

function parseMetafields(metafields: Array<ShopifyMetafield | null> | undefined): {
  properties: Array<{ key: string; value: string }>;
  shipping: Array<{ key: string; value: string }>;
} {
  const properties: Array<{ key: string; value: string }> = [];
  const shipping: Array<{ key: string; value: string }> = [];

  if (!metafields) return { properties, shipping };

  for (const field of metafields) {
    if (!field || !field.value) continue;

    if (PROPERTY_LABELS[field.key]) {
      properties.push({ key: PROPERTY_LABELS[field.key], value: field.value });
    } else if (SHIPPING_LABELS[field.key]) {
      shipping.push({ key: SHIPPING_LABELS[field.key], value: field.value });
    }
  }

  return { properties, shipping };
}

function parseProductDescription(text: string): ParsedDescription {
  const result: ParsedDescription = {
    description: "",
    properties: [],
    shipping: [],
  };

  if (!text) return result;

  // Clean markdown bold markers for section detection
  const cleanText = text.replace(/\*\*/g, '');

  // Split by section headers (handles both plain and markdown-bolded headers)
  const propertiesMatch = cleanText.split(/Produkteigenschaften[:\s]*/i);
  const shippingMatch = cleanText.split(/Versandinformation(?:en)?[:\s]*/i);

  // Extract main description (before "Produkteigenschaften")
  if (propertiesMatch.length > 1) {
    result.description = propertiesMatch[0].trim();
  } else if (shippingMatch.length > 1) {
    result.description = shippingMatch[0].trim();
  } else {
    result.description = cleanText;
    return result;
  }

  // Extract properties section
  let propertiesText = "";
  if (propertiesMatch.length > 1) {
    const afterProperties = propertiesMatch[1];
    const shippingSplitInProperties = afterProperties.split(/Versandinformation(?:en)?[:\s]*/i);
    propertiesText = shippingSplitInProperties[0];
  }

  // Extract shipping section
  let shippingText = "";
  if (shippingMatch.length > 1) {
    shippingText = shippingMatch[shippingMatch.length - 1];
  }

  // Parse key-value pairs (format: "Key: Value" or "Key - Value")
  const parseKeyValuePairs = (text: string): Array<{ key: string; value: string }> => {
    const pairs: Array<{ key: string; value: string }> = [];
    // Split by newlines OR bullet points
    const lines = text.split(/\n|•\s*/g).map(l => l.trim()).filter(Boolean);
    
    for (let line of lines) {
      // Remove bullet points, dashes, asterisks and leading markers
      line = line.replace(/^[•\-\*\s]+/, '').trim();
      
      if (!line) continue;
      
      // Try "Key: Value" format first
      let match = line.match(/^([^:]+):\s*(.+)$/);
      if (match) {
        pairs.push({ key: match[1].trim(), value: match[2].trim() });
        continue;
      }
      // Try "Key - Value" format (but not if key contains parentheses)
      match = line.match(/^([^-]+)-\s*(.+)$/);
      if (match && !match[1].includes("(")) {
        pairs.push({ key: match[1].trim(), value: match[2].trim() });
      }
    }
    return pairs;
  };

  result.properties = parseKeyValuePairs(propertiesText);
  result.shipping = parseKeyValuePairs(shippingText);

  return result;
}

interface KeyValueSectionProps {
  title: string;
  icon: React.ReactNode;
  rows: Array<{ key: string; value: string }>;
}

function KeyValueSection({ title, icon, rows }: KeyValueSectionProps) {
  if (rows.length === 0) return null;

  return (
    <div className="border rounded-md overflow-hidden">
      <div className="bg-muted/80 px-4 py-3 flex items-center gap-2">
        {icon}
        <h3 className="font-semibold text-sm">{title}</h3>
      </div>
      <table className="w-full text-sm">
        <tbody>
          {rows.map((row, index) => (
            <tr 
              key={index} 
              className={index % 2 === 0 ? "bg-muted/30" : "bg-background"}
            >
              <td className="px-4 py-2.5 w-[45%] md:w-1/3 text-muted-foreground font-medium border-r border-border/50">
                {row.key}
              </td>
              <td className="px-4 py-2.5">
                {row.value}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

interface SelectedOption {
  name: string;
  value: string;
}

interface ProductDescriptionProps {
  description: string;
  metafields?: Array<ShopifyMetafield | null>;
  selectedOptions?: SelectedOption[];
}

// Clean legacy technical text from description when metafields provide structured data
function cleanDescriptionText(text: string): string {
  if (!text) return "";
  
  // Remove sections that start with "Produkteigenschaften" or "Versandinformation"
  let cleaned = text
    .replace(/\*?\*?Produkteigenschaften\*?\*?[\s\S]*?(?=\*?\*?Versandinformation|\s*$)/gi, '')
    .replace(/\*?\*?Versandinformation(?:en)?\*?\*?[\s\S]*/gi, '')
    .trim();
  
  return cleaned;
}

export function ProductDescription({ description, metafields, selectedOptions }: ProductDescriptionProps) {
  // Try metafields first
  const metafieldData = parseMetafields(metafields);
  const hasMetafieldData = metafieldData.properties.length > 0 || metafieldData.shipping.length > 0;

  // Fallback to text parsing if no metafields
  const parsed = hasMetafieldData 
    ? { description, properties: metafieldData.properties, shipping: metafieldData.shipping }
    : parseProductDescription(description);

  // Override color from selectedOptions if available
  const colorOption = selectedOptions?.find(opt => opt.name.toLowerCase() === "farbe");
  if (colorOption) {
    const colorIndex = parsed.properties.findIndex(p => p.key === "Farbe");
    if (colorIndex >= 0) {
      parsed.properties[colorIndex] = { key: "Farbe", value: colorOption.value };
    }
  }
  
  const hasProperties = parsed.properties.length > 0;
  const hasShipping = parsed.shipping.length > 0;
  const hasStructuredData = hasProperties || hasShipping;

  if (!hasStructuredData) {
    // Fallback to simple text display
    return (
      <p className="text-muted-foreground">{description}</p>
    );
  }

  // Determine grid columns based on available data
  const gridCols = hasProperties && hasShipping 
    ? "md:grid-cols-2" 
    : "";

  // For metafield data, clean the description to remove legacy structured text
  const displayDescription = hasMetafieldData 
    ? cleanDescriptionText(description) 
    : parsed.description;

  return (
    <div className="space-y-6">
      {displayDescription && (
        <p className="text-muted-foreground leading-relaxed">
          {displayDescription}
        </p>
      )}
      
      <div className={`grid gap-6 ${gridCols}`}>
        <KeyValueSection 
          title="Produkteigenschaften" 
          icon={<Package className="w-4 h-4 text-primary" />}
          rows={parsed.properties} 
        />
        <KeyValueSection 
          title="Versandinformationen" 
          icon={<Truck className="w-4 h-4 text-primary" />}
          rows={parsed.shipping} 
        />
      </div>
    </div>
  );
}
