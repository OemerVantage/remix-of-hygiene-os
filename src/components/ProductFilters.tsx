import { useState, useEffect } from "react";
import { Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

const FILTER_GROUPS = [
  {
    label: "Spendertyp",
    items: ["Handtuchrollenspender", "Handtuchspender", "Toilettenpapierspender", "Seifenspender"],
  },
  {
    label: "Verbrauchsmaterial",
    items: ["Handtuchrollen", "Falthandtücher", "Toilettenpapier", "Handseife"],
  },
  {
    label: "Sonstiges",
    items: ["Toilettenhygiene"],
  },
];

export interface FilterState {
  searchQuery: string;
  categories: string[];
}

interface ProductFiltersProps {
  filters: FilterState;
  onFiltersChange: (filters: FilterState) => void;
  filteredCount: number;
}

export function ProductFilters({ filters, onFiltersChange, filteredCount }: ProductFiltersProps) {
  const [localSearch, setLocalSearch] = useState(filters.searchQuery);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (localSearch !== filters.searchQuery) {
        onFiltersChange({ ...filters, searchQuery: localSearch });
      }
    }, 300);
    return () => clearTimeout(timer);
  }, [localSearch]);

  useEffect(() => {
    setLocalSearch(filters.searchQuery);
  }, [filters.searchQuery]);

  const toggleCategory = (category: string) => {
    const newCategories = filters.categories.includes(category)
      ? filters.categories.filter(c => c !== category)
      : [...filters.categories, category];
    onFiltersChange({ ...filters, categories: newCategories });
  };

  const handleReset = () => {
    onFiltersChange({ searchQuery: "", categories: [] });
    setLocalSearch("");
  };

  const hasActiveFilters = filters.searchQuery || filters.categories.length > 0;

  return (
    <div className="space-y-6">
      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
        <Input
          type="text"
          placeholder="Produkt suchen..."
          value={localSearch}
          onChange={(e) => setLocalSearch(e.target.value)}
          className="pl-9 text-sm"
        />
      </div>

      {/* Grouped Categories */}
      {FILTER_GROUPS.map((group) => (
        <div key={group.label} className="space-y-2">
          <h4 className="text-sm font-semibold text-foreground">{group.label}</h4>
          <div className="space-y-1.5">
            {group.items.map((item) => {
              const isActive = filters.categories.includes(item);
              return (
                <label
                  key={item}
                  className="flex items-center gap-2 cursor-pointer text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Checkbox
                    checked={isActive}
                    onCheckedChange={() => toggleCategory(item)}
                  />
                  {item}
                </label>
              );
            })}
          </div>
        </div>
      ))}

      {/* Count & Reset */}
      <div className="pt-2 border-t border-border space-y-2">
        <span className="text-xs text-muted-foreground block">
          {filteredCount} {filteredCount === 1 ? "Produkt" : "Produkte"} gefunden
        </span>
        {hasActiveFilters && (
          <Button variant="ghost" size="sm" onClick={handleReset} className="w-full justify-start text-xs">
            <X className="h-3 w-3 mr-1" />
            Zurücksetzen
          </Button>
        )}
      </div>
    </div>
  );
}
