import { Header } from "@/routes/_browse/-components/header";
import { Outlet, createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_browse")({
  component: BrowseLayout,
});

function BrowseLayout() {
  return (
    <div>
      <Header />
      <Outlet />
    </div>
  );
}
