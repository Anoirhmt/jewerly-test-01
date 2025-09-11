import { ProductGrid } from "@/components/product-grid"
import { collectionProducts } from "@/data/collection-products"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"

const ITEMS_PER_PAGE = 9

export default async function ProductsPage({
  searchParams,
}: {
  searchParams?: { search?: string; page?: string }
}) {
  // Use collection-specific products list; filter for products that are in stock
  const products = collectionProducts.filter((p: any) => p.inStock && p.name && p.name.trim() !== "")
  const query = searchParams?.search?.toLowerCase() || ""
  const filtered = query ? products.filter((p: any) => p.name.toLowerCase().includes(query)) : products

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE)
  let currentPage = Number(searchParams?.page) || 1
  if (currentPage < 1 || currentPage > totalPages) currentPage = 1
  const start = (currentPage - 1) * ITEMS_PER_PAGE
  const paginated = filtered.slice(start, start + ITEMS_PER_PAGE)
  return (
    <section className="container mx-auto px-6 py-16">
      <header className="mb-16 text-center">
        <h1 className="text-5xl font-serif font-semibold uppercase tracking-wide mb-6 text-black">Our Collection</h1>

      </header>

      <div className="gap-12">
        <main className="flex-1">
          <ProductGrid products={paginated} />
        </main>
      </div>

      {totalPages > 1 && (
        <Pagination className="mt-12">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                href={`?${query ? `search=${encodeURIComponent(query)}&` : ""}page=${currentPage - 1}`}
                className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
              />
            </PaginationItem>

            {Array.from({ length: totalPages }).map((_, i) => {
              const pageNum = i + 1
              return (
                <PaginationItem key={pageNum}>
                  <PaginationLink
                    href={`?${query ? `search=${encodeURIComponent(query)}&` : ""}page=${pageNum}`}
                    isActive={pageNum === currentPage}
                  >
                    {pageNum}
                  </PaginationLink>
                </PaginationItem>
              )
            })}

            <PaginationItem>
              <PaginationNext
                href={`?${query ? `search=${encodeURIComponent(query)}&` : ""}page=${currentPage + 1}`}
                className={currentPage === totalPages ? "pointer-events-none opacity-50" : ""}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </section>
  )
}
