import { Link } from "@tanstack/react-router";
import { Edit, Info } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroupItem } from "@/components/ui/radio-group";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import { FormControl } from "@/components/ui/form";
import { Address } from "@/types/addresses";

type AddressCardProps = Omit<Address, "isDefault" | "isBilling">;

export function AddressRadioItem({
  id,
  name,
  street,
  unit,
  city,
  province,
  postalCode,
}: AddressCardProps) {
  return (
    <TooltipProvider>
      <Tooltip delayDuration={500}>
        <Label>
          <Card className="flex w-full flex-row items-center gap-4 bg-primary-foreground px-4 py-2">
            <FormControl>
              <RadioGroupItem value={id.toString()} />
            </FormControl>
            <div className="flex-1 overflow-hidden">
              <p className="overflow-hidden text-ellipsis text-nowrap text-sm">
                {name} {id}
              </p>
            </div>
            <div className="flex flex-row">
              <Button size="icon" className="h-8 w-8" variant="ghost" asChild>
                <Link
                  to="/account/addresses/$addressId/edit"
                  params={{ addressId: id.toString() }}
                >
                  <Edit className="h-4 w-4" />
                </Link>
              </Button>
              <TooltipTrigger asChild>
                <Button
                  size="icon"
                  className="h-8 w-8"
                  variant="ghost"
                  type="button"
                >
                  <Info className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
            </div>
          </Card>
        </Label>
        <TooltipContent
          align="end"
          side="bottom"
          sideOffset={25}
          alignOffset={-20}
          className="w-full text-sm"
        >
          <span className="block">{street}</span>
          <span className="block">{unit}</span>
          <span className="block">{city.name}</span>
          <span className="block">{province.name}</span>
          <span className="block">{postalCode}</span>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

export function AddressRadioItemCardSkeleton() {
  return (
    <Card className="flex w-full flex-row items-center justify-between gap-4 px-4 py-3">
      <Skeleton className="h-6 w-6 rounded-full"></Skeleton>
      <Skeleton className="h-6 flex-1 delay-200"></Skeleton>
      <div className="flex flex-row gap-1">
        <Skeleton className="delay-400 h-6 w-6"></Skeleton>
        <Skeleton className="delay-400 h-6 w-6"></Skeleton>
      </div>
    </Card>
  );
}
