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
      <div className="flex w-full flex-col gap-2 py-4 max-sm:w-full sm:max-w-[528px] md:max-w-[800px] lg:max-w-[1072px]">
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
            <div className="mx-auto grid auto-cols-max grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              <ProductCardSkeleton />
              <ProductCardSkeleton />
              <ProductCardSkeleton />
            </div>
          }
        >
          <Await promise={products}>
            {(products) =>
              products.data.length ? (
                <div className="mx-auto grid auto-cols-max grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                  {products.data.map((product) => (
                    <ProductCard key={product.id} {...product} />
                  ))}
                </div>
              ) : (
                <EmptyBanner />
              )
            }
          </Await>
        </Suspense>
        {/* </div> */}
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
