import { Outlet, createFileRoute, defer } from "@tanstack/react-router";

import { Container } from "@/components/container";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

import { Card, CardHeader } from "@/components/ui/card";
import { Order } from "./~checkout/components/order";

import { cartQueryOptions } from "@/services/cart";
import { Step, useCheckoutStore } from "./~checkout/store";

export const Route = createFileRoute("/_browse/checkout")({
  loader: ({ context }) => {
    return {
      cart: defer(context.queryClient.ensureQueryData(cartQueryOptions)),
    };
  },
  component: CheckoutLayout,
});

function CheckoutLayout() {
  const { currentStep, clientSecret } = useCheckoutStore();

  return (
    <Container className="py-4">
      <Card className="mb-4">
        <CardHeader className="flex flex-col gap-1">
          <h1 className="text-3xl font-medium tracking-tight">Checkout</h1>
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                {currentStep == Step.Information && (
                  <BreadcrumbPage>Information</BreadcrumbPage>
                )}

                {clientSecret && currentStep !== Step.Information && (
                  <BreadcrumbLink to="/checkout">Information</BreadcrumbLink>
                )}
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                {currentStep == Step.Payment ? (
                  <BreadcrumbPage>Payment</BreadcrumbPage>
                ) : (
                  <BreadcrumbLink
                    to="/checkout"
                    disabled={currentStep > Step.Payment}
                  >
                    Payment
                  </BreadcrumbLink>
                )}
              </BreadcrumbItem>
              {currentStep > Step.Payment && (
                <>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    <BreadcrumbLink to="/checkout/status" disabled>
                      Success
                    </BreadcrumbLink>
                    {currentStep == Step.Completed && (
                      <BreadcrumbPage>Success</BreadcrumbPage>
                    )}
                    {currentStep == Step.Failed && (
                      <BreadcrumbPage>Failed</BreadcrumbPage>
                    )}
                  </BreadcrumbItem>
                </>
              )}
            </BreadcrumbList>
          </Breadcrumb>
        </CardHeader>
      </Card>
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <Order />
        <div className="w-full">
          <Outlet />
        </div>
      </div>
    </Container>
  );
}
