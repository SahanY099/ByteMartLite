import { Container } from "@/components/container";
import { Logo } from "@/components/logo";
import { ThemeToggle } from "@/components/theme-toggle";
import { UserMenu } from "@/components/user-menu";
import { Cart } from "./cart";
import { Search } from "./search";

export const Header = () => {
  return (
    <header className="sticky flex h-16 items-center border-b bg-background">
      <Container className="flex flex-1 flex-row items-center justify-between">
        <Logo />
        <div className="flex flex-row items-center gap-4">
          <Search />
          <Cart />
          <ThemeToggle />
          <UserMenu />
        </div>
      </Container>
    </header>
  );
};
