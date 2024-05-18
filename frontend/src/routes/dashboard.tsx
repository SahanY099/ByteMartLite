import { createFileRoute } from "@tanstack/react-router";

import { Container } from "@/components/container";
import { Sidebar } from "./dashboard/-components/sidebar";

export const Route = createFileRoute("/dashboard")({
  component: DashboardLayout,
});

function DashboardLayout() {
  return (
    <div className="min-h-screen bg-muted/40">
      <Container className="flex flex-row  px-0 md:px-0">
        <Sidebar />
        <div className="ml-14  flex-1 xl:py-4 xl:pl-4">
          <div className="h-12 flex-1 bg-red-200"></div>
          <div className="h-full flex-1"></div>
        </div>
      </Container>
    </div>
  );
}
