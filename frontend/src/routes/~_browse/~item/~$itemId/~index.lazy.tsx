import { Await, Link, createLazyFileRoute } from "@tanstack/react-router";
import { ShoppingBag, ShoppingCart, Star } from "lucide-react";
import { Suspense } from "react";

import { Container } from "@/components/container";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ImageCarousel } from "./components/image-carousel";
import { SimilarItems, SimilarItemsSkeleton } from "./components/similar-items";

import { useDebouncedAddToCart } from "@/lib/cart";

export const Route = createLazyFileRoute("/_browse/item/$itemId/")({
  component: ProductDetails,
});

function ProductDetails() {
  const { productData, similarProducts } = Route.useLoaderData();

  const { add: addToCart } = useDebouncedAddToCart(productData.id);

  return (
    <Container className="flex flex-col gap-2">
      <div className="grid gap-4 py-4 md:grid-cols-2">
        <ImageCarousel images={productData.images} />
        <div>
          <Card className="md:border-none md:bg-inherit md:shadow-none">
            <CardHeader className="md:pt-0">
              <div>
                <div className="flex flex-row items-center gap-2">
                  <CardTitle className="text-xl lg:text-2xl">
                    {productData.name}
                  </CardTitle>
                  <Badge>New</Badge>
                </div>

                <Link className="-mt-1 block text-sm text-muted-foreground">
                  {productData.category.name}
                </Link>
              </div>

              <div className="flex h-5 items-center space-x-4 text-sm">
                <div className="flex flex-row items-center gap-2">
                  <Star className="inline-block h-4 w-4 fill-primary text-primary" />
                  <span className="text-sm font-medium tracking-tight">
                    (4.9)
                  </span>
                </div>
                <Separator orientation="vertical" />
                <span className="text-sm font-medium tracking-tight">
                  9,2K Reviews
                </span>
                <Separator orientation="vertical" />
                <span className="text-sm font-medium tracking-tight">
                  10K Sold Out
                </span>
              </div>
            </CardHeader>

            <CardContent className="flex flex-col gap-4 lg:gap-8">
              <span className="text-xl font-semibold tracking-tighter lg:text-3xl">
                $ {productData.price}
              </span>
              <div className="flex flex-row items-center gap-2">
                <Button
                  className="flex-1"
                  variant="secondary"
                  onClick={() => addToCart()}
                >
                  Add to Cart <ShoppingCart className="ml-4 h-4 w-4" />
                </Button>
                <Button className="flex-1">
                  Buy Now <ShoppingBag className="ml-4 h-4 w-4" />
                </Button>
              </div>
              <div>
                <h2 className="font-medium md:text-lg">Description</h2>
                <CardDescription className="md:text-base">
                  {productData.description}
                </CardDescription>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      <Suspense fallback={<SimilarItemsSkeleton />}>
        <Await promise={similarProducts}>
          {(similarProducts) =>
            similarProducts.length && <SimilarItems items={similarProducts} />
          }
        </Await>
      </Suspense>
    </Container>
  );
}
