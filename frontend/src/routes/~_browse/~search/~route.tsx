import { createFileRoute, defer } from "@tanstack/react-router";

import { categoriesQueryOptions } from "@/services/categories";
import { productSearchSchema } from "./schemas";
import { productSearchOptions } from "./services";

export const Route = createFileRoute("/_browse/search")({
  validateSearch: (search) => productSearchSchema.parse(search),
  loaderDeps: ({ search: { page, q, category, sort, order } }) => ({
    page,
    q,
    category,
    sort,
    order,
  }),
  loader: async ({ context, deps: { page, q, category, sort, order } }) => {
    const queryClient = context.queryClient;

    const categories = await queryClient.ensureQueryData(
      categoriesQueryOptions,
    );
    const products = queryClient.ensureQueryData(
      productSearchOptions({
        q,
        page,
        category,
        sort,
        order,
      }),
    );

    return {
      categories,
      products: defer(products),
    };
  },
});
