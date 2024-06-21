import { Await, createLazyFileRoute } from "@tanstack/react-router";
import { Suspense } from "react";

import { Container } from "@/components/container";
import { ProductCard, ProductCardSkeleton } from "../components/product-card";
import { EmptyBanner } from "./components/empty-banner";
import { ProductsPagination } from "./components/pagination";
import { SearchForm } from "./components/search-form";
import { SortOrderForm } from "./components/sort-order-form";

export const Route = createLazyFileRoute("/_browse/search")({
  component: Search,
});

function Search() {
  const search = Route.useSearch();
  const { products } = Route.useLoaderData();

  return (
    <Container className="flex flex-row sm:justify-center">
      <div className="flex w-full flex-col gap-4 py-4 max-sm:w-full sm:max-w-[528px] md:max-w-[800px] lg:max-w-[1072px]">
        <SearchForm />
        <div className="flex w-full flex-row justify-between">
          <h1 className="text-lg font-normal tracking-tight">
            {search.q ? (
              <>
                Results for <span className="font-semibold">{search.q}</span>
              </>
            ) : (
              "All Products"
            )}
          </h1>
          <SortOrderForm />
        </div>
        <Suspense
          fallback={
            <div className="grid w-full grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 md:grid-cols-4 md:gap-y-10 lg:gap-x-8">
              <ProductCardSkeleton />
              <ProductCardSkeleton />
              <ProductCardSkeleton />
              <ProductCardSkeleton />
            </div>
          }
        >
          <Await promise={products}>
            {(products) =>
              products.data.length ? (
                <div className="grid w-full grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 md:grid-cols-4 md:gap-y-10 lg:gap-x-8">
                  {products.data.map((product, i) => (
                    <ProductCard key={product.id} {...product} index={i} />
                  ))}
                </div>
              ) : (
                <EmptyBanner />
              )
            }
          </Await>
        </Suspense>

        <Suspense>
          <Await promise={products}>
            {(data) => (
              <ProductsPagination links={data.links} meta={data.meta} />
            )}
          </Await>
        </Suspense>
      </div>
    </Container>
  );
}
