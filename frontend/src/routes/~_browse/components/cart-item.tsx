import { Minus, Plus } from "lucide-react";

import placeholderImage from "@/assets/placeholder.svg";
import { Button } from "@/components/ui/button";
import { Card, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

import { useDebouncedAddToCart, useDebouncedRemoveFromCart } from "@/lib/cart";

type CartItemProps = {
  productId: number;
  image: string;
  name: string;
  total: number;
  quantity: number;
};

export const CartItem = ({
  productId,
  image,
  name,
  total,
  quantity,
}: CartItemProps) => {
  const incrementQuantity = useDebouncedAddToCart(productId);
  const decrementQuantity = useDebouncedRemoveFromCart(productId);

  return (
    <Card className="flex min-h-32 flex-row gap-8 overflow-hidden p-4 shadow-none">
      <img
        src={image ?? placeholderImage}
        className="aspect-square h-24 w-24 rounded-lg object-cover"
      />
      <div className="flex flex-col justify-between">
        <CardHeader className="p-0">
          <CardTitle>{name}</CardTitle>
          <span className="text-sm text-muted-foreground">$ {total}</span>
        </CardHeader>
        <CardFooter className="flex h-full flex-row gap-4 p-0">
          <Button
            size="icon"
            className="h-5 w-5 rounded-full"
            onClick={() => decrementQuantity()}
          >
            <Minus className="h-4 w-4" />
          </Button>
          <p className="text-center text-sm font-semibold">{quantity}</p>
          <Button
            size="icon"
            className="h-5 w-5 rounded-full"
            onClick={() => incrementQuantity()}
          >
            <Plus className="h-4 w-4" />
          </Button>
        </CardFooter>
      </div>
    </Card>
  );
};
