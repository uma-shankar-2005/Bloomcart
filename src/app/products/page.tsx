import { Suspense } from "react";
import { Metadata } from "next";
import { ProductGrid } from "@/components/products/product-grid";
import { ProductFilters } from "@/components/products/product-filters";
import { ProductSearch } from "@/components/products/product-search";
import { getProducts, type ProductFilters as Filters } from "@/lib/data/products";

interface ProductsPageProps {
  searchParams: {
    type?: string;
    category?: string;
    occasion?: string;
    search?: string;
    minPrice?: string;
    maxPrice?: string;
    sortBy?: string;
    page?: string;
  };
}

function parseFilters(searchParams: ProductsPageProps['searchParams']): Filters {
  return {
    type: searchParams.type ? [searchParams.type] : undefined,
    category: searchParams.category ? [searchParams.category] : undefined,
    occasion: searchParams.occasion ? [searchParams.occasion] : undefined,
    search: searchParams.search,
    minPrice: searchParams.minPrice ? parseFloat(searchParams.minPrice) : undefined,
    maxPrice: searchParams.maxPrice ? parseFloat(searchParams.maxPrice) : undefined,
    sortBy: searchParams.sortBy,
    page: searchParams.page ? parseInt(searchParams.page) : 1,
  };
}

export async function generateMetadata({ searchParams }: ProductsPageProps): Promise<Metadata> {
  const params = await Promise.resolve(searchParams);
  const { type, category, search } = params;
  
  let title = "All Products";
  let description = "Browse our complete collection of fresh flowers, dried flowers, artificial flowers, and décor items.";

  if (type) {
    const typeLabels: Record<string, string> = {
      FRESH_FLOWERS: "Fresh Flowers",
      DRIED_FLOWERS: "Dried Flowers", 
      ARTIFICIAL_FLOWERS: "Artificial Flowers",
      DECOR_ITEMS: "Décor Items",
      EVENT_PACKAGES: "Event Packages",
      CUSTOM_BOUQUETS: "Custom Bouquets",
    };
    title = `${typeLabels[type] || type} - BloomCart`;
    description = `Shop ${typeLabels[type]?.toLowerCase() || type.toLowerCase()} online. Fresh, beautiful, and delivered to your doorstep.`;
  } else if (category) {
    title = `${category} - BloomCart`;
    description = `Browse our ${category.toLowerCase()} collection.`;
  } else if (search) {
    title = `Search Results for "${search}" - BloomCart`;
    description = `Find the perfect flowers and décor items for "${search}".`;
  }

  return {
    title,
    description,
    keywords: `${type || category || search}, flowers, bouquets, décor, online shopping, delivery`,
    openGraph: {
      title,
      description,
      type: "website",
    },
  };
}

export default async function ProductsPage({ searchParams }: ProductsPageProps) {
  // First await the searchParams
  const params = await Promise.resolve(searchParams);
  
  // Now we can safely access the properties
  const filters = {
    type: params.type ? [params.type] : undefined,
    category: params.category ? [params.category] : undefined,
    occasion: params.occasion ? [params.occasion] : undefined,
    search: params.search,
    minPrice: params.minPrice ? parseFloat(params.minPrice) : undefined,
    maxPrice: params.maxPrice ? parseFloat(params.maxPrice) : undefined,
    sortBy: params.sortBy,
    page: params.page ? parseInt(params.page, 10) : 1,
  };
  
  const result = await getProducts(filters);
  const { products, totalCount, totalPages } = result;
  
  // Destructure params for use in the template
  const { 
    type,
    search,
    category,
    occasion,
    minPrice,
    maxPrice
  } = params;
  const currentPage = params.page ? parseInt(params.page, 10) : 1;

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            {type ? (
              <>
                {type.replace(/_/g, " ").replace(/\b\w/g, (l: string) => l.toUpperCase())}
              </>
            ) : search ? (
              <>
                Search Results for "<span className="text-primary">{search}</span>"
              </>
            ) : (
              "All Products"
            )}
          </h1>
          <p className="text-lg text-gray-600">
            {totalCount} {totalCount === 1 ? "product" : "products"} found
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters */}
          <aside className="lg:w-80 flex-shrink-0">
            <div className="sticky top-24">
              <ProductFilters
                currentFilters={{
                  type,
                  category,
                  occasion,
                  minPrice,
                  maxPrice,
                }}
              />
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1">
            {/* Search and Sort */}
            <div className="mb-6">
              <ProductSearch currentSearch={search} />
            </div>

            {/* Products Grid */}
            <Suspense fallback={<ProductGridSkeleton />}>
              <ProductGrid
                products={products}
                currentPage={currentPage}
                totalPages={totalPages}
                totalCount={totalCount}
              />
            </Suspense>
          </main>
        </div>
      </div>
    </div>
  );
}

function ProductGridSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {Array.from({ length: 8 }).map((_, i) => (
        <div key={i} className="animate-pulse">
          <div className="bg-gray-200 aspect-square rounded-lg mb-4"></div>
          <div className="space-y-2">
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            <div className="h-6 bg-gray-200 rounded w-1/3"></div>
          </div>
        </div>
      ))}
    </div>
  );
}