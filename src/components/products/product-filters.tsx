"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronDown, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Slider } from "@/components/ui/slider";

interface ProductFiltersProps {
  currentFilters: {
    type?: string;
    category?: string;
    occasion?: string;
    minPrice?: string;
    maxPrice?: string;
  };
}

const productTypes = [
  { value: "FRESH_FLOWERS", label: "Fresh Flowers", count: 45 },
  { value: "DRIED_FLOWERS", label: "Dried Flowers", count: 23 },
  { value: "ARTIFICIAL_FLOWERS", label: "Artificial Flowers", count: 34 },
  { value: "DECOR_ITEMS", label: "Décor Items", count: 67 },
  { value: "EVENT_PACKAGES", label: "Event Packages", count: 12 },
  { value: "CUSTOM_BOUQUETS", label: "Custom Bouquets", count: 8 },
];

const categories = [
  { value: "Roses", label: "Roses", count: 23 },
  { value: "Mixed Bouquets", label: "Mixed Bouquets", count: 18 },
  { value: "Sunflowers", label: "Sunflowers", count: 12 },
  { value: "Dried Herbs", label: "Dried Herbs", count: 15 },
  { value: "Artificial Roses", label: "Artificial Roses", count: 8 },
  { value: "Vases", label: "Vases", count: 25 },
  { value: "Wedding Packages", label: "Wedding Packages", count: 5 },
  { value: "Custom Arrangements", label: "Custom Arrangements", count: 10 },
];

const occasions = [
  { value: "Birthday", label: "Birthday", count: 45 },
  { value: "Anniversary", label: "Anniversary", count: 38 },
  { value: "Valentine's Day", label: "Valentine's Day", count: 23 },
  { value: "Wedding", label: "Wedding", count: 34 },
  { value: "Mother's Day", label: "Mother's Day", count: 28 },
  { value: "Get Well Soon", label: "Get Well Soon", count: 15 },
  { value: "Congratulations", label: "Congratulations", count: 20 },
  { value: "Home Décor", label: "Home Décor", count: 42 },
  { value: "Romance", label: "Romance", count: 18 },
];

export function ProductFilters({ currentFilters }: ProductFiltersProps) {
  const [priceRange, setPriceRange] = useState([0, 20000]);

  const buildFilterUrl = (newFilters: Record<string, string | undefined>) => {
    const params = new URLSearchParams();
    
    Object.entries({ ...currentFilters, ...newFilters }).forEach(([key, value]) => {
      if (value) {
        params.set(key, value);
      }
    });

    return `/products?${params.toString()}`;
  };

  const clearFilter = (filterKey: string) => {
    const newFilters = { ...currentFilters };
    delete newFilters[filterKey as keyof typeof newFilters];
    
    const params = new URLSearchParams();
    Object.entries(newFilters).forEach(([key, value]) => {
      if (value) {
        params.set(key, value);
      }
    });

    return `/products?${params.toString()}`;
  };

  const clearAllFilters = () => {
    return "/products";
  };

  const hasActiveFilters = Object.values(currentFilters).some(value => value);

  return (
    <div className="space-y-6">
      {/* Active Filters */}
      {hasActiveFilters && (
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium">Active Filters</CardTitle>
              <Button variant="ghost" size="sm" asChild>
                <Link href={clearAllFilters()}>
                  Clear All
                </Link>
              </Button>
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="flex flex-wrap gap-2">
              {currentFilters.type && (
                <Badge variant="secondary" className="flex items-center gap-1">
                  Type: {productTypes.find(t => t.value === currentFilters.type)?.label}
                  <Link href={clearFilter("type")}>
                    <X className="h-3 w-3" />
                  </Link>
                </Badge>
              )}
              {currentFilters.category && (
                <Badge variant="secondary" className="flex items-center gap-1">
                  Category: {currentFilters.category}
                  <Link href={clearFilter("category")}>
                    <X className="h-3 w-3" />
                  </Link>
                </Badge>
              )}
              {currentFilters.occasion && (
                <Badge variant="secondary" className="flex items-center gap-1">
                  Occasion: {currentFilters.occasion}
                  <Link href={clearFilter("occasion")}>
                    <X className="h-3 w-3" />
                  </Link>
                </Badge>
              )}
              {(currentFilters.minPrice || currentFilters.maxPrice) && (
                <Badge variant="secondary" className="flex items-center gap-1">
                  Price: ₹{currentFilters.minPrice || 0} - ₹{currentFilters.maxPrice || "∞"}
                  <Link href={clearFilter("minPrice")}>
                    <X className="h-3 w-3" />
                  </Link>
                </Badge>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Product Type Filter */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-medium">Product Type</CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="space-y-2">
            {productTypes.map((type) => (
              <Link
                key={type.value}
                href={buildFilterUrl({ type: type.value })}
                className={`flex items-center justify-between p-2 rounded-md hover:bg-muted transition-colors ${
                  currentFilters.type === type.value ? "bg-primary/10 text-primary" : ""
                }`}
              >
                <span className="text-sm">{type.label}</span>
                <Badge variant="outline" className="text-xs">
                  {type.count}
                </Badge>
              </Link>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Category Filter */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-medium">Category</CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="space-y-2">
            {categories.map((category) => (
              <Link
                key={category.value}
                href={buildFilterUrl({ category: category.value })}
                className={`flex items-center justify-between p-2 rounded-md hover:bg-muted transition-colors ${
                  currentFilters.category === category.value ? "bg-primary/10 text-primary" : ""
                }`}
              >
                <span className="text-sm">{category.label}</span>
                <Badge variant="outline" className="text-xs">
                  {category.count}
                </Badge>
              </Link>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Occasion Filter */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-medium">Occasion</CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="space-y-2">
            {occasions.map((occasion) => (
              <Link
                key={occasion.value}
                href={buildFilterUrl({ occasion: occasion.value })}
                className={`flex items-center justify-between p-2 rounded-md hover:bg-muted transition-colors ${
                  currentFilters.occasion === occasion.value ? "bg-primary/10 text-primary" : ""
                }`}
              >
                <span className="text-sm">{occasion.label}</span>
                <Badge variant="outline" className="text-xs">
                  {occasion.count}
                </Badge>
              </Link>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Price Range Filter */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-medium">Price Range</CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="space-y-4">
            <Slider
              value={priceRange}
              onValueChange={setPriceRange}
              max={20000}
              min={0}
              step={100}
              className="w-full"
            />
            <div className="flex items-center justify-between text-sm text-muted-foreground">
              <span>₹{priceRange[0].toLocaleString()}</span>
              <span>₹{priceRange[1].toLocaleString()}</span>
            </div>
            <Button
              size="sm"
              className="w-full"
              asChild
            >
              <Link href={buildFilterUrl({ 
                minPrice: priceRange[0].toString(), 
                maxPrice: priceRange[1].toString() 
              })}>
                Apply Price Filter
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}