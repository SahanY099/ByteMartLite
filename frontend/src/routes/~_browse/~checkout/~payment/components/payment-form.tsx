import {
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { Link, getRouteApi } from "@tanstack/react-router";
import { ChevronLeft } from "lucide-react";
import { FormEvent, useEffect, useState } from "react";

import { LoadingButton } from "@/components/loading-button";
import { Button } from "@/components/ui/button";
import { CardFooter, CardHeader } from "@/components/ui/card";
import { toast } from "sonner";
import { Step, useCheckoutStore } from "../../store";

const routeApi = getRouteApi("/_browse/checkout/payment");

export const PaymentForm = () => {
  const { clientSecret, attempted } = routeApi.useSearch();
  const navigate = routeApi.useNavigate();

  const { clearClientSecret, setCurrentStep } = useCheckoutStore();

  const stripe = useStripe();
  const elements = useElements();

  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!stripe) {
      return;
    }

    stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
      if (!paymentIntent) return;
      switch (paymentIntent.status) {
        case "succeeded":
          console.log("Payment succeeded!");
          navigate({ to: "/checkout/success" });
          clearClientSecret();
          setCurrentStep(Step.Completed);
          break;
        case "processing":
          setMessage("Your payment is processing.");
          break;
        case "requires_payment_method":
          setMessage("Your payment was not successful, please try again.");
          break;
        default:
          setMessage("Something went wrong.");
          break;
      }
    });
  }, [stripe, clientSecret, navigate, clearClientSecret, setCurrentStep]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js hasn't yet loaded.
      return;
    }

    setIsLoading(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        /*
         * Make sure to change this to your payment completion page
         */
        return_url: `https://${window.location.hostname}/checkout/payment`,
      },
    });

    // This point will only be reached if there is an immediate error when
    // confirming the payment. Otherwise, your customer will be redirected to
    // your `return_url`. For some payment methods like iDEAL, your customer will
    // be redirected to an intermediate site first to authorize the payment, then
    // redirected to the `return_url`.
    if (error.type !== "card_error" && error.type !== "validation_error") {
      toast.error("An unexpected error occurred.");
    }
    setIsLoading(false);
  };

  return (
    <form id="payment-form" onSubmit={handleSubmit}>
      <CardHeader>
        <PaymentElement id="payment-element" options={{ layout: "tabs" }} />
        {message && attempted && (
          <p className={"text-[0.8rem] font-medium text-destructive"}>
            {message}
          </p>
        )}
      </CardHeader>
      <CardFooter className="flex flex-row justify-between">
        <Button variant="link" asChild>
          <Link to="/checkout">
            <ChevronLeft className="h-4 w-4" />
            Return to information
          </Link>
        </Button>
        <LoadingButton
          disabled={isLoading || !stripe || !elements}
          loading={isLoading}
        >
          Pay now
        </LoadingButton>
      </CardFooter>
    </form>
  );
};
