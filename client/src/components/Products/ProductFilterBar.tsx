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

export interface ProductFilters {
  search: string;
  type: string;
  category: string;
}

interface ProductFilterBarProps {
  filters: ProductFilters;
  onFiltersChange: (filters: ProductFilters) => void;
  onApplyFilters: () => void;
}

export function ProductFilterBar({
  filters,
  onFiltersChange,
  onApplyFilters,
}: ProductFilterBarProps) {
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

  const handleTypeChange = (value: string) => {
    onFiltersChange({ ...filters, type: value });
  };

  const handleCategoryChange = (value: string) => {
    onFiltersChange({ ...filters, category: value });
  };

  const handleClearFilters = () => {
    setLocalSearch("");
    onFiltersChange({ search: "", type: "all", category: "all" });
    onApplyFilters();
  };

  const hasActiveFilters =
    filters.search || filters.type !== "all" || filters.category !== "all";

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
            placeholder="Search products by name or description..."
            value={localSearch}
            onChange={(e) => handleSearchChange(e.target.value)}
            onKeyPress={handleKeyPress}
            className="pl-10"
          />
        </div>

        {/* Type Filter */}
        <Select value={filters.type} onValueChange={handleTypeChange}>
          <SelectTrigger className="w-full sm:w-[180px] bg-primary text-primary-foreground hover:bg-primary/90">
            <SelectValue placeholder="All Types" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            <SelectItem value="trending">Trending</SelectItem>
            <SelectItem value="new-arrivals">New Arrivals</SelectItem>
            <SelectItem value="imported">Imported</SelectItem>
            <SelectItem value="regular">Regular</SelectItem>
          </SelectContent>
        </Select>

        {/* Category Filter */}
        <Select value={filters.category} onValueChange={handleCategoryChange}>
          <SelectTrigger className="w-full sm:w-[180px] bg-primary text-primary-foreground hover:bg-primary/90">
            <SelectValue placeholder="All Categories" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            <SelectItem value="men">Men</SelectItem>
            <SelectItem value="women">Women</SelectItem>
            <SelectItem value="kid">Kids</SelectItem>
            <SelectItem value="electronics">Electronics</SelectItem>
            <SelectItem value="home">Home</SelectItem>
            <SelectItem value="sports">Sports</SelectItem>
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
          {filters.type !== "all" && (
            <span className="bg-green-100 text-green-800 px-2 py-1 rounded">
              Type: {filters.type}
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
