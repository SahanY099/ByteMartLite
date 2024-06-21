import { ShoppingCart } from "lucide-react";

import { LogoIcon } from "@/components/logo-icon";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { CartItem } from "./cart-item";

import { useCart } from "@/services/cart";

export const Cart = () => {
  const { data } = useCart();

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button size="icon" variant="outline" className="relative">
          <ShoppingCart className="h-4 w-4" />
          <Badge className="absolute -right-2 -top-2 aspect-square rounded-full bg-blue-600 px-1.5 py-0.5">
            {data?.items.length ?? 0}
          </Badge>
        </Button>
      </SheetTrigger>
      <SheetContent className="flex flex-col max-sm:w-screen">
        <SheetHeader>
          <SheetTitle>My Cart</SheetTitle>
        </SheetHeader>

        {data && data.items.length > 0 ? (
          <ScrollArea>
            <div className="flex flex-1 flex-col gap-4">
              {data.items.map((item) => (
                <CartItem key={item.id} {...item} />
              ))}
            </div>
          </ScrollArea>
        ) : (
          <div className="flex flex-1 flex-col items-center justify-center">
            <LogoIcon className="mb-8 h-16 w-16 opacity-50" />
            <p className="text-lg font-medium tracking-tight">
              Your cart is empty
            </p>
            <p className="text-sm text-muted-foreground">
              Add items to your cart to checkout
            </p>
          </div>
        )}

        <Separator />

        <div className="flex w-full flex-row items-center justify-between">
          <span className="text-xl font-medium tracking-tight">
            $ {data?.total}
          </span>
          <Button>Checkout </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
};
