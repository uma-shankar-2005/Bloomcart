"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProductCard } from "./product-card";
import { Product } from "@/lib/data/products";

interface ProductGridProps {
  products: Product[];
  currentPage: number;
  totalPages: number;
  totalCount: number;
}

export function ProductGrid({ 
  products = [], 
  currentPage = 1, 
  totalPages = 1, 
  totalCount = 0 
}: Partial<ProductGridProps>) {
  const [isAddingToCart, setIsAddingToCart] = useState<string | null>(null);
  const [isAddingToWishlist, setIsAddingToWishlist] = useState<string | null>(null);

  const handleAddToCart = async (productId: string) => {
    setIsAddingToCart(productId);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      // TODO: Implement actual cart functionality
      console.log("Added to cart:", productId);
    } catch (error) {
      console.error("Failed to add to cart:", error);
    } finally {
      setIsAddingToCart(null);
    }
  };

  const handleAddToWishlist = async (productId: string) => {
    setIsAddingToWishlist(productId);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      // TODO: Implement actual wishlist functionality
      console.log("Added to wishlist:", productId);
    } catch (error) {
      console.error("Failed to add to wishlist:", error);
    } finally {
      setIsAddingToWishlist(null);
    }
  };

  if (products.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-6xl mb-4">🌸</div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">
          No products found
        </h3>
        <p className="text-gray-600 mb-6">
          Try adjusting your filters or search terms to find what you're looking for.
        </p>
        <Button asChild>
          <Link href="/products">
            View All Products
          </Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onAddToCart={handleAddToCart}
            onAddToWishlist={handleAddToWishlist}
          />
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center space-x-2">
          {/* Previous Button */}
          <Button
            variant="outline"
            size="sm"
            disabled={currentPage === 1}
            asChild={currentPage > 1}
          >
            {currentPage > 1 ? (
              <Link href={`/products?page=${currentPage - 1}`}>
                <ChevronLeft className="h-4 w-4 mr-1" />
                Previous
              </Link>
            ) : (
              <>
                <ChevronLeft className="h-4 w-4 mr-1" />
                Previous
              </>
            )}
          </Button>

          {/* Page Numbers */}
          <div className="flex items-center space-x-1">
            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              let pageNum;
              if (totalPages <= 5) {
                pageNum = i + 1;
              } else if (currentPage <= 3) {
                pageNum = i + 1;
              } else if (currentPage >= totalPages - 2) {
                pageNum = totalPages - 4 + i;
              } else {
                pageNum = currentPage - 2 + i;
              }

              return (
                <Button
                  key={pageNum}
                  variant={currentPage === pageNum ? "default" : "outline"}
                  size="sm"
                  className="w-10 h-10 p-0"
                  asChild={currentPage !== pageNum}
                >
                  {currentPage !== pageNum ? (
                    <Link href={`/products?page=${pageNum}`}>
                      {pageNum}
                    </Link>
                  ) : (
                    <span>{pageNum}</span>
                  )}
                </Button>
              );
            })}
          </div>

          {/* Next Button */}
          <Button
            variant="outline"
            size="sm"
            disabled={currentPage === totalPages}
            asChild={currentPage < totalPages}
          >
            {currentPage < totalPages ? (
              <Link href={`/products?page=${currentPage + 1}`}>
                Next
                <ChevronRight className="h-4 w-4 ml-1" />
              </Link>
            ) : (
              <>
                Next
                <ChevronRight className="h-4 w-4 ml-1" />
              </>
            )}
          </Button>
        </div>
      )}

      {/* Results Summary */}
      <div className="text-center text-sm text-muted-foreground">
        Showing {((currentPage - 1) * 12) + 1} to {Math.min(currentPage * 12, totalCount)} of {totalCount} products
      </div>
    </div>
  );
}