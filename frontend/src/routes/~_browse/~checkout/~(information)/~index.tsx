import { addressesQueryOptions } from "@/services/addresses";
import { createFileRoute } from "@tanstack/react-router";

import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { AddressRadioItemCardSkeleton } from "./components/address-radio-item";

export const Route = createFileRoute("/_browse/checkout/(information)/")({
  loader: async ({ context }) => {
    context.queryClient.ensureQueryData(addressesQueryOptions);
  },
  pendingComponent: () => (
    <Card className="space-y-6 p-6">
      <div className="space-y-2">
        <h2 className="text-lg font-medium tracking-tight">Shipping Address</h2>
        <div className="grid w-full grid-cols-1 gap-2 md:grid-cols-2">
          <AddressRadioItemCardSkeleton />
          <AddressRadioItemCardSkeleton />
          <AddressRadioItemCardSkeleton />
        </div>
      </div>
      <div className="space-y-2">
        <h2 className="text-lg font-medium tracking-tight">Billing Address</h2>
        <div className="grid w-full grid-cols-1 gap-2 md:grid-cols-2">
          <AddressRadioItemCardSkeleton />
          <AddressRadioItemCardSkeleton />
          <AddressRadioItemCardSkeleton />
        </div>
      </div>
      <div className="flex flex-row justify-end">
        <Skeleton className="h-9 w-40" />
      </div>
    </Card>
  ),
});
