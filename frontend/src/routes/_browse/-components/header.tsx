import { Container } from "@/components/container";
import { Logo } from "@/components/logo";
import { ThemeToggle } from "@/components/theme-toggle";

export const Header = () => {
  return (
    <header className="px-8 py-4 shadow-sm dark:shadow-white/20">
      <Container className="flex flex-row items-center justify-between">
        <Logo />
        <ThemeToggle />
      </Container>
    </header>
  );
};
