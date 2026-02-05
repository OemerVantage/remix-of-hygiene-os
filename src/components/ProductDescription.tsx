import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Info, Package, Truck } from "lucide-react";

interface ParsedDescription {
  description: string;
  properties: Array<{ key: string; value: string }>;
  shipping: Array<{ key: string; value: string }>;
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
  const shippingMatch = cleanText.split(/Versandinformationen[:\s]*/i);

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
    const shippingSplitInProperties = afterProperties.split(/Versandinformationen[:\s]*/i);
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
    // Split by newlines or bullet points
    const lines = text.split(/[\n]/).map(l => l.trim()).filter(Boolean);
    
    for (let line of lines) {
      // Remove bullet points and leading markers
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

interface ProductDescriptionProps {
  description: string;
}

export function ProductDescription({ description }: ProductDescriptionProps) {
  const parsed = parseProductDescription(description);
  
  const hasStructuredData = parsed.properties.length > 0 || parsed.shipping.length > 0;

  if (!hasStructuredData) {
    // Fallback to simple text display
    return (
      <p className="text-muted-foreground">{description}</p>
    );
  }

  return (
    <Tabs defaultValue="description" className="w-full">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="description" className="flex items-center gap-2">
          <Info className="w-4 h-4" />
          <span className="hidden sm:inline">Beschreibung</span>
        </TabsTrigger>
        <TabsTrigger value="properties" className="flex items-center gap-2">
          <Package className="w-4 h-4" />
          <span className="hidden sm:inline">Eigenschaften</span>
        </TabsTrigger>
        <TabsTrigger value="shipping" className="flex items-center gap-2">
          <Truck className="w-4 h-4" />
          <span className="hidden sm:inline">Versand</span>
        </TabsTrigger>
      </TabsList>
      
      <TabsContent value="description" className="mt-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <Info className="w-5 h-5 text-primary" />
              Beschreibung
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground leading-relaxed">
              {parsed.description || "Keine Beschreibung verfügbar."}
            </p>
          </CardContent>
        </Card>
      </TabsContent>
      
      <TabsContent value="properties" className="mt-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <Package className="w-5 h-5 text-primary" />
              Produkteigenschaften
            </CardTitle>
          </CardHeader>
          <CardContent>
            {parsed.properties.length > 0 ? (
              <Table>
                <TableBody>
                  {parsed.properties.map((prop, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium w-1/3">{prop.key}</TableCell>
                      <TableCell>{prop.value}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            ) : (
              <p className="text-muted-foreground">Keine Produkteigenschaften verfügbar.</p>
            )}
          </CardContent>
        </Card>
      </TabsContent>
      
      <TabsContent value="shipping" className="mt-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <Truck className="w-5 h-5 text-primary" />
              Versandinformationen
            </CardTitle>
          </CardHeader>
          <CardContent>
            {parsed.shipping.length > 0 ? (
              <Table>
                <TableBody>
                  {parsed.shipping.map((info, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium w-1/3">{info.key}</TableCell>
                      <TableCell>{info.value}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            ) : (
              <p className="text-muted-foreground">Keine Versandinformationen verfügbar.</p>
            )}
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
}
