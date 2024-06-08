import { createFileRoute, defer } from "@tanstack/react-router";

import { ShoppingBag, ShoppingCart } from "lucide-react";

import { Container } from "@/components/container";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { ImageCarouselSkeleton } from "./components/image-carousel";
import { SimilarItemsSkeleton } from "./components/similar-items";

import { NotFoundBanner } from "./components/not-found-banner";
import { productDetailsOption, similarProductsQueryOption } from "./services";

export const Route = createFileRoute("/_browse/item/$itemId/")({
  loader: async ({ context, params }) => {
    const queryClient = context.queryClient;

    const productData = await queryClient.ensureQueryData(
      productDetailsOption(params.itemId),
    );
    const similarProducts = queryClient.ensureQueryData(
      similarProductsQueryOption(params.itemId),
    );

    return {
      productData,
      similarProducts: defer(similarProducts),
    };
  },
  pendingComponent: () => (
    <Container className="flex flex-col gap-2">
      <div className="grid gap-4 py-4 md:grid-cols-2">
        <ImageCarouselSkeleton />
        <div>
          <Card className="md:border-none md:bg-inherit md:shadow-none">
            <CardHeader className="md:pt-0">
              <Skeleton className="h-7 w-full lg:h-8" />
              <Skeleton className="h-5 w-full lg:w-20" />
              <Skeleton className="h-5 w-full lg:w-60" />
            </CardHeader>

            <CardContent className="flex flex-col gap-4 lg:gap-8">
              <Skeleton className="h-7 w-32 lg:h-9" />

              <div className="flex flex-row items-center gap-2">
                <Button disabled className="flex-1" variant="secondary">
                  Add to Cart <ShoppingCart className="ml-4 h-4 w-4" />
                </Button>
                <Button disabled className="flex-1">
                  Buy Now <ShoppingBag className="ml-4 h-4 w-4" />
                </Button>
              </div>
              <div>
                <h2 className="font-medium md:text-lg">Description</h2>
                <div className="flex flex-col gap-2">
                  <Skeleton className="h-5 w-full lg:h-6" />
                  <Skeleton className="h-5 w-full lg:h-6" />
                  <Skeleton className="h-5 w-full lg:h-6" />
                  <Skeleton className="h-5 w-full lg:h-6" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      <SimilarItemsSkeleton />
    </Container>
  ),
  errorComponent: NotFoundBanner,
});
