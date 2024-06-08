import { Link } from "@tanstack/react-router";

import { Container } from "@/components/container";
import { LogoIcon } from "@/components/logo-icon";
import { Button } from "@/components/ui/button";

export const NotFoundBanner = () => {
  return (
    <div style={{ height: "calc(100vh - 64px)" }} className="py-4">
      <Container className="flex h-full flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm max-xl:mx-4">
        <div className="flex flex-col items-center text-center">
          <div className="relative mb-4">
            <LogoIcon className="h-32 w-32" />
            <div className="absolute -right-12 bottom-0 text-5xl text-muted-foreground">
              404
            </div>
          </div>

          <h3 className="text-2xl font-bold tracking-tight">Oops...</h3>
          <p className="text-sm text-muted-foreground">
            The item you are looking for does not exist.
          </p>

          <Button className="mt-4" asChild>
            <Link to="/">Go back</Link>
          </Button>
        </div>
      </Container>
    </div>
  );
};
