import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";

import { FormLayoutSkeleton } from "../components/form-layout";

const routeParamSchema = z.object({
  billing: z.boolean().catch(false),
});

export const Route = createFileRoute("/_browse/account/addresses/new")({
  validateSearch: (search) => routeParamSchema.parse(search),

  pendingComponent: () => <FormLayoutSkeleton />,
});
