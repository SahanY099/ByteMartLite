import { useSuspenseQuery } from "@tanstack/react-query";
import { createLazyFileRoute, Link } from "@tanstack/react-router";
import { PlusCircle } from "lucide-react";

import { Button } from "@/components/ui/button";
import { AddressCard } from "./-components/address-card";

import { addressesQueryOptions } from "@/services/account";

export const Route = createLazyFileRoute("/_browse/account/addresses/")({
  component: Addresses,
});

function Addresses() {
  const addresses = useSuspenseQuery(addressesQueryOptions);

  const billingAddresses = addresses.data?.filter(
    (address) => address.isBilling,
  );
  const shippingAddresses = addresses.data?.filter(
    (address) => !address.isBilling,
  );

  return (
    <div className="flex flex-col gap-8">
      <div className="flex w-full flex-col gap-4">
        <div className="flex flex-row items-center justify-between">
          <h2 className="text-xl font-semibold tracking-tight">
            Shipping Addresses
          </h2>
          <Button size="sm" className="gap-1" asChild>
            <Link
              to="/account/addresses/new"
              preload="intent"
              search={{
                billing: false,
              }}
            >
              <PlusCircle className="h-3.5 w-3.5" />
              <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                Add Shipping Address
              </span>
            </Link>
          </Button>
        </div>
        <div className="flex flex-row flex-wrap gap-4">
          {shippingAddresses?.map((address) => (
            <AddressCard key={address.id} {...address} />
          ))}
        </div>
      </div>
      <div className="flex w-full flex-col gap-4">
        <div className="flex flex-row items-center justify-between">
          <h2 className="text-xl font-semibold tracking-tight">
            Billing Addresses
          </h2>
          <Button size="sm" className="gap-1" asChild>
            <Link
              to="/account/addresses/new"
              preload="intent"
              search={{
                billing: true,
              }}
            >
              <PlusCircle className="h-3.5 w-3.5" />
              <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                Add Billing Address
              </span>
            </Link>
          </Button>
        </div>
        <div className="flex flex-row flex-wrap gap-4">
          {billingAddresses?.map((address) => (
            <AddressCard key={address.id} {...address} />
          ))}
        </div>
      </div>
    </div>
  );
}
