import { useState, useEffect } from "react";
import { Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useIsMobile } from "@/hooks/use-mobile";

const CATEGORIES = [
  "Handtuchrollenspender",
  "Handtuchspender",
  "Toilettenpapierspender",
  "Seifenspender",
  "Handtuchrollen",
  "Falthandtücher",
  "Toilettenpapier",
  "Handseife",
  "Toilettenhygiene",
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
  const isMobile = useIsMobile();
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
    <div className="space-y-4">
      {/* Search */}
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

      {/* Category Chips */}
      <div className="flex flex-wrap gap-2">
        {CATEGORIES.map((category) => {
          const isActive = filters.categories.includes(category);
          return (
            <button
              key={category}
              onClick={() => toggleCategory(category)}
              className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-200 border ${
                isActive
                  ? "bg-primary text-primary-foreground border-primary"
                  : "bg-card text-muted-foreground border-border hover:border-primary/50 hover:text-foreground"
              }`}
            >
              {category}
            </button>
          );
        })}
      </div>

      {/* Active filters & count */}
      <div className="flex items-center justify-between">
        <span className="text-sm text-muted-foreground">
          {filteredCount} {filteredCount === 1 ? "Produkt" : "Produkte"} gefunden
        </span>
        {hasActiveFilters && (
          <Button variant="ghost" size="sm" onClick={handleReset}>
            <X className="h-4 w-4 mr-1" />
            Zurücksetzen
          </Button>
        )}
      </div>
    </div>
  );
}
