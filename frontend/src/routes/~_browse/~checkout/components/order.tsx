import { Await, getRouteApi } from "@tanstack/react-router";
import { Fragment, Suspense } from "react";

import { LogoIcon } from "@/components/logo-icon";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { OrderItem, OrderItemSkeleton } from "./order-item";

const routeApi = getRouteApi("/_browse/checkout");

const OrderSkeleton = () => {
  return (
    <Card className="w-full lg:order-2">
      <CardHeader>
        <CardTitle>Your Order</CardTitle>
      </CardHeader>
      <Separator className="mb-6" />
      <CardContent>
        <div className="grid flex-1 grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-1">
          <OrderItemSkeleton />
          <Separator className="sm:hidden lg:block" />
          <OrderItemSkeleton />
          <Separator className="sm:hidden lg:block" />
          <OrderItemSkeleton />
        </div>
      </CardContent>
      <Separator className="mb-6" />

      <CardFooter className="grid grid-cols-2">
        <span className="text-lg font-normal tracking-tight">Total</span>
        <Skeleton className="h-8 w-44" />
      </CardFooter>
    </Card>
  );
};

export const Order = () => {
  const { cart } = routeApi.useLoaderData();

  return (
    <Suspense fallback={<OrderSkeleton />}>
      <Await promise={cart}>
        {({ items, total }) =>
          items.length > 0 ? (
            <Card className="w-full lg:order-2">
              <CardHeader>
                <CardTitle>Your Order</CardTitle>
              </CardHeader>
              <Separator className="mb-6" />
              <CardContent>
                <div className="grid flex-1 grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-1">
                  {items.map((item, i) => (
                    <Fragment key={item.id}>
                      <OrderItem {...item} />
                      {i < items.length - 1 && (
                        <Separator className="sm:hidden lg:block" />
                      )}
                    </Fragment>
                  ))}
                </div>
              </CardContent>
              <Separator className="mb-6" />
              <CardFooter className="grid grid-cols-2">
                <span className="text-lg font-normal tracking-tight">
                  Total
                </span>
                <span className="text-2xl font-medium tracking-tight">
                  ${total}
                </span>
              </CardFooter>
            </Card>
          ) : (
            <Card className="flex h-full w-full flex-col lg:order-2">
              <CardHeader>
                <CardTitle>Your Order</CardTitle>
              </CardHeader>
              <Separator />
              <CardContent className="flex flex-1 flex-col items-center justify-center">
                <LogoIcon className="mb-8 h-16 w-16 opacity-50" />
                <p className="text-lg font-medium tracking-tight">
                  Your cart is empty
                </p>
                <p className="text-sm text-muted-foreground">
                  Add items to your cart to checkout
                </p>
              </CardContent>
            </Card>
          )
        }
      </Await>
    </Suspense>
  );
};
