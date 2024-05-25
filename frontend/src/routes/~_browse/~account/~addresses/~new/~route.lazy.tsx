import { useQueryClient } from "@tanstack/react-query";
import { createLazyFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";

import { AddressForm } from "../components/address-form";
import { FormLayout } from "../components/form-layout";

import { AddressData } from "../schemas";
import { useCreateAddress } from "./services";

export const Route = createLazyFileRoute("/_browse/account/addresses/new")({
  component: NewAddress,
});

function NewAddress() {
  const queryClient = useQueryClient();
  const navigate = useNavigate({ from: "/account/addresses/new" });

  const { billing } = Route.useSearch();
  const { mutateAsync, isPending, status } = useCreateAddress();

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
    <>
      <FormLayout update={false} billing={billing}>
        <AddressForm
          isPending={isPending}
          type="create"
          onSubmit={handleOnSubmit}
          billing={billing}
        />
      </FormLayout>
    </>
  );
}
