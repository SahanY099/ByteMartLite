import { createFileRoute } from "@tanstack/react-router";

import { FormLayoutSkeleton } from "../components/form-layout";

import { queryClient } from "@/lib/query-client";
import { addressQueryOptions } from "./services";

export const Route = createFileRoute(
  "/_browse/account/addresses/$addressId/edit",
)({
  loader: ({ params }) => {
    queryClient.ensureQueryData(addressQueryOptions(params.addressId));
  },
  pendingComponent: () => <FormLayoutSkeleton />,
});
