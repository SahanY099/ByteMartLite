import { useQueryClient } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import { Construction, Ellipsis, Pen, Trash } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { useDeleteAddress, useMakeDefaultAddress } from "@/services/account";
import { Address } from "@/types/account";

type AddressCardProps = Address;

export function AddressCard({
  id,
  street,
  unit,
  city,
  province,
  postalCode,
  isDefault,
  isBilling,
}: AddressCardProps) {
  const deleteAddress = useDeleteAddress(id);
  const makeDefault = useMakeDefaultAddress(id);
  const queryClient = useQueryClient();

  const handleDelete = async () => {
    await deleteAddress.mutateAsync();
    await queryClient.invalidateQueries({
      queryKey: ["account-data", "addresses"],
    });
  };

  const handleMakeDefault = async () => {
    await makeDefault.mutateAsync();
    await queryClient.invalidateQueries({
      queryKey: ["account-data", "addresses"],
    });
  };

  return (
    <Card className="relative w-full sm:w-72">
      {isDefault ? (
        <Badge className="absolute right-5 top-5" variant="secondary">
          Default
        </Badge>
      ) : (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              size="icon"
              className="absolute right-4 top-4 h-7 w-7"
              variant="outline"
            >
              <Ellipsis className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onClick={handleMakeDefault}>
              Make default
            </DropdownMenuItem>
            <DropdownMenuItem>
              Make {isBilling ? "shipping" : "billing"}
              <Construction className="ml-auto h-4 w-4" />
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link
                preload="intent"
                to="/account/addresses/$addressId/edit"
                params={{ addressId: id.toString() }}
              >
                Edit <Pen className="ml-auto h-4 w-4" />
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={handleDelete}>
              Delete <Trash className="ml-auto h-4 w-4" />
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )}
      <CardHeader>
        <CardTitle>Home</CardTitle>
      </CardHeader>
      <CardContent className="text-sm text-muted-foreground">
        <p>{street}</p>
        <p>{unit}</p>
        <p>{city.name}</p>
        <p>{province.name}</p>
        <p>{postalCode}</p>
      </CardContent>
    </Card>
  );
}

export function AddressCardSkeleton() {
  return (
    <Card className="w-full sm:w-72">
      <CardHeader className="flex flex-row items-center gap-4 space-y-0">
        <div className="h-4 flex-1 animate-pulse rounded bg-secondary sm:w-36"></div>
        <div className="h-7 w-7 animate-pulse rounded bg-secondary"></div>
      </CardHeader>
      <CardContent className="flex flex-col gap-1">
        <div className="h-4 w-full animate-pulse rounded bg-secondary"></div>
        <div className="h-4 w-full animate-pulse rounded bg-secondary"></div>
        <div className="h-4 w-full animate-pulse rounded bg-secondary"></div>
        <div className="h-4 w-full animate-pulse rounded bg-secondary"></div>
        <div className="h-4 w-full animate-pulse rounded bg-secondary"></div>
      </CardContent>
    </Card>
  );
}
