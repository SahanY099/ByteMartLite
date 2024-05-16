import { useQueryClient, useSuspenseQuery } from "@tanstack/react-query";
import { createLazyFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";

import { AddressForm } from "../-components/address-form";
import { FormLayout } from "../-components/form-layout";

import { addressQueryOptions, useUpdateAddress } from "@/services/account";
import { AddressData } from "@/types/account";

export const Route = createLazyFileRoute(
  "/_browse/account/addresses/$addressId/edit",
)({
  component: EditAddress,
});

function EditAddress() {
  const queryClient = useQueryClient();
  const navigate = useNavigate({ from: "/account/addresses/$addressId/edit" });

  const { addressId } = Route.useParams();
  const { data } = useSuspenseQuery(addressQueryOptions(addressId));

  const { mutateAsync, isPending, status } = useUpdateAddress(data.id);

  const handleOnSubmit = async (data: AddressData) => {
    await mutateAsync(data);
    await queryClient.invalidateQueries({
      queryKey: ["account-data", "addresses"],
    });
  };

  useEffect(() => {
    if (status == "success") navigate({ to: "/account/addresses" });
  }, [status, navigate]);

  return (
    <FormLayout update name={data.name}>
      <AddressForm
        type="update"
        addressId={addressId}
        initialData={data}
        onSubmit={handleOnSubmit}
        isPending={isPending}
      />
    </FormLayout>
  );
}
