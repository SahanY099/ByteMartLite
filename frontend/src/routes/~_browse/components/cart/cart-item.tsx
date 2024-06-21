import placeholderImage from "@/assets/placeholder.svg";
import { Card, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

import { CartItemQuantity } from "./cart-item-quantity";

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
  return (
    <Card className="flex min-h-32 flex-row gap-8 overflow-hidden p-4 shadow-none">
      <img
        src={image ?? placeholderImage}
        className="aspect-square h-24 w-24 rounded-lg object-cover"
      />
      <div className="flex flex-col items-start justify-between">
        <CardHeader className="p-0">
          <CardTitle>{name}</CardTitle>
          <span className="text-sm text-muted-foreground">$ {total}</span>
        </CardHeader>
        <CardFooter className="flex flex-row gap-4 p-0">
          <CartItemQuantity productId={productId} quantity={quantity} />
        </CardFooter>
      </div>
    </Card>
  );
};
