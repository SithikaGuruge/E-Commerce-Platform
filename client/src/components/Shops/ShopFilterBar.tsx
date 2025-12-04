import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, X } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { ShopCategory } from "@/types";

export interface ShopFilters {
  search: string;
  category: string;
}

interface ShopFilterBarProps {
  filters: ShopFilters;
  onFiltersChange: (filters: ShopFilters) => void;
  onApplyFilters: () => void;
}

export function ShopFilterBar({
  filters,
  onFiltersChange,
  onApplyFilters,
}: ShopFilterBarProps) {
  const [localSearch, setLocalSearch] = useState(filters.search);
  const debounceTimeoutRef = useRef<number | null>(null);

  useEffect(() => {
    // Clear existing timeout
    if (debounceTimeoutRef.current) {
      clearTimeout(debounceTimeoutRef.current);
    }

    // Set new timeout for debounced search
    debounceTimeoutRef.current = setTimeout(() => {
      if (localSearch !== filters.search) {
        onFiltersChange({ ...filters, search: localSearch });
      }
    }, 500);

    // Cleanup on unmount
    return () => {
      if (debounceTimeoutRef.current) {
        clearTimeout(debounceTimeoutRef.current);
      }
    };
  }, [localSearch]);

  const handleSearchChange = (value: string) => {
    setLocalSearch(value);
  };

  const handleCategoryChange = (value: string) => {
    onFiltersChange({ ...filters, category: value });
  };

  const handleClearFilters = () => {
    setLocalSearch("");
    onFiltersChange({ search: "", category: "all" });
    onApplyFilters();
  };

  const hasActiveFilters = filters.search || filters.category !== "all";

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      onApplyFilters();
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-4">
        {/* Search Input */}
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder="Search shops by name or description..."
            value={localSearch}
            onChange={(e) => handleSearchChange(e.target.value)}
            onKeyPress={handleKeyPress}
            className="pl-10"
          />
        </div>

        {/* Category Filter */}
        <Select value={filters.category} onValueChange={handleCategoryChange}>
          <SelectTrigger className="w-full sm:w-[180px] bg-primary text-primary-foreground hover:bg-primary/90">
            <SelectValue placeholder="All Categories" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            <SelectItem value={ShopCategory.ELECTRONICS}>
              Electronics
            </SelectItem>
            <SelectItem value={ShopCategory.FASHION}>Fashion</SelectItem>
            <SelectItem value={ShopCategory.HOME_GARDEN}>
              Home & Garden
            </SelectItem>
            <SelectItem value={ShopCategory.SPORTS}>Sports</SelectItem>
            <SelectItem value={ShopCategory.BOOKS}>Books</SelectItem>
            <SelectItem value={ShopCategory.TOYS}>Toys</SelectItem>
            <SelectItem value={ShopCategory.FOOD}>Food</SelectItem>
            <SelectItem value={ShopCategory.HEALTH}>Health</SelectItem>
            <SelectItem value={ShopCategory.BEAUTY}>Beauty</SelectItem>
            <SelectItem value={ShopCategory.OTHER}>Other</SelectItem>
          </SelectContent>
        </Select>

        {/* Apply & Clear Buttons */}
        <div className="flex gap-2">
          <Button onClick={onApplyFilters} className="flex-1 sm:flex-initial">
            <Search className="w-4 h-4 mr-2" />
            Search
          </Button>
          {hasActiveFilters && (
            <Button
              onClick={handleClearFilters}
              className="flex-1 sm:flex-initial"
            >
              <X className="w-4 h-4 mr-2" />
              Clear
            </Button>
          )}
        </div>
      </div>

      {/* Active Filters Summary */}
      {hasActiveFilters && (
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <span>Active filters:</span>
          {filters.search && (
            <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded">
              Search: "{filters.search}"
            </span>
          )}
          {filters.category !== "all" && (
            <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded">
              Category: {filters.category}
            </span>
          )}
        </div>
      )}
    </div>
  );
}
