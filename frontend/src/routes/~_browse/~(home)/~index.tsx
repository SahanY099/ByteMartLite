import { createFileRoute } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";

import { Container } from "@/components/container";
import { Button } from "@/components/ui/button";
import { ProductCardSkeleton } from "../components/product-card";

import { productsQueryOptions } from "./services";

export const Route = createFileRoute("/_browse/(home)/")({
  loader: ({ context }) => {
    return context.queryClient.ensureQueryData(productsQueryOptions);
  },
  pendingComponent: () => (
    <Container className="flex flex-row sm:justify-center">
      <div className="flex flex-col gap-2 py-4 max-sm:w-full">
        <div className="flex w-full flex-row justify-between">
          <h1 className="text-lg font-semibold tracking-tight md:text-2xl">
            New Arrivals
          </h1>
          <Button size="sm" variant="ghost">
            View All <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
        <div className="grid grid-cols-1 gap-4 max-sm:mx-auto sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          <ProductCardSkeleton />
          <ProductCardSkeleton />
          <ProductCardSkeleton />
        </div>
      </div>
    </Container>
  ),
});
