import { Link, LinkOptions } from "@tanstack/react-router";
import { Inbox, Layers, LucideIcon, Package } from "lucide-react";

import { LogoIcon } from "@/components/logo-icon";
import { ThemeToggle } from "@/components/theme-toggle";
import { NavItem } from "./nav-item";

type Link = {
  name: string;
  href: LinkOptions["to"];
  icon: LucideIcon;
};

const links = [
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: Layers,
  },
  {
    name: "Products",
    href: "/dashboard/products",
    icon: Package,
  },
  {
    name: "Orders",
    href: "/dashboard/orders",
    icon: Inbox,
  },
] as Link[];

export const Sidebar = () => {
  return (
    <aside className="fixed top-0 h-screen w-14 flex-col items-center justify-between xl:flex">
      <div className="flex h-full w-full flex-col items-center justify-between border-r bg-background py-2 xl:my-4 xl:rounded-md xl:border xl:py-4">
        <div className="grid">
          <Link to="/dashboard">
            <LogoIcon className="h-8 w-8" />
          </Link>
        </div>
        <div className="flex flex-col items-center justify-center gap-4">
          {links.map((link) => (
            <NavItem {...link} />
          ))}
        </div>
        <div>
          <ThemeToggle />
        </div>
      </div>
    </aside>
  );
};
