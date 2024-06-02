import { RouterProvider, createRouter } from "@tanstack/react-router";

import { queryClient } from "@/lib/query-client";
import { useAuthStore } from "@/store/auth";
import { routeTree } from "./routeTree.gen";

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

const router = createRouter({
  routeTree,
  context: {
    auth: undefined!,
    queryClient,
  },
  defaultPreloadStaleTime: 0,
});

export function App() {
  const auth = useAuthStore();
  return <RouterProvider router={router} context={{ auth }} />;
}
