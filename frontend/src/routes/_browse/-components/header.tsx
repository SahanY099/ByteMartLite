import { ThemeToggle } from "@/components/theme-toggle";
import { Logo } from "./logo";

export const Header = () => {
  return (
    <div className="flex items-center justify-between px-8 py-4 shadow-sm dark:shadow-white/20">
      <Logo />
      <ThemeToggle />
    </div>
  );
};
