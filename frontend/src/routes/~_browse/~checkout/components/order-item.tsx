import { Link } from "@tanstack/react-router";

import { Badge } from "@/components/ui/badge";
import { CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

type OrderItemProps = {
  productId: number;
  image: string;
  name: string;
  total: string;
  quantity: number;
};

export const OrderItem = ({
  productId,
  image,
  name,
  total,
  quantity,
}: OrderItemProps) => {
  return (
    <div className="flex flex-row gap-6">
      <img
        src={image}
        className="aspect-square h-24 w-24 rounded-lg object-cover"
      />

      <div className="flex flex-1 flex-col">
        <div className="flex flex-row items-center gap-2">
          <CardTitle>
            <Link to="/item/$itemId" params={{ itemId: productId.toString() }}>
              {name}
            </Link>
          </CardTitle>
          <Badge variant="outline">X {quantity}</Badge>
        </div>
        <span className="text-base font-medium text-muted-foreground">
          $ {total}
        </span>
      </div>
    </div>
  );
};

export const OrderItemSkeleton = () => {
  return (
    <div className="flex flex-row gap-6">
      <Skeleton className="aspect-square h-24 w-24" />
      <div className="flex flex-1 flex-col gap-2">
        <div className="flex flex-row items-center gap-2">
          <Skeleton className="h-5 w-full max-w-44" />
          <Skeleton className="h-5 w-12" />
        </div>
        <Skeleton className="h-6 w-20" />
      </div>
    </div>
  );
};
