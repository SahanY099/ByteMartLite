import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { createLazyFileRoute, getRouteApi } from "@tanstack/react-router";
import { useEffect } from "react";

import { Card } from "@/components/ui/card";
import { PaymentForm } from "./components/payment-form";

import { useTheme } from "@/components/theme-provider";
import { Step, useCheckoutStore } from "../store";

export const Route = createLazyFileRoute("/_browse/checkout/payment")({
  component: Payment,
});

const stripePromise = loadStripe(
  import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY as string,
);

const routeApi = getRouteApi("/_browse/checkout/payment");

function Payment() {
  const { clientSecret } = routeApi.useSearch();

  const { theme } = useTheme();
  const { setCurrentStep, setClientSecret } = useCheckoutStore();

  /* TODO: add shipping and billing addresses details */

  useEffect(() => {
    setCurrentStep(Step.Payment);
    setClientSecret(clientSecret);
  }, [setCurrentStep, setClientSecret, clientSecret]);

  return (
    <Card className="">
      <Elements
        options={{
          clientSecret,
          appearance: {
            theme: theme == "light" ? "flat" : "night",
          },
        }}
        stripe={stripePromise}
      >
        <PaymentForm />
      </Elements>
    </Card>
  );
}
