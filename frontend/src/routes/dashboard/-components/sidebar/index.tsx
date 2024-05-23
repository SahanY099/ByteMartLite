import { Link } from "@tanstack/react-router";

import { LogoIcon } from "@/components/logo-icon";
import { ThemeToggle } from "@/components/theme-toggle";
import { NavItem } from "./nav-item";

import { links } from "../nav-links";

export const Sidebar = () => {
  return (
    <aside className="top-0 hidden h-screen w-14 flex-col items-center justify-between sm:fixed sm:block xl:flex">
      <div className="flex h-full w-full flex-col items-center justify-between border-r bg-background py-3 xl:my-4 xl:rounded-md xl:border xl:py-4">
        <div className="grid">
          <Link to="/dashboard">
            <LogoIcon className="h-8 w-8" />
          </Link>
        </div>
        <div className="flex flex-col items-center justify-center gap-4">
          {links.map((link) => (
            <NavItem {...link} key={link.name} />
          ))}
        </div>
        <div>
          <ThemeToggle />
        </div>
      </div>
    </aside>
  );
};
