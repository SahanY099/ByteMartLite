import { Link } from "@tanstack/react-router";
import { ShoppingCart } from "lucide-react";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { CardDescription } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { ProductImages } from "./product-images";

import { useDebouncedAddToCart } from "@/lib/cart";

type CarouselProps = {
  carousel?: true;
  images: string[];
};

type SingleImageProps = {
  carousel: false;
  image: string;
};

type ProductCardProps = {
  id: number;
  name: string;
  price: string;
  index: number;
} & (CarouselProps | SingleImageProps);

export const ProductCard = ({
  id,
  name,
  price,
  index,
  ...props
}: ProductCardProps) => {
  const incrementQuantity = useDebouncedAddToCart(id);

  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, index * 100);

    return () => clearTimeout(timer);
  }, [index]);

  if (!id || !isVisible) return <ProductCardSkeleton />;

  return (
    <div className="flex w-full flex-col animate-in fade-in-5">
      <ProductImages {...props} productId={id} />

      <div className="relative">
        <Link to="/item/$itemId" params={{ itemId: id.toString() }}>
          <h3 className="mt-4 text-sm font-medium text-primary">{name}</h3>
          <CardDescription>$ {price}</CardDescription>
        </Link>

        <Button
          size="icon"
          variant="ghost"
          className="absolute bottom-0 right-0"
        >
          <ShoppingCart
            className="h-4 w-4"
            onClick={() => incrementQuantity()}
          />
        </Button>
      </div>
    </div>
  );
};

export const ProductCardSkeleton = () => {
  return (
    <div className="flex w-full flex-col">
      <div className="pb-2">
        <div className="aspect-square w-full overflow-hidden rounded-xl bg-zinc-100"></div>
      </div>

      <div className="flex flex-row items-end justify-between">
        <div className="mt-4 flex flex-col gap-2">
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-4 w-20" />
        </div>
        <Skeleton className="h-9 w-9" />
      </div>
    </div>
  );
};
