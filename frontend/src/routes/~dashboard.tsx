import { createFileRoute, Outlet } from "@tanstack/react-router";

import { Container } from "@/components/container";
import { Sidebar } from "./~dashboard/components/sidebar";

export const Route = createFileRoute("/dashboard")({
  component: DashboardLayout,
});

function DashboardLayout() {
  return (
    <div className="min-h-screen bg-muted/40">
      <Container className="flex flex-row  px-0 md:px-0">
        <Sidebar />
        <div className="flex-1 pb-4 sm:ml-14 xl:py-4">
          <Outlet />
        </div>
      </Container>
    </div>
  );
}
