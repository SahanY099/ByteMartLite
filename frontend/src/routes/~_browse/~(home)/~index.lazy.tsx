import { useSuspenseQuery } from "@tanstack/react-query";
import { createLazyFileRoute } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";

import { Container } from "@/components/container";
import { Button } from "@/components/ui/button";
import { ProductCard } from "../components/product-card";

import { productsQueryOptions } from "./services";

export const Route = createLazyFileRoute("/_browse/(home)/")({
  component: Home,
});

function Home() {
  const products = useSuspenseQuery(productsQueryOptions);

  return (
    <Container className="flex flex-row sm:justify-center">
      <div className="flex w-full flex-col gap-2 py-4 max-sm:w-full sm:max-w-[528px] md:max-w-[800px] lg:max-w-[1072px]">
        <div className="flex w-full flex-row justify-between">
          <h1 className="text-lg font-semibold tracking-tight md:text-2xl">
            New Arrivals
          </h1>
          <Button size="sm" variant="ghost">
            View All <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
        <div className="grid w-full grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 md:grid-cols-4 md:gap-y-10 lg:gap-x-8">
          {products.data.map((product, i) => (
            <ProductCard key={product.id} {...product} index={i} />
          ))}
        </div>
      </div>
    </Container>
  );
}
