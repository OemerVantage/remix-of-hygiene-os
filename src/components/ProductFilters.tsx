import { useState, useEffect, useMemo } from "react";
import { Search, SlidersHorizontal, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronDown } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { ShopifyProduct } from "@/lib/shopify";
import { cn } from "@/lib/utils";

export interface FilterState {
  searchQuery: string;
  productTypes: string[];
  vendors: string[];
  priceRange: [number, number];
}

interface ProductFiltersProps {
  products: ShopifyProduct[];
  filters: FilterState;
  onFiltersChange: (filters: FilterState) => void;
  filteredCount: number;
}

export function ProductFilters({ products, filters, onFiltersChange, filteredCount }: ProductFiltersProps) {
  const isMobile = useIsMobile();
  const [isOpen, setIsOpen] = useState(false);
  const [localSearch, setLocalSearch] = useState(filters.searchQuery);

  // Debounce search
  useEffect(() => {
    const timer = setTimeout(() => {
      if (localSearch !== filters.searchQuery) {
        onFiltersChange({ ...filters, searchQuery: localSearch });
      }
    }, 300);
    return () => clearTimeout(timer);
  }, [localSearch]);

  // Sync local search with external changes
  useEffect(() => {
    setLocalSearch(filters.searchQuery);
  }, [filters.searchQuery]);

  // Extract available filter options from products
  const { productTypes, vendors, priceRange } = useMemo(() => {
    const types = new Set<string>();
    const vendorSet = new Set<string>();
    let minPrice = Infinity;
    let maxPrice = 0;

    products.forEach(({ node }) => {
      if (node.productType) types.add(node.productType);
      if (node.vendor) vendorSet.add(node.vendor);
      
      const price = parseFloat(node.priceRange.minVariantPrice.amount);
      if (price < minPrice) minPrice = price;
      if (price > maxPrice) maxPrice = price;
    });

    return {
      productTypes: Array.from(types).sort(),
      vendors: Array.from(vendorSet).sort(),
      priceRange: [minPrice === Infinity ? 0 : minPrice, maxPrice] as [number, number],
    };
  }, [products]);

  const activeFilterCount = 
    filters.productTypes.length + 
    filters.vendors.length + 
    (filters.priceRange[0] > priceRange[0] || filters.priceRange[1] < priceRange[1] ? 1 : 0);

  const handleReset = () => {
    onFiltersChange({
      searchQuery: "",
      productTypes: [],
      vendors: [],
      priceRange: priceRange,
    });
    setLocalSearch("");
  };

  const toggleProductType = (type: string) => {
    const newTypes = filters.productTypes.includes(type)
      ? filters.productTypes.filter(t => t !== type)
      : [...filters.productTypes, type];
    onFiltersChange({ ...filters, productTypes: newTypes });
  };

  const toggleVendor = (vendor: string) => {
    const newVendors = filters.vendors.includes(vendor)
      ? filters.vendors.filter(v => v !== vendor)
      : [...filters.vendors, vendor];
    onFiltersChange({ ...filters, vendors: newVendors });
  };

  const handlePriceChange = (value: number[]) => {
    onFiltersChange({ ...filters, priceRange: [value[0], value[1]] });
  };

  const FilterContent = () => (
    <div className="space-y-6">
      {/* Product Type Filter */}
      {productTypes.length > 0 && (
        <Collapsible defaultOpen>
          <CollapsibleTrigger className="flex items-center justify-between w-full py-2 font-medium text-foreground hover:text-primary transition-colors">
            <span>Produkttyp</span>
            <ChevronDown className="h-4 w-4 transition-transform duration-200 [&[data-state=open]]:rotate-180" />
          </CollapsibleTrigger>
          <CollapsibleContent className="pt-2 space-y-2">
            {productTypes.map((type) => (
              <div key={type} className="flex items-center space-x-2">
                <Checkbox
                  id={`type-${type}`}
                  checked={filters.productTypes.includes(type)}
                  onCheckedChange={() => toggleProductType(type)}
                />
                <Label 
                  htmlFor={`type-${type}`} 
                  className="text-sm cursor-pointer text-muted-foreground hover:text-foreground"
                >
                  {type}
                </Label>
              </div>
            ))}
          </CollapsibleContent>
        </Collapsible>
      )}

      {/* Vendor Filter */}
      {vendors.length > 0 && (
        <Collapsible defaultOpen>
          <CollapsibleTrigger className="flex items-center justify-between w-full py-2 font-medium text-foreground hover:text-primary transition-colors">
            <span>Hersteller</span>
            <ChevronDown className="h-4 w-4 transition-transform duration-200 [&[data-state=open]]:rotate-180" />
          </CollapsibleTrigger>
          <CollapsibleContent className="pt-2 space-y-2">
            {vendors.map((vendor) => (
              <div key={vendor} className="flex items-center space-x-2">
                <Checkbox
                  id={`vendor-${vendor}`}
                  checked={filters.vendors.includes(vendor)}
                  onCheckedChange={() => toggleVendor(vendor)}
                />
                <Label 
                  htmlFor={`vendor-${vendor}`} 
                  className="text-sm cursor-pointer text-muted-foreground hover:text-foreground"
                >
                  {vendor}
                </Label>
              </div>
            ))}
          </CollapsibleContent>
        </Collapsible>
      )}

      {/* Price Range Filter */}
      {priceRange[1] > 0 && (
        <Collapsible defaultOpen>
          <CollapsibleTrigger className="flex items-center justify-between w-full py-2 font-medium text-foreground hover:text-primary transition-colors">
            <span>Preis</span>
            <ChevronDown className="h-4 w-4 transition-transform duration-200 [&[data-state=open]]:rotate-180" />
          </CollapsibleTrigger>
          <CollapsibleContent className="pt-4 space-y-4">
            <Slider
              value={[filters.priceRange[0], filters.priceRange[1]]}
              min={priceRange[0]}
              max={priceRange[1]}
              step={1}
              onValueChange={handlePriceChange}
              className="w-full"
            />
            <div className="flex items-center justify-between text-sm text-muted-foreground">
              <span>CHF {filters.priceRange[0].toFixed(0)}</span>
              <span>CHF {filters.priceRange[1].toFixed(0)}</span>
            </div>
          </CollapsibleContent>
        </Collapsible>
      )}

      {/* Reset Button */}
      {(filters.searchQuery || activeFilterCount > 0) && (
        <Button 
          variant="outline" 
          onClick={handleReset}
          className="w-full"
        >
          <X className="h-4 w-4 mr-2" />
          Filter zurücksetzen
        </Button>
      )}
    </div>
  );

  // Search bar component used in both layouts
  const SearchBar = () => (
    <div className="relative">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
      <Input
        type="text"
        placeholder="Suche nach Produkt, Artikelnummer..."
        value={localSearch}
        onChange={(e) => setLocalSearch(e.target.value)}
        className="pl-10"
      />
    </div>
  );

  // Active filter badges
  const ActiveFilters = () => {
    if (activeFilterCount === 0) return null;

    return (
      <div className="flex flex-wrap gap-2 mt-4">
        {filters.productTypes.map((type) => (
          <Badge 
            key={type} 
            variant="secondary" 
            className="cursor-pointer hover:bg-destructive/20"
            onClick={() => toggleProductType(type)}
          >
            {type}
            <X className="h-3 w-3 ml-1" />
          </Badge>
        ))}
        {filters.vendors.map((vendor) => (
          <Badge 
            key={vendor} 
            variant="secondary" 
            className="cursor-pointer hover:bg-destructive/20"
            onClick={() => toggleVendor(vendor)}
          >
            {vendor}
            <X className="h-3 w-3 ml-1" />
          </Badge>
        ))}
        {(filters.priceRange[0] > priceRange[0] || filters.priceRange[1] < priceRange[1]) && (
          <Badge 
            variant="secondary" 
            className="cursor-pointer hover:bg-destructive/20"
            onClick={() => onFiltersChange({ ...filters, priceRange: priceRange })}
          >
            CHF {filters.priceRange[0]} - {filters.priceRange[1]}
            <X className="h-3 w-3 ml-1" />
          </Badge>
        )}
      </div>
    );
  };

  if (isMobile) {
    return (
      <div className="space-y-4">
        <SearchBar />
        <div className="flex items-center justify-between">
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" size="sm">
                <SlidersHorizontal className="h-4 w-4 mr-2" />
                Filter
                {activeFilterCount > 0 && (
                  <Badge variant="default" className="ml-2 h-5 w-5 p-0 flex items-center justify-center">
                    {activeFilterCount}
                  </Badge>
                )}
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-80">
              <SheetHeader>
                <SheetTitle>Filter</SheetTitle>
              </SheetHeader>
              <div className="mt-6">
                <FilterContent />
              </div>
            </SheetContent>
          </Sheet>
          <span className="text-sm text-muted-foreground">
            {filteredCount} {filteredCount === 1 ? "Produkt" : "Produkte"}
          </span>
        </div>
        <ActiveFilters />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <SearchBar />
      <ActiveFilters />
      <div className="border-t pt-6">
        <FilterContent />
      </div>
    </div>
  );
}
