import { Suspense, lazy, useEffect } from "react";

import { Container } from "@/components/container";
import { Logo } from "@/components/logo";
import { ThemeToggle } from "@/components/theme-toggle";
import { UserMenu } from "@/components/user-menu";
import { Search } from "./search";

import { useAuthStore } from "@/store/auth";

const Cart = lazy(() =>
  import("./cart").then((module) => ({ default: module.Cart })),
);

export const Header = () => {
  const { isAuthenticated, checkAuthState, user } = useAuthStore();

  useEffect(() => {
    checkAuthState();
  }, [user, checkAuthState]);

  return (
    <header className="sticky flex h-16 items-center border-b bg-background">
      <Container className="flex flex-1 flex-row items-center justify-between">
        <Logo />
        <div className="flex flex-row items-center gap-4">
          <Search />
          {isAuthenticated && (
            <Suspense>
              <Cart />
            </Suspense>
          )}
          <ThemeToggle />
          <UserMenu />
        </div>
      </Container>
    </header>
  );
};
