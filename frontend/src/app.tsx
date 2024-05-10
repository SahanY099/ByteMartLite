import { RouterProvider, createRouter } from "@tanstack/react-router";

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
  },
});

export function App() {
  const auth = useAuthStore();
  return <RouterProvider router={router} context={{ auth }} />;
}
