import { Link, MatchRoute } from "@tanstack/react-router";

import { Container } from "@/components/container";
import { Logo } from "@/components/logo";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";

export const Header = () => {
  return (
    <header className="py-4 shadow-sm dark:shadow-white/20">
      <Container className="flex flex-row items-center justify-between">
        <Logo />
        <div className="flex flex-row gap-4">
          <ThemeToggle />
          <MatchRoute to="/signup">
            <Link to="/login" preload="intent">
              <Button className="rounded-md">Login</Button>
            </Link>
          </MatchRoute>
          <MatchRoute to="/login">
            <Link to="/signup" preload="intent">
              <Button className="rounded-md">Sign Up</Button>
            </Link>
          </MatchRoute>
        </div>
      </Container>
    </header>
  );
};
