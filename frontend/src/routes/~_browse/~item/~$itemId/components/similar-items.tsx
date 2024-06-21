import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import {
  ProductCard,
  ProductCardSkeleton,
} from "@/routes/~_browse/components/product-card";

import { ProductListItem } from "../types";

type SimilarItemsProps = {
  items: ProductListItem[];
};

export const SimilarItems = ({ items }: SimilarItemsProps) => {
  return (
    <div className="flex w-full flex-col gap-2 py-4">
      <h2 className="text-xl font-semibold">Similar Items</h2>
      <Carousel
        opts={{
          align: "center",
        }}
        className="w-full"
      >
        <CarouselContent>
          {items.map((item, i) => (
            <CarouselItem
              key={i}
              className="basis-2/3 sm:basis-2/5 lg:basis-1/4 xl:basis-1/5"
            >
              <ProductCard key={item.id} {...item} carousel={false} index={i} />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="-left-4 hidden md:flex" />
        <CarouselNext className="-right-4 hidden md:flex" />
      </Carousel>
    </div>
  );
};

export const SimilarItemsSkeleton = () => {
  return (
    <div className="flex w-full flex-col gap-2 py-4">
      <h2 className="text-xl font-semibold">Similar Items</h2>
      <div className="flex flex-row gap-4 overflow-hidden">
        <div className="flex-1">
          <ProductCardSkeleton />
        </div>
        <div className="flex-1">
          <ProductCardSkeleton />
        </div>
        <div className="flex-1">
          <ProductCardSkeleton />
        </div>
        <div className="flex-1">
          <ProductCardSkeleton />
        </div>
        <div className="flex-1">
          <ProductCardSkeleton />
        </div>
        <div className="flex-1">
          <ProductCardSkeleton />
        </div>
      </div>
    </div>
  );
};
