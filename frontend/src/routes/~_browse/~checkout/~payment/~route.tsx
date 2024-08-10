import { createFileRoute, redirect } from "@tanstack/react-router";
import { z } from "zod";

const routeParamSchema = z.object({
  clientSecret: z.string(),
  attempted: z.boolean().catch(true),
});

type routeParams = z.infer<typeof routeParamSchema> & {
  payment_intent_client_secret: string | undefined; // to handle stripe redirect
};

export const Route = createFileRoute("/_browse/checkout/payment")({
  validateSearch: (search: routeParams) => {
    const modifiedSearch = {
      clientSecret: search.payment_intent_client_secret ?? search.clientSecret,
      attempted: search.attempted,
    };
    return routeParamSchema.parse(modifiedSearch);
  },
  beforeLoad: ({ search }) => {
    if (!search.clientSecret) {
      throw redirect({
        to: "/checkout",
      });
    }
  },
});
