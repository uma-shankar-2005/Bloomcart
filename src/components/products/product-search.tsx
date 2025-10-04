"use client";

import { useState, useTransition } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Search, Filter, SortAsc } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface ProductSearchProps {
  currentSearch?: string;
}

export function ProductSearch({ currentSearch }: ProductSearchProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();
  const [searchQuery, setSearchQuery] = useState(currentSearch || "");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    startTransition(() => {
      const params = new URLSearchParams(searchParams);
      if (searchQuery.trim()) {
        params.set("search", searchQuery.trim());
      } else {
        params.delete("search");
      }
      params.delete("page"); // Reset to first page
      router.push(`/products?${params.toString()}`);
    });
  };

  const handleSortChange = (value: string) => {
    startTransition(() => {
      const params = new URLSearchParams(searchParams);
      params.set("sortBy", value);
      params.delete("page"); // Reset to first page
      router.push(`/products?${params.toString()}`);
    });
  };

  const currentSort = searchParams.get("sortBy") || "featured";

  return (
    <div className="flex flex-col sm:flex-row gap-4 items-center">
      {/* Search Input */}
      <form onSubmit={handleSearch} className="flex-1 relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search flowers, bouquets, décor..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10 pr-4"
          disabled={isPending}
        />
      </form>

      {/* Sort Dropdown */}
      <div className="flex items-center gap-2">
        <SortAsc className="h-4 w-4 text-muted-foreground" />
        <Select value={currentSort} onValueChange={handleSortChange} disabled={isPending}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="featured">Featured</SelectItem>
            <SelectItem value="price-low">Price: Low to High</SelectItem>
            <SelectItem value="price-high">Price: High to Low</SelectItem>
            <SelectItem value="rating">Highest Rated</SelectItem>
            <SelectItem value="newest">Newest First</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Mobile Filter Button */}
      <Button variant="outline" className="sm:hidden">
        <Filter className="h-4 w-4 mr-2" />
        Filters
      </Button>
    </div>
  );
}