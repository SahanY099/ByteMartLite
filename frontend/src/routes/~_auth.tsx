import { createFileRoute, Outlet } from "@tanstack/react-router";

import { Header } from "./~_auth/components/header";

export const Route = createFileRoute("/_auth")({
  component: AuthLayout,
});

function AuthLayout() {
  return (
    <div className="flex h-screen flex-col">
      <Header />
      <Outlet />
    </div>
  );
}
