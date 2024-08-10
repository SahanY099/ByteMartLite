import { zodResolver } from "@hookform/resolvers/zod";
import { useSuspenseQuery } from "@tanstack/react-query";
import { createLazyFileRoute, useNavigate } from "@tanstack/react-router";
import { useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { LoadingButton } from "@/components/loading-button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { RadioGroup } from "@/components/ui/radio-group";
import { AddressRadioItem } from "./components/address-radio-item";

import { Card } from "@/components/ui/card";
import { addressesQueryOptions } from "@/services/addresses";
import { Step, useCheckoutStore } from "../store";
import { InformationData, informationSchema } from "./schemas";
import { useCheckout } from "./services";

export const Route = createLazyFileRoute("/_browse/checkout/(information)/")({
  component: Information,
});

function Information() {
  const { setCurrentStep, setClientSecret, clientSecret } = useCheckoutStore();
  const addresses = useSuspenseQuery(addressesQueryOptions);

  const { mutateAsync, isPending, status, data } = useCheckout();

  const shippingAddresses = addresses.data?.filter(
    (address) => !address.isBilling,
  );
  const billingAddresses = addresses.data?.filter(
    (address) => address.isBilling,
  );

  const form = useForm<InformationData>({
    resolver: zodResolver(informationSchema),
    defaultValues: {
      shippingAddressId: shippingAddresses
        ?.find((address) => address.isDefault)
        ?.id.toString(),
      billingAddressId: billingAddresses
        ?.find((address) => address.isDefault)
        ?.id.toString(),
    },
  });
  const navigate = useNavigate();

  const navigateToPayment = useCallback(() => {
    navigate({
      to: "/checkout/payment",
      search: { clientSecret: clientSecret!, attempted: false },
    });
  }, [navigate, clientSecret]);

  const onSubmit = async (data: InformationData) => {
    await mutateAsync(data);
  };

  useEffect(() => {
    setCurrentStep(Step.Information);
  }, [setCurrentStep]);

  useEffect(() => {
    if (status == "success") {
      setCurrentStep(Step.Payment);
      setClientSecret(data.clientSecret);
      navigateToPayment();
    } else if (status == "error")
      toast.error("Something happened in our end. Please try again later.");
  }, [
    status,
    navigate,
    data,
    setCurrentStep,
    setClientSecret,
    navigateToPayment,
  ]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Card className="space-y-6 p-6">
          <FormField
            control={form.control}
            name="shippingAddressId"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel className="text-lg font-medium tracking-tight">
                  Shipping Address
                </FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="grid w-full grid-cols-1 gap-2 md:grid-cols-2"
                  >
                    {shippingAddresses?.map((address) => (
                      <AddressRadioItem key={address.id} {...address} />
                    ))}
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="billingAddressId"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel className="text-lg font-medium tracking-tight">
                  Shipping Address
                </FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="grid w-full grid-cols-1 gap-2 md:grid-cols-2"
                  >
                    {billingAddresses?.map((address) => (
                      <AddressRadioItem key={address.id} {...address} />
                    ))}
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex flex-row justify-end">
            <LoadingButton
              type={clientSecret ? "button" : "submit"}
              onClick={clientSecret ? () => navigateToPayment() : undefined}
              className="ml-auto"
              loading={isPending}
            >
              Continue to Payment
            </LoadingButton>
          </div>
        </Card>
      </form>
    </Form>
  );
}
