import { Heart, ShoppingCart } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselDots,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

type ProductCardProps = {
  id: number;
  name: string;
  price: string;
  images: string[];
};

export const ProductCard = ({  name, price, images }: ProductCardProps) => {
  return (
    <Card className="max-w-64">
      <CardContent className="p-4">
        <Carousel className="group relative w-full" opts={{ loop: true }}>
          <CarouselContent>
            {images.map((image, index) => (
              <CarouselItem key={index}>
                <img
                  className="aspect-[4/3] rounded-xl object-cover"
                  src={image}
                />
              </CarouselItem>
            ))}
          </CarouselContent>
          {images.length > 1 && (
            <>
              <CarouselPrevious className="absolute left-0.5 hidden opacity-0 transition-opacity ease-out group-hover:opacity-100 md:flex" />
              <CarouselNext className="absolute right-0.5 hidden opacity-0 transition-opacity ease-out group-hover:opacity-100 md:flex" />
              <CarouselDots className="absolute bottom-4 left-1/2 -translate-x-1/2" />
            </>
          )}
        </Carousel>
      </CardContent>
      <CardHeader>
        <CardTitle>{name}</CardTitle>
        <CardDescription>$ {price}</CardDescription>
      </CardHeader>
      <CardFooter className="flex flex-row justify-end gap-2">
        <Button size="icon" variant="ghost">
          <Heart className="h-4 w-4" />
        </Button>
        <Button size="icon" variant="ghost">
          <ShoppingCart className="h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
};

export const ProductCardSkeleton = () => {
  return (
    <Card className="w-[254px]">
      <CardContent className="w-full p-4">
        <div className="aspect-[4/3] w-full animate-pulse rounded-xl bg-secondary"></div>
      </CardContent>
      <CardHeader>
        <CardTitle>
          <div className="h-6 w-full animate-pulse rounded bg-secondary"></div>
        </CardTitle>
        <CardDescription>
          <div className="h-5 w-20 animate-pulse rounded bg-secondary"></div>
        </CardDescription>
      </CardHeader>
      <CardFooter className="flex flex-row justify-end gap-2">
        <div className="h-7 w-7 animate-pulse rounded bg-secondary"></div>
        <div className="h-7 w-7 animate-pulse rounded bg-secondary"></div>
      </CardFooter>
    </Card>
  );
};
