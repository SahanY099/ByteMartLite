import {
  Link,
  Outlet,
  createFileRoute,
  redirect,
} from "@tanstack/react-router";

import { Container } from "@/components/container";

export const Route = createFileRoute("/_browse/account")({
  component: AccountLayout,
  beforeLoad: ({ context, location }) => {
    if (!context.auth.isAuthenticated()) {
      throw redirect({
        to: "/login",
        search: {
          redirect: location.href,
        },
      });
    }
  },
});

function AccountLayout() {
  return (
    <Container className="mx-auto flex min-h-[calc(100vh_-_theme(spacing.16))] w-full max-w-screen-xl flex-col gap-6 px-4 py-4 md:flex-row md:gap-8 md:py-10">
      <div className="flex flex-col gap-4">
        <h1 className="text-3xl font-semibold">Settings</h1>
        <nav
          className="grid gap-4 text-sm text-muted-foreground"
          x-chunk="dashboard-04-chunk-0"
        >
          <Link to="/account" className="font-semibold text-primary">
            General
          </Link>
          <Link to="/account/addresses">Addresses</Link>
        </nav>
      </div>

      <div className="mx-auto w-full  md:max-w-4xl">
        <Outlet />
      </div>
    </Container>
  );
}
